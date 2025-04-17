import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactSelect from 'react-select';
import countryList from 'react-select-country-list';
import debounce from 'lodash/debounce';

import AuthTitle from '@app/components/ui/AuthTitle';
import InputLabel from '@app/components/ui/InputLabel';
import Input from '@app/components/ui/Input';
import SubmitButton from '@app/components/ui/SubmitButton';

import { supabase } from '@app/lib/supabaseClient';

interface FormState {
  first_name: string;
  last_name: string;
  username: string;
  birthdate: string;
  country: string;
  avatar_url: string;
  email: string;
  authProvider: string;
}

interface UsernameValidation {
  isValid: boolean;
  message: string;
  isChecking: boolean;
}

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [disabledFields, setDisabledFields] = useState<string[]>([]);
  const [existingUsernames, setExistingUsernames] = useState<string[]>([]);
  const countries = countryList().getData();

  const [usernameValidation, setUsernameValidation] =
    useState<UsernameValidation>({
      isValid: false,
      message: '',
      isChecking: false,
    });

  const [form, setForm] = useState<FormState>({
    first_name: '',
    last_name: '',
    username: '',
    birthdate: '',
    country: '',
    avatar_url: '',
    email: '',
    authProvider: '',
  });

  // Username validation function
  const validateUsername = debounce(async (username: string) => {
    setUsernameValidation((prev) => ({ ...prev, isChecking: true }));

    if (username.length < 3) {
      setUsernameValidation({
        isValid: false,
        message: 'Username must be at least 3 characters',
        isChecking: false,
      });
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameValidation({
        isValid: false,
        message: 'Only letters, numbers and underscores allowed',
        isChecking: false,
      });
      return;
    }

    const exists = existingUsernames.includes(username.toLowerCase());
    setUsernameValidation({
      isValid: !exists,
      message: exists ? 'Username already taken' : 'Username available',
      isChecking: false,
    });
  }, 300);

  // Fetch usernames on mount
  useEffect(() => {
    async function fetchUsernames() {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .not('username', 'is', null);

      if (!error && data) {
        setExistingUsernames(
          data.map((profile) => profile.username.toLowerCase())
        );
      }
    }

    fetchUsernames();
  }, []);

  const isFormValid =
    (form.first_name?.trim()?.length ?? 0) >= 3 &&
    (form.last_name?.trim()?.length ?? 0) >= 3 &&
    (form.birthdate?.trim() ?? '') !== '' &&
    (form.username ?? '') !== '';

  // Pre-Populate inputs on mount
  useEffect(() => {
    const loadUserMetadata = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate('/login');
        return;
      }

      const user = session.user;
      const metadata = user.user_metadata;

      // Query the profiles table for fallback values
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('first_name, last_name, username, birthdate, country')
        .eq('id', session.user.id)
        .single();

      // Use metadata if available, else fallback to the profile data
      const fullName =
        metadata?.name ||
        metadata?.full_name ||
        `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`;
      const [firstName = '', lastName = ''] = fullName.trim().split(' ');
      const username = metadata?.username || userProfile?.username || '';
      const birthdate = metadata?.birthdate || userProfile?.birthdate || '';
      const country = metadata?.country || userProfile?.country || '';

      setForm((prev) => ({
        ...prev,
        first_name: firstName,
        last_name: lastName,
        username: username,
        birthdate: birthdate,
        country: country,
        avatar_url: metadata?.avatar_url || metadata?.picture || '',
        email: metadata?.email || '',
        authProvider: user.app_metadata?.provider || '',
      }));

      const disabled: string[] = [];
      if (firstName) disabled.push('first_name');
      if (lastName) disabled.push('last_name');
      if (username) disabled.push('username');
      if (birthdate) disabled.push('birthdate');
      if (country) disabled.push('country');

      setDisabledFields(disabled);
      setLoading(false);
    };

    loadUserMetadata();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const transformedValue = name === 'username' ? value.toLowerCase() : value;
    setForm((prev) => ({ ...prev, [name]: transformedValue }));

    if (name === 'username') {
      validateUsername(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const { error } = await supabase.from('profiles').upsert({
      id: session.user.id,
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      birthdate: form.birthdate,
      country: form.country,
      avatar_url: form.avatar_url || '',
      email: form.email || '',
      authProvider: form.authProvider || '',
    });

    if (!error) {
      navigate('/dashboard');
    } else {
      toast.error('Failed to save profile: ' + error.message);
    }
  };

  if (loading) return <div className='p-4 text-center'>Loading...</div>;

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <AuthTitle>Tell us about you</AuthTitle>
      <form
        onSubmit={handleSubmit}
        className='space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
      >
        <div className='flex flex-col gap-2'>
          <InputLabel>First Name</InputLabel>
          <Input
            id='first_name'
            value={form.first_name}
            onChange={handleChange}
            disabled={disabledFields.includes('first_name')}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <InputLabel>Last Name</InputLabel>
          <Input
            id='last_name'
            value={form.last_name}
            onChange={handleChange}
            disabled={disabledFields.includes('last_name')}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <InputLabel>Username</InputLabel>
          <div className='relative'>
            <Input
              id='username'
              value={form.username}
              onChange={handleChange}
              disabled={disabledFields.includes('username')}
              required
              className={`${
                form.username &&
                (usernameValidation.isValid
                  ? 'border-green-500 focus:outline-green-500'
                  : 'border-red-500 focus:outline-red-500')
              }`}
            />
            {form.username && (
              <div
                className={`mt-1 text-sm ${
                  usernameValidation.isValid ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {usernameValidation.isChecking
                  ? 'Checking availability...'
                  : usernameValidation.message}
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <InputLabel>Birthday</InputLabel>
          <Input
            id='birthdate'
            type='date'
            required
            placeholder='dd/mm/yyyy'
            value={form.birthdate}
            onChange={handleChange}
            onKeyDown={(e) => e.preventDefault()} // block typing
            disabled={disabledFields.includes('birthdate')}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <InputLabel>Country</InputLabel>
          <ReactSelect
            id='country'
            name='country'
            options={countries}
            value={countries.find((option) => option.value === form.country)}
            onChange={(option) =>
              setForm((prev) => ({ ...prev, country: option?.value || '' }))
            }
            placeholder='Select your country...'
            isDisabled={disabledFields.includes('country')}
          />
        </div>

        <SubmitButton label='Continue' disabled={!isFormValid} />
      </form>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import countryList from 'react-select-country-list';
import debounce from 'lodash/debounce';

import InputLabel from '@app/components/ui/InputLabel';
import Input from '@app/components/ui/Input';
import SubmitButton from '@app/components/ui/SubmitButton';

import { supabase } from '@app/lib/supabaseClient';
import AuthLayout from '@app/components/ui/auth/AuthLayout';
import AuthCard from '@app/components/ui/auth/AuthCard';
import AuthCardHeader from '@app/components/ui/auth/AuthCardHeader';
import AuthCardBody from '@app/components/ui/auth/AuthCardBody';
import ThemedSelect from '@app/components/ui/ThemedSelect';
import ThemedDatePicker from '@app/components/ui/ThemedDatePicker';
import AuthHeader from '@app/components/ui/auth/AuthHeader';

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
  const [disabledFields] = useState<string[]>([]);
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
      // Use the RPC function instead of direct table access
      const { data, error } = await supabase.rpc('get_all_usernames');

      if (!error && data) {
        const usernames = data.map((item: { username: string }) => {
          item.username.toLowerCase();
        });

        setExistingUsernames(usernames);
      }
    }

    fetchUsernames();
  }, []);

  const isFormValid = useMemo(() => {
    return (
      form.first_name.trim().length >= 3 &&
      form.last_name.trim().length >= 3 &&
      form.username.trim().length >= 3 && // you already require length >= 3
      form.birthdate.trim().length > 0 && // non‐empty
      form.country.trim().length > 0 // non‐empty
    );
  }, [
    form.first_name,
    form.last_name,
    form.username,
    form.birthdate,
    form.country,
  ]);

  // Pre-Populate inputs on mount
  useEffect(() => {
    const loadUserMetadata = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          navigate('/login');
          return;
        }

        // Set default values first
        setForm({
          first_name: '',
          last_name: '',
          username: '',
          birthdate: '',
          country: '',
          avatar_url: '',
          email: '',
          authProvider: '',
        });

        // Try to load data from user metadata
        const user = session.user;
        const metadata = user.user_metadata || {};

        // Query the profiles table for fallback values
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('first_name, last_name, username, birthdate, country')
          .eq('id', session.user.id)
          .single();

        // Update state with whatever data we have
        setForm((prev) => ({
          ...prev,
          first_name: metadata?.first_name || userProfile?.first_name || '',
          last_name: metadata?.last_name || userProfile?.last_name || '',
          username: metadata?.username || userProfile?.username || '',
          birthdate: metadata?.birthdate || userProfile?.birthdate || '',
          country: metadata?.country || userProfile?.country || '',
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load your profile');
        setLoading(false);
      }
    };

    loadUserMetadata();
  }, [navigate]);

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

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <AuthLayout>
      <AuthCard>
        <AuthCardHeader title="Tell us about you"></AuthCardHeader>
        <AuthCardBody>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="flex flex-col gap-1">
                <InputLabel>First Name</InputLabel>
                <Input
                  id="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  disabled={disabledFields.includes('first_name')}
                />
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel>Last Name</InputLabel>
                <Input
                  id="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  disabled={disabledFields.includes('last_name')}
                />
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel>Username</InputLabel>
                <div className="relative">
                  <Input
                    id="username"
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
                      className={`mt-1 pl-2 text-xs ${
                        usernameValidation.isValid
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {usernameValidation.isChecking
                        ? 'Checking availability...'
                        : usernameValidation.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel>Birthday</InputLabel>
                <ThemedDatePicker
                  id="birthdate"
                  value={form.birthdate}
                  // onChange={handleDateChange}
                  onChange={(date) =>
                    setForm((prev) => ({ ...prev, birthdate: date }))
                  }
                  disabled={disabledFields.includes('birthdate')}
                  required
                  minAge={6}
                />
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel>Country</InputLabel>
                <ThemedSelect
                  id="country"
                  name="country"
                  options={countries}
                  value={countries.find(
                    (option) => option.value === form.country,
                  )}
                  onChange={(option) =>
                    setForm((prev) => ({
                      ...prev,
                      country: option?.value || '',
                    }))
                  }
                  placeholder="Select your country..."
                  isDisabled={disabledFields.includes('country')}
                />
              </div>

              <SubmitButton label="Continue" disabled={!isFormValid} />
            </div>
          </form>
        </AuthCardBody>
      </AuthCard>
      <span className="px-2 py-3 text-xs font-medium text-[#8f8f8f] dark:text-[#afafaf]">
        Introduce yourself to get better, more personalized user experience.
      </span>
    </AuthLayout>
  );
}

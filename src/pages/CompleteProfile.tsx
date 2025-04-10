import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import AuthTitle from '../components/ui/AuthTitle';
import InputLabel from '../components/ui/InputLabel';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    birthdate: '',
    country: '',
    avatar_url: '',
  });
  const [disabledFields, setDisabledFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const isFormValid =
    (form.first_name?.trim()?.length ?? 0) >= 3 &&
    (form.last_name?.trim()?.length ?? 0) >= 3 &&
    (form.birthdate?.trim() ?? '') !== '' &&
    (form.username ?? '') !== '';

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

      const fullName = metadata?.name || metadata?.full_name || '';
      const [firstName = '', lastName = ''] = fullName.split(' ');
      const avatar = metadata?.avatar_url || metadata?.picture || '';

      setForm((prev) => ({
        ...prev,
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatar,
      }));

      const disabled = [];
      if (firstName) disabled.push('first_name');
      if (lastName) disabled.push('last_name');

      setDisabledFields(disabled);
      setLoading(false);
    };

    loadUserMetadata();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      avatar_url: form.avatar_url || '', // either from metadata or blank
    });

    if (!error) {
      navigate('/dashboard');
    } else {
      alert('Failed to save profile: ' + error.message);
    }
  };

  if (loading) return <div className='p-4 text-center'>Loading...</div>;

  return (
    <div className='max-w-md mx-auto mt-10'>
      <AuthTitle>Tell us about you</AuthTitle>
      <form
        onSubmit={handleSubmit}
        className='space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
      >
        <div>
          <InputLabel>First Name</InputLabel>
          <Input
            id='first_name'
            value={form.first_name}
            onChange={handleChange}
            disabled={disabledFields.includes('first_name')}
          />
        </div>

        <div>
          <InputLabel>Last Name</InputLabel>
          <Input
            id='last_name'
            value={form.last_name}
            onChange={handleChange}
            disabled={disabledFields.includes('last_name')}
          />
        </div>

        <div>
          <InputLabel>Username</InputLabel>
          <Input
            id='username'
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Birthday</InputLabel>
          <Input
            id='birthdate'
            type='date'
            required
            value={form.birthdate}
            onChange={handleChange}
            onKeyDown={(e) => e.preventDefault()} // block typing
          />
        </div>

        <div>
          <InputLabel>Country</InputLabel>
          <Input
            id='country'
            value={form.country}
            onChange={handleChange}
            required
          />
        </div>

        <SubmitButton label='Continue' disabled={!isFormValid} />
      </form>
    </div>
  );
}

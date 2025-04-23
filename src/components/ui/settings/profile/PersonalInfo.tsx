import { useGetUserProfile, useInvalidateUserPofile } from '@app/hooks/useGetUserProfile';
import FormInput from '../../form/FormInput';
import FormSection from '../../form/FormSection';
import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import React, { useEffect, useState } from 'react';
import { useUpdateUserProfile } from '@app/hooks/useUpdateUserProfile';
import toast from 'react-hot-toast';
// import countryList from 'react-select-country-list';

interface FormState {
  first_name: string;
  last_name: string;
  username: string;
  birthdate: string;
  gender: string;
  country: string;
}

function PersonalInfo() {
  const { data: profile, isPending } = useGetUserProfile();
  const { updateProfile, loading, error } = useUpdateUserProfile();
  const invalidateProfile = useInvalidateUserPofile();

  const { setIsDirty, setOnConfirm } = useFormConfirm();

  // const countries = countryList().getData();

  const [form, setForm] = useState<FormState>({
    first_name: '',
    last_name: '',
    username: '',
    birthdate: '',
    gender: '',
    country: '',
  });

  useEffect(() => {
    setOnConfirm(() => handleSubmit);
  }, [form]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      // Check if any fields is non-empty
      const anyNotEmpty = Object.values(updated).some((v) => v.trim() !== '');

      setIsDirty(anyNotEmpty);
      return updated;
    });
  }

  const handleSubmit = React.useCallback(() => {
    // Skip update if no changes were made
    if (!form.first_name && !form.last_name && !form.username) {
      setIsDirty(false);
      return;
    }

    // Only include fields that have values in the update
    const updatedFields = Object.entries(form).reduce(
      (acc, [key, value]) => {
        if (value.trim()) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    // Update profile
    updateProfile(updatedFields).then(({ error }) => {
      if (error) {
        if (error.message.includes('profiles_username_key')) {
          toast.error('This username is already taken');
        } else {
          toast.error('Failed to update profile');
        }
        return;
      }
      setIsDirty(false);
      invalidateProfile();
      setForm({
        first_name: '',
        last_name: '',
        username: '',
        birthdate: '',
        gender: '',
        country: '',
      });
      toast.success('Profile updated successfully');
    });
  }, [form, updateProfile, setIsDirty, invalidateProfile]);

  if (isPending) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <FormSection>
        <FormInput
          label="First Name"
          name="first_name"
          type="text"
          placeholder={profile.first_name}
          value={form.first_name}
          onChange={handleInputChange}
        />
        <FormInput
          label="Last Name"
          name="last_name"
          type="text"
          placeholder={profile.last_name}
          value={form.last_name}
          onChange={handleInputChange}
        />
        <FormInput
          label="Username"
          name="username"
          type="text"
          placeholder={profile.username}
          value={form.username}
          onChange={handleInputChange}
        />

        {/* TODO: Need to implement 3 different components */}
        {/* <FormInput
          label="Birthdate"
          name="birthdate"
          type="date"
          placeholder={profile.birthdate}
          value={form.birthdate}
          onChange={handleInputChange}
        /> */}
        {/* <FormInput
          label="Gender"
          name="gender"
          type="text"
          placeholder={profile.gender}
          value={form.gender}
          onChange={handleInputChange}
        /> */}
        {/* <FormInput
          label="Country"
          name="country"
          type="text"
          placeholder={profile.country}
          value={form.country}
          onChange={handleInputChange}
        /> */}
      </FormSection>
    </div>
  );
}

export default PersonalInfo;

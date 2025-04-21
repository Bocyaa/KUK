import { useUserProfile } from "@app/hooks/useUserProfile";
import FormInput from "../../form/FormInput";
import FormSection from "../../form/FormSection";

function PersonalInfo() {
  const { data: profile, isPending } = useUserProfile();

  if (isPending) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <FormSection>
        <FormInput
          label="First Name"
          type="text"
          placeholder={profile.first_name}
        />
        <FormInput
          label="Last Name"
          type="text"
          placeholder={profile.last_name}
        />
        <FormInput
          label="Username"
          type="text"
          placeholder={profile.username}
        />
      </FormSection>
    </div>
  );
}

export default PersonalInfo;

import FormInput from "../../form/FormInput";
import FormSection from "../../form/FormSection";
import SubmitButton from "../../SubmitButton";

function UpdatePassword() {
  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <FormSection>
        <FormInput label="Current Password" type="password" />
      </FormSection>
      <FormSection>
        <FormInput label="New Password" type="password" />
      </FormSection>
      <SubmitButton label="Save" type="button" disabled={true} />
    </div>
  );
}

export default UpdatePassword;

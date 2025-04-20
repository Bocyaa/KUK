import FormInput from "../../form/FormInput";
import FormSection from "../../form/FormSection";
import SubmitButton from "../../SubmitButton";

function PersonalInfo() {
  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <FormSection>
        <FormInput label="First Name" type="text" />
      </FormSection>
      <FormSection>
        <FormInput label="Last Name" type="text" />
      </FormSection>
      <FormSection>
        <FormInput label="Username" type="text" />
      </FormSection>
      <SubmitButton label="Save" type="button" disabled={true} />
    </div>
  );
}

export default PersonalInfo;

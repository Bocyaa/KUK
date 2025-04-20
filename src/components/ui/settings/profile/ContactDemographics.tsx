import FormInput from "../../form/FormInput";
import FormSection from "../../form/FormSection";
import SubmitButton from "../../SubmitButton";

function ContactDemographics() {
  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <FormSection>
        <FormInput label="Birthdate" type="text" />
      </FormSection>
      <FormSection>
        <FormInput label="Gender" type="text" />
      </FormSection>
      <FormSection>
        <FormInput label="Country" type="text" />
      </FormSection>
      <SubmitButton label="Save" type="button" disabled={true} />
    </div>
  );
}

export default ContactDemographics;

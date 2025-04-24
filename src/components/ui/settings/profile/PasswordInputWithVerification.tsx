import FormInput from '../../form/FormInput';
import SpinnerBar from '../../SpinnerBar';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  isVerifying: boolean;
  isVerified: boolean;
  attemptsLeft: number;
  disabled?: boolean;
}

export default function PasswordInputWithVerification({
  value,
  onChange,
  onVerify,
  isVerifying,
  isVerified,
  attemptsLeft,
  disabled,
}: Props) {
  return (
    <div className="relative">
      <FormInput
        label="Current Password"
        value={value}
        onChange={onChange}
        disabled={disabled || isVerified}
      />
      {isVerified ? (
        // 3. Password is verified
        <span className="absolute bottom-0 right-0 top-0 flex items-center justify-end pr-2 pt-5 text-xs font-semibold text-green-400">
          Verified
        </span>
      ) : value.length >= 6 && !isVerifying ? (
        // 2. Verify button is active
        <button
          className="absolute bottom-0 right-0 top-0 flex items-center justify-end pr-2 pt-5 text-xs font-semibold text-[#0094f6]"
          onClick={onVerify}
        >
          Verify
        </button>
      ) : isVerifying ? (
        // ... verifying spinner
        <span className="absolute bottom-0 right-0 top-0 flex items-center justify-end pr-2 pt-5 text-xs font-semibold text-gray-300">
          <SpinnerBar />
        </span>
      ) : (
        // 1. Verify button is deactivated
        <span className="absolute bottom-0 right-0 top-0 flex items-center justify-end pr-2 pt-5 text-xs font-semibold text-gray-300">
          Verify
        </span>
      )}
      {attemptsLeft < 3 && (
        <span className="absolute right-0 top-0 flex items-center justify-end pr-2 text-xs text-gray-400">
          Attempts left: {attemptsLeft}
        </span>
      )}
    </div>
  );
}

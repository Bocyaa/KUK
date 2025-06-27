import SpinnerBar from './SpinnerBar';

interface DoneBtnProps {
  onClick: () => void;
  isLoading: boolean;
}

function DoneBtn({ onClick, isLoading }: DoneBtnProps) {
  return (
    <button
      className="text-lg font-semibold text-[#0094f6] active:text-[#005994]"
      onClick={onClick}
    >
      {isLoading ? (
        <div className="relative mr-6">
          &nbsp;
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <SpinnerBar height={2} />
          </span>
        </div>
      ) : (
        'Done'
      )}
    </button>
  );
}

export default DoneBtn;

export const formatCookTime = (minutes: number) => {
  if (minutes < 60) {
    return (
      <>
        <span className="text-normal">{minutes}</span>
        <span className="pl-1 text-xs">min{minutes !== 1 ? 's' : ''}</span>
      </>
    );
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return (
      <>
        <span className="text-normal">{hours}</span>
        <span className="pl-1 text-xs">h</span>
      </>
    );
  }

  return (
    <>
      <span className="text-normal">{hours}</span>
      <span className="pl-1 text-xs">h</span>
      <span className="text-normal pl-1">{remainingMinutes}</span>
      <span className="pl-1 text-xs">
        min{remainingMinutes !== 1 ? 's' : ''}
      </span>
    </>
  );
};

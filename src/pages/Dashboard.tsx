import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useEffect } from 'react';

function Dashboard() {
  const { setLabelLeft, setLabelRight } = useFormConfirm();

  useEffect(() => {
    setLabelLeft('');
    setLabelRight('');
  }, []);

  return (
    <div className="mt-20">
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;

import { useGetUserById } from '@app/shared/hooks/useGetUserById';
import { useParams } from 'react-router-dom';

function PublicProfile() {
  const { profileId } = useParams();
  const { data: user } = useGetUserById(profileId);

  return (
    <div>
      <div>{user.username}</div>
    </div>
  );
}

export default PublicProfile;

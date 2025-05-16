import AuthTitle from '@app/components/ui/AuthTitle';

type AuthCardHeaderProps = {
  title: string;
};

function AuthCardHeader({ title }: AuthCardHeaderProps) {
  return (
    <div className="flex border-b py-3 pl-6 dark:border-[#3b3f4e]">
      <AuthTitle>{title}</AuthTitle>
    </div>
  );
}

export default AuthCardHeader;

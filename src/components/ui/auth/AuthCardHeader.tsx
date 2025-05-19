import AuthTitle from '@app/components/ui/AuthTitle';

type AuthCardHeaderProps = {
  title: string;
};

function AuthCardHeader({ title }: AuthCardHeaderProps) {
  return (
    <div className="flex border-b py-3 pl-6 dark:border-[#424242]">
      <AuthTitle>{title}</AuthTitle>
    </div>
  );
}

export default AuthCardHeader;

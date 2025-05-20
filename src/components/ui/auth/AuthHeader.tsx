type AuthHeaderProps = {
  title: string;
  mb?: number;
};

function AuthHeader({ title, mb = 14 }: AuthHeaderProps) {
  return (
    <div className={`mb-${mb} flex items-center justify-center`}>
      <h1 className="text-4xl font-extrabold tracking-wide text-[#181823] dark:text-white">
        {title}
      </h1>
    </div>
  );
}

export default AuthHeader;

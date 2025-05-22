type AuthHeaderProps = {
  title: string;
};

function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <div className={`mb-14 flex items-center justify-center`}>
      <h1 className="text-4xl font-extrabold tracking-wide text-[#181823] dark:text-white">
        {title}
      </h1>
    </div>
  );
}

export default AuthHeader;

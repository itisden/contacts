import LoginForm, { type SubmissionValues } from "./LoginForm";

const LoginPage = () => {
  const handleSubmit = async (data: SubmissionValues) => {
    alert(data);
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;

import LoginForm, { type SubmissionValues } from "./LoginForm";
import { useLogin } from "../hooks/queries";

const LoginPage = () => {
  const { mutate: login } = useLogin();

  const handleSubmit = async (data: SubmissionValues) => {
    await login(data);
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;

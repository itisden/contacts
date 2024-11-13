import { useLocation, useNavigate } from "react-router-dom";
import LoginForm, { type SubmissionValues } from "./LoginForm";
import { useLogin } from "../hooks/queries";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: login } = useLogin();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (data: SubmissionValues) => {
    await login(data);
    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;

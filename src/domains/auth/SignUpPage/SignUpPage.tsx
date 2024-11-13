import SignUpForm, { type SubmissionValues } from "./SignUpForm";
import { useSignup } from "../hooks/queries";

const SignUpPage = () => {
  const { mutate: signup } = useSignup();

  const handleSubmit = async (data: SubmissionValues) => {
    await signup(data);
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SignUpPage;

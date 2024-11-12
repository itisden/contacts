import SignUpForm, { type SubmissionValues } from "./SignUpForm";

const SignUpPage = () => {
  const handleSubmit = async (data: SubmissionValues) => {
    alert(data);
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SignUpPage;

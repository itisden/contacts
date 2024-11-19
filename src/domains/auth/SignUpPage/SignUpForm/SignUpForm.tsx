import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { routes } from "@/router";

const signUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, "Password is required"),
});

export type SubmissionValues = z.infer<typeof signUpFormSchema>;

type Props = {
  onSubmit: (data: SubmissionValues) => Promise<void>;
};

const SignUpForm = ({ onSubmit }: Props) => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input data-test="email-input" {...field} />
                    </FormControl>
                    <FormMessage data-test="email-msg" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        data-test="password-input"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-test="password-msg" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link data-test="to-login-button" to={routes.auth.login}>
              Login
            </Link>
            <Button
              data-test="submit-button"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Sign up
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignUpForm;

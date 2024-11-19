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
import { type Contact, type ContactWithoutId } from "@/domains/contacts/types";

const contactFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" }),

  fullName: z
    .string()
    .min(3, { message: "Full Name must be at least 3 characters long" })
    .max(50, { message: "Full Name cannot exceed 50 characters" }),

  phoneNumber: z
    .string()
    .min(8, { message: "Phone number must be at least 8 characters long" })
    .max(11, { message: "Phone number cannot exceed 11 characters" }),

  email: z.string().email({ message: "Invalid email format" }),
});

export type SubmissionValues = z.infer<typeof contactFormSchema>;

type Props = {
  onSubmit: (data: SubmissionValues) => Promise<void>;
  contact: Contact | ContactWithoutId;
};

const ContactForm = ({ onSubmit, contact }: Props) => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contact,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              {contact ? "Update Contact" : "Create Contact"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input data-test="username-input" {...field} />
                    </FormControl>
                    <FormMessage data-test="username-msg" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input data-test="fullname-input" {...field} />
                    </FormControl>
                    <FormMessage data-test="fullname-msg" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input data-test="phone-input" {...field} />
                    </FormControl>
                    <FormMessage data-test="phone-msg" />
                  </FormItem>
                )}
              />
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button data-test="cancel" variant="outline" asChild>
              <Link to={routes.home}>Cancel</Link>
            </Button>
            <Button
              data-test="submit"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving" : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ContactForm;

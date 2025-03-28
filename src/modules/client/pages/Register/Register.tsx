import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "@/components/SocialLogin";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useAuthStore from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/utils/errorHandler";
import { AuthRoutes, getAuthRoutes } from "@/routes/routes";

// Define schema for form validation
const registerSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// Type for our form values
type RegisterFormValues = yup.InferType<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Add validation on change
  });

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register({
        email: data.email,
        password: data.password
      });
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate(getAuthRoutes(AuthRoutes.Login));
      }, 500);
    } catch (error) {
      handleAxiosError(error, "Registration failed");
    }
  };

  return (
    <>
    <title>Create an account</title>
    <div className="md:flex items-center justify-center min-h-screen bg-background">
      <div className="md:w-full md:flex items-center justify-center px-6 py-24 relative">
        <div className="w-full max-w-sm space-y-6 m-auto">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              Create an account
            </h1>
            <p className="text-muted-foreground text-sm">
              Let's get started. Fill in the details below to create your
              account.
            </p>
          </div>

          {/* Sign-up form fields */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Email input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "email"> }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          type="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "password"> }) => (
                    <FormItem>
                      <FormLabel>Password <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Minimum 8 characters.
                      </p>
                    </FormItem>
                  )}
                />

                {/* Confirm Password input */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "confirmPassword"> }) => (
                    <FormItem>
                      <FormLabel>Confirm Password <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm Password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sign-up button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!form.formState.isValid || loading.logout}
              >
                {loading.logout ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>

          <SocialLogin />
          <p className="text-sm text-center text-muted-foreground">
            Already have account?{" "}
            <Button
              variant="link"
              className="underline text-foreground p-0 h-auto"
              asChild
            >
              <Link className="underline text-foreground" to={getAuthRoutes(AuthRoutes.Login)}>
                Sign in
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;

// import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "@/components/SocialLogin";
import useAuthStore from "@/store/useAuthStore";
import { handleAxiosError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
// Define schema for form validation
const loginSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  keepSignedIn: yup.boolean().default(false),
});

// Type for our form values
type LoginFormValues = yup.InferType<typeof loginSchema>;

const Login = () => {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
    mode: "onChange", // Add validation on change
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
    // Add authentication logic here
    try {
      await login(data);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      handleAxiosError(error, "Login failed");
    }
  };

  return (
    <div className="md:flex items-center justify-center min-h-screen bg-background">
      <title>Login</title>
      <div className=" md:flex items-center justify-center px-6 py-24 relative">
      

        {/* Sign-in form container */}
        <div className="w-full max-w-sm space-y-6 m-auto">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
         
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: ControllerRenderProps<LoginFormValues, "email"> }) => (
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
                render={({ field }: { field: ControllerRenderProps<LoginFormValues, "password"> }) => (
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
                  </FormItem>
                )}
              />

              {/* Keep signed in and forgot password */}
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="keepSignedIn"
                  render={({ field }: { field: ControllerRenderProps<LoginFormValues, "keepSignedIn"> }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          id="keep-signed-in" 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label htmlFor="keep-signed-in">Keep me signed in</Label>
                    </FormItem>
                  )}
                />
                <Button
                  variant="link"
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                  type="button"
                  asChild
                >
                  <a href="#">Forgot password?</a>
                </Button>
              </div>

              {/* Sign-in button */}
              <Button type="submit" className="w-full" disabled={!form.formState.isValid || loading.login}>{loading.login ? "Signing in..." : "Sign in"}</Button>
            </form>
          </Form>

          <SocialLogin />

          {/* Sign-up link */}
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="underline text-foreground p-0 h-auto"
              asChild
            >
              <Link to="/register">Sign up</Link>
            </Button>
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default Login;

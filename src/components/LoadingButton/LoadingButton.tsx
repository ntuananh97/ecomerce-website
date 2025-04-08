import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";

interface ButtonLoadingProps extends 
  React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children: React.ReactNode;
  asChild?: boolean;
}

const LoadingButton = ({ 
  isLoading = false, 
  children,
  ...props 
}: ButtonLoadingProps) => {
  return (
    <Button {...props}>
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;

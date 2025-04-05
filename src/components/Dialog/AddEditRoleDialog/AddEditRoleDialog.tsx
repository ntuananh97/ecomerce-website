import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRole } from "@/types/roleTypes";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useCreateRole, useUpdateRole } from "@/services/queries/useRoleQuery";
import ButtonLoading from "@/components/LoadingButton";
import { useTranslation } from "react-i18next";

type FormValues = {
  name: string;
};

interface AddEditRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  role?: IRole | null;
}

const AddEditRoleDialog = ({
  isOpen,
  onClose,
  role,
}: AddEditRoleDialogProps) => {
  const { t } = useTranslation();
  const isEditMode = !!role;
  
  const { mutate: createRole, isPending: isCreating } = useCreateRole();
  const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
  
  const isLoading = isCreating || isUpdating;
  
  const form = useForm<FormValues>({
    resolver: yupResolver(
      yup.object({
        name: yup
          .string()
          .required(t("roles.validation.nameRequired"))
          .min(2, t("roles.validation.nameMinLength")),
      })
    ),
    defaultValues: {
      name: role?.name || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: role?.name || "",
      });
    }
  }, [isOpen, role, form]);

  const handleSubmit = (values: FormValues) => {
    if (isEditMode && role) {
      updateRole(
        { 
          id: role._id, 
          data: values 
        }, 
        {
          onSuccess: () => {
            onClose();
          }
        }
      );
    } else {
      createRole(
        values, 
        {
          onSuccess: () => {
            onClose();
          }
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t("roles.editRole") : t("roles.createNewRole")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("roles.roleName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("roles.enterRoleName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {t("common.cancel")}
              </Button>
              <ButtonLoading type="submit" isLoading={isLoading} disabled={isLoading}>
                {isEditMode ? t("common.update") : t("common.create")}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditRoleDialog;
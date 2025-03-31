import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { changePassword } from "@/services/api/authService";
import { handleAxiosError } from "@/utils/errorHandler";

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
};

const ChangePassWord = () => {
  const { t } = useTranslation();

  const formSchema = yup.object({
    currentPassword: yup
      .string()
      .trim()
      .required(t("validation.currentPassword.required")),
    newPassword: yup
      .string()
      .trim()
      .required(t("validation.newPassword.required")),
  });

  const form = useForm<PasswordFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PasswordFormValues) => {
    const formData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      await changePassword(formData);
      toast.success(t("profile.changePassword.success"));
      form.reset();
    } catch (error) {
      handleAxiosError(error, t("profile.changePassword.error"));
    }
  };

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{t("profile.changePassword.title")}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.changePassword.currentPassword")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("profile.changePassword.currentPassword")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.changePassword.newPassword")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("profile.changePassword.newPassword")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">{t("profile.changePassword.submitButton")}</Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePassWord;

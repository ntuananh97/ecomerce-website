import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
import { Separator } from "@/components/ui/separator";
import UploadAvatar from "@/components/UploadAvatar";
import useAuthStore from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ChangePassWord from "./ChangePassWord";

const MyProfile = () => {
  const { t } = useTranslation();
  const [avatarBase64, setAvatarBase64] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const { user, updateMe } = useAuthStore();

  const formSchema = yup.object({
    name: yup.string().trim().required(t("validation.name.required")),
    email: yup.string().email({ message: t("validation.email.invalid") }),
    role: yup.string(),
    phoneNumber: yup
      .string()
      .notRequired()
      .test("phone-format", t("validation.phoneNumber.format"), (value) => {
        if (!value) return true;
        return /^[0][0-9]{9}$/.test(value);
      }),
    city: yup.string(),
    avatar: yup.string().optional(),
  });

  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      phoneNumber: "",
      city: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const userData = {
      name: user?.firstName || "",
      email: user?.email || "",
      role: user?.role?.name || "",
      phoneNumber: user?.phoneNumber || "",
      city: user?.city || "",
      avatar: user?.avatar || "",
    };

    form.reset(userData);
    setAvatarBase64(userData.avatar || undefined);
  }, [form, user]);

  const onSubmit = async (values: yup.InferType<typeof formSchema>) => {
    const formData = {
      firstName: values.name,
      phoneNumber: values.phoneNumber || "",
      avatar: avatarBase64 || undefined,
    };

    try {
      setLoading(true);
      await updateMe(formData);
      toast.success(t("profile.updateSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("profile.updateFailed"));
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar change
  const handleAvatarChange = (base64?: string) => {
    setAvatarBase64(base64 || undefined);
    form.setValue("avatar", base64 || "");
  };

  return (
    <>
      <title>{t("profile.title")}</title>
      <div className="bg-white dark:bg-gray-900 ">
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">My profile</h2>
          </div>
          {/* Avatar Upload Section */}
          <UploadAvatar
            fallbackName={form.getValues("name")}
            initialAvatar={avatarBase64 || undefined}
            onAvatarChange={handleAvatarChange}
          />

          <Separator className="my-6" />

          {/* Profile Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex">
                        {t("profile.name")}{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t("profile.yourName")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("profile.yourEmail")}
                          type="email"
                          {...field}
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.role")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("profile.yourRole")}
                          {...field}
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex">
                        {t("profile.phoneNumber")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("profile.yourPhoneNumber")}
                          type="tel"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.city")}</FormLabel>
                      <div className="space-y-2">
                        <Input placeholder={t("profile.city")} {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? t("profile.saving") : t("profile.saveChanges")}
              </Button>
            </form>
          </Form>
        </section>
        <Separator className="my-4" />
        <ChangePassWord />
      </div>
    </>
  );
};

export default MyProfile;

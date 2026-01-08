"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { Routers } from "@/configs/router.config";
import Image from "next/image";
import CoverImage from "@public/images/admin/sign-in.jpg";
import { useTransition, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const LoginForm = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginSchema) => {
    startTransition(async () => {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      router.push(Routers.admin.dashboard);
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Добро пожаловать</h1>
                <p className="text-gray-500">
                  Войдите в свой аккаунт IT 911
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="username">Логин</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  color="light"
                  {...register("username")}
                />
                <FieldError errors={[errors.username]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  color="light"
                  {...register("password")}
                />
                <FieldError errors={[errors.password]} />
              </Field>

              <Button loading={pending} size="lg" variant="black" type="submit">
                Войти
              </Button>
            </FieldGroup>
          </form>

          <div className="relative hidden md:block">
            <Image
              src={CoverImage}
              alt="Sign in"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card";
import { Link, useRouter } from "@/i18n/navigation";
import { Routers } from "@/configs/router.config";
import CoverImage from "@public/images/admin/sign-in.jpg"
import Image from "next/image";
import { useTransition, type ComponentProps } from "react";
import { useForm } from "react-hook-form";

export const LoginForm = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    startTransition(async () => {
      router.replace(Routers.admin.dashboard);
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
                <p className="text-gray-500 text-balance">
                  Войдите в свой аккаунт IT 911
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  color="light"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                </div>
                <Input id="password" type="password" required color="light" />
              </Field>

              <Button loading={pending} size={"lg"} variant="black" type="submit">
                <span>Войти</span>
              </Button>
            </FieldGroup>
          </form>
          <div className="bg-gray-100 relative hidden md:block">
            <Image
              src={CoverImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
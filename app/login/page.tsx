"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { authClient } from "@/lib/auth/auth-client";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { handleSubmit, control, setError } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSuccessfulSubmit: SubmitHandler<FormData> = async (formData) => {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });

    console.log("data", data);
    console.log("error", error);

    if (error) {
      setError("root", {
        message: error.message ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <main>
      <div>Login page</div>

      <form id="login-form" onSubmit={handleSubmit(onSuccessfulSubmit)}>
        <FieldSet>
          <FieldLegend>Login</FieldLegend>
          <FieldDescription>Description</FieldDescription>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Your email is required",
                pattern: {
                  value: /^[^@\s]+@[^@.\s]+\.[a-zA-Z0-9\-]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <Button type="submit" form="login-form">
        Submit
      </Button>
    </main>
  );
}

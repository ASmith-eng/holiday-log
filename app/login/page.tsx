"use client";

import { useForm, Controller } from "react-hook-form";
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

export default function Login() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <main>
      <div>Login page</div>

      <form
        id="login-form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
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
          </FieldGroup>
        </FieldSet>
      </form>
      <Button type="submit" form="login-form">
        Submit
      </Button>
    </main>
  );
}

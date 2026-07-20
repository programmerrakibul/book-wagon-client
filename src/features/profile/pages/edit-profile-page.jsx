import { Camera, Save } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/store/use-auth-store";
import { getInitials } from "@/utils/utils";
import { useUpdateUserProfile } from "../hooks/use-users";

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.authLoading);

  const [preview, setPreview] = useState(user?.photoUrl ?? "");
  const [imageFile, setImageFile] = useState(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      displayName: user?.name ?? "",
    },
  });

  const mutation = useUpdateUserProfile();

  if (authLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  return (
    <>
      <title>Edit Profile | BookWagon</title>

      <Container className="py-10">
        <Heading
          title="Edit Profile"
          subtitle="Update your account information"
        />

        <Card className="mt-8 max-w-2xl">
          <CardHeader>
            <CardTitle className="text-base">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit((values) =>
                mutation.mutate({
                  displayName: values.displayName,
                  imageFile,
                }),
              )}
              className="space-y-6"
            >
              <div className="flex items-center flex-wrap-reverse gap-6">
                <div className="relative">
                  <Avatar className="size-20">
                    <AvatarImage src={preview} alt={user?.name} />
                    <AvatarFallback className="text-lg">
                      {getInitials(user?.name ?? "U")}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-1 -right-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                    <Camera className="size-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-medium">Profile Photo</p>
                  <p className="text-xs text-muted-foreground">
                    Click the camera icon to change your photo
                  </p>
                </div>
              </div>

              <Controller
                name="displayName"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldContent>
                      <FieldLabel data-invalid={fieldState.invalid}>
                        Display Name
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Spinner className="size-4" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

import { useMemo } from "react";
import { Controller } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function FormField({ field, control, disabled }) {
  const {
    name,
    label,
    type = "input",
    placeholder,
    options,
    accept,
    step,
  } = field;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhfField, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <Field data-invalid={hasError || undefined}>
            <FieldLabel data-invalid={hasError || undefined}>
              {label}
            </FieldLabel>
            <FieldContent>
              {type === "textarea" && (
                <Textarea
                  {...rhfField}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-invalid={hasError || undefined}
                  data-invalid={hasError || undefined}
                  className="min-h-28"
                />
              )}

              {type === "input" && (
                <Input
                  {...rhfField}
                  type={field.inputType || "text"}
                  placeholder={placeholder}
                  disabled={disabled}
                  step={step}
                  aria-invalid={hasError || undefined}
                  data-invalid={hasError || undefined}
                />
              )}

              {type === "file" && (
                <ImageFileField
                  rhfField={rhfField}
                  disabled={disabled}
                  hasError={hasError}
                  accept={accept}
                  previewUrl={field.previewUrl}
                />
              )}

              {type === "select" && (
                <Select
                  value={rhfField.value}
                  onValueChange={rhfField.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger
                    aria-invalid={hasError || undefined}
                    data-invalid={hasError || undefined}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <FieldError>{fieldState.error?.message}</FieldError>
            </FieldContent>
          </Field>
        );
      }}
    />
  );
}

function ImageFileField({ rhfField, disabled, hasError, accept, previewUrl }) {
  const files = rhfField.value;

  const newFilePreview = useMemo(() => {
    if (!files?.length) return null;
    return URL.createObjectURL(files[0]);
  }, [files]);

  const preview = newFilePreview || previewUrl || null;

  return (
    <div className="space-y-3">
      <Input
        type="file"
        accept={accept || "image/*"}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        data-invalid={hasError || undefined}
        onChange={(e) => rhfField.onChange(e.target.files)}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-40 rounded-md object-cover ring-1 ring-border"
        />
      )}
    </div>
  );
}

export { FormField };

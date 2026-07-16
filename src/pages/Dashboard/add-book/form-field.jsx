import ErrorMessage from "@/components/ui/error-message";
import MyInput from "@/components/ui/input";
import MyLabel from "@/components/ui/label";
import { Controller } from "react-hook-form";

const FormField = ({
  label,
  name,
  control,
  rules,
  type = "text",
  placeholder,
  icon: Icon,
  disabled,
  step,
  children,
  className = "",
}) => {
  return (
    <div className="space-y-1 sm:space-y-2">
      <MyLabel
        htmlFor={name}
        label={
          <>
            {label} {rules?.required && <span className="text-error">*</span>}
          </>
        }
      />
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="relative group">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-sm sm:text-base group-focus-within:text-primary transition-colors" />
            )}
            {children ? (
              children({ field, fieldState })
            ) : (
              <MyInput
                id={name}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                step={step}
                className={`pl-10 ${className}`}
                {...field}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value),
                    );
                  } else {
                    field.onChange(e);
                  }
                }}
              />
            )}
            <ErrorMessage message={fieldState.error?.message} />
          </div>
        )}
      />
    </div>
  );
};

export default FormField;

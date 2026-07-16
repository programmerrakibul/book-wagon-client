import ErrorMessage from "@/components/ui/error-message";
import MyLabel from "@/components/ui/label";
import { Controller } from "react-hook-form";

const SelectField = ({
  label,
  name,
  control,
  rules,
  options,
  placeholder,
  icon: Icon,
  disabled,
  loading,
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
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-sm sm:text-base z-10" />
            )}
            <select
              id={name}
              className="select pl-10 text-sm sm:text-base bg-white/60 backdrop-blur-lg hover:bg-white/70 focus:bg-white/80 transition-all shadow-sm w-full"
              disabled={disabled || loading}
              {...field}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ErrorMessage message={fieldState.error?.message} />
          </div>
        )}
      />
    </div>
  );
};

export default SelectField;

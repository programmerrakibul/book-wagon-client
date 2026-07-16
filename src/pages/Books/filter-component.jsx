import { cn } from "@/utils/cn";
import { FaSort } from "react-icons/fa";

const FilterComponent = ({
  data = [],
  isLoading = false,
  value,
  onChange,
  className,
  defaultLabel = "Filter By",
}) => {
  return (
    <div className={cn("col-span-1", className)}>
      <div className="relative">
        <FaSort className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base pointer-events-none z-10" />
        <select
          disabled={isLoading}
          value={value}
          onChange={onChange}
          className="select select-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary appearance-none"
        >
          <option value="" disabled>
            {defaultLabel}
          </option>
          {!isLoading &&
            data.map((f, i) => (
              <option key={f._id || i} value={f.slug}>
                {f.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;

import { cn } from "@/utils/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./input";

const Search = ({ onChange, className, placeholder = "Search..." }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(search.trim());
    }, 700);

    return () => clearTimeout(timer);
  }, [search, onChange]);

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
};

export default Search;

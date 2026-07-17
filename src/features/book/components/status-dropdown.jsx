import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateStatus } from "../hooks/use-books";

const StatusDropdown = ({ bookId, status }) => {
  const statusMutation = useUpdateStatus();

  return (
    <>
      <Select
        value={status}
        onValueChange={(val) => statusMutation.mutate({ bookId, status: val })}
      >
        <SelectTrigger className="h-8 w-36 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
          <SelectItem value="UNPUBLISHED">UNPUBLISHED</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default StatusDropdown;

import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  Layers,
  Weight,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

// eslint-disable-next-line no-unused-vars
function InfoItem({ icon: Icon, iconColor = "text-primary", bgColor = "bg-primary/10", label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3">
      <div className={`rounded-lg ${bgColor} p-2 sm:p-3`}>
        <Icon className={`size-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
        <p className="text-sm font-semibold sm:text-base">{value}</p>
      </div>
    </div>
  );
}

function BookInfoGrid({ book }) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold sm:text-xl sm:mb-6">
          <BookOpen className="size-5 text-primary" />
          Book Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <InfoItem icon={Layers} label="Category" value={book.categoryId?.name} />

          {book.subcategoryId && (
            <InfoItem
              icon={Layers}
              iconColor="text-secondary"
              bgColor="bg-secondary/10"
              label="Sub-Category"
              value={book.subcategoryId.name}
            />
          )}

          <InfoItem icon={FileText} label="Format" value={book.formatId?.name} />

          {book.weight > 0 && (
            <InfoItem icon={Weight} label="Weight" value={`${book.weight} kg`} />
          )}

          <InfoItem icon={Calendar} label="Published" value={`in ${book.publicationYear}`} />

          <InfoItem icon={FileText} label="Pages" value={`${book.pageCount} pages`} />

          <InfoItem
            icon={book.stock > 0 ? CheckCircle : XCircle}
            iconColor={book.stock > 0 ? "text-emerald-600" : "text-red-600"}
            bgColor={book.stock > 0 ? "bg-secondary/10" : "bg-secondary/10"}
            label="Availability"
            value={book.stock > 0 ? "In Stock" : "Out of Stock"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { BookInfoGrid, InfoItem };

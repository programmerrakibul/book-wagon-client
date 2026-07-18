import { FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

function BookDescription({ description }) {
  if (!description) return null;

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold sm:text-xl sm:mb-4">
          <FileText className="size-5 text-primary" />
          Description
        </h2>
        <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export { BookDescription };

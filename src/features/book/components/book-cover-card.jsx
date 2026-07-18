import { Package, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function BookCoverCard({ photoUrl, name, stock }) {
  return (
    <Card className="overflow-hidden py-0">
      <div className="relative">
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          className="aspect-3/4 w-full object-cover"
        />
        <div className="absolute top-3 right-3">
          {stock > 0 ? (
            <Badge variant="default" className="gap-1 px-3 py-1">
              <Package className="size-3" />
              {stock} in stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1 px-3 py-1">
              <XCircle className="size-3" />
              Out of Stock
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

export { BookCoverCard };

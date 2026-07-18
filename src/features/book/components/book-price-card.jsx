import { Tag } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

function BookPriceCard({ price, discountedPrice, discount }) {
  return (
    <Card className="bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
      <CardContent className="flex items-center gap-3 p-4 sm:p-6">
        <Tag className="size-7 text-primary sm:size-8" />
        <div>
          <p className="text-xs text-muted-foreground sm:text-sm">Price</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              &#2547; {price}
            </p>
            {discount > 0 && discountedPrice && (
              <p className="text-sm text-muted-foreground line-through">
                &#2547; {discountedPrice}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { BookPriceCard };

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const AuthorCard = ({ author }) => {
  return (
    <Card className="shadow-2xl h-full">
      <CardContent className="p-6 sm:p-8">
        <div className="flex justify-center mb-4 sm:mb-6">
          <Avatar className="size-24 sm:size-32">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback className="text-lg">
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
          {author.name}
        </h3>

        <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed mb-4 sm:mb-6 line-clamp-3">
          {author.bio}
        </p>

        <div className="bg-primary/5 rounded-lg p-4">
          <QuoteIcon className="size-5 text-primary mb-2" />
          <p className="text-xs sm:text-sm italic text-muted-foreground">
            {author.quote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;

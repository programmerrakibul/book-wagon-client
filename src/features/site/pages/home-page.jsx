import { useEffect } from "react";

import { Banner } from "../components/banner";
import { LatestBooks } from "../components/latest-books";
import { ReadingTips } from "../components/reading-tips";
import { Authors } from "../components/authors";
import { ChooseUs } from "../components/choose-us";
import { Values } from "../components/values";
import { Coverage } from "../components/coverage";
import { FAQ } from "../components/faq";
import { NewsLetter } from "../components/news-letter";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home | BookWagon";
  }, []);

  return (
    <main>
      <Banner />
      <LatestBooks />
      <ReadingTips />
      <Authors />
      <ChooseUs />
      <Values />
      <Coverage />
      <FAQ />
      <NewsLetter />
    </main>
  );
}

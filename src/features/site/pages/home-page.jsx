import { Authors } from "../components/authors";
import { Banner } from "../components/banner";
import { ChooseUs } from "../components/choose-us";
import { Coverage } from "../components/coverage";
import { FAQ } from "../components/faq";
import { LatestBooks } from "../components/latest-books";
import { NewsLetter } from "../components/news-letter";
import { ReadingTips } from "../components/reading-tips";
import { Values } from "../components/values";

export default function HomePage() {
  return (
    <>
      <title>Home | BookWagon</title>

      <Banner />
      <LatestBooks />
      <ReadingTips />
      <Authors />
      <ChooseUs />
      <Values />
      <Coverage />
      <FAQ />
      <NewsLetter />
    </>
  );
}

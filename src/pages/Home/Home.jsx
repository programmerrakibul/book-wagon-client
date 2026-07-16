import Authors from "./authors";
import Banner from "./banner";
import ChooseUs from "./choose-us";
import Coverage from "./coverage";
import FAQ from "./faq";
import LatestBooks from "./latest-books";
import NewsLetter from "./news-letter";
import ReadingTips from "./reading-tips";
import Values from "./values";

const Home = () => {
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
};

export default Home;

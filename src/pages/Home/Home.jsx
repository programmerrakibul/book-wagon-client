import Authors from "./Authors";
import Banner from "./Banner";
import ChooseUs from "./ChooseUs";
import Coverage from "./Coverage";
import FAQ from "./FAQ";
import LatestBooks from "./LatestBooks";
import NewsLetter from "./NewsLetter";
import ReadingTips from "./ReadingTips";
import Values from "./Values";

const Home = () => {
  return (
    <>
      <title>Home - BookWagon</title>

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

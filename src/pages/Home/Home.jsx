import Banner from "./Banner";
import ChooseUs from "./ChooseUs";
import Coverage from "./Coverage";
import FAQ from "./FAQ";
import LatestBooks from "./LatestBooks";
import NewsLetter from "./NewsLetter";

const Home = () => {
  return (
    <>
      <title>Home - BookWagon</title>

      <Banner />
      <LatestBooks />
      <ChooseUs />
      <Coverage />
      <FAQ />
      <NewsLetter />
    </>
  );
};

export default Home;

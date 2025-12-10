import Container from "../shared/Container/Container";
import ChooseUs from "./ChooseUs";
import Coverage from "./Coverage";
import LatestBooks from "./LatestBooks";
import NewsLetter from "./NewsLetter";

const Home = () => {
  return (
    <>
      <title>Home - BookWagon</title>

      <section>
        <Container>This is Home Page</Container>
      </section>

      <LatestBooks />
      <ChooseUs />
      <Coverage />
      <NewsLetter />
    </>
  );
};

export default Home;

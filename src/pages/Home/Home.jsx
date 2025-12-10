import Container from "../shared/Container/Container";
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

      <NewsLetter />
    </>
  );
};

export default Home;

import Container from "../shared/Container/Container";
import LatestBooks from "./LatestBooks";

const Home = () => {
  return (
    <>
      <title>Home - BookWagon</title>

      <section>
        <Container>This is Home Page</Container>
      </section>

      <LatestBooks />
    </>
  );
};

export default Home;

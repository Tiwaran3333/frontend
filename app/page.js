import Carousel from "./components/Carousel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Carousel>
        <h1 className="font-bold text-blue-300 text-center">Home page</h1>
      </Carousel>
      
      <Footer />
    </>
  );
}

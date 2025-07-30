import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Card from "./components/Card";
export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Carousel>
        <h1 className="font-bold text-blue-300 text-center">Home page</h1>
      </Carousel>
      <Card />
      <Footer />
    </div>
  );
}
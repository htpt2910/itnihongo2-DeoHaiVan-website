import { Footer } from "../../../components/user/Footer";
import { Navbar } from "../../../components/user/Navbar";
import { Posts } from "../../../components/user/posts";
import { Stories } from "../../../components/user/stories";
import "./homepage.css";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Stories />
      <Posts />
      <Footer />
    </div>
  );
};

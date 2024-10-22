import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

const GlobalLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </div>
  );
};

export default GlobalLayout;

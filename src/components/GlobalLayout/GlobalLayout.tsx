import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

const GlobalLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Content>
        <Outlet />
        <Toaster />
      </Content>
      <Footer />
    </div>
  );
};

export default GlobalLayout;

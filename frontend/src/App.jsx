import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ToastContainer />
      <MainHeader/>
      <main className="py-3">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;

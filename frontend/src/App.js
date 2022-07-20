import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import NotFound from "./pages/notFound";
import { Slide, ToastContainer } from "react-toastify";
import { UserProvider } from "./context/userContext";
import LoadingContext from "./context/appLoadingContext";
import { useContext } from "react";
import Spinner from "./components/spinner";

export default function App() {
  const { loading } = useContext(LoadingContext);

  return (
    <div className="container">
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
      {loading && <Spinner />}
      <ToastContainer
        transition={Slide}
        theme="colored"
        position="top-center"
      />
    </div>
  );
}

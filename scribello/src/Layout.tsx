import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

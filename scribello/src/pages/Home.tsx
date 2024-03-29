import Header from "../components/home/header/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

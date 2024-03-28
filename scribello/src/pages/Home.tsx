import Header from "../components/home/header/Header";
import { useUserContextGlobal } from "../lib/UserContext";
import BookListing from "./BookListing";

export default function Home() {
  const { user } = useUserContextGlobal();
  return (
    <main className="">
      <Header />
      <BookListing />
    </main>
  );
}

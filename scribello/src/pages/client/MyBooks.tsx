import { useEffect, useState } from "react";
import { useUserContextGlobal } from "../../lib/UserContext";
import { db } from "../../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import Book from "../Book";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../lib/context";
import emptyBasket from "../../assets/images/basket-02.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function MyBooksPage() {
  const { user } = useUserContextGlobal();
  const { loading, setLoading } = useGlobalContext();
  const [userBookCollection, setUserBookCollection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const bookCollectionRef = collection(db, "users", user?.uid, "books");
        const booksDocsSnap = await getDocs(bookCollectionRef);

        const bookCollection = [];

        booksDocsSnap.forEach((doc) => {
          const book = doc.data().data;
          bookCollection.push(book);
        });

        setUserBookCollection(bookCollection);
      } catch (error) {
        console.error("Could not load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  const nonUserButtons = (
    <>
      <Link to="/sign-in">
        <button className="px-4 py-2  text-purple-800 font-bold font-title rounded-md bg-neutral-200">
          Sign In
        </button>
      </Link>
      <Link to="/sign-up">
        <button className="px-4 py-2 font-bold font-title bg-purple-800 text-white rounded-md">
          Register
        </button>
      </Link>
    </>
  );

  if (loading) return <Loader />;

  if (!user)
    return (
      <div className="flex flex-col gap-2">
        <main className="bg-purple-600 w-[75vw] mx-auto max-w-7xl rounded-xl py-8 mt-8 text-neutral-200 container">
          <div className="flex flex-col items-center px-6">
            <img src={emptyBasket} alt="" className="size-64" />
            <h1 className="text-xl lg:text-2xl text-center font-title font-extrabold">
              You must be logged in to add & view books.
            </h1>

            <div className="flex gap-2 items center mt-4">{nonUserButtons}</div>
          </div>
        </main>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 self-center text-sm hover:text-purple-800"
        >
          <FaArrowLeft />
          <span>Go back to BookBunny.com</span>
        </button>
      </div>
    );

  return (
    <main>
      <h1 className="text-4xl text-center font-title font-extrabold my-8">
        My Books:
      </h1>
      <div className="grid lg:grid-cols-4 gap-6 w-[80vw] max-w-screen mx-auto">
        {userBookCollection.map((item, index) => {
          return <Book key={index} {...item} />;
        })}
      </div>
    </main>
  );
}

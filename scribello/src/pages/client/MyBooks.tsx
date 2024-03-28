import { useEffect, useState } from "react";
import { useUserContextGlobal } from "../../lib/UserContext";
import { db } from "../../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import Book from "../Book";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../lib/context";

export default function MyBooksPage() {
  const { user } = useUserContextGlobal();
  const { loading, setLoading } = useGlobalContext();
  const [userBookCollection, setUserBookCollection] = useState([]);

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

  if (loading) return <Loader />;
  return (
    <main>
      <Navbar />
      <h1 className="text-4xl text-center font-title font-extrabold my-8">
        My Books:
      </h1>
      <div className="grid lg:grid-cols-4 gap-6 w-full">
        {userBookCollection.map((item, index) => {
          return <Book key={index} {...item} />;
        })}
      </div>
    </main>
  );
}

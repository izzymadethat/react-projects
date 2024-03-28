import { FaBookmark, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContextGlobal } from "../lib/UserContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

export default function Book(book) {
  const { user } = useUserContextGlobal();

  const [bookAdded, setBookAdded] = useState(false);

  useEffect(() => {
    const fetchBookInfo = async (userId, bookData) => {
      const bookRef = doc(db, "users", userId, "books", bookData.id);
      const bookSnap = await getDoc(bookRef);

      if (bookSnap.exists()) {
        setBookAdded(true);
      }
    };

    fetchBookInfo(user?.uid, book);
  }, []);

  const addBookToUserCollection = async (userId, bookData) => {
    const bookRef = doc(db, "users", userId, "books", bookData.id);

    try {
      await setDoc(bookRef, {
        data: bookData,
        dateAdded: serverTimestamp(),
      });
      setBookAdded(true);
    } catch (error) {
      console.error("Error adding book to collection");
    }

    return;
  };
  return (
    <div className="flex flex-col justify-between items-center gap-4 mb-8 bg-purple-100 p-12 rounded-lg shadow-lg">
      <div>
        <img
          src={book.coverImg}
          alt="cover"
          className="w-64 mx-auto hover:opacity-50 cursor-pointer"
        />

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center my-2">
            <h3 className="text-2xl text-center font-title font-black">
              {book.title}
            </h3>
            <span className="font-title text-lg">{book.firstPublished}</span>
          </div>

          <p className="font-text max-w-64">
            <span>Author: </span>
            <span>{book.author.join(", ")}</span>
          </p>

          <div>
            <span className="text-gray-700 tracking-wide font-title font-semibold italic">
              Edition: {book.edition}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <div
          className="py-2 px-4 border border-purple-800 rounded-md shadow-md w-fit flex items-center gap-1 hover:text-purple-800/80 cursor-pointer"
          onClick={() => addBookToUserCollection(user?.uid, book)}
        >
          {bookAdded ? (
            <>
              <FaCheckCircle />
              {""}
              <p className="text-purple-800 font-bold font-text text-sm text-center">
                Added to your collection
              </p>
            </>
          ) : (
            <>
              <FaBookmark />
              {""}
              <p className="text-purple-800 font-bold font-text text-sm">
                Add to Collection
              </p>
            </>
          )}
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950/80 rounded-md shadow-md"
        >
          <button className="text-neutral-200 font-bold font-text text-sm">
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
}

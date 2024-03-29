import {
  FaBookmark,
  FaCheckCircle,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUserContextGlobal } from "../lib/UserContext";
import {
  addDoc,
  collection,
  deleteDoc,
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
  const navigate = useNavigate();

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
      console.error("Error adding book to collection", error);
    }

    return;
  };

  //Remove book from collection -- Exclusive to My Books
  const removeFromCollection = async (userId, bookId) => {
    const bookRef = doc(db, "users", userId, "books", bookId);

    window.confirm(`${book?.title} will be erased from your collections. `);

    try {
      const bookSnap = await getDoc(bookRef);

      if (bookSnap.exists()) {
        await deleteDoc(bookRef);
        setBookAdded(false);
        navigate(0);
      }
    } catch (error) {
      console.error("Error deleting book from collection", error);
    }
  };
  return (
    <div className="flex flex-col justify-between items-center gap-4 mb-8 bg-purple-100 p-12 rounded-lg shadow-lg w-full">
      <div>
        <Link to={`/book/${book.id}`}>
          <img
            src={book.coverImg}
            alt="cover"
            className="size-64 mx-auto hover:opacity-50 cursor-pointer"
          />
        </Link>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center my-2 font-title gap-2">
            <h3 className="text-lg leading-60 text-center font-extrabold">
              {book.title}
            </h3>
            <span>{book.firstPublished}</span>
          </div>

          <p className="font-text text-center text-sm max-w-64">
            <span className="font-bold">Author: </span>
            <span>{book.author.join(", ")}</span>
          </p>

          <div>
            <span className="text-gray-700 tracking-wide font-title font-semibold italic text-sm">
              Edition: {book.edition}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row lg:justify-center gap-2">
          <button
            className="py-2 px-4 border border-purple-800 rounded-md shadow-md flex justify-center items-center gap-1 cursor-pointer text-purple-800"
            onClick={() => addBookToUserCollection(user?.uid, book)}
            type="button"
            disabled={bookAdded}
          >
            {bookAdded ? (
              <>
                {""}
                <FaCheckCircle size={15} />
                <p className="font-bold font-text text-sm">Booked!</p>
              </>
            ) : (
              <>
                <FaBookmark />
                {""}
                <p className="font-bold font-text text-sm">Add to Collection</p>
              </>
            )}
          </button>
          <Link
            to={`/book/${book.id}`}
            className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-950/80 rounded-md shadow-md "
          >
            <button className="flex w-full justify-center items-center gap-2 text-neutral-200 font-bold font-text text-sm">
              <FaInfoCircle />
              More Details
            </button>
          </Link>
        </div>
        {bookAdded && (
          <div className="flex justify-center mt-2">
            <button
              onClick={() => removeFromCollection(user?.uid, book?.id)}
              className="bg-red-500 p-2 flex items-center gap-2 text-neutral-200 text-sm rounded-md font-bold"
            >
              Remove from My Books
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

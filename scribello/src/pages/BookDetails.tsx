import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import coverImg from "../assets/images/no-cover.png";
import Loader from "../components/Loader";
import { FaArrowLeft, FaBookmark, FaCheckCircle } from "react-icons/fa";

import { useUserContextGlobal } from "../lib/UserContext";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const URL = "https://openlibrary.org/works/";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useUserContextGlobal();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [bookAdded, setBookAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);

        const data = await response.json();

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
            authors,
          } = data;

          const newBook = {
            id,
            description: description
              ? description.value
              : "No description found",

            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found.",
            authors: authors ? authors.join(", ") : "Author(s) not available.",
          };

          setBook(newBook);
          fetchBookInfo(user?.uid, newBook);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.log("Could not retrieve book details", error);
      } finally {
        setLoading(false);
      }
    }

    const fetchBookInfo = async (userId, bookData) => {
      const bookRef = doc(db, "users", userId, "books", bookData?.id);
      const bookSnap = await getDoc(bookRef);

      if (bookSnap.exists()) {
        setBookAdded(true);
      }
    };

    getBookDetails();
  }, [id, user]);

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

  if (loading) return <Loader />;
  return (
    <section className="w-full mb-12">
      <div>
        <button
          type="button"
          className="flex justify-center items-center gap-2 my-4 ml-4"
          onClick={() => navigate("/books")}
        >
          <FaArrowLeft size={22} />
          <span className="lg:text-xl font-text">Back to listing</span>
        </button>

        <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-7xl  mx-auto">
          <img
            src={book?.cover_img}
            alt="cover"
            className="w-48 lg:w-96 lg:max-w-lg"
          />

          <div className="flex flex-col justify-center items-center lg:items-start mt-4 w-full gap-4 lg:ml-16 ">
            <h2 className="font-title font-extrabold text-center lg:text-left text-2xl">
              {book?.title}
            </h2>

            <p
              className={`${
                book?.description === "No description found"
                  ? "text-gray-700 italic "
                  : ""
              } font-text text-center max-w-sm lg:max-w-xl leading-6 lg:text-left`}
            >
              {book?.description}
            </p>

            <p
              className={`${
                book?.description === "No description found"
                  ? "text-gray-700 italic "
                  : ""
              } font-text text-center max-w-sm lg:max-w-xl leading-6 lg:text-left`}
            >
              <span>Author(s): </span>
              {book?.authors}
            </p>

            <div>
              <span className="font-title font-semibold lg:text-lg">
                Subject Places:{" "}
              </span>
              <span className="font-text ">{book?.subject_places}</span>
            </div>
            <div>
              <span className="font-title font-semibold lg:text-lg">
                Subject Times:{" "}
              </span>
              <span className="font-text ">{book?.subject_times}</span>
            </div>
            <div>
              <span className="font-title font-semibold lg:text-lg">
                Subjects:{" "}
              </span>
              <span className="font-text ">{book?.subjects}</span>
            </div>

            {/* buttons */}
            <div className="flex justify-center lg:justify-normal mt-4 gap-2 w-full">
              <button
                className="py-2 px-4 border border-purple-800 rounded-md shadow-md w-fit flex items-center gap-1 hover:text-purple-800/80 cursor-pointer"
                onClick={() => addBookToUserCollection(user?.uid, book)}
                type="button"
                disabled={bookAdded}
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

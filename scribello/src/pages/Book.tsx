import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Book(book) {
  return (
    <div className="flex flex-col justify-between items-center gap-4 mb-8 bg-purple-100 p-12 rounded-lg shadow-lg">
      <div>
        <img
          src={book.coverImg}
          alt="cover"
          className="w-72 hover:opacity-50 cursor-pointer"
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
        <Link
          to="/"
          className="py-2 px-4 border border-purple-800 rounded-md shadow-md w-fit flex items-center gap-1"
        >
          <FaBookmark />
          {""}
          <button className="text-purple-800 font-bold font-text text-sm">
            Add to Collection
          </button>
        </Link>
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

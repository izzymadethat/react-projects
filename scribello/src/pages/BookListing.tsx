import Loader from "../components/Loader";
import { useGlobalContext } from "../lib/context";
import Book from "./Book";

export default function BookListing() {
  const { books, loading, resultTitle, searchTerm } = useGlobalContext();

  const booksWithCovers = books.map((book) => {
    return {
      ...book,

      id: book.id.replace("/works/", ""),
      coverImg: book.coverId
        ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
        : "../src/assets/images/no-cover.png",
    };
  });

  console.log(booksWithCovers);

  if (loading) return <Loader />;

  return (
    <section className="my-10 mx-12">
      <div className="container flex justify-center">
        <h2 className="font-semibold font-text text-3xl mb-4">
          {resultTitle} for{" "}
          <span className="text-purple-600 font-extrabold">{searchTerm}</span>
        </h2>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 w-full">
        {booksWithCovers.slice(0, 30).map((item, index) => {
          return <Book key={index} {...item} />;
        })}
      </div>
    </section>
  );
}

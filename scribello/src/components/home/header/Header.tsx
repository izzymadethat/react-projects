import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import SearchForm from "../SearchForm";
import "../home.css";

export default function Header() {
  const [quoteDetails, setQuoteDetails] = useState({
    quote: "",
    book: "",
    author: "",
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://recite.onrender.com/random/quote-from-db"
        );

        if (response.ok) {
          const data = await response.json();

          const { quote, book, author } = data;

          setQuoteDetails({ quote, book, author });
        }
      } catch (error) {
        console.log("Error getting a book quote", error);
        setQuoteDetails(null);
      }
    };

    fetchQuote();
  }, []);
  return (
    <div>
      <header className="header-content">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="text-5xl uppercase font-title font-extrabold text-neutral-200 text-center">
            Find your Next Read.
          </h2>
          <div className=" flex flex-col justify-center items-center max-w-[75vw] lg:max-w-[50vw">
            <p className="font-text text-lg text-neutral-200">
              {quoteDetails.quote}
            </p>
            <p className="font-text  text-neutral-300 italic font-medium">
              -{quoteDetails.author}, {quoteDetails.book}
            </p>
          </div>
          <SearchForm />
        </div>
      </header>
    </div>
  );
}

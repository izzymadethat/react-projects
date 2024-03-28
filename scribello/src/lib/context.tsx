import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  createContext,
  ReactNode,
} from "react";

// interface ContextProps {
//   loading: boolean;
//   books: any[];
//   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//   resultTitle: string;
//   setResultTitle: React.Dispatch<React.SetStateAction<string>>;
// }

// const initialContext: ContextProps = {
//   loading: false,
//   books: [],
//   setSearchTerm: () => {},
//   resultTitle: "",
//   setResultTitle: () => {},
// };

const URL = "https://openlibrary.org/search.json?title=";
const AppContext = createContext(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("long last");
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;
      if (docs) {
        const booksFound = docs.slice(0, 20).map((book) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = book;

          return {
            id: key,
            author: author_name,
            coverId: cover_i,
            edition: edition_count,
            firstPublished: first_publish_year,
            title: title,
          };
        });

        setBooks(booksFound);

        if (booksFound.length > 1) {
          setResultTitle("Your Search Results");
        } else {
          setBooks([]);
          setResultTitle("No Books Found...");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        searchTerm,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../lib/context";
import { useEffect, useRef } from "react";

export default function SearchForm() {
  const navigate = useNavigate();
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const searchText = useRef("");

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const tempSearchTerm = searchText.current.value.trim();

    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setSearchTerm("The Great Gatsby");
      setResultTitle("Please enter a title");
    } else {
      setSearchTerm(searchText.current.value);
    }

    navigate("/books");
  };
  return (
    <div>
      <form className="flex w-full max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex items-center relative z-10">
          <input
            type="text"
            className="w-[40vw] text-xl py-4 px-6 rounded-full outline-none shadow-md text-purple-700 font-semibold relative z-10"
            placeholder="The Great Gatsby ..."
            ref={searchText}
          />
          <button
            type="submit"
            className="flex absolute right-5 z-50"
            onClick={handleSubmit}
          >
            <FaSearch className="text-purple-800" size={30} />
          </button>
        </div>
      </form>
    </div>
  );
}

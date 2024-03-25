import Navbar from "../../Navbar";
import SearchForm from "../SearchForm";
import "../home.css";

export default function Header() {
  return (
    <div>
      <Navbar />
      <header className="header-content">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="text-5xl uppercase font-title font-extrabold text-neutral-200">
            Find your Next Read.
          </h2>
          <p className="font-text text-lg max-w-2xl text-neutral-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            maxime possimus beatae nemo aspernatur quos quaerat ea nisi. Id
            magni hic nostrum. Consectetur, cupiditate sed. Iure inventore iusto
            beatae sapiente.
          </p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
}

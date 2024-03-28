import { useUserContextGlobal } from "../../lib/UserContext";
import { Link, redirect, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/images/bookbunny-logo.png";
import Form from "../auth/components/Form";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  const { user, errorMessage, googleSignIn } = useUserContextGlobal();

  const navigate = useNavigate();

  if (user) return navigate("/");

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <Link to="/" className="flex items-center">
        <img src={mainLogo} className="w-40 relative top-10" alt="" />
        <h1 className="relative top-14 right-6 text-7xl font-text tracking-tight  font-extrabold bg-gradient-to-r from-purple-900 via-amber-600 to-purple-800 bg-clip-text text-transparent z-50">
          BookBunny
        </h1>
      </Link>

      <div className="p-12 flex flex-col justify-center bg-neutral-100 rounded-lg w-[75vw] lg:max-w-[600px] shadow-xl">
        <Form submitType="Sign In" />
        <button
          onClick={googleSignIn}
          className="bg-amber-600 text-neutral-100 uppercase w-full mt-4 p-2 rounded-lg font-text font-bold flex justify-center items-center gap-2 text-lg"
        >
          <FaGoogle />
          Sign in with Google
        </button>

        <div className="flex flex-col-reverse gap-6 lg:flex-row lg:gap-0  justify-between items-center mt-10">
          <Link
            to="/"
            className="text-sm font-text font-light flex gap-1 items-center hover:text-purple-800"
          >
            <FaArrowLeft />
            Go back to BookBunny.com
          </Link>
          <Link
            to="/sign-in"
            className="text-sm underline font-text font-light hover:text-purple-800"
          >
            Need an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

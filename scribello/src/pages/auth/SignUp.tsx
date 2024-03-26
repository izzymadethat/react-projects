import Form from "./components/Form";
import { useUserContextGlobal } from "../../lib/UserContext";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/images/bookbunny-logo.png";
import { useEffect } from "react";

export default function SignUpPage() {
  const {
    signUp,
    loading,
    setEmail,
    setPassword,
    user,
    email,
    password,
    errorMessage,
  } = useUserContextGlobal();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate("/");
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex items-center">
        <img src={mainLogo} className="w-40 relative top-10" alt="" />
        <h1 className="relative top-14 right-6 text-7xl font-text tracking-tight  font-extrabold bg-gradient-to-r from-purple-900 via-amber-600 to-purple-800 bg-clip-text text-transparent z-50">
          BookBunny
        </h1>
      </div>
      <div className=" px-12 flex flex-col justify-center bg-neutral-100 rounded-lg w-[75vw] lg:max-w-[600px] h-96 shadow-xl">
        <Form submitType="Sign Up" />
      </div>
    </div>
  );
}

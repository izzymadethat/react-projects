import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useUserContextGlobal } from "../../../lib/UserContext";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const styles = {
  input:
    "w-full p-3 rounded-md ring-purple-500 focus:outline-purple-600 shadow-md text-purple-600 lg:text-lg font-text font-bold",
  label: "font-extrabold uppercase font-title text-lg lg:text-xl",
  icon: "hidden lg:absolute right-20 top-1/2 -translate-y-1/2",
  formEl: "w-full flex flex-col items-center lg:items-start gap-2",
};

export default function Form({ submitType }: { submitType: string }) {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const {
    setEmail,
    setPassword,
    signIn,
    signUp,
    email,
    password,
    errorMessage,
    loading,
  } = useUserContextGlobal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    if (submitType === "Sign In") {
      signIn(e);
    } else if (submitType === "Sign Up") {
      const userSignedUp = signUp(e);
      if (userSignedUp) {
        toast("Welcome to BookBunny!");
      }
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className={styles.formEl}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formEl}>
          <label className={styles.label}>Password</label>
          <div className="relative w-full">
            <input
              type={toggleShowPassword ? "text" : "password"}
              placeholder="Password..."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end items-center mt-4 gap-2">
              <input
                type="checkbox"
                checked={toggleShowPassword}
                onChange={() => setToggleShowPassword(!toggleShowPassword)}
                className="size-4"
              />
              <label>{toggleShowPassword ? "Hide " : "Show "} Password</label>
            </div>
            <span
              className={styles.icon}
              onClick={() => setToggleShowPassword(!toggleShowPassword)}
            >
              {toggleShowPassword ? (
                <FaEyeSlash size={26} />
              ) : (
                <FaEye size={26} />
              )}
            </span>
          </div>
        </div>

        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <button
            type="submit"
            className="bg-purple-600 text-neutral-100 p-4 lg:text-2xl font-title font-extrabold tracking-wide rounded-md"
          >
            {submitType}
            {submitType === "Sign Up" && " For Free"}
          </button>
        )}
      </form>
    </div>
  );
}

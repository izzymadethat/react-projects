/**
 * User Context
 * Authenticates user and passes down information to other components
 *
 * Authenticate user via firebase auth
 *    - create a function that calls for sign in with email and password
 *    - pass down so it can be called within an Auth component
 *    - also pass the login with google function down to Auth component
 *    - if user, add information to user state
 *    - update the component based on user auth changed
 */

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // update the state of the user based on if there are now credentials
  const getAuthState = useCallback(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  // sign the user in function
  const signIn = async () => {
    if (!email || !password) return;

    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials) {
        setUser(userCredentials.user);
        const firstName = user?.displayName?.split(" ")[0];
        toast(`Welcome Back!`);
        return redirect("/");
      } else {
        setErrorMessage("Could not sign in user");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  // sign the user up function
  const signUp = async () => {
    if (!email || !password) return;

    setLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials) {
        setUser(userCredentials.user);
        const firstName = user?.displayName?.split(" ")[0];
        return true;
      } else {
        setErrorMessage("Could not sign up user");
        return false;
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message as string);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  const authContext = {
    loading,
    email,
    setEmail,
    password,
    setPassword,
    user,
    errorMessage,
    signIn,
    signUp,
    signOut,
  };

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

type UserContextProps = {
  loading: boolean;
  email?: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password?: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  errorMessage?: string | undefined;
  signIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signOut: () => void;
};

export const useUserContextGlobal = () => {
  return useContext<UserContextProps>(UserContext);
};

export { UserContext, AuthProvider };

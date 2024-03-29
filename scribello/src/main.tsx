import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import BookListing from "./pages/BookListing";
import BookDetails from "./pages/BookDetails";
import { AppProvider } from "./lib/context.tsx";
import { AuthProvider } from "./lib/UserContext.tsx";
import SignInPage from "./pages/auth/SignIn.tsx";
import SignUpPage from "./pages/auth/SignUp.tsx";
import ViewAccountPage from "./pages/auth/ViewAccount.tsx";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import MyBooksPage from "./pages/client/MyBooks.tsx";
import RootLayout from "./Layout.tsx";
import About from "./pages/About.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <AuthProvider>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="books" element={<BookListing />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="my-books" element={<MyBooksPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="account" element={<ViewAccountPage />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </AuthProvider>
  </AppProvider>
);

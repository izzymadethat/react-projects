import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import BookListing from "./pages/BookListing";
import BookDetails from "./pages/BookDetails";
import { AppProvider } from "./lib/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="books" element={<BookListing />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

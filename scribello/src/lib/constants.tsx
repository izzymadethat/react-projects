import { FaBookReader, FaHome, FaInfo, FaUser } from "react-icons/fa";

export const navLinks = [
  { name: "Home", path: "/", icon: <FaHome size={32} /> },
  { name: "About", path: "/about", icon: <FaInfo size={32} /> },
  { name: "My Books", path: "/my-books", icon: <FaBookReader size={32} /> },
  { name: "My Account", path: "/account", icon: <FaUser size={32} /> },
];

import { NavLink, useLocation } from "react-router-dom";
import StairsIcon from "@mui/icons-material/Stairs";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { useEffect, useRef, useState } from "react";

import DarkToggleButton from "../DarkToggleButton";
import styles from "./Navbar.module.css";

const navLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const headerRef = useRef(null);

  // Close the mobile menu after navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu when tapping outside the navbar or pressing Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div ref={headerRef} className={styles.header}>
      <div className={styles.logo}>
        <StairsIcon color="primary" />
        Tech Insight
      </div>
      <button
        className={styles.dropdownToggle}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        aria-controls="dropdownMenu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <DensityMediumIcon className={styles.navIcon} />
      </button>
      <div
        className={`${styles.dropdown} ${menuOpen ? styles.open : ""}`}
        id="dropdownMenu"
        onClick={() => setMenuOpen(false)}
      >
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/articles" className={navLinkClass}>
          Articles
        </NavLink>
        <a href="#" className={styles.link}>
          About
        </a>
        <a href="#" className={styles.link}>
          Contact
        </a>
      </div>

      <div className={styles.toggleWrap}>
        <DarkToggleButton />
      </div>

      <button className={styles.signIn}>Sign In</button>
    </div>
  );
}

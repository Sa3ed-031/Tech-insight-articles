import { NavLink } from "react-router-dom";
import StairsIcon from "@mui/icons-material/Stairs";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <StairsIcon color="primary" />
        Tech Insight
      </div>
      <div className={styles.nav}>
        <NavLink to="/" className={styles.navLink}>
          Home
        </NavLink>
        <NavLink to="/articles" className={styles.navLink}>
          Articles
        </NavLink>
        <NavLink to="/about" className={styles.navLink}>
          About
        </NavLink>
        <NavLink to="/contact" className={styles.navLink}>
          Contact
        </NavLink>
      </div>
      <div className={styles.meta}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Tech Insight. All rights reserved
        </p>
        <small className={styles.attribution}>
          Articles provided by the{" "}
          <a
            className={styles.attributionLink}
            href="https://developers.forem.com/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            DEV Community API
          </a>
          .
        </small>
      </div>
    </div>
  );
}

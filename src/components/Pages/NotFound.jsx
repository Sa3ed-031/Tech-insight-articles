import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import pageStyles from "./Page.module.css";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={`${pageStyles.page} ${styles.page}`}>
      <div className={`${pageStyles.card} ${styles.card}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={pageStyles.title}>Page not found</h1>
        <p className={pageStyles.lead}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={`${pageStyles.button} ${styles.home}`}>
          <HomeIcon fontSize="small" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

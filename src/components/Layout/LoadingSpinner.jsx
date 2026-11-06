import CircularProgress from "@mui/material/CircularProgress";

import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div role="status" aria-label="Loading" className={styles.wrapper}>
      <CircularProgress size={56} />
    </div>
  );
}

import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { updateLocalStorage } from "../hooks/useLocalStorage";
import styles from "./DarkToggleButton.module.css";

export default function DarkToggleButton() {
  const { dark, toggleTheme } = useContext(DarkModeContext);

  return (
    <>
      <input
        type="checkbox"
        id="dark-mode"
        className={styles.input}
        checked={!!dark}
        onChange={() => {
          toggleTheme();
          updateLocalStorage("mode", !dark);
        }}
      />

      <label htmlFor="dark-mode" className={styles.label}>
        <div className={styles.circle}></div>
      </label>
    </>
  );
}

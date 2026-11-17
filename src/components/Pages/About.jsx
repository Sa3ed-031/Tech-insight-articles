import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
  AUTHOR_NAME,
  GITHUB_URL,
  LINKEDIN_URL,
  PORTFOLIO_URL,
} from "./authorLinks";
import styles from "./Page.module.css";

const FEATURES = [
  ["Live articles", "fresh posts from the DEV Community API"],
  ["List and grid views", "browse the articles the way you like"],
  ["Topic filters", "narrow the list down by tag"],
  ["Bookmarks", "save articles in your browser, with a counter"],
  ["Article pages", "full content, author info and related articles"],
  ["Light and dark mode", "remembered between visits"],
];

export default function About() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>About</p>
          <h1 className={styles.title}>What is Tech Insight?</h1>
          <p className={styles.lead}>
            Tech Insight is a tech blog powered by the DEV Community API. It
            brings together real, up-to-date articles about programming, web
            development and technology, in a clean reader that works on any
            screen.
          </p>
        </header>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>
            <InfoOutlinedIcon className={styles.cardIcon} />
            Main features
          </h2>
          <ul className={styles.features}>
            {FEATURES.map(([name, detail]) => (
              <li key={name} className={styles.feature}>
                <CheckCircleOutlineIcon
                  className={styles.featureIcon}
                  fontSize="small"
                />
                <span>
                  <strong>{name}</strong>: {detail}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.text}>
            Ready to read?{" "}
            <Link className={styles.link} to="/articles">
              Browse the articles
            </Link>
            .
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>
            <GavelOutlinedIcon className={styles.cardIcon} />
            Content &amp; attribution
          </h2>
          <p className={styles.text}>
            All articles (text, images and code) belong to their original
            authors on{" "}
            <a
              className={styles.link}
              href="https://dev.to/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DEV
            </a>
            . Tech Insight only displays them through the public{" "}
            <a
              className={styles.link}
              href="https://developers.forem.com/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              DEV Community API
            </a>
            . Every article page shows the author's name, links to their DEV
            profile, and links back to the original post.
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>
            <PersonOutlineIcon className={styles.cardIcon} />
            Who built it
          </h2>
          <p className={styles.text}>
            Tech Insight was designed and built by <strong>{AUTHOR_NAME}</strong>{" "}
            with React, React Router and CSS Modules.
          </p>
          <ul className={styles.socials}>
            <li>
              <a
                className={styles.social}
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LanguageIcon fontSize="small" />
                Portfolio
              </a>
            </li>
            <li>
              <a
                className={styles.social}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="small" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className={styles.social}
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="small" />
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

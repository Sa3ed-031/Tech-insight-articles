import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";

import styles from "./Article.module.css";

export default function Article({ article }) {
  return (
    <div className={styles.card}>
      <Link to={`/articles/${article.id}`} className={styles.link}>
        <img
          className={styles.image}
          src={
            article.cover_image ||
            article.social_image ||
            "/articles-project-article-1.png"
          }
          alt={article.title}
        />
        <div className={styles.content}>
          <p className={styles.category}>
            {article.tag_list?.[0] ?? "General"}
          </p>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.description}>{article.description}</p>
          <a className={styles.readMore}>
            Read More <EastIcon />
          </a>
        </div>
      </Link>
    </div>
  );
}

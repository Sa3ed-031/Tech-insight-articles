import { Link } from "react-router-dom";

import styles from "./ArticlesArticle.module.css";

export default function ArticlesArticle({
  article,
  saved,
  onToggleSave,
  grid = false,
}) {
  const {
    id,
    title,
    description,
    cover_image,
    social_image,
    tag_list,
    user,
    readable_publish_date,
  } = article;
  const category = tag_list?.[0] ?? "General";
  const image =
    cover_image || social_image || "/articles-project-articles-list-1.png";
  const to = `/articles/${id}`;

  return (
    <div className={grid ? styles.grid : undefined}>
      <article className={styles.article}>
        <div className={styles.content}>
          <div className={styles.meta}>
            <a className={styles.category}>{category}</a>
            <p className={styles.byline}>
              By {user?.name} · {readable_publish_date}
            </p>
            <button
              type="button"
              className={`${styles.bookmark} ${saved ? styles.saved : ""}`}
              onClick={() => onToggleSave(article)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save article"}
              title={saved ? "Remove from saved" : "Save article"}
            >
              <svg
                fill="currentColor"
                height="20px"
                viewBox="0 0 256 256"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                {saved ? (
                  <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
                ) : (
                  <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
                )}
              </svg>
            </button>
          </div>
          <h3 className={styles.title}>
            <Link className={styles.titleLink} to={to}>
              {title}
            </Link>
          </h3>
          <p className={styles.description}>{description}</p>
          <Link className={styles.readMore} to={to}>
            Read more →
          </Link>
        </div>
        <div className={styles.image}>
          <Link to={to}>
            <img alt={title} src={image} />
          </Link>
        </div>
      </article>
    </div>
  );
}

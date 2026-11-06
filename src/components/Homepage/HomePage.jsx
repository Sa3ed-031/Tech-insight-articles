import Article from "./Article";
import useFetch from "../../hooks/useFetch";
import { getArticles } from "../../api/articles";
import LoadingSpinner from "../Layout/LoadingSpinner";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const {
    data: articles,
    loading,
    error,
  } = useFetch((signal) => getArticles({ perPage: 3 }, signal), []);

  return (
    <div className={styles.page}>
      <div className={styles.landing}>
        <h1>Stay Ahead with Tech Insight</h1>
        <p>
          Explore the latest trends, in-depth analysis, and expert opinions on
          the ever-evolving world of technology.
        </p>
        <a className={styles.cta} href="#homepage-content">
          Explore Articles
        </a>
      </div>

      <div className={styles.featured} id="homepage-content">
        <h1>Featured Articles</h1>

        <div className={styles.articles}>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p>Couldn't load articles: {error.message}</p>
          ) : (
            articles?.map((article) => (
              <Article key={article.id} article={article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

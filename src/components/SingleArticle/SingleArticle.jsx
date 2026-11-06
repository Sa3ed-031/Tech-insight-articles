import { Link, useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Layout/LoadingSpinner";

import { getArticle, getArticles } from "../../api/articles";
import styles from "./SingleArticle.module.css";

const RELATED_COUNT = 3;

export default function SingleArticle() {
  const { id } = useParams();
  const {
    data: article,
    loading,
    error,
  } = useFetch((signal) => getArticle(id, signal), [id]);

  // In the single-article response, `tags` is an array (tag_list is a string)
  const relatedTag = article?.tags?.[0] ?? "";
  const { data: related, loading: relatedLoading } = useFetch(
    (signal) =>
      article
        ? getArticles(
            // Fetch one extra, in case the current article is in the results
            { perPage: RELATED_COUNT + 1, tag: relatedTag },
            signal,
          )
        : Promise.resolve(null),
    [article?.id, relatedTag],
  );
  const relatedArticles = (related ?? [])
    .filter((a) => a.id !== article?.id)
    .slice(0, RELATED_COUNT);

  const image = article?.cover_image || article?.social_image;

  // Attribution: the API gives the author's name and DEV username
  const authorName =
    article?.user?.name || article?.user?.username || "Unknown author";
  const authorProfile = article?.user?.username
    ? `https://dev.to/${article.user.username}`
    : article?.user?.website_url || null;

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        {loading ? (
          <LoadingSpinner />
        ) : error || !article ? (
          <p>
            Couldn't load this article:{" "}
            {error ? error.message : "Article not found"}
          </p>
        ) : (
          <>
            <header className={styles.header}>
              <h1 className={styles.title}>{article.title}</h1>
              <p>
                By{" "}
                {authorProfile ? (
                  <a
                    className={styles.authorLink}
                    href={authorProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {authorName}
                  </a>
                ) : (
                  authorName
                )}{" "}
                · {article.readable_publish_date}
              </p>
              {article.url && (
                <a
                  className={styles.originalLink}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Originally published on DEV ↗
                </a>
              )}
            </header>
            <div
              className={styles.image}
              style={image ? { backgroundImage: `url("${image}")` } : undefined}
            ></div>
            <div
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: article.body_html }}
            />
          </>
        )}
      </article>

      {article && !loading && !error && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>Related Articles</h2>

          {relatedLoading ? (
            <p className={styles.status}>Loading related articles...</p>
          ) : relatedArticles.length === 0 ? (
            <p className={styles.status}>No related articles found.</p>
          ) : (
            <div className={styles.links}>
              {relatedArticles.map((a) => {
                const cover = a.cover_image || a.social_image;
                return (
                  <Link
                    key={a.id}
                    to={`/articles/${a.id}`}
                    className={styles.link}
                  >
                    <div
                      className={styles.linkImage}
                      style={
                        cover
                          ? { backgroundImage: `url("${cover}")` }
                          : undefined
                      }
                    ></div>
                    <h3 className={styles.linkTitle}>{a.title}</h3>
                    <p className={styles.linkText}>{a.description}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

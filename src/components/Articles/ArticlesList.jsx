import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import ArticlesArticle from "./ArticlesArticle";
import LoadingSpinner from "../Layout/LoadingSpinner";

import { getArticles } from "../../api/articles";
import styles from "./ArticlesList.module.css";

const PER_PAGE = 4;
const PAGES_SHOWN = 5;
const TAGS = [
  "javascript",
  "react",
  "webdev",
  "css",
  "python",
  "ai",
  "programming",
  "beginners",
];

// Class names for a pagination link: the base class plus any truthy extras
function pagerClass(...extra) {
  return [styles.pageLink, ...extra].filter(Boolean).join(" ");
}

function toSaved(article) {
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
  return {
    id,
    title,
    description,
    cover_image,
    social_image,
    tag_list,
    user: { name: user?.name },
    readable_publish_date,
  };
}

export default function ArticlesList() {
  const [searchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const tag = searchParams.get("tag") || "";
  const showSaved = searchParams.get("saved") === "1";

  const [view, setView] = useLocalStorage("articlesView", "list");
  const [savedArticles, setSavedArticles] = useLocalStorage(
    "savedArticles",
    [],
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const {
    data: articles,
    loading,
    error,
  } = useFetch(
    (signal) => getArticles({ page, perPage: PER_PAGE, tag }, signal),
    [page, tag],
  );

  // Close the filter menu when clicking outside it
  useEffect(() => {
    if (!filterOpen) return;
    const onClick = (e) => {
      if (!filterRef.current?.contains(e.target)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [filterOpen]);

  // Build a link that keeps the current filters and changes only what's passed
  function linkTo(changes) {
    const params = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === null || value === "" || value === false) params.delete(key);
      else params.set(key, value);
    });
    const query = params.toString();
    return query ? `?${query}` : "?";
  }

  const savedIds = new Set(savedArticles.map((a) => a.id));

  function toggleSave(article) {
    setSavedArticles((prev) =>
      savedIds.has(article.id)
        ? prev.filter((a) => a.id !== article.id)
        : [toSaved(article), ...prev],
    );
  }

  const shown = showSaved ? savedArticles : articles;
  const isLoading = !showSaved && loading;
  const shownError = !showSaved && error;

  // DEV.to doesn't return a total count, so a short page means it's the last one
  const isLastPage = !loading && (articles?.length ?? 0) < PER_PAGE;
  const firstShown = Math.max(1, page - Math.floor(PAGES_SHOWN / 2));
  const pageNumbers = Array.from(
    { length: PAGES_SHOWN },
    (_, i) => firstShown + i,
  ).filter((n) => !isLastPage || n <= page);

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.viewIcons}>
          <button
            type="button"
            className={`${styles.iconBtn} ${view === "list" ? styles.active : ""}`}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
            title="List view"
          >
            <svg
              fill="currentColor"
              height="24px"
              viewBox="0 0 256 256"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${view === "grid" ? styles.active : ""}`}
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg
              fill="currentColor"
              height="24px"
              viewBox="0 0 256 256"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"></path>
            </svg>
          </button>
          <Link
            to={
              showSaved
                ? linkTo({ saved: null })
                : linkTo({ saved: "1", page: null })
            }
            className={`${styles.iconLink} ${showSaved ? styles.active : ""}`}
            aria-pressed={showSaved}
            aria-label="Saved articles"
            title={showSaved ? "Show all articles" : "Show saved articles"}
          >
            <svg
              fill="currentColor"
              height="24px"
              viewBox="0 0 256 256"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
            </svg>
            {savedArticles.length > 0 && (
              <span className={styles.count}>{savedArticles.length}</span>
            )}
          </Link>
        </div>

        <div className={styles.filterWrap} ref={filterRef}>
          <button
            type="button"
            className={styles.filterBtn}
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            aria-haspopup="true"
            disabled={showSaved}
            title={
              showSaved ? "Filters apply to all articles" : "Filter by tag"
            }
          >
            <svg
              fill="currentColor"
              height="20px"
              viewBox="0 0 256 256"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z"></path>
            </svg>
            <span>{tag ? `#${tag}` : "Filter"}</span>
          </button>

          {filterOpen && (
            <div className={styles.filterMenu} role="menu">
              <Link
                to={linkTo({ tag: null, page: null })}
                className={`${styles.filterItem} ${!tag ? styles.active : ""}`}
                onClick={() => setFilterOpen(false)}
                role="menuitem"
              >
                All topics
              </Link>
              {TAGS.map((t) => (
                <Link
                  key={t}
                  to={linkTo({ tag: t, page: null })}
                  className={`${styles.filterItem} ${t === tag ? styles.active : ""}`}
                  onClick={() => setFilterOpen(false)}
                  role="menuitem"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styles.articles} ${view === "grid" ? styles.grid : styles.list}`}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : shownError ? (
          <p>Couldn't load articles: {error.message}</p>
        ) : shown?.length === 0 ? (
          <p className={styles.empty}>
            {showSaved
              ? "You haven't saved any articles yet. Tap the bookmark on an article to save it."
              : "No articles found."}
          </p>
        ) : (
          shown?.map((article) => (
            <ArticlesArticle
              key={article.id}
              article={article}
              saved={savedIds.has(article.id)}
              onToggleSave={toggleSave}
              grid={view === "grid"}
            />
          ))
        )}
      </div>

      {!showSaved && (
        <nav id="pagination" className={styles.pagination}>
          <Link
            to={linkTo({ page: page - 1 === 1 ? null : page - 1 })}
            className={pagerClass(styles.arrow, page === 1 && styles.disabled)}
            aria-label="Previous page"
            aria-disabled={page === 1}
          >
            <svg
              fill="currentColor"
              height="18px"
              viewBox="0 0 256 256"
              width="18px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </Link>

          {pageNumbers.map((n) => (
            <Link
              key={n}
              to={linkTo({ page: n === 1 ? null : n })}
              className={pagerClass(n === page && styles.active)}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </Link>
          ))}

          <Link
            to={linkTo({ page: page + 1 })}
            className={pagerClass(styles.arrow, isLastPage && styles.disabled)}
            aria-label="Next page"
            aria-disabled={isLastPage}
          >
            <svg
              fill="currentColor"
              height="18px"
              viewBox="0 0 256 256"
              width="18px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </Link>
        </nav>
      )}
    </main>
  );
}

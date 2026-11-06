import { Route, Routes } from "react-router-dom";
import HomePage from "../components/Homepage/HomePage";
import ArticlesList from "../components/Articles/ArticlesList";
import SingleArticle from "../components/SingleArticle/SingleArticle";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:id" element={<SingleArticle />} />
    </Routes>
  );
}

export default AppRouter;

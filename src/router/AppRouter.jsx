import { Route, Routes } from "react-router-dom";
import HomePage from "../components/Homepage/HomePage";
import ArticlesList from "../components/Articles/ArticlesList";
import SingleArticle from "../components/SingleArticle/SingleArticle";
import About from "../components/Pages/About";
import Contact from "../components/Pages/Contact";
import NotFound from "../components/Pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:id" element={<SingleArticle />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;

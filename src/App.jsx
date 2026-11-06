import AppRouter from "./router/AppRouter.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import ScrollToTop from "./components/Layout/ScrollToTop.jsx";
import { ThemeProvider } from "./contexts/DarkModeContext.jsx";

function App() {
  return (
    <>
      <ThemeProvider>
        <ScrollToTop />
        <Navbar />
        <AppRouter />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

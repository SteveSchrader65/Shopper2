import { useState, useEffect, useRef, createContext } from "react";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItems from "./components/SearchItems";
import Content from "./components/Content";
import Footer from "./components/Footer";
export const AppContext = createContext();

function App() {
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const isInitialMount = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const delay = setTimeout(() => {
    setIsLoading(true);
    setItems(JSON.parse(localStorage.getItem("shopperItems")));
    setIsLoading(false);
    // }, 1000);

    // return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem("shopperItems", JSON.stringify(items));
    }
  }, [items]);

  return (
    <div className="container">
      <Header />
      <AppContext.Provider
        value={{ items, setItems, search, setSearch, searchResults, setSearchResults }}>
        <AddItem />
        <SearchItems />
        <Content isLoading={isLoading} />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef, createContext } from "react";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItems from "./components/SearchItems";
import Content from "./components/Content";
import Footer from "./components/Footer";
export const AppContext = createContext();

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("shopperItems")) || [];

    setIsLoading(true);
    // const delay = setTimeout(() => {
    setItems(storedList);
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

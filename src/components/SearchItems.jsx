import {useEffect, useContext} from 'react';
import {AppContext} from '../App';

const SearchItems = () => {
  const { items, search, setSearch, setSearchResults } = useContext(AppContext);

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.des.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredItems);
  }, [search]);

  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()} autoComplete="off">
      <label htmlFor="search"></label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items ..."
        value={search}
        maxLength="50"
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchItems;
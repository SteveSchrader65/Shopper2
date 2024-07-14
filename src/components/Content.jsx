import { useContext } from "react";
import { AppContext } from "../App";
import Stylebars from "./Stylebars";
import { Reorder } from "framer-motion";
import ItemLine from "./ItemLine";

const Content = (props) => {
  const { items, setItems, search, searchResults } = useContext(AppContext);
  const sortedItems = [...items]
    .filter((item) => item.ckd)
    .concat(items.filter((item) => !item.ckd).sort((a, b) => a.des.localeCompare(b.des)));

  const sortedSearchResults = [...searchResults].sort((a, b) => b.ckd - a.ckd);

  const displayedItems =
    searchResults.length > 0 ? sortedSearchResults : search === "" ? sortedItems : [];

  return (
    <main>
      <Stylebars>
        {displayedItems.length > 0 ? (
          <Reorder.Group axis="y" values={displayedItems} onReorder={setItems}>
            {displayedItems.map((item) => (
              <Reorder.Item key={item.idn} value={item}>
                <ItemLine item={item} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <div>
            {!props.isLoading && <p className="message">Your list is currently empty</p>}
            {props.isLoading && <p className="loading message">Loading your Shopper List ...</p>}
          </div>
        )}
      </Stylebars>
    </main>
  );
};

export default Content;

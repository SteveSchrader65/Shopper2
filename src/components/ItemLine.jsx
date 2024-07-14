import { useState, useContext } from "react";
import { AppContext } from "../App";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ItemLine = ({ item }) => {
  const { items, setItems, search, setSearch, searchResults, setSearchResults } =
    useContext(AppContext);
  const [quantity, setQuantity] = useState(item.qty);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingRequired, setEditingRequired] = useState(false);
  const [newDescription, setNewDescription] = useState(item.des);
  const [newRequired, setNewRequired] = useState(item.rqd);

  const updateItem = () => {
    const updatedItems = items.map((i) =>
      i.idn === item.idn
        ? {
            ...i,
            ckd: i.ckd,
            des: newDescription,
            qty: parseInt(quantity, 10),
            rqd: parseInt(newRequired, 10),
          }
        : i
    );

    setItems(updatedItems);
  };

  const handleCheck = (itemNumber) => {
    if (search) {
      const updatedSearchResults = searchResults.map((i) =>
        i.idn === itemNumber
          ? {
              ...i,
              ckd: !i.ckd,
              qty: i.ckd ? i.rqd : 0,
            }
          : i
      );

      setSearchResults(updatedSearchResults);
      setSearch("");
    }

    const updatedListItems = items.map((i) =>
      i.idn === itemNumber
        ? {
            ...i,
            ckd: !i.ckd,
            qty: i.ckd ? i.rqd : 0,
          }
        : i
    );

    setItems(updatedListItems);
  };

  const handleDescriptionEdit = () => {
    setEditingDescription(true);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleDescriptionUpdate = () => {
    setEditingDescription(false);
    updateItem();
  };

  const handleRequiredEdit = () => {
    setEditingRequired(true);
  };

  const handleRequiredChange = (e) => {
    setNewRequired(e.target.value);
  };

  const handleRequiredUpdate = () => {
    setEditingRequired(false);
    updateItem();
  };

  const handleDelete = (itemNumber) => {
    const listItems = items.filter((i) => i.idn !== itemNumber);
    setItems(listItems);
  };

  return (
    <motion.div className="item">
      <input type="checkbox" onChange={() => handleCheck(item.idn)} checked={item.ckd} />
      <div
        style={!item.ckd ? { textDecoration: "line-through" } : null}
        onDoubleClick={handleDescriptionEdit}>
        {editingDescription ? (
          <input
            type="text"
            value={newDescription}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionUpdate}
            maxLength="100"
            autoFocus
          />
        ) : (
          item.des
        )}
      </div>
      {item.ckd ? (
        <span id="itemChecked">
          Qty:
          <input
            id="itemQty"
            type="number"
            value={quantity}
            min={1}
            max={50}
            onChange={(e) => setQuantity(e.target.value)}
            onBlur={updateItem}
            required
          />
          <span onDoubleClick={handleRequiredEdit}>
            Rqd:
            {editingRequired ? (
              <input
                type="number"
                value={newRequired}
                min={1}
                max={50}
                onChange={handleRequiredChange}
                onBlur={handleRequiredUpdate}
                autoFocus
              />
            ) : (
              item.rqd
            )}
          </span>
        </span>
      ) : (
        <span id="itemUnchecked">
          <span onDoubleClick={handleRequiredEdit}>
            Rqd:
            {editingRequired ? (
              <input
                type="number"
                value={newRequired}
                min={1}
                max={50}
                onChange={handleRequiredChange}
                onBlur={handleRequiredUpdate}
                autoFocus
              />
            ) : (
              item.rqd
            )}
          </span>
          <FaTrashAlt
            onClick={() => handleDelete(item.idn)}
            role="button"
            tabIndex="0"
            aria-label={`Delete ${item.des}`}
          />
        </span>
      )}
    </motion.div>
  );
};

export default ItemLine;

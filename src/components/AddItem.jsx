import { useState, useContext } from "react";
import { Tooltip } from "react-tooltip";
import { AppContext } from "../App";
import { FaPlus } from "react-icons/fa";

const AddItem = () => {
  const { items, setItems } = useContext(AppContext);
  const [itemDescription, setItemDescription] = useState("");
  const [itemRequired, setItemRequired] = useState(0);

  const createNewItem = (e) => {
    e.preventDefault();

    const newItem = {
      idn: items.length > 0 ? Math.max(...items.map((item) => item.idn)) + 1 : 1,
      ckd: true,
      des: itemDescription,
      qty: parseInt(itemRequired, 10),
      rqd: parseInt(itemRequired, 10),
    };

    setItems([...items, newItem]);
    setItemDescription("");
    setItemRequired("");
  };

  return (
    <form className="addForm" onSubmit={createNewItem} autoComplete="off">
      <label htmlFor="addItem"></label>
      <input
        autoFocus
        id="addItem"
        type="text"
        placeholder="Add Item to the List ..."
        value={itemDescription}
        maxLength="100"
        onChange={(e) => setItemDescription(e.target.value)}
        required
      />
      <input
        id="addRequired"
        type="number"
        value={itemRequired}
        min={1}
        max={50}
        onChange={(e) => setItemRequired(e.target.value)}
        required
        data-tooltip-id="quantityTip"
        data-tooltip-content="Enter Pantry Quantity"
        data-tooltip-delay-show={250}
        data-tooltip-delay-hide={250}
      />
      <Tooltip id="quantityTip" place="top" effect="solid" />
      <button type="submit" aria-label="Add new item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;

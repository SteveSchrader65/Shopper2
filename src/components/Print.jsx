import { forwardRef } from "react";

const Print = forwardRef((props, ref) => {
  return (
    <div className="shoppingList" ref={ref}>
      <h2>Shopping List</h2>
      <ul>
        {props.listItems.map((item, index) => (
          <li key={index}>
            {item.des} - {item.qty}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Print;

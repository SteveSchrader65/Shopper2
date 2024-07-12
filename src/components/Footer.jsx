import {useRef, useContext} from 'react';
import { useReactToPrint } from "react-to-print";
import {AppContext} from '../App';
import { Tooltip } from "react-tooltip";
import { FaList } from "react-icons/fa";
import Print from './Print';

const Footer = () => {
  const { items } = useContext(AppContext);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let checkedItems = [];
  let itemCount = 0;

  if (items) {
    checkedItems = items.filter((item) => item.ckd && item.qty > 0);
    itemCount = checkedItems.reduce((i, thisItem) => i + thisItem.qty, 0);
  }

  return (
    <footer>
      <p>
        Total: {itemCount} {itemCount === 1 ? "Item" : "Items"}
      </p>
      <div className="printOnly">
        <Print ref={componentRef} listItems={checkedItems} />
      </div>
      <button
        onClick={handlePrint}
        data-tooltip-id="printTip"
        data-tooltip-content="Print Shopping List"
        data-tooltip-delay-show={250}
        data-tooltip-delay-hide={250}>
        <FaList className="printList" />
        <Tooltip id="printTip" place="top" effect="solid" />
      </button>
    </footer>
  );
};

export default Footer;

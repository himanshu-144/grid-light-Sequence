import React, { useEffect, useMemo, useState } from "react";

const Shape = ({ data }) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);

  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnLoading] = useState(false);

  const deSelectingBoxes = () => {
    // remove boxes every 500 ms, all selected box keys
    setUnLoading(true);
    const keys = Array.from(selected.keys());
    
    const removeKeys = () => {
      if (keys.length) {
        const currentKeys = keys.shift(); // the first keys selected
        // shift in foward deselecting fromstart, keys.pop() delseecting from last, reverse order
        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKeys);
          return updatedKeys;
        });
        setTimeout(removeKeys, 500);
      } else {
        setUnLoading(false);
      }
    };

    setTimeout(removeKeys, 100); // initally to invoke
  };

  const countOfBoxes = useMemo(() => {
    return boxes.reduce((acc, curr) => {
      if (curr) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  const handleClick = (e) => {
    const { target } = e;
    const index = target.getAttribute("data-index");
    const status = target.getAttribute("data-status");

    if (index === null || status === "hidden" || unloading) {
      return;
    }
    setSelected((prev)=>{
      return new Set(prev.add(index));
    });
  };

  useEffect(() => {
    if (selected.size >= countOfBoxes) {
      deSelectingBoxes();
    }
  }, [selected]);

  return (
    <div className="boxes" onClick={handleClick}>
      {
        // we are going to use event delegation onClick on parent for 1 events
        boxes.map((box, index) => {
          const status = box === 1 ? "visible" : "hidden";
          const isSelected = selected.has(index.toString()); // this index is integer, and we are setting string , so, we have to convert interger to string

          return (
            <div
              key={`${box}-${index}`}
              className={`box ${status} ${isSelected && "selected"}`}
              data-index={index}
              data-status={status}
            />
          );
        })
      }
    </div>
  );
};

export default Shape;

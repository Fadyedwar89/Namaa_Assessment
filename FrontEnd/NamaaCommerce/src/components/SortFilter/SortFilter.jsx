import { useState, useRef, useEffect } from "react";
import "./SortFilter.css";

const options = [
  {
    value: 1,
    text: "Name A-Z",
    icon: "fa-arrow-down-a-z",
  },
  {
    value: 2,
    text: "Name Z-A",
    icon: "fa-arrow-up-a-z",
  },
  {
    value: 3,
    text: "Price Low → High",
    icon: "fa-arrow-trend-up",
  },
  {
    value: 4,
    text: "Price High → Low",
    icon: "fa-arrow-trend-down",
  },
];

export default function SortFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);
  }, []);

  const selected = options.find((x) => x.value === value) || options[0];

  return (
    <div className="sort-wrapper" ref={ref}>
      <button className="sort-button" onClick={() => setOpen(!open)}>
        <div>
          <i className={`fa-solid ${selected.icon}`}></i>

          <span>{selected.text}</span>
        </div>

        <i className={`fa-solid fa-chevron-${open ? "up" : "down"}`}></i>
      </button>

      {open && (
        <div className="sort-menu">
          {options.map((item) => (
            <div
              key={item.value}
              className="sort-item"
              onClick={() => {
                onChange(item.value);

                setOpen(false);
              }}
            >
              <i className={`fa-solid ${item.icon}`}></i>

              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

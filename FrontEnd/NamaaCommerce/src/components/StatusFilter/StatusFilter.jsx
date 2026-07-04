import { useState, useRef, useEffect } from "react";
import "./StatusFilter.css";

const options = [
  {
    value: "",
    text: "All Orders",
    icon: "fa-boxes-stacked",
    color: "#ffffff",
  },
  {
    value: "Pending",
    text: "Pending",
    icon: "fa-clock",
    color: "#ffffff",
  },
  {
    value: "Processing",
    text: "Processing",
    icon: "fa-gears",
    color: "#ffffff",
  },
  {
    value: "Shipped",
    text: "Shipped",
    icon: "fa-truck-fast",
    color: "#ffffff",
  },
  {
    value: "Cancelled",
    text: "Cancelled",
    icon: "fa-ban",
    color: "#ffffff",
  },
];

export default function StatusFilter({ value, onChange }) {

  const [open, setOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {

    const close = (e) => {

      if (ref.current && !ref.current.contains(e.target)) {

        setOpen(false);

      }

    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);

  }, []);

  const backgrounds = {
  "": "linear-gradient(135deg,#2d3748,#1f2937)",
  Pending: "linear-gradient(135deg,#facc15,#eab308)",
  Processing: "linear-gradient(135deg,#2563eb,#3b82f6)",
  Shipped: "linear-gradient(135deg,#16a34a,#22c55e)",
  Cancelled: "linear-gradient(135deg,#dc2626,#ef4444)"
};

const selected =
  options.find((item) => item.value === value) || options[0];

  return (

    <div className="status-filter-wrapper" ref={ref}>

      <button

        type="button"

        className="status-button"

        style={{

          background: backgrounds[value]

        }}

        onClick={() => setOpen(!open)}

      >

        <div className="status-left">

          {/* glowing dot */}

          <span
            className="status-dot"
            style={{
              background:
                value === ""
                  ? "#fff"
                  : backgrounds[value].match(/#([A-Fa-f0-9]{6})/)[0]
            }}
          ></span>

          <i className={`fa-solid ${selected.icon}`}></i>

          <span>{selected.text}</span>

        </div>

        <i className={`fa-solid fa-chevron-${open ? "up" : "down"}`}></i>

      </button>

      {open && (

        <div className="status-menu">

          {options.map((item) => (

            <div

              key={item.value}

              className="status-item"

              onClick={() => {

                onChange(item.value);

                setOpen(false);

              }}

            >

              <span
                className="mini-dot"
                style={{
                  background: item.color === "#ffffff"
                    ? "#374151"
                    : item.value === "Pending"
                    ? "#FFC107"
                    : item.value === "Processing"
                    ? "#2563EB"
                    : item.value === "Shipped"
                    ? "#16A34A"
                    : "#DC2626"
                }}
              ></span>

              <i className={`fa-solid ${item.icon}`}></i>

              {item.text}

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
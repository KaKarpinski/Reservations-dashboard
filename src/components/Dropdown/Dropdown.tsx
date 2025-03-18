import { useEffect, useRef } from "react";
import "./Dropdown.css";

export interface DropdownProps {
  icon: React.ReactNode;
  options: {
    text: string;
    action: () => void;
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ icon, options }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <details className="dropdown" ref={detailsRef}>
      <summary className="dropdown-toggle">{icon}</summary>
      <ul className="dropdown-menu">
        {options.map((element, idx) => (
          <li
            onClick={() => {
              element.action();
              closeDropdown();
            }}
            key={idx}
          >
            {element.text}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;

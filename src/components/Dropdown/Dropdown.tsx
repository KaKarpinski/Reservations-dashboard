import "./Dropdown.css"

interface DropdownProps {
  icon: React.ReactNode;
  options: React.ReactNode[]
}

const Dropdown: React.FC<DropdownProps> = ({ icon, options }) => {
  return (
    <details className="dropdown">
      <summary className="dropdown-toggle">
        {icon}
      </summary>
      <ul className="dropdown-menu">
        {options.map((e, idx) => <li key={idx}>
          {e}
        </li>)}
      </ul>
</details>
  );
};

export default Dropdown;
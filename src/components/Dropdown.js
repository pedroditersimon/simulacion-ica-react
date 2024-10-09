import "./Dropdown.css";

function Dropdown({ label, options, onSelect }) {
  
  function handleOnChange(event) {
    if (onSelect) onSelect(event.target.value);
  };
  
  function createSelects() {
    return options.map((op, index) => <option className="dropdown-option" id={index} value={op} >{op}</option>);
  }

  return(
    <div className="dropdown">
      <label className="dropdown-label" htmlFor="select">{label}</label>
      <select className="dropdown-select" id="select" onChange={handleOnChange}>
          {createSelects()}
      </select>
    </div>
  );
}

export default Dropdown;
import React, { useState } from 'react';
import "./App.css";

import ICAGraph from "./components/ICAGraph.js";
import Dropdown from "./components/Dropdown.js";

function generateDayData() {
  var data = [];
  for (let i = 0; i < 24; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
}

function getCategories(defaultOption) {
  var elements = []; // default
  if (defaultOption) elements.push(defaultOption);

  for (let i = 0; i < 24; i++) {
    const hora = i.toString().padStart(2, '0') + (i < 12? " am":" pm");
    elements.push(hora);
  }
  return elements;
}

export default function App(props) {
  const [dropdownValue, setDropdownValue] = useState("Ninguna");

  function onDropdownSelect(value) {
    setDropdownValue(value);
  };

  return (
    <div>
      <Dropdown label="Hora " options={getCategories("Ninguna")} onSelect={onDropdownSelect} />
      {dropdownValue !== "Ninguna"?
        <ICAGraph ICA_series={[
          { name: "Centro", data: [28] },
          { name: "Norte", data: [80] },
          { name: "Sur", data: [13] },
          { name: "Este", data: [67] }
        ]} type='bar' categories={[dropdownValue]} colors={['#008FFB', '#00E396', '#FEB019', '#775DD0']} /> 
      :
        <div className='graphs-container'>
          <ICAGraph title="Centro" type='area' colors={['#008FFB']} ICA_series={[{ name: "Centro", data: generateDayData() }]} categories={getCategories()} /> 
          <ICAGraph title="Norte" type='area' colors={['#00E396']} ICA_series={[{ name: "Norte", data: generateDayData() }]} categories={getCategories()} /> 
          <ICAGraph title="Sur" type='area' colors={['#FEB019']} ICA_series={[{ name: "Sur", data: generateDayData() }]} categories={getCategories()} /> 
          <ICAGraph title="Este" type='area' colors={['#775DD0']} ICA_series={[{ name: "Este", data: generateDayData() }]} categories={getCategories()} /> 
        </div>
      }
    </div>
  );
}

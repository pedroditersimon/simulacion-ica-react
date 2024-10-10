import React, { useState } from 'react';
import "./App.css";

import ICAGraph from "./components/ICAGraph.js";
import Dropdown from "./components/Dropdown.js";
import Button from './components/Button.js';

import Distributions from "./Distributions.js";

// day hours: 00 am, 01 am...
function getLabels(defaultOption) {
  var elements = []; // default
  if (defaultOption) elements.push(defaultOption);

  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0') + (i < 12? " am":" pm");
    elements.push(hour);
  }
  return elements;
}

function generateData(n) {
  const data = {
    centro: Distributions.generateNormal(50, 10, n), // media 50, deviacion 10
    norte: Distributions.generateExponential(0.06, n),
    sur: Distributions.generateNormal(50, 5, n), // media 50, deviacion 5
    este: Distributions.generateRandom(100, n) // random
  };
  return data;
}

export default function App(props) {
  const dataLabels = getLabels();
  const initialData = generateData(dataLabels.length);

  const [dropdownValue, setDropdownValue] = useState("No filtrar");
  const [data, setData] = useState(initialData);

  // filtro de hora para comparar
  const filterIndex = dataLabels.indexOf(dropdownValue);
  const filteredData = {
    centro: data.centro[filterIndex],
    norte: data.norte[filterIndex],
    sur: data.sur[filterIndex],
    este: data.este[filterIndex]
  };

  function onDropdownSelect(value) {
    setDropdownValue(value);
  };

  function regenerateValues() {
    const newData = generateData(dataLabels.length);
    setData(newData);
  }

  return (
    <div>
      <div className='header'>
        <h3>Simulación del ICA a lo largo del dia</h3>
        <Dropdown options={getLabels("No filtrar")} onSelect={onDropdownSelect} />
        <Button label="Regenerar" onClick={regenerateValues} />
      </div>

      {dropdownValue !== "No filtrar"?
        <div className='graphs-container-center'>
          <ICAGraph ICA_series={[
            { name: "Centro", data: [filteredData.centro] },
            { name: "Norte", data: [filteredData.norte] },
            { name: "Sur", data: [filteredData.sur] },
            { name: "Este", data: [filteredData.este] }
          ]} title="Comparacion" maxY={100} type='bar' categories={[dropdownValue]} colors={['#008FFB', '#00E396', '#FEB019', '#775DD0']} /> 
        </div>
      :null}

      <div className='graphs-container-grid'>
        <ICAGraph ICA_series={[{ name: "Centro", data: data.centro }]} categories={dataLabels} title="Centro - Normal" type='area' colors={['#008FFB']} maxY={100} focusX={filterIndex} /> 
        <ICAGraph ICA_series={[{ name: "Norte", data: data.norte }]} categories={dataLabels} title="Norte - Exponencial" type='area' colors={['#00E396']} maxY={100} focusX={filterIndex} /> 
        <ICAGraph ICA_series={[{ name: "Sur", data: data.sur }]} categories={dataLabels} title="Sur - Normal" type='area' colors={['#FEB019']} maxY={100} focusX={filterIndex} /> 
        <ICAGraph ICA_series={[{ name: "Este", data: data.este }]} categories={dataLabels} title="Este - Random" type='area' colors={['#775DD0']} maxY={100} focusX={filterIndex} /> 
      </div>
    </div>
  );
}

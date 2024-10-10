import { useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';

export default function ICAGraph({ ICA_series, title, categories, type="line", colors=["#008FFB"], maxY, focusX }) {
  const chartRef = useRef(null);

  useEffect(() => setFoux(focusX), [focusX]);
  useEffect(() => {
    if (focusX !== undefined && focusX >= 0) setFoux(focusX);
  }, [ICA_series]);

  function setFoux(focusX) {
    const chart = chartRef.current.chart;
    if (!chart) return;

    if (focusX === undefined || focusX < 0)
    {
      chart.zoomX();
      return;
    }
    const minFocusX = Math.max(focusX - 1, 1);
    chart.zoomX(minFocusX, minFocusX+4);
  }

  const state = {
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        min: 0,
        max: maxY
      },
      stroke: {
        curve: 'monotoneCubic'
      },
      title: {
        text: title,
        align: 'left'
      },
      fill: {
        colors: colors
      },
      markers: {
        size: 1
      },
      legend: {
        show: true
      },
      dataLabels: {
        enabled: false
      },
    },
    series: ICA_series,
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type={type}
      height={180}
      ref={chartRef}
    />
  );
}

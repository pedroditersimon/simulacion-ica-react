import { useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function ICAGraph({ ICA_series, title, categories, type="line", colors=["#008FFB"] }) {

  const state = {
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: categories,
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
        show: false
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
      height={200}
    />
  );
}

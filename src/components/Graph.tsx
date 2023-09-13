import { mock } from 'data/mock';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartOptions,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useRef, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const valueAreaMax = 200;
const valueBarMax = 20000;
const valueAreaStepSize = 50;
const valueBarStepSize = 5000;

export const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '시계열 차트',
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: context => {
          const datasetLabel = context.dataset.label || '';
          const label = context.label || '';
          const value_area = mock.response[label]?.value_area;
          const value_bar = mock.response[label]?.value_bar;
          const id = mock.response[label]?.id || '';
          return `${datasetLabel}: ID: ${id}, value_area: ${value_area}, value_bar: ${value_bar}`;
        },
      },
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      max: valueAreaMax,
      ticks: {
        stepSize: valueAreaStepSize,
      },
      grid: {
        color: 'rgba(255, 120, 105, 0.2)',
      },
      title: {
        display: true,
        text: 'value_area',
        padding: { top: 20, bottom: 20 },
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      max: valueBarMax,
      ticks: {
        stepSize: valueBarStepSize,
      },
      grid: {
        color: 'rgba(0, 196, 250, 0.2)',
      },
      title: {
        display: true,
        text: 'value_bar',
        padding: { top: 20, bottom: 20 },
      },
    },
  },
};

const labels = Object.keys(mock.response);

const dataArray = Object.values(mock.response).map(item => ({
  id: item.id,
  value_area: item.value_area,
  value_bar: item.value_bar,
}));

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      fill: true,
      label: 'value_area',
      data: dataArray.map(item => item.value_area),
      yAxisID: 'y',
      backgroundColor: 'rgba(255, 120, 105, 0.5)',
    },
    {
      type: 'bar' as const,
      fill: true,
      label: 'value_bar',
      data: dataArray.map(item => item.value_bar),
      yAxisID: 'y1',
      backgroundColor: 'rgba(0, 196, 250, 0.5)',
      position: 'right',
    },
  ],
};

interface Props {
  selectedID: string | null;
  onSetSelectedID(newValue: string): void;
}

const Graph = ({ selectedID, onSetSelectedID }: Props) => {
  const chartRef = useRef<any>(null);

  const handleBarClick = (event: MouseEvent, chartElements: any[]) => {
    if (chartElements.length > 0) {
      const labelIndex = chartElements[0].index;
      const clickedDataPoint = dataArray[labelIndex];

      onSetSelectedID(clickedDataPoint.id);
    }
  };

  useEffect(() => {
    const updatedData = {
      ...data,
      datasets: data.datasets.map((dataset: any) => {
        if (selectedID && dataset.type === 'bar') {
          const updatedBackgroundColor = dataset.data.map((item: any, index: number) => {
            const matchingData = dataArray[index];
            return matchingData && matchingData.id === selectedID
              ? 'rgba(248, 69, 69, 0.6)'
              : 'rgba(0, 102, 204, 0.6)';
          });

          return {
            ...dataset,
            backgroundColor: updatedBackgroundColor,
          };
        } else if (!selectedID && dataset.type === 'bar') {
          return {
            ...dataset,
            backgroundColor: new Array(dataset.data.length).fill('rgba(0, 102, 204, 0.6)'),
          };
        } else {
          return dataset;
        }
      }),
    };

    chartRef.current.data = updatedData;
    chartRef.current.update();
  }, [selectedID]);

  const plugin = {
    id: 'customPlugin',
    beforeEvent: (chart: any, args: any) => {
      const event = args.event;
      if (event.type === 'click') {
        handleBarClick(
          event,
          chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }),
        );
      }
    },
  };

  return (
    <>
      <Chart
        id="my-chart"
        type="bar"
        options={options}
        data={data}
        plugins={[plugin]}
        ref={chartRef}
      />
    </>
  );
};

export default Graph;

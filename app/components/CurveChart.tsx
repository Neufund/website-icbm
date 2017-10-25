import * as React from "react";
import { Line } from "react-chartjs-2";
import neuMarkInfoCurveChartPlugin from "./neuMarkInfoCurveChartPlugin";

const formatNumber = (labelValue: any) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + "BLN"
    : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? Math.abs(Number(labelValue)) / 1.0e6 + "MLN"
      : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
        : Math.abs(Number(labelValue)).toFixed(2);
};

export const getPrice = (
  currencyRate: number,
  initialReward: number,
  capNEU: number,
  atETH: number
) => {
  const atEUR = atETH / currencyRate;
  return Math.exp(-1 * initialReward * atEUR / capNEU) * initialReward / 2;
};

/*
// We are not using this function for now
const getCumulativeNEU = (
  currencyRate: number,
  initialReward: number,
  capNEU: number,
  atETH: number
) => {
  const atEUR = atETH / currencyRate;
  return (1 - Math.exp(-1 * initialReward * atEUR / capNEU)) * capNEU;
};
*/

const getEtherDataset = (min: number, max: number, count: number) => {
  const result = [];
  const period = max / count;
  for (let i: number = min; i < max; i += period) {
    result.push(i);
  }
  return result;
};

interface ICurveChart {
  min: number;
  max: number;
  dotsNumber: number;
  capNEU: number;
  initialReward: number;
  currencyRate: number;
  currentRasiedEther?: number;
}

export default (props: ICurveChart) => {
  const { min, max, dotsNumber, capNEU, initialReward, currencyRate, currentRasiedEther } = props;
  neuMarkInfoCurveChartPlugin();

  const etherDatasetList = getEtherDataset(min, max, dotsNumber);

  let activePointIndex = 0;

  etherDatasetList.forEach((eth, index) => {
    if (eth === currentRasiedEther) {
      activePointIndex = index;
      return;
    }
  });

  const activePointPrice = getPrice(
    currencyRate,
    initialReward,
    capNEU,
    etherDatasetList[activePointIndex]
  );
  const data = {
    labels: etherDatasetList.map(eth => `${formatNumber(eth)}`),
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(255,255,255,0)",
        borderCapStyle: "butt",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 0.5,
        pointHitRadius: 10,
        data: etherDatasetList.map(eth =>
          // getCumulativeNEU(currencyRate, initialReward, capNEU, eth)
          getPrice(currencyRate, initialReward, capNEU, eth)
        ),
      },
    ],
  };

  const options = {
    neuMarkInfoPlugin: {
      activePointIndex,
      neuMarkPrice: `${activePointPrice.toFixed(2)} NEU/ETH`,
      notes: "",
      xAxesLabel: "Amount of ETH\nCommited",
      yAxesLabel: "Neumark Reward\n(NEU/ETH)",
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
            color: "#D5E20F",
          },
          gridDashType: "dot",
          ticks: {
            mirror: false,
            fontSize: 8,
            fontFamily: "Montserrat",
            autoSkip: true,
            maxTicksLimit: 4,
            maxRotation: 0,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
            color: "#D5E20F",
          },
          ticks: {
            fontSize: 8,
            fontFamily: "Montserrat",
            autoSkip: true,
            maxTicksLimit: 6,
            callback: (value: number) => {
              return formatNumber(value);
            },
          },
        },
      ],
    },
    legend: {
      display: false,
      responsive: false,
    },
    tooltips: {
      callbacks: {
        label: (item: any) => {
          const xAxisEtherValue: number = etherDatasetList[item.index];
          const price: number = getPrice(currencyRate, initialReward, capNEU, xAxisEtherValue);
          const currentEth = etherDatasetList[item.index];
          return `At ${formatNumber(currentEth.toFixed(2))} committed ETH reward ${formatNumber(
            price.toFixed(2)
          )} NEU/ETH`;
        },
        title: (tooltipItems: any) => {
          return `${formatNumber(tooltipItems[0].yLabel)} NEU/ETH`;
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

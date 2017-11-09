import * as React from "react";
import { Line } from "react-chartjs-2";
import neuMarkInfoCurveChartPlugin from "./neuMarkInfoCurveChartPlugin";

const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const formatNumber = (labelValue: any) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
        : Math.abs(Number(labelValue)).toFixed(2);
};

export const getPrice = (
  currencyRate: number,
  initialReward: number,
  capNEU: number,
  atETH: number
) => {
  const atEUR = atETH / currencyRate;
  return Math.exp(-1 * initialReward * atEUR / capNEU) * initialReward / 2 / currencyRate;
};

export const getCumulativeNEU = (
  currencyRate: number,
  initialReward: number,
  capNEU: number,
  atETH: number
) => {
  const atEUR = atETH / currencyRate;
  return (1 - Math.exp(-1 * initialReward * atEUR / capNEU)) * capNEU / 2;
};

export const getNeumarkAmount = (
  currencyRate: number,
  initialReward: number,
  capNEU: number,
  atETH: number,
  ticketSize: number
) => {
  const secondPoint = getCumulativeNEU(currencyRate, initialReward, capNEU, atETH + ticketSize);
  const firstPoint = getCumulativeNEU(currencyRate, initialReward, capNEU, atETH);

  return secondPoint - firstPoint;
};

export const getEtherDataset = (min: number, max: number, count: number) => {
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

  etherDatasetList.sort((a: number, b: number) => a - b);

  const activePointPrice = getPrice(currencyRate, initialReward, capNEU, currentRasiedEther);
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
        pointBackgroundColor: "black",
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 0.5,
        pointHitRadius: 10,
        data: etherDatasetList.map(eth => getPrice(currencyRate, initialReward, capNEU, eth)),
      },
    ],
  };

  const options = {
    neuMarkInfoPlugin: {
      neuMarkPrice: {
        label: `${activePointPrice.toFixed(2)} NEU/ETH`,
        fontSize: !isMobile() ? "19px" : "14px",
        price: activePointPrice,
      },
      notes: "",
      yAxesLabel: "NEU Reward (NEU/ETH)",
    },
    layout: {
      padding: {
        left: !isMobile() ? 100 : 20,
        right: !isMobile() ? 40 : 40,
        top: 20,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Amount of ETH\nCommited",
            fontColor: "#BBC2C7",
          },
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
            color: "#D5E20F",
          },
          gridDashType: "dot",
          ticks: {
            mirror: false,
            fontSize: 11,
            fontFamily: "Montserrat",
            autoSkip: true,
            maxTicksLimit: 4,
            maxRotation: 0,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: false,
          },
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
            color: "#D5E20F",
            drawTicks: true,
          },
          ticks: {
            fontSize: 11,
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
      responsive: true,
    },
    tooltips: {
      custom: (tooltip: any) => {
        if (!tooltip) {
          return;
        }
        tooltip.displayColors = false;
      },
      callbacks: {
        label: (item: any) => {
          const xAxisEtherValue: number = etherDatasetList[item.index];
          const price: number = getPrice(currencyRate, initialReward, capNEU, xAxisEtherValue);
          const currentEth = etherDatasetList[item.index];

          return [
            `At ${formatNumber(currentEth.toFixed(2))} committed ETH`,
            `reward ${formatNumber(price.toFixed(2))} NEU/ETH`,
          ];
        },
        title: (tooltipItems: any) => {
          return `${formatNumber(tooltipItems[0].yLabel)} NEU/ETH`;
        },
      },
    },
    responsive: true,
  };

  return <Line data={data} options={options} />;
};

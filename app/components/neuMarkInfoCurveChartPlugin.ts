import * as Chart from "chart.js";

const drawText = (ctx: any, text: string, style: string, font: string, x: number, y: number) => {
  ctx.save();
  ctx.fillStyle = style;
  ctx.font = `${font} Montserrat`;
  ctx.fillText(text, x, y);
  ctx.restore();
};

const drawCircle = (ctx: any, style: string, radius: number, x: number, y: number) => {
  ctx.fillStyle = style;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};

const drawMultiLineText = (
  ctx: any,
  text: string,
  style: string,
  font: string,
  x: number,
  y: number
) => {
  ctx.save();
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    drawText(ctx, lines[i], style, font, x, y + i * 10);
  }
  ctx.restore();
};

const neuMarkInfoPlugin = {
  beforeDraw(c: any) {
    const legends = c.legend.legendItems;
    legends.forEach((e: any) => {
      e.fillStyle = "white";
    });
  },
  afterDraw(chartInstance: any) {
    const canvas = chartInstance.chart;
    const ctx = canvas.ctx;

    const xAxe = chartInstance.scales[chartInstance.config.options.scales.xAxes[0].id];
    const yAxe = chartInstance.scales[chartInstance.config.options.scales.yAxes[0].id];

    if (typeof chartInstance.config.options.neuMarkInfoPlugin === "undefined") {
      return;
    }

    const {
      activePointIndex,
      neuMarkPrice,
      notes,
      xAxesLabel,
      yAxesLabel,
    } = chartInstance.config.options.neuMarkInfoPlugin;

    const xPoint =
      chartInstance.data.datasets[0]._meta[0].dataset._children[activePointIndex]._model.x;
    const yPoint =
      chartInstance.data.datasets[0]._meta[0].dataset._children[activePointIndex]._model.y;

    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";

    // neumark price
    drawText(ctx, neuMarkPrice, "#262B2F", "19px", xPoint + 5, yPoint);

    // current ether raised
    drawCircle(ctx, "#09719B", 5, xPoint, yPoint);

    // Text in the middle of of the chart
    drawMultiLineText(ctx, notes, "#A3C0CC", "10px", xAxe.left + 20, yAxe.bottom - 50);

    // x-axis label
    drawMultiLineText(ctx, xAxesLabel, "#BBC2C7", "8px", xAxe.right - 50, yAxe.bottom + 30);

    // y-axis label
    drawMultiLineText(ctx, yAxesLabel, "#BBC2C7", "8px", xAxe.left, yAxe.top - 10);
  },
};

export default () => {
  Chart.pluginService.register(neuMarkInfoPlugin);
};

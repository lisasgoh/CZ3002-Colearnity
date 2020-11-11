import React, { useState } from "react";

import "./QuestionStats.css";

import CanvasJSReact from "./../../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function QuestionStats(props) {
  const { question, options, stats } = props;
  console.log(options);

  const pieData = [];

  var totalResponses = stats.choices.reduce(function (a, b) {
    return a + b;
  }, 0);

  for (var i = 0; i < options.length; i++) {
    pieData.push({
      y: (stats.choices[i] / totalResponses) * 100,
      label: options[i].answerBody,
    });
  }

  console.log(pieData);

  return (
    <div>
      <CanvasJSChart
        options={{
          theme: "light2",
          animationEnabled: true,
          // exportFileName: "New Year Resolutions",
          // exportEnabled: true,
          title: {
            text: question,
          },
          data: [
            {
              type: "pie",
              showInLegend: true,
              legendText: "{label}",
              toolTipContent: "{label}: <strong>{y}%</strong>",
              indexLabel: "{y}%",
              indexLabelPlacement: "inside",
              dataPoints: pieData,
            },
          ],
        }}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

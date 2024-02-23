import * as React from "react";
import { useEffect, useState } from "react";
import Moment from "moment";
import dayjs from "dayjs";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import moment from "moment";


ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

export const ComulativeChart = (props) => {
  const [labels, setLabels] = useState([]);
  const [dataSets, setDatasets] = useState([]);

  useEffect(() => {
    const fectData = () => {
      let labelTemp = [];
      let dataTemp = [];
      // console.log(props.deposit);
      labelTemp.push("Deposit");
      dataTemp.push(props.deposit);
      props.pnl.slice(-props.range).map((item) => {
        const formatDate = dayjs(item.day).format('DD/MM')
        // const formatDate = Moment(item.day)..tz('Asia/Bangkok').format('MM/DD');
        labelTemp.push(formatDate);
        dataTemp.push(item.totalBalance);
      });
      setLabels(labelTemp);
      setDatasets(dataTemp);
    };
    fectData();
  }, []);

  const option = {
    fill: "start",
    responsive: true,
    tension: 0.3,
    maintainAspectRatio: false,
    // plugins: {
    //   legend: false,
    // },
    interaction: {
      intersect: false,
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Comulative $",
        data: dataSets,
        backgroundColor: ["rgba(134, 82, 255, 0.2)"],
        borderColor: ["rgba(134, 82, 255, 10)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Line data={data} height={400} width={600} options={option} />
    </div>
  );
};

export const DailyPnlChart = (props) => {
  const [labels, setLabels] = useState([]);
  const [dataSets, setDatasets] = useState([]);

  useEffect(() => {
    const fectData = () => {
      let priceTemp = props.deposit;
      let substract = [];
      let labelTemp = [];
      props.pnl.slice(-props.range).map((item) => {
        const formatDate = dayjs(item.day).format('DD/MM')
        labelTemp.push(formatDate);
        let sub = item.totalBalance - priceTemp;
        substract.push(sub);
        priceTemp = item.totalBalance;
        // console.log(substract);
      });
      setLabels(labelTemp);
      setDatasets(substract);
    };
    fectData();
  }, []);

  const option = {
    // fill: "start",
    responsive: true,
    tension: 0.3,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
    },
    interaction: {
      intersect: false,
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily $",
        data: dataSets,
        backgroundColor: (context) => {
          let index = context.dataIndex;
          let value = context.dataset.data[index];
          return value < 0 ? "#ED6572" : "#A8E3B3";
        },
      },
    ],
  };

  return (
    <div>
      <Bar data={data} height={400} width={600} options={option} />
    </div>
  );
};

export const CoinsChart = (props) => {
  const [labels, setLabels] = useState([]);
  const [dataSets, setDatasets] = useState([]);

  useEffect(() => {
    const fectData = () => {
      let labelTemp = [];
      let dataTemp = [];
      props.coinsData.map((item) => {
        let percentAmount = (item.total / props.totalBalance) * 100;
        // const formatDate = Moment(item.day)..tz('Asia/Bangkok').format('MM/DD');
        labelTemp.push(item.name + " " + percentAmount.toFixed(2) + "%");
        dataTemp.push(percentAmount);
      });
      setLabels(labelTemp);
      setDatasets(dataTemp);
    };
    fectData();
  }, []);

  const option = {
    responsive: true,
    tension: 0.3,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
    interaction: {
      intersect: false,
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Comulative $",
        data: dataSets,
        backgroundColor: [
          "#9691ED",
          "#B89CED",
          "#F2ACEB",
          "#BEE5EE",
          "#FFF5D4",
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} height={400} width={600} options={option} />
    </div>
  );
};

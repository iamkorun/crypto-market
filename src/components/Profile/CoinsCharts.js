import Sidebar_Profile from "./Sidebar_Profile";
import * as React from "react";
import { useEffect, useState } from "react";
import Moment from "moment";
import { Row } from "react-bootstrap";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../Table.css";
import "./Profile.css";
import { fetchListWallet } from "../../api/Wallet";
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

export const CoinsCharts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [datacoins, setDataCoins] = useState([]);
  const [totalbal, setTotalbal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let json = await fetchListWallet();

      var totalbalance = 0;
      var temp = [];

      for (var i = 0; i < json.data.length; i++) {
        var item = json.data[i];
        temp.push(item.coins);
        totalbalance += item.totalBalance;
        // console.log(totalbal)
      }
      setTotalbal(totalbalance);
      setDataCoins(temp);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function DataCoin() {
      var temp = [];

      let labelTemp = [];
      let dataTemp = [];

      datacoins.map((item) => {
        item.map((item2) => {
          // console.log(item2);
          var check = temp.find((find) => {
            if (find.name === item2.name) {
              return true;
            } else {
              return false;
            }
          });
          if (!check) {
            temp.push({ name: item2.name, total: item2.total });
          } else {
            temp.find((find) => {
              if (find.name === item2.name) {
                find.total = find.total + item2.total;
              }
            });
          }
        });
      });

      temp.map((item) => {
        let percent = (item.total / totalbal) * 100;
        labelTemp.push(item.name + " " + percent.toFixed(2) + "%");
        dataTemp.push(percent);
      });
      setLabels(labelTemp);
      setChartData(dataTemp);

      // console.log(temp);
    }
    DataCoin();
  }, [datacoins]);

  useEffect(() => {
    if (chartData.length > 0) {
      setIsLoading(true);
    }
  }, [chartData]);

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
        data: chartData,
        backgroundColor: [
          "#957DAD",
          "#9691ED",
          "#B89CED",
          "#F2ACEB",
          "#BEE5EE",
          "#FFF5D4",
          "#FFDFD3",
        ],
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <Doughnut data={data} options={option} />
      ) : (
        <ScaleLoader
          style={{ textAlign: "center" }}
          id="spinner"
          color={"#4D47C3"}
          size={200}
        />
      )}
    </div>
  );
};

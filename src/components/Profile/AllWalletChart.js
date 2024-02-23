
import Sidebar_Profile from "./Sidebar_Profile";
import * as React from "react";
import { useEffect, useState } from "react";
import Moment from "moment";
import dayjs from "dayjs";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../Table.css";
import { fetchListWallet } from "../../api/Wallet";
import "../Wallet/Wallet.css";
import { formatCurrency } from "@coingecko/cryptoformat";
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
import { Container } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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




function AllWalletChart() {
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({});
    const [datacoins, setDataCoins] = useState([]);
    const [wallet, setWallet] = useState([]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Balance All Wallet'
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            let json = await fetchListWallet();

            var labels = [];
            var data = [];

            // var temp = [];
            // console.log(json);
            json.data.map((item)=>{
                // temp.push(json.data[i].coins);
                // console.log(json.data[i])
                labels.push(item.name);
                data.push(item.totalBalance);
            }) 
            // setDataCoins(temp);

            var dataset = {
                labels: labels,
                datasets: [
                    {
                        label: "Total Balance",
                        data: data,
                        backgroundColor: "rgba(43, 153, 255, 0.5)"
                    }
                ]
            }

            // console.log(dataset)
            setChartData(dataset);
            setWallet(json.data);
            console.log(json);
            setIsLoading(true);
        }
        fetchData();
    }, [])

    const getChart = () => {
        return <Bar options={options} width={400} data={chartData} />;
    }

    return (
        <>
            <Sidebar_Profile />
            {isLoading ? (
                <Container>
                    <Row>
                        {getChart()}
                    </Row>
                    <Row>
                        {wallet.map((item) => (
                            <Col style={{ padding: 20 }}>
                                <Card style={{ padding: 20 }}>
                                    <Card.Title>
                                        {item.name}
                                    </Card.Title>
                                    <Card.Body>
                                        <p>
                                            Deposit = {formatCurrency(item.deposit, "USD", "en")}
                                        </p>
                                        <p>
                                            TotalBalance ≈{" "}
                                            {formatCurrency(item.totalBalance, "USD", "en")}
                                        </p>
                                        <p>
                                            Balance = {formatCurrency(item.balance, "USD", "en")}
                                        </p>
                                        {item.PNL > 0 && (
                                            <p style={{ color: "#00c853" }}>PNL ≈ {item.PNL} %</p>
                                        )}
                                        {item.PNL < 0 && (
                                            <p style={{ color: "#ff1744" }}>PNL ≈ {item.PNL} %</p>
                                        )}
                                        {item.PNL == 0 && <p>PNL ≈ {item.PNL} %</p>}
                                        <p>
                                            CreateAt :{" "}
                                            {/* {Moment(item.createTime).toLocaleString().split("GMT")[0]} */}
                                            {dayjs(item.createTime).format("MM/DD/YYYY HH:mm:ss")}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )
                :

                (
                    <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
                )}
        </>
    );

};

export default AllWalletChart;

import Sidebar_Profile from "./Sidebar_Profile";
import * as React from "react";
import { useEffect, useState } from "react";
import Moment from "moment";
import dayjs from "dayjs";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../Table.css";
import { fetchAllWallet, fetchListWallet } from "../../api/Wallet";
import "../Wallet/Wallet.css";
import { formatCurrency } from "@coingecko/cryptoformat";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
import { CoinSearch } from "../../api/Coins";

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


function AccountPNL() {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [editModalTitle, setEditModalTitle] = useState("");
    const [editModalMessage, setEditModalMessage] = useState("");
    const [editModalValue, setEditModalValue] = useState("");
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [images, setImages] = useState([]);
    const [preimageURLs, setPreImageURLs] = useState([]);
    const [deposit, setDeposit] = useState("");
    const [wallet, setWallet] = useState([]);
    const [balance, setBalance] = useState("");
    const [pnlpercent, setPnlPercent] = useState(0);
    const [pnl, setPnl] = useState(0);

    const getListWallet = async () => {
        let b = 0;
        let totalb = 0;
        let totald = 0;
        const res = await fetchListWallet();
        const allwallet = await fetchAllWallet();
        
        if (res.data.error) {
            console.log(res.data.error);
        } else {
            setWallet(res.data);
            for (let i = 0; i < res.data.length; i++) {
                b += res.data[i].balance;
                totalb += res.data[i].totalBalance;
                totald += res.data[i].deposit;
            }
            setBalance(totalb);
            setDeposit(totald);
            setPnlPercent((totalb / totald) * 100 - 100);
            setPnl(totalb - totald);
            console.log(allwallet.data);
        }
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getListWallet();
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, [wallet]);

    useEffect(() => {
        getListWallet();
    }, []);

    return (
        <>
            <Sidebar_Profile />
            <Container>
                <Row>
                    <Col>
                        <span style={{ fontSize: "20px" }}>Deposit</span>
                        <p>
                            <h4>{formatCurrency(deposit, "USD", "en")}</h4>
                        </p>
                    </Col>
                    <Col>
                        <span style={{ fontSize: "20px" }}>TotalBalance</span>
                        <p>
                        <h4>{formatCurrency(balance, "USD", "en")}</h4>
                        </p>
                    </Col>
                    <Col>
                        <div>
                            <span style={{ fontSize: "20px" }}>PNL</span>
                        </div>
                        <div>
                            <font color={pnl < 0 ? "#ED6572" : "#00c853"}>
                                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    {formatCurrency(pnl, "USD", "en")}
                                </span>
                                <p>{parseFloat(pnlpercent).toFixed(2)} %</p>
                            </font>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AccountPNL;
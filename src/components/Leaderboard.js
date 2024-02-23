import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { fetchRanking } from "../api/Leaderboard";
import { getAllUser } from "../api/userProfile";
import { ShowProfileModal } from "./Modal";
import "./Table.css";
import "./Profile/Profile.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [rankData, setRankData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [imgprofile, setImgProfile] = useState("");
  const [profilename, setProfileName] = useState("");
  const [walletname, setWalletName] = useState("");
  const [createtime, setCreateTime] = useState("");
  const [pnl, setPNL] = useState(0);
  const [rank, setRank] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);


  const getRank = async () => {
    const res = await fetchRanking();
    if (res.data.error) {
      console.log("Please Choose Your Wallet");
      alert("Please Choose Your Wallet");
      navigate("/me/wallet", { replace: false });
    } else {
      console.log(res.data);
      setRankData(res.data);
      getUserData();
    }
  };

  const getUserData = async () => {
    const res = await getAllUser();
    if (res.data.error) {
      console.log("Something went wrong");
    } else {
      // console.log(res.data);
      setUser(res.data);
      setIsLoading(true);
    }
  };

  const handleChoose = (event1, event2, rank) => {
    // console.log(event.name, event.imgurl);
    setShowProfileModal(true);
    setImgProfile(event2.imgurl);
    setProfileName(event2.name);
    setWalletName(event1.name);
    setCreateTime(event1.createTime);
    setPNL(event1.PNL);
    setRank(rank);
  };

  const onCancel = () => {
    setShowProfileModal(false);
  };


  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        getRank();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    getRank();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Container className="font-link">
            <Row id="leaderboard-title">
              <div>Leaderboard <i class="fa-solid fa-trophy"></i></div>
            </Row>
            <Row id="leaderboard">
              <Table id="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Wallet Name</th>
                    <th>PNL</th>
                  </tr>
                </thead>
                <tbody>
                  {rankData.map((item, rank) => (
                    user.map((item2) => (
                      <tr>
                        {item.user_id === item2._id && (
                          <>
                            <td>
                              {rank == 0 && (<i id="rank1" class="fa-solid fa-trophy"></i>)}
                              {rank == 1 && (<i id="rank2" class="fa-solid fa-trophy"></i>)}
                              {rank == 2 && (<i id="rank3" class="fa-solid fa-trophy"></i>)}
                              {rank > 2 && (rank + 1)}
                            </td>
                            <td>
                              <button id="butShowProfile" onClick={() => { handleChoose(item, item2, rank); }}>{item2.name}</button>
                            </td>
                            <td>
                              {item.name}
                            </td>
                            <td>
                              {item.PNL > 0 && (<div style={{ color: "#1EBF18" }}>{item.PNL}%</div>)}
                              {item.PNL < 0 && (<div style={{ color: "#ff1744" }}>{item.PNL}%</div>)}
                              {item.PNL == 0 && (<div>{item.PNL}%</div>)}
                            </td>
                          </>)}
                      </tr>
                    ))
                  ))}
                </tbody>
              </Table>
            </Row>
          </Container>
          <ShowProfileModal
            show={showProfileModal}
            title="Profile"
            name={profilename}
            imgurl={imgprofile}
            walletname={walletname}
            createTime={createtime}
            pnl={pnl}
            rank={rank}
            onCancel={onCancel} />
        </>
      ) : (
        <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
      )}
    </>
  );
};

export default Leaderboard;

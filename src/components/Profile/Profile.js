import { Row, Col, Container, Card, Button } from "react-bootstrap";
import Sidebar_Profile from "./Sidebar_Profile";
import { EditModal, UpdatePicModal } from "../Modal";
import { useEffect, useState } from "react";
import { fetchListWallet } from "../../api/Wallet";
import { CoinsCharts } from "./CoinsCharts";
import "./Profile.css";
import {
  updateNameById,
  getUser,
  updateProfilePic,
} from "../../api/userProfile";
import { formatCurrency } from "@coingecko/cryptoformat";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CoinList } from "../../api/Coins";
import ScaleLoader from "react-spinners/ScaleLoader";

const Profile = () => {
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
  const [button, setButton] = useState(true);
  const [wallet, setWallet] = useState([]);
  const [balance, setBalance] = useState("");
  const [pnl, setPnl] = useState(0);

  const getListWallet = async () => {
    let b = 0;
    let totalb = 0;
    let totald = 0;
    const res = await fetchListWallet();
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
      setPnl((totalb / totald) * 100 - 100);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getListWallet();
    }, 2000);
    return () => clearInterval(interval);
  }, [wallet]);

  useEffect(() => {
    getListWallet();
  }, []);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setPreImageURLs(newImageUrls);
    // console.log(preimageURLs);
  }, [images]);

  const handleEdit = () => {
    setEditModalTitle("Change Your Name");
    setEditModalMessage("Your Name :");
    setEditModalValue(localStorage.getItem("name"));
    setShowEditModal(true);
  };

  const handleUpdatePic = () => {
    setEditModalTitle("Update Your Picture");
    setShowUpdateModal(true);
    console.log(button);
  };

  const getUserData = async () => {
    const res = await getUser();
    if (res.data.error) {
      console.log("Something went wrong");
    } else {
      setUser(res.data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserData();
    if (isLoading) {
      localStorage.setItem("name", user[0].name);
      localStorage.setItem("imgurl", user[0].imgurl);
      setImageUrl(localStorage.getItem("imgurl"));
      // console.log(user[0]._id);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoadingUpload) {
      // console.log(imageUrl);
      onSaveUpload();
    }
  }, [isLoadingUpload]);

  const onFileSelected = (e) => {
    setImages([...e.target.files]);
    console.log(selectedFile);
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setButton(false);
    }
  };

  const onUploadImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    let response = await fetch(
      "http://localhost:5000/user/upload/" + user[0].email,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: formData,
      }
    );
    let json = await response.json();
    setImageUrl(json.data);
    setIsLoadingUpload(true);
  };

  const onSaveEdit = async (event) => {
    event.preventDefault();
    // console.log(event.target.name.value);
    const res = await updateNameById(event.target.name.value);
    if (res.data.error) {
      console.log(res.data.message);
      alert(res.data.message);
    } else {
      alert("Name is Changed !");
      localStorage.setItem("name", event.target.name.value);
    }
    window.location.reload();
  };

  const onSaveUpload = async () => {
    const res = await updateProfilePic(imageUrl);
    if (res.data.error) {
      console.log(res.data.message);
      alert(res.data.message);
    } else {
      alert("Profile picture is Changed !");
      window.location.reload();
    }
  };

  const onCancelEdit = () => {
    setShowEditModal(false);
    setShowUpdateModal(false);
    setSelectedFile([]);
    setButton(true);
    setPreImageURLs([]);
    setImageUrl(localStorage.getItem("imgurl"));
  };

  return (
    <>
      <Sidebar_Profile />
      <Container id="Profile" className="font-link">
        <Row>
          <img
            id="ProfilePic"
            onClick={handleUpdatePic}
            src={`http://localhost:5000/images/${localStorage.getItem(
              "imgurl"
            )}`}
          />
        </Row>
        <Row id="ProfileName">
          <Col id="nameprofile">
            {localStorage.getItem("name")}{" "}
            <button className="nameBut" onClick={handleEdit}>
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </Col>
        </Row>
        <Row id="Graph">
          <Col>
            <Card id="cardprofile" style={{ padding: 20 }}>
              <Card.Title>
                <Link id="profilelink" to="/profile/allwallet">
                  Total balance
                </Link>
              </Card.Title>
              <Card.Body id="card-content">
                {balance ? (
                  <>{formatCurrency(balance, "USD", "en")}</>
                ) : (
                  <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card id="cardprofile" style={{ padding: 20 }}>
              <Card.Title>PNL</Card.Title>
              <Card.Body id="card-content">
                {pnl ? (
                  <>
                    {pnl > 0 && (
                      <div style={{ color: "#1EBF18" }} id="total-pnl">
                        {pnl.toFixed(2)} %
                      </div>
                    )}
                    {pnl < 0 && (
                      <div style={{ color: "#ff1744" }} id="total-pnl">
                        {pnl.toFixed(2)} %
                      </div>
                    )}
                    {pnl == 0 && <div id="total-pnl">{pnl.toFixed(2)} %</div>}
                  </>
                ) : (
                  <ScaleLoader
                    style={{ textAlign: "center" }}
                    id="spinner"
                    color={"#4D47C3"}
                    size={200}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card id="cardprofile" style={{ padding: 20 }}>
              <Card.Title>Coins</Card.Title>
              <Card.Body id="CoinsChart">
                <CoinsCharts />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <EditModal
        show={showEditModal}
        title={editModalTitle}
        message={editModalMessage}
        value={editModalValue}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
      />
      <UpdatePicModal
        show={showUpdateModal}
        title={editModalTitle}
        imgURLs={preimageURLs}
        button={button}
        onSelect={onFileSelected}
        onSave={onUploadImage}
        onCancel={onCancelEdit}
      />
    </>
  );
};

export default Profile;

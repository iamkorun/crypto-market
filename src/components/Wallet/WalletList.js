import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  fetchListWallet,
  updateWalletById,
  deletWalletById,
} from "../../api/Wallet";
import { ConfirmModal, EditModal } from "../Modal";
import WalletCard from "./WalletCard";

import "./Wallet.css";
import "../Table.css";
// import jwt from 'jwt-decode'

const WalletList = () => {
  const params = useParams();
  const [wallet, setWallet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletId, setWalletId] = useState("");
  const [walletName, setWalletName] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalTitle, setConfirmModalTitle] = useState("");
  const [confirmModalMessage, setConfirmModalMessage] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalTitle, setEditModalTitle] = useState("");
  const [editModalMessage, setEditModalMessage] = useState("");
  const [editModalValue, setEditModalValue] = useState("");

  const navigate = useNavigate();

  const getListWallet = async () => {
    const res = await fetchListWallet();
    if (res.data.error) {
      console.log("Please Choose Your Wallet");
      alert("Please Choose Your Wallet");
      navigate("/me/wallet", { replace: false });
    } else {
      setWallet(res.data);
      setIsLoading(true);
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

  const handleCreate = (event) => {
    event.preventDefault();
    navigate("/wallet/create", { replace: false });
  };

  const handleEdit = (event) => {
    setEditModalTitle("Change Wallet Name");
    setEditModalMessage("Wallet Name :");
    setEditModalValue(event.name);
    setShowEditModal(true);
    setWalletId(event.wallet_id);
    setWalletName(event.name);
  };

  const handleDelete = (event) => {
    setConfirmModalTitle("Are you sure ?");
    setConfirmModalMessage(
      "Are u sure want to delete wallet " + event.name + " ?"
    );
    setShowConfirmModal(true);
    setWalletId(event.wallet_id);
    setWalletName(event.name);
  };

  const handleChoose = (event) => {
    localStorage.setItem("wallet_name", event.name);
    navigate(`/me/wallet/${event.wallet_id}`, { replace: false });
    window.location.reload();
  };

  const onSaveEdit = async (event) => {
    event.preventDefault();
    setShowEditModal(false);
    if (localStorage.getItem("wallet_name") === walletName) {
      localStorage.setItem("wallet_name", event.target.name.value);
      window.location.reload();
    }
    const res = await updateWalletById(event.target.name.value, walletId);
    if (res.data.error) {
      console.log(res.data.message);
      alert(res.data.message);
    } else {
      alert("Wallet Name is Changed !");
      getListWallet();
    }
  };

  const onCancelEdit = () => {
    setShowEditModal(false);
  };

  const onConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (localStorage.getItem("wallet_name") === walletName) {
      localStorage.removeItem("wallet_name");
      window.location.reload();
    }
    const res = await deletWalletById(walletId);
    if (res.data.error) {
      console.log(res.data.message);
      alert(res.data.message);
    } else {
      alert(res.data.name + " has been deleted !");
      getListWallet();
    }
  };

  const onCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const WalletListui = () => {
    return (
      <Container className="font-link" style={{ padding: 20, marginTop: 20 }} fluid>
        <Row className="justify-content-md-center">
          {wallet.map((item) => (
            <WalletCard
              key={item.wallet_id}
              data={item}
              onChoose={handleChoose}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          <Col md={3} style={{ padding: 20 }}>
            <Card
              style={{ padding: 20, cursor: "pointer" }}
              onClick={handleCreate}
            >
              <center>
                <i class="fa-solid fa-plus fa-xl"></i>
              </center>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  if (localStorage.getItem("access_token")) {
    // console.log(localStorage.getItem("access_token"));
    return (
      <>
        {isLoading ? (
          <>
            <WalletListui />
            <ConfirmModal
              show={showConfirmModal}
              title={confirmModalTitle}
              message={confirmModalMessage}
              onConfirm={onConfirmDelete}
              onCancel={onCancelDelete}
            />
            <EditModal
              show={showEditModal}
              title={editModalTitle}
              message={editModalMessage}
              value={editModalValue}
              onSave={onSaveEdit}
              onCancel={onCancelEdit}
            />
          </>
        ) : (
          <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
        )}
      </>
    );
  }
  return <Navigate to="/login" replace />;
};

export default WalletList;

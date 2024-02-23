import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditModal, ConfirmCancelTokenModal } from "../Modal";
import { updateToken, getUser } from '../../api/userProfile';
import ScaleLoader from "react-spinners/ScaleLoader";

import "./LineNoti.css"





function LineNotify() {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmModalTitle, setConfirmModalTitle] = useState("");
    const [editModalTitle, setEditModalTitle] = useState("");
    const [confirmModalMessage, setConfirmModalMessage] = useState("");
    const [editModalMessage, setEditModalMessage] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState([]);

    const handleEdit = () => {
        setEditModalTitle("Add Token");
        setEditModalMessage("Token :");
        setShowEditModal(true);
    };

    const handleconfirm = () => {
        setConfirmModalTitle("Cancel Token");
        setConfirmModalMessage("Are you sure to cancel this token ?");
        setShowConfirmModal(true);
    };

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const res = await getUser();
        if (res.data.error) {
            console.log("Something went wrong");
        } else {
            setUser(res.data);
            test(res.data);
            console.log(res.data);
        }
    };

    const test = async (data) => {
        let token = "";
        if (data[0].linetoken) {
            for (let i = 0; i < data[0].linetoken.length; i++) {
                if (i <= 3 || i >= 39) {
                    token = token + data[0].linetoken[i];
                }
                else {
                    token = token + "*";
                }
            }
        } else {
            token = "Null";
        }
        setToken(token);
        setIsLoading(true);
    };

    const onSaveEdit = async (event) => {
        event.preventDefault();
        console.log(event.target.name.value);
        const res = await updateToken(event.target.name.value);
        if (res.data.error) {
            console.log(res.data.message);
            alert(res.data.message);
        } else {
            alert("Add token success !!");

        }
        window.location.reload();
    };

    const onCancelToken = async () => {        
        const res = await updateToken("");
        if (res.data.error) {
            console.log(res.data.message);
            alert(res.data.message);
        } else {
            alert("Cancel token success !!");

        }
        window.location.reload();
    };

    const onCancelEdit = () => {
        setShowEditModal(false);

    };

    return (
        <>
            {isLoading ?
                (
                    <>
                        <Container id="line">
                            <Row id="line-title">
                                <h1>Line Notify</h1>
                                <h5>ไว้ใช้แจ้งเตือนผ่าน Line Application เมื่อมีการซื้อขาย</h5>
                                <h5>ขั้นตอนการใช้งานมีดังนี้</h5>
                            </Row>
                            <Row id="line-tutorial">
                                <Col md="4" id="col-tutorial">
                                    1.เข้าไปยังเว็บไซต์ <a href="https://notify-bot.line.me/th/" target="_blank">https://notify-bot.line.me/th/</a>
                                    <br />
                                    <img id="line-pic" src={`http://localhost:5000/pic/linenoti1.jpg`} />
                                </Col>
                                <Col md="4" id="col-tutorial">
                                    2.จากนั้นเข้าสู่ระบบด้วยบัญชีของคุณ
                                    <br />
                                    <img id="line-pic" src={`http://localhost:5000/pic/linenoti2.jpg`} />
                                </Col>
                                <Col md="4" id="col-tutorial">
                                    3.เมื่อเข้าสู่ระบบเสร็จสิ้น กดที่ชื่อบัญชีของคุณ
                                    <br /> ไปยังที่หน้าของฉัน
                                    <br />
                                    <img id="line-pic" src={`http://localhost:5000/pic/linenoti3.jpg`} />
                                </Col>
                            </Row>
                            <Row id="line-tutorial">
                                <Col md="6" id="col-tutorial">
                                    4.กดปุ่มออก Token
                                    <br />
                                    <img id="line-pic" src={`http://localhost:5000/pic/linenoti4.jpg`} />
                                </Col>
                                <Col md="6" id="col-tutorial">
                                    5.เมื่อกรอกรายละเอียดเสร็จสิ้น จะมี Token มาให้
                                    <br />คัดลอก Token นั้นมาใส่ในเว็บได้เลยเป็นอันเสร็จสิ้น
                                    <br />
                                    <img id="line-pic" src={`http://localhost:5000/pic/linenoti5.jpg`} />
                                </Col>
                            </Row>

                            <Row id="token">

                                <Col md="5" id="ex-linenoti">
                                    ตัวอย่างการแจ้งเตือน
                                    <br />
                                    <img id="line-token-pic" src={`http://localhost:5000/pic/linenoti6.jpg`} />
                                </Col>
                                <Col md="7">
                                    <Card id="line-token">
                                        <Card.Title id="line-token-title">
                                            Add Line Token
                                        </Card.Title>
                                        <Card.Body id="line-token-body">
                                            {user[0].linetoken ?
                                                (
                                                    <>
                                                        <div>
                                                            <span>Your Token: {token}</span>
                                                        </div>
                                                        <button id="cancel-token" onClick={handleconfirm}>Delete token</button>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div>
                                                            <span>Your Token: {token}</span>
                                                        </div>
                                                        <button id="add-token" onClick={handleEdit}>Add token</button>
                                                    </>
                                                )}

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                        </Container>
                        <EditModal
                            show={showEditModal}
                            title={editModalTitle}
                            message={editModalMessage}
                            onSave={onSaveEdit}
                            onCancel={onCancelEdit} />
                        <ConfirmCancelTokenModal
                            show={showConfirmModal}
                            title={confirmModalTitle}
                            message={confirmModalMessage}
                            onCancel={onCancelEdit}
                            onConfirm={onCancelToken}
                            />
                    </>)
                :
                (<ScaleLoader id="spinner" color={"#4D47C3"} size={200} />)
            }

        </>
    );
}

export default LineNotify;
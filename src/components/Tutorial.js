import { Col, Row } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
    Animator,
    batch,
    Fade,
    Move,
    MoveOut,
    ScrollContainer,
    ScrollPage,
    Sticky
} from 'react-scroll-motion';
import "./Tutorial.css"


const FadeUp = batch(Fade(), Sticky(), Move(0, 500), MoveOut());

function Tutorial() {

    return (
        <ScrollContainer>
            <ScrollPage page={0}>
                <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
                    <Row id="tutorial">
                        <Col ml="6">
                            <div>
                                <h1>Tutorial</h1>
                                วิธีการใช้งานเว็บไซต์ MMC App (Demotrade)
                            </div>
                        </Col>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial.jpg`} />
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={1}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <div>
                                <h1>อันดับแรก</h1>
                                คุณจะต้องสมัครสมาชิกก่อนใช้งานเว็บไซต์
                            </div>
                        </Col>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial1.jpg`} />
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={2}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial2.jpg`} />
                        </Col>
                        <Col ml="6">
                            <div>
                                <h1>จากนั้น</h1>
                                คุณก็ Login เข้าใช้งานเว็บไซต์
                            </div>
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={3}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <div>
                                <h1>เมื่อเข้าสู่ระบบมาแล้ว</h1>
                                คุณจะยังไม่มี Wallet ของคุณ ลองกด + แล้วสร้าง Wallet ของคุณดูสิ
                                คุณสามารถมีหลาย Wallet เพื่อที่จะวางแผนจัดการแต่ละ Wallet ได้ด้วยนะ
                            </div>
                        </Col>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial3.jpg`} />
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={4}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial4.jpg`} />
                        </Col>
                        <Col ml="6">
                            <div>
                                <h1>สร้าง Wallet เสร็จแล้ว</h1>
                                แสดงว่าคุณพร้อมที่จะ Trade แล้วสินะ คุณสามารถกดไปยังหน้า Market
                                แล้วเลือกเหรียญที่จะ Trade ได้เลย อย่าลืมเลือก Wallet ก่อน Trade ล่ะ
                            </div>
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={5}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <div>
                                <h1>เมื่อ Trade ได้ซักระยะหนึ่ง</h1>
                                คุณสามารถดูรายละเอียดแต่ละ Wallet ที่คุณจัดการได้ด้วยนะ
                            </div>
                        </Col>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial5.jpg`} />
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={6}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <img id="tutorial-pic" src={`http://localhost:5000/pic/Tutorial6.jpg`} />
                        </Col>
                        <Col ml="6">
                            <div>
                                <h1>ในหน้า Profile</h1>
                                คุณสามารถดูภาพรวมทั้งหมดในบัญชีของคุณได้ในหน้านี้
                            </div>
                        </Col>
                    </Row>
                </Animator>
            </ScrollPage>

            <ScrollPage page={7}>
                <Animator animation={FadeUp}>
                    <Row>
                        <Col ml="6">
                            <div>
                                <h1>ระบบ Leaderboard</h1>
                                คุณสามารถดูได้ว่าใครได้กำไรเยอะที่สุด ไม่แน่คุณอาจจะเป็นตัวเต็งในการเทรดก็ได้นะ
                            </div>
                        </Col>
                        <Col ml="6">
                            <img id="tutorial-pic" style={{ width: "600px" }} src={`http://localhost:5000/pic/Tutorial7.jpg`} />
                        </Col>
                    </Row>
                    <Row id="warn">
                        <div >
                            ** การ Trade ภายในเว็บนี้เป็นเพียงแค่แบบจำลอง ไม่มีการใช้เงินจริงใดๆทั้งสิ้น **
                        </div>
                        {localStorage.getItem("name") ?
                            (
                                <Button
                                    style={{ backgroundColor: "#5f5bcf" }}
                                    as={Link}
                                    to={"/me/wallet"}
                                >
                                    เริ่มใช้งานเลย !!
                                </Button>
                            )
                            :
                            (
                                <Button
                                    style={{ backgroundColor: "#5f5bcf" }}
                                    as={Link}
                                    to={"/register"}
                                >
                                    เริ่มใช้งานเลย !!
                                </Button>
                            )
                        }
                    </Row>
                </Animator>
            </ScrollPage>
        </ScrollContainer>
    );
}

export default Tutorial;
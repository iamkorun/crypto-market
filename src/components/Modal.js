import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import dayjs from "dayjs";
import "./Profile/Profile.css"
import { Card, Col } from "react-bootstrap";


export function ConfirmModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onCancel}
      backdrop="static"
      enforceFocus={false}
      autoFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ConfirmCancelTokenModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onCancel}
      backdrop="static"
      enforceFocus={false}
      autoFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function EditModal(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Form onSubmit={props.onSave}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>{props.message}</Form.Label>
              <Form.Control required id="name" type="text" defaultValue={props.value} />
              <Form.Control.Feedback type="invalid">
                Input Name
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCancel}>
              Close
            </Button>
            <Button style={{ backgroundColor: "#4D47C3", borderColor: "#4D47C3" }} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export function UpdatePicModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onCancel}>
        <Form >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group  >
              <Row>
                {props.imgURLs.map((imageSrc, idx) => (
                  <img id="previewPic" key={idx} src={imageSrc} />
                ))}
              </Row>
            </Form.Group>
            <Form.Group  >
              <Form.Label>เลือกรูปภาพ</Form.Label>
              <Form.Control type="file" name="file" multiple accept="image/*" onChange={props.onSelect} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCancel}>
              Close
            </Button>
            <Button disabled={props.button} style={{ backgroundColor: "#4D47C3", borderColor: "#4D47C3" }} onClick={props.onSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export function ShowProfileModal(props) {
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.onCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form >
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row id="ProfileNameModal">
              Rank : {props.rank + 1} {props.rank == 0 && (<i id="rank1" class="fa-solid fa-trophy"></i>)}
              {props.rank == 1 && (<i id="rank2" class="fa-solid fa-trophy"></i>)}
              {props.rank == 2 && (<i id="rank3" class="fa-solid fa-trophy"></i>)}

            </Row>
            <Row>
              <img id="ProfilePicModal" src={`http://localhost:5000/images/${props.imgurl}`} />
            </Row>
            <Row id="ProfileNameModal">
              {props.name}
            </Row>
            <hr />
            <Row id="ProfileNameModal">
              Wallet Name : {props.walletname}
            </Row>
            <Row>
              <Col>
                <Card id="cardprofilemodal" style={{ padding: 20 }}>
                  <Card.Title>
                    Create at
                  </Card.Title>
                  <Card.Body id="card-content">
                    {dayjs(props.createTime).format("MM/DD/YYYY HH:mm:ss")}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card id="cardprofilemodal" style={{ padding: 20 }}>
                  <Card.Title>
                    PNL
                  </Card.Title>
                  <Card.Body>
                    {props.pnl > 0 && (
                      <div style={{ color: "#1EBF18" }} id="total-pnl">{props.pnl.toFixed(2)} %</div>
                    )}
                    {props.pnl < 0 && (
                      <div style={{ color: "#ff1744" }} id="total-pnl">{props.pnl.toFixed(2)} %</div>
                    )}
                    {props.pnl == 0 && <div id="total-pnl">{props.pnl.toFixed(2)} %</div>}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCancel}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

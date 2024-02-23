import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Moment from "moment";
import dayjs from "dayjs";
import "./Wallet.css";
import { formatCurrency } from "@coingecko/cryptoformat";

const WalletCard = (props) => {
  const onChoose = async () => {
    props.onChoose(props.data);
  };
  const onEdit = async () => {
    props.onEdit(props.data);
  };
  const onDelete = async () => {
    props.onDelete(props.data);
  };

  return (
    <Col md={3} style={{ padding: 20 }}>
      <Card style={{ padding: 20 }}>
        <Card.Title>
          {props.data.name}
          <div className="closeButton">
            <button className="btnIcon" onClick={onDelete}>
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
          <div className="editIcon">
            <button type="button" className="btnIcon" onClick={onEdit}>
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </Card.Title>
        <Card.Body>
          <p>
            TotalBalance ≈{" "}
            {formatCurrency(props.data.totalBalance, "USD", "en")}
          </p>
          <p>
            Balance = {formatCurrency(props.data.balance, "USD", "en")}
          </p>
          {props.data.PNL > 0 && (
            <p style={{ color: "#00c853" }}>PNL ≈ {props.data.PNL} %</p>
          )}
          {props.data.PNL < 0 && (
            <p style={{ color: "#ff1744" }}>PNL ≈ {props.data.PNL} %</p>
          )}
          {props.data.PNL == 0 && <p>PNL ≈ {props.data.PNL} %</p>}
          <p>
            CreateAt :{" "}
            {/* {Moment(props.data.createTime).toLocaleString().split("GMT")[0]} */}
            {dayjs(props.data.createTime).format("MM/DD/YYYY HH:mm:ss")}
          </p>
        </Card.Body>
        <Button
          style={{
            backgroundColor: "#4D47C3",
            margin: "5%",
            boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            borderColor: "#4D47C3",
          }}
          onClick={onChoose}
        >
          Choose
        </Button>
      </Card>
    </Col>
  );
};

export default WalletCard;

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { formatCurrency } from "@coingecko/cryptoformat";

export const WalletAssets = (props) => {
  return (
    <Card className="WalletBox">
      <Card.Header>Asset</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            In Spot {props.symbol}
            <font className="text-muted"> Avbl:</font>
          </Col>
          <Col md="auto">
            {formatCurrency(props.inSpotCoin, "BTC", "en").split("₿")[1]}
          </Col>
        </Row>
        <Row>
          <Col>
            In Order {props.symbol}
            <font className="text-muted"> Avbl:</font>
          </Col>
          <Col md="auto">
            {
              formatCurrency(props.coin - props.inSpotCoin, "BTC", "en").split(
                "₿"
              )[1]
            }
          </Col>
        </Row>
        <Row>
          <Col>
            In Spot USDT <font className="text-muted">Avbl:</font>
          </Col>
          <Col md="auto">
            {formatCurrency(props.inSpotBalance, "USD", "en").split("$")[1]}
          </Col>
        </Row>
        <Row>
          <Col>
            In Order USDT <font className="text-muted">Avbl:</font>
          </Col>
          <Col md="auto">
            {
              formatCurrency(
                props.balance - props.inSpotBalance,
                "USD",
                "en"
              ).split("$")[1]
            }
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            Total {props.symbol}
            <font className="text-muted"> Available:</font>
          </Col>
          <Col md="auto">
            {formatCurrency(props.coin, "BTC", "en").split("₿")[1]}
          </Col>
        </Row>
        <Row>
          <Col>
            Total USDT <font className="text-muted">Available:</font>
          </Col>
          <Col md="auto">
            {formatCurrency(props.balance, "USD", "en").split("$")[1]}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

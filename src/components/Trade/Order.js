import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { formatCurrency } from "@coingecko/cryptoformat";

export const OpenOrder = (props) => {
  const onPair = async () => {
    props.onPair(props.data);
  };

  const onDelete = async () => {
    props.onDelete(props.data);
  };

  return (
    <tbody>
      <tr>
        <td>
          <button className="typeLabel" onClick={onPair}>
            {props.data.pair}
          </button>
        </td>
        <td>{props.data.type}</td>
        <td>{props.data.side}</td>
        <td>
          {
            formatCurrency(props.data.amount.$numberDecimal, "BTC", "en").split(
              "₿"
            )[1]
          }
        </td>
        <td>
          {props.data.side === "buy"
            ? "≤" +
              formatCurrency(
                props.data.avgPrice.$numberDecimal,
                "USD",
                "en"
              ).split("$")[1]
            : "≥" +
              formatCurrency(
                props.data.avgPrice.$numberDecimal,
                "USD",
                "en"
              ).split("$")[1]}
        </td>
        <td>
          <button className="typeLabel" onClick={onDelete}>
            Cancel
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export const OrderHistory = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.data.pair}</td>
        <td>{props.data.type}</td>
        <td>{props.data.side}</td>
        <td>
          {
            formatCurrency(
              props.data.avgPrice.$numberDecimal,
              "USD",
              "en"
            ).split("$")[1]
          }
        </td>
        <td>
          {
            formatCurrency(props.data.amount.$numberDecimal, "BTC", "en").split(
              "₿"
            )[1]
          }
        </td>
        <td>{formatCurrency(props.data.total.$numberDecimal, "USD", "en")}</td>
      </tr>
    </tbody>
  );
};

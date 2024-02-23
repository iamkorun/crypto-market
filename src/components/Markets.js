import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinList, fetchMarkets } from "../api/Coins";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./Table.css";

const Markets = () => {
  const params = useParams();
  const [query, setQuery] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [coins, setCoins] = useState([]);

  const filter = () => {
    setDataSearch(
      coins.filter((item) => {
        return item.symbol.split("_")[0].toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  
  useEffect(() => {
    const setPage = async () => {
      const result = await fetchMarkets();
      console.log(result.data);
      setCoins(result.data);
      setDataSearch(result.data);
    };

    setPage();
  }, []);

  useEffect(() => {
    filter();
  }, [query]);

  return coins.length > 0 ? (
    <div className="market">
        <Row>
          <Col md xl="4"></Col>
          <Col md xl="4">
            <InputGroup id="search" style={{ width: "auto" }}>
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
          <Col md xl="4"></Col>
        </Row>
        <Row>
          <Col>
            <Table id="content-table" responsive="sm">
              <thead>
                <tr>
                  <th>Coins</th>
                  <th>Current Price</th>
                  <th>24h Change</th>
                  <th>24h High/Low</th>
                  <th>24h Volume</th>
                </tr>
              </thead>
              <tbody>
              
                {dataSearch.map(
                  (item) =>
                    item.currentPrice > 0 && (
                      <tr>
                        <td>
                        
                          <Link to={`/trade/${item.symอbol}`}>
                            <img
                              src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${
                                item.symbol.split("_")[0]
                              }.svg`}
                              style={{ paddingRight: "10px" }}
                            />
                            {item.symbol.split("_")[0]}
                          </Link>
                        </td>
                        <td>$ {item.currentPrice}</td>
                        {item.priceChangePercent > 0 && (
                          <td>
                            <font color="#00c853">
                              {item.priceChangePercent} %
                            </font>
                          </td>
                        )}
                        {item.priceChangePercent < 0 && (
                          <td>
                            <font color="#ff1744">
                              {item.priceChangePercent} %
                            </font>
                          </td>
                        )}
                        {item.priceChangePercent == 0 && (
                          <td>{item.priceChangePercent} %</td>
                        )}
                        <td>
                          {item.highPrice}/{item.lowPrice}
                        </td>
                        <td>{item.quoteVolume}</td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
    </div>
  ) : (
    <ScaleLoader id="spinner" color={"#4D47C3"} size={200} />
  );
};

export default Markets;

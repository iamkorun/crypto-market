import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinList, CoinSearch } from "../api/Coins";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./Table.css";

const Cryptocurrency = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState([]);

  const fetchCoins = async () => {
    const result = await CoinSearch();
    setCoins(result.data.coins);
    setSearch(result.data.coins);
  };

  const filter = () => {
    setSearch(
      coins.filter((item) => {
        return item.name.toLowerCase().includes(query);
      })
    );
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    filter();
  }, [query]);

  return (
    <Container fluid="md"  >
      <Row className="justify-content-md-center">
        <Col md="auto">
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <ul>
            {search
              //   .filter((item) => {
              //     item.name.toLowerCase().includes(query);
              //   })
              .map((item) => (
                <li>{item.name}</li>
              ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default Cryptocurrency;

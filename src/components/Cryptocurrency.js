import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoinList } from "../api/Coins";
import { Table, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ScaleLoader from "react-spinners/ScaleLoader";
// import "./style.css";

const Cryptocurrency = () => {
  const params = useParams();
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const setPage = async () => {
      const result = await CoinList("usd", params.page);
      console.log(result.data);
      setCoins(result.data);

    };
    setPage();
  }, [params.page]);

  const handlePageClick = (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    navigate("/cryptocurrency/" + currentPage, { replace: false });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (

    coins.length > 0 ?
      (
        <div className="crypto">
          <Row>
            <Col>
              <Table id="content-table" responsive="sm" >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Coins</th>
                    <th>Price</th>
                    <th>24h</th>
                    <th>Volume</th>
                    <th>MarketCap</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((item) => (
                    <tr>
                      <td>{item.market_cap_rank}</td>
                      <td><img src={item.image} width="30px" alt={item.symbol} />
                        <a className="coinname"
                          href={`https://www.coingecko.com/en/coins/${item.id}`}
                          target="_blanck"
                        >
                          {item.name}
                        </a>
                      </td>
                      <td>${item.current_price}</td>
                      {item.price_change_percentage_24h > 0 && (<td><font color="#00c853">{item.price_change_percentage_24h} %</font></td>)}
                      {item.price_change_percentage_24h < 0 && (<td><font color="#ff1744">{item.price_change_percentage_24h} %</font></td>)}
                      {item.price_change_percentage_24h == 0 && (<td>{item.price_change_percentage_24h} %</td>)}
                      <td>${item.total_volume}</td>
                      <td>${item.market_cap}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <ReactPaginate id="pagination"
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={130}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeLinkClassName={'active'}
              />
            </Col>
          </Row>
        </div>
      )
      :
      (<ScaleLoader id="spinner" color={"#4D47C3"} size={200} />)
  );
};
export default Cryptocurrency;

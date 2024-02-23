import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { getUser } from "./api/userProfile";

import "./Nav.css";
import "./components/Profile/Profile.css";

function Navi(props) {
  const [walletName, setWalletName] = useState("Wallet not choose");
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    const res = await getUser();
    if (res.data.error) {
      console.log("Something went wrong");
    } else {
      setUser(res.data);
      setIsLoading(true);
      // console.log(user[0].name);
    }
  };

  useEffect(() => {
    getUserData();
    if (isLoading) {
      localStorage.setItem("name", user[0].name);
      localStorage.setItem("imgurl", user[0].imgurl);

      // console.log(user[0].name);
    }
  }, [isLoading]);

  useEffect(() => {
    const fectchWallet = () => {
      const item = localStorage.getItem("wallet_name");
      if (item) {
        setWalletName(item);
      }
    };
    fectchWallet();
  }, [props, walletName]);

  function logOut() {
    localStorage.clear();
  }

  return (
    <Navbar id="Navbar" expand="lg">
      <Container className="font-link" fluid>
        <Navbar.Brand id="Navbar-logo" as={Link} to={"/"}>
          <i class="fa-solid fa-cubes"></i>
          <span style={{ marginLeft: "10px" }}>MMC App</span>
        </Navbar.Brand>
        {localStorage.getItem("name") ? (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link id="Nav-link" as={Link} to={"/"}>
                  Cryptocurrencies
                </Nav.Link>
                <Nav.Link
                  id="Nav-link"
                  as={Link}
                  to={"/tutorial"}
                >
                  Tutorial
                </Nav.Link>
                {
                  walletName === "Wallet not choose" ?
                    (
                      <Nav.Link
                        id="Nav-link"
                        as={Link}
                        onClick={() => { alert("Please choose your wallet !!") }}
                        to={`/me/wallet`}
                      >
                        Markets
                      </Nav.Link>
                    )
                    :
                    (
                      <Nav.Link id="Nav-link" as={Link} to={"/trade/markets"}>
                        Markets
                      </Nav.Link>
                    )
                }

                <Nav.Link id="Nav-link" as={Link} to={"/leaderboard"}>
                  <span style={{ marginRight: "10px" }}>Leaderboard</span>
                  <i class="fa-solid fa-ranking-star"></i>
                </Nav.Link>
              </Nav>
              {
                walletName === "Wallet not choose" ?
                  (
                    <Nav.Link
                      id="Nav-link"
                      className="me-3"
                      as={Link}
                      onClick={() => { alert("Please choose your wallet !!") }}
                      to={`/me/wallet`}
                    >
                      Wallet : {walletName}
                    </Nav.Link>
                  )
                  :
                  (
                    <Nav.Link
                      id="Nav-link"
                      className="me-3"
                      as={Link}
                      to={`/me/wallet/${localStorage.getItem("wallet_id")}`}
                    >
                      Wallet : {walletName}
                    </Nav.Link>
                  )
              }
              <NavDropdown
                title={localStorage.getItem("name")}
                id="nav-dropdown-subject"
                align="end"
              >
                <NavDropdown.Item id="nav-dropdown" as={Link} to={"/profile"}>
                  <span>My Profile</span>
                  <span style={{ float: "right" }}><i class="fa-solid fa-user"></i></span>
                </NavDropdown.Item>
                <NavDropdown.Item id="nav-dropdown" as={Link} to={"/me/wallet"}>
                  <span style={{ marginRight: "10px" }}>Change Wallet</span>
                  <i class="fa-solid fa-rotate"></i>
                </NavDropdown.Item>
                <NavDropdown.Item id="nav-dropdown" as={Link} to={"/profile/line"}>
                  <span style={{ marginRight: "10px" }}>Line Notify</span>
                  <span style={{ float: "right" }}><i class="fa-solid fa-bell"></i></span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  id="nav-dropdown-logout"
                  onClick={logOut}
                  href="/"
                >
                  <span>Logout</span>
                  <span style={{ float: "right" }}><i class="fa-solid fa-right-from-bracket"></i></span>
                </NavDropdown.Item>
              </NavDropdown>
              <img
                id="icon-propic"
                src={`http://localhost:5000/images/${localStorage.getItem(
                  "imgurl"
                )}`}
              />
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                id="Nav-link"
                className="me-auto"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link id="Nav-link" as={Link} to={"/"}>
                  Cryptocurrency
                </Nav.Link>
                <Nav.Link
                  id="Nav-link"
                  as={Link}
                  to={"/tutorial"}
                >
                  Tutorial
                </Nav.Link>
              </Nav>

              <Nav.Link id="Nav-link" as={Link} to={"/login"}>
                Login
              </Nav.Link>
              <Button
                style={{ backgroundColor: "#5f5bcf" }}
                as={Link}
                to={"/register"}
              >
                Register
              </Button>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar >
  );
}

export default Navi;

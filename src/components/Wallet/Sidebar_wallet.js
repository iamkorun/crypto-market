import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Wallet.css";

function Sidebar_wallet() {
  return (
    <div className="sidebar">
      <ul className="sidebarlist">
        <Link
          to={`/me/wallet/${localStorage.getItem("wallet_id")}`}
          id="sidebarlink"
        >
          <li className="sidebar-item">
            <i id="sb-item-icon" class="fa-solid fa-wallet"></i>
            <div id="sidebar-title">Overview</div>
          </li>
        </Link>
        <Link
          to={`/me/pnl/${localStorage.getItem("wallet_id")}`}
          id="sidebarlink"
        >
          <li className="sidebar-item">
            <i id="sb-item-icon" class="fa-solid fa-percent"></i>
            <div id="sidebar-title">PNL</div>
          </li>
        </Link>

        <Link
          to={`/me/transaction/${localStorage.getItem("wallet_id")}`}
          id="sidebarlink"
        >
          <li className="sidebar-item">
            <i id="sb-item-icon" class="fa-solid fa-magnifying-glass-chart"></i>
            <div id="sidebar-title">Transaction</div>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar_wallet;

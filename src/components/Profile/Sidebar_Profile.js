import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";



import "../Wallet/Wallet.css";

function Sidebar_Profile() {
    return (
        <div className="sidebar font-link" >
            <ul className="sidebarlist">
                <Link to={`/profile`} id="sidebarlink">
                    <li className="sidebar-item" >
                        <i id="sb-item-icon" class="fa-solid fa-user"></i><div id="sidebar-title">Profile</div>
                    </li>
                </Link>
                <Link to="/profile/allwallet" id="sidebarlink">
                    <li className="sidebar-item">
                        <i id="sb-item-icon" class="fa-solid fa-chart-column"></i><div id="sidebar-title">Comulative Wallet</div>
                    </li>
                </Link>
                
            </ul>
        </div>
    );
};

export default Sidebar_Profile;
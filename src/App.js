import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Trade from "./components/Trade/Trade";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Markets from "./components/Markets";
import CreateWallet from "./components/Wallet/CreateWallet";
import Cryptocurrency from "./components/Cryptocurrency";
import Search from "./components/Search";
import Testui from "./components/Testui";
import Nav from "./Navi";
import WalletList from "./components/Wallet/WalletList";
import WalletDetails from "./components/Wallet/WalletDetails";
import Profile from "./components/Profile/Profile";
import LineNotify from "./components/Profile/LineNoti";
import PnlDetails from "./components/Wallet/PnlDetails";
import TransactionHistory from "./components/Wallet/TransactionHistory";
import TransactionDetails from "./components/Wallet/TransactionDetails";
import AllWalletChart from "./components/Profile/AllWalletChart";
import Leaderboard from "./components/Leaderboard";
import Tutorial from "./components/Tutorial";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <body className="App-Body">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<Navigate to="/cryptocurrency/1" />}
            ></Route>
            <Route path="/cryptocurrency/:page" element={<Cryptocurrency />} />
            <Route
              path="/cryptocurrency"
              element={<Navigate to="/cryptocurrency/1" />}
            ></Route>
            <Route path="/me/wallet" element={<WalletList />} />
            <Route path="/me/wallet/:id" element={<WalletDetails />} />
            <Route path="/me/pnl/:id" element={<PnlDetails />} />
            <Route path="/me/transaction/:id" element={<TransactionHistory />} />
            <Route path="/me/transaction/details/:id" element={<TransactionDetails />} />
            <Route path="/wallet/create" element={<CreateWallet />} />
            <Route path="/trade/:pair" element={<Trade />} />
            <Route path="/trade/markets" element={<Markets />} />
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profile/allwallet" element={<AllWalletChart />}></Route>
            <Route path="/profile/line" element={<LineNotify />}></Route>
            <Route path="/tutorial" element={<Tutorial />}></Route>
            <Route path="/Testui" element={<Testui />}></Route>
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;

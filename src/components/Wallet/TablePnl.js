import { formatCurrency } from "@coingecko/cryptoformat";
import Moment from "moment";

import dayjs from "dayjs";


export const TablePnl = (props) => {

  return (
    <tbody>
      <tr>
        <td>{dayjs(props.data.day).format('MM/DD/YYYY')}</td>
        <td>{formatCurrency(props.data.totalBalance, "USD", "en")}</td>
        <td>{formatCurrency(props.data.dailyProfitLoss, "USD", "en")}</td>
        <td>{formatCurrency(props.data.profit_loss, "USD", "en")}</td>
        <td>{parseFloat(props.data.dailyProfitLossPercent).toFixed(2)} %</td>
        <td>{parseFloat(props.data.dailyPNL).toFixed(2)} %</td>
      </tr>
    </tbody>
  );
};

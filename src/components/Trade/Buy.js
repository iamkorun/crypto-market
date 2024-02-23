import Slider from "@mui/material/Slider";
import "./Buy.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { formatCurrency } from "@coingecko/cryptoformat";

export const LimitBuy = (props) => {
  const [price, setPrice] = useState(props.ticker);

  return (
    <div>
      <h4>{props.pair.split("_")[0] + "/" + props.pair.split("_")[1]}</h4>
      <p><h5>{props.ticker}</h5></p>
      <p>
      <hr/>
        <h4>Available</h4>
        <h5>{formatCurrency(props.balance,"USD", "en").split("$")[1]} {props.pair.split("_")[1]}</h5>
      </p>
      <form onSubmit={props.onSubmit}>
        <div className="priceField">
          <TextField
            required
            autoFocus
            onFocus={props.onFocus}
            id="pricevalue"
            label="Price"
            variant="outlined"
            sx={{ width: "35ch" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {props.pair.split("_")[1]}
                </InputAdornment>
              ),
              inputProps: { inputMode: 'numeric', pattern: '[0-9.]*' },
            }}
            defaultValue={props.ticker}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            onInput={props.onInput}
          />
        </div>
        <Slider
          style={{ color: "#4D47C3" }}
          aria-label="Amount"
          defaultValue={0}
          getAriaValueText={props.valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={props.marks}
          min={0}
          max={100}
        />
        <p>
        <h6>Amount {props.amount} {props.symbol}</h6>
        </p>
        <hr/>
        <br/>
        <h5>Total {formatCurrency(props.total,"USD", "en").split("$")[1]} {props.pair.split("_")[1]}</h5>
        <input className="buybutton" type="submit" value="Confirm BUY" />
      </form>
    </div>
  );
};

export const MarketBuy = (props) => {
  return (
    <div>
      <h4>{props.pair.split("_")[0] + "/" + props.pair.split("_")[1]}</h4>
      <p><h5>{props.ticker}</h5></p>
      <p>
      <hr/>
        <h4>Available</h4>
        <h5> {formatCurrency(props.balance,"USD", "en").split("$")[1]} {props.pair.split("_")[1]}</h5>
      </p>
      <form onSubmit={props.onSubmit}>
        <Slider
          style={{ color: "#4D47C3" }}
          aria-label="Amount"
          defaultValue={0}
          getAriaValueText={props.valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={props.marks}
          min={0}
          max={100}
        />
        <p>
        <h6>Amount {props.amount} {props.symbol}</h6>
        </p>
        <hr/>
        <br/>
        <h5>Total {formatCurrency(props.total,"USD", "en").split("$")[1]} {props.pair.split("_")[1]}</h5>
        <input className="buybutton" type="submit" value="Confirm BUY" />
      </form>
    </div>
  );
};

export const StlBuy = (props) => {
  return <div></div>;
};

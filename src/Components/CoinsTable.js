import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import {useNavigate} from "react-router-dom";
import { TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const useStyles = makeStyles({
    tableCell: {
        padding: 0,
        border: 'none'
    }
});

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const classes = useStyles()
    const fetchCoins = async () => {
        setLoading(true)

        const { data } = await axios.get(CoinList('USD'));
        console.log('data:', data)
        setCoins(data)
        console.log('coins!!!: ', coins)
        setLoading(false)
    };
    useEffect(() => {
        // eslint-disable-next-line
        fetchCoins();
        // eslint-disable-next-line
    }, []);

    const handleSearch = () => {
        console.log('coins? : ', coins)
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    };

    const navigate = useNavigate()

    return (
        <>
                <input    
                type='search'
                    placeholder='Search For a Crypto Currency..'
                    variant="outlined"
                    style={{ backgroundColor: 'transparent', color: 'white', marginBottom: '.5rem', width: "80%" }}
                    onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}>
                </input>
            <div>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                        <table style={{textIndent: 'none', borderSpacing: 0}}>
                            <thead>
                            <tr>
                                {["Coin", "Price", "24h-Chg", "M Cap (M)"].map((head) => (
                                    <td
                                    className={classes.tableCell}
                                        key={head}
                                        align={head === "Coin" ? "center" : "center"}
                                        style={{maxWidth: '25%'}}
                                    >
                                        {head}
                                    </td>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {
                            handleSearch()
                            .map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return (
                                    <tr
                                        onClick={() => navigate(`/coin/${row.id}`)}
                                        style={{height: '3rem', marginTop: '5rem !important'}}
                                    >
                                        <td
                                        className={classes.tableCell} align='center' width='100px'>
                                            <img src={row.image} width="30%" height="20%" />
                                            {row.symbol.length > 5 ? (
                                                <div style={{fontSize: '.75rem'}}>
                                                {row.symbol.toUpperCase()}
                                                </div>
                                            ) : (
                                                <div>
                                                {row.symbol.toUpperCase()}
                                                </div>
                                            )}
                                        </td>
                                        <td
                                        className={classes.tableCell} align='right'>
                                            {row.current_price > 999.99 ? (
                                                numberWithCommas(row.current_price.toFixed(0))
                                            ) : (
                                                row.current_price.toFixed(2)
                                            )}
                                        </td>
                                        <td
                                        className={classes.tableCell} align='center' style={{color: profit > 0 ? 'rgb(14, 203, 129' : 'red'}}>
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%</td>
                                        <td
                                        className={classes.tableCell} align='right'>{numberWithCommas(row.market_cap.toString())}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        </>
                    )
                }
            </div>
        </>
    );
}

export default CoinsTable;

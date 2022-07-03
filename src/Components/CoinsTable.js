import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import {useNavigate} from "react-router-dom";

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [search, setSearch] = useState("")

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

    // const handleSearch = () => {
    //     return coins.filter((coin) => (
    //         coin.name.toLowerCase().includes(search) ||
    //         coin.symbol.toLowerCase().includes(search)
    //     ))
    // };

    const navigate = useNavigate()

    return (
        <>
            <div>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                        <table>
                            <thead>
                            <tr>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <td
                                        key={head}
                                        align={head === "Coin" ? "" : "center"}
                                    >
                                        {head}
                                    </td>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {coins.map((row) => {
                                // const profit = row.price_change_percentage_24h > 0;
                                return (
                                    <tr
                                        onClick={() => navigate(`/coin/${row.id}`)}
                                    >
                                        <td>{row.name}</td>
                                        <td>{row.current_price}</td>
                                        <td>{row.price_change_percentage_24h}</td>
                                        <td>{row.market_cap.toString().slice(0, -6)}</td>
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

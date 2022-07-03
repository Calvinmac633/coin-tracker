import React, { useEffect, useState } from 'react';
// import {CryptoState} from "../CryptoContext";
import {SingleCoin} from "../config/api";
import axios from "axios";

const Coinpage = () => {
    const url = window.location.href;
    const id = url.split('/').slice(-1)[0]
    const [coin, setCoin] = useState();

    // const { currency, symbol } = CryptoState();
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        console.log('dataa: ', data)
        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!coin) return <div>Loading...</div>;

    return (
        <div>
            {coin.name}
        </div>
    );
}

export default Coinpage;

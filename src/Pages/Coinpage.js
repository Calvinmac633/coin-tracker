import React, { useEffect, useState } from 'react';
// import {CryptoState} from "../CryptoContext";
import {SingleCoin} from "../config/api";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import CoinInfo from '../Components/CoinInfo';

const useStyles = makeStyles({
    leftColumnCell: {
        display: 'flex 1 1 auto',
        flexDirection: 'row',
        borderBottom: 'solid 1px white',
        // borderTop: 'solid 1px white',
        padding: '.25rem',
        width: '50%'
    },
    rightColumnCell: {
        borderBottom: 'solid 1px white',
        // borderTop: 'solid 1px white',
        padding: '.25rem',
        borderLeft: 'solid 1px white',
        width: '50%'
    }
})

const Coinpage = () => {
    const url = window.location.href;
    const id = url.split('/').slice(-1)[0]
    const [coin, setCoin] = useState();
    const classes = useStyles()

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

    console.log('--- COIN --- ', coin)

    return (
        <div>
                <Container padding='0' maxWidth="sm">
                <Box sx={{ backgroundColor: '#ffffff', maxWidth: '100vh' }}>
                    <h1 style={{textAlign:'center'}}>{coin.name}</h1>
                    <div style={{display: 'flex', verticalAlign: 'center'}}>
                        <span>
                            <img src={coin.image.small}/>
                        </span>
                        <span style={{fontSize: '3rem'}}>
                            ${coin.market_data.current_price.usd.toLocaleString()}
                        </span>

                    </div>
                    <table style={{borderTop: 'solid 1px white'}}>
                        <tbody>
                        <tr>
                            <td className={classes.leftColumnCell}>
                                <span>market cap:</span>
                                <span> ${(coin.market_data.market_cap.usd) ? coin.market_data.market_cap.usd.toLocaleString() : coin.market_data.market_cap.usd}</span>
                            </td>
                            <td className={classes.rightColumnCell}>circ. supply: {coin.market_data.circulating_supply ? coin.market_data.circulating_supply.toLocaleString() : coin.market_data.circulating_supply}</td>
                        </tr>
                        <tr>
                            <td className={classes.leftColumnCell}>full dilu. value: ${coin.market_data.fully_diluted_valuation.usd ? coin.market_data.fully_diluted_valuation.usd.toLocaleString() : coin.market_data.fully_diluted_valuation.usd}</td>
                            <td className={classes.rightColumnCell}>total supply: {coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : coin.market_data.total_supply}</td>
                        </tr>
                        </tbody>
                    </table>
                </Box>
            </Container>
            <CoinInfo coin={coin} />
        </div>
    );
}

export default Coinpage;

import React, { useEffect, useState } from 'react';
// import {CryptoState} from "../CryptoContext";
import {SingleCoin} from "../config/api";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import CoinInfo from '../Components/CoinInfo';
import ReactHtmlParser from 'react-html-parser'

const useStyles = makeStyles({
    columnCell: {
        display: 'flex 1 1 auto',
        flexDirection: 'row',
        borderBottom: 'solid 1px rgb(255,255,255,.3)',
        padding: '.25rem',
        width: '50%'
    },
})

const Coinpage = () => {
    const url = window.location.href;
    const id = url.split('/').slice(-1)[0]
    const [coin, setCoin] = useState();
    const classes = useStyles()

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

    // const high_24h_percent = (((coin.market_data.high_24h.usd/coin.market_data.current_price.usd)-1)*100).toLocaleString();
    // const low_24h_percent = (((coin.market_data.low_24h.usd/coin.market_data.current_price.usd)-1)*100).toLocaleString();
    // const ath_percent = (((coin.market_data.ath.usd/coin.market_data.current_price.usd)-1)*100).toLocaleString();
    // const atl_percent = (((coin.market_data.atl.usd/coin.market_data.current_price.usd)-1)*100).toLocaleString();

    const high_24h_percent = (((coin.market_data.current_price.usd/coin.market_data.high_24h.usd)-1)*100)
    const low_24h_percent = (((coin.market_data.current_price.usd/coin.market_data.low_24h.usd)-1)*100)
    const ath_percent = (((coin.market_data.current_price.usd/coin.market_data.ath.usd)-1)*100)
    const atl_percent = (((coin.market_data.current_price.usd/coin.market_data.atl.usd)-1)*100)

    console.log('ath_percent: ', ath_percent)
    console.log('atl_percent: ', atl_percent)

    console.log(atl_percent > 0)

    return (
        <div>
                <Container padding='0' maxWidth="sm">
                <Box sx={{ backgroundColor: 'transparent', maxWidth: '100vh' }}>
                    <h1 style={{textAlign:'center', margin: '10px 0px 10px 0px'}}>{coin.name}</h1>
                    <div style={{display: 'flex', verticalAlign: 'center'}}>
                        <span>
                            {/* eslint-disable-next-line */}
                            <img src={coin.image.small}/>
                        </span>
                        <span style={{fontSize: '3rem'}}>
                            ${coin.market_data.current_price.usd.toLocaleString()}
                        </span>
                    </div>
                    <table style={{borderTop: 'solid 1px white'}}>
                        <tbody>
                        <tr>
                            <td className={classes.columnCell}>
                                <span>market cap: <b>${(coin.market_data.market_cap.usd) ? coin.market_data.market_cap.usd.toLocaleString() : coin.market_data.market_cap.usd}</b></span>
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.columnCell}>circ. supply: <b>{coin.market_data.circulating_supply ? coin.market_data.circulating_supply.toLocaleString() : coin.market_data.circulating_supply}</b></td>
                        </tr>

                        {(coin.market_data.total_supply === null) ? (
                            <tr>
                            <td className={classes.columnCell}>total supply: &infin;</td>
                        </tr>
                        ) : (
                             <tr>
                             <td className={classes.columnCell}>total supply: <b>{coin.market_data.total_supply.toLocaleString()}</b></td>
                             </tr>
                        )}
                      
                        {coin.market_data.fully_diluted_valuation.usd ? (
                            <tr>
                                <td className={classes.columnCell}>full dilu. value: <b>${coin.market_data.fully_diluted_valuation.usd ? coin.market_data.fully_diluted_valuation.usd.toLocaleString() : coin.market_data.fully_diluted_valuation.usd}</b></td>
                            </tr>
                        ) : (
                            <></>
                        )}

                        <tr>
                            <td className={classes.columnCell}>
                                <span>24hr high: <b>${coin.market_data.high_24h.usd.toLocaleString()}   </b></span>
                                (<span style={{color: high_24h_percent > 0 ? 'rgb(14, 203, 129)' : '#FF5733'}}>{high_24h_percent.toLocaleString()}</span>)%
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.columnCell}>
                                <span>24hr low: <b>${coin.market_data.low_24h.usd.toLocaleString()}</b> </span>
                                (<span style={{color: low_24h_percent > 0 ? 'rgb(14, 203, 129)' : '#FF5733'}}>{low_24h_percent.toLocaleString()}</span>)%
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.columnCell}>
                                <span>all-time high: <b>${coin.market_data.ath.usd.toLocaleString()}   </b></span>
                                (<span style={{color: ath_percent > 0 ? 'rgb(14, 203, 129)' : '#FF5733'}}>{ath_percent.toLocaleString()}</span>)%
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.columnCell}>
                                <span>all-time low: <b>${coin.market_data.atl.usd.toLocaleString()}   </b> </span>
                                (<span style={{color: atl_percent > 0 ? 'rgb(14, 203, 129)' : '#FF5733'}}>{atl_percent.toLocaleString()}</span>)%
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div>
                        <p style={{textAlign: 'justify'}}>
                            {ReactHtmlParser(coin.description.en.split('. ')[0])}
                        </p>
                    </div>

                </Box>
            </Container>
            <CoinInfo coin={coin} />
        </div>
    );
}

export default Coinpage;

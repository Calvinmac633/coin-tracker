import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import {useNavigate} from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const useStyles = makeStyles({
    tableCell: {
        padding: 0,
        border: 'none',
    },
    tablePaper: {
        color: 'white !important',
        // backgroundColor: '#4e91e2 !important', //lighter
        backgroundColor: 'transparent !important', //lighter
        // maxWidth: '6vw',
        // minWidth: '1vw'
    },
    tableContainer: {
        // padding: '0 .75rem 0 .75rem',
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
         <Box sx={{ width: '75%', minWidth: '360px', maxWidth: '600px'}} style={{margin: 'auto'}}>
            <Paper style={{ textAlign: 'center'}} className={classes.tablePaper} elevation={10} sx={{ width: '100%', mb: 2 }}>
            <div>
                {
                    
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                             <Input    
                                className={classes.input}
                                style={{
                                    color: 'white',
                                    width: '100%',
                                    border:' 1px solid grey',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    fontFamily: 'Cutive Mono',
                                    fontWeight: '400',
                                    lineHeight: '.5',
                                    padding: '0px 12px 0px 12px',
                                    marginBottom: '12px'
                                }}
                                    type='text'
                                    placeholder='Search For a Crypto Currency..'
                                    variant="outlined"
                                    onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}>
                            </Input>
                            <TableContainer className={classes.tableContainer}>
                        <Table style={{textIndent: 'none', borderSpacing: 0}}>
                            <TableHead>
                            <TableRow>
                                {["Coin", "Price", "24h-Chg", "M Cap (M)"].map((head) => (
                                    <TableCell
                                    className={classes.tableCell}
                                        key={head}
                                        align={head === "Coin" ? "center" : "center"}
                                        style={{maxWidth: '25%', color: 'whitesmoke', fontFamily: 'Cutive Mono', fontWeight: 500, fontSize: '.9rem'}}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                            handleSearch()
                            .map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return (
                                    <TableRow
                                        onClick={() => navigate(`/coin/${row.id}`)}
                                        style={{height: '3rem', marginTop: '5rem !important'}}
                                    >
                                        <TableCell
                                        className={classes.tableCell} align='center' style={{fontFamily: 'cutive mono', fontWeight: 500, color: 'whitesmoke', padding: '.25rem 0 .1rem 0'}} width='50px'>
                                             {/* eslint-disable-next-line */}
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
                                        </TableCell>
                                        <TableCell
                                        className={classes.tableCell} align='center' style={{color: 'whitesmoke', fontFamily: 'Cutive Mono', fontWeight: 500, padding: '.5rem'}}>
                                            {row.current_price > 999.99 ? (
                                               '$' + numberWithCommas(row.current_price.toFixed(0))
                                            ) : (
                                                '$' + row.current_price.toFixed(2)
                                            )}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell} 
                                            align='center' 
                                            style={{color: profit > 0 ? 'rgb(14, 203, 129' : 'red', fontFamily: 'Cutive Mono', fontWeight: 500, padding: '.5rem'}}
                                        >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%</TableCell>
                                        <TableCell
                                            style={{color: 'whitesmoke', fontFamily: 'Cutive Mono', fontWeight: 500, padding: '.5rem'}} 
                                            className={classes.tableCell} 
                                            align='right'>${numberWithCommas(row.market_cap.toString().slice(0,-3))}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </>
                    )
                }
            </div>
            </Paper>
        </Box>
           
        
        </>
    );
}

export default CoinsTable;

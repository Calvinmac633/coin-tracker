import React, {useState, useEffect} from 'react';
import {makeStyles, CircularProgress} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import SelectButton from "./SelectButton";
import axios from 'axios';
import { HistoricalChart } from '../config/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const useStyles = makeStyles((theme) => ({
    container: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: 40,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: 0,
            padding: 1,
            paddingTop: 0,
            // height: '5rem'
            height: '30rem',
            margin: 'auto'
        }
    }
}))


const CoinInfo = ({ coin }) => {
    const classes = useStyles();

// const useStyles = makeStyles((theme) => ({
//     const useStyles = makeStyles({
//         container: {
//
//         }
//         //     container: {
//         //         width: '75%',
//         //         display: 'flex',
//         //         flexDirection: 'column',
//         //         justifyContent: 'center',
//         //         alignItems: 'center',
//         //         marginTop: 25,
//         //         padding: 40,
//         //         // [theme.breakpoints.down('md')]: {
//         //         //     width: '100%',
//         //         //     marginTop: 0,
//         //         //     padding: 20,
//         //         //     paddingTop: 0
//         //         // }
//         //     }
//     })
// //
//     const classes = useStyles();

    console.log('-------------------------')
    console.log('COIN brother: ', coin)
    console.log('-------------------------')
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    //Todo: set this up
    // const { currency } = CryptoState();
    // const [flag, setflag] = useState(false);

    const currency = 'USD'

    const fetchHistoricalData = async () => {
        console.log('days????: ', days)
        const { data } = await axios.get(HistoricalChart(coin.id, days, 'USD'));
        console.log('dataa: ', data)
        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricalData();
           // eslint-disable-next-line
    }, [currency, days])

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        // {
        //     label: "3 Months",
        //     value: 90,
        // },
        {
            label: "1 Year",
            value: 365,
        },
        {
            label: '5 Years',
            value: (365*5)
        }
    ];


    //
    console.log('historicData: ', historicData)

    return (
            <div className={classes.container}>
                {
                    (!historicData) ? (
                        <CircularProgress
                            style={{ color: 'gold' }}
                            size={250}
                            thickness={1}
                        />
                        // <div>yes</div>
                    ) : (
                        <>
                            <Line
                                height={300}
                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time =
                                            date.getHours() > 12
                                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                : `${date.getHours()}:${date.getMinutes()} AM`

                                        return days === 1 ? time : date.toLocaleDateString()
                                    }),
                                
                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: `Price (Past ${days} Days) in ${currency}`,
                                            borderColor: '#FFFFFF',
                                            display: false
                                        },
                                    ]
                                }}

                                options={{
                                    maintainAspectRatio: true,
                                    scales: {
                                        x: {
                                            ticks: {
                                                color: 'lightgrey'
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                color: 'lightgrey'
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: 'white',
                                                // This more specific font property overrides the global property
                                                font: {
                                                    size: 14,
                                                    family: 'Cutive Mono',
                                                    weight: 900,
                                                }
                                            }
                                        }
                                    },
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
                            }}/>
                            <div style={{
                                display: 'flex',
                                marginTop: 10,
                                justifyContent: 'space-around',
                                width: '100%'
                            }}>
                                {chartDays.map((day) => (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => setDays(day.value)}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
    );
}

export default CoinInfo;

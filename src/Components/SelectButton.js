import React from 'react';
import {makeStyles} from "@material-ui/core";


const SelectButton = ({ children, selected, onClick }) => {

    // const useStyles = makeStyles({
    //     selectButton: {
    //         border: '1px solid white',
    //         borderRadius: 5,
    //         padding: 10,
    //         paddingLeft: 20,
    //         fontFamily: 'Cutive Mono',
    //         cursor: 'pointer',
    //         backgroundColor: selected ? '#03b3d2' : '',
    //         color: selected ? 'black' : '',
    //         fontWeight: selected ? 700 : 500,
    //         '&hover': {
    //             backgroundColor: '#03b3d2',
    //             color: 'black'
    //         },
    //         width: '22%'
    //     }
    // })
    // const classes = useStyles();


    return (
        <span
            onClick={onClick}
            // className={classes.selectButton}
            style={{
                border: '1px solid white',
                margin: '.33rem',
                borderRadius: 5,
                padding: 10,
                paddingLeft: 20,
                fontFamily: 'Cutive Mono',
                cursor: 'pointer',
                backgroundColor: selected ? '#03b3d2' : '',
                color: selected ? 'black' : '',
                fontWeight: selected ? 700 : 500,
                '&hover': {
                    backgroundColor: '#03b3d2',
                    color: 'black'
                },
                width: '15%'
            }}
        >
            {children}
        </span>
    )
};

export default SelectButton

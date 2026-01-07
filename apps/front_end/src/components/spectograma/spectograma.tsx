import React from 'react';
import SweepingHeatmap from '../SweepingHeatmap';
import InfoSpect from './infoSpect';
import { Button } from '@mui/material';
import { useStyles } from './SpectogramaStyles';


const Spectograma = () => {

    const { classes } = useStyles();

  return (
   <div className={classes.main}>
        <div className={classes.resultsBox}>
            <div className={classes.img}>
                <h3>Parameters</h3>
                <h4>Upload File</h4>
                <img></img>
                <div>
                    <h4>SIZE</h4>
                    <h4>STATUS</h4>
                </div>
            </div>
            <div className={classes.img}>
                <h4>EVASION LATENCY:</h4>
            </div>
            <div className={classes.img}>
                <h4>PEAK FREQ:</h4>
            </div>
        </div>
        
        <div className={classes.spectrogramContainer}>
            <div className={classes.detailsBox}>
                <InfoSpect title="CENTR  FREQ" unitsOfMeasure="MHZ" value={2450}/>
                <InfoSpect title="SPAN" unitsOfMeasure="MHZ" value={100}/>
                <InfoSpect title="THRESHOLD" unitsOfMeasure="dBm" value={-120}/>
                <Button>APPLY CONFIG</Button>
            </div>
            <SweepingHeatmap/>
        </div>
   </div>
  );
};

export default Spectograma;
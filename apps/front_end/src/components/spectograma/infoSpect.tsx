import React from 'react';
import { useStyles } from './infoSpectStyles';

interface Details{
    title: string,
    unitsOfMeasure: string,
    value: number
}
const InfoSpect: React.FC<Details> = ({title, unitsOfMeasure, value}) => {

    const { classes } = useStyles();

  return (
    <div className={classes.details}>
        <h3>{title}:</h3>
        <div className={classes.unitsOfMeasure}>
            <div>{value}</div>
            <div>{unitsOfMeasure}</div>
        </div>
    </div>
  );
};

export default InfoSpect;
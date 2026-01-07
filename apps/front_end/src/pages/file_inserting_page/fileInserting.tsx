import { Button, Typography } from "@mui/material";
import useStyles from "./fileInsertingStyles";
import { useState } from "react";

const FileInserting: React.FC = () => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(prev => !prev);
    };

    const {classes} = useStyles();
    return (
        <div className={classes.wholeRectangle}>
            <div className={classes.titlesContainer}>
                <Typography variant="h3">CoSpec</Typography>
                <Typography variant="h6">Coexistence Spectrum</Typography>
            </div>
            <div className={classes.insideRectangleContainer}>
                <div className={classes.miniContainer}>
                    <Typography variant="h6">COGNITIVE MODE</Typography>
                    <div className={classes.choosingCognitiveMode} onClick={handleClick}>
                        <img className={classes.brainImg} src="../src/assets/brain_image.png" width="40px" height="40px"/>           
                        <Typography className={classes.cognitiveModeText}>COGNITIVE MODE: {isOn ? "ON" : "OFF"}</Typography>
                        <div className={classes.redCircle}></div>
                    </div>
                </div>
                <div className={classes.miniContainer}>
                    <Typography variant="h3">sec</Typography>
                    <Typography variant="h3">side</Typography>
                </div>
            </div>
        </div>
    )
};

export default FileInserting;
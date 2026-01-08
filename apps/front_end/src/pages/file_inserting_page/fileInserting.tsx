import { Button, Typography } from "@mui/material";
import useStyles from "./fileInsertingStyles";
import { useState } from "react";
import { FileUpload } from "../../components/FileUpload";

const FileInserting: React.FC = () => {
    const [isOn, setIsOn] = useState(false);


    const handleClick = () => {
        setIsOn(prev => !prev);
    };

    const { classes, cx } = useStyles();
    return (
        <div className={classes.wholePage}>
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
                            <Typography className={classes.cognitiveModeText}>COGNITIVE MODE: <br/>{isOn ? "ON" : "OFF"}</Typography>
                            <div className={classes.redCircle} style={{ backgroundColor: isOn ? "green" : "red" }}></div>
                        </div>
                        <Typography variant="h6">COGNITIVE MODE: {isOn ? "Automatically adapts to interference" : "Manual frequency selections only. Autonomous hopping disabled"}</Typography>
                    </div>
                    <div className={cx(classes.miniContainer, classes.fileMiniContainer)}>
                        <Typography variant="h3">file inserting</Typography>
                        <FileUpload/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FileInserting;
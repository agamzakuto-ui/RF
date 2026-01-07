import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    wholeRectangle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(ellipse at center, #1e3a5f 0%, #0f1f3d 50%, #0a1628 100%)",
        padding: "20px",
        color: "white",
        flexDirection: "column"
    },
    titlesContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    insideRectangleContainer: {
        display: "flex",
    },
    miniContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "20px"
    },
    choosingCognitiveMode: {
    display: "flex",
    alignItems: "center",      // vertically center items
    justifyContent: "space-between", // distribute space
    border: "solid 3.5px rgba(91, 91, 91, 1)",
    cursor: "pointer",
    padding: "10px",
    width: "250px",             // make it wider so text + circle fits
    borderRadius: "70px",
},
    cognitiveModeText: {
        padding: "10px",
    },
    redCircle: {
        width: "80px",
        height: "60px",
        backgroundColor: "red",
        borderRadius: "50%",
        display: "inline-block", // make sure it takes space
    },

    
}));

export default useStyles;
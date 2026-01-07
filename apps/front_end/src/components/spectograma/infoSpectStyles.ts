import { makeStyles } from "tss-react/mui";


const useStyles = makeStyles()({
    details:{
        display: 'flex',
        flexDirection: 'column',
        margin: '1%',
        width: '20%',
    },
    unitsOfMeasure:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    
})

export { useStyles };
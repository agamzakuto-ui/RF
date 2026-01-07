import { makeStyles } from "tss-react/mui";


const useStyles = makeStyles()({
    main:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%',
        backgroundColor: 'aqua',
        margin: '2%',
    },
    spectrogramContainer:{
        width: '50%',
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsBox:{
        height: '20%',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resultsBox:{
        width: '50%',
        height: '70%',
        display: 'flex',        
        flexDirection: 'column',
    },
    img:{
        width: '100%',
        height: '30%',
        display: 'flex',        
        flexDirection: 'column',
    }
    
})

export { useStyles };
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=> ({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    box:{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    paper:{
        margin: theme.spacing(0, 3, 0, 3),
        padding: theme.spacing(5),
    },

    title:{
        marginBottom: theme.spacing(5)
    }

}))

export default useStyles;
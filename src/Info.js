import './App.css';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        margin: '20px',
        width: '60ch',
        maxWidth: 300,
    },
});

function Info(props) {
    const classes = useStyles();
    return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.country} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            New Cases: {props.cases} <br></br>
                            Cases: {props.totalCases} <br></br>
                            Deaths: {props.deaths}
          </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
    )
}

export default Info;
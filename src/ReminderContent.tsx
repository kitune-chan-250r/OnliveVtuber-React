import React, {Fragment, useEffect, useState, useMemo} from 'react';
import Iframe from 'react-iframe';
import { Grid } from '@material-ui/core';
import './css/main.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { createTheme, useTheme } from '@material-ui/core/styles';

interface Props {
    uid: string,
    liver_name: string,
    production: string,
    gender: string,
    start_time: string,
    live_title: string,
    live_url: string,
    audience: string,
}

export const ReminderContent = (props: Props) => {
    const classes = useTheme();
    var temp = props.live_url.toString();
    temp = temp.toString().replace("https://www.youtube.com/watch?v=", "");
    var src = "https://www.youtube.com/embed/" + temp;

    //13桁のunixtimeを比較
    const calcDispTime = ():string => {
        var will_start = Number(props.start_time) * 1000;
        var now = new Date();
        var past = will_start - now.getTime();
        var result = Math.floor( past / 3600000 );
        if(result > 0){
            return "約" + result.toString() + "時間";
        }else{
            var tmp = Math.floor( past / 60000 );
            return "約" + tmp.toString() + "分";
        }
    }

    const drawContent = useMemo(() => {
        return (
           <Card className="card">
                <CardContent className="content" style={{maxWidth: 800}}>
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Iframe
                                url={src}
                                width="352px"
                                height="195px"
                                position="relative"
                                display="inline"
                                frameBorder={0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{maxWidth:350}}>
                            <h5>
                                <a className="livetitle" href={props.live_url} target="_blank">
                                    { props.live_title }
                                    <Chip 
                                        className="livetime"
                                        label={"開始まで"+calcDispTime()}
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Chip 
                                        className="livetime"
                                        label={props.audience+"人待機中"}
                                        size="small"
                                        variant="outlined"
                                    />
                                </a>
                            </h5>
                            <p className="comment">{ props.liver_name } : {props.production} </p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card> 
        )
    }, [props])

    return (
        <Fragment>
            {drawContent}
        </Fragment>
    )
}
export default ReminderContent;
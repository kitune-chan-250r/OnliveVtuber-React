import React, {Fragment, useEffect, useState} from 'react';
import Iframe from 'react-iframe';
import { Grid } from '@material-ui/core';
import './css/main.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

interface Props {
    uid: string,
    liver_name: string,
    production: string,
    gender: string,
    start_time: string,
    live_title: string,
    live_url: string,
}

export const LiveContent = (props: Props) => {
    var temp = props.live_url.toString();
    temp = temp.toString().replace("https://www.youtube.com/watch?v=", "");
    var src = "https://www.youtube.com/embed/" + temp;

    const calcDispTime = ():string => {
        var live_Start = Date.parse(props.start_time);
        var now = Date.now();
        var past = now - live_Start;
        var result = Math.floor( past / 3600000 );
        if(result > 0){
            return "約" + result.toString() + "時間";
        }else{
            var tmp = Math.floor( past / 60000 );
            return "約" + tmp.toString() + "分";
        }
    }

    return (
        <Card className="card">
            <CardContent className="content">
                <Grid container spacing={1}>
                    <Grid item lg={6}>
                        <Iframe
                            url={src}
                            width="352px"
                            height="195px"
                            position="relative"
                            display="inline"
                            frameBorder={0}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <h5>
                            <a className="livetitle" href={props.live_url} target="_blank">
                                { props.live_title }
                                <Chip 
                                    className="livetime"
                                    label={calcDispTime()}
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
}
export default LiveContent;
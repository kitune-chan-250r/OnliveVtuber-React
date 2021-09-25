import React, {Fragment, useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import Logo from './img/logo.png';
import './css/main.css';

//Overlay
export const Banner = () => {


    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <div className="banner" 
                        style={{
                        backgroundColor: 'rgba(166, 165, 173, 0.7)', 
                        position:"fixed", 
                        width:"100%", 
                        height:"40%", 
                        bottom: 2,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        opacity: 0.40,
                    }}
                    >
                        <h1 style={{color: 'black',}}>バカデカバナー</h1>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default Banner;
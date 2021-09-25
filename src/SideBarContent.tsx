import React, {Fragment, useEffect, useState} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Iframe from 'react-iframe';
import { Grid } from '@material-ui/core';
import Logo from './img/logo.png';
import './css/main.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const SideBarContent = () => {
    const [filterItems, setFilterItems] = useState(["ホロライブ", "にじさんじ", "あにまーれ", ".Live", "ハニスト", "Re:Act", "ENTUM", "ホロスターズ"]);

    return (
        <Fragment>


            <Grid container >
                <Grid item xs={3}>
                
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={8}>
                                
                                
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>

                        </Grid>
                
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default SideBarContent;
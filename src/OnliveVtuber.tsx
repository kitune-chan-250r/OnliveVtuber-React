import React, {Fragment, useEffect, useState} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import Logo from './img/logo.png';
import './css/main.css';
import axios from 'axios';
import LiveContent from './LiveContent';
import Banner from './Banner';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//base
export const OnliveVtuber = () => {
    const [liveData, setLiveData] = useState([
        {
            uid:{
                uid: String,
                liver_name: String,
                production: String,
                gender: String
            },
            start_time: String,
            live_title: String,
            live_url: String
        }]);
    const [filter, setFilter] = useState("");
    const [filterItems, setFilterItems] = useState(["ホロライブ", "にじさんじ", "あにまーれ", ".Live", "ハニスト", "Re:Act", "ENTUM", "ホロスターズ"])

    useEffect(() => {
        getLiveData();
    }, [])

    useEffect(() => {
        getLiveData();
    }, [filter])

    const getLiveData = () => {
        axios
            .get('https://vtuber-livestatus-api.herokuapp.com/api/onlive/' + filter, { 
                withCredentials: false
              })
            .then(res => {
                let data = res.data;
                //JSON.parse(res.data)
                setLiveData(data.reverse());
            });

        for(let d of liveData){
            console.log(d.uid.liver_name);
        }
    }

    const handleChange = (event:any) => {
        setFilter(event.target.value);
    };

    return(
        <Fragment>
            <Banner/>
            <Navbar className="nb" sticky='top'>
                <Navbar.Brand className="logo" href="/">
                    <img 
                        src={Logo}
                    />
                </Navbar.Brand>
            </Navbar>
            <Grid container> 
                <Grid item md={3} className="sidebar" id="left">
                    <p></p>
                </Grid>
                
                <Grid item md={6} className="main">
                    {
                        liveData.map(data => {
                            return <LiveContent
                                        uid={data.uid.uid.toString()}
                                        liver_name={data.uid.liver_name.toString()}
                                        production={data.uid.production.toString()}
                                        gender={data.uid.gender.toString()}
                                        start_time={data.start_time.toString()}
                                        live_title={data.live_title.toString()}
                                        live_url={data.live_url.toString()}
                                    />
                        })
                    }
                </Grid>
                
                <Grid item md={3} className="sidebar" id="right" justify='center'>
                    <FormControl 
                        style={{
                            position: 'fixed',
                            top: 90,
                            width: '70%',
                            left: '77%'
                        }} 
                        
                    >
                        <InputLabel id="production-filter-label">Filter</InputLabel>
                        <Select labelId="production-filter-label" id="production-filter" style={{width:'30%'}} onChange={handleChange} value={filter}>
                            <MenuItem value=""><em>Clear</em></MenuItem>
                            {filterItems.map((item) => (
                                <MenuItem key={item} value={"?pr=" + item}>{item}</MenuItem>
                            ))}
                            <MenuItem value="?pr=other">その他/個人勢</MenuItem>
                        </Select>
                    </FormControl>  
                     
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default OnliveVtuber;
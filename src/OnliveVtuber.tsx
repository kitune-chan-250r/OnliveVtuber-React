import React, {Fragment, useEffect, useState} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { colors, Grid } from '@material-ui/core';
import Logo from './img/logo.png';
import './css/main.css';
import axios from 'axios';
import LiveContent from './LiveContent';
import Banner from './Banner';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useMemo } from 'react';
import ReminderContent from './ReminderContent';
import SideBarContent from './SideBarContent';

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
    const [reminderData, setReminderData] = useState([
        {
            uid:{
                uid: String,
                liver_name: String,
                production: String,
                gender: String
            },
            start_datetime: String,
            live_title: String,
            live_url: String,
            audience: String,
        }
    ])
    const [filter, setFilter] = useState("");
    const [toggleContent, setToggleContent] = useState(true);

    useEffect(() => {
        toggleContent ? getLiveData() : getReminderData();
    }, [])

    useEffect(() => {
        toggleContent ? getLiveData() : getReminderData();
    }, [filter, toggleContent])

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
    }

    const getReminderData = () => {
        axios
            .get('https://vtuber-livestatus-api.herokuapp.com/api/reminder/' + filter, { 
                withCredentials: false
            })
            .then(res => {
                let data = res.data;
                //JSON.parse(res.data)
                setReminderData(data.reverse());
            });

        for(let d of reminderData){
            console.log(d.uid.liver_name);
        }
    }

    const setContentFilter = (filter: string) => {
        setFilter(filter);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setFilter(filter);
            toggleContent ? getLiveData() : getReminderData();
        }, 10000);
        return () => {
            clearInterval(timer);
        };
    }, [filter]);

    const drawLive = useMemo(() => {
        return(
            <Fragment>
                {toggleContent ?
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
                    }) :
                    null
                }
            </Fragment>
        )
    }, [liveData, toggleContent, filter])

    const drawReminder = useMemo(() => {
        return (
            <Fragment>
               {!toggleContent ?
                    reminderData.map(data => {
                        return <ReminderContent
                                    uid={data.uid.uid.toString()}
                                    liver_name={data.uid.liver_name.toString()}
                                    production={data.uid.production.toString()}
                                    gender={data.uid.gender.toString()}
                                    start_time={data.start_datetime.toString()}
                                    live_title={data.live_title.toString()}
                                    live_url={data.live_url.toString()}
                                    audience={data.audience.toString()}
                                />
                    }) :
                    null
                }
            </Fragment>
        )
    }, [toggleContent, filter, reminderData])

    return(
        <Fragment>
            {/* <Banner/> */}
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
                    {drawLive}
                    {drawReminder}
                </Grid>
                
                <Grid container item md={3} className="sidebar" id="right" justifyContent="center">
                    {/* <div style={{width:'100%', justifyContent:'center'}}>
                        <Select labelId="production-filter-label" id="production-filter" style={{width:'80%',height:'5%', top:100}} onChange={handleChange} value={filter}>
                            <MenuItem value=""><em>Clear</em></MenuItem>
                            {filterItems.map((item) => (
                                <MenuItem key={item} value={"?pr=" + item}>{item}</MenuItem>
                            ))}
                            <MenuItem value="?pr=other">その他/個人勢</MenuItem>
                        </Select>
                        <div style={{top: 140,}}>
                            <a
                            style={{
                                // position: 'fixed',
                                width: '70%',
                                // height: 20,
                                // left: '82%',
                                color: 'white',
                            }} 
                                onClick={() => setToggleContent(!toggleContent)}
                            >
                                {toggleContent ? "これから放送予定の枠はこちら" : "放送中の枠はこちら"}
                            </a>
                        </div>
                    
                    </div> */}
                    <SideBarContent toggleContent={toggleContent} filter={filter} setContentFilter={setContentFilter} setToggleContent={setToggleContent}/>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default OnliveVtuber;
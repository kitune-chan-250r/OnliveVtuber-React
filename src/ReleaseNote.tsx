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
export const ReleaseNote = () => {

}

export default ReleaseNote;
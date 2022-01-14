import React, {Fragment, useEffect, useState} from 'react';
import { Box, Grid } from '@material-ui/core';
import './css/main.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface Props {
    toggleContent: boolean,
    filter: string,
    setContentFilter: (filter: string) => void,
    setToggleContent: (content: boolean) => void,
}

export const SideBarContent = (props : Props) => {
    const [filterItems, setFilterItems] = useState(["ホロライブ", "にじさんじ", "あにまーれ", ".Live", "ハニスト", "Re:Act", "ENTUM", "ホロスターズ"]);

    const handleChange = (event:any) => {
        props.setContentFilter(event.target.value);
    };

    return (
        <Fragment>
            <Box
                sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}
            >

            
                <Grid 
                    container
                    direction="column"
                    alignItems="center"
                    spacing={4}
                    style={{
                        margin: 0,
                    }}
                >
                    <Grid xs={1}>

                    </Grid>
                    <Grid container item justifyContent="center" >
                        <Select 
                            labelId="production-filter-label" 
                            className="production-filter" 
                            id="production-filter" 
                            style={{width:'80%', textAlign:'center'}} 
                            onChange={handleChange} 
                            value={props.filter}
                            MenuProps={MenuProps}
                            
                        >
                            <MenuItem value=""><em>Clear</em></MenuItem>
                            {filterItems.map((item) => (
                                <MenuItem key={item} value={"?pr=" + item}>{item}</MenuItem>
                            ))}
                            <MenuItem value="?pr=etc">その他/個人勢</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item >
                        <div>
                            <a
                                style={{
                                    width: '70%',
                                    color: 'white',
                                }} 
                                onClick={() => props.setToggleContent(!props.toggleContent)}
                            >
                                {props.toggleContent ? "これから放送予定の枠はこちら" : "放送中の枠はこちら"}
                            </a>
                        </div>
                    
                    </Grid>
                    
                </Grid>
            </Box>
        </Fragment>
    )
}
export default SideBarContent;
import * as React from 'react';
import { Grid, Box, Typography } from "@mui/material";
import Loading from '../images/loading.gif';
import "../css/projects.css"

function Entry({title, details}) {

    return (

        <Box id='entry-container' sx={{padding: 2}}>
            <Grid container spacing={4} alignItems="center">

                <Grid item xs={12} sm={4} md={3} id='loading-img'>
                    <img src={Loading} alt="loading gif" style={{ maxWidth: '100%' }} id='loading'/>
                </Grid>

                <Grid item xs={12} sm={8} md={9} id='project-text'>
                    <Typography variant="h4" id="project-title" gutterBottom>
                        {title}
                    </Typography>
                    <Typography id="project-details">
                        {details}
                    </Typography>
                </Grid>

            </Grid>
        </Box>

    );

}

export default Entry;
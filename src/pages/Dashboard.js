import { Box, Grid, Typography } from "@mui/material";
import {motion} from 'framer-motion';

export default function Dashboard() {

    return (
        <Box class="dashboard-container">
            <Grid container spacing={4} id="dashboard-grid">
                {/* Mini Cards for displaying total # of projects, skills, etc. */}
                <Grid item xs={6} sm={4}>

                </Grid>
                <Grid item xs={6} sm={4}>

                </Grid>
                <Grid item xs={6} sm={4}>

                </Grid>

                {/* Graph interface for visual representation of career progress*/}
                <Grid item xs={12} sm={12} id="dashboard-graph">

                </Grid>

                {/* Graph interface for visual representation of career progress*/}
                <Grid item xs={12} sm={4}>

                </Grid>
                <Grid item xs={12} sm={4}>
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    
                </Grid>
            </Grid>
        </Box>
    );

}
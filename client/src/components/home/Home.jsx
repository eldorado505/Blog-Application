import Banner from "../banner/Banner";
import { Grid } from '@mui/material';
import Categories from "./Categories"
import Posts from "../posts/Posts"
// Any screen is divided into 12 segments 
function Home() {
    return (
        <div>
            <Banner />
            <Grid container>
                
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
            </Grid>
        </div>
    )
}
export default Home;
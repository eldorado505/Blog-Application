import { useEffect, useState } from 'react';
import {apiCall} from "../../service/api.js"
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';


//components
import Post from './Post';

const  Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            try {
                console.log({ url: '/posts', method: 'GET', param:(category || '')})
                let response = await apiCall({ url: '/posts', method: 'GET', param:(category || '')});
                if (response.isSuccess) {
                    getPosts(response.data);
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        console.log("fetching..")
        fetchData();
    }, [category]);

    return (
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/details/${post._id}`}>
                            <Post key={post._id} post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    )
}

export default Posts;
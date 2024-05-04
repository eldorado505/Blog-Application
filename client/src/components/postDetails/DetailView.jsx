import { useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { apiCall } from '../../service/api';
import Comments from '../commentSection/Comments'

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = (props) => {
    const navigate = useNavigate();
    console.log("DetailView")
    const account = props.user
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});

    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching post by id")
            let response = await apiCall({ url: '/getPostById/'+id, method: 'GET'});
            try{
                if (response.isSuccess) {
                    setPost(response.data);
                    console.log(account.username, response.data.username)
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const deleteBlog = async() => {
        try {
            const response = await apiCall({ url: '/deletePostById/'+id, method: 'DELETE' })
            navigate("/home")
        }
        catch(error) {
            console.log(error)
        }
        

    }

    

    return (
        <Container>
            <Image src={url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username == post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} user = {account} />
        </Container>
    )
}

export default DetailView;
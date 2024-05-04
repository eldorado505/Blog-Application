import { useState, useEffect } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';



//components
import Comment from './Comment';
import { apiCall } from '../../service/api';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = (props) => {
    var post = props.post
    var account = props.user
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try{
                const response = await apiCall({ url: '/comments/'+post._id, method: 'GET' });
                if (response.isSuccess) {
                    setComments(response.data);
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        try {
            await apiCall({ url: '/comment/', method: 'POST' }, comment);
        }
        catch(error) {
            console.log(error)
        }
        
        setComment(initialValue)
        setToggle(!toggle);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} user={account} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;
import React, { useState} from 'react';
import {apii, apiCall} from "../../service/api.js"
import { TextField, Box, Button, Typography, styled } from '@mui/material';

import {useNavigate} from 'react-router-dom'

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const initUser = {
    name: "",
    username: "",
    password: ""
}



function Login(props) {
    var activeUser = props.user
    const setUserAuthentication = props.setUserAuthentication
    console.log("active user - ", props)
    const [account, toggleAccount] = useState('login');
    let navigate = useNavigate()
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    var user = {
        name: "",
        username: "",
        password: ""
    }

    const signUp = async () => {
        try {
            // console.log(user)
            // console.log(apii.signUp)
            // console.log(apiCall)
            const data = await apiCall({ url: '/signup', method: 'POST' }, user)
            user = initUser
            toggleSignup()

        }
        catch(error) {
            console.log(error);
        }
        
    }

    const login = async () => {
        try {
            const temp = {
                username: user.username,
                password: user.password
            }
            console.log(temp)
            let response = await apiCall({ url: '/login', method: 'POST' }, temp)
            console.log(response)
            if (response.isSuccess) {
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                activeUser.name = response.data.name
                activeUser.username = response.data.username
                setUserAuthentication(true)
                navigate('/home')
            }
        }
        catch(error) {
            console.log(error);
        }
        
    }




    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    function onInputChange(e) {
        if(e.target.name === 'name') user.name = e.target.value
        if(e.target.name === 'username') user.username = e.target.value
        if(e.target.name === 'password') user.password = e.target.value
    }


    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" name='username' key={1} onChange={onInputChange} label='Enter Username' />
                            <TextField variant="standard" name='password' key={2} onChange={onInputChange} label='Enter Password' />
                            <LoginButton variant="contained" onClick = {login} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={onInputChange} key={3} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={onInputChange} key={4} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={onInputChange} key={5} name='password' label='Enter Password' />
                            <SignupButton onClick={signUp}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;
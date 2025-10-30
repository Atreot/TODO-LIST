import Container from '@mui/material/Container';
import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import NavigationBar from '../NavigationBar/NavigationBar';
import "./AppLayout.scss"



const AppLayout: React.FC = ({ }) => {

    const navigate = useNavigate();
    return (
        <>
            <NavigationBar/>
            <Container className='AppView'>
                <Outlet />
            </Container>
        </>
    );
};

export default AppLayout;
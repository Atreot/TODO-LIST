import { Button } from '@chakra-ui/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';

const WelcomePage: React.FC = ({ }) => {
    return (
        <>
            <Container sx={{
                display: { md: 'flex' }, flexDirection: 'column', alignItems: 'center',
                padding: '5px', paddingLeft: '5px', paddingRight: '5px', backgroundColor: 'var(--bg-color)',
            }}>
                <Box sx={{ marginBottom:'50px', flexGrow: 1, gap: '10px', display: { xs: 'none', md: 'flex' } }}>
                    <h1>Добро пожаловать!</h1>
                </Box>
                <Container sx={{
                    display: { md: 'flex' }, flexDirection: 'row', alignItems: 'center',justifyContent: "space-around",
                    padding: '5px', paddingLeft: '5px', paddingRight: '5px', backgroundColor: 'var(--bg-color)',
                }}>
                    <Button>Действие 1</Button> <Button>Действие 2</Button>
                </Container>
            </Container>
        </>
    );
};

export default WelcomePage;
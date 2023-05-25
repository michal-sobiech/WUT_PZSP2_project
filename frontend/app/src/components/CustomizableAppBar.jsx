import { Container } from '@mui/system';
import { Toolbar, Typography, Button, AppBar, Box } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useToken from '../hooks/useToken';


export default function CustomizableAppBar({ children, buttonsData }) {
    // buttonsData's format: 
    // { name: ... , url: ... }

    let navigate = useNavigate();
    let location = useLocation();
    let [token, setToken] = useToken();
    let buttons = [];

    function changePage(url) {
        navigate(url);
    }

    function handleLogOut() {
        setToken(null);
        navigate('/log_in');
    }

    // useEffect(() => {
    //     console.log('ehehhe');
    //     console.log(buttonsData.length);
    //     for (let i=0; i<buttonsData.length; i++) {
    //         buttons.push(
    //             <Button
    //             color='inherit'
    //             onClick={aaa}>
    //             {buttonsData[i].name}
    //             </Button>
    //         );
    //     }
    // }, []);

    for (let i=0; i<buttonsData.length; i++) {
        buttons.push(
            <Button
            key={i}
            color='inherit'
            onClick={function(){changePage(buttonsData[i].url)}}>
            {buttonsData[i].name}
            </Button>
        );
    }
    
    return (
        <Container>
            <AppBar sx={{
                color: 'black',
                backgroundColor: 'silver',
                mb: 1
                }}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                        mr: 5,
                        }}>
                        ProMan
                    </Typography>
                    {buttons}
                    <Box sx={{ flexGrow: 1 }}/>
                        <Button
                        style={{ color: '#ff3300' }}
                        onClick={handleLogOut}>
                            Log out
                        </Button>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            {children}
        </Container>
    );
}
import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    CircularProgress,
    CssBaseline,
    Paper,
    TextField,
    Grid,
    Typography,  
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom';

import useStyles from './style';
import useGlobalStyles from '../../styles/globalStyles';

import Header from '../home';

export default function Users(){
    const classes = useStyles();
    const globalClasses = useGlobalStyles();
    const history = useHistory;

    const dados = [ 
        {nome: 'vitor', email: 'vitor@gmail.com', data: '22/09/2021'},
        {nome: 'rainerio', email:'rainerio@gmail.com', data: '22/09/2021'},
        {nome: 'vitor', email: 'vitor@gmail.com', data: '22/09/2021'},
        {nome: 'rainerio', email:'rainerio@gmail.com', data: '22/09/2021'},
        {nome: 'vitor', email: 'vitor@gmail.com', data: '22/09/2021'},
        {nome: 'rainerio', email:'rainerio@gmail.com', data: '22/09/2021'},
        {nome: 'vitor', email: 'vitor@gmail.com', data: '22/09/2021'},
        {nome: 'rainerio', email:'rainerio@gmail.com', data: '22/09/2021'},
        {nome: 'vitor', email: 'vitor@gmail.com', data: '22/09/2021'},
        

    ]
    
    function RenderContent(){
        return (
       
            <Container component="main" maxWidth="sm" className={classes.container}>
    
                <CssBaseline />
    
                <Paper className={classes.paper}>
                <Box className={classes.box}>
    
                    <Typography variant="h4" className={classes.title}>Reparos em Aberto</Typography>
                    <Table size="small" >
                        <TableHead className={classes.marginTop}>
                            <TableRow>
                                <TableCell>Nº</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Criado em:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dados.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{item.nome}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.data}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>         
                </Box>
                </Paper>

                <Paper className={classes.paper}>
                <Box className={classes.box}>
    
                    <Typography variant="h4" className={classes.title}>Reparos Concluídos</Typography>
                    <Table size="small">
                        <TableHead className={classes.marginTop}>
                            <TableRow>
                                <TableCell>Nº</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Criado em:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dados.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{item.nome}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.data}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                </Paper>
    
            </Container>    
        );
    }

    return(
        <Header content={RenderContent}/>
    )
    
}
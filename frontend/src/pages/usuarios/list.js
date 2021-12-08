import React from 'react';
import {
    Box,
    Container,
    CssBaseline,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

import Header from '../home'

import useStyles from './style';


const dados = [ 
    {nome: 'vitor', email: 'vitor@gmail.com', data: '22/09/2021'},
    {nome: 'rainerio', email:'rainerio@gmail.com', data: '22/09/2021'}

]

export default function UserList(){
    const classes = useStyles();

    function RenderContent(){
        return (
            <Container component="main" maxWidth="lg" >
    
                <CssBaseline />
    
                <Paper className={classes.paper}>
                <Box className={classes.box}>
    
                    <Typography variant="h4" className={classes.title}>Usuários Cadastrados</Typography>
    
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
        )
    }

    return(
        <Header content={RenderContent}/>
    )
    
}

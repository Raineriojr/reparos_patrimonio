import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    CircularProgress,
    CssBaseline,
    Paper,
    TextField,
    Grid,
    Typography
} from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useStyles from './style';
import useGlobalStyles from '../../styles/globalStyles';

import Header from '../home';

export default function Users(){
    const classes = useStyles();
    const globalClasses = useGlobalStyles();

    const history = useHistory();

    //formulário e validação
    const { errors, isSubmitting, touched, setSubmitting, getFieldProps, handleSubmit, resetForm } = useFormik({
        initialValues: {
            nome: '',
            email: '',
            senha: ''
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('Insira o nome'),
            email: Yup.string().email('Insira um email válido').required('Insira o email'),
            senha: Yup.string().required('Insira uma senha')
        }),
        onSubmit: async (values) => {
            console.log(values);
        }
    })
    
    function RenderContent(){
        return (
       
            <Container component="main" maxWidth="sm" >
    
                <CssBaseline />
    
                <Paper className={classes.paper}>
                <Box className={classes.box}>
    
                    <Typography variant="h4" className={classes.title}>Novo usuário</Typography>
    
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    type="text"
                                    autoFocus
                                    error={touched.nome && errors.nome ? true : false}
                                    helperText={touched.nome && errors.nome}
                                    {...getFieldProps('nome')}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField  
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    type="email"
                                    error={touched.email && errors.email ? true : false}
                                    helperText={touched.email && errors.email}
                                    {...getFieldProps('email')}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField 
                                    name="senha" 
                                    required
                                    fullWidth
                                    id="senha"
                                    label="Senha"
                                    type="pass"                                
                                    error={touched.senha && errors.senha ? true : false}
                                    helperText={touched.senha && errors.senha}
                                    {...getFieldProps('senha')}
                                />
                            </Grid>
    
                            <Grid item xs={12} className={globalClasses.buttonGrid}>
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size='medium'
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting && (
                                    <CircularProgress
                                        size={24}
                                        sx={{ position: 'absolute', top: '50%', left: '50%'}}
                                    />)}
                                    <Typography className={globalClasses.textButton}>CADASTRAR</Typography>
                                </Button>
                            </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                </Paper>
            </Container>    
        );
    }

    return(
        <>
            <Header content={RenderContent}/>
        </>
    )
    
}
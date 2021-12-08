import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    MenuItem,
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
            categoria: '',
            titulo: '',
        },
        validationSchema: Yup.object({
            categoria: Yup.string().required('Selecione a categoria'),
            titulo: Yup.string().required('Descreva o serviço'),
        }),
        onSubmit: (values) => {
            setSubmitting(true)
        }
    })
    
    function RenderContent(){
        return (
            <Container component="main" maxWidth="sm" >
    
                <CssBaseline />
    
                <Paper className={classes.paper}>
                <Box className={classes.box}>
    
                    <Typography variant="h4" className={classes.title}>Serviços Realizados</Typography>
    
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="categoria"
                                    required
                                    fullWidth
                                    id="categoria"
                                    label="Categoria"
                                    select
                                    autoFocus
                                    error={touched.categoria && errors.categoria ? true : false}
                                    helperText={touched.categoria && errors.categoria}
                                    {...getFieldProps('categoria')}
                                >
                                    <MenuItem key={0} value={1}>Option</MenuItem>
                                </TextField>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField  
                                    name="titulo"
                                    required
                                    fullWidth
                                    id="titulo"
                                    label="Serviço"
                                    type="titulo"
                                    error={touched.titulo && errors.titulo ? true : false}
                                    helperText={touched.titulo && errors.titulo}
                                    {...getFieldProps('titulo')}
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
        <Header content={RenderContent}/>
    )
    
}
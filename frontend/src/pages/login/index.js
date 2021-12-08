import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CircularProgress,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './style';

function Subtitle() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="#">
          SENAC AMAPÁ {`${new Date().getFullYear()}.`}
        </Link>
      </Typography>
    );
  }

export default function Login(){    
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false); //abre modal

    const Log = (data) => history.push({
        pathname: '/list',
        state: { data: data }
    })

    //formulário
    const { errors, isSubmitting, touched, setSubmitting, getFieldProps, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Insira seu email').email('Insira um email válido'),
            senha: Yup.string().required('Insira sua senha')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            {/* <Modal open={open} setOpen={setOpen}/> */}

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={touched.email && errors.email ? true : false}
                        helperText={touched.email && errors.email}
                        {...getFieldProps('email')}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        error={touched.senha && errors.senha ? true : false}
                        helperText={touched.senha && errors.senha}
                        {...getFieldProps('senha')}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Manter conectado"
                    />
                    
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >   
                            {isSubmitting && (
                            <CircularProgress
                                size={24}
                                sx={{ position: 'absolute', top: '50%', left: '50%'}}
                            />)}
                            LOGIN
                        </Button>
                    </Box>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Esqueceu sua senha?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            
            <Box mt={8}>
                <Subtitle />
            </Box>
        </Container>
    );
}
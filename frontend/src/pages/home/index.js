import React, { useState } from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import { useHistory, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Collapse,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

//icones e estilos
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import ImportantDevicesRoundedIcon from '@material-ui/icons/ImportantDevicesRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import useStyles from "./style";
    

export default function Home(props) {

    //navegação
    const history = useHistory();
    const Logout = () => history.push('/')
    const pageCreateUser = () => history.push('/createUser');
    const pageListUser = () => history.push('/listUsers');
    const pageRepair = () => history.push('/repair');
    const pageServices = () => history.push('/services');
    const pagePatrimony = () => history.push('/patrimony');

    const { window } = props;
    const classes = useStyles();

    //estados
    const [ openDrawer, setOpenDrawer ] = useState(true);
    const [ open, setOpen ] = useState(true);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleToggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleToggleOption = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.rootDrawer}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.rootAppBar}>
                <Toolbar>
                    <IconButton onClick={handleToggleDrawer} edge="start" className={classes.menuButtonAppBar} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        SENAC REPAROS
                    </Typography>
                    <Button onClick={()=>Logout()} color="inherit">SAIR</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                container={container}
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>  </div>{/*mantem barra lateral abaixo do AppBAr*/}

                <List>
                    <ListItem button onClick={()=>pageRepair()}>
                        <ListItemIcon> <BuildRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="Reparos" />
                    </ListItem>
                    <ListItem button onClick={()=>pagePatrimony()}>
                        <ListItemIcon> <ImportantDevicesRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="Patrimônios" />
                    </ListItem>
                    <ListItem button onClick={()=>pageServices()}>
                        <ListItemIcon> <FormatListBulletedRoundedIcon /> </ListItemIcon>
                        <ListItemText primary="Serviços" />
                    </ListItem>

                    <ListItem button onClick={()=>handleToggleOption()}>
                        <ListItemIcon>
                            <PeopleAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuários" />
                        {open ? <ExpandLess /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.subItem} onClick={()=>pageCreateUser()}>
                            <ListItemIcon>
                                <PersonAddRoundedIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Novo usuário" />
                        </ListItem>
                        </List>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.subItem} onClick={()=>pageListUser()}>
                            <ListItemIcon>
                                <FormatListBulletedRoundedIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Usuários cadastrados" />
                        </ListItem>
                        </List>
                    </Collapse>                    
                </List>
            </Drawer>
        
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: openDrawer,
                })}
            >
                <div className={classes.drawerHeader} />

                {props.content()} 
                
            </main>
            
        </div>
  );
}
    Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  


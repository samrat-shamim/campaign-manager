import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Dashboard, Dns, People} from "@material-ui/icons";
import {routes} from "../../../routes";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            paddingTop: '50px'
        },
    }),
);

export function Layout() {
    const classes = useStyles();
    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Campaign Manager
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar}/>
                    <Divider/>
                    <List>
                        {routes.filter(nav => nav.VisibleInSideNav && nav.Icon).map((nav, index) => (

                            <Link to={nav.Path}>
                                <ListItem button key={nav.Name}>
                                    <ListItemIcon>{nav.Icon || <People/>}</ListItemIcon>
                                    <ListItemText primary={nav.Name}/>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <Switch>
                        {routes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different components this time.
                            <Route
                                key={index}
                                path={route.Path}
                                exact={route.Exact}
                                children={route.Main}
                            />
                        ))}
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Container, GridList, GridListTile} from "@material-ui/core";
import {LAMBDAS} from "../../../data";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Cached} from "@material-ui/icons";


export class Emails extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {emails: []};
        this.getEmails();
    }
    render(): React.ReactElement<any, any> {
        return <div>
            <Container maxWidth={"md"}>
                <GridList cellHeight={'auto'} style={{paddingTop: '20px'}}>
                    <GridListTile>
                        <h1>Emails</h1>
                    </GridListTile>
                    <GridListTile style={{paddingTop: '5px'}}>
                        <div onClick={this.getEmails} >
                            <Fab color="primary" aria-label="add">
                                <Cached/>
                            </Fab>
                        </div>
                    </GridListTile>
                </GridList>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>From</TableCell>
                                <TableCell align="justify" style={{fontWeight: 'bold'}}>To</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Subject</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Status</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Updated At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.emails.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.from}
                                    </TableCell>
                                    <TableCell align="justify">{row.to}</TableCell>
                                    <TableCell align="justify">{row.subject}</TableCell>
                                    <TableCell align="justify">{row.currentStatus}</TableCell>
                                    <TableCell align="justify">{(new Date(row.lastUpdated*1000)).toDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    }

    getEmails: any = () => {
        const headers = {
            'Content-Type': 'application/json'
        };
        fetch(LAMBDAS.GetEmails, {
            method: "POST",
            headers,
            body: "{}"
        })
            .then(response => response.json())
            .then(data => {
                const emails = data.Items;
                this.setState({ emails});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

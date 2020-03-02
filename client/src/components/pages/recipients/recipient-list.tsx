import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Container, GridList, GridListTile} from "@material-ui/core";
import {LAMBDAS} from "../../../endpoints";
import SendEmailDialog from "../emails/send-email-dialog";
import CreateRecipientDialog from "./create-recipient-dialog";


export class RecipientList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {recipients: []};
        this.getRecipients();
    }
    onSendDialogSubmit = (data: any) => {
        console.log(data);
    }
    onRecipientCreate = () => {
        this.getRecipients();
    }

    render(): React.ReactElement<any, any> {
        return <div>
            <Container maxWidth={"md"}>
                <GridList cellHeight={'auto'} style={{paddingTop: '20px'}}>
                    <GridListTile>
                        <h1>Recipients</h1>
                    </GridListTile>
                    <GridListTile style={{paddingTop: '5px'}}>
                        <CreateRecipientDialog onCreated={this.onRecipientCreate}/>
                    </GridListTile>
                </GridList>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                                <TableCell align="justify" style={{fontWeight: 'bold'}}>Email</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.recipients.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.Name}
                                    </TableCell>
                                    <TableCell align="justify">{row.Email}</TableCell>
                                    <TableCell align="justify">
                                       <SendEmailDialog onSubmit={this.onSendDialogSubmit} recipient={row}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    }

    getRecipients: any = () => {
        this.setState({ recipients: []});
        const headers = {
            'Content-Type': 'application/json'
        };
        fetch(LAMBDAS.GetRecipientList, {
            method: "POST",
            headers,
            body: "{}"
        })
            .then(response => response.json())
            .then(data => {
                const recipients = data.Items;
                this.setState({ recipients});
            })
            .catch(err => {
                console.error(err);
            })
    }
}

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid} from "@material-ui/core";
import {LAMBDAS} from "../../../endpoints";
import {uuid} from "../../../utils/uuid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {Recipient} from "./recipient";

export default function CreateRecipientDialog(props: {onCreated: Function}) {
    const [open, setOpen] = React.useState(false);
    const recipient: Recipient = {} as any;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = ({target}: any) => {
        const key: string = target.name;
        (recipient as any)[key] = target.value;
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        if (recipient.Name && recipient.Email) {
            setOpen(false);
            const headers = {
                'Content-Type': 'application/json'
            };
           recipient.id = uuid();
            const body = JSON.stringify(recipient);
            const payload = {
                method: "POST",
                headers,
                body
            }
            fetch(LAMBDAS.CreateRecipient, payload)
                .then(response => response.json())
                .then(data => {
                    props.onCreated();
                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                })
        }

    }
    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="email-dialog-title">Create Recipient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter recipient data
                    </DialogContentText>
                    <Grid >
                        <Grid item>
                            <form>
                                <TextField value={recipient.Name} name="Name" label="Name" type="text" fullWidth
                                           onChange={handleChange} required></TextField>
                                <TextField value={recipient.Email} name="Email" label="Email" type={'email'} fullWidth
                                           onChange={handleChange} required></TextField>
                            </form>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant={"outlined"}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" variant={"contained"}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

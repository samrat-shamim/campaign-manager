import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid} from "@material-ui/core";
import {LAMBDAS, Recipient} from "../../../data";
import {uuid} from "../../../utils/uuid";
interface SendEmailDialogProps {
    onSubmit: Function;
    recipient: Recipient
}
interface EmailData {
    id: string;
    to: string;
    from: string;
    subject: string;
    text: string;
    recipient: string;
}

export default function SendEmailDialog(props: SendEmailDialogProps) {
    const [open, setOpen] = React.useState(false);
    const emailData: any = {
        Sender: "testsender@yopmail.com"
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = ({target}: any) => {
        const key: string = target.name;
        emailData[key] = target.value;
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = () => {
        if (emailData.Sender && emailData.Subject && emailData.Body) {
            setOpen(false);
            const headers = {
                'Content-Type': 'application/json'
            };
            const mailgunData: EmailData = {
                id: uuid(),
                from: emailData.Sender,
                to: props.recipient.Email,
                subject: emailData.Subject,
                text: emailData.Body,
                recipient: props.recipient.id
            }
            const body = JSON.stringify(mailgunData);
            const payload = {
                method: "POST",
                headers,
                body
            }
            fetch(LAMBDAS.SendEmail, payload)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                })
        }

    }
    return (
        <div>
            <Button variant="contained" color={'primary'} onClick={handleClickOpen}>Send Email</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="email-dialog-title">Send Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Recipient {props.recipient.Name}
                    </DialogContentText>
                    <Grid >
                        <Grid item>
                            <form>
                                <TextField value={emailData.Sender} name="Sender" label="Sender" type="text" fullWidth
                                           onChange={handleChange} required></TextField>
                                <TextField value={emailData.Subject} name="Subject" label="Subject" type="text" fullWidth
                                           onChange={handleChange} required></TextField>
                                <TextField multiline rows={3} value={emailData.Body} name="Body" label="Body" type={'text'} fullWidth
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
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

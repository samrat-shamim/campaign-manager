import React from 'react';
import {Container, Grid, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';


export class CreateRecipient extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {Name: '', Email: ''}
    }

    handleChange = ({target}: any) => {
        this.setState({[target.name]: target.value});
    };
    backToRecipientList = () => {
        window.history.go(-1);
    }
    saveRecipient = () => {
        if (this.isFormValid()) {
            console.log(this.state);
        } else {
            alert("Invalid input");
        }

    }
    isFormValid = ()=> {
        return this.state.Name && this.state.Email && this.isValidEmail(this.state.Email);
    }


    private isValidEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render(): React.ReactElement<any, any> {
        return <div>
            <Container maxWidth={"md"}>
                <h1>Create Recipient</h1>
                <Grid>
                    <Grid item>
                        <form>
                            <TextField value={this.state.Name} name="Name" label="Name" type="text" fullWidth
                                       onChange={this.handleChange} required></TextField>
                            <TextField value={this.state.Email} name="Email" label="Email" type={'email'} fullWidth
                                       onChange={this.handleChange} required></TextField>
                        </form>
                    </Grid>
                    <Grid style={{paddingTop: '20px'}} item>
                        <Grid container justify="space-around" spacing={10}>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={this.backToRecipientList}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={this.saveRecipient}
                                        disabled={this.state.formInvalid}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    }
}

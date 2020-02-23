import React from 'react';
import {Grid, TextField} from "@material-ui/core";
export class CreateRecipient extends React.Component<any, any>{
    constructor(props: any) {
        console.log("Create recipient")
        super(props);
    }
    render(): React.ReactElement<any, any> {
        return <div>
            <h1>Create Recipient</h1>
            <Grid md={6}>
                <form>
                    <TextField id="Name" label="Name" type="text" fullWidth></TextField>
                    <TextField id="Email" label="Email" type={'email'} fullWidth></TextField>
                </form>
            </Grid>
        </div>
    }
}

import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Link, Route} from "react-router-dom";
import {CreateRecipient} from "./create-recipient";
export class RecipientList extends React.Component<any, any>{
    render(): React.ReactElement<any, any> {
        return <div>
            <h1>Recipients</h1>
            <Link to={'recipients/create'}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Link>
        </div>
    }
}

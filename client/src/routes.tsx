import React from "react";
import {Dashboard, Dns, People} from "@material-ui/icons";
import {DashboardMain} from "./components/pages/dashboard/dashboard-main";
import {RecipientList} from "./components/pages/recipients/recipient-list";
import {Campaigns} from "./components/pages/campaigns/campaigns";
import App from "./App";
import {Landing} from "./components/pages/landing";
import {CreateRecipient} from "./components/pages/recipients/create-recipient";

interface Route {
    Name: string;
    Path: string;
    Exact: boolean;
    Main: React.ComponentElement<any, any>;
    Icon?: React.ComponentElement<any, any>;
    VisibleInSideNav?: boolean;
}

export const routes: Route[] = [
    {
        Name: "Home",
        Main: <Landing/>,
        Path: "/",
        Exact: true,
        VisibleInSideNav: false
    },
    {
        Name: "Dashboard",
        Icon: <Dashboard/>,
        Main: <DashboardMain/>,
        Path: "/dashboard",
        Exact: true,
        VisibleInSideNav: true
    },
    {
        Name: "Recipients",
        Icon: <People/>,
        Main: <RecipientList/>,
        Path: "/recipients",
        Exact: true,
        VisibleInSideNav: true
    },
    {
        Name: "Campaigns",
        Icon: <Dns/>,
        Main: <Campaigns/>,
        Path: "/campaigns",
        Exact: true,
        VisibleInSideNav: true
    },
    {
        Name: "Create Recipient",
        Main: <CreateRecipient/>,
        Path: "/recipients/create",
        Exact: true,
        VisibleInSideNav: false
    }
];
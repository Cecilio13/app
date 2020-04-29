import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams,
    browserHistory
} from "react-router-dom";

import AdminInitialComponent from '../components/admin/pages';
import AdminHome from '../components/admin/pages/home';
import AdminAnalytics from '../components/admin/pages/analytics';
import AdminCustomers from '../components/admin/pages/customers';
import AdminProducts from '../components/admin/pages/products';

import axios from 'axios';
import { api_base_url } from '../keys';
export const UserContext = React.createContext();
export const UsersContext = React.createContext();
export const FetchOrderList = React.createContext();
export const AbandonedList = React.createContext();


const RouteController = ({ setNav, orders, users, get_orders, ABorders }) => (

    // <Router basename="/Inventory_Management" forceRefresh={true}>

    <Router basename="/Inventory_Management" key={1} >
        <div key={1}>
            <Switch key={1}>
                {/* admin ui */}

                <Route key={1} exact path="/" >
                    <AdminHome no={1} />
                </Route>

                <Route key={3} exact path="/products">
                    <AdminProducts no={3} />
                </Route>
                <Route key={4} exact path="/customers" >
                    <AdminCustomers no={4} />
                </Route>
                <Route key={5} exact path="/analytics">
                    <AdminAnalytics no={5} />
                </Route>
            </Switch>
        </div>
    </Router>

);
function App() {

    return [
        <RouteController key={1} />
    ]
}

export default App;















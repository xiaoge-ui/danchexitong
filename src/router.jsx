import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import App from './App'
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home'
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notification';
import Messages from './pages/ui/message';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/formLogin';
import FormReg from './pages/form/formReg';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import NoMatch from './pages/nomatch';
import Common from './Common';
import Detail from './pages/order/detail';
import User from './pages/user';
import BikeMap from './pages/map';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import Permission from './pages/permission'

export default class componentName extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Redirect exact path="/" to="/home" />
                        <Route path='/' render={() => {
                            return (
                                <Admin>
                                    <Switch>
                                        <Route path='/home' component={Home} />
                                        <Route path='/ui/buttons' component={Buttons} />
                                        <Route path='/ui/modals' component={Modals} />
                                        <Route path='/ui/loadings' component={Loadings} />
                                        <Route path='/ui/notification' component={Notifications} />
                                        <Route path='/ui/messages' component={Messages} />
                                        <Route path='/ui/tabs' component={Tabs} />
                                        <Route path='/ui/gallery' component={Gallery} />
                                        <Route path='/ui/carousel' component={Carousels} />
                                        <Route path='/form/login' component={FormLogin} />
                                        <Route path='/form/reg' component={FormReg} />
                                        <Route path='/table/basic' component={BasicTable} />
                                        <Route path='/table/high' component={HighTable} />
                                        <Route path='/city' component={City} />
                                        <Route path='/order' component={Order} />
                                        <Route path='/user' component={User} />
                                        <Route path='/bikeMap' component={BikeMap} />
                                        <Route path='/charts/bar' component={Bar} />
                                        <Route path='/charts/pie' component={Pie} />
                                        <Route path='/charts/line' component={Line} />
                                        <Route path='/rich' component={RichText} />
                                        <Route path='/permission' component={Permission} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </Admin>
                            )
                        }} />

                        <Route path='/login' component={Login} />

                        <Route path='/common' render={() => {
                            return (
                                <Common>
                                    <Switch>
                                        <Route path='/common/order/detail/:id' component={Detail} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </Common>
                            )
                        }} />
                    </Switch>
                </App>
            </Router>
        )
    }
}

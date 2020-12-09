import React, {  } from 'react';
import Header from './components/common/Header/Header';
import List from './components/List/List';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Detail from './components/detail/Detail';
// const Detail = React.lazy(() => {import ('./components/detail/Detail')});
import './index.css';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" component={List} exact />
                    <Route path="/currency/:id" component={Detail} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default App;
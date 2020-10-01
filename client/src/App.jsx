import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import Home from './routes/Home'
import { RestaurantContextProvider } from './context/RestaurantContext';


const App = () => {
    
    return( 
        <RestaurantContextProvider> 
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/restaurants/:id' component={RestaurantDetailPage}/>
                        <Route exact path='/restaurants/:id/update' component={UpdatePage}/>
                    </Switch>
            </Router>
            </div>
        </RestaurantContextProvider> 
    )
}

export default App;
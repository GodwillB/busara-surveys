import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './context/PrivateRoute'
import PublicRoute from './context/PublicRoute'
import { AppWrapper } from './context/state'

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PublicRoute exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App

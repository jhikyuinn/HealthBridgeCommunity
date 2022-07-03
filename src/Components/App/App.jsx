import "./App.css";
import Home from "../Home/Home";
import Daily from "../Daily/Daily";
import Navbar from "../Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import { UserContextProvider } from "../../context/AuthContext"
import Post from "../Postview/Post";
import { MainContextProvider } from "../../context/MainContext";
import ReactGA from 'react-ga';
import RouteChangeTracker from '../../service/RouteChangeTracker'

function App() {
  const TRACKING_ID = "UA-216007386-1"; // YOUR_OWN_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

  return (
    <UserContextProvider>
      <MainContextProvider>
          <RouteChangeTracker />
          <div className="App">
            <Navbar />
            <div className="main-content-view">
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/daily" exact component={Daily} />
                <Route path="/" exact component={Home} />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </div>
          </div>

      </MainContextProvider>
    </UserContextProvider>



  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/views/Auth";
import LoginForm from "./components/login/LoginForm";
import { ColorScheme } from "./pages/Color";
import CreateMix from "./pages/CreateMix";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Layout} /> */}
        <Route exact path="/login" component={LoginForm} />
        <Route
          exact
          path="/register"
          render={(props) => <Auth {...props} authRoute="register" />}
        />
        <Route path="/" component={ColorScheme} />
        <Route path="/create" component={CreateMix} />
      </Switch>
    </Router>
  );
}

export default App;

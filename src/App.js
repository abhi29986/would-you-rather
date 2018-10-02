import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import QuestionDetails from "./components/question/QuestionDetails";
import LeaderBoard from "./components/dashboard/LeaderBoard";
import NewQuestion from "./components/question/NewQuestion";
import NotFound from "./components/not-found/NotFound";
import { handleInitialData } from "./actions/sharedAction";
import PropTypes from "prop-types";
import PrivateRoute from "./components/common/PrivateRoute";

class App extends Component {
  //Loading the Initial data during the componentDidMount lifecycle
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="main-container">
            <NavBar />
            <div className="container">
              <Switch>
                <PrivateRoute path="/" exact component={Dashboard} />

                <PrivateRoute
                  path="/questions/:id"
                  component={QuestionDetails}
                />

                <PrivateRoute path="/add" component={NewQuestion} />

                <PrivateRoute path="/leaderboard" component={LeaderBoard} />
                <Route path="/login" exact component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired
};
export default connect(null, { handleInitialData })(App);

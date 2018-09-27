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
import isEmpty from "./validation/is-empty";
import PropTypes from "prop-types";

class App extends Component {
  //Loading the Initial data during the componentDidMount lifecycle
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Router>
        <Fragment>
          <div className="main-container">
            <NavBar />
            <div className="container">
              <Switch>
                {!isAuthenticated ? (
                  <Route path="/" exact component={Login} />
                ) : (
                  <Fragment>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/questions/:id" component={QuestionDetails} />
                    <Route path="/add" component={NewQuestion} />
                    <Route path="/leaderboard" component={LeaderBoard} />
                  </Fragment>
                )}
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

function mapStateToProps({ authedUser }) {
  return {
    isAuthenticated: !isEmpty(authedUser)
  };
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
export default connect(mapStateToProps, { handleInitialData })(App);

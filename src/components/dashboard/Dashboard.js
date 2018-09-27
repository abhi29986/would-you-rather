import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import Question from "../question/Question";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DashBoard extends Component {
  //Refer https://reactstrap.github.io/components/tabs/ for tab toggling
  state = {
    activeTab: "1"
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { authedUser, questions, users } = this.props;

    const user = users[authedUser];
    //Finding the Questions Id for the answered polls
    const answeredPolls = Object.keys(user.answers);

    //Finding the Questions Id for the unanswered polls
    const unansweredPolls = Object.keys(questions).filter(
      qid => !answeredPolls.includes(qid)
    );
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Unanswered Poll
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Answered Pool
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {unansweredPolls.map(qid => (
                <Col key={qid} sm="6" md="5">
                  <Question id={qid} />
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {answeredPolls.map(qid => (
                <Col key={qid} sm="6" md="5">
                  <Question id={qid} />
                </Col>
              ))}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
    users: state.users
  };
};
DashBoard.propTypes = {
  authedUser: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DashBoard);
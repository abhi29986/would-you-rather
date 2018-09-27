import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import User from "../user/User";
import PropTypes from "prop-types";

const LeaderBoard = props => {
  const { users } = props;
  // calculate poll details with asked and answered properties
  const userWithDetailsArray = Object.keys(users).map(id => ({
    id,
    asked: users[id].questions.length,
    answered: Object.keys(users[id].answers).length
  }));
  // sort from most to least answered
  const sortedUserArray = userWithDetailsArray.sort(
    (a, b) => b.asked + b.answered - (a.asked + a.answered)
  );

  return (
    <Table bordered striped hover dark>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>No. Of Question Asked</th>
          <th>No. Of Question Answered</th>
        </tr>
      </thead>
      <tbody>
        {sortedUserArray.map((user, idx) => (
          <tr key={user.id}>
            <td>{idx + 1}</td>
            <td>
              <User id={user.id} />
            </td>
            <td>{user.asked}</td>
            <td>{user.answered}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

//PropType Validation
LeaderBoard.propTypes = {
  users: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LeaderBoard);

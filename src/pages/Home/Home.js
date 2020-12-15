import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as exampleActions from '../../redux/example/actions';

export class Home extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchRedditList();
  }

  render() {
    return (
      <div className="home">
        <div className="screen-1">
          <div className="title">
            <h1>Bagad Heol</h1>
            <h2>La Bretagne de près ou de loin au travers d'un podcast délirant !</h2>
            <p>Des discussions, des amis, de l'humour, des jeux et plein d'autres moment !
              Rassemblez-vous autour d'une bonne tranche bretonne, à partager au chaud ou dans le froid,
              dehors, dans les transports ou dans le lit !
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    examples: state.examples,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...exampleActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


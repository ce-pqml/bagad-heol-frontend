import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as exampleActions from '../../redux/example/actions';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_bagad_heol.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';

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
            <Image src={logo} roundedCircle />
            <h2>La Bretagne de près ou de loin au travers d'un podcast délirant !</h2>
            <p>Des discussions, des amis, de l'humour, des jeux et plein d'autres moment !
              Rassemblez-vous autour d'une bonne tranche bretonne, à partager au chaud ou dans le froid,
              dehors, dans les transports ou dans le lit !
            </p>
          </div>

          <div className="line"></div>

          <div className="line-home">
            <div className="line-title"><h3>Les podcasts du moment</h3></div>

            <div className="podcasts-list">
              <div className="podcast">
                <Link to="/player/podcast1"><p>Podcast Numéro 1.</p></Link>
              </div>
              <div className="podcast">
                <Link to="/player/podcast2"><p>Podcast Numéro 2.</p></Link>
              </div>
              <div className="podcast">
                <Link to="/player/podcast3"><p>Podcast Numéro 3.</p></Link>
              </div>
              <div className="podcast">
                <Link to="/player/podcast4"><p>Podcast Numéro 4.</p></Link>
              </div>
              <div className="podcast">
                <Link to="/player/podcast5"><p>Podcast Numéro 5.</p></Link>
              </div>
              
            </div>
          </div>

          <div className="line"></div>

          <div className="line-home">
            <div className="line-title"><h3>Les coups de coeurs de la communauté</h3></div>

            <div className="articles-list">
              <div className="line-article">
                <h4>Le podcast du moment</h4>
                <Link to="/player/podcast3"><p>Podcast Numéro 3.</p></Link>
              </div>

              <div className="line-article">
                <h4>Le forum du moment</h4>
                <Link to="/player/podcast3"><p>Podcast Numéro 3.</p></Link>
              </div>
            </div>
            

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


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { PlayFill } from 'react-bootstrap-icons';
import PlayerBar from '../../components/PlayerBar/PlayerBar';
import * as podcastActions from '../../redux/podcast/actions';

import album from '../../assets/img/album-img.png';
import profil from '../../assets/img/profil.png';


export class Player extends Component {
  static propTypes = {
    podcast: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    let coverH = document.getElementById('cover-box').clientHeight;
    document.getElementById('max-h-child').style.maxHeight = coverH + 'px';
  }

  render() {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push(
        <div className="msg-box d-flex">
          <Image src={profil} roundedCircle />
          <div>
            <span className="msg-author">Kapoutotika</span>
            <span> - 04/12/2020 - 12h14</span>
            <p>Super épisode, hâte de voir la suite !</p>
          </div>
        </div>
      );
      items.push(
        <div className="msg-box d-flex">
          <Image src={profil} roundedCircle />
          <div>
            <span className="msg-author">Michel</span>
            <span> - 04/12/2020 - 12h14</span>
            <p>Hello voici mes recommandations pour les prochains épisodes. En faite je tente d'écrire un message très long pour voir ce qui va ce passer</p>
          </div>
        </div>
      );
    };

    let currentIndex = this.props.podcast.listPodcast.findIndex(element => element.id == this.props.podcast.currentPodcast.id);
    let elementStyle = document.querySelector('.player');
    if (elementStyle) {
      elementStyle.style.setProperty('--background', `url(${this.props.podcast.currentPodcast.img}) center`);
    }
    
    return (
      <div className="player d-flex justify-content-center align-items-center">
        <Container fluid>
          <Container>
            <Row>
              <Col className="title-player" align="right" md={8}>
                <p>podcast en cours</p>
                <h2>{this.props.podcast.currentPodcast.podcast}</h2>
                <h3>{this.props.podcast.currentPodcast.title}</h3>
              </Col>
              <Col className="title-msg align-self-end" md={4}>
                <h2>Discussions</h2>
              </Col>
            </Row>
            <Row>
              <Col md={8} align="center">
                <div id="cover-box" className="w-50">
                  {/* <div className="cover-before"></div> */}
                  {this.props.podcast.listPodcast[currentIndex - 1] && <img src={this.props.podcast.listPodcast[currentIndex - 1].img} className="cover-before" />}
                  <div className="cover-now w-100">
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                      <img src={this.props.podcast.currentPodcast.img} className="w-100" />
                      {/* <div className="rounded-circle w-25 h-25 bg-dark">
                        <PlayFill size={96} />
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="cover-after"></div> */}
                  {console.log("debug", this.props.podcast.listPodcast[currentIndex + 1])}
                  {this.props.podcast.listPodcast[currentIndex + 1] && <img src={this.props.podcast.listPodcast[currentIndex + 1].img} className="cover-after" />}
                </div>
              </Col>
              <Col md={4}>
                <div id="max-h-child" className="overflow-auto">
                  {items}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="desc-player mt-5">{this.props.podcast.currentPodcast.desc}</p>
              </Col>
            </Row>
          </Container>
        </Container>
        <PlayerBar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    podcast: state.podcast,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...podcastActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);


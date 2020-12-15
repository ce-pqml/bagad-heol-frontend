import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { PlayFill } from 'react-bootstrap-icons';
import PlayerBar from '../../components/PlayerBar/PlayerBar';
import * as exampleActions from '../../redux/example/actions';

import album from '../../assets/img/album-img.png';
import profil from '../../assets/img/profil.png';


export class Player extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 256,
      podcast: {
        'url': 'https://file04.ausha.co/kUPETcdI6l9OgPtCguWUkjn7oaBye9KpacmUZal9.mp3?token=9pwyyeeL7WImf0URbG0TpA&expires=1607961635',
        'img': 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_768/https://blog.snappa.com/wp-content/uploads/2018/06/Podcast-Cover-Art-Size-768x768.jpg',
        'title': '#01 - L\'Avenir nous tend les bras',
        'desc': 'Aujourd\'hui on parle de la Bretagne après Covid mais surtout on découvre les bruits de l\'océan à des fins humoristiques.'
    }};
  }

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

    const itemsAlbum = [];
    for (let i = 0; i < 35; i++) {
      itemsAlbum.push(
        <img src={album} />
        // <p>TEST</p>
      );
    };
    
    return (
      <div className="player d-flex justify-content-center align-items-center">
        <Container fluid>
          <Container>
            <Row>
              <Col className="title-player" align="right" md={8}>
                <p>podcast en cours</p>
                <h2>Bagad Heol</h2>
                <h3>{this.state.podcast.title}</h3>
              </Col>
              <Col className="title-msg align-self-end" md={4}>
                <h2>Discussions</h2>
              </Col>
            </Row>
            <Row>
              <Col md={8} align="center">
                <div id="cover-box" className="w-50">
                  <div className="cover-before"></div>
                  <div className="cover-now w-100">
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                      <img src={this.state.podcast.img} className="w-100" />
                      {/* <div className="rounded-circle w-25 h-25 bg-dark">
                        <PlayFill size={96} />
                      </div> */}
                    </div>
                  </div>
                  <div className="cover-after"></div>
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
                <p className="desc-player mt-5">{this.state.podcast.desc}</p>
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
)(Player);


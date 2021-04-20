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

import { decode } from 'html-entities';

export class Player extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getPodcastList()
  }

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
    const { listPodcast, currentPodcast } = this.props.podcast;

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

    let currentIndex = listPodcast.findIndex(element => element.id == currentPodcast.id);
    let elementStyle = document.querySelector('.player');
    if (elementStyle) {
      elementStyle.style.setProperty('--background', `url(${'/'+decode(currentPodcast.cover)}) center`);
    }
    
    return (
      // <div className="player d-flex justify-content-center align-items-center">
      //   <Container fluid>
      //     <Container>
      //       <Row>
      //         <Col className="title-player" align="right" md={8}>
      //           <p>podcast en cours</p>
      //           <h2>{currentPodcast.podcast}</h2>
      //           <h3>{currentPodcast.title}</h3>
      //         </Col>
      //         <Col className="title-msg align-self-end" md={4}>
      //           <h2>Discussions</h2>
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={8} align="center">
      //           <div id="cover-box" className="w-50">
      //             {/* <div className="cover-before"></div> */}
      //             {listPodcast[currentIndex - 1] && <img src={listPodcast[currentIndex - 1].img} className="cover-before" />}
      //             <div className="cover-now w-100">
      //               <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      //                 <img src={currentPodcast.img} className="w-100" />
      //                 {/* <div className="rounded-circle w-25 h-25 bg-dark">
      //                   <PlayFill size={96} />
      //                 </div> */}
      //               </div>
      //             </div>
      //             {/* <div className="cover-after"></div> */}
      //             {console.log("debug", listPodcast[currentIndex + 1])}
      //             {listPodcast[currentIndex + 1] && <img src={listPodcast[currentIndex + 1].img} className="cover-after" />}
      //           </div>
      //         </Col>
      //         <Col md={4}>
      //           <div id="max-h-child" className="overflow-auto">
      //             {items}
      //           </div>
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col>
      //           <p className="desc-player mt-5">{currentPodcast.desc}</p>
      //         </Col>
      //       </Row>
      //     </Container>
      //   </Container>
      //   <PlayerBar />
      // </div>
      <Container className="player d-flex justify-content-center align-items-center overflow-hidden" fluid>
        <Container>
          <Row>
            <Col md={8} >
              <Container className="p-0">
                <Row>
                  <Col id="player-title-player" className="title-player" align="right">
                    <p>podcast en cours</p>
                    <h2>{decode(currentPodcast.podcast)}</h2>
                    <h3>{decode(currentPodcast.title)}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col align="center">
                    <div id="cover-box" className="w-50">
                      {/* <div className="cover-before"></div> */}
                      {listPodcast[currentIndex - 1] && <img src={decode(listPodcast[currentIndex - 1].cover)} className="cover-before" />}
                      <div className="cover-now w-100">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                          <img src={decode(currentPodcast.cover)} className="w-100" />
                          {/* <div className="rounded-circle w-25 h-25 bg-dark">
                            <PlayFill size={96} />
                          </div> */}
                        </div>
                      </div>
                      {/* <div className="cover-after"></div> */}
                      {listPodcast[currentIndex + 1] && <img src={decode(listPodcast[currentIndex + 1].cover)} className="cover-after" />}
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col md={4} className="d-flex align-items-end mt-4">
              <Container className="p-0">
                <Row>
                  <Col id="player-title-commentary" className="title-msg align-self-end">
                    <h2>Discussions</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div id="max-h-child" className="overflow-auto">
                      {items}
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="desc-player mt-5">{decode(currentPodcast.description)}</p>
            </Col>
          </Row>
        </Container>
        {listPodcast && Array.isArray(listPodcast) && listPodcast.length > 0 && currentPodcast && <PlayerBar />}
      </Container>
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


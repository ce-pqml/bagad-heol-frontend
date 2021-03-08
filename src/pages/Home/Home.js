import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as podcastActions from '../../redux/podcast/actions';
import { Link } from 'react-router-dom';
import BtnLiquid from '../../components/Button/BtnLiquid';
import logo from '../../assets/img/logo_bagad_heol.jpg';
import home_1 from '../../assets/img-home/home-1.jpg';
import home_3 from '../../assets/img-home/home-3.JPG';
import home_4 from '../../assets/img-home/home-4.JPG';
import home_5 from '../../assets/img-home/home-5.JPG';
import home_6 from '../../assets/img-home/home-6.JPG';
import home_7 from '../../assets/img-home/home-7.JPG';

import { Container, Row, Col, Image } from 'react-bootstrap';

export class Home extends Component {
  static propTypes = {
    podcast: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // this.props.actions.fetchRedditList();
  }

  render() {
    let arrayImg = [
      {img: home_1, x: '-80%', y: '0', height: '100%'},
      {img: home_3, x: '-70%', y: '0', height: '100%'},
      {img: home_4, x: '-70%', y: '10%', height: '100%'},
      {img: home_5, x: '-80%', y: '0', height: '100%'},
      {img: home_6, x: '-50%', y: '0', height: '100%'},
      {img: home_7, x: '-30%', y: '10%', height: '80%'}
    ]
    let i = Math.floor(Math.random() * 5);
    console.log(i, arrayImg[i])

    return (
      <Container className="home bg-bagad-heol" fluid>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Container className="screen screen-1" fluid>
          <Row>
            <Col className="text-center">
              <h1><span>BAGAD</span><br />HEOL</h1>
              <p className="text-justify mt-5">Des discussions, des amis, de l'humour, des jeux et plein d'autres moment !
                Rassemblez-vous autour d'une bonne tranche bretonne, à partager au chaud ou dans le froid,
                dehors, dans les transports ou dans le lit !
              </p>
              <BtnLiquid text="Player" action="/player" svg={
                <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.752 58.752" width="2em" height="2em" fill="currentColor">
                  <path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
                    c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
                    c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
                    c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
                    c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
                  C49.663,29.47,49.611,29.561,49.524,29.612z"/>
                </svg>
              }/>

              {/* <div className="buttons d-none">
                <Link to="/player" className="blob-btn">
                  <span>Player</span>
                  <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.752 58.752" width="2em" height="2em" fill="currentColor">
                    <path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
                      c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
                      c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
                      c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
                      c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
                    C49.663,29.47,49.611,29.561,49.524,29.612z"/>
                  </svg>
                  <span className="blob-btn__inner">
                    <span className="blob-btn__blobs">
                      <span className="blob-btn__blob"></span>
                      <span className="blob-btn__blob"></span>
                      <span className="blob-btn__blob"></span>
                      <span className="blob-btn__blob"></span>
                    </span>
                  </span>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="d-none">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div> */}
            </Col>
            <Col className="podcast-img-svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 871.45 1298.15">
                <defs>
                  <pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">
                    <image href={arrayImg[i].img} x={arrayImg[i].x} y={arrayImg[i].y} height={arrayImg[i].height} />
                  </pattern>
                </defs>
                <path 
                  className="img-svg-form" 
                  d="M374.45,95.64c-2.81,38.4,63.75,47.51,83.12,116.8,14.59,52.2-5,112-33.95,148.68C344.92,461,207.29,377.41,102.84,458.3-10.25,545.86-36.22,788.86,58.35,914.88c75.94,101.18,219.46,113.44,236.49,224.78,6.4,41.88-11.49,56,2.34,84.29,44.6,91.38,309.29,105.74,387.51-2.34,55.83-77.13-31.84-149.59,19.9-296.19,42-119.11,121.43-132.27,117.08-213.08C816.08,608.79,683.35,586.65,687,499.27c3.67-86.84,136-95,174.44-225.95,3.63-12.38,28.61-102.55-21.07-177.68C792,22.42,703.65,10.33,657.76,4.05,526.33-13.94,378.55,39.45,374.45,95.64Z"
                  fill="url(#img1)"/>
              </svg>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col><h2>Les podcats du moment</h2></Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col><h2>Les coups de coeurs de la communauté</h2></Col>
          </Row>          
        </Container>
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
)(Home);


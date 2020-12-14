import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ArrowRightShort, PlayFill, SkipEndFill, SkipStartFill } from 'react-bootstrap-icons';
import * as exampleActions from '../../redux/example/actions';

import music from '../../assets/music/charles_ludig_victoire.mp3';

export class PlayerBar extends Component {
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
        'podcast': 'Bagad Heol',
        'title': '#01 - L\'Avenir nous tend les bras',
        'desc': 'Aujourd\'hui on parle de la Bretagne après Covid mais surtout on découvre les bruits de l\'océan à des fins humoristiques.'
      },
      timebar:{
        isMouseDown: false,
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),
      }
    };
  }

  componentDidMount() {
    let {isMouseDown, select, bar, pastBar} = this.state.timebar;
    let audio = new Audio(this.state.podcast.url);

    // let select = document.getElementById('timecode-select');
    // let bar = document.getElementById('timecode-bar');
    // let pastBar = document.getElementById('timecode-past');
    // let width = select.getBoundingClientRect().left - bar.getBoundingClientRect().left + (select.getBoundingClientRect().width / 2); //en PX
    let width = (select.getBoundingClientRect().left - bar.getBoundingClientRect().left + (select.getBoundingClientRect().width / 2)) / bar.getBoundingClientRect().width * 100;
    pastBar.style.width = width + '%';

    let isDown = false;
    let mousePositionX;
    let offsetX = 0;
    let limit = [0, bar.getBoundingClientRect().width]; //pour le PX
    select.addEventListener('mousedown', function(e) {
      isDown = true;
      offsetX = select.offsetLeft - e.clientX;
    }, true);
  
    //click timecode
    bar.addEventListener('mousedown', function(e) {
      isDown = true;
      // let leftClicked = e.clientX - bar.getBoundingClientRect().left; //en PX
      let leftClicked = (e.clientX - bar.getBoundingClientRect().left) / bar.getBoundingClientRect().width * 100;
      if (leftClicked >= 0 && leftClicked <= 100) {
        select.style.left = leftClicked + '%';
        document.getElementById('timecode-past').style.width = leftClicked + '%';
      }
      offsetX = select.offsetLeft - e.clientX;
    }, true);

    //drag select timecode
    document.addEventListener('mousemove', function(e) {
      e.preventDefault();
      if (isDown) {
        mousePositionX = e.clientX;
        let width = (offsetX + mousePositionX) / bar.getBoundingClientRect().width * 100;

        if (width >= 0 && width <= 100) {
          select.style.left = width + '%';
          document.getElementById('timecode-past').style.width = width + '%';
        }

        // if ((mousePositionX + offsetX) >= limit[0] && (mousePositionX + offsetX) <= limit[1]) {
        //   select.style.left = (mousePositionX + offsetX) + 'px';
        //   document.getElementById('timecode-past').style.width = (mousePositionX + offsetX) + 'px';
        // }
      }
    }, true);

    document.addEventListener('mouseup', function() {
      if (isDown) {
        let width = (pastBar.getBoundingClientRect().width) / bar.getBoundingClientRect().width * 100;
        let time  = (width / 100) *  audio.duration;
        console.log(document.getElementById('timecode-past').style.width, time, audio.duration);
        audio.currentTime = time;
      }
      isDown = false;
      
      // audio.currentTime = ;
    }, true);

    let played = false;
    document.getElementById('player-bar-play').addEventListener('click', function() {
      if (played) {
        audio.pause();
        played = false;
      } else {
        audio.play();
        window.setInterval(function(){
          if (!isDown) {
            let currentTimeAudio = audio.currentTime / audio.duration * 100;
            select.style.left = currentTimeAudio + '%';
            document.getElementById('timecode-past').style.width = currentTimeAudio + '%';
          }
        }, 500);
        
        played = true;
      }
    }, true);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  };

  render() {
    return (
      <div className="player-bar">
        <div className="player-bar-timecode-box w-100">
          <div id="timecode-bar" className="timecode-bar">
            <div id="timecode-past" className="timecode-past"></div>
            <span id="timecode-select" className="timecode-select"></span>
          </div>
        </div>
        <Container fluid className="player-bar-container">
          <svg style={{width:0,height:0,position:'absolute'}} aria-hidden="true" focusable="false">
            <linearGradient id="gradient-heol" x2="1" y2="1">
              <stop offset="22%" stop-color="rgba(255,51,105,1)" />
              <stop offset="57%" stop-color="rgba(255,122,54,1)" />
              <stop offset="100%" stop-color="rgba(255,219,28,1)" />
            </linearGradient>
          </svg>
          <Row className="h-100">
            <Col md={4} className="h-100"></Col>
            <Col md={4} className="h-100 d-flex justify-content-center align-items-center">
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box">
                <SkipStartFill className="player-bar-btn h-100"/>
              </div>
              <div id="player-bar-play" className="rounded-circle player-bar-btn-play-box">
                <PlayFill className="player-bar-btn-play h-100"/>
              </div>
              <div id="player-bar-next" className="rounded-circle player-bar-btn-box">
                <SkipEndFill className="player-bar-btn h-100"/>
              </div>
            </Col>
            <Col md={4} className="h-100"></Col>
          </Row>
        </Container>
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
)(PlayerBar);


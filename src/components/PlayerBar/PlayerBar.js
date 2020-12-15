import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ArrowRightShort, PlayFill, PauseFill, SkipEndFill, SkipStartFill, VolumeMuteFill, VolumeUpFill, ThreeDots, ArrowCounterclockwise, ArrowClockwise } from 'react-bootstrap-icons';
import * as exampleActions from '../../redux/example/actions';

import music from '../../assets/music/charles_ludig_victoire.mp3';

function BtnPlayPause(props){
  if(props.timebar.played) {
    return (<PauseFill className="player-bar-btn-play h-100"/>)
  } else {
    return(<PlayFill className="player-bar-btn-play h-100"/>)
  }
}

function BtnMute(props){
  if(props.timebar.mute) {
    return (<VolumeMuteFill className="player-bar-btn-mute h-100"/>)
  } else {
    return(<VolumeUpFill className="player-bar-btn-mute h-100"/>)
  }
}

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
        'desc': 'Aujourd\'hui on parle de la Bretagne après Covid mais surtout on découvre les bruits de l\'océan à des fins humoristiques.',
      },
      timebar: {
        audio: new Audio(music),

        isMouseDown: false,
        mousePositionX: null,
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),
        width: null,

        //commande
        played: false,
        mute: false,
      }
    };
  }

  componentDidMount() {
    
    this.setState(prevState => ({
      timebar:{
        ...prevState.timebar,
        // audio: new Audio(this.state.podcast.url),
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),
      }
    }));
    
    const self = this;
    let preAudio = self.state.timebar.audio;
    let duration;
    preAudio.onloadedmetadata = function() {
      self.setState(prevState => ({
        timebar:{
          ...prevState.timebar,
          duration: preAudio.duration
        }
      }));
    };

    //drag select timecode
    document.addEventListener('mousemove', function(e) {
      e.preventDefault();
      let { audio, isMouseDown, mousePositionX, select, bar, pastBar, offsetX } = self.state.timebar;

      if (isMouseDown) {
        self.setState(prevState => ({
          timebar:{
            ...prevState.timebar,
            mousePositionX: e.clientX,
          }
        }));
        let width = (offsetX + mousePositionX) / bar.getBoundingClientRect().width * 100;

        if (width >= 0 && width <= 100) {
          select.style.left = width + '%';
          pastBar.style.width = width + '%';
        }
      }
    }, true);

    //mouse up
    document.addEventListener('mouseup', function() {
      let { audio, isMouseDown, mousePositionX, select, bar, pastBar, offsetX } = self.state.timebar;
      if (isMouseDown) {
        let width = (pastBar.getBoundingClientRect().width) / bar.getBoundingClientRect().width * 100;
        let time  = (width / 100) *  audio.duration;
        audio.currentTime = time;
      }
      self.setState(prevState => ({
        timebar:{
          ...prevState.timebar,
          isMouseDown: false,
        }
      }));
    }, true);
  }

  onMouseDownSelect(e) {
    let { select } = this.state.timebar;
    this.setState(prevState => ({
      timebar: {
        ...prevState.timebar,
        isMouseDown: true,
        offsetX: select.offsetLeft - e.clientX,
      }
    }));
  }

  onMouseDownBar(e){
    let { select, bar, pastBar } = this.state.timebar;
    this.setState(prevState => ({
      timebar: {
        ...prevState.timebar,
        isMouseDown: true,
      }
    }));
    let leftClicked = (e.clientX - bar.getBoundingClientRect().left) / bar.getBoundingClientRect().width * 100;
    if (leftClicked >= 0 && leftClicked <= 100) {
      select.style.left = leftClicked + '%';
      pastBar.style.width = leftClicked + '%';
    }
    this.setState(prevState => ({
      timebar: {
        ...prevState.timebar,
        offsetX: select.offsetLeft - e.clientX,
      }
    }));
  }

  onClickSelectTimeCode(){
    let { audio, played, select, pastBar } = this.state.timebar;
    if (played) {
      audio.pause();
      this.setState(prevState => ({
        timebar: {
          ...prevState.timebar,
          played: false,
        }
      }));
    } else {
      audio.play();
      this.setState(prevState => ({
        timebar: {
          ...prevState.timebar,
          played: true,
        }
      }));

      let intervalTimeCode = setInterval(() => {
        let { isMouseDown } = this.state.timebar;
        this.setState(prevState => ({
          timebar: {
            ...prevState.timebar,
            currentTime: audio.currentTime,
          }
        }));
        if (!isMouseDown) {
          let currentTimeAudio = audio.currentTime / audio.duration * 100;
          select.style.left = currentTimeAudio + '%';
          pastBar.style.width = currentTimeAudio + '%';
        }
      }, 500);
    }
  }

  onClickMuteSound(){
    let { audio, mute } = this.state.timebar;
    if (mute) {
      audio.volume = 1;
      this.setState(prevState => ({
        timebar: {
          ...prevState.timebar,
          mute: false,
        }
      }));
    } else {
      audio.volume = 0;
      this.setState(prevState => ({
        timebar: {
          ...prevState.timebar,
          mute: true,
        }
      }));
    }
  }

  formatTimecode(seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

  
    if (!hours || !minutes || !seconds) {
      return '00:00';
    }

    if (`0${Math.floor(hours)}`.slice(-2) == 0) {
      return [minutes, seconds % 60].map(format).join(':');
    } else {
      return [hours, minutes, seconds % 60].map(format).join(':');
    }
    
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  };

  render() {
    return (
      <div className="player-bar">
        <div className="player-bar-timecode-box w-100">
          <div id="timecode-bar" className="timecode-bar" onMouseDown={(e) => this.onMouseDownBar(e)}>
            <div id="timecode-past" className="timecode-past"></div>
            <span id="timecode-select" className="timecode-select" onMouseDown={(e) => this.onMouseDownSelect(e)}></span>
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
            <Col md={4} className="h-100 player-bar-info d-flex align-items-center" align="left">
              <div className="player-bar-cover mr-3"></div>
              <div>
                <h2>Bagad Heol</h2>
                <h3 className="mb-2">{this.state.podcast.title}</h3>
                <span>{this.formatTimecode(this.state.timebar.currentTime)} / {this.formatTimecode(this.state.timebar.duration)}</span>
              </div>
            </Col>
            <Col md={4} className="h-100 d-flex justify-content-center align-items-center">
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box">
                <ArrowCounterclockwise className="player-bar-btn-little-adv h-100"/>
              </div>
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box ml-3">
                <SkipStartFill className="player-bar-btn h-100"/>
              </div>
              <div id="player-bar-play" className="rounded-circle player-bar-btn-play-box" onMouseDown={(e) => this.onClickSelectTimeCode()}>
                <BtnPlayPause timebar={this.state.timebar}/>
              </div>
              <div id="player-bar-next" className="rounded-circle player-bar-btn-box mr-3">
                <SkipEndFill className="player-bar-btn h-100"/>
              </div>
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box">
                <ArrowClockwise className="player-bar-btn-little-adv h-100"/>
              </div>
            </Col>
            <Col md={4} className="h-100 d-flex justify-content-end align-items-center" align="right">
              <div id="player-bar-mute" className="rounded-circle player-bar-btn-box" onClick={(e) => this.onClickMuteSound()}>
                <BtnMute timebar={this.state.timebar}/>
              </div>
              <div id="player-bar-mute" className="rounded-circle player-bar-btn-box ml-3">
                <ThreeDots className="player-bar-btn-more h-100"/>
              </div>
            </Col>
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


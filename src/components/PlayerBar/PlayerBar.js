import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ArrowRightShort, PlayFill, PauseFill, SkipEndFill, SkipStartFill, VolumeMuteFill, VolumeUpFill, ThreeDots, ArrowCounterclockwise, ArrowClockwise } from 'react-bootstrap-icons';
import * as podcastActions from '../../redux/podcast/actions';

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
    podcast: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timebar: {
        isMouseDown: false,
        mousePositionX: null,
        audio: null,
        currentTime: null,
        duration: null,
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),
        isPausedInterval: false,

        //commande
        played: false,
        mute: false,
      }
    };
  }

  componentWillMount() {
    this.props.actions.setCurrentPodcast(this.props.podcast.listPodcast.slice(-1)[0]);
    this.setState(prevState => ({
      timebar:{
        ...prevState.timebar,
        audio: new Audio(this.props.podcast.listPodcast.slice(-1)[0].url),
      }
    }));
  }

  componentDidMount() {
    this.setState(prevState => ({
      timebar:{
        ...prevState.timebar,
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),
      }
    }));
    
    const self = this;
    let preAudio = self.state.timebar.audio;
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

    this.intervalTimeCode();
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

  onClickPrev(){
    let currentIndex = this.props.podcast.listPodcast.findIndex(element => element.id == this.props.podcast.currentPodcast.id);
    if (this.props.podcast.listPodcast[currentIndex - 1]) {
      let prevPodcast = this.props.podcast.listPodcast[currentIndex - 1];
      let { audio, mute, intervalTimeCode } = this.state.timebar;
      audio.pause();
      this.props.actions.setCurrentPodcast(prevPodcast)
      // clearInterval(intervalTimeCode);

      let prevAudio = new Audio(prevPodcast.url);
      prevAudio.onloadedmetadata = () => {
        this.setState(prevState => ({
          timebar:{
            ...prevState.timebar,
            audio: prevAudio,
            duration: prevAudio.duration,
            played: true,
          }
        }));
        if (mute) {
          prevAudio.volume = 0;
        }
        prevAudio.play();
      };

      this.intervalTimeCode();
    }
  }

  onClickNext(){
    let currentIndex = this.props.podcast.listPodcast.findIndex(element => element.id == this.props.podcast.currentPodcast.id);
    if (this.props.podcast.listPodcast[currentIndex + 1]) {
      let nextPodcast = this.props.podcast.listPodcast[currentIndex + 1];
      let { audio, mute, intervalTimeCode } = this.state.timebar;
      audio.pause();
      this.props.actions.setCurrentPodcast(nextPodcast)
      // clearInterval(intervalTimeCode);

      let nextAudio = new Audio(nextPodcast.url);
      nextAudio.onloadedmetadata = () => {
        this.setState(prevState => ({
          timebar:{
            ...prevState.timebar,
            audio: nextAudio,
            duration: nextAudio.duration,
            played: true,
          }
        }));
        if (mute) {
          nextAudio.volume = 0;
        }
        nextAudio.play();
      };

      this.intervalTimeCode();
    }
  }

  intervalTimeCode() {
    let intervalTimeCode = setInterval(() => {
      let { isMouseDown, isPausedInterval } = this.state.timebar;
      if (!isPausedInterval) {
        let { audio, select, pastBar } = this.state.timebar;
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
      }
    }, 1); //500 TODO: Valider la valeur
    this.setState(prevState => ({
      timebar:{
        ...prevState.timebar,
        intervalTimeCode: intervalTimeCode,
      }
    }));
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

  render() {
    let {listPodcast, currentPodcast} = this.props.podcast;

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
              {/* <div className="player-bar-cover mr-3"></div> */}
              <img src={this.props.podcast.currentPodcast.img} className="player-bar-cover mr-3" />
              <div>
                <h2>Bagad Heol</h2>
                <h3 className="mb-2">{this.props.podcast.currentPodcast.title}</h3>
                <span>{this.formatTimecode(this.state.timebar.currentTime)} / {this.formatTimecode(this.state.timebar.duration)}</span>
              </div>
            </Col>
            <Col md={4} className="h-100 d-flex justify-content-center align-items-center">
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box">
                <ArrowCounterclockwise className="player-bar-btn-little-adv h-100"/>
              </div>
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box ml-3" onClick={(e) => this.onClickPrev()}>
                <SkipStartFill className="player-bar-btn h-100"/>
              </div>
              <div id="player-bar-play" className="rounded-circle player-bar-btn-play-box" onMouseDown={(e) => this.onClickSelectTimeCode()}>
                <BtnPlayPause timebar={this.state.timebar}/>
              </div>
              <div id="player-bar-next" className="rounded-circle player-bar-btn-box mr-3" onClick={(e) => this.onClickNext()}>
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
              <div className="player-bar-sound-box w-100">
                <div id="sound-bar" className="sound-bar">
                  <div id="sound-past" className="sound-past"></div>
                  <span id="sound-select" className="sound-select"></span>
                </div>
              </div>
              {/* <div id="player-bar-mute" className="rounded-circle player-bar-btn-box ml-3">
                <ThreeDots className="player-bar-btn-more h-100"/>
              </div> */}
            </Col>
          </Row>
        </Container>
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
)(PlayerBar);


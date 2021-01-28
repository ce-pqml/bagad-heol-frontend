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
        isMouseDownOnSound: false,
        mousePositionX: null,
        audio: null,
        currentTime: null,
        duration: null,

        //timebar
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),

        //soundbar
        soundSelect: document.getElementById('sound-select'),
        soundBar: document.getElementById('sound-bar'),
        soundPastBar: document.getElementById('sound-past'),

        isPausedInterval: false,

        //commande
        played: false,
        mute: false,
        volume: 0.5,
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
        //timebar
        select: document.getElementById('timecode-select'),
        bar: document.getElementById('timecode-bar'),
        pastBar: document.getElementById('timecode-past'),
        //soundbar
        soundSelect: document.getElementById('sound-select'),
        soundBar: document.getElementById('sound-bar'),
        soundPastBar: document.getElementById('sound-past'),
      }
    }));
    
    const self = this;
    let preAudio = self.state.timebar.audio;

    let startVolume = self.state.timebar.volume;
    let widthSoundStart = startVolume * 100;
    if (widthSoundStart >= 0 && widthSoundStart <= 100) {
      document.getElementById('sound-select').style.left = widthSoundStart + '%';
      document.getElementById('sound-past').style.width = widthSoundStart + '%';
    }

    preAudio.onloadedmetadata = function() {
      if (widthSoundStart >= 0 && widthSoundStart <= 100) {
        preAudio.volume = startVolume;
      }
      self.setState(prevState => ({
        timebar:{
          ...prevState.timebar,
          duration: preAudio.duration
        }
      }));
    };

    //drag select timecode and select volume
    document.addEventListener('mousemove', function(e) {
      e.preventDefault();
      let { isMouseDown, isMouseDownOnSound, mousePositionX, select, bar, pastBar, soundSelect, soundBar, soundPastBar, offsetX } = self.state.timebar;

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

      if (isMouseDownOnSound) {
        self.setState(prevState => ({
          timebar:{
            ...prevState.timebar,
            mousePositionX: e.clientX,
          }
        }));
        let widthSound = (offsetX + mousePositionX) / soundBar.getBoundingClientRect().width * 100;

        if (widthSound >= 0 && widthSound <= 100) {
          soundSelect.style.left = widthSound + '%';
          soundPastBar.style.width = widthSound + '%';
          self.setState(prevState => ({
            timebar:{
              ...prevState.timebar,
              mute: false,
            }
          }));
        }
      }
    }, true);

    //mouse up
    document.addEventListener('mouseup', function() {
      let { audio, isMouseDown, isMouseDownOnSound, bar, pastBar, soundBar, soundPastBar } = self.state.timebar;
      if (isMouseDown) {
        let width = (pastBar.getBoundingClientRect().width) / bar.getBoundingClientRect().width * 100;
        let time  = (width / 100) *  audio.duration;
        audio.currentTime = time;
      }

      if (isMouseDownOnSound) {
        let soundWidth = (soundPastBar.getBoundingClientRect().width) / soundBar.getBoundingClientRect().width * 100;
        let volume = soundWidth / 100;
        audio.volume = volume;
        self.setState(prevState => ({
          timebar:{
            ...prevState.timebar,
            volume: volume
          }
        }));
      }
      self.setState(prevState => ({
        timebar:{
          ...prevState.timebar,
          isMouseDown: false,
          isMouseDownOnSound: false,
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

  onMouseDownSoundSelect(e) {
    let { soundSelect } = this.state.timebar;
    this.setState(prevState => ({
      timebar: {
        ...prevState.timebar,
        isMouseDownOnSound: true,
        offsetX: soundSelect.offsetLeft - e.clientX,
      }
    }));
  }

  onMouseDownSoundBar(e){
    let { soundSelect, soundBar, soundPastBar } = this.state.timebar;
    this.setState(prevState => ({
      timebar: {
        ...prevState.timebar,
        isMouseDownOnSound: true,
      }
    }));
    let leftClicked = (e.clientX - soundBar.getBoundingClientRect().left) / soundBar.getBoundingClientRect().width * 100;
    if (leftClicked >= 0 && leftClicked <= 100) {
      soundSelect.style.left = leftClicked + '%';
      soundPastBar.style.width = leftClicked + '%';
      this.setState(prevState => ({
        timebar:{
          ...prevState.timebar,
          mute: false,
        }
      }));
    }
    this.setState(prevState => ({
      timebar: {
        ...prevState.timebar,
        offsetX: soundSelect.offsetLeft - e.clientX,
      }
    }));
  }

  onClickPlayBtn(){
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
    let { audio, mute, volume } = this.state.timebar;
    if (mute) {
      audio.volume = volume;
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
      let { audio, mute, volume, intervalTimeCode } = this.state.timebar;
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
        } else {
          prevAudio.volume = volume;
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
      let { audio, mute, volume, intervalTimeCode } = this.state.timebar;
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
        } else {
          nextAudio.volume = volume;
        }
        nextAudio.play();
      };

      this.intervalTimeCode();
    }
  }

  onClickPrev15Sec(){
    let { audio } = this.state.timebar;
    audio.currentTime = audio.currentTime - 10;
  }

  onClickNext15Sec(){
    let { audio } = this.state.timebar;
    audio.currentTime = audio.currentTime + 10;
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
              <stop offset="20%" stop-color="#f9d423" />
              <stop offset="35%" stop-color="#fc903a" />
              <stop offset="60.84%" stop-color="#ff4e50" />
            </linearGradient>
          </svg>
          <Row className="player-bar-cmd h-100">
            <Col md={4} className="h-100 player-bar-info d-flex align-items-center" align="left">
              {/* <div className="player-bar-cover mr-3"></div> */}
              <img src={this.props.podcast.currentPodcast.img} className="player-bar-cover mr-3" />
              <div className="player-bar-text-info">
                <h2>Bagad Heol</h2>
                <h3 className="mb-2">{this.props.podcast.currentPodcast.title}</h3>
                <span>{this.formatTimecode(this.state.timebar.currentTime)} / {this.formatTimecode(this.state.timebar.duration)}</span>
              </div>
            </Col>
            <Col md={4} className="h-100 d-flex justify-content-center align-items-center">
              <div id="player-bar-prev-sec" className="rounded-circle player-bar-btn-box" onClick={(e) => this.onClickPrev15Sec()}>
                <ArrowCounterclockwise className="player-bar-btn-little-adv h-100"/>
              </div>
              <div id="player-bar-prev" className="rounded-circle player-bar-btn-box ml-3" onClick={(e) => this.onClickPrev()}>
                <SkipStartFill className="player-bar-btn h-100"/>
              </div>
              <div id="player-bar-play" className="rounded-circle player-bar-btn-play-box" onMouseDown={(e) => this.onClickPlayBtn()}>
                <BtnPlayPause timebar={this.state.timebar}/>
              </div>
              <div id="player-bar-next" className="rounded-circle player-bar-btn-box mr-3" onClick={(e) => this.onClickNext()}>
                <SkipEndFill className="player-bar-btn h-100"/>
              </div>
              <div id="player-bar-next-sec" className="rounded-circle player-bar-btn-box" onClick={(e) => this.onClickNext15Sec()}>
                <ArrowClockwise className="player-bar-btn-little-adv h-100"/>
              </div>
            </Col>
            <Col md={4} className="player-bar-volume-box h-100 d-flex justify-content-end align-items-center" align="right">
              <div id="player-bar-mute" className="rounded-circle player-bar-btn-box" onClick={(e) => this.onClickMuteSound()}>
                <BtnMute timebar={this.state.timebar}/>
              </div>
              <div className="player-bar-sound-box w-50 pl-3">
                <div id="sound-bar" className="sound-bar" onMouseDown={(e) => this.onMouseDownSoundBar(e)}>
                  <div id="sound-past" className="sound-past"></div>
                  <span id="sound-select" className="sound-select" onMouseDown={(e) => this.onMouseDownSoundSelect(e)}></span>
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


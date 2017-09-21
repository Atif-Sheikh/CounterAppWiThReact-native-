import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

export default class App extends React.Component {
  constructor (){
    super();
    this.state = {
      timeElapesd: null,
      running: false,
      startTime: null,
      laps: []
    }
  }
  startStopButton = () => {
    let style = this.state.running ? Styles.stopButton : Styles.startButton;
    return <TouchableHighlight underlayColor='grey' onPress={this.buttonPress} style={[Styles.button, style]}>
      <Text>{ this.state.running ? 'Stop' : 'Start' }</Text>
    </TouchableHighlight> 
  }
  buttonPress = () => {
    if( this.state.running ){
      clearInterval(this.interval);
      this.setState({running : false});
      return
    }
    this.setState({startTime : new Date()});

    this.interval = setInterval( () => {
      this.setState({
        timeElapesd : new Date() - this.state.startTime,
        running: true
      });
    }, 30)
  }

  LapButton = () => {
    return <TouchableHighlight style={Styles.button} underlayColor='grey' onPress={this.lapPress}>
      <Text>Lap</Text>
    </TouchableHighlight> 
  }

  lapPress = () => {
    let lap = this.state.timeElapesd;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    })
  }
  laps = () => {
    return this.state.laps.map((lap, index)=> {
      return <View key={lap} style={Styles.lap}>
        <Text style={Styles.lapText}>Lap #{index + 1}</Text>
        <Text style={Styles.lapText}>{formatTime(lap)}</Text>
      </View>
    });
  }
  
  render() {
      return (
        <View style={Styles.container}>
          <View style={Styles.Header}>
            <View style={Styles.timmerDiv}>
              <Text style={Styles.timer}>{ formatTime(this.state.timeElapesd) }</Text>
            </View>
            <View style={Styles.buttonDiv}> 
              {this.startStopButton()}
              {this.LapButton()}
            </View>
          </View>
          <View style={Styles.Footer}> 
            {this.laps()}
          </View>
        </View>
      );
    }
  }

  const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch'
    },
    Header: {
      flex: 1
    },
    Footer: {
      flex: 1
    },
    timmerDiv: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonDiv: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    timer: {
      fontSize: 60
    },
    button: {
      borderWidth: 2,
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    startButton: {
      borderColor: '#00CC00'
    },
    stopButton: {
      borderColor: '#CC0000'
    },
    lap: {
      justifyContent: 'space-around',
      flexDirection: 'row'
    },
    lapText: {
      fontSize: 30
    }
  })
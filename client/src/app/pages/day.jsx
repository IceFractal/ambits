import React            from 'react';
import {Component}      from 'react';
import * as Utils       from '../utils/utils.js';
import AmbitList        from './day/ambitList.jsx';
import {deepOrange500}  from 'material-ui/styles/colors';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar         from 'material-ui/Snackbar';
import {Router, Route, Link}
                        from 'react-router';
import Flatbutton     from 'material-ui/FlatButton';

// Redux
import { connect }      from 'react-redux';
import { loadAmbits, updateAmbit, updateTitle, updateCurBit }
                        from '../_actions/ambit-actions';


//styling
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const createStyle = {
  color: 'white',
  backgroundColor:'#ff520e',
  'marginTop': '6px',
  paddingTop: '8px',
  height: '50px',
  fontSize: '20px',
  width: '100%',
  borderRadius: '0px',
  position: 'fixed',
  bottom: '0',
};

const spacer = {
  height: '50px',
};

const spinnerStyle  = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const userFeedback = {
  default: '',
  cheat:'Not at the Location',
  geoNotFount: 'Geolocation feature is not enabled',
  successfulCheckin: 'Check in successful',
  checkInternetConnection:'Cannot fetch ambits:( Check internet connection'  
};


class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      feedback: {
        open: false,
        autoHideDuration: 3000,
        message: userFeedback.default
      }
    };
    this.handleCheckinAmbit = this.handleCheckinAmbit.bind(this);
    
  }
  
  componentDidMount() {
    Utils.getAllAmbits((data, error) => {
      if(error) {
        //send user feedback: no connection
      } else {
        this.props.dispatch(loadAmbits(data));
      }
    });
    this.props.dispatch(updateTitle(this.state.days[this.props.day]));
  }

  getAmbits() {
    Utils.getAllAmbits((data) => {
      this.props.dispatch(loadAmbits(data));
    });
  }

  handleCheckinAmbit(ambit) {
    this.setState({loading: true}); //loading...
    //validate checkin:
    Utils.checkinAmbit(ambit, () => {
      //if valid update the state
      ambit.checkedIn = true;
      this.props.dispatch(updateAmbit(ambit));
      this.setState({
        loading:  false,
        feedback: {open: true, message: userFeedback.successfulCheckin}
      });
      //update the database
      Utils.postCheckin(ambit.refId, () => {
        console.log('delivered');
      });
    }, ()=>{
      //you can't cheat message:
      this.setState({
        loading: false,
        feedback: {
          open: true,
          message:userFeedback.cheat
        }
      });
    });
  }
  
  handleViewAmbit(ambit) {
    this.props.dispatch(updateCurBit(ambit));
  }

//  handleShowStats() {}

  render() {
    if(!this.state.loading) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AmbitList 
              ambits={this.props.ambits.filter(ambit => (ambit.weekdays[this.props.day]))}
              handleCheckinAmbit={this.handleCheckinAmbit}
              handleViewAmbit={this.handleViewAmbit.bind(this)}
            />
            
            <Flatbutton 
              // onTouchTap={this.handleCreateAmbit} 
              style={createStyle}
              containerElement={<Link to='/map'/>}
            >Create Ambit</Flatbutton>
            
            <div style={spacer}></div>
            
            <Snackbar
              open={this.state.feedback.open}
              message={this.state.feedback.message}
              autoHideDuration={this.state.feedback.autoHideDuration}
              bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            />
          </div>
        </MuiThemeProvider>
      );
    } else {
      return (
        <div>
          <CircularProgress size={60} thickness={7} style={spinnerStyle}/>
        </div>
      );
    }
  }
};


const mapStateToProps = (state) => ({
  ambits: state.ambits,
  day:    state.day
});

Day = connect(mapStateToProps)(Day);


export default Day;

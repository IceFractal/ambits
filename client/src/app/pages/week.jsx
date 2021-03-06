import React              from 'react';
import { Component }      from 'react';
import WeekList           from './week/weekList.jsx';
import { getAllAmbits }   from '../utils/utils'

// Redux
import { connect }      from 'react-redux';
import { loadAmbits, updateTitle, updateCurDay }
                        from '../_actions/ambit-actions';

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date().getDay(),
      ambits: [],
      days: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
    }
  }

  componentDidMount() {
    getAllAmbits((data, error) => {
      if(error) {
        throw error;
      } else {       
        this.props.dispatch(loadAmbits(data));
      }
    });
    this.props.dispatch(updateTitle('Week View'));
  }

  sortAmbitsByDay (ambits) {
    var sortedAmbits = [[], [], [], [], [], [], []];
    ambits.forEach(function(ambit) {
      var days = ambit.weekdays;
      days.forEach(function (hasAmbit, day) {
        if (hasAmbit) {
          sortedAmbits[day].push(ambit);
        }
      });
    });
    return sortedAmbits;
  }

  handleDayClick(day) {
    this.props.dispatch(updateCurDay(day));
  }

  //clickHandler here for clicks on the Day component

  //clickHandler here for clicks on the Ambit component

  render() {
    var counter = 0;
    var dayOfTheWeek = this.state.today;
    var sortedDays = [];
    var sortedAmbitsByDay = this.sortAmbitsByDay(this.props.ambits);
    var sortedAmbitsByCurrentDay = [];

    while (counter < 7) {
      var day = {
        day: this.state.days[dayOfTheWeek],
        number: dayOfTheWeek
      };
      sortedDays.push(day);
      sortedAmbitsByCurrentDay.push(sortedAmbitsByDay[dayOfTheWeek]);
      dayOfTheWeek === 6 ? dayOfTheWeek = 0 : dayOfTheWeek ++;
      counter ++;
    }

    return (    
        <WeekList days={sortedDays} ambits={sortedAmbitsByCurrentDay} handleDayClick={this.handleDayClick.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => ({
  ambits: state.ambits
});

Week = connect(mapStateToProps)(Week);

export default Week;

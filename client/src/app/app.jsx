// React
import React            from 'react';
import {render}         from 'react-dom';
import {Router, Route, Link, browserHistory}
                        from 'react-router';

// Tap Event Plugin
import injectTapEventPlugin
                        from 'react-tap-event-plugin';

// Routes
import Main             from './Main.jsx'; // Our custom react components

import CheckinContainer from './checkin/components/checkinContainer.jsx';
import Schedule         from './schedule/components/schedule.jsx'
import Map              from './map/map.jsx';
import Display          from './displayAmbit/displayAmbit.jsx';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
  //React-Router with nested routes
  <Router history={browserHistory}>
    <Route component={Main}>

      <Route path='/'         component={CheckinContainer}/>
      <Route path='/schedule' component={Schedule}/>
      <Route path='/map'      component={Map}/>
      <Route path='/display'  component={Display}/>
    </Route>
  </Router>,
  document.getElementById('app')
);

/* global moment */
/* global gapi */
/* global Chart */
import React, { Component } from 'react';

class  chart extends Component {

 
     componentWillMount() {
      

     }
                      

    render() {
        
      
        return (
              <div>
                <h1>Hello Analytics Reporting API V4</h1>
  <p className="g-signin2" data-onsuccess="queryReports"></p>
<textarea cols="80" rows="20" id="query-output"></textarea>

  <div id="embed-api-auth-container"></div>
  <div id="view-selector-container"></div>
  <div id="view-name"></div>
  <div id="active-users-container"></div>

<div id="chart-container"></div>
<div id="view-selector-container"></div>

<div className="Chartjs">
  <h3>This Week vs Last Week (by sessions)</h3>
  <figure className="Chartjs-figure" id="chart-1-container"></figure>
  <ol className="Chartjs-legend" id="legend-1-container"></ol>
</div>
<div className="Chartjs">
  <h3>This Year vs Last Year (by users)</h3>
  <figure className="Chartjs-figure" id="chart-2-container"></figure>
  <ol className="Chartjs-legend" id="legend-2-container"></ol>
</div>
<div className="Chartjs">
  <h3>Top Browsers (by pageview)</h3>
  <figure className="Chartjs-figure" id="chart-3-container"></figure>
  <ol className="Chartjs-legend" id="legend-3-container"></ol>
</div>
<div className="Chartjs">
  <h3>Top Countries (by sessions)</h3>
  <figure className="Chartjs-figure" id="chart-4-container"></figure>
  <ol className="Chartjs-legend" id="legend-4-container"></ol>
</div>

     </div>
        

        )
    }

}


export default chart;

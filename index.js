// You can import API functions like this from D3.js.
import { 
  select, 
  csv,
  event,
  range,
  brushX,
  timeParse, 
  timeFormat,
  scaleOrdinal
} from 'd3';

//import { displayChart } from './displayChart';
import { brushChart } from './brushChart';
import { leastSquares } from './Regression';
import { colorLegend } from './colorLegend';
import { hist } from './histogramChart';
const parseDate = timeParse("%d/%m/%Y");
const parseEFDate = timeParse("%m/%y");
const formatDate = timeFormat("%b %Y");

let data = [];
let EFData = [];

let brushCoords = null;
let filteredData = null;
let trendline = null;


const colorScale = scaleOrdinal()
  .domain([
    'Effective Rainfall',
    'Observation well 2 deep', 
    'Observation well 2 shallow', 
    'Regreesion Line'
  ])
  .range(['#60bfff','orange', 'blue', 'red']);

const svg0 = select('#legend');
const svg1 = select('#main-chart');
const svg2 = select('#brush-chart');

svg0.append('g')
  .attr('transform', `translate(80,20)`)
  .call(colorLegend,({
    colorScale,
    circleRadius: 7,
    spacing: 17,
    textOffset: 15
  })
);

const render = () => {
  brushChart(svg1, {
    width: +svg1.attr('width'),
    height: +svg1.attr('height'),
    data,
    titleText: "",
    titleXAdjust: 130,
    titleYAdjust: 20,
    colorValue: d => d.wl,
    circleRadius: 2,
    xAxisLabel: 'Date',
    yAxisLabel: 'Water Level',
    xScaleDomain: brushCoords,
    trendline
  });
  
    hist(svg1,{
    width: +svg1.attr('width'),
    height: +svg1.attr('height'),
    xScaleDomain: brushCoords,
    EFData,
    xValue: d => d.Date,
    yValue: d => d.EffectiveRainfall
  });
  
  brushChart(svg2, {
    width: +svg2.attr('width'),
    height: +svg2.attr('height'),
    data,
    colorValue: d => d.wl,
    circleRadius: 2,
    xAxisLabel: 'Date',
    yAxisLabel: 'Water Level',
    setBrushCoords: coords => {
      brushCoords = coords;
      filteredData = data
        .filter(d => d.Date >= brushCoords[0] && d.Date <= brushCoords[1]);
      trendline = leastSquares(filteredData);
      render();
    }
  })
}

const wls =["OW2DWL", "OW2DSWL"];
csv('./monthlyViz.csv')
  .then(loadedData => {
  loadedData.forEach(row => {
    wls.forEach(wl => {
    if(row[wl]!==undefined && row[wl] > 0){
    data.push({
			Date:parseDate(row.Date),
      wl,
      value: +row[wl]
    	})
    }})
  })
});

csv('./MonthlyER.csv')
  .then(loadedEFData => {
  loadedEFData.forEach(row =>
    EFData.push({
    Date: parseEFDate(row.Date),
    EffectiveRainfall: +row.EffectiveRainfall
    }))
});


setTimeout(()=>{
	render();
}, 1000)
import { 
  select, 
  csv,
  event,
  brushX,
  max,
  range,
  format,
  scaleLinear, 
  scaleTime,
  scaleOrdinal,
  schemeCategory10,
  timeParse, 
  timeFormat, 
  extent,
  axisLeft,
  axisBottom,
  line,
  nest
} from 'd3';

export const brushChart = (selection,props) => {
  const {
    width,
    height,
    xValue,
    yValue,
    xAxisLabel,
    yAxisLabel,
    colorValue,
    setBrushCoords,
    xScaleDomain,
    trendline,
    titleText,
    titleXAdjust,
    titleYAdjust
  } = props;
  
  const margin = { top: 20, bottom: 30, right: 50, left:50};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const decimalFormat = format("0.4f");
  
  let { data } = props;
  const yScale = scaleLinear()
    .domain(extent(data, d => d.value))
    .range([innerHeight, 0]);

  const xScale = scaleTime()
    .domain(
      xScaleDomain
        ? xScaleDomain
        : extent(data, d => d.Date)
    )
    .range([0, innerWidth]);
  
  const colorScale = scaleOrdinal()
    .domain(['OW2DWL', 'OW2DSWL'])
    .range(['orange', 'blue']);
  
  let g = selection.selectAll('.container').data([null]);
  g = g.enter().append('g').attr('class', 'container')
    .merge(g)
      .attr('transform', `translate(${margin.left},${margin.top})`);
     
  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale);  
   
  const lineGenerator = line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.value));
  
  const nested = nest()
    .key(colorValue)
    .entries(data);
 
  colorScale.domain(nested.map(d => d.key));
  
  const yAxisG = g.selectAll('.y-axis').data([null]);
  yAxisG.enter().append('g').attr('class', 'y-axis')
    .merge(yAxisG)
      .call(yAxis)
  		.append('text')
  		.attr('class', 'yAxisRight-label')
  		.attr('x', 50)
  		.attr('y', -7)
  		.text(yAxisLabel)
  		.attr('font-size', '15px');
  
  const xAxisG = g.selectAll('.x-axis').data([null]);
  xAxisG.enter().append('g').attr('class', 'x-axis')
    .merge(xAxisG)
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
  		.append('text')
  		.attr('class', 'xAxisBottom-label')
  		.attr('x', -15)
  		.attr('y', 16)
  		.text(xAxisLabel)
  		.attr('font-size', '15px');
  
  const title = g.selectAll('.title').data([null]);
  title.enter().append('text')
    .attr('class', 'title')
    .attr('y', titleYAdjust)
    .attr('x', titleXAdjust)
    .text(titleText);
  
  const linePath = g.selectAll('.line-path').data(nested);
  linePath
    .enter().append('path')
      .attr('class', 'line-path')
    .merge(linePath)
      .attr('d', d => lineGenerator(d.values))
      .attr('stroke', d => colorScale(d.key));
  
  
  if(trendline){
    const trendlineBrush = g.selectAll('.trendline').data(trendline);
    trendlineBrush.enter().append('line').attr('class', 'trendline')
     .merge(trendlineBrush)
      .attr('x1', d=> xScale(d[0]))
      .attr('y1', d=> yScale(d[1]))
      .attr('x2', d=> xScale(d[2]))
      .attr('y2', d=> yScale(d[3]));
  
     const trendlineText = g.selectAll('.text-label').data(trendline);
     trendlineText.enter().append('text').attr('class', 'text-label')
       .attr("x", d => 0)
			 .attr("y", d => innerHeight/2)
		     .merge(trendlineText)
           .attr('transform', `translate(${0},${160})`)
           .text(d => `Eq: ${decimalFormat(d[4])}x 
													 ${decimalFormat(d[5]) >= 0 
                             ? ' + ' 
                             : '  '}${decimalFormat(d[5])}`)
    
  }
  
  const brushed = () => {
    if (event.selection) {
      setBrushCoords(event.selection.map(xScale.invert));
    }
  }
 
  
  const brush = brushX()
    .extent([[0,0], [innerWidth,innerHeight]])
    .on("brush end", brushed);
  
  if (setBrushCoords) {
    g.call(brush);
  }
  
}
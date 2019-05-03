import { select, 
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  extent,
  axisRight,
  axisBottom
} from 'd3';

export const hist =(selection, props) => {
const {
width,
height,
xValue,
yValue,
xScaleDomain
} = props;

const margin = { top: 20, bottom: 30, right: 50, left:50};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let { EFData } = props;
const yScaleB = scaleLinear()
.domain(extent(EFData, yValue))
.range([0, innerHeight]);

const xScale = scaleTime()
.domain(
xScaleDomain
? xScaleDomain
: extent(EFData, d => d.Date)
)
.range([0, innerWidth]);


const yAxisB = axisRight(yScaleB);
const xAxis = axisBottom(xScale);  
let g = selection.selectAll('.container').data([null]);
g = g.enter().append('g').attr('class', 'container')
.merge(g)
.attr('transform', `translate(${margin.left},${margin.top})`);

const yAxisGB = g.selectAll('.y-axisb').data([null]);
yAxisGB.enter().append('g').attr('class', 'y-axisb')
.merge(yAxisGB)
.attr('transform', `translate(${innerWidth}, 0)`)
.call(yAxisB);

const xAxisG = g.selectAll('.x-axis').data([null]);
xAxisG.enter().append('g').attr('class', 'x-axis')
.merge(xAxisG)
.attr('transform', `translate(0,${innerHeight})`)
.call(xAxis);

selection.selectAll('defs').data([null])
.enter().append("defs")
.append("clipPath")
.attr("id", "clip")
.append("rect")
.attr("width", innerWidth)
.attr("height", innerHeight);

const rectBars = g.selectAll('rect').data(EFData);
rectBars 
.enter()
.append('rect')
.attr('class', 'bars')
.merge(rectBars)
.attr('height', d => yScaleB(yValue(d)))
.attr('x', d => xScale(xValue(d)))
.attr('y', d => 0)
.attr('width', 5);

rectBars.exit().remove()

}
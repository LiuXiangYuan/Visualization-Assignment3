export const colorLegend = (selection, props) => {
  const { 
    colorScale, 
    height, 
    circleRadius,
    spacing,
    textOffset
  } = props;
  
  const groups = selection.selectAll('g')
    .data(colorScale.domain());
  const groupsEnter = groups.enter().append('g')
    .attr('transform', (d, i) => 
          `translate(0, ${i * spacing})`);
  groupsEnter
    .merge(groups);
  groups.exit().remove();
  
  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', circleRadius)
      .attr('fill', colorScale);
  
  groupsEnter.append('text')
    .attr('class','legend-text')
    .merge(groups.select('text'))
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', textOffset);
}
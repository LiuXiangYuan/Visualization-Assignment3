import { range } from 'd3';

export const leastSquares = (data) => {
    const xValue = d => d.Date;
    const yValue = d => d.value;
    const xDates = data.map(xValue);
		const xSeries = range(1, xDates.length +1);
    const x1 = xDates[0];
    const x2 = xDates[xDates.length - 1];
   	const ySeries = data.map(yValue);

    const reduceSumFunc = (prev, cur) => prev + cur;
		
		const xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
		const yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

		const ssXX = xSeries.map(d => Math.pow(d - xBar, 2))
			.reduce(reduceSumFunc);
		
		const ssYY = ySeries.map(d => Math.pow(d - yBar, 2))
			.reduce(reduceSumFunc);
			
		const ssXY = xSeries.map((d, i) => (d - xBar) * (ySeries[i] - yBar))
			.reduce(reduceSumFunc);
			
		const slope = ssXY / ssXX;
		const intercept = yBar - (xBar * slope);
		const rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
    const xSeriesLength = xSeries.length;
    const y1 = slope + intercept;
	  const y2 = slope * xSeriesLength + intercept;
    const trendData = [[x1,y1,x2,y2,slope,intercept,rSquare]];
		
		return trendData;
	}
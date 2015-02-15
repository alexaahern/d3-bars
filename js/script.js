var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
//This variable sets the margin for the chart

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
//this variable orders on a scale of ordinal values. rangeRoundBands set the values at the same range as the "band width"

var y = d3.scale.linear()
    .range([height, 0]);
//this variable set the linear scale with a range x equal to the height

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
//the variable set for the x axis and connects it to the x-scale and the .orient orients the axis to the bottom or below the actual chart.

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");
    .tickFormat(function(d) {
      return d;
    });

//this variable does the same as before but for the y axis, drawn vertically and orients it to the left and adds tick marks, which is a function that returns the tick marks as the data (?)

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/baseball.json", function(error, data) {
//Here we selct the div called "chart" and append it to the page with the attibutes as they were set in the variable at the top of the page plus the margin sizes. Then we append element g(?) In the browser inspector, this is the big box that encapsulates everything. d3.json calls the data. 

  x.domain(data.stats.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);
 //THis is saying that the x domain is a function that returns a set of years. And the y domain is a function that returns the number of hits (H).

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
//here, the element g groups all the elements and appends it to the x-axis and then calls the x axis. Then again for the y axis. Then it appends some text to that, gives it some attributes, aligns it to the end. 

  svg.selectAll(".bar")
      .data(data.stats)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
      		console.log(d);
      		return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });
  //This creates the bars for the data set. It selects all and makes it a bar and a rectangle. This applies the attributes to the data as a group. The $.each method appends each data individually. 
});

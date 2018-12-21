// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(StateData) {

    
    StateData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(StateData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(StateData, d => d.healthcare)])
      .range([height, 0]);

    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(StateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5")


    // circlesGroup.append("text")
    // // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    // // .attr("class", "axisText")
    // .text("test");

    // texts = circlesGroup.append('text')
    //         .attr('text-anchor', 'middle')
    //         .attr('alignment-baseline', 'middle')
    //         .attr("dx", 12)
    //         .attr("dy", ".35em")
    //         // .style('font-size', d => d.r * 0.4 + 'px')
    //         .attr('fill-opacity', 0)
    //         .attr('fill', 'white')
    //         .text("d => d.abbr")
                
    
    // var textgroup = chartGroup.selectAll("text")
    // .attr("dx", function(d){return -20})
    // .text(function(d){return d.abbr});

    // var text = chartGroup.selectAll("text")
    // .data(StateData)
    // .enter()
    // .append("text");

    // var textLabels = text
    //                .attr("x", function(d) { return d.cx; })
    //                .attr("y", function(d) { return d.cy; })
    //                .text( function (d) { return "( " + d.cx + ", " + d.cy +" )"; })
    //                .attr("font-family", "sans-serif")
    //                .attr("font-size", "20px")
    //                .attr("fill", "red");



    // circlesGroup.append("text")
    //   .attr("x", width - 24)
    //   .attr("y", 9)
    //   .attr("dy", ".35em")
    //   .style("text-anchor", "end")
    //   .text(function(d) { return d.abbr; });



    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty %: ${d.poverty}<br>Lacks HealthCare %: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare %");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Proverty %");
  });

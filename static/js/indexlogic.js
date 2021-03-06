// This function plots a stacked bar chart
function generateStackedChart(data) {

  // Create separate datasets for each sentiment category
  let neg_data = data.filter(object => object.sentiment === 'negative')
  let pos_data = data.filter(object => object.sentiment === 'positive')
  let neu_data = data.filter(object => object.sentiment === 'neutral')

  // Create trace for negative sentiment
  var neg = {
      x: neg_data.map(domain => domain.source),
      y: neg_data.map(domain => domain.count),
      name: 'Negative',
      type: 'bar',
      marker: {color: '#104b6d'}
  };
  
  // Create trace for neutral sentiment
  var neu = {
    x: neu_data.map(domain => domain.source),
    y: neu_data.map(domain => domain.count),
    name: 'Neutral',
    type: 'bar',
    marker: {color: '#a3d2a0'}
  };
  
  // Create trace for positive sentiment
  var pos = {
    x: pos_data.map(domain => domain.source),
    y: pos_data.map(domain => domain.count),
    name: 'Positive',
    type: 'bar',
    marker: {color: '#6f2b6e'}
  };
  
  // Create array of all traces
  var data = [neg, neu, pos];
  
  // Customize layout
  var layout = {title: {text: 'Headline Sentiment'}, barmode: 'stack', bargroupgap: 0.1, xaxis: {tickangle: 35, tickfont: {size: 10}, zeroline: false}};
  
  // Plot chart
  Plotly.newPlot('stacked-chart', data, layout);

};

// Function that puts text into headline generator
function generateHeadline() {
  d3.json("api/randomheadline").then((headline_info) => {
    headline.text(headline_info[0]['title']);
    sentiment.text(headline_info[0]['sentiment']);
    news_source.text(headline_info[0]['source']);
  });
};

// Initialize the plot 
d3.json("api/domainsentiment").then((domain_sent) => {
    generateStackedChart(domain_sent)
});

// Select the headline elements
var headline = d3.select("#headline")
var sentiment = d3.select("#sentiment")
var news_source = d3.select("#source")

// Initialize random headline
generateHeadline()

// Select the headline button
var headline_button = d3.select("#headline-button")

// Create event listener
headline_button.on('click', generateHeadline)


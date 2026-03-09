d3.csv("netflix_titles.csv").then(function(data){
    const counts = d3.rollup(
        data,
        v => v.length,
        d => d.type
    );

    const dataset = Array.from(counts, ([type, count]) => ({type, count}));


    const width = 600;
    const height = 400;
    const margin = 60;

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    // X scale
    const x = d3.scaleBand()
        .domain(dataset.map(d => d.type))
        .range([margin, width - margin])
        .padding(0.4);


    // Y scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.count)])
        .range([height - margin, margin]);


    // Draw bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => x(d.type))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin - y(d.count))
        .attr("fill", "steelblue");

    // x-scale
    svg.append("g")
        .attr("transform", `translate(0,${height - margin})`)
        .call(d3.axisBottom(x));

    // y-scale
    svg.append("g")
        .attr("transform", `translate(${margin},0)`)
        .call(d3.axisLeft(y));

});




d3.csv("netflix_titles.csv").then(function(data){

    // convert year to number
    data.forEach(d => {
        d.release_year = +d.release_year;
    });

    // count titles per year
    const counts = d3.rollups(
        data,
        v => v.length,
        d => d.release_year
    );

    const dataset = counts.map(d => ({
        year: d[0],
        count: d[1]
    })).sort((a,b) => a.year - b.year);


    const width = 700;
    const height = 400;
    const margin = 60;

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    // X scale
    const x = d3.scaleLinear()
        .domain(d3.extent(dataset, d => d.year))
        .range([margin, width - margin]);


    // Y scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.count)])
        .range([height - margin, margin]);


    // line generator
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.count));


    // draw line
    svg.append("path")
        .datum(dataset)
        .attr("fill","none")
        .attr("stroke","steelblue")
        .attr("stroke-width",2)
        .attr("d", line);


    // X axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")));


    // Y axis
    svg.append("g")
        .attr("transform", `translate(${margin},0)`)
        .call(d3.axisLeft(y));

});


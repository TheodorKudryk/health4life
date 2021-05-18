import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Logs.css';
import { selectUserName, selectUserId } from '../login/loginSlice';
import { steps, pulse, allSteps, selectAllSteps } from '../main/mainSlice';
import firebase from 'firebase';
import { axisLeft,
         axisBottom, 
         scaleLinear, 
         scaleBand,
         max,
         ticks,
         extent,
         line,
         scaleTime,
         scaleDivergingPow,
         timeFormat
        } from "d3";
import { transform } from 'typescript';
import { useD3 } from './useD3';
//import steps data from store and pick out relevant values??
// create object { date: n, steps: n} ???

const data = [
    {year: 1980, sales: 25}, 
    {year: 1985, sales: 30}, 
    {year: 1989, sales: 45}, 
    {year: 1999, sales: 60}, 
    {year: 2000, sales: 20}, 
    {year: 2010, sales: 80}, 
    {year: 2017, sales: 25}
    ]

/*
const data = [
    {year: 1980, efficiency: 24.3, sales: 8949000},
    {year: 1985, efficiency: 27.6, sales: 10979000},
    {year: 1990, efficiency: 28, sales: 9303000},
    {year: 1991, efficiency: 28.4, sales: 8185000},
    {year: 1992, efficiency: 27.9, sales: 8213000},
    {year: 1993, efficiency: 28.4, sales: 8518000},
    {year: 1994, efficiency: 28.3, sales: 8991000},
    {year: 1995, efficiency: 28.6, sales: 8620000},
    {year: 1996, efficiency: 28.5, sales: 8479000},
    {year: 1997, efficiency: 28.7, sales: 8217000},
    {year: 1998, efficiency: 28.8, sales: 8085000},
    {year: 1999, efficiency: 28.3, sales: 8638000},
    {year: 2000, efficiency: 28.5, sales: 8778000},
    {year: 2001, efficiency: 28.8, sales: 8352000},
    {year: 2002, efficiency: 29, sales: 8042000},
    {year: 2003, efficiency: 29.5, sales: 7556000},
    {year: 2004, efficiency: 29.5, sales: 7483000},
    {year: 2005, efficiency: 30.3, sales: 7660000},
    {year: 2006, efficiency: 30.1, sales: 7762000},
    {year: 2007, efficiency: 31.2, sales: 7562000},
    {year: 2008, efficiency: 31.5, sales: 6769000},
    {year: 2009, efficiency: 32.9, sales: 5402000},
    {year: 2010, efficiency: 33.9, sales: 5636000},
    {year: 2011, efficiency: 33.1, sales: 6093000},
    {year: 2012, efficiency: 35.3, sales: 7245000},
    {year: 2013, efficiency: 36.4, sales: 7586000},
    {year: 2014, efficiency: 36.5, sales: 7708000},
    {year: 2015, efficiency: 37.2, sales: 7517000},
    {year: 2016, efficiency: 37.7, sales: 6873000},
    {year: 2017, efficiency: 39.4, sales: 6081000},
  ]
*/

/*function getDate(d) {
    return new Date(d)
    
}*/

const Logs = () => {

    const MaxSteps = e => {
        const stepsFromFB = useSelector(selectAllSteps);
        let stepsData = []
    
        for(let months in stepsFromFB){
            //console.log(months, stepsFromFB[months])
            for(let days in stepsFromFB[months]){
                //console.log(months, stepsFromFB[months])
                for(let steps in stepsFromFB[months][days]){
                    //console.log(stepsFromFB[months][days][steps])
                    stepsData.push(stepsFromFB[months][days][steps])
                }
            }
        }

        stepsData.sort((a,b) => {return a-b})

        return(
            <span>{stepsData[stepsData.length -1]}</span>
        )
    
    }

    const stepsFromFB = useSelector(selectAllSteps);
    //const uid = useSelector(selectUserId);
    let stepsData = []
    const today = new Date();

    for(let i = 0; i < 10; i++){
        /*let dateString = today.getFullYear()
            + "-" + (today.getMonth()+1)
            + "-" + today.getDate()*/
        
        //stepsData.push([dateString, snapVal["5"][today.getDate()]])
        stepsData.push({date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), steps: stepsFromFB["2021"]["5"][today.getDate()]})
        today.setDate(today.getDate() -1)
    }
    stepsData = stepsData.filter(d => d.steps !== undefined)

    //console.log(stepsFromFB)
    //console.log(stepsData)

    /*
    firebase.database().ref().child("users/" + uid + "/steps/" + today.getFullYear() + "/" )
            //+ (today.getMonth() + 1) )//+ "/" + (today.getDate()) + "/") // () around func+num is important!!
            .once(
                'value',function(snap){
                    let snapVal = snap.val()
                    console.log(snapVal)
                    for(let i = 0; i < 10; i++){
                        let dateString = today.getFullYear()
                            + "/" + (today.getMonth()+1)
                            + "/" + today.getDate()
                        //stepsData.push([dateString, snapVal["5"][today.getDate()]])
                        stepsData.push({date: dateString, steps: snapVal["5"][today.getDate()]})
                        today.setDate(today.getDate() -1)
                    }
                    stepsData = stepsData.filter(d => d.steps !== undefined)

                    console.log(stepsData)
                    
                }
            )
    */

    

    

    //const svgRef = useRef();
    /* below is d3 with react hooks

    const svgRef = useRef();
    const svg = select(svgRef.current)

    const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, 200]) // 1st value start at px 0, last at 300 (fr l to r)

    const yScale = scaleLinear()
        .domain([0, 80]) // bc input vals in arr go up to 80
        .range([150, 0]); // map first val to bttm ??? (150px from top)
        
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis")
        .style("transform", "translateY(150px)")
        .call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis")
        .style("transform", "translateY(300px)")
        .call(yAxis);

    const myLine = line()
        .x((value, index) => xScale(index))
        .y(yScale) // value => yScale(value)
        .curve(curveCardinal)
        

    svg.selectAll(".line").data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", myLine) // value => myLine(value)
        .attr("fill", "none")
        .attr("stroke", "blue");
    */

    /*firebase.database().ref().child("users/" + uid + "/steps/2021/5")
        .once("value", function(snapshot)){

        }
    var topSteps = stepsRef.orderByValue().limitToFirst(1).getValue();
    console.log(topSteps);*/

    
        /* from d3 scatterplot

    // set the dimensions and margins of the graph
    let margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right, // 370
        height = 400 - margin.top - margin.bottom; // 360

        
    // append the svg object to the body of the page
    let svg = select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    let x = scaleLinear()
        .domain([0, 100])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x));

    // Add Y axis
    let y = scaleLinear()
        .domain([0, 100])
        .range([ height, 0]);
    svg.append("g")
        .call(axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join(
            enter => enter.append("circle")
                .attr("cx", value => value )
                .attr("cy", value => value)
                .attr("r", 1.5)
                .style("fill", "#69b3a2"),
            exit => exit.remove()
        );
        */

        const ref = useD3(
            (svg) => {
              
            /* from using d3.js inside react

              const height = 500;
              const width = 500;
              const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        
              const x = scaleBand()
                .domain(data.map((d) => d.year))
                .range([margin.left, width - margin.right]);
        
              const y1 = scaleLinear()
                .domain([0, max(data, (d) => d.sales)])
                .range([height - margin.bottom, margin.top]);
        
              const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                  axisBottom(x)
                    .tickValues(
                      ticks(...extent(x.domain()), width / 40) //40
                        .filter((v) => x(v) !== undefined)
                    )
                    .tickSizeOuter(0)
                );
        
              const y1Axis = (g) =>
                g
                  .attr("transform", `translate(${margin.left},0)`)
                  .style("color", "white")
                  .call(axisLeft(y1).ticks(null, "s"))
                  .call((g) => g.select(".domain").remove())
                  .call((g) =>
                    g
                      .append("text")
                      .attr("x", -margin.left)
                      .attr("y", 10)
                      .attr("fill", "currentColor")
                      .attr("text-anchor", "start")
                      .text(data.y1)
                  );
        
              svg.select(".x-axis").call(xAxis);
              svg.select(".y-axis").call(y1Axis);


                    svg
                    .select(".plot-area")
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    //.attr("class", "line")
                    .selectAll(".line")
                    .attr("class", "line")
                    .datum(data)
                    .join("path")
                    //.selectAll(".line")
                    
                    //.attr("width", 500).attr("height", 500)
                    .attr("stroke-width", 0.5)
                    .attr("stroke", "steelblue")
                    
                    .attr("d", line()
                        .x(function(d) { return x(d.year) })
                        .y(function(d) { return y1(d.sales) }))
                        //.attr("x", (d) => x(d.year))
                        //.attr("r", 5) // "width", x.bandwidth()
                        //.attr("y", (d) => y1(d.sales))
                    //.attr("x", (d) => x(d.year))
                    ;
                    //.attr("y", (d) => y1(d.sales))
                    

                    svg
                    .select(".plot-area")
                    .attr("fill", "steelblue") //"steelblue"
                    .selectAll(".dot")
                    .data(data)
                    .join("circle")
                    .attr("class", "dot")
                    .attr("cx", (d) => x(d.year))
                    .attr("r", 5) // "width", x.bandwidth()
                    .attr("cy", (d) => y1(d.sales));
                    //.attr("height", (d) => y1(0) - y1(d.sales));
                    */






                    /* from basic connected scatter plot (WORKS)

                    // set the dimensions and margins of the graph
                    var margin = {top: 10, right: 30, bottom: 30, left: 60},
                        width = 460 - margin.left - margin.right,
                        height = 400 - margin.top - margin.bottom;

                    // append the svg object to the body of the page
                    svg.select("svg")
                                .append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform",
                                    "translate(" + margin.left + "," + margin.top + ")");

                    // Add X axis --> it is a date format
                    var x = scaleLinear()
                            .domain(extent(data, function(d) { return d.year; }))
                            .range([ 10, width ]);
                    
                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(axisBottom(x));
                    
                    // Add Y axis
                    var y = scaleLinear()
                            .domain( [0, (max(data, (d) => d.sales) + 10)])
                            .range([ height, 0 ]);
                    
                    svg.append("g")
                        .call(axisLeft(y));
                    // Add the line
                    svg.append("path")
                        .datum(data)
                        .attr("fill", "none")
                        .attr("stroke", "#69b3a2")
                        .attr("stroke-width", 1.5)
                        .attr("d", line()
                            .x(function(d) { return x(d.year) })
                            .y(function(d) { return y(d.sales) })
                        );
                    // Add the points
                    svg
                        .append("g")
                        .selectAll("dot")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("cx", function(d) { return x(d.year) } )
                        .attr("cy", function(d) { return y(d.sales) } )
                        .attr("r", 5)
                        .attr("fill", "#69b3a2")
                    

                        */


            // set the dimensions and margins of the graph
            var margin = {top: 10, right: 30, bottom: 50, left: 50},
                width = 460 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            //var yPixelsPerTick = 60;

            // append the svg object to the body of the page
            svg.select("svg")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

            //var minDate = getDate(stepsData[0]["date"]),
            //    maxDate = getDate(stepsData[stepsData.length-1]["date"]);

            // Add X axis --> it is a date format
            var x = scaleTime()
                    .domain(extent(stepsData, function(d) { return d.date; }))
                    //.domain([minDate, maxDate])
                    .range([ 0, width ]);
            
            svg.append("g")
                .attr("transform", "translate(" + (margin.left+10) + "," + height + ")")
                //.attr("padding-left", 50)
                //.attr("transform", `translate(${margin.left},0)`)
                //.attr("transform", "rotate(90)")
                //.enter()
                .call(axisBottom(x).ticks(stepsData.length-1).tickFormat(timeFormat("%Y/%m/%d")))
                .selectAll("text") 
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
        
            
            var maximum = max(stepsData, (d) => d.steps)
            console.log(maximum)

            // Add Y axis
            var y = scaleLinear()
                    .domain([0, (maximum+(maximum / 10))/*(max(stepsData, (d) => d.steps) + 100)*/])//(max(stepsData, (d) => d.steps) + 100)])
                    .range([height, 0]);
            
            //let yTickVals = stepsData.map(d => d.date)
            //console.log(yTickVals)

            /*
            let yAxisG = g.selectAll('g').data([null]);
            yAxisG = yAxisG.enter().append('g').merge(yAxisG);
            yAxisG.call(axisLeft(y))
            */

            svg.append("g")
                //.attr("transform", "translate(0, 0)")
                //.enter()
                .attr("transform", `translate(${margin.left},0)`)
                .call(axisLeft(y)); //.ticks(height / yPixelsPerTick));
            
            // Add the line
            svg.append("path")
                .attr("transform", `translate(${margin.left+10},0)`)
                .datum(stepsData)
                //.enter()
                .attr("fill", "none")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 1.5)
                .attr("d", line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.steps) })
                )
                .exit()
            // Add the points
            svg
                .append("g")
                .attr("transform", `translate(${margin.left+10},0)`)
                .selectAll("dot")
                //.attr("transform", `translate(${margin.left},0)`)
                .data(stepsData)
                .enter()
                //.attr("transform", `translate(${margin.left},0)`)
                .append("circle")
                //.attr("cx", function(d) { return x(d.date) } )
                .attr("cx", (d) => x(d.date) )
                .attr("cy", (d) => y(d.steps) )
                //.attr("cy", function(d) { return y(d.steps) } )
                .attr("r", 5)
                .attr("fill", "#69b3a2")
                .exit()
            
            },
            [stepsData.length]
        );
        
    


    return (<div>
        <span className={styles.stepText}>Highest step count: <MaxSteps/></span>
        <div>
            <svg ref={ref}
                style={{
                    height: 500,
                    width: "100%", //100%
                    marginRight: "0px",
                    //marginLeft: "50px",
                    //paddingLeft: "50px"
                    }
                }>
            </svg>
        </div>
        
    </div>
    )
};

            /* in div..
            <svg ref={ref}
            style={{
                height: 500,
                width: "100%", //100%
                marginRight: "0px",
                marginLeft: "0px",
                }
            }>
            </svg>
            */
            // in <svg ...
            //<g className="plot-area" />
            //g className="plot-line" />
            //<g className="x-axis" />
            //<g className="y-axis" />

export default Logs;

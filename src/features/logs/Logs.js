import React, {useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Logs.css';
import { selectAllSteps } from '../main/mainSlice';
import { selectNumOfDays, numOfDays } from './logsSlice';
import { axisLeft,
         axisBottom, 
         scaleLinear,
         max,
         extent,
         line,
         scaleTime,
         timeFormat,
         select,
        } from "d3";
import { transform } from 'typescript';
import { useD3 } from './useD3';

const Logs = () => {
    const dispatch = useDispatch()
    const days = useSelector(selectNumOfDays)
    let newDay;

    const submitNumOfDays = e => {
        dispatch(numOfDays(newDay))
    }

    const stepsFromFB = useSelector(selectAllSteps);
    const stepsExist = (stepsFromFB != '') ? true : false
    
    // Shows the maximum amount of steps a user has taken
    const MaxSteps = e => {
        let maxSteps = 0;

        const stepsFromFB = useSelector(selectAllSteps);
        const stepsExist = (stepsFromFB != '') ? true : false

        let stepsData = []
        if(stepsExist){
            
    
            for(let months in stepsFromFB){
                for(let days in stepsFromFB[months]){
                    for(let steps in stepsFromFB[months][days]){
                        stepsData.push(stepsFromFB[months][days][steps])
                    }
                }
            }

            stepsData.sort((a,b) => {return a-b})
            maxSteps = stepsData[stepsData.length -1]
        }
        
        return(
            <span>{maxSteps}</span>
        )
    }
    
    let stepsData = []
    const today = new Date();

    if(stepsExist){
        for(let i = 0; i < days; i++){
            const year = today.getFullYear()
            const month = (today.getMonth() +1)
            const day = today.getDate()
        
            stepsData.push({date: new Date(year, month, day), 
                        steps: stepsFromFB[String(year)][String(month)][String(day)]
                        })
            today.setDate(today.getDate() -1)
        }
    }
    stepsData = stepsData.filter(d => d.steps !== undefined)

    const ref = useD3(
        (svg) => {

        // removes previous graph elements
        svg.selectAll(".graph").remove()

        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 30, bottom: 50, left: 50},
              width = 460 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

        // Add X axis
        const x = scaleTime()
                .domain(extent(stepsData, function(d) { return d.date; }))
                .range([ 0, width ])
            
                
        svg.append("g")
            .attr("transform", "translate(" + (margin.left+10) + "," + height + ")")
            .attr("class", "graph")
            .call(axisBottom(x)
                .ticks(stepsData.length-1)
                .tickFormat(timeFormat("%Y/%m/%d"))
                .tickSizeOuter(0))
            .selectAll("text")
            .attr("class", "graph")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
            
        const maximum = max(stepsData, (d) => d.steps)

        // Add Y axis
        const y = scaleLinear()
                .domain([0, (maximum+(maximum / 10))])
                .range([height, 0]);

        svg.append("g")
            .attr("class", "graph")
            .attr("transform", `translate(${margin.left},0)`)
            .call(axisLeft(y));
            
        svg.append("path")
            .attr("transform", `translate(${margin.left+10},0)`)
            .attr("class", "graph")
            .datum(stepsData)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 1.5)
            .attr("d", line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.steps) })
            )
                
        // the tooltip when hovering over a point
        var div = select("#mainPart").append("div")
                    .attr("class", "graph")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
            
        // Add the points
        svg
            .append("g")
            .attr("transform", `translate(${margin.left+10},0)`)
            .selectAll("dot")
            .data(stepsData)
            .enter()
            .append("circle")
            .attr("class", "graph")
            .attr("d", stepsData)
            .attr("cx", (d) => x(d.date) )
            .attr("cy", (d) => y(d.steps) )
            .attr("r", 5)
            .attr("fill", "#69b3a2")

            // Add tooltip on hover ("mouse over")
            .on("mouseover", function(d, i) {
                select(this)
                    .transition()
                    .duration("100")
                    .attr("r", 9);
                    
                div.transition()
                    .duration(100)
                    .style("opacity", 1);

                div.html("Steps: " + i["steps"]
                    + "<br /> Date: " 
                    + i["date"].toLocaleDateString('zh-Hans-CN'))
                    .style("left", (d.pageX + 15) + "px")
                    .style("top", (d.pageY - 15) + "px");
            })
            // Remove tooltip on mouse out
            .on("mouseout", function() {
                select(this)
                    .transition()
                    .duration("100")
                    .attr("r", 5);

                div.transition()
                    .duration(100)
                    .style("opacity", 0);
            })
            
        // Add graph title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", (margin.top*1.5))
            .attr("text-anchor", "right")
            .attr("class", "graph")
            .attr("fill", "white")
            .text("Number of steps, last " + days + " days")
        
        },
        [stepsData.length]
    
    );

    return (<div>
        <div className="highestText">Highest step count: <MaxSteps/></div>
        <div id="mainPart">
            <svg ref={ref} className="stepsChart" display={(!stepsExist) ? "none" : "inline"}/>
            <div className="chartOptions" >
                <form className="chartOptionsForm">
                    <label htmlFor="days">Show number of steps for the last...</label>

                    <select className="chartDropDown" name="numberOfDays" id="days"
                        defaultValue={days} onChange={e => {
                            newDay=e.target.value;
                            submitNumOfDays();
                            }}>
                        <option id="optionThree" value={3}>3 days</option>
                        <option id="optionSeven" value={7}>7 days</option>
                        <option id="optionTen" value={10}>10 days</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
    )
};

export default Logs;

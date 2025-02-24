import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MoonPhaseCalendar = () => {
  const calendarRef = useRef();

  useEffect(() => {
    const width = 750, height = 1000;
    const now = new Date();
    const year = now.getFullYear();
    const daysOfYear = [];

    function moonPhase(y, m, d) {
      if (m < 3) {
        y--;
        m += 12;
      }
      m = m + 1;
      const c = 365.25 * y;
      const e = 30.6 * m;
      let jd = c + e + d - 694039.09;
      jd /= 29.53;
      let b = Math.floor(jd);
      jd -= b;
      b = jd * 8 + 0.5;
      return b & 7;
    }

    for (let d = new Date(year, 0, 1); d < new Date(year + 1, 0, 1); d.setDate(d.getDate() + 1)) {
      daysOfYear.push({
        month: d.getMonth() + 1,
        day: d.getDate(),
        dow: d.getDay() + 1,
        year,
        phase: moonPhase(year, d.getMonth() + 1, d.getDate()),
      });
    }

    const phases = [
      { name: "New Moon", arcStart: 0, arcEnd: 2 * Math.PI, scaleX: 0, invert: false },
      { name: "Waxing Crescent", arcStart: Math.PI, arcEnd: 2 * Math.PI, scaleX: 0.7, invert: false },
      { name: "First Quarter", arcStart: Math.PI, arcEnd: 2 * Math.PI, scaleX: 0, invert: false },
      { name: "Waxing Gibbous", arcStart: 0, arcEnd: Math.PI, scaleX: 0.7, invert: true },
      { name: "Full Moon", arcStart: 0, arcEnd: 0, scaleX: 0, invert: false },
      { name: "Waning Gibbous", arcStart: Math.PI, arcEnd: 2 * Math.PI, scaleX: 0.7, invert: true },
      { name: "Third Quarter", arcStart: 0, arcEnd: Math.PI, scaleX: 0, invert: false },
      { name: "Waning Crescent", arcStart: 0, arcEnd: Math.PI, scaleX: 0.7, invert: false },
    ];

    const svg = d3.select(calendarRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    const content = svg.append("g").attr("transform", "translate(0,25)");
    const monthScale = d3.scaleLinear().domain([1, 12]).range([0, 450]);
    const dowScale = d3.scaleLinear().domain([1, 7]).range([0, 120]);
    const weekScale = d3.scaleLinear().domain([-1, 3]).range([0, 560]);

    const dayGs = content.selectAll(".day")
      .data(daysOfYear)
      .enter()
      .append("g")
      .attr("class", "day")
      .attr("transform", d => {
        const tX = weekScale(Math.floor((d.day - d.dow) / 7)) + dowScale(d.dow);
        const tY = monthScale(2 * d.month);
        return `translate(${tX},${tY})`;
      });

    dayGs.append("circle").attr("r", 8).style("fill", d => (phases[d.phase].invert ? "black" : "white"));
    dayGs.append("circle").attr("r", 8).style("fill", d => (phases[d.phase].invert ? "white" : "black"))
      .attr("transform", d => `scale(${phases[d.phase].scaleX},1)`);
    
    const arc = d3.arc().outerRadius(8);
    
    dayGs.append("path")
      .attr("d", d => arc.innerRadius(0).startAngle(phases[d.phase].arcStart).endAngle(phases[d.phase].arcEnd)())
      .style("fill", d => (phases[d.phase].invert ? "white" : "black"));
    
    dayGs.append("text")
      .text(d => d.day)
      .attr("x", d => (d.day < 10 ? -5 : -10))
      .attr("y", -11)
      .style("fill", "#ccc");
    
    dayGs.append("title").text(d => `${d.year}/${d.month}/${d.day} ${phases[d.phase].name} (phase: ${d.phase})`);
  }, []);

  return <div ref={calendarRef}></div>;
};

export default MoonPhaseCalendar;

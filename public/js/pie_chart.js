/**
 * Created by Liang Liu on 2019/3/26.
 */
//pie chart
//pie_chart(add_data(main_traj));
function pie_chart(data) {

    let pie_chart = $("#pie");
    let width = pie_chart.width();
    let height = pie_chart.height();
    let radius = Math.min(width, height) / 2;

    let pie = d3.layout.pie()
        .value(function(d) { return d.stay; });

    let arc = d3.svg.arc()
        .innerRadius(radius - 50)
        .outerRadius(radius - 20);

    let svg = d3.select("#pie").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path = svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("fill", function (d) {
            return colorScale[area_judge(d.data.sid)];
        })
        .attr("fill-opacity",0.6)
        .attr("d", arc)
        .on("mouseover",function (d) {
            d3.select(this).attr("fill-opacity",1);
        })
        .on("mouseout",function (d) {
            d3.select(this).attr("fill-opacity",0.6);
        });
}
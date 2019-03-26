/**
 * Created by Liang Liu on 2019/3/26.
 */
let area_line = {};
let area = $("#area_line");
area_line.width = area.width();
area_line.height = area.height();

area_line.svg = d3.select("#area_line").append("svg")
    .attr("width",area_line.width)
    .attr("height",area_line.height+20);

area_line.x_scale = d3.time.scale()
    .range([0, area_line.width]);

area_line.y_scale = d3.scale.linear()
    .range([area_line.height, 0]);

area_line.x_axis = d3.svg.axis()
    .orient("bottom")
    .tickFormat(d3.time.format("%H:%M"))
//.ticks(20);

area_graph("area_A");

function area_graph(condition){
    $.ajax({
        url: "/day1_pro",    //请求的url地址
        dataType: "json",   //返回格式为json
        data:{area:condition.toLocaleString()},
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {

            let date_10min= [];
            let date_extent = d3.extent(data,(d)=>{
                return new Date(d.date);
            });

            date_extent[0].setMinutes(0);
            date_extent[0].setSeconds(0);

            date_extent[1].setHours(date_extent[1].getHours()+1);
            date_extent[1].setMinutes(0);
            date_extent[1].setSeconds(0);

            for(let i = date_extent[0].getTime();i<date_extent[1].getTime();i+=600000){
                date_10min.push({date:new Date(i),value:0});
            }

            data.forEach((d)=>{
                d.date = new Date(d.date);
                for(let i=0;i<date_10min.length-1;i++) {
                    if((d.date.getTime()>date_10min[i].date.getTime())&&(d.date.getTime()<date_10min[i+1].date.getTime()))
                        date_10min[i].value++;
                }
            });
            area_chart(date_10min,condition);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
}

function area_chart(data,condition) {

    d3.select("#area_line").select('svg').html("");

    data.forEach((d)=>{
        d.value = d.value * 10;
    });

    let date_extent = d3.extent(data,(d)=>{
        return d.date;
    });

    area_line.x_scale.domain(date_extent);

    area_line.y_scale.domain([0,d3.max(data, function (d) {
            return d.value;
        })]);

    area_line.x_axis.scale(area_line.x_scale)

    let zoom = d3.behavior.zoom()
        .x(area_line.x_scale)
        .scaleExtent([1, 16])
        .on("zoom", function () {
            area_line.svg.select(".x.axis").call(area_line.x_axis);
            g.selectAll('#area').attr("d", area);
        });

    area_line.svg.call(zoom);

    let area = d3.svg.area()
        .interpolate("basis")
        .x(function (d) {
            return area_line.x_scale(d.date);
        })
        .y0(function (d) {
            return area_line.y_scale(area_line.height);
        })
        .y1(function (d) {
            return area_line.y_scale(d.value);
        });

    let g = area_line.svg.append("g");

    g.append("path")
        .datum(data)
        .attr('fill', colorScale[condition])
        .attr('opacity', 0.7)
        //.attr('stroke', 'white')
        .attr("d", area)
        .attr("id","area");

    g.append("g")
        .attr("class", "x axis")
        .call(area_line.x_axis)
        .attr("transform","translate(0,"+(area_line.height)+")");
}
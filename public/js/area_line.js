/**
 * Created by Liang Liu on 2019/3/26.
 */
//area line
//area_line(day1_test);
let condition = "area_A";

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
        let date_extent = [new Date(2019,1,1,7,0,0),new Date(2019,1,1,9,0,0)];

        for(let i = date_extent[0].getTime();i<date_extent[1].getTime();i+=600000){
            date_10min.push([{date:new Date(i),value:0}]);
        }

        data.forEach((d)=>{
            for(let i=0;i<date_10min.length;i++)
            {
                if(new Date(d.date) <= date_10min[i][0].date)
                    date_10min[i][0].value++;
            }
        });
        console.log(date_10min);
        //area_line(date_10min);
    },
    complete: function () {//请求完成的处理
    },
    error: function () {//请求出错处理
    }
});

function area_line(data) {

    let date_extent = [new Date(2019,1,1,7,0,0),new Date(2019,1,1,9,0,0)];

    let area_line = $("#area_line");
    let width = area_line.width();
    let height = area_line.height();

    let x_scale = d3.time.scale()
        .domain(date_extent)
        .range([0, width]);

    let y_scale = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
            return d.value;
        }))
        .range([height, 0]);

    let x_axis = d3.svg.axis()
        .scale(x_scale)
        .orient("bottom")
        .tickFormat(d3.time.format("%H:%M"))
        //.ticks(20);

    let zoom = d3.behavior.zoom()
        .x(x_scale)
        .scaleExtent([1, 16])
        .on("zoom", function () {
        });

    let svg = d3.select("#area_line").append("svg")
        .attr("width",width)
        .attr("height",height)
        .call(zoom);

    let area = d3.svg.area()
        .interpolate("basis")
        .x(function (d) {
            return x_scale(d.date);
        })
        .y0(function () {
            return y_scale(height);
        })
        .y1(function (d) {
            return y_scale(d.value);
        });

    let g = svg.append("g");

    g.append("path")
        .datum(data)
        .attr('fill', '#80ffd9')
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr("d", area)
        .attr("id","area");

    g.append("g")
        .attr("class", "x axis")
        .call(x_axis);
}
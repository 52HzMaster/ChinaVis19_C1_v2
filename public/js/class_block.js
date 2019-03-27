/**
 * Created by Liang Liu on 2019/3/26.
 */
//class_block(add_data(test)); //人员时间区域图谱

// (d)=>{} 不支持 d3.select(this)

let all_id =[11396,15367,16111];

all_id_block(all_id);

function all_id_block(all_id) {

    let all_id_data= [];
    all_id.forEach((d,i)=>{

        $.ajax({
            url: day_url+"_id",    //请求的url地址
            dataType: "json",   //返回格式为json
            data:{
                id:d
            },
            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {

                for (let i=0; i<data.length-1;i++){
                    //data[i].date = new Date(data[i].date);
                    data[i].stay = data[i+1].time - data[i].time;
                }
                data[data.length-1].stay = 0;
                //data[data.length-1].date = new Date(data[data.length-1].date);

                all_id_data[i] =data;
                //class_block(data);
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });
    });

    class_block(all_id_data);
}

function class_block(data) {

    console.log(data);

    let time_line = $("#class_block");
    let width = time_line.width();
    let height = time_line.height() / 10;

    let class_block = {};

    class_block.xScale = d3.scale.linear()
        .domain(d3.max(data, function (d) {
            return d3.extent(d, function (d) {
                return d.stay;
            })
        }))
        .range([0, width]);

    class_block.yScale = d3.scale.linear()
        .domain([0, 100])
        .range([height, 0]);

    let zoom = d3.behavior.zoom()
        .x(class_block.xScale)
        // .scaleExtent(SCALE_EXTENT)
        .on("zoom", zoomed);

    let stay_scale = d3.scale.linear()
        .domain(d3.max(data, function (d) {
            return d3.extent(d, function (d) {
                return d.stay;
            })
        }))
        .range([0, 200]);

    data.forEach((dataset,index)=>{

        let svg = d3.select("#class_block")
            .append("svg")
            .attr("class", "class_svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "absolute")
            .attr("transform", "translate(0," + ( index * (height + 10)) + ")")
            .call(zoom);


        let g = svg.append("g");

        g.selectAll(".v_line")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "v_line")
            .attr("x", function (d, i) {
                return class_block.xScale(d.stay);
            })
            .attr("y", class_block.yScale(100))
            .attr("width", (s,i) => {
                return  s.stay;
            })
            .attr("height", height)
            .style({
                "fill": function (d) {
                    return colorScale[d.area];
                },
                "fill-opacity": 0.6,
                "stroke": "#FFFFFF",
            })
            .on("mouseover", function (d, i) {
                d3.select(this).transition().duration(200).style("fill-opacity", 1);
                d3.select("." + d.area).selectAll('.grid').style({
                    "opacity": 1
                });
            })
            .on("mouseout", function (d, i) {
                d3.select(this).transition().duration(200).style("fill-opacity", 0.6);
                d3.select("." + d.area).selectAll('.grid').style({
                    "opacity": 0.6
                })
            });
    });

    function zoomed() {
        d3.select(this).select("g").selectAll("rect")
            .attr("x", function (d,i) {
                return class_block.xScale(d.stay);
            })
            .attr("y", class_block.yScale(100))
            .attr("width", (d,i)=>{
                return d.stay;
            })
    }

}

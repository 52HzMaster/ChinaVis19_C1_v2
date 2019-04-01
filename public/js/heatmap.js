


let floor = $("#mini_floor");

d3.select("#mini_floor").append("div")
    .attr("id","heatmap")
    .style({
        "width":floor.width()+'px',
        "height":floor.height()+'px',
        "pointer-events":"none",
        "z-index":20
        //"display":"none"
    });

d3.select("#mini_floor").append("div")
    .attr("id","heatmap_f2")
    .style({
        "width":floor.width()+'px',
        "height":floor.height()+'px',
        "pointer-events":"none",
        "z-index":999,
        "bottom":floor.height()+'px'
        //"display":"none"
    });

let heatmapInstance = h337.create({
    container: document.querySelector('#heatmap'),
    gradient:{0.1: "#20C2E1", 0.3: "#23D561", 0.5: "#F1E229", 1.0: "#ff1815"},
    radius:10,
    blur:1
});

let heatmapInstance_f2 = h337.create({
    container: document.querySelector('#heatmap_f2'),
    gradient:{0.1: "#20C2E1", 0.3: "#23D561", 0.5: "#F1E229", 1.0: "#ff1815"},
    radius:10,
    blur:1
});

d3.select("#heatmap")
    .style({
        "width":floor.width()+'px',
        "height":floor.height()+'px',
        "position":"absolute",
        "right":0,
        "z-index":999
    });

d3.select("#heatmap_f2")
    .style({
        "width":floor.width()+'px',
        "height":floor.height()+'px',
        "position":"absolute",
        "right":0,
        "z-index":999
    });

Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function date_slice(start,end,stick) {
    let extent = [];

    for(let i = new Date(start).getTime();i<new Date(end).getTime();i += stick*60*1000) {
        let date_start = new Date(i).Format("yyyy-MM-dd HH:mm:ss");
        let date_end = new Date(i + stick*60*1000).Format("yyyy-MM-dd HH:mm:ss");
        extent.push([date_start,date_end]);
    }
    return extent;
}


function heatmap_chart(start,end,speed){

    let date_extent = date_slice(start,end,speed);

    let index = 0;
    let heatmap_interval = setInterval(function () {
        if(index<date_extent.length-1){
            heatmap(date_extent[index]);
        }
        else
            clearInterval(heatmap_interval);
        index++;
    },1000);


    function heatmap(date_extent) {
        //console.log(date_extent);

        d3.select("#heatmap_time").select("a").text(new Date(date_extent[1]).Format("HH:mm:ss"));

        $.ajax({
            url: day_url + "date",    //请求的url地址
            dataType: "json",   //返回格式为json
            data: {
                date_start: date_extent[0],
                date_end: date_extent[1]
            },
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {
                //console.log(data);
                /*        data.forEach((d)=>{
                            d.date = new Date(d.date);
                        });*/
                let nest_sensor = d3.nest().key((d) => d.sid);

                let test = nest_sensor.entries(data);

                area_heatmap(test);
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });
    }

    function area_heatmap(data) {

        let points_f1 = [];
        let points_f2 = [];

        let max_f1 = 0;
        let max_f2 = 0;

        data.forEach((d)=>{

            let floor = d.key.slice(0,1);
            let x = d3.select("#sensor_"+d.key).attr("x");
            let y = d3.select("#sensor_"+d.key).attr("y");

            if(floor === '1')
                max_f1 = (max_f1 > d.values.length)?max_f1:d.values.length;
            else
                max_f2 = (max_f2 > d.values.length)?max_f2:d.values.length;

            let point = {
                x: x,
                y: y,
                value: d.values.length
            };

            (floor === '1')?points_f1.push(point):points_f2.push(point);
        });

        let heat_data_f1 = {
            max: max_f1,
            data: points_f1
        };

        let heat_data_f2 = {
            max: max_f2,
            data: points_f2
        };

        heatmapInstance.setData(heat_data_f1);
        heatmapInstance_f2.setData(heat_data_f2);
    }

}
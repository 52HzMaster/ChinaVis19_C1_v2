/**
 * Created by Liang Liu on 2019/4/1.
 */
test();
function test() {

    let floor = $("#all_view");

    let width = (floor.width()>floor.height())?floor.height():floor.width();
    let height = width;

    let floor_svg = d3.select("#all_view")
        .append("svg")
        .attr("id", "floor_svg")
        .attr("width", width)
        .attr("height", width)
        .style({
            "position":"absolute",
            //'left':"100px"
            "background":"#8f8f8f",
            "opacity":0.6
        })
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    d3.csv("/data/day1_id.csv",(data)=>{

        let cluster = d3.layout.cluster()
            .size([360, width/2-100]);

        let nodes = cluster.nodes({name:"",children:data});

        let gBundle = floor_svg.append("g");

        let node = gBundle.selectAll(".node")
            .data( nodes.filter(function(d) { return !d.children; }) )
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "rotate(" + (d.x- 90) + ")translate(" + d.y + ")" + "rotate("+ (90 - d.x) +")";
            });

        node.append("circle")
            .attr("r", 2)
            .style({
                "fill":"#FFFFFF"
            })
            .append("title")
            .text((d)=>d.id);

    });

/*    let areas_dot = floor_svg.selectAll(".area")
      .data(all_areas)
      .enter()
      .append("circle")
      .attr("class",(d)=>d)
      .attr("cx",(d,i)=>{
          return 100+Math.floor(Math.random()*width/1.5);
      })
      .attr("cy",(d,i)=>{
          return 100+Math.floor(Math.random()*height/1.5);
      })
      .attr("r",20)
      .style({
          "fill":(d)=>colorScale[d],
          "opacity":.7
      })
      .on("mouseover",function (d) {
          d3.select(this).style("opacity",1);
      })
      .on("mouseout",function (d) {
          d3.select(this).style("opacity",.7);
      });

  areas_dot.append("title")
      .text((d)=>d);*/

    /*    d3.csv("/data/day1_id.csv",(data)=>{
     let test = [];
     data.forEach((d)=>{
     $.ajax({
     url: day_url + "_id",    //请求的url地址
     dataType: "json",   //返回格式为json
     data: {
     id:d.id.toString()
     },
     async: true, //请求是否异步，默认为异步，这也是ajax重要特性
     type: "GET",   //请求方式
     contentType: "application/json",
     beforeSend: function () {//请求前的处理
     },
     success: function (data, textStatus) {
     data = remove_element(data);
     //console.log(d3.max(data,(d)=>d.stay));
     },
     complete: function () {//请求完成的处理
     },
     error: function () {//请求出错处理
     }
     });
     });
     });*/

/*        $.ajax({
            url: day_url + "_id",    //请求的url地址
            dataType: "json",   //返回格式为json
            data: {
                id:"10232"
            },
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {
                //console.log(data);
                let test = remove_element(data);
                let test1 = subsets(test);
                console.log(test1);
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });*/

 /*   $.ajax({
        url: day_url + "_id",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            id:"11396"
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            //console.log(data);
            let test = remove_element(data);
            let links = [];
            for(let i =0;i<test.length-1;i++){
                links.push({source:test[i].area,target:test[i+1].area});
            }
            console.log(links);
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });*/


    function subsets(array) {
        let res = [];
        for(let i=1;i<=array.length;i++) {
            let temp =[];
            for(let j=0;j<array.length; j++){
                if(array.slice(j,j+i).length === i)
                    temp.push(array.slice(j,j+i));
            }
            res.push(temp);

        }
        return res;
    }

    /*    let date_extent = ["2019-01-01 7:00:00", "2019-01-01 7:10:00"];

        $.ajax({
            url: day_url+"_date",    //请求的url地址
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
                console.log(data);

            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });*/

    function remove_element(arr) {

        let data=[];
        data.push(arr[0]);
        for(let i =1;i<arr.length;i++) {
            if(arr[i].area === data[data.length-1].area){
                //data[data.length-1].stay += arr[i].stay;
               // data[data.length-1].date = arr[i].date;
            }
            else
                data.push(arr[i]);
        }
        return data;
    }

}



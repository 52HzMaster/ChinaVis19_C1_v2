/**
 * Created by Liang Liu on 2019/4/1.
 */
test();
function test() {

    let floor = $("#all_view");

    let gridSize_w = (floor.width() -100) / 30;
    let gridSize_h = (floor.height()-100) / 16;

    let card_x = 30;
    let card_y = 16;

    let width = gridSize_w * card_x;
    let height = gridSize_h * card_y;

    let test = {};

    let floor_data = [];
    for (let i = 0; i < card_x; i++)
        for (let j = 0; j < card_y; j++)
            floor_data.push({x: i, y: j});

    let traj =[['13', '0'], ['13', '1'], ['14', '2'], ['14', '3'], ['14', '4'], ['13', '5'], ['13', '6']]

    let traj1 =[['13', '0'], ['13', '1'], ['14', '2'], ['14', '3'], ['14', '4'], ['13', '5'], ['13', '6'],
        ['13', '7'], ['13', '8'], ['13', '9'], ['13', '10'], ['13', '11'], ['13', '12'], ['14', '13'], ['13', '14'],
        ['13', '15'], ['13', '16'], ['13', '17'], ['13', '18'], ['13', '19'], ['13', '20'], ['13', '21'], ['13', '22'],
        ['12', '23'], ['11', '23'], ['10', '23'], ['9', '23'], ['8', '23'], ['8', '24'], ['8', '25'], ['8', '26'], ['8', '25'],
        ['8', '24'], ['8', '23'], ['9', '23'], ['9', '22'], ['9', '21'], ['10', '21'], ['10', '20'], ['10', '21'], ['9', '21'],
        ['8', '21'], ['9', '21'], ['9', '22'], ['9', '23'], ['10', '23'], ['10', '24'], ['10', '25'], ['11', '25'], ['12', '25'],
        ['12', '26'], ['13', '27'], ['13', '28'], ['14', '28'], ['13', '28'], ['13', '27'], ['13', '26'], ['13', '25'],
        ['13', '24'], ['13', '23'], ['13', '22'], ['13', '21'], ['14', '20'], ['14', '19'], ['14', '18'], ['13', '17'],
        ['13', '16'], ['13', '15'], ['13', '14'], ['13', '13'], ['12', '12'], ['12', '11'], ['12', '10'], ['11', '9'],
        ['10', '9'], ['9', '9'], ['8', '9'], ['7', '8'], ['8', '7'], ['8', '8'], ['9', '8'], ['10', '9'], ['11', '9'],
        ['12', '10'], ['13', '11'], ['13', '12'], ['13', '13'], ['12', '14'], ['13', '15'], ['13', '16'], ['13', '17'],
        ['13', '18'], ['13', '19'], ['13', '20'], ['12', '20'], ['12', '21'], ['12', '22'], ['12', '23'], ['12', '24'],
        ['12', '25'], ['11', '25'], ['10', '25'], ['9', '25'], ['8', '25'], ['7', '25'], ['7', '26'], ['7', '25'],
        ['8', '25'], ['9', '25'], ['10', '25'], ['11', '25'], ['11', '24'], ['11', '23'], ['11', '22'], ['11', '21'],
        ['12', '21'], ['12', '20'], ['12', '19'], ['12', '18'],
        ['13', '17'], ['13', '16'], ['14', '16'], ['14', '15'], ['15', '15']];

    function get_L_H(point1, point2){
        let _x = Math.abs(point1[0] - point2[0]);
        let _y = Math.abs(point1[1] - point2[1]);
        return Math.log2(Math.sqrt(_x * _x + _y * _y));
    }

    function get_L_D_H(startIndex,endIndex) {
        for(let i = startIndex;i<endIndex;i++){

        }
    }

    function MDL_PAR(start,end) {
        let L_H = get_L_H(start,end);
    }

    function MDL_NOPAR(start,end) {

    }

    let test_traj = MDL(traj);
    function MDL(tr){
        let cp = [];//特征点
        cp.push(tr[0]); //add first point
        let startIndex = 0,length = 1;
        while(startIndex+length < tr.length){
            let currIndex = startIndex + length;
            let cost_par = Math.floor(Math.random()*10);
            let cost_nopar = Math.floor(Math.random()*10);

            if(cost_par>cost_nopar){
                cp.push(traj[currIndex]);
                startIndex = currIndex;
                length = 1;
            }
            else
                length++;
        }
        cp.push(tr[tr.length-1]);  //add last point
        console.log(cp);
        return cp;
    }

    let floor_svg = d3.select("#all_view")
        .append("svg")
        .attr("id", "floor_svg")
        .attr("width", width)
        .attr("height", height)
        .style({
            "position":"absolute",
            //'left':"100px"
            "background":"#8f8f8f",
            "opacity":0.6
        });

    let floor_g = floor_svg.append("g");
    let nodes_g = floor_svg.append("g");
    let nodes_g1 = floor_svg.append("g");
    let path_g = floor_svg.append("g");
    let path_g1 = floor_svg.append("g");

    draw_floor();
    draw_nodes();
    draw_path();

    function draw_floor() {
        let floor1_cards = floor_g.selectAll(".grid")
            .data(floor_data)
            .enter()
            .append("rect")
            .attr("class", "grid")
            // .attr("rx",2)
            // .attr("ry",2)
            .attr("x", function (d) {
                return d.x * gridSize_w;
            })
            .attr("y", function (d) {
                return d.y * gridSize_h;
            })
            .attr("width", gridSize_w)
            .attr("height", gridSize_h)
            .style({
                "fill": "#999999"
            });
    }
    //==================================
    function draw_nodes() {
        let floor_nodes = nodes_g.selectAll(".node")
            .data(traj)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function (d) {
                return d[1] * gridSize_w + gridSize_w/2;
            })
            .attr("cy", function (d) {
                return d[0] * gridSize_h + gridSize_h/2;
            })
            .attr("r", 5)
            .style({
                "fill": "#3e9929"
            });

        nodes_g1.selectAll(".node")
            .data(test_traj)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function (d) {
                return d[1] * gridSize_w + gridSize_w/2;
            })
            .attr("cy", function (d) {
                return d[0] * gridSize_h + gridSize_h/2;
            })
            .attr("r", 5)
            .style({
                "fill": "#993410"
            });
    }
    //==================================
    function draw_path() {

        test.line = d3.svg.line()
            .x(function(d) { return d[1]* gridSize_w + gridSize_w/2; })
            .y(function(d) { return d[0]* gridSize_h + gridSize_h/2; })
            .interpolate("basis");

        /*    ==========================================  ==============
                linear - 线性插值
                linear-closed - 线性插值，封闭起点和终点形成多边形
                step - 步进插值，曲线只能沿x轴和y轴交替伸展
                step-before - 步进插值，曲线只能沿y轴和x轴交替伸展
                step-after - 同step
                basis - B样条插值
                basis-open - B样条插值，起点终点不相交
                basis-closed - B样条插值，连接起点终点形成多边形
                bundle - 基本等效于basis，除了有额外的tension参数用于拉直样条
                cardinal - Cardina样条插值
                cardinal-open - Cardina样条插值，起点终点不相交
                cardinal-closed - Cardina样条插值，连接起点终点形成多边形
                monotone - 立方插值，保留y方向的单调性
                ====================================================================*/

        let lineGraph = path_g.append("path")
            .attr("d", test.line(traj))
            .attr("stroke", "#3e9929")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        let lineGraph1 = path_g1.append("path")
        //.attr("d", line(traj))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none");
    }

    let trj = [],index=0;
    let interval = setInterval(function () {
        trj.push(test_traj[index]);
        index++;
        if(index>test_traj.length-1)
            clearInterval(interval);
        path_g1.selectAll('path').attr('d',test.line(trj))

    },200);


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



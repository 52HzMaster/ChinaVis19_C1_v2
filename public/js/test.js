/**
 * Created by Liang Liu on 2019/4/1.
 */
//test();
function test() {


    d3.csv("/data/day1_id.csv",(data)=>{
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
     //data = remove_element(data);
     console.log(d3.max(data,(d)=>d.stay));
     },
     complete: function () {//请求完成的处理
     },
     error: function () {//请求出错处理
     }
     });
     });
     });

/*    $.ajax({
        url: day_url + "_id",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {
            id:"10232"
        },
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            //console.log(data);
            let test = remove_element(data);
            console.log(test);
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
                //let pop = data.pop();
                data[data.length-1].stay += arr[i].stay;
                data[data.length-1].date = arr[i].date;
                //console.log(data[data.length-1].stay);
            }
            else
                data.push(arr[i]);
        }
        return data;
    }
}



/**
 * Created by Liang Liu on 2019/3/26.
 */
let sensor;
let day1_pro;
init_data();

function init_data() {
    $.ajax({
        url: "/sensor",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            sensor = data;
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });

   /* $.ajax({
        url: "/day1",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            day1_data = data;
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });*/

/*    $.ajax({
        url: "/day1_pro",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            day1_data = data;
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });*/
}
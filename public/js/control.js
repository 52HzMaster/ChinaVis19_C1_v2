/**
 * Created by Liang Liu on 2019/6/3.
 */

function Control_Chart() {
    d3.selectAll(".svg-wrapper").on("click",function (d,i) {
        day_url = "/day"+(i+1);
        d3.selectAll(".svg-wrapper").transition().duration(300).style({"background":"#666666",opacity:0.5});
        d3.select(this).transition().duration(500).style({"background":"#ff5319",opacity:1});
        if(i===0) {
            pie_chart(pie_.day1data, pie_.legend,i);
            time_line_(day1data, day1alive,i);
        }
        else if(i ===1){
            pie_chart(pie_.day2data,pie_.legend,i);
            time_line_(day2data,day2alive,i);
        }
        else if(i ===2){
            pie_chart(pie_.day3data,pie_.day3legend,i);
            time_line_(day3data,day3alive,i);
        }

        para_coor_all();

    })
}
Control_Chart();
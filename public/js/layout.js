let colorScale = {"area_A":"#306bff","area_B":"#34a8ff","area_C":"#44caff","area_D":"#5afaff",
    "area_canteen":"#ffd172",
    "area_leisure":"#c8ff32",
    "area_sign":"#ffb48f","area_poster":"#fff277",
    "area_wc1":"#ffd2a6","area_wc2":"#ffd2a6","area_wc3":"#ffd2a6",
    "area_room1":"#8409ff","area_room2":"#a143ff","area_room3":"#c180ff","area_room4":"#ccb1ff","area_room5":"#8409ff","area_room6":"#a143ff",
    "area_ladder1":"#ff7e50","area_ladder2":"#ff7e50", "area_ladder3":"#ff7e50","area_ladder4":"#ff7e50",
    "area_serve":"#ff6c22","area_disc":"#ff5821","area_main":"#306bff",
    "area_in":"#16ff3c","area_out":"#ff2c31",
    "area_other":"#c8c8c7"
};

let all_areas = [
    "area_A","area_B","area_C","area_D",
    "area_sign","area_poster",
    "area_ladder1","area_ladder2","area_ladder3","area_ladder4",
    "area_wc1","area_wc2","area_wc3",
    "area_room1","area_room2","area_room3","area_room4","area_room5","area_room6",
    "area_serve", "area_disc","area_main",
    "area_canteen","area_leisure",
    "area_in", "area_out",
    "area_other"
];

let day_url = '/day1_data_pro';

layout();

function layout(){

    let all_view = $("#all_view");
    let width = all_view.width();
    let height = all_view.height();

    let floor = document.getElementById("floor");
    let area_line = document.getElementById("area_line");
    let mini_floor = document.getElementById("mini_floor");
    let chart = document.getElementById("chart");

    floor.style.width = width * 0.6 + 'px';
    floor.style.height = height * 0.6 + 'px';

    area_line.style.width = width * 0.6 + 'px';
    area_line.style.height = height * 0.15 + 'px';

    chart.style.width = width * 0.3 + 'px';
    chart.style.height = height * 0.4 + 'px';

    let floor_view = $("#floor");
    let floor_width = floor_view.width();
    let floor_height = floor_view.height();

    mini_floor.style.width = floor_width / 5 + 'px';
    mini_floor.style.height = floor_height /4 + 'px';



}

$(window).resize(function () {
    window.location.reload();
});

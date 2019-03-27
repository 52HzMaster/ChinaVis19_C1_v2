let colorScale = {"area_A":"#306bff","area_B":"#34a8ff","area_C":"#44caff","area_D":"#5afaff",
    "area_canteen":"#ffd172",
    "area_leisure":"#c8ff32",
    "area_sign":"#ffb48f","area_poster":"#fff277",
    "area_wc1":"#ffd2a6","area_wc2":"#ffd2a6","area_wc3":"#ffd2a6",
    "area_room1":"#8409ff","area_room2":"#a143ff","area_room3":"#c180ff","area_room4":"#ccb1ff","area_room5":"#8409ff","area_room6":"#a143ff",
    "area_ladder1":"#ff7e50","area_ladder2":"#ff7e50",
    "area_serve":"#ff6c22","area_disc":"#ff5821","area_main":"#306bff",
    "area_in":"#16ff3c","area_out":"#ff2c31",
    "area_other":"#c8c8c7"
};

let day_url = '/day1_pro';

layout();

function layout(){

    let all_view = $("#all_view");
    let width = all_view.width();
    let height = all_view.height();

    let floor = document.getElementById("floor");
    let area_line = document.getElementById("area_line");
    let class_block = document.getElementById("class_block");

    floor.style.width = width * 0.6 + 'px';
    floor.style.height = height * 0.5 + 'px';

    area_line.style.width = width * 0.6 + 'px';
    area_line.style.height = height * 0.15 + 'px';

    class_block.style.width = width * 0.2 + 'px';
    class_block.style.height = height * 0.5 + 'px';

}

$(window).resize(function () {
    window.location.reload();
});

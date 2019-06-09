/**
 * Created by Liang Liu on 2019/3/29.
 */

let main_chart = {};

main_chart.view_2D = true;

let renderer;

let floor_wh = $("#main");
let width = floor_wh.width();
let height = floor_wh.height();

let heatmapInstance;

function initRender() {

    renderer = new THREE.WebGLRenderer({alpha:true,antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor('#ffffff',0);
    //告诉渲染器需要阴影效果
    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.getElementById("main").appendChild(renderer.domElement);

}

let camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(45,width/height,10,100);
    //camera = new THREE.OrthographicCamera(-30, 30, 16, -16, 1, 100);
    camera.position.set( 0, 30,0 );
    camera.lookAt(new THREE.Vector3(0, -20, 0));
    scene.add(camera);

}

let scene;

function initScene() {
    scene = new THREE.Scene();
}

let light;

function initLight() {

    let hemiLight = new THREE.HemisphereLight("#FFFFFF","#FFFFFF",0.3);
    hemiLight.position.set(0,30,0);
    scene.add(hemiLight);

    //scene.add(new THREE.AmbientLight("#FFFFFF"));
    // light = new THREE.PointLight(0xffffff);
    // light.distance=100;
    // light.position.set(10,50,10);
    // light.intensity = 2.4;
    //
    // //告诉平行光需要开启阴影投射
    // //light.castShadow = true;
    //
    // scene.add(light);

}

function initModel() {

    //辅助工具1
    // let helper_axes = new THREE.AxisHelper(40);
    // helper_axes.position.set(0, 0, 0);
    // scene.add(helper_axes);

    //辅助工具2
    let helper = new THREE.GridHelper(50,100,"#253b62","#253b62");
    scene.add(helper);

    draw_f1_area(0.1,"#4f51ff",0.7);

    // let plane2 = new THREE.BoxGeometry( 30, 0, 16 );
    // let plane2_material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("img/floor2.jpg"),transparent:true,opacity:1 } );
    // let pic2 = new THREE.Mesh( plane2, plane2_material );
    // pic2.position.y = 15.001;
    // scene.add(pic2);

    // let floor1 = new THREE.Mesh(new THREE.BoxGeometry(30.01, 0, 16.01),new THREE.MeshBasicMaterial({}));
    // floor1.name = "floor1";
    // floor1.material.color.set("#ffffff");
    // floor1.material.transparent = true;
    // floor1.material.opacity = 0.1;
    // scene.add(floor1);

    /*    let floor2 = new THREE.Mesh(new THREE.BoxGeometry(30, 0, 16));
     floor2.name = "floor2";
     floor2.material.color.set("#aaaaaa");
     floor2.position.x = 0;
     floor2.position.y = 7.5;
     floor2.position.z = 0;

     scene.add(floor2);

     let f2_edges = new THREE.BoxHelper(floor2, "#FFFFFF");//设置边框，可以旋转
     scene.add(f2_edges);*/


    // floor1_top floor2_bottom
    // let floor2_bottom = new THREE.Mesh(new THREE.PlaneGeometry(30, 16));
    // floor2_bottom.material.color.set("#444444");
    // floor2_bottom.material.transparent = true;
    // floor2_bottom.material.opacity = 0.3;
    // floor2_bottom.rotation.x =  -0.5 * Math.PI;
    // floor2_bottom.position.y = 5;
    // floor2_bottom.position.z = 0;
    //
    // //告诉底部平面需要接收阴影
    // floor2_bottom.receiveShadow = true;
    // scene.add(floor2_bottom);

    //立方体 （x轴宽度，y轴高度，z轴深度，沿宽面分段数，沿高度面分段数，沿深度面分段数）

    /*    let f2_wc3 = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 2));
     f2_wc3.name = "area_wc3";
     f2_wc3.material.color.set(colorScale['area_wc3']);
     f2_wc3.material.transparent = true;
     f2_wc3.material.needsUpdate = true;
     f2_wc3.material.opacity = 0.7;
     f2_wc3.position.x = -4;
     f2_wc3.position.y = 10.51;
     f2_wc3.position.z = -3;
     scene.add(f2_wc3);

     let f2_canteen = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 8));
     f2_canteen.name = "area_canteen";
     f2_canteen.material.color.set(colorScale['area_canteen']);
     f2_canteen.material.transparent = true;
     f2_canteen.material.needsUpdate = true;
     f2_canteen.material.opacity = 0.7;
     f2_canteen.position.x = -11.5;
     f2_canteen.position.y = 10.51;
     f2_canteen.position.z = -2;
     scene.add(f2_canteen);

     let f2_leisure = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 3));
     f2_leisure.name = "area_leisure";
     f2_leisure.material.color.set(colorScale['area_leisure']);
     f2_leisure.material.transparent = true;
     f2_leisure.material.needsUpdate = true;
     f2_leisure.material.opacity = 0.7;
     f2_leisure.position.x = -12;
     f2_leisure.position.y = 10.51;
     f2_leisure.position.z = 6.5;
     scene.add(f2_leisure);

     let f2_room5 = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 2));
     f2_room5.name = "area_room5";
     f2_room5.material.color.set(colorScale['area_room5']);
     f2_room5.material.transparent = true;
     f2_room5.material.needsUpdate = true;
     f2_room5.material.opacity = 0.7;
     f2_room5.position.x = -11.5;
     f2_room5.position.y = 10.51;
     f2_room5.position.z = 3;
     scene.add(f2_room5);

     let f2_room6 = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 2));
     f2_room6.name = "area_room6";
     f2_room6.material.color.set(colorScale['area_room6']);
     f2_room6.material.transparent = true;
     f2_room6.material.needsUpdate = true;
     f2_room6.material.opacity = 0.7;
     f2_room6.position.x = -4;
     f2_room6.position.y = 10.51;
     f2_room6.position.z = -1;
     scene.add(f2_room6);*/


/*    let canvas = document.getElementsByClassName("heatmap-canvas")[0];

    let plane_pic = new THREE.BoxGeometry( 30, 0, 16 );
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    let plane_pic_material = new THREE.MeshBasicMaterial( { transparent:true,opacity:0.8 } );
    let pic_box = new THREE.Mesh( plane_pic, plane_pic_material );
    pic_box.position.y = 0.01;
    pic_box.name = "heatmap";
    pic_box.material.map = texture;
    scene.add(pic_box);*/
}

d3.select("#main").append("div")
    .style({
        "position":"absolute",
        "bottom":"0.5%",
        "left":"0.5%",
        "pointer-events":"none",
        "z-index":20
    })
    .append("span")
    .attr("id","main_date")
    .style({
        "color":"#ffffff",
        "font-size":"10px"
    });

/*d3.select(".all_view").append("div")
    .attr("id","heatmap")
    .style({
        "position":"absolute",
        "width":'1200px',
        "height":'512px',
        "pointer-events":"none",
        "z-index":20,
        "display":"none"
    });
// minimal heatmap instance configuration
heatmapInstance = h337.create({
    container: document.querySelector('#heatmap'),
    gradient:{0.1: "#20C2E1", 0.3: "#23D561", 0.5: "#F1E229", 1.0: "#ff1815"},
    radius:60,
    blur:1
});*/

function draw_f1_area(geo_height,color,opacity){

    let f1_group = new THREE.Group();
    f1_group.name = 'f1_group';
    scene.add(f1_group);

    let plane = new THREE.BoxGeometry( 30, 0, 16 );
    let plane_material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("img/floor1.jpg"),transparent:true,opacity:1 } );
    let pic = new THREE.Mesh( plane, plane_material );
    pic.position.y = 0.01;
    f1_group.add(pic);

    let f1_areaMain = new THREE.Mesh(new THREE.BoxGeometry(10 ,geo_height,  10));
    f1_areaMain.name = "area_main";
    f1_areaMain.material.color.set(color);
    f1_areaMain.material.transparent = true;
    f1_areaMain.material.needsUpdate = true;
    f1_areaMain.material.opacity = opacity;
    f1_areaMain.position.x = 9;
    f1_areaMain.position.y = geo_height/2+0.01;
    f1_areaMain.position.z = -1;
    f1_group.add(f1_areaMain);

    //let f1_areaMain_edges = new THREE.BoxHelper(f1_areaMain, "#FFFFFF");//设置边框，可以旋转
    //f1_group.add(f1_areaMain_edges);

    let f1_areaA = new THREE.Mesh(new THREE.BoxGeometry(5 ,geo_height,  2));
    f1_areaA.name = "area_A";
    f1_areaA.material.color.set(color);
    f1_areaA.material.transparent = true;
    f1_areaA.material.needsUpdate = true;
    f1_areaA.material.opacity = opacity;
    f1_areaA.position.x = -11.5;
    f1_areaA.position.y = geo_height/2+0.01;
    f1_areaA.position.z = -5;
    f1_group.add(f1_areaA);

    let f1_areaB = new THREE.Mesh(new THREE.BoxGeometry(5 ,geo_height,  2));
    f1_areaB.name = "area_B";
    f1_areaB.material.color.set(color);
    f1_areaB.material.transparent = true;
    f1_areaB.material.needsUpdate = true;
    f1_areaB.material.opacity = opacity;
    f1_areaB.position.x = -11.5;
    f1_areaB.position.y = geo_height/2+0.01;
    f1_areaB.position.z = -3;
    f1_group.add(f1_areaB);

    let f1_areaC = new THREE.Mesh(new THREE.BoxGeometry(5 ,geo_height,  2));
    f1_areaC.name = "area_C";
    f1_areaC.material.color.set(color);
    f1_areaC.material.transparent = true;
    f1_areaC.material.needsUpdate = true;
    f1_areaC.material.opacity = opacity;
    f1_areaC.position.x = -11.5;
    f1_areaC.position.y = geo_height/2+0.01;
    f1_areaC.position.z = -1;
    f1_group.add(f1_areaC);

    let f1_areaD = new THREE.Mesh(new THREE.BoxGeometry(5 ,geo_height,  2));
    f1_areaD.name = "area_D";
    f1_areaD.material.color.set(color);
    f1_areaD.material.transparent = true;
    f1_areaD.material.needsUpdate = true;
    f1_areaD.material.opacity = opacity;
    f1_areaD.position.x = -11.5;
    f1_areaD.position.y = geo_height/2+0.01;
    f1_areaD.position.z = 1;
    f1_group.add(f1_areaD);

    let f1_areaDisc = new THREE.Mesh(new THREE.BoxGeometry(4 ,geo_height,  10));
    f1_areaDisc.name = "area_disc";
    f1_areaDisc.material.color.set(color);
    f1_areaDisc.material.transparent = true;
    f1_areaDisc.material.needsUpdate = true;
    f1_areaDisc.material.opacity = opacity;
    f1_areaDisc.position.x = 2;
    f1_areaDisc.position.y = geo_height/2+0.01;
    f1_areaDisc.position.z = -1;
    f1_group.add(f1_areaDisc);

    let f1_areaServe = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  2));
    f1_areaServe.name = "area_serve";
    f1_areaServe.material.color.set(color);
    f1_areaServe.material.transparent = true;
    f1_areaServe.material.needsUpdate = true;
    f1_areaServe.material.opacity = opacity;
    f1_areaServe.position.x = 5;
    f1_areaServe.position.y = geo_height/2+0.01;
    f1_areaServe.position.z = 7;
    f1_group.add(f1_areaServe);

    let f1_areaPoster = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  7));
    f1_areaPoster.name = "area_poster";
    f1_areaPoster.material.color.set(color);
    f1_areaPoster.material.transparent = true;
    f1_areaPoster.material.needsUpdate = true;
    f1_areaPoster.material.opacity = opacity;
    f1_areaPoster.position.x = -7;
    f1_areaPoster.position.y = geo_height/2+0.01;
    f1_areaPoster.position.z = -1.5;
    f1_group.add(f1_areaPoster);

    let f1_areaSign = new THREE.Mesh(new THREE.BoxGeometry(4 ,geo_height,  2));
    f1_areaSign.name = "area_sign";
    f1_areaSign.material.color.set(color);
    f1_areaSign.material.transparent = true;
    f1_areaSign.material.needsUpdate = true;
    f1_areaSign.material.opacity = opacity;
    f1_areaSign.position.x = -11;
    f1_areaSign.position.y = geo_height/2+0.01;
    f1_areaSign.position.z = 5;
    f1_group.add(f1_areaSign);

    let f1_room1 = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  4));
    f1_room1.name = "area_room1";
    f1_room1.material.color.set(color);
    f1_room1.material.transparent = true;
    f1_room1.material.needsUpdate = true;
    f1_room1.material.opacity = opacity;
    f1_room1.position.x = -4;
    f1_room1.position.y = geo_height/2+0.01;
    f1_room1.position.z = 0;
    f1_group.add(f1_room1);

    let f1_room2 = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  2));
    f1_room2.name = "area_room2";
    f1_room2.material.color.set(color);
    f1_room2.material.transparent = true;
    f1_room2.material.needsUpdate = true;
    f1_room2.material.opacity = opacity;
    f1_room2.position.x = -4;
    f1_room2.position.y = geo_height/2+0.01;
    f1_room2.position.z = 3;
    f1_group.add(f1_room2);

    let f1_room3 = new THREE.Mesh(new THREE.BoxGeometry(4 ,geo_height,  2));
    f1_room3.name = "area_room3";
    f1_room3.material.color.set(color);
    f1_room3.material.transparent = true;
    f1_room3.material.needsUpdate = true;
    f1_room3.material.opacity = opacity;
    f1_room3.position.x = 8;
    f1_room3.position.y = geo_height/2+0.01;
    f1_room3.position.z = 7;
    f1_group.add(f1_room3);

    let f1_room4 = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  2));
    f1_room4.name = "area_room4";
    f1_room4.material.color.set(color);
    f1_room4.material.transparent = true;
    f1_room4.material.needsUpdate = true;
    f1_room4.material.opacity = opacity;
    f1_room4.position.x = 11;
    f1_room4.position.y = geo_height/2+0.01;
    f1_room4.position.z = 7;
    f1_group.add(f1_room4);

    let f1_wc1 = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  2));
    f1_wc1.name = "area_wc1";
    f1_wc1.material.color.set(color);
    f1_wc1.material.transparent = true;
    f1_wc1.material.needsUpdate = true;
    f1_wc1.material.opacity = opacity;
    f1_wc1.position.x = -4;
    f1_wc1.position.y = geo_height/2+0.01;
    f1_wc1.position.z = -3;
    f1_group.add(f1_wc1);

    let f1_wc2 = new THREE.Mesh(new THREE.BoxGeometry(2 ,geo_height,  2));
    f1_wc2.name = "area_wc2";
    f1_wc2.material.color.set(color);
    f1_wc2.material.transparent = true;
    f1_wc2.material.needsUpdate = true;
    f1_wc2.material.opacity = opacity;
    f1_wc2.position.x = 13;
    f1_wc2.position.y = geo_height/2+0.01;
    f1_wc2.position.z = 7;
    f1_group.add(f1_wc2);

}

//---------------------------轨迹绘制------------------------------------------------------------

let time_scale = d3.scale.linear()
    .domain([new Date(2019,0,1,7),new Date(2019,0,1,18)])
    .range([0,10]);

let opacity_scale = d3.scale.linear()
    .domain([0,100])
    .range([0.3,0.8]);

let stay_scale = d3.scale.linear()
    .domain([0,50000])
    .range([0,10]);

function draw_group_traj(group,param) {

    if(scene.getObjectByName('group'+group)){
        scene.getObjectByName('group'+group).visible = !scene.getObjectByName('group'+group).visible;
    }
    else {
        $.ajax({
            url: day_url+"_group_traj",    //请求的url地址
            dataType: "json",   //返回格式为json
            data:{group:group},
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json",
            beforeSend: function () {//请求前的处理
            },
            success: function (data, textStatus) {
                //console.log(data);
                let material = new THREE.LineBasicMaterial({color:param,transparent: true, opacity: 0.2});
                let type_group = new THREE.Group();
                type_group.name = 'group'+group;
                data.forEach((d)=>{
                        //console.log(d.id);
                        let points_3d = [];
                        let points_3d_f2 = [];
                        d.traj.forEach((s)=>{
                            //s.date = new Date(s.date);
                            if( s.floor ===1)
                                points_3d.push(new THREE.Vector3( s.coor[1]-14.5, stay_scale(s.stay), s.coor[0]-7.5 ));
                            else
                                points_3d_f2.push(new THREE.Vector3( s.coor[1]-14.5, 15.1+stay_scale(s.stay), s.coor[0]-7.5 ));
                        });

                        let geometry = new THREE.Geometry();
                        geometry.vertices = new THREE.CatmullRomCurve3(points_3d).getPoints( 1000 );
                        type_group.add(new THREE.Line(geometry, material));

                        if(points_3d_f2.length>1){
                            let geometry = new THREE.Geometry();
                            geometry.vertices = new THREE.CatmullRomCurve3(points_3d_f2).getPoints( 1000 );
                            type_group.add(new THREE.Line(geometry, material));
                        }

                        // let geometry2 = new THREE.Geometry();
                        // geometry2.vertices = new THREE.CatmullRomCurve3(points_3d_f2).getPoints( 1000 );
                        // type_group.add(new THREE.Line(geometry2, trackMaterial[type]));
                });
                scene.add(type_group);
            },
            complete: function () {//请求完成的处理
            },
            error: function () {//请求出错处理
            }
        });
    }

}


//---------------------------轨迹绘制------------------------------------------------------------


//----------------------------------------------------------

let y_scale = d3.scale.linear()
    .domain([0,90])
    .range([0,10]);

function heatmap(date,floor) {
    $.ajax({
        url: "/day1_sensor",    //请求的url地址
        dataType: "json",   //返回格式为json
        data:{
            date:date,
            floor:floor
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (data, textStatus) {
            //console.log(data);
            let max = 5;
            let points = [];
            data.forEach((d)=>{
                max = Math.max(max,d.data);
                let point = {
                    y:parseInt(d.x)*40,
                    x:parseInt(d.y)*40,
                    value: d.data,
                };
                points.push(point)
            });

            let heat_data = {
                max:max,
                data:points
            }
            heatmapInstance.setData(heat_data);
            let canvas = document.getElementsByClassName("heatmap-canvas")[0];
            let texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            scene.getObjectByName("heatmap").material.map = texture;
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
}

function heatmap_3d(date,floor) {
    $.ajax({
        url: day_url+"_sensor",    //请求的url地址
        dataType: "json",   //返回格式为json
        data:{
            date:date,
            floor:floor
        },
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json",
        beforeSend: function () {//请求前的处理
        },
        success: function (dataset, textStatus) {

            if(scene.getObjectByName('sensor_group'+floor))
                scene.remove(scene.getObjectByName('sensor_group'+floor));
            let sensor_group1 = new THREE.Group();
            sensor_group1.name = 'sensor_group'+floor;
            scene.add(sensor_group1);
            dataset.forEach((d)=>{
                //console.log(y_scale(d.data));
                if(d.data){
                    let sensor = new THREE.Mesh(new THREE.BoxGeometry(1,y_scale(d.data), 1));
                    sensor.name = "sensor_"+d.sid;
                    sensor.material.color.set(threshold(d.data));
                    sensor.material.transparent = true;
                    sensor.material.needsUpdate = true;
                    sensor.material.opacity = 0.5;
                    sensor.position.x = d.y-14.5;
                    sensor.position.y = (floor === 1)?(y_scale(d.data)/2+0.002):(y_scale(d.data)/2+15.002);
                    sensor.position.z = d.x-7.5;
                    sensor_group1.add(sensor);
                }
            });

            console.log(d3.max(dataset,(d)=>d.data));
            //}
        },
        complete: function () {//请求完成的处理
        },
        error: function () {//请求出错处理
        }
    });
}

//----------------------------------------------------------


//---------------场景交互---------------------------------------------

let raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2();

function onMouseClick( event ) {

    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.offsetX / width ) * 2 - 1;
    mouse.y = - ( event.offsetY /  height ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );

    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects( scene.getObjectByName('f1_group').children );

    //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
    if(intersects.length>0 && all_areas.indexOf(intersects[0].object.name) !== -1) {
        console.log(time_line.option.legend.selected[intersects[0].object.name] = !time_line.option.legend.selected[intersects[0].object.name]);
        time_line.myChart.setOption(time_line.option);
    }

}

function init_color() {
    all_areas.forEach((d)=>{
        if(scene.getObjectByName(d))
            scene.getObjectByName(d).material.color.set("#4f51ff");
    });
}

function onHover( event ) {

    event.preventDefault();
    init_color();
    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.offsetX / width ) * 2 - 1;
    mouse.y = - ( event.offsetY /  height ) * 2 + 1 ;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );
    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects( scene.getObjectByName('f1_group').children);

    if(intersects.length>0 && all_areas.indexOf(intersects[0].object.name) !== -1) {
        //console.log(intersects);
        document.body.style.cursor = 'pointer';
        scene.getObjectByName(intersects[0].object.name).material.color.set("#ff333d");
        intersects = null;
    }
    else{
        document.body.style.cursor = '';
        init_color();
    }
}

document.getElementById("main").addEventListener( 'click', onMouseClick, false );

document.getElementById('main').addEventListener('mousemove',onHover,false);

//-------------------------------------------------------------


//-------------------------------------------------------------
//初始化性能插件

let stats;
function initStats() {
    stats = new Stats();
    document.getElementById("main").appendChild(stats.dom);
}

//------------------------------------------------------------

//---------------------------------------------------------
//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放

let controls;

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.maxPolarAngle = 0.4*Math.PI;
    controls.minPolarAngle = 0;
    //controls.enableRotate = false;
    //controls.autoRotate = true;
    //controls.autoRotateSpeed = 0.1;
    //设置相机距离原点的最远距离
    controls.minDistance = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance = 300;
    //是否开启右键拖拽
    //controls.enablePan = true;

}

//---------------------------------------------------------

function render() {
    renderer.render(scene, camera);
    //TWEEN.update();
}

//窗口变动触发的函数
function onWindowResize() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(width, height);
}

let threshold=d3.scale.threshold()
    .domain([10,30,60,90])
    .range(["#23D561","#9CD523","#FFBF3A","#FB8C00","#FF5252"]);

var legend = d3.select("#main")
    .append("div")
    .attr("id","main_lg")
    .attr("width",100)
    .attr("height",200)
    .style({
        "position": "absolute",
        "float":"left",
        "z-index": "999",
        "left": "2%",
        "bottom":"2%",
        "display":"none"
    })
    .append("svg")
    .attr("width",100)
    .attr("height",200);

legend.selectAll(".main_legend")
    .data(["#FF5252","#FB8C00","#FFBF3A","#9CD523","#23D561"])
    .enter()
    .append("rect")
    .attr("x",5)
    .attr("y",function (d,i) {
        return i*25;
    })
    .attr("width",10)
    .attr("height",25)
    .style("fill",function (d) {
        return d;
    });

legend.selectAll(".lg_text")
    .data([90,60,30,10])
    .enter()
    .append("text")
    .text(function (d) {
        return d;
    })
    .attr("x",35)
    .attr("y",function (d,i) {
        return (i+1)*25;
    })
    .style({
        "fill":"#FFFFFF",
        "font-size":"10",
        "text-anchor":"middle"
    });

var mainChart_tool = d3.select("#main")
    .append("div")
    .attr("class", "btn-group btn-group-sm")
    .style({
        "position": "absolute",
        "float":"left",
        "z-index": "999",
        "left": "15%",
        "top":"2%"
    })
    .selectAll("btn btn-default")
    .data(["mode","refresh","shopping-cart"])
    .enter()
    .append("button")
    .attr({
        "type": "button",
        "class": "btn btn-default"
    })
    .text((d)=>{
        if(d === "mode")
            return "2D";
    })
    .style({
        "font-weight":800
    })
    .on("click",function (d) {
        if(d === 'refresh'){
            if(scene.getObjectByName('sensor_group1'))
                scene.remove(scene.getObjectByName('sensor_group1'));
        }
        else if(d === 'mode'){
            main_chart.view_2D = !main_chart.view_2D;
            if(main_chart.view_2D){
                d3.select(this).text("2D").style({
                    "font-weight":800
                });
                camera.position.set( 0, 30,0 );
            }

            else{
                d3.select(this).text("3D").style({
                    "font-weight":800
                });
                camera.position.set( 0, -30,0 );
            }

        }
    })
    .attr("title", function (d) {
        switch (d) {
            case "check":
                return "日期";
            case "refresh":
                return "刷新";
        }
    });

mainChart_tool.append("span")
    .attr("class", function (d) {
        return d==="2D"?"glyphicon":"glyphicon glyphicon-"+ d;
    })
    .style({
        "font-weight":800
    })
    .attr("aria-hidden",true);


function animate() {

    //更新控制器
    render();
    //更新性能插件
    stats.update();
    //更新相关位置
    controls.update();
    requestAnimationFrame(animate);
    //设置间隔调用update函数,间隔次数为每秒30次
    //setInterval(animate,1000/30);
}

function draw() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();
    animate();
    window.onresize = onWindowResize;
}

draw();


/*let extent = [];

 for(let i = new Date(2019,0,1,7,0,0).getTime();i<=new Date(2019,0,1,18,0,0).getTime();i += 60000) {
 let date = new Date(i);
 extent.push(date);
 }
 let index = 0;
 let interval = setInterval(function () {
 if(index>extent.length-1)
 clearInterval(interval);
 heatmap_3d(extent[++index],1);
 },1000)*/
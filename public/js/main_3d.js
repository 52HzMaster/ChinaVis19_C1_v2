/**
 * Created by Liang Liu on 2019/3/29.
 */

let renderer;

let floor_wh = $("#main");
let width = floor_wh.width();
let height = floor_wh.height();

var heatmapInstance;

function initRender() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor('#302b63',1);
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.getElementById("main").appendChild(renderer.domElement);
}

let camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(45,width/height,10,100);
    //camera = new THREE.OrthographicCamera(-20, 20, 10, -10, 1, 100);
    camera.position.set( 0, 30,10 );
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
}

let scene;

function initScene() {

    scene = new THREE.Scene();

}

let light;

function initLight() {

    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 30, 0);

    //告诉平行光需要开启阴影投射

    light.castShadow = true;

    scene.add(light);

}

function initModel() {

    //辅助工具1
    let helper_axes = new THREE.AxisHelper(50);
    helper_axes.position.set(0, 0, 0);
    scene.add(helper_axes);

    //辅助工具2
    let helper = new THREE.GridHelper(50,100);
    helper.material.color = new THREE.Color("#62a6ff");
    scene.add(helper);

    //底部平面
    // let planeGeometry = new THREE.PlaneGeometry(50, 50);
    // let planeMaterial = new THREE.MeshLambertMaterial({color: "#aaaaaa"});
    //
    // let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -0.5 * Math.PI;
    // plane.position.y = 0;
    // scene.add(plane);

    let plane = new THREE.BoxGeometry( 30, 0, 16 );
    let plane_material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("img/floor1.jpg"),transparent:true,opacity:0.5 } );
    let pic = new THREE.Mesh( plane, plane_material );
    scene.add(pic);

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3


    /*    let floor1 = new THREE.Mesh(new THREE.BoxGeometry(30, 0, 16));
        floor1.name = "floor1";
        floor1.material.color.set("#aaaaaa");
        floor1.position.x = 0;
        floor1.position.y = 0.01;
        floor1.position.z = 0;

        scene.add(floor1);

        let f1_edges = new THREE.BoxHelper(floor1, "#FFFFFF");//设置边框，可以旋转
        f1_edges.name = "f1_edges";
        scene.add(f1_edges);*/


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
    // let f1_areaMain = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 10));
    // f1_areaMain.name = "area_main";
    // f1_areaMain.material.color.set(colorScale['area_main']);
    // f1_areaMain.material.transparent = true;
    // f1_areaMain.material.needsUpdate = true;
    // f1_areaMain.material.opacity = 0.1;
    // f1_areaMain.position.x = 9;
    // f1_areaMain.position.y = 0.06;
    // f1_areaMain.position.z = -1;
    // scene.add(f1_areaMain);

    // let f1_areaMain_edges = new THREE.BoxHelper(f1_areaMain, "#FFFFFF");//设置边框，可以旋转
    // scene.add(f1_areaMain_edges);

    // let f1_areaDisc = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 10));
    // f1_areaDisc.name = "area_disc";
    // f1_areaDisc.material.color.set(colorScale['area_disc']);
    // f1_areaDisc.material.transparent = true;
    // f1_areaDisc.material.needsUpdate = true;
    // f1_areaDisc.material.opacity = 0.1;
    // f1_areaDisc.position.x = 2;
    // f1_areaDisc.position.y = 0.06;
    // f1_areaDisc.position.z = -1;
    // scene.add(f1_areaDisc);

    let trackMaterial = [
        new THREE.LineBasicMaterial({color : "#7eff39",transparent: true,opacity: 0.8}),
        new THREE.LineBasicMaterial({color : "#ffb54f",transparent: true,opacity: 0.2}),
        new THREE.LineBasicMaterial({color : "#ff7064",transparent: true,opacity: 0.2}),
        new THREE.LineBasicMaterial({color : "#4b59ff",transparent: true,opacity: 0.2}),
        new THREE.LineBasicMaterial({color : "#fff2f7",transparent: true,opacity: 0.2}),
        new THREE.LineBasicMaterial({color : "#ff53de",transparent: true,opacity: 0.2}),
        new THREE.LineBasicMaterial({color : "#59f7ff",transparent: true,opacity: 0.2}),
        new THREE.LineBasicMaterial({color : "#ff176d",transparent: true,opacity: 0.2}),
    ];

    let date_extent = [new Date(2019,0,1,7),new Date(2019,0,1,18)];

    let y_scale = d3.time.scale()
        .domain(date_extent)
        .range([0,20]);

    /*        let test = "[{'date': '2019-1-1 14:03:00', 'coor': [15, 2], 'floor': 1}, {'date': '2019-1-1 14:03:08', 'coor': [14, 2], 'floor': 1}, {'date': '2019-1-1 14:03:16', 'coor': [13, 3], 'floor': 1}, {'date': '2019-1-1 14:07:19', 'coor': [14, 3], 'floor': 1}, {'date': '2019-1-1 14:07:26', 'coor': [14, 4], 'floor': 1}, {'date': '2019-1-1 14:07:33', 'coor': [13, 5], 'floor': 1}, {'date': '2019-1-1 14:07:45', 'coor': [12, 6], 'floor': 1}, {'date': '2019-1-1 14:07:55', 'coor': [11, 6], 'floor': 1}, {'date': '2019-1-1 14:08:03', 'coor': [10, 6], 'floor': 1}, {'date': '2019-1-1 14:08:12', 'coor': [9, 6], 'floor': 1}, {'date': '2019-1-1 14:08:22', 'coor': [9, 5], 'floor': 1}, {'date': '2019-1-1 14:08:48', 'coor': [8, 5], 'floor': 1}, {'date': '2019-1-1 15:54:49', 'coor': [8, 6], 'floor': 1}, {'date': '2019-1-1 15:55:05', 'coor': [8, 7], 'floor': 1}, {'date': '2019-1-1 15:55:18', 'coor': [7, 8], 'floor': 1}, {'date': '2019-1-1 15:55:32', 'coor': [7, 9], 'floor': 1}, {'date': '2019-1-1 16:09:49', 'coor': [6, 9], 'floor': 1}, {'date': '2019-1-1 16:10:04', 'coor': [5, 9], 'floor': 1}, {'date': '2019-1-1 16:10:20', 'coor': [4, 9], 'floor': 1}, {'date': '2019-1-1 16:10:32', 'coor': [4, 10], 'floor': 1}, {'date': '2019-1-1 16:15:19', 'coor': [4, 9], 'floor': 1}, {'date': '2019-1-1 16:15:31', 'coor': [3, 8], 'floor': 1}, {'date': '2019-1-1 16:25:39', 'coor': [4, 9], 'floor': 1}, {'date': '2019-1-1 16:25:47', 'coor': [5, 9], 'floor': 1}, {'date': '2019-1-1 16:25:57', 'coor': [6, 9], 'floor': 1}, {'date': '2019-1-1 16:26:05', 'coor': [7, 9], 'floor': 1}, {'date': '2019-1-1 16:26:21', 'coor': [8, 8], 'floor': 1}, {'date': '2019-1-1 16:26:29', 'coor': [9, 8], 'floor': 1}, {'date': '2019-1-1 16:26:37', 'coor': [10, 9], 'floor': 1}, {'date': '2019-1-1 16:26:49', 'coor': [11, 9], 'floor': 1}, {'date': '2019-1-1 16:26:59', 'coor': [12, 9], 'floor': 1}, {'date': '2019-1-1 16:27:07', 'coor': [13, 10], 'floor': 1}, {'date': '2019-1-1 16:27:15', 'coor': [14, 11], 'floor': 1}, {'date': '2019-1-1 16:27:23', 'coor': [14, 10], 'floor': 1}, {'date': '2019-1-1 16:27:32', 'coor': [14, 11], 'floor': 2}, {'date': '2019-1-1 16:27:48', 'coor': [14, 10], 'floor': 2}, {'date': '2019-1-1 16:27:56', 'coor': [14, 9], 'floor': 2}, {'date': '2019-1-1 16:28:04', 'coor': [14, 8], 'floor': 2}, {'date': '2019-1-1 16:28:12', 'coor': [14, 7], 'floor': 2}, {'date': '2019-1-1 16:28:20', 'coor': [14, 6], 'floor': 2}, {'date': '2019-1-1 16:28:28', 'coor': [14, 5], 'floor': 2}, {'date': '2019-1-1 16:28:45', 'coor': [14, 4], 'floor': 2}, {'date': '2019-1-1 16:28:56', 'coor': [14, 3], 'floor': 2}, {'date': '2019-1-1 16:29:10', 'coor': [14, 2], 'floor': 2}, {'date': '2019-1-1 16:29:22', 'coor': [15, 2], 'floor': 2}, {'date': '2019-1-1 16:29:35', 'coor': [15, 1], 'floor': 2}, {'date': '2019-1-1 16:30:29', 'coor': [15, 2], 'floor': 2}, {'date': '2019-1-1 16:30:40', 'coor': [14, 3], 'floor': 2}, {'date': '2019-1-1 16:30:54', 'coor': [14, 4], 'floor': 2}, {'date': '2019-1-1 16:31:11', 'coor': [14, 5], 'floor': 2}, {'date': '2019-1-1 16:31:53', 'coor': [14, 6], 'floor': 2}, {'date': '2019-1-1 16:32:27', 'coor': [14, 7], 'floor': 2}, {'date': '2019-1-1 16:32:51', 'coor': [14, 8], 'floor': 2}, {'date': '2019-1-1 16:33:15', 'coor': [14, 9], 'floor': 2}, {'date': '2019-1-1 16:33:38', 'coor': [14, 10], 'floor': 2}, {'date': '2019-1-1 16:34:10', 'coor': [14, 11], 'floor': 2}, {'date': '2019-1-1 16:34:19', 'coor': [14, 10], 'floor': 1}, {'date': '2019-1-1 16:34:35', 'coor': [14, 11], 'floor': 1}, {'date': '2019-1-1 16:35:10', 'coor': [13, 11], 'floor': 1}, {'date': '2019-1-1 16:35:20', 'coor': [13, 10], 'floor': 1}, {'date': '2019-1-1 16:35:40', 'coor': [12, 9], 'floor': 1}, {'date': '2019-1-1 16:35:53', 'coor': [11, 8], 'floor': 1}, {'date': '2019-1-1 16:36:02', 'coor': [10, 7], 'floor': 1}, {'date': '2019-1-1 16:36:12', 'coor': [9, 6], 'floor': 1}, {'date': '2019-1-1 16:36:21', 'coor': [9, 5], 'floor': 1}, {'date': '2019-1-1 16:36:43', 'coor': [9, 4], 'floor': 1}, {'date': '2019-1-1 16:37:07', 'coor': [9, 3], 'floor': 1}, {'date': '2019-1-1 17:21:59', 'coor': [9, 4], 'floor': 1}, {'date': '2019-1-1 17:22:21', 'coor': [9, 5], 'floor': 1}, {'date': '2019-1-1 17:22:38', 'coor': [9, 6], 'floor': 1}, {'date': '2019-1-1 17:22:53', 'coor': [10, 6], 'floor': 1}, {'date': '2019-1-1 17:23:02', 'coor': [10, 7], 'floor': 1}, {'date': '2019-1-1 17:23:10', 'coor': [11, 8], 'floor': 1}, {'date': '2019-1-1 17:23:18', 'coor': [12, 9], 'floor': 1}, {'date': '2019-1-1 17:23:26', 'coor': [12, 10], 'floor': 1}, {'date': '2019-1-1 17:23:41', 'coor': [13, 11], 'floor': 1}, {'date': '2019-1-1 17:23:51', 'coor': [14, 11], 'floor': 1}, {'date': '2019-1-1 17:23:59', 'coor': [14, 12], 'floor': 1}, {'date': '2019-1-1 17:24:07', 'coor': [14, 13], 'floor': 1}, {'date': '2019-1-1 17:24:17', 'coor': [14, 14], 'floor': 1}, {'date': '2019-1-1 17:24:27', 'coor': [14, 15], 'floor': 1}, {'date': '2019-1-1 17:24:40', 'coor': [14, 16], 'floor': 1}, {'date': '2019-1-1 17:24:47', 'coor': [14, 17], 'floor': 1}, {'date': '2019-1-1 17:24:55', 'coor': [15, 17], 'floor': 1}]"

            let traj_data = JSON.parse(test.replace(/'/g,'"'));
            traj_data.forEach((d)=>d.date = new Date(d.date));
            //console.log(traj_data);
            let point_3d = [];
            traj_data.forEach((d)=>{
                point_3d.push(new THREE.Vector3( d.coor[1]-14.5, y_scale(d.date), d.coor[0]-7.5 ))
            });
            let geometry = new THREE.Geometry();
            geometry.vertices = new THREE.CatmullRomCurve3(point_3d).getPoints( 1000 );
            scene.add(new THREE.Line(geometry, trackMaterial[0]));*/
    /*     $.ajax({
         url: "/day1_group",    //请求的url地址
         dataType: "json",   //返回格式为json
         async: true, //请求是否异步，默认为异步，这也是ajax重要特性
         type: "GET",   //请求方式
         contentType: "application/json",
         beforeSend: function () {//请求前的处理
         },
         success: function (data, textStatus) {
             //console.log(data);
             data.forEach((group,type)=>{
             //let type = 7;
                 let type_group = new THREE.Group();
                 type_group.name = 'group'+type;
                 group.values.forEach((s)=>{
                     $.ajax({
                         url: "/day1_traj",    //请求的url地址
                         dataType: "json",   //返回格式为json
                         data:{id:s.id},
                         async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                         type: "GET",   //请求方式
                         contentType: "application/json",
                         beforeSend: function () {//请求前的处理
                         },
                         success: function (data, textStatus) {
                             let traj_data = JSON.parse(data[0].traj.replace(/'/g,'"'));
                             traj_data.forEach((d)=>d.date = new Date(d.date));
                             //console.log(traj_data);
                             let point_3d = [];
                             traj_data.forEach((d)=>{
                                 point_3d.push(new THREE.Vector3( d.coor[1]-14.5, y_scale(d.date), d.coor[0]-7.5 ))
                             });
                             let geometry = new THREE.Geometry();
                             geometry.vertices = new THREE.CatmullRomCurve3(point_3d).getPoints( 1000 );
                             type_group.add(new THREE.Line(geometry, trackMaterial[type]));
                         },
                         complete: function () {//请求完成的处理
                         },
                         error: function () {//请求出错处理
                         }
                     });
                 });
                 scene.add(type_group);
             });

         },
         complete: function () {//请求完成的处理
         },
         error: function () {//请求出错处理
         }
     });*/

    d3.select(".all_view").append("div")
        .attr("id","heatmap")
        .style({
            "position":"absolute",
            "width":'1200px',
            "height":'640px',
            "pointer-events":"none",
            "z-index":20,
            "display":"none"
        });
    // minimal heatmap instance configuration
    heatmapInstance = h337.create({
        container: document.querySelector('#heatmap'),
        gradient:{0.1: "#20C2E1", 0.3: "#23D561", 0.5: "#F1E229", 1.0: "#ff1815"},
        radius:50,
        blur:1
    });

    let canvas = document.getElementsByClassName("heatmap-canvas")[0];

    let plane_pic = new THREE.BoxGeometry( 30, 0, 16 );
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    let plane_pic_material = new THREE.MeshBasicMaterial( { transparent:true,opacity:0.8 } );
    let pic_box = new THREE.Mesh( plane_pic, plane_pic_material );
    pic_box.position.y = 0.01;
    pic_box.name = "heatmap";
    pic_box.material.map = texture;
    scene.add(pic_box);
}


let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onMouseClick( event ) {

    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.offsetX / width ) * 2 - 1;
    mouse.y = - ( event.offsetY /  height ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );

    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects( scene.children );

    //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
    if(intersects.length>0 && all_areas.indexOf(intersects[0].object.name) !== -1) {
        area_graph(intersects[0].object.name);
    }

}

function init_color() {
    all_areas.forEach((d)=>{
        if(scene.getObjectByName(d))
            scene.getObjectByName(d).material.color.set(colorScale[d]);
    });
}

function onHover( event ) {

    event.preventDefault();
    init_color();
    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.offsetX / width ) * 2 - 1;
    mouse.y = - ( event.offsetY /  height ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );
    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects( scene.children );

    if(intersects.length>0 && all_areas.indexOf(intersects[0].object.name) !== -1) {
        scene.getObjectByName(intersects[0].object.name).material.color.set("#FFF");
        intersects = null;
        document.body.style.cursor = 'pointer';
    }
    else{
        document.body.style.cursor = '';
        init_color();
    }
}

//document.getElementById("floor").addEventListener( 'click', onMouseClick, false );
//document.getElementById('floor').addEventListener('mousemove',onHover,false);

//初始化性能插件
let stats;
function initStats() {
    stats = new Stats();
    document.getElementById("main").appendChild(stats.dom);
}

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
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    //controls.enableRotate = false;
    //controls.autoRotate = true;
    //controls.autoRotateSpeed = 0.1;
    //设置相机距离原点的最远距离
    controls.minDistance = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance = 300;
    //是否开启右键拖拽
    controls.enablePan = true;

}

function render() {
    renderer.render(scene, camera);
}

//窗口变动触发的函数
function onWindowResize() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(width, height);
}


function animate() {

    //更新控制器
    render();
    //更新性能插件
    //stats.update();
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
    //initStats();
    animate();
    window.onresize = onWindowResize;
}
draw();
//area_legend();
//area legend

let color_type = ["#7eff39","#ffb54f","#ff7064","#4b59ff","#fff2f7","#ff53de","#59f7ff","#ff176d"];

let type_legend = d3.select("#main").append("div")
    .style({
        "position":"absolute",
        "bottom":"4%",
        "left":"4%",
        "z-index":10
    })
    .append("svg")
    .attr("width",300)
    .attr("height",height)
    .selectAll(".legend")
    .data([0,1,2,3,4,5,6,7])
    .enter()
    .append("rect")
    .attr("x",(d,i)=>i*30)
    .attr("y",40)
    .attr("width",20)
    .attr("height",10)
    .attr("fill",(d,i)=>color_type[i])
    .style({
        "cursor":"pointer"
    })
    .on("click",function (d,i) {


        let extent = [];
        for(let i = new Date(2019,0,1,7,0,0).getTime();i<new Date(2019,0,1,18,0,0).getTime();i += 50000) {
            let date_start = new Date(i);
            let date_end = new Date(i + 50000);
            extent.push([date_start,date_end]);
        }

        let index = 0;
        let heatmap_interval = setInterval(function () {
            if(index<extent.length-1){
                heatmap(extent[index])
            }
            else
                clearInterval(heatmap_interval);
            index++;
        },200);

        function heatmap(extent){
            $.ajax({
                url: "day1_pro_date",    //请求的url地址
                dataType: "json",   //返回格式为json
                data: {
                    date_start: extent[0],
                    date_end:  extent[1]
                },
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "GET",   //请求方式
                contentType: "application/json",
                beforeSend: function () {//请求前的处理
                },
                success: function (data, textStatus) {
                    let nest_sensor = d3.nest().key((d) => d.sid);
                    let test = nest_sensor.entries(data);
                    var points = [];
                    let max = 0;
                    test.forEach((d)=>{

                        let val = d.values.length;
                        let sid = d.key.toString();
                        max = Math.max(max,val);

                        if(sid.slice(0,1) === '1'){
                            let point = {
                                y:parseInt(sid.slice(1,3))*40,
                                x:parseInt(sid.slice(3,5))*40,
                                value: val,
                            }
                            points.push(point)
                        }

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


        //scene.getObjectByName('group'+i).visible = !scene.getObjectByName('group'+i).visible ;
    })
    .append("title")
    .text((d,i)=>"type"+i);

function area_legend() {

    let lg_size = height / 30;

    let area_legend = d3.select("#mian").append("div")
        .attr("id","area_legend")
        .style({
            "position":"absolute",
            "top":"4%",
            "left":0,
            "z-index":10
        });

    let area_lg_svg = d3.select('#area_legend').append("svg")
        .attr("width",100)
        .attr("height",height);

    area_lg_svg.selectAll('.legend')
        .data(all_areas)
        .enter()
        .append("rect")
        .attr("class","legend")
        .attr("x",function (d,i) {
            return  0;
        })
        .attr("y",(d,i)=>{
            return i * lg_size;
        })
        .attr("width",lg_size)
        .attr("height",lg_size/2)
        .attr("rx",lg_size/5)
        .attr("ry",lg_size/5)
        .style("fill",(d)=>colorScale[d])
        .on("mouseover",function(d){
            d3.select(this).style("fill","#FFF");
            // console.log(scene.getObjectByName("area_main"));
            scene.getObjectByName("area_main").material.color.set("#FFF");
        })
        .on("mouseout",function(d){
            d3.select(this).style("fill",colorScale[d]);
            scene.getObjectByName("area_main").material.color.set(colorScale['area_main']);
        });

    let legend_text = area_lg_svg.append("g").attr("transform","translate(0,"+lg_size/2.4+")");

    legend_text.selectAll(".legend_text")
        .data(all_areas)
        .enter()
        .append("text")
        .attr("x",function (d,i) {
            return  lg_size + 5;
        })
        .attr("y",(d,i)=>{
            return i * lg_size;
        })
        .attr("fill","#FFFFFF")
        .text((d)=>{
            return d;
        })
        .attr("font-size",lg_size/2);
}


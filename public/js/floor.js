/**
 * Created by Liang Liu on 2019/3/29.
 */

let renderer;

let floor_wh = $("#floor");
let width = floor_wh.width();
let height = floor_wh.height();

function initRender() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor('#303030',1);
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.getElementById("floor").appendChild(renderer.domElement);
}

let camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(45,width/height,10,100);
    //camera = new THREE.OrthographicCamera(-20, 20, 10, -10, 1, 100);
    camera.position.set( 0, 30,0 );
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
    // let helper = new THREE.GridHelper(50,100);
    // helper.material.color = new THREE.Color("#62a6ff");
    // scene.add(helper);

    //底部平面
    // let planeGeometry = new THREE.PlaneGeometry(50, 50);
    // let planeMaterial = new THREE.MeshLambertMaterial({color: "#aaaaaa"});
    //
    // let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -0.5 * Math.PI;
    // plane.position.y = 0;
    // scene.add(plane);

    let plane_pic = new THREE.BoxGeometry( 30, 0, 16 );
    let texture = new THREE.TextureLoader().load("img/floor1.jpg");
    let plane_pic_material = new THREE.MeshBasicMaterial( { map:texture,transparent:true,opacity:0.5 } );
    let pic_box = new THREE.Mesh( plane_pic, plane_pic_material );
    scene.add(pic_box);

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    /*
        let floor1 = new THREE.Mesh(new THREE.BoxGeometry(30, 2, 16));
        floor1.name = "floor1";
        floor1.material.color.set("#FFFFFF");
        floor1.position.x = 0;
        floor1.position.y = 1;
        floor1.position.z = 0;

        //scene.add(floor1);

        let f1_edges = new THREE.BoxHelper(floor1, "#FFFFFF");//设置边框，可以旋转
        f1_edges.name = "f1_edges";
        scene.add(f1_edges);

        */

        // let floor2 = new THREE.Mesh(new THREE.BoxGeometry(30, 2, 16));
        // floor2.name = "floor2";
        // floor2.position.x = 0;
        // floor2.position.y = 7.5;
        // floor2.position.z = 0;

        //scene.add(floor2);

        // let f2_edges = new THREE.BoxHelper(floor2, "#FFFFFF");//设置边框，可以旋转
        // scene.add(f2_edges);

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
        let f1_areaMain = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10));
        f1_areaMain.name = "area_main";
        f1_areaMain.material.color.set(colorScale['area_main']);
        f1_areaMain.material.transparent = true;
        f1_areaMain.material.needsUpdate = true;
        f1_areaMain.material.opacity = 0.5;
        f1_areaMain.position.x = 9;
        f1_areaMain.position.y = 0.26;
        f1_areaMain.position.z = -1;
        scene.add(f1_areaMain);

    let f1_areaMain_edges = new THREE.BoxHelper(f1_areaMain, "#FFFFFF");//设置边框，可以旋转
    scene.add(f1_areaMain_edges);

        let f1_areaDisc = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 10));
        f1_areaDisc.name = "area_disc";
        f1_areaDisc.material.color.set(colorScale['area_disc']);
        f1_areaDisc.material.transparent = true;
        f1_areaDisc.material.needsUpdate = true;
        f1_areaDisc.material.opacity = 0.5;
        f1_areaDisc.position.x = 2;
        f1_areaDisc.position.y = 0.26;
        f1_areaDisc.position.z = -1;
        scene.add(f1_areaDisc);

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
/*let stats;
function initStats() {
    stats = new Stats();
    document.getElementById("floor").appendChild(stats.dom);
}*/

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放

let controls;

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.maxPolarAngle = Math.PI * 0.35;
    controls.minPolarAngle = 0.1;
    //controls.enableRotate = false;
    //controls.autoRotate = true;
    //controls.autoRotateSpeed = 0.1;
    //设置相机距离原点的最远距离
    controls.minDistance = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance = 300;
    //是否开启右键拖拽
    controls.enablePan = false;

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
//area_legend();
//area legend
function area_legend() {

    let lg_size = height / 30;

    let area_legend = d3.select("#floor").append("div")
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

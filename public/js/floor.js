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
    renderer.setClearColor('#303030',1.0);
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.getElementById("floor").appendChild(renderer.domElement);

}

let camera;

function initCamera() {

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 60);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

}

let scene;

function initScene() {

    scene = new THREE.Scene();

}

let light;

function initLight() {

    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(15, 30, 10);

    //告诉平行光需要开启阴影投射

    light.castShadow = true;

    scene.add(light);

}

function initModel() {

    //辅助工具1
    let helper_axes = new THREE.AxesHelper(50);
    helper_axes.position.set(0, 0, 0);
    scene.add(helper_axes);

    //辅助工具2
    let helper = new THREE.GridHelper(50, 50);
    helper.material.color = new THREE.Color("#62a6ff");
    scene.add(helper);

    //底部平面
    let planeGeometry = new THREE.PlaneGeometry(50, 50);
    let planeMaterial = new THREE.MeshLambertMaterial({color: "#aaaaaa"});

    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = 0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;
    scene.add(plane);

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    let floor1 = new THREE.Mesh(new THREE.BoxGeometry(30, 5, 16));
    floor1.name = "floor1";
    floor1.material.color.set("#FFFFFF");
    floor1.position.x = 0;
    floor1.position.y = 2.5;
    floor1.position.z = 0;

    //scene.add(floor1);

    let f1_edges = new THREE.BoxHelper(floor1, "#FFFFFF");//设置边框，可以旋转
    f1_edges.name = "f1_edges";
    scene.add(f1_edges);

    let floor2 = new THREE.Mesh(new THREE.BoxGeometry(30, 5, 16));
    floor2.name = "floor2";
    floor2.position.x = 0;
    floor2.position.y = 7.5;
    floor2.position.z = 0;

    //scene.add(floor1);

    let f2_edges = new THREE.BoxHelper(floor2, "#FFFFFF");//设置边框，可以旋转
    scene.add(f2_edges);

    //立方体 （x轴宽度，y轴高度，z轴深度，沿宽面分段数，沿高度面分段数，沿深度面分段数）
    let f1_areaMain = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 10));
    f1_areaMain.name = "f1_areaMain";
    f1_areaMain.material.color.set(colorScale['area_main']);
    f1_areaMain.material.transparent = true;
    f1_areaMain.material.opacity = 0.5;
    f1_areaMain.position.x = 9;
    f1_areaMain.position.y = 1;
    f1_areaMain.position.z = -1;

    scene.add(f1_areaMain);

    //告诉立方体需要投射阴影
    f1_areaMain.castShadow = true;
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

    console.log(intersects);

    //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
    for ( let i = 0; i < intersects.length; i++ ) {
        if(intersects[ i ].object.name === "f1_areaMain");
            //intersects[ i ].object.material.color.set( 0xff0000 );

    }

}

document.addEventListener( 'click', onMouseClick, false );

function onMousemove( event ) {

    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.offsetX / width ) * 2 - 1;
    mouse.y = - ( event.offsetY /  height ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );

    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects( scene.children );

    console.log(intersects);

    //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
    for ( let i = 0; i < intersects.length; i++ ) {
        if(intersects[ i ].object.name === "f1_areaMain")
            intersects[ i ].object.material.opacity = 0.8;

    }

}

//document.addEventListener( 'mousemove', onMousemove, false );

function onMouseout( event ) {

    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.offsetX / width ) * 2 - 1;
    mouse.y = - ( event.offsetY /  height ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );

    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects( scene.children );

    console.log(intersects);

    //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
    for ( let i = 0; i < intersects.length; i++ ) {
        if(intersects[ i ].object.name === "f1_areaMain")
            intersects[ i ].object.material.opacity = 0.5;

    }

}

//document.addEventListener( 'mouseout', onMouseout, false );

//初始化性能插件
let stats;
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
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
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance = 50;
    //设置相机距离原点的最远距离
    controls.maxDistance = 200;
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
    stats.update();

    //更新相关位置
    controls.update();
    requestAnimationFrame(animate);
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
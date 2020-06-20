/*
作者:Mr.Xie
创建时间:2020年05月29日
功能描述:3D机房封装

使用方式
let props={domID:"three-dom"}
this.map = new ThreeMap(props[,dataJson]);
this.map.init();
*/
import * as THREE from 'three';
import 'imports-loader?THREE=three!threebsp'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'   //r100及以上
// var OrbitControls = require('three-orbit-controls')(THREE)  //r100 以下
export default class ThreeMap {
    constructor(props,dataJson) {
        
        this.props=props;
        this.data=new Array();
        this.dataJson=dataJson;
        this.objList = dataJson.objects;//对象列表
        this.eventList = dataJson.events;//事件对象列表
        this.btns = dataJson.btns;//按钮列表
        
        this.renderer=null;
        this.scene = null;//场景
        this.camera=null;
        this.objects = [];
        this.dom=document.getElementById(this.props.domID);
    }

    init() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.render();
        // this.setHelper();
        this.setControl();
        // this.add();
        this.InitData();  //添加3D对象、事件等
    }

    //初始化渲染场景
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight);
        this.dom.appendChild(this.renderer.domElement);
    }
    //初始化相机
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 1, 100000);
        this.camera.name = 'mainCamera';
        this.camera.position.set(0,1000,1800)
        //默认就是以Y轴为上方的
        // this.camera.up.x = 0;
        // this.camera.up.y =1;
        // this.camera.up.z =0;
        this.camera.lookAt({ x: 0, y: 0, z: 0 });
        this.objects.push(this.camera);
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x225F93);
    }
    //初始化灯光
    initLight(){
        var light = new THREE.AmbientLight(0xcccccc);
        light.position.set(0, 0,0);
        this.scene.add(light);
        var light2 = new THREE.PointLight(0x555555);
        light2.shadow.camera.near =1;
        light2.shadow.camera.far = 5000;
        light2.position.set(0, 350, 0);
        light2.castShadow = true;//表示这个光是可以产生阴影的
        this.scene.add(light2);
    }
    //渲染
    render() {
        this.animate()
    }
    animate() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
    setHelper() {
        //红色x,绿色y,蓝色z
        const axesHelper = new THREE.AxisHelper(5);
        this.scene.add(axesHelper);
    }
    //鼠标拖拽控制
    setControl() {
        this.controls = new OrbitControls(this.camera,this.dom);
        this.controls.update();
    }
    InitData(){
        if(this.objList.length>0){
            for(let i=0;i<this.objList.length;i++){
                this.InitAddObject(this.objList[i]);
            }
        }
    }
    //添加3D对象
    InitAddObject(obj){
        if (obj.show == null || typeof (obj.show) == 'undefined' || obj.show) {
            let tempObj = null;
            switch (obj.objType) {
                case 'cube':
                    tempObj = this.createCube(obj)
                    this.addObject(tempObj);
                    break;
                case 'wall':
                    this.CreateWall(obj);
                    break;
                case 'emptyCabinet':
                    tempObj = this.createEmptyCabinet(obj);
                    this.addObject(tempObj);

                // case 'cylinder':
                //     tempObj = this.createCylinder(obj)
                //     this.addObject(tempObj);
                //     break;
            }
        }
    }
    //创建墙
    CreateWall (obj) {
        let _this=this;
        var commonDepth = obj.depth || 40;//墙体厚度
        var commonHeight = obj.height || 100;//墙体高度
        var commonWidth = obj.width || 300;//墙体宽度
        var commonSkin = obj.style.skinColor || 0x98750f;
        //建立墙面
        obj.wallData.forEach(function(wallobj, index){
            var wallWidth = commonWidth;
            var wallDepth = wallobj.depth||commonDepth;
            var positionX = ((wallobj.startDot.x||0) + (wallobj.endDot.x||0)) / 2;
            var positionY = ((wallobj.startDot.y || 0) + (wallobj.endDot.y || 0)) / 2;
            var positionZ = ((wallobj.startDot.z || 0) + (wallobj.endDot.z || 0)) / 2;
            //z相同 表示x方向为长度
            if (wallobj.startDot.z == wallobj.endDot.z) {
                wallWidth = Math.abs(wallobj.startDot.x - wallobj.endDot.x);
                wallDepth = wallobj.depth || commonDepth;
            } else if (wallobj.startDot.x == wallobj.endDot.x) {
                wallWidth = wallobj.depth || commonDepth;
                wallDepth = Math.abs(wallobj.startDot.z - wallobj.endDot.z);
            }
            var cubeobj = {
                width: wallWidth,
                height: wallobj.height || commonHeight,
                depth: wallDepth,
                rotation: wallobj.rotation,
                x: positionX,
                y: positionY,
                z: positionZ,
                uuid: wallobj.uuid,
                name:wallobj.name,
                style: {
                    skinColor: commonSkin,
                    skin:wallobj.skin 
                }
            }
            var cube = _this.createCube(cubeobj);
            if (_this.commonFunc.hasObj(wallobj.childrens) && wallobj.childrens.length > 0) {
                wallobj.childrens.forEach(function(walchildobj, index){
                    var newobj = _this.CreateHole(walchildobj);
                    cube = _this.mergeModel(walchildobj.op, cube, newobj,commonSkin);
                })
            }
            _this.addObject(cube);
        });
    }
    //模型合并 使用ThreeBSP插件mergeOP计算方式 -表示减去 +表示加上 
    mergeModel(mergeOP, fobj, sobj,commonSkin) {
        var fobjBSP = new ThreeBSP(fobj);
        var sobjBSP = new ThreeBSP(sobj);
        var resultBSP = null; 
        if (mergeOP == '-') {
            resultBSP = fobjBSP.subtract(sobjBSP);
        } else if (mergeOP == '+') {
            var subMesh = new THREE.Mesh(sobj);
            sobj.updateMatrix();
            fobj.geometry.merge(sobj.geometry, sobj.matrix);
            return fobj;
        //    resultBSP = fobjBSP.union(sobjBSP);
        } else if (mergeOP == '&') {//交集
            resultBSP = fobjBSP.intersect(sobjBSP);
        } else {
            this.addObject(sobj);
            return fobj;
        }
        var cubeMaterialArray = [];
        cubeMaterialArray.push(new THREE.MeshLambertMaterial({
            // map: this.createSkin(128, 128, { imgurl: '/images/wall.png' }),
            vertexColors: THREE.FaceColors
        }));
        var result = resultBSP.toMesh(cubeMaterialArray);
        result.material.shading = THREE.FlatShading;
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();
        result.uuid= fobj.uuid+mergeOP+sobj.uuid;
        result.name=fobj.name+mergeOP+sobj.name;
        result.material.needsUpdate = true;
        result.geometry.buffersNeedUpdate = true;
        result.geometry.uvsNeedUpdate = true;

        result.material=fobj.material;

        for (var i = 0; i < result.geometry.faces.length; i++) {
            var faceset = false;
            for (var j = 0; j < fobj.geometry.faces; j++) {
                if (result.geometry.faces[i].vertexNormals[0].x === fobj.geometry.faces[j].vertexNormals[0].x
                    && result.geometry.faces[i].vertexNormals[0].y === fobj.geometry.faces[j].vertexNormals[0].y
                    && result.geometry.faces[i].vertexNormals[0].z === fobj.geometry.faces[j].vertexNormals[0].z
                    && result.geometry.faces[i].vertexNormals[1].x === fobj.geometry.faces[j].vertexNormals[1].x
                    && result.geometry.faces[i].vertexNormals[1].y === fobj.geometry.faces[j].vertexNormals[1].y
                    && result.geometry.faces[i].vertexNormals[1].z === fobj.geometry.faces[j].vertexNormals[1].z
                    && result.geometry.faces[i].vertexNormals[2].x === fobj.geometry.faces[j].vertexNormals[2].x
                    && result.geometry.faces[i].vertexNormals[2].y === fobj.geometry.faces[j].vertexNormals[2].y
                    && result.geometry.faces[i].vertexNormals[2].z === fobj.geometry.faces[j].vertexNormals[2].z) {
                        result.geometry.faces[i].color.setHex(commonSkin);
                        result.geometry.faces[i].materialIndex=fobj.geometry.faces[j].materialIndex
                        faceset == true
                }
            }
            if (faceset == false){
                for(var j = 0; j < sobj.geometry.faces.length; j++) {
                    if (result.geometry.faces[i].vertexNormals[0].x === sobj.geometry.faces[j].vertexNormals[0].x
                        && result.geometry.faces[i].vertexNormals[0].y === sobj.geometry.faces[j].vertexNormals[0].y
                        && result.geometry.faces[i].vertexNormals[0].z === sobj.geometry.faces[j].vertexNormals[0].z
                        && result.geometry.faces[i].vertexNormals[1].x === sobj.geometry.faces[j].vertexNormals[1].x
                        && result.geometry.faces[i].vertexNormals[1].y === sobj.geometry.faces[j].vertexNormals[1].y
                        && result.geometry.faces[i].vertexNormals[1].z === sobj.geometry.faces[j].vertexNormals[1].z
                        && result.geometry.faces[i].vertexNormals[2].x === sobj.geometry.faces[j].vertexNormals[2].x
                        && result.geometry.faces[i].vertexNormals[2].y === sobj.geometry.faces[j].vertexNormals[2].y
                        && result.geometry.faces[i].vertexNormals[2].z === sobj.geometry.faces[j].vertexNormals[2].z) {
                        result.geometry.faces[i].color.setHex(commonSkin);
                        result.geometry.faces[i].materialIndex=sobj.geometry.faces[j].materialIndex;
                        faceset = true;
                    }
                }
            }
            if (faceset == false) {
                //最后剩余的一点点给颜色
                result.geometry.faces[i].color.setHex(commonSkin);
            }
        }
        
        result.castShadow = true;
        result.receiveShadow = true;
        return result;
    }
    //挖洞、玻璃、挂东西
    CreateHole ( obj) {
        var commonDepth =  40;//厚度
        var commonHeight =  100;//高度
        var commonWidth =  300;//强体高度
        var commonSkin = 0x98750f;
        //建立墙面
        var wallWidth = commonWidth;
        var wallDepth = obj.depth || commonDepth;
        var positionX = ((obj.startDot.x || 0) + (obj.endDot.x || 0)) / 2;
        var positionY = ((obj.startDot.y || 0) + (obj.endDot.y || 0)) / 2;
        var positionZ = ((obj.startDot.z || 0) + (obj.endDot.z || 0)) / 2;
        //z相同 表示x方向为长度
        if (obj.startDot.z == obj.endDot.z) {
            wallWidth = Math.abs(obj.startDot.x - obj.endDot.x);
            wallDepth = obj.depth || commonDepth;
        } else if (obj.startDot.x == obj.endDot.x) {
            wallWidth = obj.depth || commonDepth;
            wallDepth = Math.abs(obj.startDot.z - obj.endDot.z);
        }
        var cubeobj = {
            width: wallWidth,
            height: obj.height || commonHeight,
            depth: wallDepth,
            rotation: obj.rotation,
            uuid: obj.uuid,
            name: obj.name,
            objType: obj.objType,
            x: positionX,
            y: positionY,
            z: positionZ,
            style: {
                skinColor: obj.skinColor || commonSkin,
                skin: obj.skin
            }
        }
        var cube=this.createCube(cubeobj);
        return cube;
    }
    //创建盒子体
    createCube(obj){
        var width = obj.width || 1000;  //x轴
        var height = obj.height || 10;  //y轴
        var depth=obj.depth || width;  //z轴
        var x = obj.x || 0, y = obj.y || 0, z = obj.z || 0;
        var skinColor = obj.style.skinColor || 0x98750f;
        //width：是x方向上的长度；height：是y方向上的长度；depth：是z方向上的长度；
        var cubeGeometry = new THREE.CubeGeometry(width, height, depth, 0, 0, 1);

        //六面颜色
        for (var i = 0; i < cubeGeometry.faces.length; i += 2) {
            var hex = skinColor || Math.random() * 0x531844;
            cubeGeometry.faces[i].color.setHex(hex);
            cubeGeometry.faces[i + 1].color.setHex(hex);
        }
        //六面纹理
        var skin_up_obj = {
            vertexColors: THREE.FaceColors
        }
        var skin_down_obj = skin_up_obj,
            skin_fore_obj = skin_up_obj,
            skin_behind_obj = skin_up_obj,
            skin_left_obj = skin_up_obj,
            skin_right_obj = skin_up_obj;
        var skin_opacity = 1;
        if (obj.style != null && typeof (obj.style) != 'undefined'
            && obj.style.skin != null && typeof (obj.style.skin) != 'undefined') {
            //透明度
            if (obj.style.skin.opacity != null && typeof (obj.style.skin.opacity) != 'undefined') {
                skin_opacity = obj.style.skin.opacity;
            }
            //右
            skin_right_obj = this.createSkinOption(depth, height, obj.style.skin.skin_right, cubeGeometry, 0);
            //左
            skin_left_obj = this.createSkinOption(depth, height, obj.style.skin.skin_left, cubeGeometry, 2);
            //上
            skin_up_obj = this.createSkinOption(width, depth, obj.style.skin.skin_up, cubeGeometry, 4);
            //下
            skin_down_obj = this.createSkinOption(width, depth, obj.style.skin.skin_down, cubeGeometry, 6);
            //前
            skin_fore_obj = this.createSkinOption(width, height, obj.style.skin.skin_fore, cubeGeometry, 8);
            //后
            skin_behind_obj = this.createSkinOption(width, height, obj.style.skin.skin_behind, cubeGeometry, 10);
        }
        var cubeMaterialArray = [];//右，左，上，下，前，后
        //右：134、364；左：570、720；上：451、501；下：762、632；前：021、231；后：465、675；
        //正面：上左上右下左下右(0123)；后面正对看：上左上右下左下右(4567)
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));
        
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterialArray);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.uuid = obj.uuid;
        cube.name = obj.name;
        cube.position.set(x, y, z);
        if (obj.rotation != null && typeof (obj.rotation) != 'undefined' && obj.rotation.length > 0) {
            obj.rotation.forEach(function(rotation_obj, index){
                // rotation: [{ direction: 'x', degree: 0.5*Math.PI }], 
                switch (rotation_obj.direction) {
                    case 'x':
                        cube.rotateX(rotation_obj.degree);
                        break;
                    case 'y':
                        cube.rotateY(rotation_obj.degree);
                        break;
                    case 'z':
                        cube.rotateZ(rotation_obj.degree);
                        break;
                    case 'arb':  //{ direction: 'arb', degree: [x,y,z,angle] }
                        cube.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                        break;
                }
            });
        }
        return cube;
    }
    //创建空柜子
    createEmptyCabinet(obj){
        //初始以下为基点
        var Cabinet,floorHeight=10;   
        //下
        var downobj= {
            show: true,
            uuid: "",
            name: "cubedown",
            objType: 'cube',
            width: obj.size.width,
            height: obj.size.thick,
            depth: obj.size.depth,
            x: obj.position.x,
            y: obj.position.y+floorHeight/2-(obj.size.height/2-obj.size.thick/2),
            z: obj.position.z,
            style: {
                skinColor: obj.style.skinColor,
                skin: obj.style.skin
            }
        }
        var downcube = this.createCube(downobj);
        // this.addObject(downcube,true);

        //上
        var upobj= {
            show: true,
            uuid: "",
            name: "cubetop",
            objType: 'cube',
            width: obj.size.width,
            height: obj.size.thick,
            depth: obj.size.depth,
            x: obj.position.x,
            y: obj.size.height+obj.size.thick,
            z: obj.position.z,
            style: {
                skinColor: obj.style.skinColor,
                skin: obj.style.skin
            }
        }
        var upcube = this.createCube(upobj);
        // this.addObject(upcube);
        
        Cabinet = this.mergeModel('+',downcube,upcube);
        
        //左
        var leftobj= {
            show: true,
            uuid: "",
            name: "cubeleft",
            objType: 'cube',
            width: obj.size.thick ,
            height: obj.size.height,
            depth: obj.size.depth,
            x: obj.position.x-(obj.size.width/2-obj.size.thick/2),
            y: obj.size.height/2+obj.size.thick/2,
            z: obj.position.z,
            style: {
                skinColor: obj.style.skinColor,
                skin: obj.style.skin
            }
        }
        var leftcube = this.createCube(leftobj);
        // this.addObject(leftcube,true);
        Cabinet = this.mergeModel('+', Cabinet, leftcube);

        //右
        var rightobj= {
            show: true,
            uuid: "",
            name: "cuberight",
            objType: 'cube',
            width: obj.size.thick ,
            height: obj.size.height,
            depth: obj.size.depth,
            x: obj.position.x+(obj.size.width/2-obj.size.thick/2),
            y: obj.size.height/2+obj.size.thick/2,
            z: obj.position.z,
            style: {
                skinColor: obj.style.skinColor,
                skin: obj.style.skin
            }
        }
        var rightcube = this.createCube(rightobj);
        // this.addObject(rightcube,true);
        Cabinet = this.mergeModel('+', Cabinet, rightcube);

        //后
        var behindobj= {
            show: true,
            uuid: "",
            name: '',
            objType: 'cube',
            width: obj.size.width ,
            height: obj.size.height,
            depth: obj.size.thick,
            x: obj.position.x,
            y: obj.size.height/2+obj.size.thick/2,
            z: obj.position.z-(obj.size.depth/2-obj.size.thick/2),
            style: {
                skinColor: obj.style.skinColor,
                skin: obj.style.skin
            }
        }
        var behindcube = this.createCube(behindobj);
        // this.addObject(rightcube,true);
        Cabinet = this.mergeModel('+', Cabinet, behindcube);

        var tempobj = new THREE.Object3D();
        tempobj.add(Cabinet);
        tempobj.name = obj.name;
        tempobj.uuid = obj.uuid;
        this.addObject(Cabinet,true)

        if(obj.doors!=null&&typeof (obj.doors) != 'undefined'){
            if(obj.doors.skins.length==1&&obj.doors.doorname.length==1){
                var doorobj = {
                    show: true,
                    uuid:"",
                    name: obj.doors.doorname[0],
                    objType: 'cube',
                    depth: obj.size.thick,
                    width: obj.size.width,
                    height: obj.size.height,
                    x: obj.position.x,
                    y: obj.position.y,
                    z: obj.position.z+(obj.size.depth/2-obj.size.thick/2),
                    style: {
                        skinColor: obj.doors.skins[0].skinColor,
                        skin: obj.doors.skins[0]
                    }
                }
                var doorcube = this.createCube(doorobj);
                this.addObject(doorcube,true)
            }else if(obj.doors.skins.length==2&&obj.doors.doorname.length==2){

            }
        }
        if (obj.rotation != null && typeof (obj.rotation) != 'undefined' && obj.rotation.length > 0) {
            obj.rotation.forEach(function(rotation_obj, index){
                // rotation: [{ direction: 'x', degree: 0.5*Math.PI }], 
                switch (rotation_obj.direction) {
                    case 'x':
                        tempobj.rotateX(rotation_obj.degree);
                        break;
                    case 'y':
                        tempobj.rotateY(rotation_obj.degree);
                        break;
                    case 'z':
                        tempobj.rotateZ(rotation_obj.degree);
                        break;
                    case 'arb':  //{ direction: 'arb', degree: [x,y,z,angle] }
                        tempobj.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                        break;
                }
            });
        }
        return tempobj;

    }
    //创建圆柱体
    createCylinder(obj){
        //创建圆柱体
        var cylinderGeo = new THREE.CylinderGeometry(30, 30 ,200 ,48,48);
        console.log(cylinderGeo)
        var cylinderMat = new THREE.MeshLambertMaterial({//创建材料
            color:0xffffff,
            wireframe:false,
            map: this.createSkin(60,200,{imgurl:"/images/aircondition.png"})
        });
        //创建圆柱体网格模型
        var cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        cylinder.position.set(420, 100, -300);//设置圆柱坐标
        return cylinder
    }
    //添加对象
    addObject (obj,flag) {
        this.objects.push(obj);
        if(!flag){
            this.scene.add(obj);
        }
    }
    //创建皮肤材质操作
    createSkinOption (width,height, obj, cube, cubefacenub) {
        if (this.commonFunc.hasObj(obj)) {
            if (this.commonFunc.hasObj(obj.imgurl)) {
                var MaterParam={
                    map: this.createSkin(width, height, obj),
                    opacity: obj.opacity||1,
                }
                if(obj.transparent){
                    MaterParam.transparent=obj.transparent;
                }
                if (obj.blending) {
                    MaterParam.blending = THREE.AdditiveBlending//使用饱和度叠加渲染
                }
                return MaterParam;
            } else {
                if (this.commonFunc.hasObj(obj.skinColor)) {
                    cube.faces[cubefacenub].color.setHex(obj.skinColor);
                    cube.faces[cubefacenub + 1].color.setHex(obj.skinColor);
                }
                return {
                    vertexColors: THREE.FaceColors
                }
            }
        } else {
            return {
                vertexColors: THREE.FaceColors
            }
        }
    }
    //使用材质图片
    createSkin (width,height,obj) {
        var imgwidth = 128,imgheight=128;
        if (obj.width != null&& typeof (obj.width) != 'undefined') {
            imgwidth = obj.width;
        }
        if (obj.height != null && typeof (obj.height) != 'undefined') {
            imgheight = obj.height;
        }
        var texture = new THREE.TextureLoader().load(obj.imgurl);
        var repeat = false;
        if (obj.repeatx != null && typeof (obj.repeatx) != 'undefined' && obj.repeatx==true) {
            texture.wrapS = THREE.RepeatWrapping;
            repeat = true;
        }
        if (obj.repeaty != null && typeof (obj.repeaty) != 'undefined' && obj.repeaty == true) {
            texture.wrapT = THREE.RepeatWrapping;
            repeat = true;
        }
        if (repeat) {
            texture.repeat.set(width / imgwidth, height / imgheight);
        }
        return texture;
    }
    commonFunc={
        //判断对象
        hasObj: function (obj) {
            if (obj != null && typeof (obj) != 'undefined') {
                return true;
            }else{
                return false;
            }
        }
    }
    //测试
    add(){
        //1、测试ThreeBSP用的
        //几何体对象
        let cylinder = new THREE.CylinderGeometry(50,50,5,40);//圆柱
        let box = new THREE.BoxGeometry(40,5,40);//立方体
        //材质对象
        let material=new THREE.MeshPhongMaterial({color:0x0000ff});
        //网格模型对象
        let cylinderMesh=new THREE.Mesh(cylinder,material);//圆柱
        let boxMesh=new THREE.Mesh(box,material);//立方体
        //包装成ThreeBSP对象
        let cylinderBSP = new ThreeBSP(cylinderMesh);
        let boxBSP = new ThreeBSP(boxMesh);
        let result = cylinderBSP.subtract(boxBSP);
        //ThreeBSP对象转化为网格模型对象
        let mesh = result.toMesh();
        this.scene.add(mesh);//网格模型添加到场景中

        // //2、试圆柱体贴图
        // //创建圆柱体
        // var cylinderGeo = new THREE.CylinderGeometry(28, 30 ,200 ,48,48);
        // cylinderGeo.computeBoundingBox(); 
        // var max = cylinderGeo.boundingBox.max,
        //         min = cylinderGeo.boundingBox.min;
        //         console.log(cylinderGeo)
        //         console.log(max)
        //         console.log(min)
        // var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
        // var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
        // var faces = cylinderGeo.faces; 
        // cylinderGeo.faceVertexUvs[0] = []; 
        // for (var i = 0; i < faces.length ; i++) { 
        //     var v1 = cylinderGeo.vertices[faces[i].a],
        //             v2 = cylinderGeo.vertices[faces[i].b],
        //             v3 = cylinderGeo.vertices[faces[i].c]; 
        //     cylinderGeo.faceVertexUvs[0].push([
        //         new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
        //         new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
        //         new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
        //     ]);
        // }
        // cylinderGeo.uvsNeedUpdate = true;
        

        // console.log(cylinderGeo)
        // var cylinderMat = new THREE.MeshLambertMaterial({//创建材料
        //     color:0xffffff,
        //     wireframe:false,
        //     opacity: 0.1,
        //     map: this.createSkin(60,200,{imgurl:"/images/aircondition.png"})
        // });
        // //创建圆柱体网格模型
        // var cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        // this.scene.add(cylinder);//网格模型添加到场景中

    }

}
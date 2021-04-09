/*
作者:Mr.Xie
创建时间:2021年04月07日
功能描述:3D机房封装

使用方式
let props={domID:"three-dom"}
this.map = new ThreeMap(props[,dataJson]);
this.map.init();
*/
import * as THREE from 'three';
import 'imports-loader?THREE=three!threebsp'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'   //r100及以上
// var OrbitControls = require('three-orbit-controls')(THREE)  //r100 以下
export default class ThreeMap {
    constructor(props,dataJson) {

        this.props=props;
        this.ThreeData=dataJson;
        this.dataJson=dataJson;
        this.objList = dataJson.objects||[];//对象列表
        this.eventList = dataJson.events||{};//事件对象列表
        this.btnList = dataJson.btns||[];//按钮列表
        
        
        this.renderer=null;
        this.scene = null;//场景
        this.camera=null;
        this.objects = [];  //存放对象
        this.equipment=[];  //存放设备
        this.sprite=[];  //存放告警精灵图标
        this.cabinet=[];  //存放柜子
        this.dom=document.getElementById(this.props.domID);
        this.dbclick = 0;
        this.mouseClick = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.lastElement=null;  //存放最后一个设备
        this.tipTimer=null; //显示提示用的timer
        this.tooltip=null;
        this.lastEvent=null;
        this.tooltipBG='#ACDEFE';

        this.progressSuccess=0;
        this.loadtimer=null;
        this.BASE_PATH="./rack/"
    }

    init() {
        this.initScene();
        this.initRenderer();
        this.initCamera();
        this.initLight();
        this.render();
        // this.setHelper();
        this.setControl();
        // this.add();
        this.InitData();  //添加3D对象、事件等
        this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
        this.renderer.domElement.addEventListener('mousemove',this.onDocumentMouseMove.bind(this), false);
    }

    //初始化渲染场景
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true ,alpha:true });
        this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight);
        this.dom.appendChild(this.renderer.domElement);
    }
    //初始化相机
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 1, 100000);
        this.camera.name = 'mainCamera';
        this.camera.position.set(1000,1000,2800)
        //默认就是以Y轴为上方的
        // this.camera.up.x = 0;
        // this.camera.up.y =1;
        // this.camera.up.z =0;
        this.camera.lookAt({ x: 0, y: 0, z: 0 });
        this.scene.add(this.camera);
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0x225F93);
    }
    //初始化灯光
    initLight(){
        var light = new THREE.AmbientLight(0xcccccc);
        light.position.set(0, 0,0);
        this.scene.add(light);
        var light2 = new THREE.PointLight(0x555555);
        light2.shadow.camera.near =1;
        light2.shadow.camera.far = 5000;
        light2.position.set(0, 3500, 0);
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
    Loading(){
        var div = document.createElement('div');
		div.setAttribute('id', 'loading');
		div.style.display = 'block';
		div.style.position = 'absolute';
		div.style.left = '0';
		div.style.top = '0';
		div.style.width = '100%';
        div.style.height = '100%';
        div.style.fontSize="30px";
        div.style.zIndex="999";
        div.style.background = 'rgba(0,0,0,0.65)';
        let loading=document.createElement('div');
        loading.innerHTML="模型加载中...";
        loading.style.top="40%";
        loading.style.position="absolute";
        loading.style.width="100%";
        loading.style.textAlign="center";
        div.appendChild(loading);
		this.dom.appendChild(div);
    }
    LoadSuccess(){
        let _this=this;
        if(this.progressSuccess==3){
            let load=this.dom.querySelector("#loading");
            load.style.display="none";
            clearTimeout(this.loadtimer);
        }else{
            this.loadtimer = setTimeout(function(){
                _this.LoadSuccess();
            },1000); 
        }
    }
    //添加提示框
    InitTooltip(){
        this.tooltip = document.createElement('div');
		this.tooltip.setAttribute('id', 'tooltip');
		this.tooltip.style.display = 'none';
        this.tooltip.style.position = 'absolute';
        this.tooltip.style.color="#000";
        this.tooltip.style.maxWidth="200px";
		this.tooltip.style.width = '32px';
        this.tooltip.style.height = 'auto';
        this.tooltip.style.lineHeight="22px";
        this.tooltip.style.textAlign="center";
        this.tooltip.style.padding="10px";
        this.tooltip.style.background = this.tooltipBG;
        this.tooltip.style.opacity=0.8;
        this.tooltip.style['border-radius'] = '5px';
        let tipdiv=document.createElement('div');
        tipdiv.setAttribute("id","tipdiv");
        let tipspan=document.createElement('span');
        tipspan.style.marginLeft="50%";
        tipspan.style.bottom="-10px";
        tipspan.style.left="-10px";
        tipspan.style.position="absolute";
        tipspan.style.borderTop="10px solid "+this.tooltipBG;
        tipspan.style.borderLeft="10px solid transparent";
        tipspan.style.borderRight="10px solid transparent";
        this.tooltip.appendChild(tipspan);
        this.tooltip.appendChild(tipdiv);
        this.dom.appendChild(this.tooltip);
    }
    //添加3D对象
    InitAddObject(obj){
        if (obj.show == null || typeof (obj.show) == 'undefined' || obj.show) {
            let tempObj = null;
            switch (obj.objType) {
                case 'cube':
                    tempObj = this.createCube(obj)
                    this.addObject(tempObj,"scene");
                    break;
                case 'face':
                    this.CreateFace(obj);
                    break;
                case 'wall':
                    this.CreateWall(obj);
                    break;
            }
        }
    }
    CreateFace (obj) {
        let _this=this;
        var cubeobj = {
            width: obj.width || 40,
            height: obj.height || 100,
            depth: obj.depth || 400,
            rotation: obj.rotation,
            x: obj.x||0,
            y: obj.y||0,
            z: obj.z||0,
            uuid: obj.uuid,
            name:obj.name,
            style: {
                skinColor: obj.style.skinColor||0x062062,
                edgeColor: obj.style.edgeColor||0x155CAC,
            }
        }
        var cube = this.createCube(cubeobj);
        if (_this.commonFunc.hasObj(obj.childrens) && obj.childrens.length > 0) {
            obj.childrens.forEach(function(childobj, index){
                var newobj ;
                if(childobj.objType=="line"){
                    newobj = _this.CreateLine(childobj);
                }else{
                    newobj = _this.CreateHole(childobj);
                }
                cube = _this.mergeModel(childobj.op, cube, newobj,cubeobj.style.skinColor);
            })
        }
        _this.addObject(cube,"scene");
    }
    CreateWall (obj) {
        let _this=this;
        var commonDepth = obj.depth || 40;//墙体厚度
        var commonHeight = obj.height || 100;//墙体高度
        var commonWidth = obj.width || 300;//墙体宽度
        var commonSkin = obj.style.skinColor || 0x98750f;
        var commonEdgeColor = obj.style.edgeColor || "";
        var transparent= obj.style.transparent || false;
        var opacity= obj.style.opacity||1;
        //建立墙面
        obj.childrens.forEach(function(wallobj, index){
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
                    edgeColor: commonEdgeColor||ladderObj.skin.edgeColor,
                    skin:wallobj.skin,
                    transparent:transparent, 
                    opacity:opacity
                }
            }
            var cube = _this.createCube(cubeobj);
            if (_this.commonFunc.hasObj(wallobj.childrens) && wallobj.childrens.length > 0) {
                wallobj.childrens.forEach(function(walchildobj, index){
                    var newobj = _this.CreateHole(walchildobj);
                    cube = _this.mergeModel(walchildobj.op, cube, newobj,commonSkin);
                })
            }
            _this.addObject(cube,"scene");
        });
    }
    //模型合并 使用ThreeBSP插件mergeOP计算方式 -表示减去 +表示加上 
    mergeModel(mergeOP, fobj, sobj,commonSkin) {
        if(!mergeOP){
            this.addObject(sobj,"scene");
            return fobj;
        }
        var fobjBSP = new ThreeBSP(fobj);
        var sobjBSP = new ThreeBSP(sobj);
        var resultBSP = null; 
        if (mergeOP == '-') {
            resultBSP = fobjBSP.subtract(sobjBSP);
        } else if (mergeOP == '+') {
            // var subMesh = new THREE.Mesh(sobj);
            sobj.updateMatrix();
            fobj.geometry.merge(sobj.geometry, sobj.matrix);
            return fobj;
        //    resultBSP = fobjBSP.union(sobjBSP);
        } else if (mergeOP == '&') {//交集
            resultBSP = fobjBSP.intersect(sobjBSP);
        } else {
            this.addObject(sobj,"scene");
            return fobj;
        }
        
        var result = resultBSP.toMesh();
        result.material.shading = THREE.FlatShading;
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();
        result.uuid= fobj.uuid+mergeOP+sobj.uuid;
        result.name=fobj.name+mergeOP+sobj.name;
        result.material.needsUpdate = true;
        result.geometry.buffersNeedUpdate = true;
        result.geometry.uvsNeedUpdate = true;

        result.material=fobj.material;

        for (var i = 0; i < result.geometry.faces.length/2; i++) {
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
                        result.geometry.faces[i*2].color.setHex(commonSkin);
                        result.geometry.faces[i*2].materialIndex=fobj.geometry.faces[j].materialIndex
                        result.geometry.faces[i*2+1].color.setHex(commonSkin);
                        result.geometry.faces[i*2+1].materialIndex=fobj.geometry.faces[j].materialIndex
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
                        result.geometry.faces[i*2].color.setHex(commonSkin);
                        result.geometry.faces[i*2].materialIndex=sobj.geometry.faces[j].materialIndex;
                        result.geometry.faces[i*2+1].color.setHex(commonSkin);
                        result.geometry.faces[i*2+1].materialIndex=sobj.geometry.faces[j].materialIndex;
                    }
                }
                //最后剩余的一点点给颜色
                result.geometry.faces[i*2].color.setHex(commonSkin);
                result.geometry.faces[i*2+1].color.setHex(commonSkin);
            }
        }
        
        result.castShadow = true;
        result.receiveShadow = true;
        return result;
    }
    CreateLine(obj){
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(obj.startDot.x, obj.startDot.y, obj.startDot.z),
            new THREE.Vector3(obj.endDot.x, obj.endDot.y, obj.endDot.z)
        );
        //渐变色
        // geometry.colors.push(
        //     new THREE.Color( 0x444444 ), 
        //     new THREE.Color( 0xFF0000 )
        // )
        var material = new THREE.LineBasicMaterial({ vertexColors: false ,color:obj.skinColor ,linewidth: 2});
        return new THREE.Line(geometry, material);
        this.scene.add( line );
    }
    //挖洞、玻璃、挂东西
    CreateHole ( obj) {
        var commonDepth =  40;//厚度
        var commonHeight =  100;//高度
        var commonWidth =  300;//强体高度
        var commonSkin = 0x062062;
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
    setEdgesGeometry(obj){
        console.log(obj)
        let cubeEdges = new THREE.EdgesGeometry(obj.geometry, 1);
        let cubeLine = new THREE.LineSegments(cubeEdges, new THREE.LineBasicMaterial( { color: 0x155CAC } ));
        obj.add(cubeLine);
        return obj
    }
    //创建盒子体
    createCube(obj){
        var width = obj.width || 1000;  //x轴
        var height = obj.height || 10;  //y轴
        var depth=obj.depth || width;  //z轴
        var x = obj.x || 0, y = obj.y || 0, z = obj.z || 0;
        var skinColor = obj.style.hasOwnProperty('skinColor')?obj.style.skinColor : "";
        var edgeColor=obj.style.hasOwnProperty('edgeColor')?obj.style.edgeColor : "";
        //width：是x方向上的长度；height：是y方向上的长度；depth：是z方向上的长度；
        var cubeGeometry = new THREE.CubeGeometry(width, height, depth, 0, 0, 1);

        //六面颜色
        for (var i = 0; i < cubeGeometry.faces.length; i += 2) {
            cubeGeometry.faces[i].color.setHex(skinColor);
            cubeGeometry.faces[i + 1].color.setHex(skinColor);
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
            let skin_right=obj.style.skin.hasOwnProperty("skin_right")&&obj.style.skin.skin_right.hasOwnProperty('skinColor')?obj.style.skin.skin_right.skinColor:obj.style.skin.hasOwnProperty("skinColor")?obj.style.skin.skinColor:"";
            let skin_left=obj.style.skin.hasOwnProperty("skin_left")&&obj.style.skin.skin_left.hasOwnProperty('skinColor')?obj.style.skin.skin_left.skinColor:obj.style.skin.hasOwnProperty("skinColor")?obj.style.skin.skinColor:"";
            let skin_up=obj.style.skin.hasOwnProperty("skin_up")&&obj.style.skin.skin_up.hasOwnProperty('skinColor')?obj.style.skin.skin_up.skinColor:obj.style.skin.hasOwnProperty("skinColor")?obj.style.skin.skinColor:"";
            let skin_down=obj.style.skin.hasOwnProperty("skin_down")&&obj.style.skin.skin_down.hasOwnProperty('skinColor')?obj.style.skin.skin_down.skinColor:obj.style.skin.hasOwnProperty("skinColor")?obj.style.skin.skinColor:"";
            let skin_fore=obj.style.skin.hasOwnProperty("skin_fore")&&obj.style.skin.skin_fore.hasOwnProperty('skinColor')?obj.style.skin.skin_fore.skinColor:obj.style.skin.hasOwnProperty("skinColor")?obj.style.skin.skinColor:"";
            let skin_behind=obj.style.skin.hasOwnProperty("skin_behind")&&obj.style.skin.skin_behind.hasOwnProperty('skinColor')?obj.style.skin.skin_behind.skinColor:obj.style.skin.hasOwnProperty("skinColor")?obj.style.skin.skinColor:"";
            
            //右
            skin_right_obj = this.createSkinOption(depth, height, obj.style.skin.skin_right, cubeGeometry,skin_right, 0);
            //左
            skin_left_obj = this.createSkinOption(depth, height, obj.style.skin.skin_left, cubeGeometry,skin_left, 2);
            //上
            skin_up_obj = this.createSkinOption(width, depth, obj.style.skin.skin_up, cubeGeometry,skin_up, 4);
            //下
            skin_down_obj = this.createSkinOption(width, depth, obj.style.skin.skin_down, cubeGeometry,skin_down, 6);
            //前
            skin_fore_obj = this.createSkinOption(width, height, obj.style.skin.skin_fore, cubeGeometry,skin_fore, 8);
            //后
            skin_behind_obj = this.createSkinOption(width, height, obj.style.skin.skin_behind, cubeGeometry,skin_behind, 10);
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
                    case 'arb':  //{ direction: 'arb', degree: [x,y,z,angle] }  x,y,z是向量0,1,0 表示y轴旋转
                        cube.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                        break;
                }
            });
        }
        if(edgeColor){
            cube=this.setEdgesGeometry(cube);
        }
        return cube;
    }
    //创建平面
    createPlaneGeometry (obj) {
        var texture;
        var transparent=obj.transparent;
        if(obj.transparent!==false){
            transparent=true;
        }
        if (typeof obj.imgurl == "string") {//传入的材质是图片路径，使用 textureloader加载图片作为材质
            var loader = new THREE.TextureLoader();
            // loader.setCrossOrigin(this.crossOrigin);
            var imgurl=obj.imgurl;
            if(obj.imgurl.indexOf("data:image/")==-1){
                imgurl=this.commonFunc.getPath(obj.imgurl);
            }
            texture = loader.load(imgurl, function () { }, undefined, function () { });
        } else {
            texture = new THREE.CanvasTexture(obj.imgurl)
        }
        var MaterParam = {//材质的参数
            map: texture,
            side: obj.side||THREE.DoubleSide,
            // side:THREE.FrontSide,
            transparent: transparent,
            opacity: obj.opacity||1
        }
        if (obj.blending) {
            MaterParam.blending = THREE.AdditiveBlending//使用饱和度叠加渲染
        }
        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(obj.width, obj.height, 1, 1),
            new THREE.MeshBasicMaterial(MaterParam)
        );
        plane.position.x = obj.x||0;
        plane.position.y = obj.y||0;
        plane.position.z = obj.z||0;
        if (obj.rotation != null && typeof (obj.rotation) != 'undefined' && obj.rotation.length > 0) {
            obj.rotation.forEach(function(rotation_obj, index){
                // rotation: [{ direction: 'x', degree: 0.5*Math.PI }], 
                switch (rotation_obj.direction) {
                    case 'x':
                        plane.rotateX(rotation_obj.degree);
                        break;
                    case 'y':
                        plane.rotateY(rotation_obj.degree);
                        break;
                    case 'z':
                        plane.rotateZ(rotation_obj.degree);
                        break;
                    case 'arb':  //{ direction: 'arb', degree: [x,y,z,angle] }  x,y,z是向量0,1,0 表示y轴旋转
                        plane.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                        break;
                }
            });
        }
        return plane;
    }
    handleObj(obj){
        if (obj.objHandle != null && typeof (obj.objHandle) != 'undefined' && obj.objHandle.length > 0) {
            obj.objHandle.forEach(function(childobj){
                // objHandle: [{ direction: 'x', ratio: 0.5 ,degree:0.5*Math.PI}], 
                switch (childobj.direction) {
                    case 'x':
                        if(childobj.ratio){
                            obj.scale.x=childobj.ratio;
                        }
                        if(childobj.degree){
                            obj.rotateX(childobj.degree);
                        }
                        break;
                    case 'y':
                        if(childobj.ratio){
                            obj.scale.y=childobj.ratio;
                        }
                        if(childobj.degree){
                            obj.rotateY(childobj.degree);
                        }
                        break;
                    case 'z':
                        if(childobj.ratio){
                            obj.scale.z=childobj.ratio;
                        }
                        if(childobj.degree){
                            obj.rotateZ(childobj.degree);
                        }
                        break;
                    case 'arb':  //{ direction: 'arb', handleScale: [0.01,0.01,0.01], handleRotale: [0,1,0,0.5*Math.PI]}
                        if(childobj.handleScale&&childobj.handleScale.length==3){
                            obj.scale.set(childobj.handleScale[0],childobj.handleScale[1],childobj.handleScale[2]);
                        }
                        if(childobj.handleRotale&&childobj.handleRotale.length==4){
                            obj.rotateOnAxis(new THREE.Vector3(childobj.handleRotale[0],childobj.handleRotale[1],childobj.handleRotale[2]), childobj.handleRotale[3]);
                        }
                        break;
                }
            });
        }
        return obj;
    }
    //进度通知
    onProgress = function ( xhr) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            // console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };
    //报错通知
    onError = function ( xhr ) { };
    //设置旋转中心
    changePivot(obj,x,y,z){
        let tempobj = new THREE.Object3D();
        tempobj.position.set(obj.position.x + x , obj.position.y+y, obj.position.z+z);
        obj.position.set(-x, -y, -z);
        tempobj.add(obj);
        return tempobj;
    }
    //添加对象
    addObject (obj,info) {
        if(info){
            if(info=="object"){
                this.objects.push(obj);
            }
            if(info=="scene"){
                this.scene.add(obj);
            }
        }else{
            this.objects.push(obj);
            this.scene.add(obj);
        }
    }
    //创建皮肤材质操作
    createSkinOption (width,height, obj, cube,cubeColor, cubefacenub) {
        if (this.commonFunc.hasObj(obj)) {
            if (this.commonFunc.hasObj(obj.imgurl)) {
                var MaterParam={
                    color:cubeColor,
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
        var texture = new THREE.TextureLoader().load(this.commonFunc.getPath(obj.imgurl));
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
        _this:this,
        //判断对象
        hasObj: function (obj) {
            if (obj != null && typeof (obj) != 'undefined') {
                return true;
            }else{
                return false;
            }
        },
        //查找对象
        findObject: function (objname) {
            var findedobj = null;
            this.objects.forEach(function(obj, index){
                if (obj.name != null && obj.name != '' && obj.name == objname) {
                    findedobj = obj;
                    return findedobj;
                }
            });
            return findedobj;
        },
        //获取路径
        getPath: function(file){
            return this._this.BASE_PATH+file;
        },
        //生成GUID
        guid:function(){
            return (this.guidRandom()+this.guidRandom()+"-"+this.guidRandom()+"-"+this.guidRandom()+"-"+this.guidRandom()+"-"+this.guidRandom()+this.guidRandom()+this.guidRandom()); 
        },
        guidRandom() { 
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        }
    }


    /*
    *事件部分
    */
    
    //鼠标按下事件
    onDocumentMouseDown (event) {
        this.dbclick++;
        var _this = this;
        setTimeout(function () { _this.dbclick =0}, 500);
        event.preventDefault();
        if (this.dbclick >= 2) {
            // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            this.mouseClick.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
            this.mouseClick.y = -(event.offsetY / this.dom.offsetHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseClick, this.camera);
            var intersects = this.raycaster.intersectObjects(this.objects);
            if (intersects.length > 0) {
                this.controls.enabled=false;
                let SELECTED = intersects[0].object;
                console.log(SELECTED)
                if(this.eventList != null && this.eventList.dbclick != null && this.eventList.dbclick.length > 0){
                    this.eventList.dbclick.forEach(function(_obj, index){
                        if ("string" == typeof (_obj.obj_name)) {
                            if (_obj.obj_name == SELECTED.name) {
                                _obj.obj_event(SELECTED,_this);
                            }
                        }else if (_obj.findObject!=null||'function' == typeof (_obj.findObject)) {
                            if (_obj.findObject(SELECTED.name)) {
                                _obj.obj_event(SELECTED,_this);
                            }
                        }
                    })
                }
                this.controls.enabled = true;
            }
        }
    }
    openCloseDoor(obj,x,y,z,info){
        console.log(obj)
        var doorstate = "close";
        var tempobj = null;
        if (obj.doorState != null && typeof (obj.doorState) != 'undefined') {
            doorstate = obj.doorState;
            tempobj = obj.parent;
        } else {
            console.log("add parent");
            var objparent = obj.parent;
            tempobj = new THREE.Object3D();
            tempobj.position.set(obj.position.x + x , obj.position.y+y, obj.position.z+z);
            obj.position.set(-x, -y, -z);
            tempobj.add(obj);
            objparent.add(tempobj);
        }
        obj.doorState = (doorstate == "close" ? "open" : "close");
        if(info=="left"||info=="right"){
            let sign=info=="left"?1:-1;
            if(obj.doorState=="close"){
                tempobj.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.5*sign*Math.PI);
            }else{
                tempobj.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.5*sign*Math.PI);
            }
        }else if(info=="outin"){
            //沿点击的法向量移动
            // var intersects = this.raycaster.intersectObjects([obj]);
            // if (intersects.length > 0) {
            //     // 射线位置赋值给移动网格模型
            //     tempobj.position.copy(intersects[0].point);
            //     // 沿着法线方向平移移动的网格模型
            //     var normal = intersects[0].face.normal;// 当前位置曲面法线
            //     tempobj.translateOnAxis(normal,50); //平移50
            // }

            var targetPos = new THREE.Vector3(1,0,0);
            // var euler = new THREE.Euler( 1, 0,0);
            // var matrix = new THREE.Matrix4();  //创建一个4维矩阵
            // matrix.lookAt(obj.position.clone() , obj.position.clone() , targetPos) //设置朝向
            // matrix.multiply(new THREE.Matrix4().makeRotationFromEuler(euler))
            // var toRot = new THREE.Quaternion().setFromRotationMatrix(matrix) 
            // tempobj.translateOnAxis(toRot,50);
            if(obj.doorState=="close"){
                tempobj.translateOnAxis(targetPos,-obj.geometry.parameters.depth+20);
            }else{
                tempobj.translateOnAxis(targetPos,obj.geometry.parameters.depth-20);
            }

            //使用四元素朝某个角度移动
            // var targetPos = new THREE.Vector3(0,0,1)   //目标位置点
            // var offsetAngle = Math.PI/2  //目标移动时的朝向偏移
            // // var obj =  你的三维模型(或者其他物体对象，object3D ,group ,或者mesh对象)
            // //以下代码在多段路径时可重复执行
            // var matrix = new THREE.Matrix4()  //创建一个4维矩阵
            // matrix.lookAt(obj.position.clone() , obj.position.clone() ,targetPos) //设置朝向
            // matrix.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0 , offsetAngle , 0 )))
            // var toRot = new THREE.Quaternion().setFromRotationMatrix(matrix)  //计算出需要进行旋转的四元数值
            // tempobj.translateOnAxis(toRot,50);

            


            // if(obj.doorState=="close"){
            //     tempobj.translateOnAxis(new THREE.Vector3(0, 0, 1),-obj.geometry.parameters.depth);
            // }else{
            //     tempobj.translateOnAxis(new THREE.Vector3(0, 0, 1),obj.geometry.parameters.depth);
            // }
        }
        
    }
    //开关左门
    openLeftDoor(_obj,func) {
        this.openCloseDoor(_obj,-_obj.geometry.parameters.width/2,0,0,"left");
    }
    //开关右门
    openRightDoor(_obj,func) {
        this.openCloseDoor(_obj,_obj.geometry.parameters.width/2,0,0,"right");
    }
    //开关机柜门
    openCabinetDoor(_obj,func) {
        this.openCloseDoor(_obj,_obj.geometry.parameters.width/2,0,_obj.geometry.parameters.depth/2,"right");
    }
    //拉出放回设备
    openEquipmentDoor(_obj,func){
        this.openCloseDoor(_obj,0,0,_obj.geometry.parameters.depth/2,"outin");
    }
    //鼠标移动
    onDocumentMouseMove(event){
        let _this=this;
        var currentElement = null;
        this.mouseClick.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
        this.mouseClick.y = -(event.offsetY / this.dom.offsetHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseClick, this.camera);
        var intersects = this.raycaster.intersectObjects(this.objects);
        if(intersects.length>0){
            let SELECTED = intersects[0].object;
            console.log(SELECTED)
            if(SELECTED.name.toString().indexOf("equipment")!=-1||SELECTED.name.toString().indexOf("spriteAlarm")!=-1){
                currentElement = SELECTED;
            }
        }
        if (this.lastElement != currentElement ) {
            clearTimeout(this.tipTimer);
            if(currentElement){
                this.tipTimer = setTimeout(function(){
                    console.log(currentElement)
                    let tipInfo="";
                    if(currentElement.name.toString().indexOf("equipment")!=-1){
                        tipInfo=currentElement.data.tipInfo;
                        _this.tooltip.style.background = _this.tooltipBG;
                        _this.tooltip.querySelector("span").style.borderTop="10px solid "+_this.tooltipBG;
                    }
                    if(currentElement.name.toString().indexOf("spriteAlarm")!=-1){
                        console.log(currentElement)
                        if(currentElement.data.alarmInfo.length>0){
                            let levelArr=[];
                            for(let i=0;i<currentElement.data.alarmInfo.length;i++){
                                levelArr.push(currentElement.data.alarmInfo[i].level);
                                tipInfo+=currentElement.data.alarmInfo[i].name+currentElement.data.alarmInfo[i].alarmInfo+"；"
                            }
                            let max=Math.max(...levelArr);
                            _this.tooltip.style.background = _this.alarmColor["level"+max];
                            _this.tooltip.querySelector("span").style.borderTop="10px solid "+_this.alarmColor["level"+max];
                        }
                    }
                    let tiplen=tipInfo.length;
                    _this.tooltip.querySelector("#tipdiv").innerHTML=tipInfo
                    _this.tooltip.style.width=tiplen*15+"px";
                    _this.tooltip.style.display = 'block';
                    _this.tooltip.style.left = (_this.lastEvent.pageX - _this.tooltip.clientWidth/2) + 'px';
                    _this.tooltip.style.top = (_this.lastEvent.pageY - _this.tooltip.clientHeight - 15) + 'px';
                },1000); 
            }     
        }
        //设置上一次的网元为当前网元
        this.lastElement = currentElement; 
        //如果当前鼠标下没有网元，隐藏tooltip
        if(currentElement == null&&_this.tooltip){
            _this.tooltip.style.display = 'none';
        }
        //设置每次移动时鼠标的事件对象
        this.lastEvent = event;
    }
    //测试
    add(){
        var _this=this;
        //测试生成obj带材质
        // this.createObjContainMtl()

        //3,测点管道
        // var points = [];
        // points.push(new THREE.Vector3(0, 0, -10));
        // points.push(new THREE.Vector3(0, 0, 10));
        // var curvePath = new THREE.CatmullRomCurve3(points);
        // var geometry = new THREE.TubeGeometry( curvePath, 20, 2, 8, false );
        // var material = new THREE.MeshBasicMaterial( { color: 0xff0000 ,side:THREE.DoubleSide } );
        // var mesh = new THREE.Mesh( geometry, material );
        // this.scene.add( mesh );
        ////自定义管道
        // var cylinderGeo = new THREE.CylinderGeometry(4, 4 ,20 ,48,48);
        // var cylinderMat = new THREE.MeshLambertMaterial({
        //     color:0xffffff,
        //     side:THREE.DoubleSide,
        //     // map: this.createSkin(64,64,{imgurl:"./images/rack_inside.png"})
        // });
        // var cylinderMat2 = new THREE.MeshLambertMaterial({
        //     color:0xffffff,
        //     side:THREE.DoubleSide,
        //     // map: this.createSkin(64,64,{imgurl:"./images/test/camera.png"})
        // });
        // var cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        // var cubeGeometry = new THREE.CubeGeometry(6.5, 20, 6.5, 0, 0, 1);
        // var cube = new THREE.Mesh(cubeGeometry, cylinderMat);
        // var pipe = this.mergeModel('+',cylinder,cube);
        // var cylinderGeo1 = new THREE.CylinderGeometry(3.5, 3.5 ,20 ,48,48);
        // var cylinder1 = new THREE.Mesh(cylinderGeo1, cylinderMat);
        // pipe=this.mergeModel("-",pipe,cylinder1);
        // var cylinderGeo2 = new THREE.CylinderGeometry(2.5, 2.5 ,20 ,48,48);
        // var cylinder2 = new THREE.Mesh(cylinderGeo2, cylinderMat2);
        // pipe=this.mergeModel("+",pipe,cylinder2);
        // pipe.rotateX(0.5*Math.PI);
        // this.scene.add(pipe);//网格模型添加到场景中

        //4.测试加载模型
        // var texture = new THREE.TextureLoader().load( './images/test/metal.png' );
        // var texture1 = new THREE.TextureLoader().load( './images/test/camera_light.png' );
        // var texture2 = new THREE.TextureLoader().load( './images/test/camera_dot.png' );
        // var loader =new OBJLoader();
        // loader.load( './images/test/camera.obj', function ( group ) {
        //     console.log(group)
        //     group.traverse( function ( child ) {
        //         console.log(child)
        //         if ( child instanceof THREE.Mesh) {
        //             if(child.name=="archmodels95_044_001"){
        //                 child.material.map = texture;
        //             }else if(child.name=="archmodels95_044_003"){
        //                 child.material.map = texture1;
        //             }else{
        //                 child.material.map = texture2;
        //             }
                  
        //         }
        //     });
        //     _this.scene.add( group );
        // })

        //测试加载材质模型
        // var mtlLoader = new MTLLoader();
        // mtlLoader.load('./images/test/plant.mtl', function(materials) {
        //     materials.preload();
        //     console.log(materials)-
        //     var objLoader = new OBJLoader();
        //     objLoader.setMaterials(materials);
        //     objLoader.load('./images/test/plant.obj', function(object) {
        //         console.log(object)
        //         _this.scene.add(object);
        //     }, onProgress, onError);
        // });
        // var onProgress = function(xhr) {
        //     if (xhr.lengthComputable) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //         console.log(Math.round(percentComplete, 2) + '% 已经加载')
        //     }
        // }
        // var onError =function(){}

        //1、测试ThreeBSP用的
        //几何体对象
        // let cylinder = new THREE.CylinderGeometry(50,50,5,40);//圆柱
        // let box = new THREE.BoxGeometry(40,5,40);//立方体
        // //材质对象
        // let material=new THREE.MeshPhongMaterial({color:0x0000ff});
        // //网格模型对象
        // let cylinderMesh=new THREE.Mesh(cylinder,material);//圆柱
        // let boxMesh=new THREE.Mesh(box,material);//立方体
        // //包装成ThreeBSP对象
        // let cylinderBSP = new ThreeBSP(cylinderMesh);
        // let boxBSP = new ThreeBSP(boxMesh);
        // let result = cylinderBSP.subtract(boxBSP);
        // //ThreeBSP对象转化为网格模型对象
        // let mesh = result.toMesh();
        // this.scene.add(mesh);//网格模型添加到场景中

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
        //     map: this.createSkin(60,200,{imgurl:"./images/aircondition.png"})
        // });
        // //创建圆柱体网格模型
        // var cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        // this.scene.add(cylinder);//网格模型添加到场景中

    }
    //测试自己生成obj文件带mtl材质的
    createObjContainMtl(){
        //如果obj文件没有包含材质关联的时候，自己生成带材质的关联obj文件
        let _this=this;
        var leaftexture = new THREE.TextureLoader().load( './images/plant/Archmodels66_leaf_33.jpg' );
        var soiltexture = new THREE.TextureLoader().load( './images/plant/Archmodels66_dirt_1.jpg' );
        var barktexture = new THREE.TextureLoader().load( './images/plant/Archmodels66_bark_1.jpg' );
        var jardinieretexture = new THREE.TextureLoader().load( './images/plant/Archmodels66_jardiniere.jpg' );
        var objLoader=new OBJLoader();
        objLoader.load("./images/plant/plant.obj",function(object ){
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh) {
                    child.material=new THREE.MeshBasicMaterial({color: 0xffffff});
                    if(child.name=="3DXY_geometry_769"||child.name=="3DXY_geometry_773"){
                        child.material.name="wire_153228214"
                        child.material.map = leaftexture;
                    }else if(child.name=="3DXY_geometry_772"||child.name=="3DXY_geometry_776"||child.name=="3DXY_geometry_777"||child.name=="3DXY_geometry_778"){
                        child.material.name="wire_108008136"
                        child.material.map = barktexture;
                    }else if(child.name=="3DXY_geometry_774"||child.name=="3DXY_geometry_775"){
                        child.material.name="wire_177148027"
                        child.material.map = soiltexture;
                    }else if(child.name=="3DXY_geometry_770"){
                        child.material.name="wire_198225087"
                        child.material.map = jardinieretexture;
                    }
                }
            });
            // _this.scene.add(object)
            let objExporter = new OBJExporter();
            var output = objExporter.parse(object);
            var link = document.createElement( 'a' ); 
            link.style.display = 'none'; 
            document.body.appendChild( link );
            link.href = URL.createObjectURL( new Blob( [ output ], { type: 'text/plain' } ) ); 
            link.download = "object.obj" ; 
            link.click();
            //然后自己制作mtl文件就可以了
        }, this.onProgress, this.onError)
    }
    //测试GLTF文件
    exportGLTF(){
        let box = new THREE.BoxGeometry(40,5,40);
        let material=new THREE.MeshPhongMaterial({color:0x0000ff});
        let obj=new THREE.Mesh(box,material);//立方体
        // 单个模型数据 GLTF导出
        let gltfExporter = new GLTFExporter();
        gltfExporter.parse(obj, function (result) {
            console.log(result);
            var output = JSON.stringify( result, null, 2 );
            var link = document.createElement( 'a' ); 
            link.style.display = 'none'; 
            document.body.appendChild( link );
            link.href = URL.createObjectURL( new Blob( [ output ], { type: 'text/plain' } ) ); 
            link.download = "object.gltf" ; 
            link.click();
        });
        //加载GLTF
        var _this=this;
        var loader = new GLTFLoader();
        loader.load( './images/test/object.gltf', function ( gltf ) {
            console.log('控制台查看加载gltf文件返回的对象结构',gltf)
            console.log('gltf对象场景属性',gltf.scene)
            console.log('gltf对象相机属性',gltf.cameras)
            _this.scene.add( gltf.scene );
        })
    }
    //测试OBJ文件
    exportOBJ(){
        let box = new THREE.BoxGeometry(40,5,40);
        let material=new THREE.MeshPhongMaterial({color:0x0000ff});
        let obj=new THREE.Mesh(box,material);//立方体
        // 单个模型数据 OBJ导出
        let objExporter = new OBJExporter();
        var output = objExporter.parse(obj);
        var link = document.createElement( 'a' ); 
        link.style.display = 'none'; 
        document.body.appendChild( link );
        link.href = URL.createObjectURL( new Blob( [ output ], { type: 'text/plain' } ) ); 
        link.download = "object.obj" ; 
        link.click();
        //加载OBJ
        var _this=this;
        var loader = new OBJLoader();
        var loader2=new OBJLoader2();
        loader.load( './images/test/object.obj', function ( obj ) {
            console.log(obj)
            _this.scene.add( obj );
        })
        // loader2.load( './images/test/object.obj', function ( obj ) {
        //     _this.scene.add( obj );
        // })
    }
    //测试
    createFBX(obj){
        let _this=this;
        var fbxLoader = new FBXLoader();
        fbxLoader.load(_this.commonFunc.getPath('rack/2-5-E-max.fbx'), function(object) {
            console.log(object)
            _this.scene.add( object );
        });
    }
}
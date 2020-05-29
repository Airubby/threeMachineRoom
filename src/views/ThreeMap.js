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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
        this.render();
        // this.setHelper();
        this.setControl();
        // this.add();
        this.InitData();  //添加3D对象、事件等
    }

    //初始化渲染场景
    initRenderer() {
        console.log(this.props)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight);
        this.dom.appendChild(this.renderer.domElement);
    }
    //初始化相机
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 1, 100000);
        this.camera.name = 'mainCamera';
        this.camera.position.set(0,1000,-1800)
        // this.camera.up.x = 0;
        // this.camera.up.y =1;
        // this.camera.up.z =0;
        this.camera.lookAt({ x: 0, y: 0, z: 0 });
        this.objects.push(this.camera);
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        let ambientLight=new THREE.AmbientLight(0xffffff);
        ambientLight.position.set(0,10,0);
        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 50, 0);
        this.scene.add(spotLight);
        this.scene.add(ambientLight);
    }
    //渲染
    render() {
        this.animate()
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
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
                case 'floor':
                    tempObj = this.CreateFloor(obj)
                    this.addObject(tempObj);
                    break;
                case 'wall':
                    this.CreateWall(obj);
                    break;
            }
        }
    }
    //创建地板
    CreateFloor(obj){
        return this.createCube(obj);
    }
    CreateWall (obj) {
        let _this=this;
        var commonThick = obj.thick || 40;//墙体厚度
        var commonLength = obj.length || 100;//墙体厚度
        var commonHeight = obj.height || 300;//强体高度
        var commonSkin = obj.style.skinColor || 0x98750f;
        //建立墙面
        obj.wallData.forEach(function(wallobj, index){
            var wallLength = commonLength;
            var wallWidth = wallobj.thick||commonThick;
            var positionX = ((wallobj.startDot.x||0) + (wallobj.endDot.x||0)) / 2;
            var positionY = ((wallobj.startDot.y || 0) + (wallobj.endDot.y || 0)) / 2;
            var positionZ = ((wallobj.startDot.z || 0) + (wallobj.endDot.z || 0)) / 2;
            //z相同 表示x方向为长度
            if (wallobj.startDot.z == wallobj.endDot.z) {
                wallLength = Math.abs(wallobj.startDot.x - wallobj.endDot.x);
                wallWidth = wallobj.thick || commonThick;
            } else if (wallobj.startDot.x == wallobj.endDot.x) {
                wallLength = wallobj.thick || commonThick;
                wallWidth = Math.abs(wallobj.startDot.z - wallobj.endDot.z);
            }
            var cubeobj = {
                length: wallLength,
                width: wallWidth,
                height: wallobj.height || commonHeight,
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
                    cube = _this.mergeModel(walchildobj.op, cube, newobj);
                })
            }
            _this.addObject(cube);
        });
    }
    mergeModel(mergeOP, fobj, sobj) {
        var fobjBSP = new ThreeBSP(fobj);
        var sobjBSP = new ThreeBSP(sobj);
       // var sobjBSP = new ThreeBSP(sobj);
        var resultBSP = null; 
        if (mergeOP == '-') {
            resultBSP = fobjBSP.subtract(sobjBSP);
        } else if (mergeOP == '+') {
            var subMesh = new THREE.Mesh(sobj);
            sobj.updateMatrix();
            fobj.geometry.merge(sobj.geometry, sobj.matrix);
            return fobj;
           // resultBSP = fobjBSP.union(sobjBSP);
        } else if (mergeOP == '&') {//交集
            resultBSP = fobjBSP.intersect(sobjBSP);
        } else {
            this.addObject(sobj);
            return fobj;
        }
        var cubeMaterialArray = [];
        for (var i = 0; i < 1; i++) {
            cubeMaterialArray.push(new THREE.MeshLambertMaterial({
                //map: this.createSkin(128, 128, { imgurl: '../datacenterdemo/res2/'+(i%11)+'.jpg' }),
                vertexColors: THREE.FaceColors
            }));
        }
        var result = resultBSP.toMesh(cubeMaterialArray);
        result.material.shading = THREE.FlatShading;
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();
        result.uuid= fobj.uuid+mergeOP+sobj.uuid;
        result.name=fobj.name+mergeOP+sobj.name;
        result.material.needsUpdate = true;
        result.geometry.buffersNeedUpdate = true;
        result.geometry.uvsNeedUpdate = true;
        var foreFaceSkin = null;
        for (var i = 0; i < result.geometry.faces.length; i++) {
            var faceset = false;
            for (var j = 0; j < fobj.geometry.faces.length; j++) {
                if (result.geometry.faces[i].vertexNormals[0].x === fobj.geometry.faces[j].vertexNormals[0].x
                    && result.geometry.faces[i].vertexNormals[0].y === fobj.geometry.faces[j].vertexNormals[0].y
                    && result.geometry.faces[i].vertexNormals[0].z === fobj.geometry.faces[j].vertexNormals[0].z
                     && result.geometry.faces[i].vertexNormals[1].x === fobj.geometry.faces[j].vertexNormals[1].x
                    && result.geometry.faces[i].vertexNormals[1].y === fobj.geometry.faces[j].vertexNormals[1].y
                    && result.geometry.faces[i].vertexNormals[1].z === fobj.geometry.faces[j].vertexNormals[1].z
                    && result.geometry.faces[i].vertexNormals[2].x === fobj.geometry.faces[j].vertexNormals[2].x
                    && result.geometry.faces[i].vertexNormals[2].y === fobj.geometry.faces[j].vertexNormals[2].y
                    && result.geometry.faces[i].vertexNormals[2].z === fobj.geometry.faces[j].vertexNormals[2].z) {
                    result.geometry.faces[i].color.setHex(fobj.geometry.faces[j].color.r * 0xff0000 + fobj.geometry.faces[j].color.g * 0x00ff00 + fobj.geometry.faces[j].color.b * 0x0000ff);
                    foreFaceSkin = fobj.geometry.faces[j].color.r * 0xff0000 + fobj.geometry.faces[j].color.g * 0x00ff00 + fobj.geometry.faces[j].color.b * 0x0000ff;
                    faceset =true;
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
                        && result.geometry.faces[i].vertexNormals[2].z === sobj.geometry.faces[j].vertexNormals[2].z
                        && result.geometry.faces[i].vertexNormals[2].z === sobj.geometry.faces[j].vertexNormals[2].z) {
                        result.geometry.faces[i].color.setHex(sobj.geometry.faces[j].color.r * 0xff0000 + sobj.geometry.faces[j].color.g * 0x00ff00 + sobj.geometry.faces[j].color.b * 0x0000ff);
                        foreFaceSkin = sobj.geometry.faces[j].color.r * 0xff0000 + sobj.geometry.faces[j].color.g * 0x00ff00 + sobj.geometry.faces[j].color.b * 0x0000ff;
                        faceset = true;
                    }
                }
            }
            if (faceset == false) {
                result.geometry.faces[i].color.setHex(foreFaceSkin);
            }
        // result.geometry.faces[i].materialIndex = i
        }
        result.castShadow = true;
        result.receiveShadow = true;
        return result;
    }
    //挖洞
    CreateHole ( obj) {
        var commonThick =  40;//墙体厚度
        var commonLength =  100;//墙体厚度
        var commonHeight =  300;//强体高度
        var commonSkin = 0x98750f;
        //建立墙面
            var wallLength = commonLength;
            var wallWidth = obj.thick || commonThick;
            var positionX = ((obj.startDot.x || 0) + (obj.endDot.x || 0)) / 2;
            var positionY = ((obj.startDot.y || 0) + (obj.endDot.y || 0)) / 2;
            var positionZ = ((obj.startDot.z || 0) + (obj.endDot.z || 0)) / 2;
            //z相同 表示x方向为长度
            if (obj.startDot.z == obj.endDot.z) {
                wallLength = Math.abs(obj.startDot.x - obj.endDot.x);
                wallWidth = obj.thick || commonThick;
            } else if (obj.startDot.x == obj.endDot.x) {
                wallLength = obj.thick || commonThick;
                wallWidth = Math.abs(obj.startDot.z - obj.endDot.z);
            }
            var cubeobj = {
                length: wallLength,
                width: wallWidth,
                height: obj.height || commonHeight,
                rotation: obj.rotation,
                x: positionX,
                uuid: obj.uuid,
                name: obj.name,
                y: positionY,
                z: positionZ,
                style: {
                    skinColor: commonSkin,
                    skin: obj.skin
                }
            }
            var cube = this.createCube(cubeobj);
            return cube;
    }
    //创建盒子体
    createCube(obj){
        var length = obj.length || 1000;//默认1000
        var width = obj.width || length;
        var height = obj.height || 10;
        var x = obj.x || 0, y = obj.y || 0, z = obj.z || 0;
        var skinColor = obj.style.skinColor || 0x98750f;
        var cubeGeometry = new THREE.CubeGeometry(length, height, width, 0, 0, 1);

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
                console.log(skin_opacity)
            }
            //上
            skin_up_obj = this.createSkinOptionOnj(length, width, obj.style.skin.skin_up, cubeGeometry, 4);
            //下
            skin_down_obj = this.createSkinOptionOnj(length, width, obj.style.skin.skin_down, cubeGeometry, 6);
            //前
            skin_fore_obj = this.createSkinOptionOnj(length, width, obj.style.skin.skin_fore, cubeGeometry, 0);
            //后
            skin_behind_obj = this.createSkinOptionOnj(length, width, obj.style.skin.skin_behind, cubeGeometry, 2);
            //左
            skin_left_obj = this.createSkinOptionOnj(length, width, obj.style.skin.skin_left, cubeGeometry, 8);
            //右
            skin_right_obj = this.createSkinOptionOnj(length, width, obj.style.skin.skin_right, cubeGeometry, 10);
        }
        var cubeMaterialArray = [];
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterialArray);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.uuid = obj.uuid;
        cube.name = obj.name;
        cube.position.set(x, y, z);
        if (obj.rotation != null && typeof (obj.rotation) != 'undefined' && obj.rotation.length > 0) {
            obj.rotation.forEach(function(rotation_obj, index){
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
                    case 'arb':
                        cube.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                        break;
                }
            });
        }
    
        return cube;
    }
    //添加对象
    addObject (obj) {
        this.objects.push(obj);
        this.scene.add(obj);
    }
    createSkinOptionOnj = function (flength, fwidth, obj, cube, cubefacenub) {
        if (this.commonFunc.hasObj(obj)) {
            if (this.commonFunc.hasObj(obj.imgurl)) {
                return {
                    map: this.createSkin(flength, fwidth, obj),transparent:true
                }
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
    createSkin = function (flength,fwidth,obj) {
        var imgwidth = 128,imgheight=128;
        if (obj.width != null&& typeof (obj.width) != 'undefined') {
            imgwidth = obj.width;
        }
        if (obj.height != null && typeof (obj.height) != 'undefined') {
            imgheight = obj.height;
        }
        var texture = new THREE.TextureLoader().load(obj.imgurl);
        var _repeat = false;
        if (obj.repeatx != null && typeof (obj.repeatx) != 'undefined' && obj.repeatx==true) {
            texture.wrapS = THREE.RepeatWrapping;
            _repeat = true;
        }
        if (obj.repeaty != null && typeof (obj.repeaty) != 'undefined' && obj.repeaty == true) {
            texture.wrapT = THREE.RepeatWrapping;
            _repeat = true;
        }
        if (_repeat) {
            texture.repeat.set(flength / imgheight, fwidth / imgheight);
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
    add(){
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
    }

}
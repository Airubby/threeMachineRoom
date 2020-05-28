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
    InitAddObject(_obj){
        console.log(this)
        let _this = this;
        if (_obj.show == null || typeof (_obj.show) == 'undefined' || _obj.show) {
            let _tempObj = null;
            switch (_obj.objType) {
                case 'floor':
                    _tempObj = _this.CreateFloor(_obj)
                    _this.addObject(_tempObj);
                    break;
                
            }
        }
    }
    //创建地板
    CreateFloor(_obj){
        console.log(this)
        var _this = this;
        var _cube = _this.createCube(_this, _obj);
        return _cube;
    }
    //创建盒子体
    createCube(_this, _obj){
        if (_this == null) {
            _this = this;
        }
        var _length = _obj.length || 1000;//默认1000
        var _width = _obj.width || _length;
        var _height = _obj.height || 10;
        var _x = _obj.x || 0, _y = _obj.y || 0, _z = _obj.z || 0;
        var skinColor = _obj.style.skinColor || 0x98750f;
        var cubeGeometry = new THREE.CubeGeometry(_length, _height, _width, 0, 0, 1);
    
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
        if (_obj.style != null && typeof (_obj.style) != 'undefined'
            && _obj.style.skin != null && typeof (_obj.style.skin) != 'undefined') {
            //透明度
            if (_obj.style.skin.opacity != null && typeof (_obj.style.skin.opacity) != 'undefined') {
                skin_opacity = _obj.style.skin.opacity;
                console.log(skin_opacity)
            }
            //上
            skin_up_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_up, cubeGeometry, 4);
            //下
            skin_down_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_down, cubeGeometry, 6);
            //前
            skin_fore_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_fore, cubeGeometry, 0);
            //后
            skin_behind_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_behind, cubeGeometry, 2);
            //左
            skin_left_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_left, cubeGeometry, 8);
            //右
            skin_right_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_right, cubeGeometry, 10);
        }
        var cubeMaterialArray = [];
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
        cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
        var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.uuid = _obj.uuid;
        cube.name = _obj.name;
        cube.position.set(_x, _y, _z);
        if (_obj.rotation != null && typeof (_obj.rotation) != 'undefined' && _obj.rotation.length > 0) {
            _obj.rotation.forEach(function(rotation_obj, index){
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
    addObject (_obj) {
        this.objects.push(_obj);
        this.scene.add(_obj);
    }
    createSkinOptionOnj = function (_this, flength, fwidth, _obj, _cube, _cubefacenub) {
        if (_this.commonFunc.hasObj(_obj)) {
            if (_this.commonFunc.hasObj(_obj.imgurl)) {
                return {
                    map: _this.createSkin(flength, fwidth, _obj),transparent:true
                }
            } else {
                if (_this.commonFunc.hasObj(_obj.skinColor)) {
                    _cube.faces[_cubefacenub].color.setHex(_obj.skinColor);
                    _cube.faces[_cubefacenub + 1].color.setHex(_obj.skinColor);
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
    createSkin = function (flength,fwidth,_obj) {
        var imgwidth = 128,imgheight=128;
        if (_obj.width != null&& typeof (_obj.width) != 'undefined') {
            imgwidth = _obj.width;
        }
        if (_obj.height != null && typeof (_obj.height) != 'undefined') {
            imgheight = _obj.height;
        }
        var texture = new THREE.TextureLoader().load(_obj.imgurl);
        var _repeat = false;
        if (_obj.repeatx != null && typeof (_obj.repeatx) != 'undefined' && _obj.repeatx==true) {
            texture.wrapS = THREE.RepeatWrapping;
            _repeat = true;
        }
        if (_obj.repeaty != null && typeof (_obj.repeaty) != 'undefined' && _obj.repeaty == true) {
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
        hasObj: function (_obj) {
            if (_obj != null && typeof (_obj) != 'undefined') {
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
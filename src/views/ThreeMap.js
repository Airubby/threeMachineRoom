import * as THREE from 'three';
import 'imports-loader?THREE=three!threebsp'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default class ThreeMap {
    constructor(props,mapData) {
        this.props=props;
        this.data=new Array();
        this.mapData=mapData;
        this.dom=document.getElementById(this.props.dom);
        this.init();
    }

    init() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.render();
        // this.setHelper();
        this.setControl();
        this.add();
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
        this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 0.1, 1000);
        this.camera.position.set(50, 100, 300);
        this.camera.lookAt(0, 0, 0)
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        var ambientLight=new THREE.AmbientLight(0xffffff);
        ambientLight.position.set(0,10,0);
        var spotLight = new THREE.SpotLight(0xffffff);
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
    setControl() {
        this.controls = new OrbitControls(this.camera,this.dom);
        this.controls.update();
    }
    add(){
        //几何体对象
        var cylinder = new THREE.CylinderGeometry(50,50,5,40);//圆柱
        var box = new THREE.BoxGeometry(40,5,40);//立方体
        //材质对象
        var material=new THREE.MeshPhongMaterial({color:0x0000ff});
        //网格模型对象
        var cylinderMesh=new THREE.Mesh(cylinder,material);//圆柱
        var boxMesh=new THREE.Mesh(box,material);//立方体
        //包装成ThreeBSP对象
        var cylinderBSP = new ThreeBSP(cylinderMesh);
        var boxBSP = new ThreeBSP(boxMesh);
        var result = cylinderBSP.subtract(boxBSP);
        //ThreeBSP对象转化为网格模型对象
        var mesh = result.toMesh();
        this.scene.add(mesh);//网格模型添加到场景中
    }

}
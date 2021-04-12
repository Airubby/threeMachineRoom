/*
作者:Mr.Xie
创建时间:2021年04月07日
功能描述:3D机房封装
*/
const width=2000,depth=1200,height=90,ladderWidth=40,ladderDepth=400,wallDepth=10,wallHeight=800,
doorWidth=20,wireWidth=0.1,wireHeight=10,spoolDepth=80,spoolHeight=40,
skinColor=0x062062,edgeColor=0x155CAC;
export const ThreeData={
    objects: [
        //地板
        {
            uuid: "",
            name: 'floor',
            objType: 'cube',
            width: width,
            depth: depth,
            height: height,
            style: {
                skinColor: skinColor,
                edgeColor:edgeColor,
            }
        },
        // 梯子
        {
            uuid: "",
            name: 'ladder',
            objType: 'wall',
            depth: ladderDepth,
            width: ladderWidth, 
            height: height/3,
            style:{
                skinColor: skinColor,
                edgeColor:edgeColor,
            },
            childrens: [
                {
                    uuid: "",
                    name: 'ladder1',
                    startDot: {
                        x: width/2,
                        y: -height/3,
                        z: 0
                    },
                    endDot: {
                        x: width/2+ladderWidth,
                        y: -height/3,
                        z: 0
                    }
                },
                {
                    uuid: "",
                    name: 'ladder2',
                    startDot: {
                        x: width/2,
                        y: 0,
                        z: 0
                    },
                    endDot: {
                        x: width/2+ladderWidth,
                        y: 0,
                        z: 0
                    }
                },
                {
                    uuid: "",
                    name: 'ladder3',
                    startDot: {
                        x: width/2,
                        y: height/3,
                        z: 0
                    },
                    endDot: {
                        x: width/2+ladderWidth,
                        y: height/3,
                        z: 0
                    }
                },
                {
                    uuid: "",
                    name: 'ladder4',
                    startDot: {
                        x: width/2+ladderWidth,
                        y: -height/3,
                        z: 0
                    },
                    endDot: {
                        x: width/2+ladderWidth*2,
                        y: -height/3,
                        z: 0
                    }
                },
                {
                    uuid: "",
                    name: 'ladder5',
                    startDot: {
                        x: width/2+ladderWidth,
                        y: 0,
                        z: 0
                    },
                    endDot: {
                        x: width/2+ladderWidth*2,
                        y: 0,
                        z: 0
                    }
                },
                {
                    uuid: "",
                    name: 'ladder6',
                    startDot: {
                        x: width/2+ladderWidth*2,
                        y: -height/3,
                        z: 0
                    },
                    endDot: {
                        x: width/2+ladderWidth*3,
                        y: -height/3,
                        z: 0
                    }
                },
            ],
        },
        //wall
        {
            uuid: "",
            name: 'wall',
            objType: 'wall',
            depth: depth,
            width: wallDepth, 
            height: wallHeight,
            style:{
                skinColor: skinColor,
                edgeColor:edgeColor,
            },
            childrens: [
                {//左面墙
                    uuid: "",
                    name: 'wall1',
                    startDot: {
                        x: -width/2+wallDepth,
                        y: height/2+wallHeight/2,
                        z: 0
                    },
                    endDot: {
                        x: -width/2,
                        y: height/2+wallHeight/2,
                        z: 0
                    },
                    childrens:[
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireWidth, 
                            height: wireHeight,
                            x:-wallDepth/2-1,
                            y:wallHeight/2-wallHeight/3,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireWidth, 
                            height: wireHeight,
                            x:-wallDepth/2-1,
                            y:wallHeight/3-wallHeight/2,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                    ]
                },
                {//右面墙
                    uuid: "",
                    name: 'wall2',
                    startDot: {
                        x: width/2-wallDepth,
                        y: height/2+wallHeight/2,
                        z: 0
                    },
                    endDot: {
                        x: width/2,
                        y: height/2+wallHeight/2,
                        z: 0
                    },
                    childrens:[
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireWidth, 
                            height: wireHeight,
                            x:wallDepth/2+1,
                            y:wallHeight/2-wallHeight/3,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireWidth, 
                            height: wireHeight,
                            x:wallDepth/2+1,
                            y:wallHeight/3-wallHeight/2,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            name: 'TV',
                            uuid: "",
                            objType: '',
                            // width:30,
                            depth:(depth-ladderDepth)/2-wireHeight*2,
                            height: wallHeight/3-wireHeight,
                            // x:doorWidth+15,
                            // y:0,
                            // z:-ladderDepth/2,
                            startDot: {
                                x: width/2,
                                y: wallHeight/2,
                                z: -depth/2+ladderDepth/2
                            },
                            endDot: {
                                x: width/2+5,
                                y: wallHeight/2+height,
                                z: -depth/2+ladderDepth/2
                            },
                            skin:{
                                skinColor:edgeColor,
                                edgeColor:edgeColor,
                                skin_right: {
                                    imgurl: "tv.png",
                                },
                            }
                        },
                    ]
                },
                {
                    uuid: "",
                    name: 'wall3',
                    height:wallDepth,
                    startDot: {
                        x: -width/2,
                        y: height/2+wallHeight-wallDepth/2,
                        z: 0
                    },
                    endDot: {
                        x: width/2,
                        y: height/2+wallHeight-wallDepth/2,
                        z: 0
                    },
                    childrens:[
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:0,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:-width/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:-width*2/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:-width*3/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:-width*4/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:width/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:width*2/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:width*3/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线框',
                            objType: 'wireCube',
                            depth: depth,
                            width: wireHeight, 
                            height: wireWidth,
                            x:width*4/10,
                            y:wallDepth/2+1,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op: '-',
                            uuid: "",
                            name: 'windowHole',
                            objType: '',
                            width: width*9/10,
                            height: wallDepth+10,
                            startDot: {
                                x: 0,
                                y: height/2+wallHeight-wallDepth/2,
                                z: -depth*4/16
                            },
                            endDot: {
                                x: 0,
                                y: height/2+wallHeight-wallDepth/2,
                                z: depth*4/16
                            },
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线柱',
                            objType: 'wireCube',
                            depth: spoolDepth,
                            width: width*9/10, 
                            height: spoolHeight,
                            x:0,
                            y:spoolHeight/2+1,
                            z:depth*5/16,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线柱',
                            objType: 'wireCube',
                            depth: spoolDepth,
                            width: width*9/10, 
                            height: spoolHeight,
                            x:0,
                            y:spoolHeight/2+1,
                            z:-depth*5/16,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线柱',
                            objType: 'wireCube',
                            depth: depth*10/16-spoolDepth,
                            width: spoolDepth, 
                            height: spoolHeight,
                            x:width*9/20-spoolDepth/2,
                            y:spoolHeight*3/2,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            op:"+",
                            uuid: "",
                            name: '线柱',
                            objType: 'wireCube',
                            depth: depth*10/16-spoolDepth,
                            width: spoolDepth, 
                            height: spoolHeight,
                            x:-width*9/20+spoolDepth/2,
                            y:spoolHeight*3/2,
                            z:0,
                            skin: {
                                skinColor: skinColor,
                                edgeColor:edgeColor,
                            },
                        },
                        {
                            uuid: "+",
                            name: 'windowGlasses',
                            objType: '',
                            width: width*9/10,
                            height: wallDepth,
                            startDot: {
                                x: 0,
                                y: height/2+wallHeight-wallDepth/2,
                                z: -depth*4/16
                            },
                            endDot: {
                                x: 0,
                                y: height/2+wallHeight-wallDepth/2,
                                z: depth*4/16
                            },
                            skin: {
                                skin_up: {
                                    imgurl: "glass.png",
                                    transparent: true,
                                    opacity: 0.25,
                                    repeatx: true,
                                    repeaty: true,
                                },
                                skin_down: {
                                    imgurl: "glass.png",
                                    transparent: true,
                                    opacity: 0.25,
                                    repeatx: true,
                                    repeaty: true,
                                },
                            },
                        },
                        
                    ]
                }
            ],
        },
        //门
        {
            uuid: "",
            name: 'door',
            objType: 'face',
            width: doorWidth,
            depth: ladderDepth,
            height: wallHeight,
            y:wallHeight/2+height/2,
            x:width/2+doorWidth/2,
            style: {
                skinColor: skinColor,
                edgeColor:edgeColor,
            },
            childrens:[
                {
                    name: '门把',
                    uuid: "",
                    objType: 'faceCube',
                    depth:15,
                    startDot: {
                        x: width/2+doorWidth,
                        y: wallHeight/2+height,
                        z: -ladderDepth*5/13
                    },
                    endDot: {
                        x: width/2+doorWidth+5,
                        y: wallHeight/2+height,
                        z: -ladderDepth*5/13
                    },
                    skin:{
                        skinColor:edgeColor,
                    }
                },
                {
                    name: 'line1',
                    uuid: "",
                    objType: 'line',
                    startDot: {
                        x: width/2+doorWidth+1,
                        y: wallHeight/2,
                        z: ladderDepth/2
                    },
                    endDot: {
                        x: width/2+doorWidth+1,
                        y: wallHeight/2,
                        z: -ladderDepth/2
                    },
                    skinColor:edgeColor,
                },
                {
                    name: 'line2',
                    uuid: "",
                    objType: 'line',
                    startDot: {
                        x: width/2+doorWidth+1,
                        y: wallHeight*9/10,
                        z: ladderDepth/2
                    },
                    endDot: {
                        x: width/2+doorWidth+1,
                        y: wallHeight*9/10,
                        z: -ladderDepth/2
                    },
                    skinColor:edgeColor,
                },
                {
                    name: 'line3',
                    uuid: "",
                    objType: 'line',
                    startDot: {
                        x: width/2+doorWidth+1,
                        y: wallHeight+height/2,
                        z: ladderDepth/4
                    },
                    endDot: {
                        x: width/2+doorWidth+1,
                        y: height/2,
                        z: ladderDepth/4
                    },
                    skinColor:edgeColor,
                },
                {
                    name: 'line4',
                    uuid: "",
                    objType: 'line',
                    startDot: {
                        x: width/2+doorWidth+1,
                        y: wallHeight+height/2,
                        z: -ladderDepth/4
                    },
                    endDot: {
                        x: width/2+doorWidth+1,
                        y: height/2,
                        z: -ladderDepth/4
                    },
                    skinColor:edgeColor,
                },
            ]
        },
        //柜子
        // {
        //     uuid: "",
        //     name: '柜子',
        //     objType: 'rack',
        //     depth: depth/3,
        //     height: wallHeight-wallDepth,
        //     style:{
        //         skinColor: skinColor,
        //         edgeColor:edgeColor,
        //     },
        //     childrens:[
        //         {
        //             uuid: "",
        //             name: 'Rack1',
        //             width:200,
        //             height:wallHeight-wallDepth,
        //             depth:depth/3,
        //             x:-width/2+wallDepth+100,
        //             y:height/2+wallHeight/2-wallDepth/2,
        //             z:-depth/3,
        //             data:{
        //                 devid:"01",
        //                 pointid:"0101",
        //                 isalarm:false,
        //                 tipInfo:"设备1信息***",
        //                 alarmInfo:"",
        //             },
        //             childrens:[
        //                 {
        //                     op:"+",
        //                     uuid: "",
        //                     name: '线框',
        //                     objType: 'wireCube',
        //                     depth: wireWidth,
        //                     width: 200, 
        //                     height: wireHeight,
        //                     x:0,
        //                     y:wallHeight/2-wallHeight/3+wallDepth/2,
        //                     z:-(depth/6+1),
        //                     skin: {
        //                         skinColor: skinColor,
        //                         edgeColor:edgeColor,
        //                     },
        //                 },
        //                 {
        //                     op:"+",
        //                     uuid: "",
        //                     name: '线框',
        //                     objType: 'wireCube',
        //                     depth: wireWidth,
        //                     width: 200, 
        //                     height: wireHeight,
        //                     x:0,
        //                     y:-(wallHeight/2-wallHeight/3)+wallDepth/2,
        //                     z:-(depth/6+1),
        //                     skin: {
        //                         skinColor: skinColor,
        //                         edgeColor:edgeColor,
        //                     },
        //                 },
        //             ]
        //         },
        //     ]
        // }
    ],
    events: {
        dbclick: [
            
        ],
        mouseDown: {
        },
        mouseUp: {
        },
        mouseMove: {
        }
    },
    btns: [
        
    ]
}
let number=10,rackWidth=(width-wallDepth*2-(number+1)*wireHeight)/number;
let cabinet={
    uuid: "",
    name: '柜子',
    objType: 'rack',
    depth: depth/3,
    height: wallHeight-wallDepth,
    style:{
        skinColor: skinColor,
        edgeColor:edgeColor,
    },
    childrens:[
        
    ]
}
let rack={
    uuid: "",
    name: 'Rack1',
    width:rackWidth,
    height:wallHeight-wallDepth,
    depth:depth/3,
    x:-width/2+wallDepth+rackWidth/2,
    y:height/2+wallHeight/2-wallDepth/2,
    z:depth/3,
    data:{
        name:"",
        devid:"01",
        pointid:"0101",
        isalarm:false,
        tipInfo:"设备1信息***",
        alarmInfo:"",
    },
    childrens:[
        {
            op:"+",
            uuid: "",
            name: '线框',
            objType: 'wireCube',
            depth: wireWidth,
            width: rackWidth, 
            height: wireHeight,
            x:0,
            y:wallHeight/2-wallHeight/3+wallDepth/2,
            z:depth/6+1,
            skin: {
                skinColor: skinColor,
                edgeColor:edgeColor,
            },
        },
        {
            op:"+",
            uuid: "",
            name: '线框',
            objType: 'wireCube',
            depth: wireWidth,
            width: rackWidth, 
            height: wireHeight,
            x:0,
            y:-(wallHeight/2-wallHeight/3)+wallDepth/2,
            z:depth/6+1,
            skin: {
                skinColor: skinColor,
                edgeColor:edgeColor,
            },
        },
    ]
}

for (var i = 0; i <number;i++){ 
    let obj=JSON.parse(JSON.stringify(rack));
    obj.name="Rack"+(i+1);
    obj.data.name="JG-"+(i+1);
    obj.data.tipInfo="精密空调柜-"+(i+1);
    obj.data.devid=obj.data.devid+i;
    obj.data.pointid=obj.data.pointid+i;
    obj.x=-width/2+wallDepth+rackWidth/2+rackWidth*i+(i+1)*wireHeight;
    cabinet.childrens.push(obj)
}
let cabinet1={
    uuid: "",
    name: '柜子',
    objType: 'rack',
    depth: depth/3,
    height: wallHeight-wallDepth,
    style:{
        skinColor: skinColor,
        edgeColor:edgeColor,
    },
    childrens:[
        
    ]
}
for (var i = 0; i <number;i++){ 
    let obj=JSON.parse(JSON.stringify(rack));
    obj.name="Rack"+(i+10);
    obj.data.name="JG-"+(i+10);
    obj.data.tipInfo="精密空调柜-"+(i+1+10);
    obj.data.devid=obj.data.devid+(i+10);
    obj.data.pointid=obj.data.pointid+(i+10);
    obj.x=-width/2+wallDepth+rackWidth/2+rackWidth*i+(i+1)*wireHeight;
    obj.z=-depth/3
    obj.childrens.forEach(element => {
        element.z=-(depth/6+1);
    });
    cabinet1.childrens.push(obj)
}
ThreeData.objects.push(cabinet);
ThreeData.objects.push(cabinet1);
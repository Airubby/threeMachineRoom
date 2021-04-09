/*
作者:Mr.Xie
创建时间:2021年04月07日
功能描述:3D机房封装
*/
const width=2000,depth=1200,height=90,ladderWidth=40,ladderDepth=400,wallDepth=10,wallHeight=800,doorWidth=20,
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
                        
                    ]
                },
            ],
        },
        //顶
        {
            uuid: "",
            name: 'peak',
            objType: 'cube',
            width: width,
            depth: depth,
            height: wallDepth,
            y:wallHeight+height/2-wallDepth/2,
            style: {
                skinColor: skinColor,
                edgeColor:edgeColor,
            }
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
                    objType: 'cube',
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
                    skinColor:skinColor,
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

/*
作者:Mr.Xie
创建时间:2021年04月07日
功能描述:3D机房封装
*/
const width=2000,depth=1200,height=90,ladderWidth=40,ladderDepth=400,wallDepth=10,wallHeight=800,skinColor=0x062062,edgeColor=0x155CAC;
export const ThreeData={
    objects: [
        //地板
        {
            show: true,
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
            show: true,
            uuid: "",
            name: 'ladder',
            objType: 'ladder',
            depth: ladderDepth,
            width: ladderWidth, 
            height: height/3,
            style:{
                skinColor: skinColor,
                edgeColor:edgeColor,
            },
            ladderData: [
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
            show: true,
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
            wallData: [
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
        {
            show: true,
            uuid: "",
            name: 'floor',
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

/*
作者:Mr.Xie
创建时间:2021年04月07日
功能描述:3D机房封装
*/

export const ThreeData={
    objects: [
        //地板
        {
            show: true,
            uuid: "",
            name: 'floor',
            objType: 'cube',
            width: 2000,
            depth: 1200,
            height: 100,
            style: {
                skinColor: 0x062062,
                border:0x155CAC,
            }
        },
        // 梯子
        {
            show: true,
            uuid: "",
            name: 'ladder',
            objType: 'ladder',
            depth: 400,
            width: 40, //根据实际的宽度来的
            height: 33,
            style:{
                skinColor: 0x062062,
            },
            wallData: [
                {//前面墙
                    uuid: "",
                    name: 'wall1',
                    skin: {
                        skin_behind: {
                            skinColor: 0xb0cee0,
                            imgurl: "wall.png",
                            transparent: true,
                            opacity: 0.25,
                            repeatx: true,
                            repeaty: true,
                            width: 128,
                            height: 128
                        }
                    },
                    startDot: {
                        x: -500,
                        y: 120,
                        z: 450
                    },
                    endDot: {
                        x: 500,
                        y: 120,
                        z: 450
                    },
                    childrens:[
                       
                        {
                            op: '-',
                            show: true,
                            uuid: "",
                            name: 'windowHole',
                            objType: 'windowHole',
                            depth: 20,
                            height: 160,
                            startDot: {
                                x: -450,
                                y: 130,
                                z: 450
                            },
                            endDot: {
                                x: 50,
                                y: 130,
                                z: 450
                            }
                        },
                        
                        {
                            show: true,
                            uuid: "",
                            name: 'windowGlasses',
                            objType: 'glasses',
                            depth: 5,
                            height: 160,
                            skin: {
                                skin_fore: {
                                    imgurl: "glass.png",
                                    transparent: true,
                                    opacity: 0.25,
                                    repeatx: true,
                                    repeaty: true,
                                },
                                skin_behind: {
                                    imgurl: "glass.png",
                                    transparent: true,
                                    opacity: 0.25,
                                    repeatx: true,
                                    repeaty: true,
                                },
                            },
                            startDot: {
                                x: -450,
                                y: 130,
                                z: 450
                            },
                            endDot: {
                                x: 50,
                                y: 130,
                                z: 450
                            }
                        },
                    ]
                },
            ],
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

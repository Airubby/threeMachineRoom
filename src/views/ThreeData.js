/*
作者:Mr.Xie
创建时间:2020年05月29日
功能描述:3D机房封装
*/
export const ThreeData={
    objects: [
        //地板
        {
            show: true,
            uuid: "",
            name: 'floor',
            objType: 'floor',
            width: 2000,
            depth: 1600,
            height: 10,
            rotation: [{ direction: 'x', degree: 0 }], 
            x: 0,
            y: 0,
            z: 0,
            style: {
                skinColor: 0xdddddd,
                skin: {
                    skin_up: {
                        skinColor: 0x98750f,
                        imgurl: "/images/floor.jpg",
                        repeatx: true,
                        repeaty: true,
                        width: 128,
                        height: 128
                    },
                }
            }
        },
        //墙体
        {
            show: true,
            uuid: "",
            name: 'wall',
            objType: 'wall',
            depth: 20,
            width: 100, //根据实际的宽度来的
            height: 240,
            style:{
                skinColor: 0xb0cee0,
            },
            wallData: [
                {//前面墙
                    uuid: "",
                    name: 'wall1',
                    skin: {
                        skin_behind: {
                            skinColor: 0xb0cee0,
                            imgurl: "/images/wall.png",
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
                    rotation: [{ direction: 'x', degree: 0 }], 
                    childrens:[
                        {
                            op: '-',
                            show: true,
                            uuid: "",
                            name: 'doorhole',
                            objType: 'doorhole',
                            depth: 20,
                            height: 220,
                            startDot: {
                                x: 190,
                                y: 110,
                                z: 450
                            },
                            endDot: {
                                x: 410,
                                y: 110,
                                z: 450
                            },
                        },
                        {
                            op: '-',
                            show: true,
                            uuid: "",
                            name: 'windowHole',
                            objType: 'windowHole',
                            thick: 20,
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
                    ]
                },
                {//后面墙
                    uuid: "",
                    name: 'wall2',
                    skin: {
                        skin_fore: {
                            skinColor: 0xb0cee0,
                            imgurl: "/images/wall.png",
                            repeatx: true,
                            repeaty: true,
                            width: 128,
                            height: 128
                        },
                        
                    },
                    startDot: {
                        x: -500,
                        y: 120,
                        z: -350
                    },
                    endDot: {
                        x: 500,
                        y: 120,
                        z: -350
                    },
                    rotation: [{ direction: 'x', degree: 0 }], 
                },
                {//左面墙
                    uuid: "",
                    name: 'wall3',
                    skin: {
                        skin_right: {
                            skinColor: 0xb0cee0,
                            imgurl: "/images/wall.png",
                            repeatx: true,
                            repeaty: true,
                            width: 128,
                            height: 128
                        },
                    },
                    startDot: {
                        x: -510,
                        y: 120,
                        z: -360
                    },
                    endDot: {
                        x: -510,
                        y: 120,
                        z: 460
                    },
                    rotation: [{ direction: 'x', degree: 0 }], 
                },
                {//右面墙
                    uuid: "",
                    name: 'wall4',
                    thick: 20,
                    height: 240,
                    skin: {
                        skin_left: {
                            skinColor: 0xb0cee0,
                            imgurl: "/images/wall.png",
                            repeatx: true,
                            repeaty: true,
                            width: 128,
                            height: 128
                        }
                    },
                    startDot: {
                        x: 510,
                        y: 120,
                        z: -360
                    },
                    endDot: {
                        x: 510,
                        y: 120,
                        z: 460
                    },
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

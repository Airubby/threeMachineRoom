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
                skinColor: 0x6EA1B5,
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
                            name: 'windowCaseBottom',
                            uuid: "",
                            objType: 'cube',
                            depth: 30,
                            height: 10,
                            startDot: {
                                x: -450,
                                y: 50,
                                z: 450
                            },
                            endDot: {
                                x: 50,
                                y: 50,
                                z: 450
                            },
                            skinColor:0xc0dee0,
                        },
                        {
                            show: true,
                            uuid: "",
                            name: 'doorCaseRight',
                            objType: 'cube',
                            depth: 24,
                            height: 220,
                            startDot: {
                                x: 405,
                                y: 110,
                                z: 450
                            },
                            endDot: {
                                x: 410,
                                y: 110,
                                z: 450
                            },
                            skinColor:0xc0dee0,
                        },
                        {
                            show: true,
                            name: 'doorCaseLeft',
                            uuid: "",
                            objType: 'cube',
                            depth: 24,
                            height: 220,
                            startDot: {
                                x: 190,
                                y: 110,
                                z: 450
                            },
                            endDot: {
                                x: 195,
                                y: 110,
                                z: 450
                            },
                            skinColor:0xc0dee0,
                        },
                        {
                            show: true,
                            name: 'doorCaseTop',
                            uuid: "",
                            objType: 'cube',
                            depth: 24,
                            height: 5,
                            startDot: {
                                x: 190,
                                y: 220,
                                z: 450
                            },
                            endDot: {
                                x: 410,
                                y: 220,
                                z: 450
                            },
                            skinColor:0xc0dee0,
                        },
                        {
                            show: true,
                            name: 'doorCaseBottom',
                            uuid: "",
                            objType: 'cube',
                            depth: 24,
                            height: 5,
                            startDot: {
                                x: 195,
                                y: 5,
                                z: 450
                            },
                            endDot: {
                                x: 405,
                                y: 5,
                                z: 450
                            },
                            skinColor:0x5f7071,
                        },
                        {
                            show: true,
                            name: 'doorControl',
                            uuid: "",
                            objType: 'cube',
                            depth: 10,
                            height: 40,
                            startDot: {
                                x: 160,
                                y: 140,
                                z: 460
                            },
                            endDot: {
                                x: 180,
                                y: 140,
                                z: 460
                            },
                            skinColor:0x333333,
                            skin: {
                                skin_fore: {
                                    skinColor: 0x333333,
                                    width: 20,
                                    height:40,
                                    imgurl: "/images/doorControl.jpg",
                                },
                            },
                        },
                        {
                            show: true,
                            name: 'doorLeft',
                            uuid: "",
                            objType: 'cube',
                            depth: 4,
                            height: 210,
                            skinColor: 0x51443e,
                            skin: {
                                skin_fore: {
                                    imgurl: "/images/door_left.png",
                                    opacity: 1,
                                    transparent: true,
                                },
                                skin_behind: {
                                    imgurl: "/images/door_right.png",
                                    opacity: 1,
                                    transparent: true,
                                },
                            },
                            startDot: {
                                x: 195,
                                y: 112,
                                z: 450
                            },
                            endDot: {
                                x: 300,
                                y: 112,
                                z: 450
                            },
                        },
                        {
                            show: true,
                            name: 'doorRight',
                            uuid: "",
                            objType: 'cube',
                            depth: 4,
                            height: 210,
                            skinColor: 0x51443e,
                            skin: {
                                skin_fore: {
                                    imgurl: "/images/door_right.png",
                                    opacity: 1,
                                    transparent: true,
                                },
                                skin_behind: {
                                    imgurl: "/images/door_left.png",
                                    opacity: 1,
                                    transparent: true,
                                },
                            },
                            startDot: {
                                x: 300,
                                y: 112,
                                z: 450
                            },
                            endDot: {
                                x: 405,
                                y: 112,
                                z: 450
                            },
                        },
                        {
                            show: true,
                            uuid: "",
                            name: 'windowGlasses',
                            objType: 'glasses',
                            depth: 20,
                            height: 160,
                            skin: {
                                opacity: 0.1,
                                skin_fore: {
                                    imgurl: "/images/glass.png",
                                    transparent: true,
                                    opacity: 0.25,
                                    repeatx: true,
                                    repeaty: true,
                                },
                                skin_behind: {
                                    imgurl: "/images/glass.png",
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
        //玻璃
        {
            show: true,
            name: 'windowGlass',
            uuid: "",
            objType: 'glasses',
            width: 500,
            height: 160,
            pic: "/images/glass.png",
            transparent: true,
            opacity: 0.1,
            position: { x: 200, y: 130, z: -350 },
            rotation: { x: 0, y: 0 * Math.PI, z: 0 },
            blending: false,
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

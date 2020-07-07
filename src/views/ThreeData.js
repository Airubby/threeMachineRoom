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
            objType: 'cube',
            width: 2000,
            depth: 1600,
            height: 10,
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
                                    transparent: true,
                                },
                                skin_behind: {
                                    imgurl: "/images/door_right.png",
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
                            depth: 5,
                            height: 160,
                            skin: {
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
                    childrens:[
                        {
                            show: true,
                            uuid: "",
                            name: 'windowMessage',
                            objType: 'cube',
                            depth: 2,
                            height: 100,
                            skinColor: 0xffffff,
                            skin: {
                                skin_fore: {
                                    imgurl: "/images/message.jpg",
                                },
                            },
                            startDot: {
                                x: 300,
                                y: 150,
                                z: -340
                            },
                            endDot: {
                                x: 350,
                                y: 150,
                                z: -340
                            },
                        },
                    ]
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
                },
                {//右面墙
                    uuid: "",
                    name: 'wall4',
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
                    childrens:[
                        {
                            show: true,
                            uuid: "",
                            name: 'windowTV',
                            objType: 'cube',
                            depth: 10,
                            height: 120,
                            skinColor: 0x111111,
                            skin: {
                                skin_left: {
                                    imgurl: "/images/tv.jpg",
                                },
                            },
                            startDot: {
                                x: 495,
                                y: 130,
                                z: -190
                            },
                            endDot: {
                                x: 495,
                                y: 130,
                                z: 290
                            }
                        },
                    ]
                },
            ],
        },
        //空调
        {
            show: true,
            uuid: "",
            name: 'aircondition',
            objType: 'cube',
            width: 80,
            depth: 60,
            height: 220,
            x: 440,
            y: 110,
            z: -280,
            rotation: [{ direction: 'y', degree: -0.2*Math.PI}],
            style: {
                skinColor: 0xfafafa,
                skin: {
                    skin_fore: {
                        imgurl: "/images/aircondition.png",
                    },
                }
            },
        },
        //花
        {
            show: true,
            uuid: "",
            name: 'plant',
            objType: 'cylinderPlant',
            radiusTop:20,
            radiusBottom:15,
            height:40,
            radiusSegments:20,
            x: 420,
            y: 20,
            z: 510,
            style: {
                skinColor: 0xA76C32,
            },
            childrens:[
                {
                    show: true,
                    uuid: "",
                    name: 'plantImg',
                    objType: 'plane',
                    width: 64,
                    height: 100,
                    x: 420,
                    y: 90,
                    z: 510,
                    imgurl: "images/plant.png",
                },
                {
                    show: true,
                    uuid: "",
                    name: 'plantImg',
                    objType: 'plane',
                    width: 64,
                    height: 100,
                    x: 420,
                    y: 90,
                    z: 510,
                    imgurl: "images/plant.png",
                    rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
                },
                {
                    show: true,
                    uuid: "",
                    name: 'plant',
                    objType: 'cylinderPlant',
                    radiusTop:16,
                    radiusBottom:14,
                    height:2,
                    radiusSegments:20,
                    x: 420,
                    y: 40,
                    z: 510,
                    style: {
                        skinColor: 0x323232,
                    },
                }
            ]
        },
        {
            show: true,
            uuid: "",
            name: 'plant',
            objType: 'cylinderPlant',
            radiusTop:20,
            radiusBottom:15,
            height:40,
            radiusSegments:10,
            x: 160,
            y: 20,
            z: 510,
            style: {
                skinColor: 0xA76C32,
            },
            childrens:[
                {
                    show: true,
                    uuid: "",
                    name: 'plantImg',
                    objType: 'plane',
                    width: 64,
                    height: 100,
                    x: 160,
                    y: 90,
                    z: 510,
                    imgurl: "images/plant.png",
                },
                {
                    show: true,
                    uuid: "",
                    name: 'plantImg',
                    objType: 'plane',
                    width: 64,
                    height: 100,
                    x: 160,
                    y: 90,
                    z: 510,
                    imgurl: "images/plant.png",
                    rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
                },
                {
                    show: true,
                    uuid: "",
                    name: 'plant',
                    objType: 'cylinderPlant',
                    radiusTop:16,
                    radiusBottom:14,
                    height:2,
                    radiusSegments:20,
                    x: 160,
                    y: 40,
                    z: 510,
                    style: {
                        skinColor: 0x323232,
                    },
                }
            ]
        },
        //机柜
        // {
        //     show:true,
        //     name: 'cabinet',
        //     uuid: '',
        //     objType: 'emptyCabinet',
        //     transparent:true,
        //     size:{width:70,depth:70,height:200, thick:2},
        //     x:-350, y: 100, z: -180,
        //     rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
        //     style:{
        //         skinColor: 0xff0000,
        //         skin:{
        //             skinColor: 0xff0000,
        //             skin_up: { imgurl: "/images/rack_top.jpg" },
        //             skin_down: { imgurl: "/images/rack_top.jpg" },
        //             skin_fore: {imgurl: "/images/rack_back.jpg"},
        //             skin_behind: {imgurl: "/images/rack_back.jpg"},
        //             skin_left: { imgurl: "/images/rack_back.jpg" },
        //             skin_right: { imgurl: "/images/rack_back.jpg" },
        //         }
        //     },
        //     doors: {
        //         doorType:'lr',
        //         doorname: ['cabinet_door'],
        //         rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
        //         skins:[ {
        //             skinColor: 0x333333,
        //             skin_fore: {
        //                 imgurl: "images/rack_right_door.jpg",
        //             },
        //             skin_behind: {
        //                 imgurl: "images/rack_left_door.jpg",
        //             }
        //         }]
        //     },
        //     childrens:[
        //         {
        //             show: true,
        //             uuid: "",
        //             name: 'equipment_server1',
        //             objType: 'cube',
        //             depth: 65,
        //             width: 65,
        //             height: 10,
        //             x: -300,y: 5,z: -180,
        //             style: {
        //                 skinColor: 0xff0000,
        //                 skin: {
        //                     skin_up: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_down: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_fore: {
        //                         imgurl: "images/server1.jpg",
        //                     },
        //                     skin_behind: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_left: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_right: {
        //                         imgurl: "images/rack_inside.png",
        //                     }
        //                 }
        //             }
        //         },
        //         {
        //             show: true,
        //             uuid: "",
        //             name: 'equipment_server2',
        //             objType: 'cube',
        //             depth: 65,
        //             width: 65,
        //             height: 20,
        //             x: -300,y: 20,z: -180,
        //             style: {
        //                 skinColor: 0xff0000,
        //                 skin: {
        //                     skin_up: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_down: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_fore: {
        //                         imgurl: "images/server2.jpg",
        //                     },
        //                     skin_behind: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_left: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_right: {
        //                         imgurl: "images/rack_inside.png",
        //                     }
        //                 }
        //             }
        //         },
        //         {
        //             show: true,
        //             uuid: "",
        //             name: 'equipment_server1',
        //             objType: 'cube',
        //             depth: 65,
        //             width: 65,
        //             height: 10,
        //             x: -300,y: 191,z: -180,
        //             style: {
        //                 skinColor: 0xff0000,
        //                 skin: {
        //                     skin_up: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_down: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_fore: {
        //                         imgurl: "images/server1.jpg",
        //                     },
        //                     skin_behind: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_left: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_right: {
        //                         imgurl: "images/rack_inside.png",
        //                     }
        //                 }
        //             }
        //         },
        //         {
        //             show: true,
        //             uuid: "",
        //             name: 'equipment_server2',
        //             objType: 'cube',
        //             depth: 65,
        //             width: 65,
        //             height: 20,
        //             x: -300,y: 80,z: -180,
        //             style: {
        //                 skinColor: 0xff0000,
        //                 skin: {
        //                     skin_up: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_down: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_fore: {
        //                         imgurl: "images/server2.jpg",
        //                     },
        //                     skin_behind: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_left: {
        //                         imgurl: "images/rack_inside.png",
        //                     },
        //                     skin_right: {
        //                         imgurl: "images/rack_inside.png",
        //                     }
        //                 }
        //             }
        //         },
        //     ]
        // },
        // {
        //     show:true,
        //     name: 'cabinet-twodoor',
        //     uuid: '',
        //     objType: 'emptyCabinet',
        //     transparent:true,
        //     size:{width:140,depth:70,height:200, thick:2},
        //     x:-100, y: 100, z: -180 ,
        //     rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
        //     style:{
        //         skinColor: 0xff0000,
        //         skin:{
        //             skinColor: 0xff0000,
        //             skin_up: { imgurl: "/images/rack_top.jpg" },
        //             skin_down: { imgurl: "/images/rack_top.jpg" },
        //             skin_fore: {imgurl: "/images/rack_back.jpg"},
        //             skin_behind: {imgurl: "/images/rack_back.jpg"},
        //             skin_left: { imgurl: "/images/rack_back.jpg" },
        //             skin_right: { imgurl: "/images/rack_back.jpg" },
        //         }
        //     },
        //     doors: {
        //         doorType:'lr',
        //         doorname: ['cabinet_door_left','cabinet_door_right'],
        //         skins:[ {
        //             skinColor: 0x333333,
        //             skin_fore: {
        //                 imgurl: "images/rack_left_door.jpg",
        //             },
        //             skin_behind: {
        //                 imgurl: "images/rack_right_door.jpg",
        //             }
        //         },{
        //             skinColor: 0x333333,
        //             skin_fore: {
        //                 imgurl: "images/rack_right_door.jpg",
        //             },
        //             skin_behind: {
        //                 imgurl: "images/rack_left_door.jpg",
        //             }
        //         }]
        //     },
        //     childrens:[

        //     ]
        // },
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

let cabinet={
    show:true,
    name: 'cabinet',
    uuid: '',
    objType: 'emptyCabinet',
    transparent:true,
    size:{width:70,depth:70,height:200, thick:2},
    x:-350, y: 100, z: -220,
    rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
    style:{
        skinColor: 0xff0000,
        skin:{
            skinColor: 0xff0000,
            skin_up: { imgurl: "/images/rack_top.jpg" },
            skin_down: { imgurl: "/images/rack_top.jpg" },
            skin_fore: {imgurl: "/images/rack_back.jpg"},
            skin_behind: {imgurl: "/images/rack_back.jpg"},
            skin_left: { imgurl: "/images/rack_back.jpg" },
            skin_right: { imgurl: "/images/rack_back.jpg" },
        }
    },
    doors: {
        doorType:'lr',
        doorname: ['cabinet_door'],
        skins:[ {
            skinColor: 0x333333,
            skin_fore: {
                imgurl: "images/rack_right_door.jpg",
            },
            skin_behind: {
                imgurl: "images/rack_left_door.jpg",
            }
        }]
    },
    childrens:[
        {
            show: true,
            uuid: "",
            name: 'equipment_server1',
            objType: 'cube',
            depth: 65,
            width: 65,
            height: 10,
            y: 5,
            style: {
                skinColor: 0xff0000,
                skin: {
                    skin_up: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_down: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_fore: {
                        imgurl: "images/server1.jpg",
                    },
                    skin_behind: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_left: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_right: {
                        imgurl: "images/rack_inside.png",
                    }
                }
            }
        },
        {
            show: true,
            uuid: "",
            name: 'equipment_server2',
            objType: 'cube',
            depth: 65,
            width: 65,
            height: 20,
            y: 20,
            style: {
                skinColor: 0xff0000,
                skin: {
                    skin_up: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_down: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_fore: {
                        imgurl: "images/server2.jpg",
                    },
                    skin_behind: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_left: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_right: {
                        imgurl: "images/rack_inside.png",
                    }
                }
            }
        },
        {
            show: true,
            uuid: "",
            name: 'equipment_server1',
            objType: 'cube',
            depth: 65,
            width: 65,
            height: 10,
            y: 191,
            style: {
                skinColor: 0xff0000,
                skin: {
                    skin_up: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_down: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_fore: {
                        imgurl: "images/server1.jpg",
                    },
                    skin_behind: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_left: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_right: {
                        imgurl: "images/rack_inside.png",
                    }
                }
            }
        },
        {
            show: true,
            uuid: "",
            name: 'equipment_server2',
            objType: 'cube',
            depth: 65,
            width: 65,
            height: 20,
            y: 80,
            style: {
                skinColor: 0xff0000,
                skin: {
                    skin_up: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_down: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_fore: {
                        imgurl: "images/server2.jpg",
                    },
                    skin_behind: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_left: {
                        imgurl: "images/rack_inside.png",
                    },
                    skin_right: {
                        imgurl: "images/rack_inside.png",
                    }
                }
            }
        },
    ]
}
//复制机柜
for (var i = 0; i <3;i++){ 
    for (var j = 0; j <6; j++) {
        let obj=JSON.parse(JSON.stringify(cabinet));
        obj.name="cabinet"+i+"_"+j;
        obj.y=obj.y;
        obj.x=obj.x+220*i;
        obj.z=obj.z+100*j;
        if(i==2&&j==5){
            obj.doors.rotation=[{ direction: 'y', degree: 0.5*Math.PI}];
        }
        ThreeData.objects.push(obj);
        // console.log(ThreeData.objects)
    }
}
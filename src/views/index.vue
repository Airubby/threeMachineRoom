<template>
    <div class="three-content" id="three-dom"></div>
</template>

<script>
import ThreeMap from './ThreeMap.js';
export default {
    name: 'index',
    created () {
        
    },
    mounted() {
        let props={domID:"three-dom"}
        let datajson={
            objects: [
                //地板
                {
                    show: true,
                    uuid: "",
                    name: 'floor',
                    objType: 'floor',
                    length: 2000,
                    width: 1600,
                    height: 10,
                    rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle] 
                    x: 0,
                    y: 0,
                    z: 0,
                    style: {
                        skinColor: 0x8ac9e2,
                        skin: {
                            skin_up: {
                                skinColor: 0x98750f,
                                imgurl: "/images/floor.jpg",
                                repeatx: true,
                                repeaty: true,
                                width: 128,
                                height: 128
                            },
                            skin_down: {
                                skinColor: 0x8ac9e2,
                            },
                            skin_fore: {
                                skinColor: 0x8ac9e2,
                            }
                        }
                    }
                },
                //墙体
                {
                    show: true,
                    uuid: "",
                    name: 'wall',
                    objType: 'wall',
                    thick: 20,
                    length: 100,
                    height: 240,
                    wallData: [
                        {//wall1
                            uuid: "",
                            name: 'wall1',
                            thick: 20,
                            height: 240,
                            skin: {
                                skin_up: {
                                    skinColor: 0xdddddd,
                                },
                                skin_down: {
                                    skinColor: 0xdddddd,
                                },
                                skin_fore: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_behind: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_left: {
                                    skinColor: 0xdeeeee,
                                },
                                skin_right: {
                                    skinColor: 0xb0cee0,
                                }
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
                            rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle] 
                            childrens: [
                                {
                                    op: '-',
                                    show: true,
                                    uuid: "",
                                    name: 'doorhole',
                                    objType: 'doorhole',
                                    thick: 20,
                                    height: 220,
                                    startDot: {
                                        x: -410,
                                        y: 110,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -190,
                                        y: 110,
                                        z: -350
                                    },
                                    skin: {
                                        skin_up: {
                                            skinColor: 0xffdddd,
                                        },
                                        skin_down: {
                                            skinColor: 0xdddddd,
                                        },
                                        skin_fore: {
                                            skinColor: 0xffdddd,
                                        },
                                        skin_behind: {
                                            skinColor: 0xffdddd,
                                        },
                                        skin_left: {
                                            skinColor: 0xffdddd,
                                        },
                                        skin_right: {
                                            skinColor: 0xffdddd,
                                        }
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
                                            x: -50,
                                            y: 130,
                                            z: -350
                                        },
                                        endDot: {
                                            x: 450,
                                            y: 130,
                                            z: -350
                                        }
                                    },
                                    {
                                        show: true,
                                        name: 'windowCaseBottom',
                                        uuid: "",
                                        objType: 'cube',
                                        thick: 30,
                                        height: 10,
                                        startDot: {
                                            x: -50,
                                            y: 50,
                                            z: -350
                                        },
                                        endDot: {
                                            x: 450,
                                            y: 50,
                                            z: -350
                                        },
                                        skin: {
                                            skin_up: {
                                                skinColor: 0xc0dee0,
                                            },
                                            skin_down: {
                                                skinColor: 0xc0dee0,
                                            },
                                            skin_fore: {
                                                skinColor: 0xc0dee0,
                                            },
                                            skin_behind: {
                                                skinColor: 0xc0dee0,
                                            },
                                            skin_left: {
                                                skinColor: 0xd0eef0,
                                            },
                                            skin_right: {
                                                skinColor: 0xd0eef0,
                                            }
                                        },
                                    },
                            
                                {
                                    show: true,
                                    uuid: "",
                                    name: 'doorCaseRight',
                                    objType: 'cube',
                                    thick: 24,
                                    height: 220,
                                    startDot: {
                                        x: -410,
                                        y: 110,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -405,
                                        y: 110,
                                        z: -350
                                    },
                                    skin: {
                                        skin_up: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_down: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_fore: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_behind: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_left: {
                                            skinColor: 0xd0eef0,
                                        },
                                        skin_right: {
                                            skinColor: 0xd0eef0,
                                        }
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorCaseLeft',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 24,
                                    height: 220,
                                    startDot: {
                                        x: -190,
                                        y: 110,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -195,
                                        y: 110,
                                        z: -350
                                    },
                                    skin: {
                                        skin_up: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_down: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_fore: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_behind: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_left: {
                                            skinColor: 0xd0eef0,
                                        },
                                        skin_right: {
                                            skinColor: 0xd0eef0,
                                        }
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorCaseTop',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 24,
                                    height: 5,
                                    startDot: {
                                        x: -190,
                                        y: 220,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -410,
                                        y: 220,
                                        z: -350
                                    },
                                    skin: {
                                        skin_up: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_down: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_fore: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_behind: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_left: {
                                            skinColor: 0xd0eef0,
                                        },
                                        skin_right: {
                                            skinColor: 0xd0eef0,
                                        }
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorCaseBottom',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 24,
                                    height: 5,
                                    startDot: {
                                        x: -190,
                                        y: 5,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -410,
                                        y: 5,
                                        z: -350
                                    },
                                    skin: {
                                        skin_up: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_down: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_fore: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_behind: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_left: {
                                            skinColor: 0xd0eef0,
                                        },
                                        skin_right: {
                                            skinColor: 0xd0eef0,
                                        }
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorLeft',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 4,
                                    height: 210,
                                    startDot: {
                                        x: -196,
                                        y: 112,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -300,
                                        y: 112,
                                        z: -350
                                    },
                                    skin: {
                                        opacity: 0.1,
                                        skin_up: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_down: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_fore: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_behind: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_left: {
                                            skinColor: 0x51443e,
                                            imgurl: "/images/door_left.png",
                                        },
                                        skin_right: {
                                            skinColor: 0x51443e,
                                            imgurl: "/images/door_right.png",
                                        }
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorRight',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 4,
                                    height: 210,
                                    startDot: {
                                        x: -300,
                                        y: 112,
                                        z: -350
                                    },
                                    endDot: {
                                        x: -404,
                                        y: 112,
                                        z: -350
                                    },
                                    skin: {
                                        opacity: 0.1,
                                        skin_up: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_down: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_fore: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_behind: {
                                            skinColor: 0x51443e,
                                        },
                                        skin_left: {
                                            skinColor: 0x51443e,
                                            imgurl: "/images/door_right.png",
                                        },
                                        skin_right: {
                                            skinColor: 0x51443e,
                                            imgurl: "/images/door_left.png",
                                        }
                                    },
                                },
                                {
                                    show: true,
                                    name: 'doorControl',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 10,
                                    height: 40,
                                    startDot: {
                                        x: -120,
                                        y: 160,
                                        z: -365
                                    },
                                    endDot: {
                                        x: -160,
                                        y: 160,
                                        z: -365
                                    },
                                    skin: {
                                        opacity: 0.1,
                                        skin_up: {
                                            skinColor: 0x333333,
                                        },
                                        skin_down: {
                                            skinColor: 0x333333,
                                        },
                                        skin_fore: {
                                            skinColor: 0x333333,
                                        },
                                        skin_behind: {
                                            skinColor: 0x333333,
                                        },
                                        skin_left: {
                                            skinColor: 0x333333,
                                            imgurl: "/images/doorControl.jpg",
                                        },
                                        skin_right: {
                                            skinColor: 0x333333,
                                        }
                                    },
                                },
                            ]
                        },
                        {//wall2
                            uuid: "",
                            name: 'wall2',
                            thick: 20,
                            height: 240,
                            skin: {
                                skin_up: {
                                    skinColor: 0xdddddd,
                                },
                                skin_down: {
                                    skinColor: 0xdddddd,
                                },
                                skin_fore: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_behind: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_left: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_right: {
                                    skinColor: 0xdeeeee,
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
                        },
                        {//wall3
                            uuid: "",
                            name: 'wall3',
                            thick: 20,
                            height: 240,
                            skin: {
                                skin_up: {
                                    skinColor: 0xdddddd,
                                },
                                skin_down: {
                                    skinColor: 0xdddddd,
                                },
                                skin_fore: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_behind: {
                                    skinColor: 0xdeeeee,
                                },
                                skin_left: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_right: {
                                    skinColor: 0xb0cee0,
                                }
                            },
                            startDot: {
                                x: 490,
                                y: 120,
                                z: -355
                            },
                            endDot: {
                                x: 490,
                                y: 120,
                                z: 455
                            },
                        },
                        {//wall4
                            uuid: "",
                            name: 'wall4',
                            thick: 20,
                            height: 240,
                            skin: {
                                skin_up: {
                                    skinColor: 0xdddddd,
                                },
                                skin_down: {
                                    skinColor: 0xdddddd,
                                },
                                skin_fore: {
                                    skinColor: 0xdeeeee,
                                },
                                skin_behind: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_left: {
                                    skinColor: 0xb0cee0,
                                },
                                skin_right: {
                                    skinColor: 0xb0cee0,
                                }
                            },
                            startDot: {
                                x: -490,
                                y: 120,
                                z: -355
                            },
                            endDot: {
                                x: -490,
                                y: 120,
                                z: 455
                            },
                        }
                    ],
                    style: {
                        skinColor: 0x8ac9e2
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
        this.map = new ThreeMap(props,datajson);
        this.map.init();
    },
    
    data(){
        return{
            
        }
    },
    methods: {
        
    },
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    
</style>

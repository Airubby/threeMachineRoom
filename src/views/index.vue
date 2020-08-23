<template>
    <div class="three-content" id="three-dom">
        <el-button type="primary" @click="set" style="position:absolute;top:20px;right:20px;">模拟告警设置</el-button>
        <el-dialog
            top="0vh"
            :center="true"
            title="告警设置"
            :visible.sync="dialogVisible"
            width="1450px">
            <div>
                <h3>触发告警设置</h3>
                <div>
                    <el-checkbox-group v-model="equipmentList">
                        <template v-for="(e,i) in equipment" style="margin-bottom:10px;">
                            <el-checkbox :label="e.id" :key="e.id">{{e.name}}</el-checkbox>
                            <el-select v-model="alarm[i]" placeholder="请选择"
                                style="width:75px;margin-right:10px;margin-bottom:3px;"
                                 size="mini">
                                <el-option
                                v-for="item in alarmInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-checkbox-group>
                </div>
                <h3>解除告警设置</h3>
                <div>
                    <el-checkbox-group v-model="equipmentList1">
                        <template v-for="(e,i) in equipment">
                            <el-checkbox :label="e.id" :key="e.id" style="margin-bottom:5px;">{{e.name}}</el-checkbox>
                        </template>
                    </el-checkbox-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import ThreeMap from './ThreeMap.js';
import {ThreeData} from './ThreeData.js'
export default {
    name: 'index',
    created () {
        for (var i = 0; i <3;i++){ 
            for (var j = 0; j <6; j++) {
                for(let k=0;k<this.baseInfo.length;k++){
                    let obj=JSON.parse(JSON.stringify(this.baseInfo[k]));
                    obj.devid=this.baseInfo[k].devid+i+j;
                    obj.pointid=this.baseInfo[k].pointid+i+j;
                    obj.name="JG-"+(i+1)+"-"+(j+1)+"-设备"+(k+1);
                    obj.id=obj.devid+obj.pointid;
                    this.equipment.push(obj);
                    this.alarm.push("1");
                }
            }
        }
    },
    mounted() {
        let props={domID:"three-dom"}
        this.map = new ThreeMap(props,ThreeData);
        this.map.init();
    },
    data(){
        return{
            map:null,
            dialogVisible:false,
            baseInfo:[
                {devid:"01",pointid:"0101",name:"",level:"1",id:"",alarmInfo:"",isalarm:false},
                {devid:"01",pointid:"0102",name:"",level:"1",id:"",alarmInfo:"",isalarm:false},
                {devid:"01",pointid:"0103",name:"",level:"1",id:"",alarmInfo:"",isalarm:false},
                {devid:"01",pointid:"0104",name:"",level:"1",id:"",alarmInfo:"",isalarm:false}
            ],
            alarmInfo:[
                {id:"1",name:"提示"},{id:"2",name:"次要"},{id:"3",name:"重要"},{id:"4",name:"严重"},{id:"5",name:"紧急"},
            ],
            equipment:[], //所有设备
            alarm:[],  //所有告警初始化为提示
            equipmentList:[],  //告警的
            equipmentList1:[],  //解除告警的
        }
    },
    methods: {
        set:function(){
            this.equipmentList=[],  //告警的
            this.equipmentList1=[],  //解除告警的
            this.dialogVisible=true;
        },
        sure:function(){
            let back=[];
            for(let i=0;i<this.equipment.length;i++){
                for(let j=0;j<this.equipmentList.length;j++){
                    if(this.equipmentList[j]==this.equipment[i].id){
                        let obj=JSON.parse(JSON.stringify(this.equipment[i]));
                        obj.isalarm=true;
                        obj.level=this.alarm[i];
                        obj.alarmInfo="温度过高告警";
                        back.push(obj);
                    }
                }
                for(let m=0;m<this.equipmentList1.length;m++){
                    if(this.equipmentList1[m]==this.equipment[i].id){
                        back.push(this.equipment[i]);
                    }
                }
            }
            console.log(back)
            this.map.updateAlarmStatus(back);
            this.dialogVisible = false
        }
    },
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    
</style>

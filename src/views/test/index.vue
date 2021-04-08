<template>
    <div class="three-content" id="three-dom"></div>
</template>

<script>
import ThreeMap from './ThreeMap.js'
import {ThreeData} from './ThreeData.js'
export default {
    name: 'index',
    created () {
        
    },
    mounted() {
        let props={domID:"three-dom"}
        this.map = new ThreeMap(props,ThreeData);
        this.map.init();
    },
    data(){
        return{
            map:null,
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

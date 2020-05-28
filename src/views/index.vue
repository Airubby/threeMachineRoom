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
        let props={dom:"three-dom"}
        this.map = new ThreeMap(props);
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

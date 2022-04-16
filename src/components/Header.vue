<template>
<div class="nav">
    <div>
        <input type="color" name="color" class="neumorphic"
        v-model="colorBg" @input="changeColor">
    </div>
     <b>{{ appName }}</b>
     <div class="nav-button">
        <el-icon>
       <minus @click="hide"/>
      </el-icon>
     <el-icon  
     @mouseenter="setIgnoreMouseEvents(false)"
     @mouseleave="setIgnoreMouseEvents(lock)"
     >
        <unlock v-show="!lock" @click="lock =!lock"/>
        <lock v-show="lock" @click="lock =!lock"/>
      </el-icon>
     </div>
</div> 
</template>

<script>
import pkg from "../../package.json";
import { ref } from 'vue'
import { ipcRenderer } from 'electron'
export default {
    setup(){
    const lock = ref(false)
    const appName = ref(pkg.name)
    const colorBg = ref('#45494c')
    const hide = ()=>{
      ipcRenderer.invoke("hideWindow")
    }
    const setIgnoreMouseEvents = (ignore)=>{
      ipcRenderer.invoke("setIgnoreMouseEvents",ignore)
    }
    const changeColor = (e)=>{
      colorBg.value = e.target.value
      document.body.style.setProperty('--colorBg',colorBg.value)
    }
    return {
      colorBg,appName,lock,hide,setIgnoreMouseEvents,changeColor
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  -webkit-app-region: drag;
  height: 20px;
  padding: 4px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: .5px solid #ffffff60;
  b{
    color: #fff;
  }
  .nav-button{
     -webkit-app-region: no-drag;
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
    font-size: 18px;
    i{
      margin-left: 10px;
    }
  }
  input.neumorphic {
  -webkit-app-region: no-drag;
  width: 1rem;
  height: 1rem;
  border: 0;
  padding: 0;
  border-radius: 50%;
  display: block;
  opacity: 1;
  background-color: $colorBg;
  border: 1px solid rgba(#fff,1);
  cursor: pointer;
  overflow: hidden;
}
input:focus{
    outline: none;
}
input[type="color"]{
  &::-webkit-color-swatch{
     opacity: 0;
  }
  &::-webkit-color-swatch-wrapper{
    opacity: 0;
  }
}
}
</style>
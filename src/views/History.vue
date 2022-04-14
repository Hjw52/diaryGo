<template>
    <div class="root">
        <p v-if="Object.keys(doneList).length === 0" style="text-align: center;padding-top: 10px;">暂无已完成待办，快去完成吧~~</p>
        <div v-for="(value, key) in doneList" :key="key">
          <div class="group">{{ getDateStr(key) }}</div>
          <div
          style="display:flex;"
          v-for="(item,index) in value"
          :key="item.id"
          @click.stop="editId = item.id"
          >
          <p  :title="item.content">{{index + 1}} . {{item.content}}</p>
          <el-icon v-if="editId === item.id" :size="40">
            <d-arrow-left @click="restore(item)"/>
            <close @click="remove(item)"/>
          </el-icon>
          </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onBeforeMount,toRefs } from 'vue'
import {DB} from "@/utils/db";
import { ipcRenderer } from "electron";
import { getDateStr } from "@/utils/common";
import { ElNotification } from 'element-plus'
const data = reactive({
    doneList: []
})
const {doneList} = toRefs(data)
let editId = ref(-1)

onBeforeMount(()=>{
    initData()
})
// 初始化数据
const initData = () =>{
    ipcRenderer.invoke("getDataPath").then((storePath) =>{
        DB.initDB(storePath)
        const list = DB.groupby('doneList','done_date')
        data.doneList = list
        console.log(list)
    })
}
// 回滚已办
const restore = (item)=>{
   DB.insert('todoList',{
     id: item.id,
     date: item.date,
     content: item.content
   })
  DB.removeById('doneList', item.id)
  ElNotification({
    message: '回滚成功！',
    type: 'success',
    duration: 1500,
  })
  const list = DB.groupby('doneList','done_date')
  data.doneList = list
}
// 移除已办
const remove = (item)=>{
  DB.removeById('doneList', item.id)
   ElNotification({
    message: '移除成功！',
    type: 'success',
    duration: 1500,
    })
  const list = DB.groupby('doneList','done_date')
  data.doneList = list
}
</script>
<style lang="scss" scoped>
.root{
    width: 100%;
    height: 100%;
    background-color: $colorBg;
    overflow: auto;
    .group{
      position: sticky;
      top: 0;
      text-align: center;
      height: 200px;
      line-height: 200px;
      font-size: 30px;
      color: rgba($color: #ffffff, $alpha: 0.6);
    }
    .el-icon{
        color: #fff;
        cursor: pointer;
    }
     p{
        margin-top: 0px;
        padding-top: 8px;
        margin-left: 10px;
        color: #fff;
        width: 80%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
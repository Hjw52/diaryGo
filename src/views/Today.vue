<template>
    <div class="root" @click="addTodo">
    <p v-if="todoList.length === 0" style="text-align: center;padding-top: 10px;">暂无待办，快单击新建一条吧~~</p>
    <draggable
      v-model="todoList"
      :disabled="editInex !== -1"
      tag="transition-group"
      :component-data="{name: 'fade'}"
      item-key="id"
    >
    <template #item="{element,index}">
        <p 
        v-if="index !== editInex" 
        @click.stop="editing(index)"
        @dblclick.stop="toDone($event,index)"
        :title="element.content"
        >{{ index + 1 }} . {{ element.content }}</p>
        <div v-else class="edit">
           <el-input v-model="element.content" placeholder="请输入待办事项">
                <template #suffix>
                <el-icon style="cursor: pointer;" class="el-input__icon" :size="40">
                  <check @click.stop="saveEdit()"/>
                  <close @click.stop="remove(index)"/>
                </el-icon>
                </template>
            </el-input>
       </div>
    </template>
    </draggable>
   </div>
</template>
<script setup>
import { reactive,ref,toRefs, onBeforeMount,computed } from 'vue'
import {getNowDate,getNowDateTime } from "@/utils/common";
import CursorSpecialEffects from "@/utils/fireworks";
import {DB} from "@/utils/db";
import { ipcRenderer } from "electron";
import draggable from "vuedraggable"
import { ElMessage,ElNotification } from 'element-plus'

const data = reactive({
    todoList: []
})
const {todoList} = toRefs(data)
let editInex = ref(-1)
let dbclick = ref(false)

onBeforeMount(()=>{
    initData()
})
// 初始化
const initData = ()=>{
    ipcRenderer.invoke("getDataPath").then((storePath) =>{
        console.log('storePath: ',storePath)
        DB.initDB(storePath)
        const list = DB.get('todoList')
        data.todoList = list
        console.log(list)
    })
}
// 保存数据
const saveData = () =>{
    let list = data.todoList.filter((p)=>{
        return p.content
    })
    data.todoList = list
    DB.set("todoList",list)
}
// 新增待办
const addTodo = () =>{
    if(editInex.value === -1){
        data.todoList.push({
            id: new Date().getTime(),
            date: getNowDateTime(),
            content:'',
        })
        const index = data.todoList.length - 1
        editInex.value = index
    }
}
// 编辑中
const editing = (index) =>{
    // 避免双击影响
    setTimeout(()=>{
        if(dbclick.value){
            return ;
        }
       editInex.value = index
    },220)
}
// 保存编辑
const saveEdit = () =>{
    setTimeout(()=>{
         editInex.value = -1
         saveData()
    },100)
}
// 移除待办
const remove = (index) =>{
    data.todoList[index].content = ""
    saveEdit()
}
// 待办 -> 已办
const toDone = (event,index)=>{
    dbclick.value = true
    setTimeout(()=>{
         dbclick.value = false
    },300)
    CursorSpecialEffects.handleMouseDown(event);
    ElNotification({
        message: '完成待办！',
        type: 'success',
        duration: 1500,
    })
    DB.insert('doneList',
    Object.assign(data.todoList[index],{
        done_date: getNowDate()
    })
    )
    data.todoList.splice(index,1)
    DB.set('todoList',data.todoList)
}
</script>
<style lang="scss" scoped>
.root{
    width: 100%;
    height: 100%;
    background-color: $colorBg;
    p{
        margin-top: 0px;
        padding-top: 8px;
        margin-left: 10px;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .edit{
        margin: 0px 20px;
    }
}
</style>

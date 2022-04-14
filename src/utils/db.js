import fs from "fs-extra"
import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from "lowdb/adapters/FileSync";
import {getNowDateTime } from "@/utils/common";
const path = require("path")
const isDevelopment = process.env.NODE_ENV !== "production";
let db;
export const DB = {
    initDB(storePath){
        if(!fs.pathExistsSync(storePath)){
            fs.mkdirpSync(storePath)
        }
        const dbFile = isDevelopment ? "/data-dev.json" : "/data.json";
        const adapter = new FileSync(path.join(storePath,dbFile))
        db = Datastore(adapter)
        db._.mixin(LodashId);
        db.defaults({
            todoList:[
                {
                    id: "a1",
                    date: getNowDateTime(),
                    content: "“单击”下方空处，创建一个Todo",
                  },
                  {
                    id: "a2",
                    date: getNowDateTime(),
                    content: "“双击”Todo，表示已完成",
                  },
                  {
                    id: "a3",
                    date: getNowDateTime(),
                    content: "“单击”Todo，可进行更改或删除",
                  },
                  {
                    id: "a4",
                    date: getNowDateTime(),
                    content: "“长按”Todo，可进行拖动排序",
                  }
            ],
            doneList: [
              {
                "id": "c3",
                "date": "2022/04/09 15:16:08",
                "content": "“单击”Todo，可进行更改或删除",
                "done_date": "2022/04/09"
              },
              {
                "id": "c1",
                "date": "2022/04/09 15:16:08",
                "content": "“长按”Todo，可进行拖动排序",
                "done_date": "2022/04/09"
              },
              {
                "id": "c2",
                "date": "2022/04/09 15:16:08",
                "content": "“双击”Todo，表示已完成",
                "done_date": "2022/04/05"
              },
              {
                "id": "c4",
                "date": "2022/04/09 15:16:08",
                "content": "“单击”下方空处，创建一个Todo",
                "done_date": "2022/03/09"
              }
            ]
        }).write()
    },
    has(key){
        return db
                .read()
                .has(key)
                .value()
    },
    get(key){
        return db
                .read()
                .get(key)
                .value()
    },
    set(key,value){
        return db
                .read()
                .set(key,value)
                .write()
    },
    insert(key, value) {
        return db
          .read()
          .get(key)
          .insert(value)
          .write();
    },
    removeById(key, id) {
        return db
          .read()
          .get(key)
          .removeById(id)
          .write();
    },
    groupby(key, prop) {
        const d = db
          .read()
          .get(key)
          .sortBy(prop)
          .reverse()
          .groupBy(prop)
          .value();
        return d;
    },
}
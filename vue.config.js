const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // chainWebpack: (config)=>{
  //   config.node
  //     .set('fs','empty')
  // }
  css:{
    loaderOptions:{
      sass:{
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions:{
        appId: 'diaryGo-v1.0',
        productName: "diaryGo",
        copyright: "Copyright © 2022 diaryGo",
        directories: {
          buildResources: "./dist",
        },
        electronDownload: {
          mirror: "https://npm.taobao.org/mirrors/electron/",
        },
        win: {
          icon: "./public/favicon.ico",
          target: [
            {
              target: "nsis",
              arch: ["x64", "ia32"],
            },
          ],
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowToChangeInstallationDirectory: true,
          installerIcon: "./public/favicon.ico",// 安装图标
          uninstallerIcon: "./public/favicon.ico",//卸载图标
          installerHeaderIcon: "./public/favicon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true,// 创建开始菜单图标
          shortcutName: "diaryGo",
        },
<<<<<<< HEAD
        publish: ['github']
=======
>>>>>>> 86a55756aac07eeb088f566bc43e1e5953a8f1f6
      },
      nodeIntegration: true
    }
  }
})

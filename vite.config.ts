import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import { join } from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron({
            // 主进程入口文件
            entry: ["src-electron/main.ts", "src-electron/preload.ts"],
        })
    ],
    resolve: {
        alias: {
          '@': join(__dirname, "src"),
        }
      }
    /*开发服务器选项*/
    // server: {
    //     // 端口
    //     port: 3000,
    // }
})
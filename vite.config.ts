import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import postcsspxtoviewport from "postcss-px-to-viewport";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          exclude: [/node_modules/],
        }),
      ],
    },
  },
  server: {
    port: 3001
  }
})

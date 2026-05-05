import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { getCurrentTheme } from './utils/theme'

const app = createApp(App)
app.mount('#app')

// 在Vue挂载完成后延迟添加过渡类，避免入场动画与主题过渡叠加造成双重动画
// 等待入场动画全部完成（最长约0.6s）后再启用主题过渡
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.documentElement.classList.add('theme-transition')
    }, 700)
  })
})

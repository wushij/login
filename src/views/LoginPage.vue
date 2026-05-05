<template>
  <div class="min-h-screen grid lg:grid-cols-2">
    <!-- Left Content Section -->
    <div class="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground">
      <div class="relative z-20 flex items-end justify-center h-[500px]">
        <!-- Cartoon Characters -->
        <div class="relative" style="width: 550px; height: 400px">
          <!-- Purple tall rectangle character - Back layer -->
          <div
            ref="purpleRef"
            class="absolute bottom-0 transition-all duration-700 ease-in-out"
            :style="{
              left: '70px',
              width: '180px',
              height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
              backgroundColor: '#6C3FF5',
              borderRadius: '10px 10px 0 0',
              zIndex: 1,
              transform: (password.length > 0 && showPassword)
                ? `skewX(0deg)`
                : (isTyping || (password.length > 0 && !showPassword))
                  ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                  : `skewX(${purplePos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center'
            }"
          >
            <!-- Eyes -->
            <div
              class="absolute flex gap-8 transition-all duration-700 ease-in-out"
              :style="{
                left: (password.length > 0 && showPassword) ? '20px' : isLookingAtEachOther ? '55px' : `${45 + purplePos.faceX}px`,
                top: (password.length > 0 && showPassword) ? '35px' : isLookingAtEachOther ? '65px' : `${40 + purplePos.faceY}px`
              }"
            >
              <EyeBall
                :size="18"
                :pupil-size="7"
                :max-distance="5"
                eye-color="white"
                pupil-color="#2D2D2D"
                :is-blinking="isPurpleBlinking"
                :mouse-x="mouseX"
                :mouse-y="mouseY"
                :force-look-x="(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined"
                :force-look-y="(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined"
              />
              <EyeBall
                :size="18"
                :pupil-size="7"
                :max-distance="5"
                eye-color="white"
                pupil-color="#2D2D2D"
                :is-blinking="isPurpleBlinking"
                :mouse-x="mouseX"
                :mouse-y="mouseY"
                :force-look-x="(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined"
                :force-look-y="(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined"
              />
            </div>
          </div>

          <!-- Black tall rectangle character - Middle layer -->
          <div
            ref="blackRef"
            class="absolute bottom-0 transition-all duration-700 ease-in-out"
            :style="{
              left: '240px',
              width: '120px',
              height: '310px',
              backgroundColor: '#2D2D2D',
              borderRadius: '8px 8px 0 0',
              zIndex: 2,
              transform: (password.length > 0 && showPassword)
                ? `skewX(0deg)`
                : isLookingAtEachOther
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                  : (isTyping || (password.length > 0 && !showPassword))
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                    : `skewX(${blackPos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center'
            }"
          >
            <!-- Eyes -->
            <div
              class="absolute flex gap-6 transition-all duration-700 ease-in-out"
              :style="{
                left: (password.length > 0 && showPassword) ? '10px' : isLookingAtEachOther ? '32px' : `${26 + blackPos.faceX}px`,
                top: (password.length > 0 && showPassword) ? '28px' : isLookingAtEachOther ? '12px' : `${32 + blackPos.faceY}px`
              }"
            >
              <EyeBall
                :size="16"
                :pupil-size="6"
                :max-distance="4"
                eye-color="white"
                pupil-color="#2D2D2D"
                :is-blinking="isBlackBlinking"
                :mouse-x="mouseX"
                :mouse-y="mouseY"
                :force-look-x="(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined"
                :force-look-y="(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined"
              />
              <EyeBall
                :size="16"
                :pupil-size="6"
                :max-distance="4"
                eye-color="white"
                pupil-color="#2D2D2D"
                :is-blinking="isBlackBlinking"
                :mouse-x="mouseX"
                :mouse-y="mouseY"
                :force-look-x="(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined"
                :force-look-y="(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined"
              />
            </div>
          </div>

          <!-- Orange semi-circle character - Front left -->
          <div
            ref="orangeRef"
            class="absolute bottom-0 transition-all duration-700 ease-in-out"
            :style="{
              left: '0px',
              width: '240px',
              height: '200px',
              zIndex: 3,
              backgroundColor: '#FF9B6B',
              borderRadius: '120px 120px 0 0',
              transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center'
            }"
          >
            <!-- Eyes - just pupils, no white -->
            <div
              class="absolute flex gap-8 transition-all duration-200 ease-out"
              :style="{
                left: (password.length > 0 && showPassword) ? '50px' : `${82 + (orangePos.faceX || 0)}px`,
                top: (password.length > 0 && showPassword) ? '85px' : `${90 + (orangePos.faceY || 0)}px`
              }"
            >
              <Pupil :size="12" :max-distance="5" pupil-color="#2D2D2D" :mouse-x="mouseX" :mouse-y="mouseY" :force-look-x="(password.length > 0 && showPassword) ? -5 : undefined" :force-look-y="(password.length > 0 && showPassword) ? -4 : undefined" />
              <Pupil :size="12" :max-distance="5" pupil-color="#2D2D2D" :mouse-x="mouseX" :mouse-y="mouseY" :force-look-x="(password.length > 0 && showPassword) ? -5 : undefined" :force-look-y="(password.length > 0 && showPassword) ? -4 : undefined" />
            </div>
          </div>

          <!-- Yellow tall rectangle character - Front right -->
          <div
            ref="yellowRef"
            class="absolute bottom-0 transition-all duration-700 ease-in-out"
            :style="{
              left: '310px',
              width: '140px',
              height: '230px',
              backgroundColor: '#E8D754',
              borderRadius: '70px 70px 0 0',
              zIndex: 4,
              transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center'
            }"
          >
            <!-- Eyes - just pupils, no white -->
            <div
              class="absolute flex gap-6 transition-all duration-200 ease-out"
              :style="{
                left: (password.length > 0 && showPassword) ? '20px' : `${52 + (yellowPos.faceX || 0)}px`,
                top: (password.length > 0 && showPassword) ? '35px' : `${40 + (yellowPos.faceY || 0)}px`
              }"
            >
              <Pupil :size="12" :max-distance="5" pupil-color="#2D2D2D" :mouse-x="mouseX" :mouse-y="mouseY" :force-look-x="(password.length > 0 && showPassword) ? -5 : undefined" :force-look-y="(password.length > 0 && showPassword) ? -4 : undefined" />
              <Pupil :size="12" :max-distance="5" pupil-color="#2D2D2D" :mouse-x="mouseX" :mouse-y="mouseY" :force-look-x="(password.length > 0 && showPassword) ? -5 : undefined" :force-look-y="(password.length > 0 && showPassword) ? -4 : undefined" />
            </div>
            <!-- Horizontal line for mouth -->
            <div
              class="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
              :style="{
                left: (password.length > 0 && showPassword) ? '10px' : `${40 + (yellowPos.faceX || 0)}px`,
                top: (password.length > 0 && showPassword) ? '88px' : `${88 + (yellowPos.faceY || 0)}px`
              }"
            />
          </div>
        </div>
      </div>

      <div class="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
        <a href="#" class="hover:text-primary-foreground transition-colors">
          {{ t.privacyPolicy }}
        </a>
        <a href="#" class="hover:text-primary-foreground transition-colors">
          {{ t.termsOfService }}
        </a>
        <a href="#" class="hover:text-primary-foreground transition-colors">
          {{ t.contact }}
        </a>
      </div>

      <!-- Decorative elements -->
      <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div class="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <!-- 星尘粒子 -->
      <div class="stars-container">
        <div
          v-for="star in stars"
          :key="star.id"
          class="star"
          :class="star.type === 'twinkle' ? 'star--twinkle' : 'star--drift'"
          :style="{
            left: star.x + '%',
            top: star.y + '%',
            width: star.size + 'px',
            height: star.size + 'px',
            opacity: star.opacity,
            '--duration': star.duration + 's',
            '--delay': star.delay + 's'
          }"
        />
      </div>
    </div>

    <!-- Right Login Section -->
    <div class="relative flex items-center justify-center p-8" :class="currentTheme === 'dark' ? 'bg-gradient-to-br from-black via-gray-950 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-purple-50'">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div v-if="currentTheme === 'light'" class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
        <div v-if="currentTheme === 'light'" class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style="animation-delay: 1s" />
        <div v-if="currentTheme === 'light'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 2s" />
        <!-- 深色模式背景装饰 -->
        <div v-if="currentTheme === 'dark'" class="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div v-if="currentTheme === 'dark'" class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-float" style="animation-delay: 1s" />
        <div v-if="currentTheme === 'dark'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-float" style="animation-delay: 2s" />
      </div>

      <div class="relative w-full max-w-[440px] animate-fade-in">
        <!-- Language & Theme Switcher -->
        <div class="flex justify-end gap-3 mb-6 animate-slide-in">
          <!-- Theme Switcher -->
          <button
            @click="handleToggleTheme"
            class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10"
            :class="currentTheme === 'dark' ? 'glass-dark hover:bg-white/10' : 'glass hover:bg-white/50'"
            :title="currentTheme === 'light' ? '切换到深色模式' : '切换到浅色模式'"
          >
            <Moon v-if="currentTheme === 'light'" name="Moon" :size="18" class="animate-pulse-slow" />
            <Sun v-else name="Sun" :size="18" class="animate-pulse-slow" />
          </button>
          
          <!-- Language Switcher -->
          <button
            @click="toggleLanguage"
            class="flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10"
            :class="currentTheme === 'dark' ? 'glass-dark hover:bg-white/10' : 'glass hover:bg-white/50'"
          >
            <Globe name="Globe" :size="16" class="animate-pulse-slow" />
            {{ t.switchLanguage }}
          </button>
        </div>

        <!-- Mobile Logo -->
        <div class="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
          <div class="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Sparkles name="Sparkles" :size="16" class="text-white" />
          </div>
          <span class="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">YourBrand</span>
        </div>

        <!-- Header -->
        <div class="text-center mb-10 animate-fade-in" style="animation-delay: 0.1s">
          <h1 class="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{{ t.welcome }}</h1>
        </div>

        <!-- Login Form - Glass Card -->
        <div :class="currentTheme === 'dark' ? 'glass-dark' : 'glass'" class="login-card rounded-2xl p-8 shadow-2xl animate-fade-in" style="animation-delay: 0.2s">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2 animate-slide-in" style="animation-delay: 0.3s">
              <label for="username" class="text-sm font-medium ml-1">{{ t.username }}</label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User name="User" :size="20" />
                </div>
                <input
                  id="username"
                  type="text"
                  :placeholder="t.usernamePlaceholder"
                  v-model="username"
                  @focus="isTyping = true"
                  @blur="isTyping = false"
                  required
                  class="flex h-13 w-full rounded-lg border-2 border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 transition-all duration-300 input-glow"
                />
              </div>
            </div>

            <div class="space-y-2 animate-slide-in" style="animation-delay: 0.4s">
              <label for="password" class="text-sm font-medium ml-1">{{ t.password }}</label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock name="Lock" :size="20" />
                </div>
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="t.passwordPlaceholder"
                  v-model="password"
                  autocomplete="off"
                  data-form-type="other"
                  required
                  class="flex h-13 w-full rounded-lg border-2 border-input bg-background pl-10 pr-12 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 transition-all duration-300 input-glow"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all duration-300 p-2 hover:scale-110 active:scale-95"
                  :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                >
                  <component :is="showPassword ? Eye : EyeOff" :name="showPassword ? 'Eye' : 'EyeOff'" :size="20" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between animate-slide-in" style="animation-delay: 0.5s">
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  class="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  for="remember"
                  class="text-sm font-normal cursor-pointer"
                >
                  {{ t.rememberMe }}
                </label>
              </div>
              <a
                href="#"
                class="text-sm text-primary hover:text-purple-700 font-medium transition-colors hover:underline"
              >
                {{ t.forgotPassword }}
              </a>
            </div>

            <div v-if="error" class="p-4 text-sm text-red-600 bg-red-50 border-2 border-red-200 rounded-lg animate-slide-in">
              {{ error }}
            </div>

            <button
              type="submit"
              class="w-full h-13 text-base font-semibold ripple bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-md"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {{ t.signingIn }}
              </span>
              <span v-else>{{ t.login }}</span>
            </button>
          </form>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center text-sm text-muted-foreground mt-8 animate-slide-in" style="animation-delay: 0.6s">
          {{ t.noAccount }}
          <a href="#" class="text-primary font-semibold hover:text-purple-700 transition-colors hover:underline">
            {{ t.signUp }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import Pupil from '../components/Pupil.vue'
import EyeBall from '../components/EyeBall.vue'
import { Eye, EyeOff, User, Lock, Globe, Sparkles, Sun, Moon } from '../components/icons.js'
import { toggleTheme, getCurrentTheme } from '../utils/theme'

// 翻译配置
const translations = {
  zh: {
    welcome: "欢迎回来！",
    username: "账号",
    password: "密码",
    usernamePlaceholder: "请输入账号",
    passwordPlaceholder: "请输入密码",
    rememberMe: "记住我30天",
    forgotPassword: "忘记密码？",
    login: "登录",
    signingIn: "登录中...",
    noAccount: "还没有账号？",
    signUp: "注册",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    contact: "联系我们",
    invalidCredentials: "账号或密码无效，请重试。",
    loginSuccess: "登录成功！欢迎回来！",
    switchLanguage: "English"
  },
  en: {
    welcome: "Welcome back!",
    username: "Username",
    password: "Password",
    usernamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember for 30 days",
    forgotPassword: "Forgot password?",
    login: "Log in",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contact: "Contact",
    invalidCredentials: "Invalid username or password. Please try again.",
    loginSuccess: "Login successful! Welcome back!",
    switchLanguage: "中文"
  }
}

// 状态
const showPassword = ref(false)
const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const isPurpleBlinking = ref(false)
const isBlackBlinking = ref(false)
const isTyping = ref(false)
const isLookingAtEachOther = ref(false)
const isPurplePeeking = ref(false)
const language = ref('zh')
const currentTheme = ref(getCurrentTheme())

// Refs
const purpleRef = ref(null)
const blackRef = ref(null)
const yellowRef = ref(null)
const orangeRef = ref(null)

// 当前语言翻译
const t = computed(() => translations[language.value])

// 切换语言
const toggleLanguage = () => {
  language.value = language.value === 'zh' ? 'en' : 'zh'
}

// 切换主题
const handleToggleTheme = () => {
  currentTheme.value = toggleTheme()
}

// 鼠标移动
const handleMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

// 计算位置
const calculatePosition = (element) => {
  if (!element) return { faceX: 0, faceY: 0, bodySkew: 0 }

  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 3

  const deltaX = mouseX.value - centerX
  const deltaY = mouseY.value - centerY

  const faceX = Math.max(-15, Math.min(15, deltaX / 20))
  const faceY = Math.max(-10, Math.min(10, deltaY / 30))
  const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120))

  return { faceX, faceY, bodySkew }
}

const purplePos = computed(() => calculatePosition(purpleRef.value))
const blackPos = computed(() => calculatePosition(blackRef.value))
const yellowPos = computed(() => calculatePosition(yellowRef.value))
const orangePos = computed(() => calculatePosition(orangeRef.value))

// 提交表单
const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  // 验证账号密码
  if (username.value === 'admin' && password.value === 'admin123') {
    console.log('✅ Login successful!')
    alert(t.value.loginSuccess)
  } else {
    error.value = t.value.invalidCredentials
    console.log('❌ Login failed')
  }

  isLoading.value = false
}

// 紫色角色眨眼
let purpleBlinkTimeout = null
const schedulePurpleBlink = () => {
  const interval = Math.random() * 4000 + 3000
  purpleBlinkTimeout = setTimeout(() => {
    isPurpleBlinking.value = true
    setTimeout(() => {
      isPurpleBlinking.value = false
      schedulePurpleBlink()
    }, 150)
  }, interval)
}

// 黑色角色眨眼
let blackBlinkTimeout = null
const scheduleBlackBlink = () => {
  const interval = Math.random() * 4000 + 3000
  blackBlinkTimeout = setTimeout(() => {
    isBlackBlinking.value = true
    setTimeout(() => {
      isBlackBlinking.value = false
      scheduleBlackBlink()
    }, 150)
  }, interval)
}

// 互相看动画
const handleTyping = (value) => {
  isTyping.value = value
  if (value) {
    isLookingAtEachOther.value = true
    setTimeout(() => {
      isLookingAtEachOther.value = false
    }, 800)
  } else {
    isLookingAtEachOther.value = false
  }
}

// 紫色偷看动画
let peekTimeout = null
const schedulePeek = () => {
  if (password.value.length > 0 && showPassword.value) {
    peekTimeout = setTimeout(() => {
      isPurplePeeking.value = true
      setTimeout(() => {
        isPurplePeeking.value = false
        schedulePeek()
      }, 800)
    }, Math.random() * 3000 + 2000)
  }
}

// 生命周期
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  schedulePurpleBlink()
  scheduleBlackBlink()
  schedulePeek() // 启动偷看动画
  // 注意：主题已在index.html和main.js中初始化，此处不再重复调用applyTheme
})

// 生成星尘粒子数据
const stars = (() => {
  const result = []
  // 闪烁星星 - 25颗
  for (let i = 0; i < 25; i++) {
    result.push({
      id: `twinkle-${i}`,
      type: 'twinkle',
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    })
  }
  // 漂浮星星 - 8颗
  for (let i = 0; i < 8; i++) {
    result.push({
      id: `drift-${i}`,
      type: 'drift',
      x: Math.random() * 100,
      y: 0,
      size: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.4 + 0.2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10
    })
  }
  return result
})()

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (purpleBlinkTimeout) clearTimeout(purpleBlinkTimeout)
  if (blackBlinkTimeout) clearTimeout(blackBlinkTimeout)
  if (peekTimeout) clearTimeout(peekTimeout)
})
</script>

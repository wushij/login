// 主题配置
export const themes = {
  light: {
    name: 'light',
    label: '浅色',
    colors: {
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
      '--primary': '262.1 83.3% 57.8%',
      '--primary-foreground': '210 20% 98%',
      '--secondary': '210 40% 96.1%',
      '--secondary-foreground': '222.2 47.4% 11.2%',
      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',
      '--accent': '210 40% 96.1%',
      '--accent-foreground': '222.2 47.4% 11.2%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '210 40% 98%',
      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',
      '--ring': '262.1 83.3% 57.8%'
    },
    bgGradient: 'from-gray-50 via-white to-purple-50',
    cardBg: 'glass'
  },
  dark: {
    name: 'dark',
    label: '深色',
    colors: {
      '--background': '224 71% 4%',
      '--foreground': '213 31% 91%',
      '--primary': '262.1 83.3% 57.8%',
      '--primary-foreground': '210 20% 98%',
      '--secondary': '222.2 47.4% 11.2%',
      '--secondary-foreground': '210 40% 98%',
      '--muted': '223 47% 11%',
      '--muted-foreground': '215.4 16.3% 56.9%',
      '--accent': '216 34% 17%',
      '--accent-foreground': '210 40% 98%',
      '--destructive': '0 63% 31%',
      '--destructive-foreground': '210 40% 98%',
      '--border': '216 34% 17%',
      '--input': '216 34% 17%',
      '--ring': '262.1 83.3% 57.8%'
    },
    bgGradient: 'from-gray-900 via-gray-800 to-purple-900',
    cardBg: 'glass-dark'
  }
}

// 获取当前主题
export const getCurrentTheme = () => {
  const saved = localStorage.getItem('theme')
  return saved || 'light'
}

// 保存主题
export const saveTheme = (theme) => {
  localStorage.setItem('theme', theme)
}

// 应用主题
export const applyTheme = (themeName) => {
  const theme = themes[themeName]
  if (!theme) return

  // 应用 CSS 变量
  Object.entries(theme.colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })

  // 保存主题
  saveTheme(themeName)

  // 更新 data-theme 属性
  document.documentElement.setAttribute('data-theme', themeName)
}

// 切换主题
export const toggleTheme = () => {
  const current = getCurrentTheme()
  const next = current === 'light' ? 'dark' : 'light'
  applyTheme(next)
  return next
}

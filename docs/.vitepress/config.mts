import { defineConfig } from 'vitepress'
import { nav } from './navbar'
import sidebar from './sidebar'
import dayjs from 'dayjs'
import timeline from "vitepress-markdown-timeline"
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import { loadEnv } from 'vite'
const mode = process.env.NODE_ENV || 'development'
const { VITE_BASE_URL } = loadEnv(mode, process.cwd())

console.log('Mode:', process.env.NODE_ENV)
console.log('VITE_BASE_URL:', VITE_BASE_URL)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN', // 语言
  title: "许大仙", // 站点名称
  titleTemplate: "Hi，终于等到你", // 网页标题
  description: "许大仙前端、Java、大数据、云原生", // 站点描述
  head: [ // favicon.ico 图标等
    ['link', { rel: "shortcut icon", href: `${VITE_BASE_URL}logo.svg` }],
    // 网站 favicon.ico 图标
    ['link', { rel: "icon", href: `${VITE_BASE_URL}logo.svg`, type: "image/svg+xml" }],
    // 引入 Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }],
    // 网页视口
    ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no" }],
    // 关键词和描述
    ['meta', { name: "keywords", content: "许大仙,许大仙的博客" }],
  ],
  appearance: true, // 主题模式，默认浅色且开启切换
  base: VITE_BASE_URL,
  transformHtml: (code) => {
    // 匹配所有 href 链接，并检查其中是否有 target="_blank"
    return code.replace(/href="([^"]*)"(.*?)>/g, (match, href, rest) => {
      // 如果链接包含 target="_blank" 并且以 base 开头
      if (rest.includes('target="_blank"') && href.startsWith(VITE_BASE_URL)) {
        // 去掉 href 中的 base 前缀
        const newHref = href.replace(VITE_BASE_URL, '/') // 保留一个 '/'
        return `href="${newHref}"${rest}>`
      }
      // 否则返回原链接
      return match
    })
  },
  lastUpdated: true, // 上次更新
  vite: {
    build: {
      chunkSizeWarningLimit: 1600
    },
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
    server: {
      port: 18089
    }
  },
  markdown: { // markdown 配置
    math: true,
    lineNumbers: true, // 行号显示
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    // 组件插入h1标题下
    config: (md) => {
      // 创建 markdown-it 插件
      md.use((md) => {
        const defaultRender = md.render
        md.render = function (...args) {
          const [content, env] = args
          const isHomePage = env.path === '/' || env.relativePath === 'index.md'  // 判断是否是首页

          if (isHomePage) {
            return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
          }
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          defaultContent = defaultContent.replace(/NOTE/g, '提醒')
            .replace(/TIP/g, '建议')
            .replace(/IMPORTANT/g, '重要')
            .replace(/WARNING/g, '警告')
            .replace(/CAUTION/g, '注意')
          // 返回渲染的内容
          return defaultContent
        }
      })
      md.use(timeline)
      md.use(groupIconMdPlugin) //代码组图标
    }
  },
  themeConfig: { // 主题设置
    lastUpdatedText: '上次更新', // 上次更新显示文本
    returnToTopLabel: '返回顶部', // 更改手机端菜单文字显示
    search: { // 本地搜索
      provider: 'local'
    },
    logo: '/logo.svg',  // 左上角logo
    nav: nav, // 导航栏
    sidebar: sidebar, // 侧边栏
    socialLinks: [ // 社交链接
      { icon: 'github', link: 'https://github.com/Aurorxa' },
    ],
    docFooter: { // 自定义上下页名
      prev: '上一篇', next: '下一篇'
    },
    darkModeSwitchLabel: '深浅模式', // 手机端深浅模式文字修改
    footer: { // 页脚
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${dayjs().format("YYYY")} 许大仙`
    },
    outline: { // 大纲显示 1-6 级标题
      level: [1, 6],
      label: '目录'
    },
    //大纲顶部标题
    outlineTitle: '当前页大纲',
  }
})

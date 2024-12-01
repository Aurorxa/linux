---
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page
lang: zh-CN
title: 许大仙的博客
titleTemplate: Hi，终于等到你
editLink: true
lastUpdated: true

# 指定要为当前页面注入的额外头标签。将附加在站点级配置注入的头标签之后
head:
  - - meta
    - name: description
      content: 许大仙前端、Java、大数据、云原生
  - - meta
    - name: keywords
      content: 许大仙,许大仙的博客

hero:
  name: "许大仙同学"
  text: ""
  tagline: "『这个世纪疯狂，没人性，腐败；你却一直清醒，温柔，一尘不染。』"
  image:  # text 和 tagline 区域旁的图片
    src: /logo.svg
    alt: "许大仙"
  # 按钮相关
  actions:
    - theme: brand
      text: "🏠首页"
      link: "/"        
    - theme: alt
      text: "🎉快速开始"
      link: "/notes/"            

# 按钮下方的描述
features:
  - icon: 🧠
    title: "学习思路"
    details: "学习思路就这么几条：模仿、遍历、分治、动态规划、……"
  - icon: ✍️
    title: "学习手法"
    details: "学习手法就这么几种：缓存、索引、信号/事件、回调/消息循环/dispatcher、……"
  - icon: 🚨
    title: "注意事项"
    details: "注意事项就这么几点：边界值、等价类、数据完整性原子性、死锁、空转、……"
---


<confetti />



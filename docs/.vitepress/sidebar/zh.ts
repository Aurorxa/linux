import { DefaultTheme } from 'vitepress'
import { commonDirectoryName } from '../utils/constant'
// 中文侧边栏
export const zhSidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: 'Linux基础',
      collapsed: true,
      items: [
        { text: '计算机硬件与组成原理基础', link: `/01_linux-basic/00_${commonDirectoryName}/` },
        { text: 'Linux 初识和安装', link: `/01_linux-basic/01_${commonDirectoryName}/` },
        { text: 'Linux 基础和入门', link: `/01_linux-basic/02_${commonDirectoryName}/` },
        { text: 'Linux 核心目录和必会命令', link: `/01_linux-basic/03_${commonDirectoryName}/` },
        { text: 'Linux 目录进阶（一）', link: `/01_linux-basic/04_${commonDirectoryName}/` },
        { text: 'Linux 目录进阶（二）', link: `/01_linux-basic/05_${commonDirectoryName}/` },
        { text: 'Linux 文件管理体系', link: `/01_linux-basic/06_${commonDirectoryName}/` },
        { text: 'Linux 标准 IO、重定向和管道', link: `/01_linux-basic/07_${commonDirectoryName}/` },
        { text: '文本编辑器之神 VIM', link: `/01_linux-basic/08_${commonDirectoryName}/` },
        { text: 'Linux 四剑客（一）', link: `/01_linux-basic/09_${commonDirectoryName}/` },
        { text: '正则表达式', link: `/01_linux-basic/10_${commonDirectoryName}/` },
        { text: 'SHELL 脚本编程（一）', link: `/01_linux-basic/11_${commonDirectoryName}/` },
        { text: 'Linux 用户管理体系', link: `/01_linux-basic/12_${commonDirectoryName}/` },
        { text: 'Linux 权限管理体系', link: `/01_linux-basic/13_${commonDirectoryName}/` },
        { text: 'Linux 之快速安装 Ubuntu', link: `/01_linux-basic/14_${commonDirectoryName}/` },
        { text: 'Linux 软件包管理（一）', link: `/01_linux-basic/15_${commonDirectoryName}/` },
        { text: 'Linux 软件包管理（二）', link: `/01_linux-basic/16_${commonDirectoryName}/` },
        { text: 'Linux 四剑客（二）', link: `/01_linux-basic/17_${commonDirectoryName}/` },
        { text: 'Linux 磁盘存储和文件系统管理（一）', link: `/01_linux-basic/18_${commonDirectoryName}/` },
        { text: 'Linux 磁盘存储和文件系统管理（二）', link: `/01_linux-basic/19_${commonDirectoryName}/` },
        { text: '计算机网络基础', link: `/01_linux-basic/20_${commonDirectoryName}/` },
        { text: 'Linux 网络管理', link: `/01_linux-basic/21_${commonDirectoryName}/` },
        { text: 'SHELL 脚本编程（二）', link: `/01_linux-basic/22_${commonDirectoryName}/` },
        { text: 'Linux 进程管理', link: `/01_linux-basic/23_${commonDirectoryName}/` },
        { text: 'Linux 定时任务管理', link: `/01_linux-basic/24_${commonDirectoryName}/` },
        { text: 'Linux 启动和内核管理', link: `/01_linux-basic/25_${commonDirectoryName}/` },
        { text: '加密和安全', link: `/01_linux-basic/26_${commonDirectoryName}/` },
        { text: '运维自动化之系统部署', link: `/01_linux-basic/27_${commonDirectoryName}/` },
        { text: '域名系统 DNS 服务', link: `/01_linux-basic/28_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'Linux集群',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '云原生生态',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '虚拟化和云计算',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '容器管理工具Docker',
      collapsed: true,
      items: [
        { text: 'WSL2 的安装和配置', link: `/05_docker/00_${commonDirectoryName}/` },
        { text: 'Harbor 的安装和配置', link: `/05_docker/01_${commonDirectoryName}/` },
      ]
    },
    {
      text: '容器管理工具Containerd',
      collapsed: true,
      items: [

      ]
    },
    {
      text: 'Kubernetes',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '数据库',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '微服务治理和服务网格',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '下一代云计算技术Serverless',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '基于Kubernetes构建大数据库生态圈',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '其它',
      collapsed: true,
      items: [

      ]
    },
  ],
}

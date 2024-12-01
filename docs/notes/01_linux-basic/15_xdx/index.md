#  第一章：Linux 软件包概述

## 1.1 主流 Linux 发行版本分类

* 在实际工作中，主流的 Linux 发行版本分类如下：

![](./assets/1.png)

> [!IMPORTANT]
>
> * ① 对于 RedHat（红帽系）而言，`软件包`的格式是 `rpm` 格式。
> * ② 对于 Debian（Debian 系）而言，`软件包`的格式是 `deb` 格式。

## 1.2 Linux 中软件包常见的安装方式（⭐）

* 在 Linux 中软件包常见的安装方式有：
  * ① yum（apt）安装。
  * ② rpm（dpkg）安装。
  * ③ 二进制安装。
  * ④ 编译安装。

* 它们之间的区别如下：

| 软件安装方式     | 解释说明                                                     | 自动化程度 | 应用场景                                                     | 安装方式推荐（排序） |
| ---------------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------------ | -------------------- |
| yum（apt）安装   | 通过网络下载安装；如果有依赖，会自动安装依赖。               | 全自动     | 大部分场景都可以使用；如果是内网，可以自建 yum 仓库。        | :one:                |
| rpm（dpkg）安装  | 手动安装 rpm  包；如果缺少依赖，需要根据提示，自己手动解决。 | 半自动     | 没有网络的情况、依赖较少、误删除一些软件包的情况。           | :two:                |
| 二进制安装       | 类似于 win 中的绿色软件，解压就可以使用；但是，可能需要准备软件所需要的环境。 | 手动       | 如果软件没有提供 yum 或 rpm 安装方式，则选择二进制安装，如：maven 。 | :three:              |
| 编译（源码）安装 | 自定义安装，需要自己编译和安装，流程较长，比较繁琐。         | 完全手动   | 如果需要自定义安装或者上述安装方式都不存在，则选择编译安装。 | :four:               |

## 1.3 软件的编译和运行

### 1.3.1 软件的相关概念

* 之前，我们在`《计算机硬件与组成原理基础》`的最后就解释过 ABI、API 等相关的概念了，如下所示：

![](./assets/2.jpg)

* 所谓的 ABI（应用程序二进制接口）就是将`操作系统层`与由操作系统管理的`应用程序`和`库`分开。ABI 涵盖了低级数据类型、对齐方式和调用约定等详细信息，并定义了可执行程序的格式。系统调用在此级别定义。此接口允许应用程序和库在实现相同 ABI 的操作系统之间移植。ABI 确保了编译后的二进制文件能够在特定的操作系统和硬件平台上正确地运行。
* Windows 和 Linux 中的 ABI 格式是不兼容了，意味着 Windows 中的程序（包括病毒）在 Linux 上是不能直接运行的，反之亦成立！！！

> [!WARNING]
>
> * ① 通常而言，ABI 格式都是针对应用程序而言的，对于文本文件而言，操作系统默认都是可以打开的，如：`.txt` 文件，只要使用对应正确的应用程序就可以了。
> * ② Windows 中的 ABI 格式是 PE（Portable Executable）格式，而 Linux 中的 ABI 格式是 ELF（Executable and Linkable Format）格式。



* 示例：

```shell
file /usr/bin/ls # 查看 Linux 中应用程序的 ABI 格式
```

![](./assets/3.png)



* 示例：

```shell
file Gitify-Setup-5.2.0.exe # 查看 Windows 中应用程序的 ABI 格式
```

![](./assets/4.png)



*  所谓的 API（应用程序编程接口）可以在各种不同的操作系统上给上层的应用程序提供完全相同的接口，但是它们本身在这些操作系统上的实现却可能不同。目前，主流的操作系统是 Windows 和 Linux ；由于操作系统的不同，API 又分为了 Windows API 和 Linux API，导致了在 Windows 上开发的软件在 Linux 上无法运行，在 Linux 上开发的软件在 Windows 上也无法运行，进而导致了软件移植的困难，POSIX 标准的出现就是为了解决这个问题。

![](./assets/5.jpg)

* POSIX 标准的主要目的和解决的问题包括：
  * ① **提高可移植性**：通过定义一组统一的 API（应用程序编程接口），POSIX 允许软件和程序能够在遵守这些标准的不同操作系统间更容易地移植和运行。
  * ② **减少开发成本**：开发者可以针对一个常见的接口来编写程序，而不需要针对每种操作系统编写特定的版本，从而降低了开发和维护的成本。
  * ③ **标准化操作系统功能**：POSIX 标准覆盖了操作系统的多个方面，包括文件系统、进程控制、线程、内存管理等，通过标准化这些功能，不同的系统能够更加一致地工作。
  * ④ **增强互操作性**：标准化还有助于不同系统之间的数据和程序的互操作性，因为它们遵循相同的底层标准。
  * ⑤ **支持新的技术**：随着技术的发展，POSIX 标准也在不断更新和扩展，以支持新的硬件和软件技术，使得操作系统能够适应新的技术变革。

> [!NOTE]
>
> POSIX 标准通过提供一套广泛接受的标准接口，有效地解决了不同操作系统间的兼容性问题，促进了软件的可移植性和操作系统的标准化发展。

* 随着时间的推移，Linux 和 Windows 都实现了基本的 POSIX 标准，这就意味着我们在编写一套软件（C 语言）可以在不同的操作系统上都能成功的编译和运行（虽然软件底层的 ABI 不兼容，但是 API 是兼容的，也就意味着软件在源代码级别就是可移植的，我们只需要在不同的平台上分别编译和运行，就可以很轻松的实现软件的移植），即：

![](./assets/6.png)

> [!NOTE]
>
> 目前，C 或 C++ 语言编写的软件都是通过`一套代码，多平台编译`的方式来间接的实现软件的可移植性。



* 示例：

```c
// 下面的代码在 win 和 Linux 上都能编译通过，
// 是因为 win 和 Linux 上都有相同的头文件，
// 即都能找到 printf 和 sleep 函数，并且参数是一样的。

#include <stdio.h> 
#include <unistd.h> 

int main() {
    while (1) { // 无限循环
        printf("Hello, World!\n");
        sleep(1); // 程序暂停 1 秒
    }
    return 0;
}
```

### 1.3.2 编程语言

* 编程语言根据`其接近计算机硬件`的程度和易用性，可以大致分为`机器语言`、`汇编语言`和`高级语言`三类，它们之间的区别，如下所示：

| 类别         | 特征                               | 优点                                             | 缺点                                                         | 示例                |
| :----------- | :--------------------------------- | :----------------------------------------------- | :----------------------------------------------------------- | :------------------ |
| **机器语言** | 直接由计算机执行的二进制代码       | 执行速度快                                       | 编写困难，可读性差，与具体硬件强绑定                         | 二进制代码          |
| **汇编语言** | 用助记符代替二进制代码的低级语言   | 相对机器语言更易编写和理解，允许直接控制硬件资源 | 依然需要了解硬件，不够抽象，与具体硬件或平台相关             | MOV，ADD 等助记符   |
| **高级语言** | 接近人类语言，提供了更高层次的抽象 | 易于编写和维护，可移植性好，支持多种编程范式     | 需要通过编译器或解释器转换为机器语言，可能存在一定的性能损失 | C，Java， Python 等 |

> [!NOTE]
>
> 高级语言又分为`系统级别语言`和`应用级别语言`。
>
> * 系统级别语言：C、C++、Rust。
> * 应用级别语言：Java、Python、Go、PHP 等。

### 1.3.3 C 语言的编译过程

*  C 程序的编译过程是将 C 语言源代码转换成可执行文件的过程，涉及多个阶段，这些阶段通常包括`预处理`、`编译`、`汇编`和`链接`。

![](./assets/7.jpg)

> [!NOTE]
>
> * **预处理（Preprocessing）**:
>   - 在实际编译之前，预处理器处理 C 源代码。
>   - 预处理包括扩展所有的宏定义，处理所有的预处理指令（如`#include`，`#define`），移除注释等。
>   - 输出的结果是一个纯净的 C 代码，没有宏和预处理指令，这一步骤不生成任何机器代码。
> * **编译（Compilation）**:
>   - 编译器将预处理后的 C 代码转换成汇编代码。
>   - 这个阶段，编译器进行语法分析和语义分析，确保代码符合 C 语言的规范，同时进行一系列的优化处理。
>   - 输出是汇编语言代码，这些代码更接近于机器语言，但仍然是人类可读的形式。
> * **汇编（Assembly）**:
>   - 汇编器将汇编代码转换为机器代码，具体表现为机器语言指令。
>   - 输出的是二进制格式的目标代码文件，这些文件中包含了执行程序所需的机器指令。
> * **链接（Linking）**:
>   - 链接器将一个或多个目标代码文件与库文件一起合并，生成最终的可执行文件。
>   - 在这个阶段，链接器解决程序中对库函数和其他模块的外部引用，例如：如果程序使用了`printf`，链接器将确保包含这个函数的库被添加到最终程序中。
>   - 输出是可执行文件或库文件，这些文件可以在操作系统中直接运行。



* 示例：gcc 一步编译

```shell
gcc HelloWorld.c -o hello.out # 直接编译为可执行的目标文件
```

![](./assets/8.gif)



* 示例：gcc 分步编译

```shell
gcc -E HelloWorld.c -o hello.i # 对 C 程序进行预处理，生成 Hello.i 文件
```

```shell
gcc -S hello.i -o hello.s # 对预处理文件进行编译，生成汇编文件
```

```shell
gcc -c hello.s -o hello.o # 对汇编文件进行编译，生成目标文件
```

```shell
gcc hello.o -o hello.out # 对目标文件进行链接，生成可执行文件
```

![](./assets/9.gif)

### 1.3.4 静态链接和动态链接

* 静态链接和动态链接是两种将程序与其依赖库（如函数库或系统服务）连接起来的方法。这两种链接方式各有其特点和用途，对程序的性能、大小、以及部署方式都有影响。

| 类别 | 静态链接                                                     | 动态链接                                                     |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 定义 | 静态链接是在程序编译时将所有需要的库文件内容直接集成到最终的可执行文件中的过程。<br>这意味着一旦创建了可执行文件，它就包含了所有必需的代码和资源，无需依赖外部库文件。 | 动态链接是在程序运行时（而不是编译时）从外部加载库文件的过程。<br/>动态库（Windows 中的 dll 文件或 Unix/Linux 的 so 文件）在多个程序之间共享。 |
| 优点 | ① **独立性**：静态链接生成的程序在部署时不需要附带库文件，因为所有需要的代码都已经包含在内。<br/>② **启动速度**：程序启动时不需要加载外部库，可能会稍微快一些。<br>③ **兼容性**：减少了因库版本不匹配而导致的兼容性问题。 | ① **节省空间**：由于库在系统中被多个程序共享，所以总体上占用的磁盘空间更少。<br/>② **内存高效**：操作系统可以将同一个库的单个拷贝映射到多个程序的内存空间中，这样减少了内存消耗。<br/>③ **易于更新**：更新库文件后，所有依赖这个库的程序都会受益，无需重新编译每个程序。 |
| 缺点 | ① **文件大小**：静态链接的可执行文件通常比动态链接的文件大，因为它包含了所有必要的库代码。<br/>② **更新困难**：如果库需要更新（例如修复安全漏洞），每个静态链接的程序都需要重新编译和部署。 | ① **启动依赖**：启动程序时，必须确保所有依赖的库都可用和兼容，否则程序可能运行失败。<br/>② **性能开销**：加载库可能会稍微增加启动时间，并且对于库函数的调用可能稍慢，因为涉及到额外的间接寻址。<br/>③ **碎片化风险**：如果系统中存在多个版本的相同库，可能会导致版本冲突或“地狱依赖”。 |

* 其对应的图示，如下所示：

![](./assets/10.png)

> [!NOTE]
>
> * ① 可以简单将`静态链接`理解为，将软件所依赖的模块都`复制`一份到自己的目录保存起来，这样一旦软件过多，极大的浪费硬盘空间。
> * ② 可以简单将`动态链接`理解为，将软件所依赖的模块都`创建软链接`，这样即使软件过多，也不会过多的浪费硬盘空间。

## 1.4 软件包相关概念

### 1.4.1 软件包和命令的区别

* 在 Linux 系统中，软件包（Package）和命令（Command）是两个不同的概念，它们在系统管理和使用中扮演着不同的角色。
* **软件包（Package）**：
  * `软件包`是 Linux 系统中用于分发和安装软件的一种方式。它通常包含了`一个`或`多个程序`、`库文件`、`配置文件`以及`可能需要的其他资源`。
  * 软件包可以是源代码包（Source Package），也可以是编译后的二进制包（Binary Package）。
  * 在不同的 Linux 发行版中，软件包的格式可能有所不同，例如：Debian 和 Ubuntu 使用的是 `.deb` 格式，而 Red Hat、CentOS 和 Fedora 使用的是 `.rpm` 格式。
  * 安装软件包，通常意味着将软件的二进制文件和相关资源放置到系统的正确位置，以便系统可以识别和运行这些软件。
* **命令（Command）**：
  * 命令是用户在 Linux 命令行界面（CLI）中输入的一系列字符，用于执行特定的任务或操作。
  * 命令可以是系统内置的，也可以是由软件包提供的，例如：`ls` 是一个列出目录内容的命令，`apt-get` 是 Debian 和 Ubuntu 系统中用于管理软件包的命令。
  * 命令通常与特定的软件包相关联，因为它们是软件包的一部分，安装了相应的软件包后，我们就可以使用这些命令。

> [!NOTE]
>
> * ① 软件包是软件的集合，包含了运行软件所需的所有文件（可执行文件、库文件、配置文件、帮助文档、脚本、数据文件等），而命令（通常是可执行文件）是用户与系统交互的工具，用于执行软件包中的程序，是软件包的一部分。
> * ② 在Linux中，我们通常需要先安装软件包，然后才能使用其中的命令。
> * ③ `软件包 != 命令`，如：`ifconfig` 命令的软件包是 `net-tools` ，`rz` 和 `sz` 命令的软件包是 `lrzsz`。

### 1.4.2 软件包的命名

* RedHat（红帽系）的软件包格式如下：

![image-20240219141800345](./assets/11.png)

> [!NOTE]
>
> 常见的 CPU 架构，即 arch（architecture，建筑，建筑风格，在计算机中常用来表示架构） 
>
> * ① ~~x86: i386, i486, i586, i686~~
> * ② x86_64: x64, x86_64, amd64
> * ③ ~~powerpc: ppc~~
> * ④ noarch：和平台无关。

### 1.4.3 软件包的分类

* 有的时候，为了方便管理和使用软件包，会将一个大的软件包，拆分成多个不同的子软件包（模块化），例如：

```shell
# Apache HTTP 服务器的主要包，包含了运行一个基本的网站所需的所有核心文件和模块。
httpd-2.4.57-5.el9.x86_64.rpm  # 主包
```

```shell
# 包含 Apache HTTP 服务器的核心文件和模块。
# 它是 httpd 包的依赖项，不包括配置文件或其他可选模块。
httpd-core-2.4.57-5.el9.x86_64.rpm # 核心包
```

```shell
# 包含了 Apache HTTP 服务器的头文件和开发工具，
# 适用于需要编译 Apache 模块或进行服务器开发的开发者。
httpd-devel-2.4.57-5.el9.x86_64.rpm # 开发包
```

```shell
# 提供了 Apache HTTP 服务器的文件系统层次结构和目录，
# 确保在系统上正确安装和管理这些文件和目录。
httpd-filesystem-2.4.57-5.el9.noarch.rpm # 其它包
```

```shell
# 包含了 Apache HTTP 服务器的详细用户手册和文档，
# 适合需要详细了解服务器配置和功能的用户。
httpd-manual-2.4.57-5.el9.noarch.rpm # 其它包
```

```shell
# 包含了一些有用的工具和程序，用于管理 Apache HTTP 服务器，
# 例如：日志文件的创建和处理工具。
httpd-tools-2.4.57-5.el9.x86_64.rpm # 其它包
```

### 1.4.4 软件包之间的依赖

* 软件包之间可能存在依赖关系，甚至是循环依赖，如：软件包 `A` 依赖于软件包 `B` ，软件包 `B` 依赖于软件包 `C`，软件包 `C` 依赖于软件包 `A`。
* 在安装软件包的时候，可能会因为缺少依赖的包，而导致安装失败，为此出现了解决软件包依赖的管理工具，如下所示：
  * `yum`：rpm 包管理器的前端工具。
  * `dnf`：Fedora 中 rpm 包管理器的前端工具，从 RHEL 8+ 之后被引入。
  * `apt`：deb 包管理器的前端工具。



# 第二章：rpm 安装（⭐）

## 2.1 概述

* `rpm（Redhat Package Manager）` 命令是 `RPM` 软件包的管理工具。`rpm` 原本是 `Red Hat Linux` 发行版专门用来管理 `Linux` 各项套件的程序，由于它遵循 `GPL` 规则且功能强大方便，因而广受欢迎，逐渐受到其他发行版的采用。
* `RPM` 套件管理方式的出现，让 `Linux` 易于安装，升级，间接提升了 `Linux` 的适用度。

## 2.2 rpm 管理软件包

### 2.2.1 概述

* rpm 管理软件包，无非增（安装）删（卸载）改（升级）查（查询），即：

| 功能       | 命令                      | 选项含义                                                     |
| ---------- | ------------------------- | ------------------------------------------------------------ |
| 增（安装） | `rpm -ivh xxx.rpm`        | `-i`， `--install`：安装软件包。 <br>`-v`，`--verbose` ：安装的时候显示详细信息。 <br>`-h`，`--hash`：软件包安装的时候列出哈希标记，通常和 `-v` 配合使用。 |
| 删（卸载） | `rpm -e xxx.rpm --nodeps` | `-e`，`--erase`：清除（卸载）软件包，eraser 是 erase 的名词，即橡皮，所以 erase  是擦除的意思。 <br/>`--nodeps`：不验证软件包依赖，有的时候卸载不了，就需要此参数。 |
| 改（升级） | `rpm -Uvh xxx.rpm`        | `-U`，`--upgrade`：升级软件包。<br/>`-v`，`--verbose` ：安装的时候显示详细信息。 <br/>`-h`，`--hash`：软件包安装的时候列出哈希标记，通常和 `-v` 配合使用。 |
| 查（查询） | `rpm -qa \| grep xxx`     | `-q`，`--query` ：查询 。<br>`-a`，`--all`：全部 。          |
|            | `rpm -ql xxx`             | `-q`，`--query` ：查询。<br/>`-l`，`--list`：列出安装到系统中软件包中的内容（绝对路径），如：命令、配置文件等。 |
|            | `rpm -qf $(which xxx)`    | `-q`，`--query` ：查询。<br/>`-f`，`--file`：根据命令或文件的绝对路径，查询对应的软件包。 |

### 2.2.2 增（安装）

* 命令：

```shell
rpm -ivh xxx.rpm
```



* 示例：

```shell
# 下载软件包
wget --no-check-certificate -P /tmp https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/6.0/rhel/9/x86_64/zabbix-agent2-6.0.6-2.el9.x86_64.rpm
```

```shell
# 安装依赖（后面可以通过 yum 来解决软件包依赖和查找依赖）
yum -y install pcre2
```

```shell
# 切换到指定目录
cd /tmp 
```

```shell
# 安装
rpm -ivh zabbix-agent2-6.0.6-2.el9.x86_64.rpm
```

![](./assets/12.gif)

### 2.2.3 查（查询）

* 命令：

```shell
# 查询是否安装成功
rpm -qa | grep xxx
```

```shell
# 列出安装到系统中软件包中的内容（绝对路径），如：命令、配置文件等
rpm -ql xxx
```

```shell
# 根据命令或文件的绝对路径，查询对应的软件包（了解，后期通过 yum 来实现）
rpm -qf $(which xxx)
```



* 示例：查询是否安装成功

```shell
rpm -qa | grep zabbix
```

![](./assets/13.gif)



* 示例：列出安装到系统中软件包中的内容（绝对路径），如：命令、配置文件等

```shell
rpm -ql zabbix-agent2
```

![](./assets/14.gif)



* 示例：根据命令或文件的绝对路径，查询对应的软件包

```shell
rpm -qf $(which ifconfig)
```

![](./assets/15.gif)

### 2.2.4 改（升级）

* 命令：

```shell
# 适用于小版本的升级
rpm -Uvh xxx.rpm
```

> [!NOTE]
>
> * ① 通常，`rpm -Uvh xxx.rpm` 适用于小版本的升级。
> * ② 在实际工作的时候，升级需要经过严格的测试（找一台裸机模拟环境进行升级）。



* 示例：

```shell
# 下载软件包
wget --no-check-certificate -P /tmp https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/6.0/rhel/9/x86_64/zabbix-agent2-6.0.7-1.el9.x86_64.rpm
```

```shell
# 切换到指定目录
cd /tmp 
```

```shell
# 升级
rpm -Uvh zabbix-agent2-6.0.7-1.el9.x86_64.rpm
```

![](./assets/16.gif)

### 2.2.5 删（卸载）

* 命令：

```shell
# xxx 是软件包的名称
rpm -e xxx --nodeps
```



* 示例：

```shell
rpm -e zabbix-agent2
```

![](./assets/17.gif)



# 第三章：yum 安装（⭐）

## 3.1 概述

* `yum` 命令是在 `Fedora` 和 `RedHat` 以及 `SUSE` 中基于 `rpm` 的软件包管理器，它可以使系统管理人员交互和自动化地更新与管理 `RPM` 软件包，能够从指定的服务器自动下载 `RPM` 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。

> [!NOTE]
>
> * ① 在 AlmaLinux 8+ 之后的版本，其实更推荐使用 dnf 命令，因为其性能相对于 yum 来说更高。
> * ② 无需担心，dnf 命令的`选项`、`参数`和 yum 命令的`选项`、`参数`几乎一样，在使用的时候，只需要将 yum 替换为 dnf 即可。

## 3.2 yum 安装软件包的流程

### 3.2.1 概述

* 通常而言，我们都是使用 yum 命令来安装软件包的；但是，在安装软件包的过程中，yum 命令会和 yum 源（仓库）进行交互，并确保了软件包的安装、更新和依赖关系的自动解决，即：

![](./assets/18.png)

* 其实，YUM 仓库分为两个部分：
  * Packages：用来存放 rpm 包的目录。
  * repodata：用来记录当前 YUM 仓库中所有 rpm 包的元数据以及依赖关系，其实就是一个小型的 SQLite 数据库。

![](./assets/19.png)

* 当我们通过 `yum -y install nginx` 命令安装 nginx 的时候，其流程是这样的：
  * ① yum 首先会将 `repodata` 从远程 YUM 仓库下载到本地。
  * ② 然后去查看 `repodata` 中是否包含 nginx 的 rpm 包以及其依赖的 rpm 包。
  * ③ 如果有，就将 nginx 的 rpm 包以及依赖的 rpm 包下载到本地，然后调用 rpm 命令来进行安装。

![](./assets/20.png)

### 3.2.2 yum 源配置文件

* 查看：

```shell
cat /etc/yum.repos.d/xxx.repo
```

* 配置文件格式

```shell
[baseos] # 源的名称
name=AlmaLinux $releasever - BaseOS # 描述信息（必须）
mirrorlist=https://mirrors.almalinux.org/mirrorlist/$releasever/baseos # yum 仓库镜像列表，会自动进行切换（必须，和 baseurl 二选一）
# baseurl=https://repo.almalinux.org/almalinux/$releasever/BaseOS/$basearch/os/ # 指向一个固定的地址（必须，和 mirrorlist 二选一）
enabled=1 # 启动状态：1 开启；0 关闭，默认是 1（必须）
gpgcheck=1 # GPG 检查，1 表示在安装软件包时会进行 GPG 签名验证，确保软件包的完整性和来源的可靠性。（必须）
countme=1 # 允许匿名统计此仓库的使用情况：1 开启；0 关闭，默认是 1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9 # GPG 密钥，用于验证软件包的签名 （必须）
metadata_expire=86400 # 设置元数据过期时间，以秒为单位。
enabled_metadata=1 # 控制是否启用元数据缓存，1 开启；0 关闭，默认是 1
```

> [!NOTE]
>
> * ① 如果是虚拟机或私有云，可能需要配置 yum 源；不过，现在默认配置的 mirrorlist 会动态切换 yum 仓库源到指定国家，速度也还是可以的。
> * ② 如果是公有云，通常都是配置好的。
> * ③ 可以通过 `man 5 yum.conf` 命令查看相关帮助手册。

* yum 源配置文件的相关变量：

```shell
$arch # CPU 的架构，如：aarch64 、i586 、i686 、x86_64 等。
$basearch # 系统的基本架构，如：i686 和 i586 是 i386，而 AMD64 和 InTel64 是x86_64。
$releasever # 操作系统的发型版的主版本号，如：9、8、7、6 等。
```

* yum 源配置文件中 baseurl 必须指向含有 repodata 目录所在的路径，即：

```shell
[baseos] 
name=AlmaLinux $releasever - BaseOS 
baseurl=https://mirrors.aliyun.com/almalinux/$releasever/BaseOS/$basearch/os/ # 路径必须包含 repodata 目录
enabled=1 
gpgcheck=1 
gpgkey=https://mirrors.aliyun.com/almalinux/9/BaseOS/x86_64/os/RPM-GPG-KEY-AlmaLinux-9
```

![](./assets/21.png)

* yum 源配置 yum 仓库的形式有多种，如下所示：

```shell
[baseos] 
name=AlmaLinux $releasever - BaseOS 
baseurl=https://mirrors.aliyun.com/almalinux/$releasever/BaseOS/$basearch/os/ # https 的方式，推荐
enabled=1 
gpgcheck=1 
gpgkey=https://mirrors.aliyun.com/almalinux/9/BaseOS/x86_64/os/RPM-GPG-KEY-AlmaLinux-9
```

```shell
[baseos] 
name=AlmaLinux $releasever - BaseOS 
baseurl=http://mirrors.aliyun.com/almalinux/$releasever/BaseOS/$basearch/os/ # http 的方式，不推荐
enabled=1 
gpgcheck=1 
gpgkey=https://mirrors.aliyun.com/almalinux/9/BaseOS/x86_64/os/RPM-GPG-KEY-AlmaLinux-9
```

```shell
[baseos] 
name=AlmaLinux $releasever - BaseOS 
baseurl=file:///mnt/cd # 本地目录
enabled=1 
gpgcheck=1 
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9
```

```shell
[baseos] 
name=AlmaLinux $releasever - BaseOS 
baseurl=ftp://192.168.10.120/pub # ftp 服务的方式
enabled=1 
gpgcheck=1 
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9
```

* 修改为阿里云的 yum 镜像源：

```shell
# 备份并替换默认源
sed -e 's|^mirrorlist=|#mirrorlist=|g' \
     -e 's|^# baseurl=https://repo.almalinux.org|baseurl=https://mirrors.aliyun.com|g' \
     -i.bak \
     /etc/yum.repos.d/almalinux*.repo
```

```shell
# 生成缓存
dnf makecache  
```

### 3.2.3 yum 命令配置文件

* 查看：

```shell
cat /etc/yum.conf
```

* 配置文件格式：

```shell
[main]
cachedir=/var/cache/yum/$basearch/$releasever # 缓存目录
keepcache=1 # 是否保留缓存, 0 表示不保留缓存, 1 表示保留缓存，默认是 0 
logfile=/var/log/yum.log # yum 操作的日志
gpgcheck=1 # 设置是否启用 GPG 检查来验证包的签名。1 表示启用，0 表示禁用。
installonly_limit=3 # 同时可以安装 3 个包，最小值为 2 ；如果设置为 0 或 1 ，则不限制
clean_requirements_on_remove=True # 设置在删除软件包时是否自动清理不需要的依赖关系。
best=True # 设置是否总是尝试安装最新版本的软件包。
skip_if_unavailable=False # 设置是否跳过无法访问的 YUM 包仓库。
```

> [!NOTE]
>
> * ① 可以通过 `man yum.conf` 命令查看 yum.conf 中的所有可用的配置选项和详细描述。
> * ② 通常情况下，我们不会修改该文件，如果在内网环境中，我们通常会搭建 yum 私服（nexus3），并指定 yum 源为  yum 私服（nexus3）。

## 3.3 yum 管理软件包

### 3.3.1 概述

* yum 管理软件包，无非增（安装）删（卸载）改（升级）查（查询），即：

| 功能       | 命令                                    | 备注                                                         |
| ---------- | --------------------------------------- | ------------------------------------------------------------ |
| 增（安装） | `yum -y install xxx`                    |                                                              |
|            | `yum -y groupinstall xxx`               | 安装程序组                                                   |
| 删（卸载） | `yum -y remove xxx`                     | 卸载（删除）软件                                             |
|            | `yum -y groupremove xxx`                | 卸载程序组                                                   |
| 改（升级） | `yum -y update`<br>`yum -y upgrade`     | update 和 upgrade  都是升级的意思，任选其一即可。            |
| 查（查询） | `yum repolist [--all]`                  | 查看已启用的 yum 仓库，默认。<br>`--all` 选项表示查询所有仓库。 |
|            | `yum grouplist [--installed]`           | 查询所有程序组，默认。<br>`--installed` 选项表示查询已安装的程序组。 |
|            | `yum list [--installed]`                | 查询所有的软件包，包括仓库中的，默认。<br>`--installed` 选项表示查询已经安装到本地的软件包。 |
|            | `yum provides xxx`                      | 查找提供指定内容的软件包，是 `rpm -qf $(which xxx)`的升级版本。 |
| yum 仓库   | `yum config-manager --enable 仓库名称`  | 启用仓库                                                     |
|            | `yum config-manager --disable 仓库名称` | 禁用仓库                                                     |
| yum 缓存   | `yum clean all`                         | 释放磁盘空间并保持 YUM 的缓存数据最新，包括：清除缓存、清理头文件、清理过期的元数据、清理过期的软件包。 |
|            | `yum makecache`                         | 构建缓存                                                     |

### 3.3.2 增（安装）

#### 3.3.2.1 安装软件包

* 命令：

```shell
yum -y install xxx
```



* 示例：

```shell
yum -y install tree
```

![](./assets/22.gif)

#### 3.3.2.2 安装程序组

* 命令：

```shell
# 安装程序组，可以通过 yum grouplist 查询所有的程序组
yum -y groupinstall xxx
```

> [!NOTE]
>
> * ① 在 Linux系统中，程序组（Software Group）是一个方便用户管理和安装相关软件包的`集合`。
> * ② 程序组通常包含了一组协同工作以提供特定功能或服务的软件包。
> * ③ 这种分组方式使得用户可以更容易地安装、更新或卸载整个功能集合，而不需要单独处理每个软件包。



* 示例：

```shell
yum -y groupinstall 'Development Tools'
```

![](./assets/23.gif)

### 3.3.3 查（查询）

#### 3.3.3.1 查看 yum 仓库

* 命令：

```shell
yum repolist [--all]
```

> [!NOTE]
>
> * 功能：查询已启用的 yum 仓库。
> * 选项：
>   * `--all`：查询所有的 yum 仓库。



* 示例：查询已启用的 yum 仓库

```shell
yum repolist
```

![](./assets/24.gif)



* 示例：查询所有的 yum 仓库

```shell
yum repolist --all
```

![](./assets/25.gif)



* 示例：安装 epel 仓库

```shell
yum -y install epel-release 
```

![](./assets/26.gif)

#### 3.3.3.2 查询程序组

* 查询所有程序组命令：

```shell
yum grouplist
```

* 查询已安装程序组命令：

```shell
yum grouplist --installed
```

> [!IMPORTANT]
>
> * ① 需要英文环境，不然显示的程序组的名称是中文（如果默认的 locale 就是中文）。
> * ② 下面的示例，我将使用英文环境来测试！！！



* 示例：查询所有程序组

```shell
yum grouplist
```

![](./assets/27.gif)



* 示例：查询已安装程序组

```shell
yum grouplist --installed
```

![](./assets/28.gif)

#### 3.3.3.3 查询软件包

* 命令：

```shell
yum list [--installed]
```

> [!NOTE]
>
> * 功能：查询软件包，包括 yum 仓库中的。
> * 选项：
>   * `--installed`：查询安装到本地的软件包。



* 示例：查询 tree 

```shell
yum list | grep tree
```

![](./assets/29.gif)



* 示例：查询已安装到本地的软件包

```shell
yum list --installed | grep tree
```

![](./assets/30.gif)

#### 3.3.3.4 查询软件包

* 命令：

```shell
yum provides xxx
```

> [!NOTE]
>
> 功能：根据指定命令或文件查询对应的软件包。

> [!IMPORTANT]
>
> * ① 该命令是 `rpm -qf $(which xxx)`的升级版本，强烈使用！！！
> * ② 此命令不需要先安装指定的软件包，再根据指定命令或文件查询对应的软件包。。



* 示例：查询 `ifconfig`命令 对应的软件包

```shell
yum provides ifconfig
```

![](./assets/31.gif)



* 示例：查询 `tree`命令 对应的软件包

```shell
yum provides tree
```

![](./assets/32.gif)

### 3.3.4 仓库（启用和禁用）

* 启用仓库命令：

```shell
yum config-manager --enable 仓库名称
```

* 禁用仓库命令：

```shell
yum config-manager --disable 仓库名称
```

> [!IMPORTANT]
>
> * ① 需要在 `/etc/yum.repo.d/` 下配置有 `xxx.repo` 文件。
> * ② 如果不是系统内置，还需要通过 `yum -y  makecache` 更新本地缓存。
> * ③ 启用仓库后，最好使用 `yum -y makecache` 更新本地缓存，以便进行软件包的查询。



* 示例：启用仓库

```shell
yum config-manager --enable crb devel
```

![](./assets/33.gif)



* 示例：禁用仓库

```shell
yum config-manager --disable crb devel
```

![](./assets/34.gif)

### 3.3.5 改（更新）

* 命令：

```shell
yum -y update [软件包] [--exclude=软件包] [--disableexcludes=repo]
```

> [!NOTE]
>
> * 功能：如果不写软件包，会更新内核以及软件包。
> * 选项：
>   * `--exclude=软件包`：更新的时候排除某些软件包。
>   * `--disableexcludes=repo`：禁止排除某些仓库。

> [!IMPORTANT]
>
> 在生产环境中搭建 kubernetes 集群的时候，我们需要禁止内核以及 kubernetes 组件的更新，有如下的解决方案：
>
> * ① 临时解决方案，使用 `yum -y update --exclude=kernel* --exclude=kubelet --exclude=kubeadm --exclude=kubectl  --exclude=docker-ce*` 命令。
> * ② 永久方案，在 `/etc/yum.conf`  文件的最后一行添加 `exclude=kernel* kubelet kubeadm kubectl docker-ce* `。



* 示例：更新软件，排除内核

```shell
yum -y update --exclude=kernel*
```

![](./assets/35.gif)

### 3.3.6 删（卸载）

* 命令：

```shell
yum -y remove 软件包
```

> [!NOTE]
>
> * ① 删除需要谨慎，生产环境切勿随意删除软件包。
> * ② 如果一定要删除，可以使用 `rpm -e xxx` 命令。



* 示例：

```shell
yum -y remove tree
```

![](./assets/36.gif)



# 第四章：编译（源码）安装（⭐）

## 4.1 概述

* 很多 Linux 上的软件都是使用 C 语言写的，为了简化跨平台构建，很多 C 语言项目使用了 GNU Autotools 工具链来进行构建。
* GNU Autotools 工具链是一个自动化的构建系统，包括了：`autoconf`、`automake` 和 `libtool` 等工具，通过它可以很容易的将源代码在不同的操作系统和编译环境中进行编译和安装。

> [!NOTE]
>
> GNU Autotools 工具链配置、编译和安装过程如下：
>
> * ① **`配置`**：使用 `configure` 脚本来检查系统环境并生成 `Makefile`。这个脚本会根据你的系统配置（如：是否支持 SSL、是否安装了 PCRE 和 Zlib 、安装到那个目录，默认是 /usr/local 等）来定制 `Makefile`。
> * ② **`编译`**：使用 `make` 命令根据 `Makefile` 编译 C 语言源代码，生成的通常是可执行文件（executables）、静态库（static libraries）、动态库（shared libraries）或目标文件（object files），具体取决于项目的构建配置和 `Makefile` 中定义的规则。
> * ③ **`安装`**：使用 `make install` 命令将编译好的可执行文件、库文件、头文件等安装到系统的标准路径中。

> [!IMPORTANT]
>
> Nginx 是一个用 C 语言编写的项目，其就是使用 GNU Autotools 工具链进行项目构建的。

## 4.2 安装 NGINX

* 下载源码：

```shell
wget -P /tmp https://freenginx.org/download/nginx-1.24.0.tar.gz
```

![](./assets/37.gif)

* 安装依赖：

```shell
yum -y install gcc gcc-c++ \
    autoconf automake make \
    pcre pcre-devel \
    zlib zlib-devel \
    openssl openssl-devel
```

![](./assets/38.gif)

* 解压：

```shell
cd /tmp
```

```shell
tar -zxvf nginx-1.24.0.tar.gz
```

![](./assets/39.gif)

* 配置：

```shell
cd nginx-1.24.0
```

```shell
./configure
```

![](./assets/40.gif)

* 编译：

```shell
make 
```

![](./assets/41.gif)

* 安装：

```shell
make install
```

![](./assets/42.gif)

* 启动并测试：

```shell
cd /usr/local/nginx/sbin
```

```shell
./nginx
```

```shell
curl http://127.0.0.1:80
```

![](./assets/43.gif)



# 第五章：使用 nexus3 搭建 yum 私有仓库（⭐）

## 5.1 安装 nexus3

### 5.1.1 概述

* nexus3 是用 Java 语言构建的集中式组件仓库，它支持各种软件包，如：Maven、YUM、npm 等。

![image-20240309095943990](./assets/44.png)

> [!NOTE]
>
> nexus3 的下载地址是[这里](https://help.sonatype.com/en/download-archives---repository-manager-3.html)。

* 目前的架构如下：

![image-20240309133612792](./assets/45.png)

> [!NOTE]
>
> nexus3 的主要功能和应用场景如下：
>
> * ① **中央仓库缓存**：Nexus3 可以作为中央仓库，如：Maven Central 的缓存服务器，提高内部网络中构建和依赖下载的速度。通过设置代理仓库，可以减少对外部网络的依赖，同时节省带宽。
> * ② **私有仓库**：开发者可以在 Nexus3 中创建私有仓库，用于存储公司内部开发的库和依赖。这有助于保护知识产权，同时方便内部团队共享和重用代码。
> * ③ **依赖管理**：Nexus3 提供了对依赖的管理和分发功能，可以帮助团队管理项目依赖，确保依赖的一致性和安全性。
> * ④ **Docker 镜像仓库**：Nexus3 支持 Docker 镜像的存储和分发，这对于容器化应用的构建和部署非常有用。它可以作为 Docker Registry 的私有替代品。
> * ⑤ **权限管理**：Nexus3 提供了细粒度的权限控制，允许管理员根据用户和角色设置访问权限，确保资源的安全性。
> * ⑥ **仓库类型支持**：除了 Maven 和 Docker，Nexus3 还支持 npm、Bower、RubyGems 等多种仓库类型，使其成为一个多功能的仓库管理平台。
> * ⑦ ……

### 5.1.2 安装并启动

* 安装 JDK ：

```shell
yum -y install java-1.8.0*
```

![](./assets/46.gif)

* 查看 JDK 是否安装成功：

```shell
javac -version
```

```shell
java -version
```

![](./assets/47.gif)

* 下载 nexus3 ：

```shell
curl -L -o /opt/nexus-3.66.0-02-unix.tar.gz \
	--no-buffer https://download.sonatype.com/nexus/3/nexus-3.66.0-02-unix.tar.gz
```

![](./assets/48.gif)

* 解压并重命名：

```shell
cd /opt 
```

```shell
tar -zxvf nexus-3.66.0-02-unix.tar.gz -C /usr/local
```

```shell
mv nexus-3.66.0-02 nexus3
```

![](./assets/49.gif)

* 创建虚拟用户：

```shell
useradd -M -s /sbin/nologin nexus3
```

![](./assets/50.gif)

* 授权 nexus3 目录权限：

```shell
chown -R nexus3:nexus3 /usr/local/nexus3
chown -R nexus3:nexus3 /usr/local/sonatype-work
```

![](./assets/51.gif)

* 配置 systemd ：

```shell
vim /etc/systemd/system/nexus.service
```

```
[Unit]
Description=nexus3 service
After=network.target
  
[Service]
Type=forking
LimitNOFILE=65536
ExecStart=/usr/local/nexus3/bin/nexus start
ExecStop=/usr/local/nexus3/bin/nexus stop 
User=nexus3
Group=nexus3
Restart=on-abort
TimeoutSec=600
  
[Install]
WantedBy=multi-user.target
```

![](./assets/52.gif)

* 启动：

```shell
systemctl daemon-reload
```

```shell
systemctl enable --now nexus.service
```

![](./assets/53.gif)

* 查询服务是否启动：

```shell
# 如果失败，可以通过 journalctl -u nexus 调试错误
sytemctl status nexus
```

![](./assets/54.gif)

## 5.2 访问并配置

### 5.2.1 访问

* 通过浏览器输入 `http://192.168.10.100:8081` 来进行访问（请先关闭防火墙）：

![image-20240309114510501](./assets/55.png)

* 默认的用户名是 `admin` ，可以根据提示获取初始化密码：

![image-20240309114557125](./assets/56.png)

* 登录到系统中：

![image-20240309114638073](./assets/57.png)

* 根据提示，修改初始化密码：

![image-20240309114720441](./assets/58.png)

* 其余，下一步即可：

![image-20240309114837106](./assets/59.png)

![image-20240309114858532](./assets/60.png)

### 5.2.2 解释 nexus3 中仓库的类型

* 我们可以通过如下的步骤，查看 nexus3 中的仓库类型：

![image-20240309141551634](./assets/61.png)

![image-20240309141629121](./assets/62.png)

![image-20240309141725221](./assets/63.png)

> [!NOTE]
>
> nexus3 中的仓库类型有 3 种，区别如下：
>
> * ① hosted（宿主仓库，本地仓库）：
>   * 该仓库是 nexus3 服务器上的本地仓库。用于存储和分发用户自己创建和管理的软件包。
>   * hosted 仓库通常用于管理内部开发的软件项目，或者作为私有的依赖库（一般不对外开放）。
>
> * ② proxy（代理仓库）：
>   * proxy 仓库是 Nexus3 作为中间代理，代理外部仓库，如：Maven Central、npm 官方仓库等的仓库。
>   * proxy仓库通常用于加速外部仓库的访问速度，减少对外部网络的依赖，以及在网络不稳定或受限的情况下提供稳定的软件包以便获取服务。
> * ③ group（仓库组）：
>   * group 仓库是将多个仓库（可以是 hosted、proxy 或其他 group）组合在一起，形成一个逻辑上的仓库组。
>   * group 仓库通常用于实现复杂的仓库管理策略，例如：可以将一个 proxy 仓库和一个或多个 hosted仓库组合在一起，以便在满足特定条件时从不同的仓库中获取软件包。
>
> 这三种仓库类型提供了灵活的仓库管理策略，使得 nexus3 能够适应不同的软件开发和部署需求。通过合理配置这些仓库类型，可以优化构建流程，提高效率，同时确保依赖的一致性和安全性。



### 5.2.3 配置

#### 5.2.3.1 创建 blob 存储空间

* 因为 nexus3 可以作为多种软件包的集中式组件仓库，所以我们需要为其单独创建一个 blob 存储空间，即：

![image-20240309142652442](./assets/64.png)

![image-20240309142748388](./assets/65.png)

![image-20240309142818812](./assets/66.png)

#### 5.2.3.2 创建 hosted 类型的仓库

* 创建仓库：

![image-20240309142921618](./assets/67.png)

* 选择仓库的类型：

![image-20240309142957323](./assets/68.png)

* 填写关键信息，完成仓库的创建：

![](./assets/69.png)

![image-20240309144328206](./assets/70.png)

#### 5.2.3.3 创建 proxy 类型的仓库

* 和创建 hosted 类型的仓库的步骤类似，只不过需要填写远程 yum 仓库的地址，如：

![](./assets/71.png)

* 仓库创建完毕时的状态如下：

![image-20240309145709198](./assets/72.png)

#### 5.2.3.4 创建 group 类型的仓库

* 将刚才创建的 hosted 类型和 proxy 类型的仓库，组合为 group 类型，即：

![image-20240309145934873](./assets/73.png)

* 仓库创建完毕时的状态如下：

![image-20240309150013335](./assets/74.png)

## 5.3 配置 yum 源为 nexus3

* 在 nexus3 的界面中，复制 yum 源的地址：

![image-20240309150428604](./assets/75.png)

![image-20240309150516576](./assets/76.png)

* 配置 yum 源：

```shell
sed -e 's|^mirrorlist=|#mirrorlist=|g' \
      -e 's|^# baseurl=https://repo.almalinux.org|baseurl=http://192.168.10.100:8081/repository/proxy-aliyun-yum|g' \
      -i.bak \
      /etc/yum.repos.d/almalinux*.repo
```

> [!NOTE]
>
> * ① 目前，官方没有解决 group 元数据合并问题，所以使用 proxy 类型的仓库。
> * ② 在 AlmaLinux9 中，已经将软件包按功能划分为一个仓库，如：baseos、appstream、extras ，目的是方便管理。

![](./assets/77.gif)

## 5.4 测试

* 清除本地缓存，并重新构建缓存：

```shell
dnf clean all
```

```shell
dnf makecache
```

![](./assets/78.gif)

* 安装 Nginx 进行测试 ：

```shell
dnf -y install nginx
```

![](./assets/79.gif)



# 第六章：dnf 安装（⭐）

## 6.1 概述

*  在 AlmaLinux9 中，推荐使用 `dnf` 来管理软件包；不过，为了兼容之前的版本，我们还是可以使用 `yum` 命令的。

> [!IMPORTANT]
>
> * ① YUM 主要使用 Python 编写，有自己的依赖解析方法。
> * ② DNF 使用 libsolv 进行依赖解析，由 SUSE 开发和维护，旨在提高性能。

## 6.2 软件仓库

* 默认情况下，AlmaLinux9 启用了如下的仓库：

```shell
dnf repolist [--enabled]
```

![](./assets/80.png)

> [!NOTE]
>
> * ① `baseos` 软件仓库提供底层操作系统功能的核心组件，它包含了构成基础操作系统的基本软件包，如：系统库、工具和驱动程序，该仓库的内容采用 RPM 格式，支持条款与之前的 RHEL 版本相似。
> * ② `appstream` 软件仓库包含额外的用户空间应用程序、运行时语言和数据库，这些组件支持各种工作负载和使用案例，如：开发工具、Web 服务器、数据库等。并且该仓库的内容包括多个版本的用户空间组件，这些组件的更新频率可能高于核心操作系统软件包，它提供了更大的灵活性，允许用户自定义 RHEL 版本，同时不影响平台的基本稳定性。
> * ③ `epel` 软件仓库旨在为 RHEL 及其衍生版（如 CentOS、Scientific Linux 等）提供那些在官方仓库中不可用的额外软件包。epel 是由 Fedora 项目社区维护的，它提供了许多在 RHEL 官方仓库中找不到的软件，这些软件通常是由社区成员构建和测试的，它仍然遵循严格的质量控制流程，确保软件包的稳定性和安全性。
> * ④ `extra` 软件仓库通常是 CentOS 或 RHEL 官方支持的一部分，它提供了一些官方仓库中未包含的软件包，这些软件可能不是由 CentOS 或 RHEL 官方团队直接维护的，但被认为是对用户有用的。

* 也可以通过如下的命令，来查看的所有的软件仓库：

```shell
dnf repolist --all
```

![](./assets/81.png)

* 也可以通过如下的命令，来查看的所有的禁用的软件仓库：

```shell
dnf repolist --disabled
```

![](./assets/82.png)

## 6.3 软件包格式

###  6.3.1 概述

* AlmaLinux 9 提供的软件包格式包括：
  * RPM 格式。
  * 模块化，它们是 RPM 格式的扩展。
  * Software Collections。

> [!NOTE]
>
> * ① Software Collections 主要是为了解决 CentOS7 软件包版本固定的问题，毕竟这个操作系统存在的时间太长了，长达 10 年；但是，CentOS 7 已经退出了历史舞台了，即该技术也已经过时了，被模块化所取代。
> * ② dnf 其实一直运行在 fedora 项目中，而在 fedora 项目中其实一直没有很好的支持 Software Collections 。

### 6.3.2 RPM 格式

* 所谓的 RPM 格式，就是在每个主要的 Linux 版本中都安装有指定版本的 RPM 包。

![](./assets/83.png)

* RPM 格式的优点：
  * RPM 格式是一种标准的软件包管理格式，可以用于打包、安装和管理软件包。
  * 它提供了直接的软件包安装和卸载方式，适用于大多数常见的软件包管理任务。
* RPM 格式的缺点：
  * RPM 格式在处理软`件依赖关系`和`多版本软件管理`时相对较为基础，不够灵活。
  * 当需要管理`多个版本`的软件包或处理`复杂的依赖关系`时，RPM 格式可能显得不够方便。

> [!NOTE]
>
> 通常，我们在使用 `dnf -y install xxx` 的时候就是这种方式。

### 6.3.3 模块化

* 我们也知道，很多软件包，都有不同的版本，并且每个版本又可能分为开发版本、客户端版本、服务器端版本、最小安装版本或其他等。
* 以 `node.js` 为例：

![](./assets/84.png)

* 以 `postgresql` 为例：

![](./assets/85.png)

* 我们可以通过如下命令来查询系统内置的模块化：

```shell
dnf module list
```

![](./assets/86.png)

> [!NOTE]
>
> * ① 对于 stream 和 profile 而言，可能有多个，但是总是会有一个是默认的，使用 d 来表示。
> * ② 模块化软件包的格式有：
>   * `NAME`（模块化软件包的名称）。
>   * `NAME:STREAM`（模块化软件包的名称:模块化软件包的版本）
>   * `NAME/PROFILE`（模块化软件包的名称/软件包的应用场景）
>   * `NAME:STREAM/PROFILE`（模块化软件包的名称:模块化软件包的版本/软件包的应用场景）

* 所以，模块化软件包在 Linux 系统中的表现形式如下：

![](./assets/87.png)

## 6.4 dnf 搜索

### 6.4.1 搜索软件包

* 根据`软件包`的`名称`或`摘要`搜索软件包：

```shell
dnf search <term>
```



* 示例：

```shell
dnf search tree
```

![](./assets/88.gif)



* 根据`软件包`的`名称`、`概述`或`描述`中搜索：

```shell
dnf search --all <term>
```



* 示例：

```shell
dnf search --all ifconfig
```

![](./assets/89.gif)



* 根据`软件包`的`名称`，列出`软件包`的`名称`及其`版本`：

```shell
dnf repoquery <package_name>
```



* 示例：

```shell
dnf repoquery kernel
```

![](./assets/90.gif)



* 根据`文件名（命令）`或`文件名的路径`，查询`软件包`的`名称`：

```shell
dnf provides <file_name>
```



* 示例：

```shell
dnf provides ifconfig
```

![](./assets/91.gif)

### 6.4.2 显示软件包

* 显示`所有`可用的`软件包`的`最小版本`，包括`构架`、`版本号`以及从其中安装的`存储库`：

```shell
dnf list --all
```



* 示例：

```shell
dnf list --all
```

![](./assets/92.gif)



* 示例：

```shell
dnf list --all | grep kernel
```

![](./assets/93.gif)



* 显示`所有`可用的`软件包`，包括`版本号`和`架构`：

```shell
dnf repoquery
```



* 示例：

```shell
dnf repoquery
```

![](./assets/94.gif)



* 示例：

```shell
dnf repoquery | grep kernel
```

![](./assets/95.gif)



* 显示所有`已经安装`的`软件包`：

```shell
dnf list --installed 
```



* 示例：

```shell
dnf list --installed 
```

![](./assets/96.gif)



* 显示所有`可用`的`软件包`：

```shell
dnf list --available 
```



* 示例：

```shell
dnf list --available 
```

![](./assets/97.gif)



* 显示`新版本`提供的`软件包`：

```shell
dnf list --upgrades
```



* 示例：

```shell
dnf list --upgrades
```

![](./assets/98.gif)

### 6.4.3 显示软件仓库

* 显示系统上`所有启用`的`软件仓库`：

```shell
dnf repolist [--enabled]
```



* 示例：

```shell
dnf repolist
```

![](./assets/99.gif)



* 列出系统上`所有`的`软件仓库`，包括`启用`和`禁用`：

```shell
dnf repolist --all
```

![](./assets/100.gif)



* 显示系统上`所有禁用`的`软件仓库`：

```shell
dnf repolist --disabled
```

![](./assets/101.gif)



* 显示`软件仓库`的`额外信息`：

```shell
dnf repoinfo <repository_name>
```



* 示例：

```shell
dnf repoinfo baseos
```

![](./assets/102.gif)

### 6.4.4 显示软件包信息

* 显示`软件包`（安装到当前系统以及软件仓库中的最新版本）的`详细信息`，包括版本、发布、架构、软件包大小和描述等：

```shell
dnf info <package_name>
```



* 示例：

```shell
dnf info kernel
```

![](./assets/103.gif)



* 显示`软件包`的`所有版本`的`详细信息`：

```shell
dnf repoquery --info <package_name>
```



* 示例：

```shell
dnf repoquery --info kernel
```

![](./assets/104.gif)

### 6.4.5 显示软件包组及其提供的软件包

* 显示`已经安装`和`可用`的`软件包组`：

```shell
dnf group list
```



* 示例：

```shell
dnf group list
```

![](./assets/105.gif)



* 显示`软件包组`中的`强制`、`可选`和`默认`的`软件包`：

```shell
dnf group info "<group_name>"
```



* 示例：

```shell
dnf group info "System Tools"
```

![](./assets/106.gif)

### 6.4.6 显示可用模块化内容

* 显示所有`可用`的`模块化`：

```shell
dnf module list
```



* 示例：

```shell
dnf module list
```

![](./assets/107.gif)



* 根据`软件包`查询属于哪个`模块`：

```shell
dnf module provides <package_name>
```



* 示例：

```shell
dnf module provides npm
```

![](./assets/108.gif)



* 显示`模块`的`详细信息`：

```shell
dnf module info <module_name>
```



* 示例：

```shell
dnf module info nodejs
```

![](./assets/109.gif)

## 6.5 dnf 安装

### 6.5.1 安装软件包

* 从`软件仓库`中安装`指定的软件包`：

```shell
dnf -y install <package_name_1> <package_name_2> ...
```



* 示例：

```shell
dnf -y install nodejs
```

![](./assets/110.gif)



* 安装`本地 RPM 包`，并自动`从`软件仓库中`解决依赖`：

```shell
dnf -y install xxx.rmp
```

> [!NOTE]
>
> * ① 之前，在使用 yum 的时候，我们会使用 `yum -y localinstall xxx.rpm` 来安装本地的 RPM 包。
> * ② 但是，这个 `localinstall` 在 `dnf` 已经被标记为过时。



* 示例：

```shell
# 下载安装包
wget -O mysql-8.0.36-1.el9.x86_64.rpm-bundle.tar \
https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.36-1.el9.x86_64.rpm-bundle.tar
```

```shell
# 解压到指定目录
tar -xvf mysql-8.0.36-1.el9.x86_64.rpm-bundle.tar --one-top-level=mysql-8.0.36 && \
	cd mysql-8.0.36
```

```shell
# 安装依赖
yum -y install https://dev.mysql.com/get/mysql80-community-release-el9-5.noarch.rpm
```

```shell
# 安装 MySQL
dnf -y install mysql-community-server-8.0.36-1.el9.x86_64.rpm
```

![](./assets/111.gif)

### 6.5.2 安装软件包组

* 从`软件仓库`中安装`软件包组`：

```shell
dnf -y group install <group_name_or_ID>
```



* 示例：

```shell
dnf -y group install "System Tools"
```

![](./assets/112.gif)

### 6.5.3 安装模块化内容

* 显示所有`可用`的软件包的`模块化`：

```
dnf module list
```



* 示例：

```shell
dnf module list
```

![](./assets/113.gif)



* 显示`想要`安装的软件包的`模块化`：

```shell
dnf module list <module_name>
```



* 示例：

```shell
dnf module list nodejs
```

![](./assets/114.gif)



* `启用`软件包的`模块化`，并`安装`模块化中的`软件包`：

```shell
dnf module -y enable <module_name:stream_name> && \
	dnf -y install module_name
```

> [!NOTE]
>
> * ① 这种方式和传统的 `dnf -y install xxx` 的方式没有什么区别，都只是安装了软件包，并没有在系统中`安装`软件的`模块化`。
> * ② 换言之，使用 `dnf module list --installed` 命令并不能查询到。



* 示例：

```shell
dnf module enable nodejs:18 -y && \
	dnf -y install nodejs
```

![](./assets/115.gif)



* `安装`软件包的`模块`：

```shell
dnf module install NAME -y
```

```shell
dnf module install NAME:STREAM -y
```

```shell
dnf module install NAME/PROFILE -y
```

```shell
dnf module install NAME:STREAM/PROFILE  -y
```



* 示例：

```shell
dnf module install nodejs:18
```

![](./assets/116.gif)



* `切换`软件包的`模块化`：

```shell
dnf module switch-to NAME:STREAM -y
```

> [!WARNING]
>
> 切换流是一项有风险的操作，并不是所有的软件包都支持这种操作，尤其是降级。



* 示例：

```shell
dnf module switch-to nodejs:20 -y
```

![](./assets/117.gif)

## 6.6 dnf 更新

### 6.6.1 检查更新

* 查看系统中`安装`的软件包`是否`有`可用更新`：

```shell
dnf check-update
```

> [!NOTE]
>
> 也可以使用 `dnf check-upgrade` ，因为 `check-upgrade` 是 `check-update` 的别名。



* 示例：

```shell
dnf check-update
```

![](./assets/118.gif)

### 6.6.2 更新软件包

* 更新`单个`软件包：

```shell
dnf upgrade package-name -y
```

> [!NOTE]
>
> * ① 在 `yum` 中，我们会使用 `dnf update package-name -y`  来更新软件包。
> * ② 但是，在 `dnf` 中 `update` 被标记为 `upgrade` 过时的别名。



* 示例：

```shell
dnf upgrade python3 -y
```

![](./assets/119.gif)



* 更新`所有`的软件包：

```shell
dnf upgrade -y
```

> [!NOTE]
>
> *  ① 在 `yum` 中，我们会使用 `dnf update -y`  来更新软件包；但是，在 dnf 中 update 被标记为 upgrade 过时的别名。
> * ② 当有内核应用更新的时候，`dnf -y update` 或 `dnf -y upgrade` 总是会安装一个新的内核，除非你手动排除内核的更新，看下文 `dnf 插件`部分。



* 示例：

```shell
dnf upgrade -y
```

![](./assets/120.gif)



* 更新软件包组：

```shell
dnf group upgrade group-name -y
```



* 示例：

```shell
dnf group upgrade "System Tools" -y
```

![](./assets/121.gif)

### 6.6.3 更新和安全相关的软件包

* 更新有`安全勘误`的`最新`可用软件包：

```shell
dnf upgrade --security -y
```



* 示例：

```shell
dnf upgrade --security -y
```

![](./assets/122.gif)



* 升级到`最后`一个`安全勘误`软件包：

```shell
dnf upgrade-minimal --security -y
```



* 示例：

```shell
dnf upgrade-minimal --security -y
```

![](./assets/123.gif)

## 6.7 dnf 软件自动化更新

### 6.7.1 安装 dnf automatic 工具

* 安装 `dnf-automatic` 软件包：

```shell
dnf install dnf-automatic -y
```

> [!NOTE]
>
> * ① dnf-automatic 软件包，在默认情况下，使用 `/etc/dnf/automatic.conf` 作为其配置文件来定义其行为。
> * ② 在实际工作中，生产环境慎用该功能，防止自动升级挂掉环境！！！



* 示例：

```shell
dnf install dnf-automatic -y
```

![](./assets/124.gif)

### 6.7.2 启动 dnf automatic 工具

* 选择、启用并启动一个 systemd 计时器单元，该单元`下载`并`安装`、`更新`软件包：

```shell
systemctl enable --now dnf-automatic-install.timer
```

> [!NOTE]
>
> * ① `dnf-automatic-download.timer` 会`下载软件包以便进行更新`，除非手动执行 dnf -y upgrade 命令才会更新软件包。
> * ② `dnf-automatic-install.timer`会`下载并安装、更新软件包`。
> * ③ `dnf-automatic-notifyonly.timer`只会`下载存储库数据，以保持存储库缓存最新状态，并通知是否有可用的更新`。
> * ④ `dnf-automatic.timer`，此计时器在下载和应用更新时的行为是由 `/etc/dnf/automatic.conf` 配置文件中的设置指定；默认行为与 `dnf-automatic-download.timer` 单元相同：它会下载软件包，但不安装它们。、
> * ⑤ 可以通过 `systemctl show dnf-automatic-install.timer` 来查看详细的配置和预订的运行时间；默认情况下，会在每天的凌晨执行软件包的下载、安装和更新操作。



* 示例：

```shell
systemctl enable --now dnf-automatic-install.timer
```

![](./assets/125.gif)

## 6.8 dnf 删除

### 6.8.1 删除安装的软件包

* 要删除`某个`软件包以及所有`未使用`的依赖软件包：

```shell
yum remove package-name -y
```



* 示例：

```shell
yum remove nodejs -y
```

![](./assets/126.gif)



* `同时`删除`多个`软件包及其`未使用`的依赖项：

```shell
dnf remove package-name-1 package-name-2 ... -y
```



* 示例：

```shell
dnf remove nodejs nginx -y
```

![](./assets/127.gif)

### 6.8.2 删除软件包组

* 根据`软件包组的名称`删除`软件包组`：

```shell
dnf group remove group-name -y
```



* 示例：

```shell
dnf group remove "System Tools" -y
```

![](./assets/128.gif)

### 6.8.3 删除安装的模块化内容

* 删除安装的`模块化`内容：

```shell
dnf module remove NAME -y 
```

```shell
dnf module remove NAME:STREAM -y
```

```shell
dnf module remove NAME/PROFILE -y
```

```shell
dnf module remove NAME:STREAM/PROFILE -y
```

> [!NOTE]
>
> 可以通过 `dnf module reset module-name -y` 来重置模块化内容的状态，变为初始化状态。



* 示例：

```shell
dnf module remove nodejs:18 -y
```

![](./assets/129.gif)

## 6.9 软件包的历史记录

### 6.9.1 概述

* Redo（重做） 和 Undo（撤销） 是在计算机程序和应用程序中经常使用的两个功能，用于处理用户操作的不同方式。它们通常用于编辑文档、图像或其他数据的过程中。
* Undo（撤销）：
  * 意义：Undo 是指撤销先前的操作，将系统恢复到之前的状态。当用户进行了一个操作后发现这个操作不正确或者不想要时，可以通过执行撤销操作将系统还原到执行该操作之前的状态。
  * 功能：Undo 功能允许用户回退到之前的操作，通常是通过快捷键（如：`Ctrl+Z`）或菜单选项来触发。这个功能对于纠正错误操作或者试验性质的操作非常有用。
* Redo（重做）：
  * 意义：Redo 是指重新执行之前被撤销的操作，将系统恢复到撤销操作之后的状态。当用户撤销了一个操作后，如果后悔或者需要重新执行该操作，可以通过重做来再次应用该操作。
  * 功能：Redo 功能允许用户对已经撤销的操作进行重做，通常也是通过快捷键（如：`Ctrl+Y`）或菜单选项来触发。这个功能对于反悔之前的撤销操作或者回到之前状态的需要非常有用。

> [!NOTE]
>
> Undo 是撤销先前的操作，而 Redo 是重新执行已经被撤销的操作，两者结合起来可以提供更好的用户体验，使用户能够更自由地控制其操作历史。

### 6.9.2 列出事务

* 显示所有`最新`的 dnf `事务列表`：

```shell
dnf history
```



* 示例：

```shell
dnf history
```

![](./assets/130.gif)



* 显示`所选`软件包的`最新`操作列表：

```shell
dnf history list package-name
```



* 示例：

```shell
dnf history list nodejs
```

![](./assets/131.gif)



* 显示`特定事务`的`详情`：

```shell
dnf history info transactionID
```



* 示例：

```shell
dnf history info 11
```

![](./assets/132.gif)

### 6.9.3 恢复单个事务

* 恢复`单个`事务：

```shell
dnf history undo transaction_id -y
```

> [!NOTE]
>
> * ① 请谨慎使用 `dnf history undo` 和 `dnf history rollback` 命令。不支持将 RHEL 软件包，特别是`selinux`, `selinux-policy-*`, `kernel`, `glibc` (`glibc` 的依赖项，如 `gcc`) 软件包，降级到旧版本。
> * ② 因此，不建议将系统降级为次版本（例如，从 RHEL 9.1 到 RHEL 9.0），因为这可能会使系统处于不稳定状态。



* 示例：

```shell
dnf history undo 5 -y
```

![](./assets/133.gif)

### 6.9.4 恢复多个事务

* 恢复`多个`事务：

```shell
dnf history rollback transaction_id -y
```

> [!NOTE]
>
> 在指定事务和最后一个事务之间进行恢复。



* 示例：

```shell
dnf history rollback 4 -y 
```

![](./assets/134.gif)

### 6.9.5 重做事务

* 重做到`指定`的事务：

```shell
dnf history redo transactionID -y
```

> [!NOTE]
>
> 如果要重做到最后的事务，可以使用 `dnf history redo last -y` 。



* 示例：

```shell
dnf history redo 5 -y
```

![](./assets/135.gif)

## 6.10 管理自定义软件仓库

### 6.10.1 添加 dnf 软件仓库

* 添加 dnf 软件仓库：

```shell
dnf config-manager --add-repo xxx
```



* 示例：

```shell
dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
```

![](./assets/136.gif)

### 6.10.2 禁用 dnf 软件仓库

* 禁用 dnf 软件仓库：

```shell
dnf config-manager --disable repositoryID
```



* 示例：

```shell
dnf config-manager --disable docker-ce
```

![](./assets/137.gif)

### 6.10.3 启用 dnf 软件仓库

* 启用 dnf 软件仓库：

```shell
dnf config-manager --enable repositoryID
```



* 示例：

```shell
dnf config-manager --enable docker-ce
```

![](./assets/138.gif)

## 6.11 插件

### 6.11.1 概述

* dnf 其实依赖于很多插件，来完成工作，之前的 `dnf config-manager` 命令就是 dnf 的插件提供的，可以通过如下的命令来查看 dnf 的插件：

```shell
dnf list --installed | grep plugin
```

![](./assets/139.gif)

* 但是，`锁定版本`的`插件`并`没有默认安装`，请看下面的讲解。

### 6.11.2 锁定版本

#### 6.11.2.1 概述

* 在生产环境中，我们有时会将软件包进行锁定，防止升级到更高的版本，避免出现一些问题。

> [!WARNING]
>
> 滴滴之前出现过生产事故，就是运维通过 `dnf -y update` 命令进行整个 Linux 系统的软件包升级，包括： Linux 内核，导致生产环境的 kubernetes 在升级过程中挂掉，进而导致滴滴打车服务的不可用，影响非常恶劣！！！

* `yum-versionlock` 是一个 Yum 插件，它采用一组软件包的名称/版本，并排除这些软件包的所有其他版本（包括可选的以下过时版本）。这允许您保护软件包不被新版本更新。该插件提供了一个命令 `“versionlock”` ，它允许您轻松查看和编辑锁定的软件包列表。

#### 6.11.2.2 安装

* 在 AlmaLinux9 上安装 yum-versionlock 插件：

```shell
dnf -y install python3-dnf-plugin-versionlock
```

![](./assets/140.gif)

> [!NOTE]
>
> 该插件是通过在 Linux 系统中创建 `/etc/yum/pluginconf.d/versionlock.list` 文件，当执行 `yum -y update` 的时候，会去该文件中查找，如果有对应的软件包信息，则不更新；否则，将更新到最新的版本。

#### 6.11.2.3 锁定软件包

* 命令：

```shell
dnf versionlock [add] 软件包1 软件包2 ...
```

> [!NOTE]
>
> * ① add 可以加，也可以不加，默认就是 add 。
> * ② 锁定的软件包需要添加版本，如：`docker-ce-20.10.7*`、`docker-ce-cli-20.10.7*`、`kubelet-1.20.0*`、`kubeadm-1.20.0*`、`kubectl-1.20.0*`。



* 示例：显示当前系统的内核

```shell
dnf list --installed | grep kernel
```

![](./assets/141.gif)



* 示例：显示当前系统的信息（包括 kernel）

```shell
# 需要提前安装 dnf -y install neofecth
neofetch
```

![](./assets/142.gif)

* 示例：查询内核的所有版本，并降序排序

```shell
dnf list --showduplicates | grep kernel | sort -r 
```

![](./assets/143.gif)



* 示例：锁定内核

```shell
dnf versionlock kernel*
```

![](./assets/144.gif)



* 示例：锁定 gcc 

```shell
dnf versionlock add gcc*
```

![](./assets/145.gif)

#### 6.11.2.4 查看锁定的软件包的列表

* 命令：

```shell
dnf versionlock [list]
```

> [!NOTE]
>
> list 可以加，也可以不加，默认就是 list 。



* 示例：

```shell
dnf versionlock
```

![](./assets/146.gif)



* 示例：

```shell
dnf versionlock list
```

![](./assets/147.gif)

#### 6.11.2.5 取消指定软件包的锁定

* 命令：

```shell
dnf versionlock delete 软件包
```



* 示例：取消 gcc 包的锁定

```shell
dnf versionlock delete gcc*
```

![](./assets/148.gif)

#### 6.11.2.6 取消所有软件包的锁定

* 命令：

```shell
dnf versionlock clear
```



* 示例：

```shell
dnf versionlock clear
```

![](./assets/149.gif)


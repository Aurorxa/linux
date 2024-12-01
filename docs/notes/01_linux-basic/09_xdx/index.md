# 第一章：Linux 四剑客（⭐）

## 1.1 概述

* Linux 中的用于`处理大规模的文本数据`，一般都需要使用 `grep` 、`sed`、`awk` 和 `find` 命令；所以，这几个命令也被人称为 Linux 四剑客。
* 其中，`grep` 命令用于在文本文件中`过滤`指定模式的行。
* 其中，`sed` 用于对文本文件进行`替换`、`删除`、`插入`等操作，即`编辑`操作。
* 其中，`awk` 用于对文本文件进行`按列`和`格式化`文本数据。
* 其中，`find` 命令用于`搜索`文件系统中`指定条件`的`文件`或`目录`。

> [!IMPORTANT]
>
> * ① 本次只讲解 `grep` 命令和 `find` 命令，因为其简单且容易掌握。
> * ② 其余的 `sed` 命令和 `awk` 命令后续讲解！！！

## 1.2 grep 命令

### 1.2.1 概述

* `grep` 是一个文本搜索工具，用于在`文件`或`管道`中`查找`（`过滤`）指定内容（`字符串`）的`行`，定义如下：

```
grep [-i][-n][-v] '字符串' [文件]...
```

> [!NOTE]
>
> * 对应的英文：`Global Regular Expression Print`，翻译为中文就是`全局正则输出`。
> * 选项：
>   * `-i`， `--ignore-case`：忽略大小写。
>   * `-n`，`--line-number`：显示行号。
>   * `-v`，`--invert-match`：反向匹配指定的字符串，即忽略指定内容的某些行。

> [!IMPORTANT]
>
> 如果没有指定文件，则从标准输入中读取。

> [!NOTE]
>
> `过滤`类似于`淘米`，通过`淘米筛`将一些`小的颗粒`以及`杂质`等`过滤`掉，只剩下`米`，如下所示：
>
> ![](./assets/1.png)

### 1.2.2 案例（基本使用） 

* 示例：从 /etc/passwd 文件中查找包含 root 的行

```shell
grep 'root' /etc/passwd
```

![](./assets/2.gif)



* 示例：查询 chronyd 日期同步进程

```shell
ps -ef | grep chronyd
```

![](./assets/3.gif)



* 示例：查询系统用户登录的错误信息

```shell
grep 'Failed password' /var/log/secure
```

![](./assets/4.gif)



* 示例：统计系统用户登录的错误次数

```shell
grep 'Failed password' /var/log/secure | wc -l
```

![](./assets/5.gif)

### 1.2.3 案例（显示行号）

* 示例：从 /etc/passwd 文件中查找包含 root 的行以及行号

```shell
grep -n 'root' /etc/passwd
```

![](./assets/6.gif)



* 示例：查询系统用户登录的错误信息以及行号

```shell
grep -n 'Failed password' /var/log/secure
```

![](./assets/7.gif)

### 1.2.4 案例（不区分大小写）

* 场景：有的时候，我们也不清楚搜索的内容是大写还是小写；此时，就可以使用 `-i` 参数了。



* 示例：

```shell
grep -i 'failed passwod' /var/log/secure
```

![](./assets/8.gif)

### 1.2.5 案例（排除）

* 场景：有的时候，我们不需要具体查询的内容；但是，我们知道要排除什么内容；此时，就可以使用 `-v` 参数了。



* 示例：查询 chronyd 日期同步进程

```shell
ps -ef | grep -i chronyd | grep -v grep
```

![](./assets/9.gif)

## 1.3 find 命令

### 1.3.1 概述

* `find` 命令用于`搜索`文件系统中`指定条件`的`文件`或`目录`，定义如下：

```shell
find [path...] [-type xxx][-name xxx][-size xxx][-mtime xxx]
```

> [!NOTE]
>
> * 参数：`path...`，指定要搜索的目录路径。
> * 选项：
>
> | 选项         | 说明                     | 备注                                                         |
> | ------------ | ------------------------ | ------------------------------------------------------------ |
> | -type [d\|f] | 根据文件类型的类型查找。 | f 表示文件，d 表示目录。                                     |
> | -name xxx    | 要文件或目录的名称查找。 |                                                              |
> | -size xxx    | 根据文件的大小查找。     | `+10k` 表示大于 10k，`-10k` 表示小于 10k，单位是：k、M、G 等。 |
> | -mtime xxx   | 根据文件的修改时间查找。 | `-7` 表示最近 7 天内的文件，`+7` 表示 7 天之前的文件。<br>m 表示 modify ，翻译为中文是`修改`的意思。 |

> [!IMPORTANT]
>
> * ① 如果没有写 `path` 路径，find 默认是在当前目录中寻找。
>
> * ② 在实际工作中，通常我们使用 find 命令的场景是`在指定目录中查找想要的文件`。

### 1.3.2 案例（基本使用）

* 示例：查找名为 hostname 的文件（精确查找）

```shell
find / -type f -name 'hostname'
```

![](./assets/10.gif)



* 示例：查找名为 ls 的文件（精确查找）

```shell
# ls 是命令，在 Linux 中，万物皆是文件；所以，ls命令也是文件
find / -type f -name 'ls'
```

![](./assets/11.gif)



* 示例：查找 /etc 目录下名为 hostname 的文件（精确查找）

```shell
find /etc -type f -name 'hostname'
```

![](./assets/12.gif)



* 示例：查找 /etc 目录下以 `.conf` 结尾的文件（模糊查找，常用）

```shell
# * 表示任意，*.conf 就是任意以 .conf 结尾的文件，如：nginx.conf 等
find /etc -type f -name '*.conf'
```

![](./assets/13.gif)

### 1.3.3 案例（根据文件大小查找）

* 示例：查询 /etc 和 /tmp 目录下等于 10kb 的文件

```shell
# size 是大小的意思，-size 10k 表示 10kb 的文件，
# 其实搜索的文件大小范围是（9kb,10kb]
find /etc /tmp	-type f -size 10k
```

![](./assets/14.gif)



* 示例：查询 /etc 和 /tmp 目录下大于 100kb 的文件（常用）

```shell
# size 是大小的意思，-size +10k 表示大于 100kb 的文件，
# 其实搜索的文件大小范围是(10kb，+∞)
find /etc /tmp	-type f -size +100k
```

![](./assets/15.gif)



* 示例：查询  /etc 和 /tmp 目录下小于 1kb 的文件

```shell
# size 是大小的意思，-size -5k 表示小于 1kb 的文件，
# 其实搜索的文件大小范围是(0kb,-1kb]
find /etc /tmp	-type f -size -1k
```

![](./assets/16.gif)

### 1.3.4 案例（根据修改时间查找）

* 时间是一维的，和 size 不一样，是去`过去的时间`中查找，如下所示：

![image-20240207162503418](./assets/17.png)



* 示例：查找最近 5 天内修改的文件

```shell
find /etc -type f -mtime -5
```

![](./assets/18.gif)



* 示例：查找 /etc 目录下 1000 天前以 `.conf` 结尾的文件

```shell
find /etc -type f -mtime +1000 -name '*.conf'
```

![](./assets/19.gif)

### 1.3.5 案例（综合案例）

* 示例：查找 /etc 目录下以 `.conf` 结尾的，文件大于 10kb 以及修改时间是 7 天之前的文件

```shell
find /etc -type f -size +10k -mtime +7 -name '*.conf'
```

![](./assets/20.gif)

### 1.3.6 案例（进阶案例，了解）

* 示例：查找文件的时候，指定目录的层级（深度）

```shell
#  -maxdepth 2 就是目录最大的层级（深度）2 ；不加就是所有层；并且必须是选项的第一个。
find / -maxdepth 2  -type f -size +2k -mtime +15 -name '*.conf'
```

![](./assets/21.gif)



* 示例：查找文件的时候，不区分文件名的大小写

```shell
# -iname 不区分文件名的大小写
find /etc -type f -size +10k -mtime +7 -iname '*.conf'
```

![](./assets/22.gif)



# 第二章：find 命令高级用法（⭐，难点）

## 2.1 概述

* find 命令可以和其它的命令配合使用，以便处理复杂的任务，如：
  * ① find + 简单命令（ls、head、less 、grep 等）：查看某些文件的详细信息、显示文件的内容、过滤等。
  * ② find + 打包压缩命令（tar 等）：find 找出某些文件后进行压缩。
  * ③ find + 复制或移动命令（cp、mv）：find 找出某些文件后将其进行复制或移动。
* 环境准备：

```shell
mkdir -pv /tmp/find
```

```shell
touch /tmp/find/linux{01..10}.txt
```

![](./assets/23.gif)

## 2.2 find + 简单命令

### 2.2.1 概述

* 需求：通过 find 查询 /tmp/find 目录下以 `.txt` 结尾的文件的详细信息。

> [!NOTE]
>
> * ① find 通常可以和 ls 、rm 、cat、head、grep 等命令组合使用。
> * ② find 不要和交互式命令，如：vi、vim ，搭配使用。
> * ③ 在 Linux 中，\`\` 和 `$()`一样都是[重定向](https://aexiar.github.io/linux/notes/01_linux_basic/05_xdx/#_6-5-%E8%A1%A5%E5%85%85)符号，里面的命令将会优先执行。



* 示例：

```shell
ls -lah `find /tmp/find -type f -name '*.txt'`
```

```shell
ls -lah $(find /tmp/find -type f -name '*.txt')
```

![](./assets/24.gif)

### 2.2.2 引出 xargs 

* 如果上述的需求，我们使用管道符 `|` 来完成，如下所示：

```shell
find /tmp/find -type f -name '*.txt' | ls -lah
```

![image-20240207201558682](./assets/25.png)

* 我们会发现很奇怪，结果完全不对，此时我们就需要 xargs 来解决，如下所示：

```shell
find /tmp/find -type f -name '*.txt' | xargs ls -lah
```

![image-20240207201721264](./assets/26.png)

* 再次回顾命令的格式，如下所示：

```shell
命令（command） [选项](option) [参数](arguments/parameter)
```

* 其命令格式说明：

| 类别 | 说明                                       | 备注                                        |
| :--- | :----------------------------------------- | :------------------------------------------ |
| 命令 | Linux 中通过`命令`控制整个操作系统。       | 通常而言，命令是单词或单词缩写。            |
| 选项 | 就是`功能`，不同的`选项`对应不同的`功能`。 | 通常而言，选项会使用加上 `-` 或 `--` 前缀。 |
| 参数 | 命令处理的`目标`                           |                                             |

> [!IMPORTANT]
>
> 并不是所有的命令`都遵循`上述的格式，有些命令就只有命令，而没有选项或参数，如：`pwd` 等。

* ls 命令的格式如下：

```shell
ls [选项]... [文件]...
```

* 我们通常会这么使用，即：

```shell
ls -lah /tmp/find
```

![image-20240207202000269](./assets/27.png)

* 也会这么使用，即：

```shell
# 如果文件的路径不写，默认是当前目录，即 .
ls -lah
```

![image-20240207202101150](./assets/28.png)

> [!NOTE]
>
> ls 命令默认情况下，是不能读取标准输入的。

* 而 grep 命令的格式是这样的，即：

```shell
grep [-i][-n][-v] '字符串' [文件]...
```

> [!NOTE]
>
> 如果没有指定文件，则从标准输入中读取。

* 所以，对于 grep 而言，可以直接使用管道符，即：

```shell
# 因为 grep 可以读取标准输入
ps -ef | grep sshd
```

![image-20240207202309972](./assets/29.png)

* 既然，ls 在默认情况下，不能读取标准输入；那么，就可以 xargs 将标准输入转换为命令行参数，即：

![image-20240207202811280](./assets/30.png)

* 那么，xargs 的作用是什么？xargs 就是将`管道的标准输入`转换为`某些命令`的`命令行参数`，因为某些命令是不能读取标准输入的，如：ls 命令。

> [!NOTE]
>
> 由于很多命令不支持管道 `|` 来传递参数，xargs 用于产生某个命令的参数，xargs 可以读入 stdin 的数据，并且以空格符或回车符将 stdin 的数据分隔成为参数。

* 可能，你还是不能理解上面的逻辑，可以手动模拟下，即：

```shell
cat > test.txt <<EOF
a b c d e f g
h i j k l m n
o p q
r s t
u v w x y z
EOF
```

```shell
cat test.txt | xargs
```

![](./assets/31.gif)

* 所以，`| xargs` 就是通过这样的方式，将`上一个命令`的`标准输出`通过 `|xargs`转换为`单行 + 空格`的方式`添加到`命令的`参数位置`，进而完成某些命令不支持读取标准流，也能通过管道来使用。
* 默认情况下，管道是没有办法将`上一个命令`的`标准输出`转变为`下一个命令`的`参数`，即：

```
ls -lah '/tmp/find/linux01.txt
/tmp/find/linux02.txt
/tmp/find/linux03.txt
/tmp/find/linux04.txt
/tmp/find/linux05.txt
/tmp/find/linux06.txt
/tmp/find/linux07.txt
/tmp/find/linux08.txt
^Cmp/find/linux09.txt
/tmp/find/linux10.txt'
```

![image-20240207204545161](./assets/32.png)

* 会导致传递失败，默认情况下，上一条命输出的内容就被丢弃；所以，就相当于如下的命令，即：

```shell
ls -lah 
```

![image-20240207204652694](./assets/33.png)

* 所以，当然会显示`当前目录`下文件的`详细信息`了；解决方案，就是通过 `|xargs`将`上一个命令`的`标准输出`转换为`单行 + 空格`的方式`添加到`命令的`参数位置`，进而完成某些命令不支持读取标准流，也能通过`管道`来使用。

## 2.3 find + 打包压缩命令

* 需求：通过 find 查询 /tmp/find 目录下以 `.txt` 结尾的文件，并通过 tar 命令进行打包。



* 示例：

```shell
tar -zcvf find.tar.gz $(find /tmp/find -type f -name '*.txt')
```

![](./assets/34.gif)



* 示例：

```shell
find /tmp/find -type f -name '*.txt' | xargs tar -zcvf find.tar.gz
```

![](./assets/35.gif)

## 2.4 find + 复制或移动命令

* 需求：通过 find 查询 /tmp/find 目录下以 `.txt` 结尾的文件，并复制到 /tmp 目录下

> [!NOTE]
>
> 在使用 find + cp 或 mv 命令的时候，尽量选择 find + cp 组合，防止出现数据丢失等情况。



* 示例：

```shell
cp `find /tmp/find -type f -name '*.txt'` /tmp
```

![](./assets/36.gif)



* 示例：

```shell
find /tmp/find -type f -name '*.txt' | xargs cp -t /tmp
```

![](./assets/37.gif)



# 第三章：别名（⭐）

## 3.1 概述

* Linux 中的`别名`是一种将`常用`或`复杂的命令`简化为`简短名称`的功能：当用户输入`别名`的时候，Linux 会自动将其替换为`完整的命令`。
* 在 AlmaLinux 中，最为常见的别名就是 `ll` ，相当于 `ls -l --color=auto`，即：

```shell
alias ll='ls -l --color=auto'
```

* Linux 中命令的`别名`的应用场景：
  * ① `命令简化`：将`长命令`简化为`短别名`，如：`ls -l` 简化为 `ll`。
  * ② `防止误操作`：为`可能产生严重后果的命令（危险命令）`添加别名，以便`增加`确认步骤，如：`alias rm='rm -i'`。
  * ③ `命令组合`：将`一系列的命令`组合成一个`别名`，以便`快速`执行，如：`alias deploy='git pull && npm install && npm run build'`。
  * ④ `提高工作效率`：`为频繁执行`的命令创建别名，减少重复输入。

> [!NOTE]
>
> * ① 可以将`别名`理解为`命令`的`昵称`、`爱称`，如：孩子的小名 --- 狗蛋、狗剩，QQ 账号的昵称 --- 天下无敌。
> * ② 在 Linux 中命令的解析顺序是：`别名 > 内部命令 > 外部命令`。这个顺序允许用户通过定义别名来覆盖内置命令的默认行为，或者通过命令的名称来覆盖系统中的外部命令。然而，也正因为这个原因，当不同类型的命令使用相同的名称时，可能会导致意外的行为，所以在定义别名或选择命令名称时需要小心。

* 查看系统已有的别名：

```shell
alias
```

![image-20240207221805798](./assets/38.png)

* 查看别名对应的完整命令：

```shell
alias ll
```

![image-20240207222049976](./assets/39.png)

## 3.2 临时设置别名

* 在当前会话中，临时设置别名(重启或重新登录失效)：

```shell
alias 别名='命令'
```

> [!NOTE]
>
> 在别名存在的情况下，如果还想执行真实存在的命令，有如下的两种方式
>
> * ① 使用`命令`的`绝对路径`，如：`/bin/rm` 。
> * ② 使用`\别名`，如：`\rm xxx`。



* 示例：

```shell
alias rm='echo rm is not found,please use mv'
```

![](./assets/40.gif)

## 3.3 永久设置别名

* 如果要想别名在每次登录的时候都生效，则需要将其添加到 Shell 对应的配置文件中。

> [!NOTE]
>
> 永久设置别名的步骤如下：
>
> * ① 修改配置文件：
>
> ```shell
> echo "alias rm='echo rm is not found,please use mv'" >>  ~/.bashrc
> ```
>
> * ② 让配置生效（加载配置）：
>
> ```shell
> # source /etc/profile
> source ~/.bashrc 
> ```

> [!IMPORTANT]
>
> * ① 对于 bash 而言，通常是 `~/.bashrc`；对于 zsh 而言，通常是 `~/.zshrc`。
> * ② 可以通过在命令行输入 `echo $SHELL` 查看当前默认的 shell 。
> * ③ `~/.bashrc`仅仅对当前用户有效，而 `/etc/profile` 对全局（所有用户）生效。
> * ④  如果要想`注释`配置文件 `~/.bashrc` 的别名信息，只需要修改此配置文件，在指定的别名前加上 `#`，再重新加载配置文件即可。



* 示例：

```shell
# 备份
cp ~/.bashrc ~/.bashrc.back
```

```shell
# 注释掉 alias rm=‘rm -i’，就是添加 # 
sed -i 's/alias rm/# alias rm/g' ~/.bashrc
```

```shell
# 将配置写入到配置文件中
echo "alias rm='echo rm is not found,please use mv'" >>  ~/.bashrc
```

```shell
# 加载配置文件
source ~/.bashrc
```

![](./assets/41.gif)



# 第四章：打包压缩三剑客（⭐）

## 4.1 概述

* 在 Linux 中，打包和压缩是两个不同的概念，即：
  * 打包（Packaging）：
    * 打包是指将多个文件和目录合并成一个单一的文件，但并不改变文件的内容和大小；打包后的文件通常称为归档文件（archive）。
    * 常用的打包工具是： `tar`（tape archive）。
  * 压缩（Compression）：
    * 压缩是指通过特定的算法减少文件的体积，使其占用更少的存储空间；压缩后的文件通常比原文件要小。
    * 常用的压缩工具有： `gzip`、`bzip2`、`xz` ；其中，`gzip` 的压缩比最低，`bzip2` 的压缩比居中，`xz` 的压缩比最高。

> [!NOTE]
>
> * ① 打包是将多个文件合并为一个文件，而压缩是减少文件的体积。
> * ② 在实际应用中，打包和压缩常常结合使用；通常先将多个文件打包成一个归档文件，然后再对这个归档文件进行压缩。
> * ③ 压缩比越大，压缩文件的体积越小；但是，相应的会增加 CPU 的使用率（算法的复杂度越高，占用的 CPU 的资源就会越大，但是压缩之后的文件会越小）。
> * ④ 对于单个文件，可以使用 `cp` 备份；对于多个文件或目录，强烈推荐使用`打包压缩命令`进行备份。
> * ⑤ 在 Linux 中，最为常用的打包压缩命令是 `tar` ，其次是 `zip` 和 `unzip` 了。

## 4.2 压缩和解压缩

### 4.2.1 准备工作

* 准备文件：

```shell
cp /etc/services .
```

```shell
cp /etc/passwd .
```

![](./assets/42.gif)

### 4.2.2 gzip 和 gunzip（⭐）

* 压缩文件：

```shell
gzip [-k][-d][-数字][-v] 文件1 文件2 ...
```

> [!NOTE]
>
> 常用选项：
>
> * `-k`，`--keep`：保留原文件。
> * `-d`，`--decompress`：解压缩 gzip 压缩的文件。
> * `-1`，`--fast`：指定压缩比，取值为 1-9 ，值越大压缩比也大。
> * `-9`，`--best`：指定压缩比，取值为 1-9 ，值越大压缩比也大。
> * `-v`，`--verbose`：显示压缩进度。

* 解压缩：

```shell
gunzip [-v][-k] xxx.gz
```

> [!NOTE]
>
> 常用选项：
>
> * `-v`，`--verbose`：显示解压缩进度。
> * `-k`，`--keep`：保留原文件。

> [!IMPORTANT]
>
> * ① `gzip` 命令和 `gunzip` 命令依赖于 `gzip` 软件包。
> * ② 查看 `xxx.gz` 压缩文件中的内容，需要使用 `zcat xxx.gz` 命令。



* 示例：压缩文件

```shell
gzip -k services
```

![](./assets/43.gif)



* 示例：压缩多个文件

```shell
gzip -kv services passwd
```

![](./assets/44.gif)



* 示例：显示压缩文件中的内容

```shell
zcat service.gz
```

![](./assets/45.gif)



* 示例：解压缩

```shell
gunzip -kv services.gz
```

![](./assets/46.gif)

### 4.2.3 bzip2 和 bunzip2

* 压缩文件：

```shell
bzip2 [-k][-d][-数字][-v] 文件1 文件2 ...
```

> [!NOTE]
>
> 常用选项：
>
> * `-k`，`--keep`：保留原文件。
> * `-d`，`--decompress`：解压缩 bzip2 压缩的文件。
> * `-1`，`--fast`：指定压缩比，取值为 1-9 ，值越大压缩比也大。
> * `-9`，`--best`：指定压缩比，取值为 1-9 ，值越大压缩比也大。
> * `-v`，`--verbose`：显示压缩进度。

* 解压缩：

```shell
bunzip2 [-v][-k] xxx.bz2
```

> [!NOTE]
>
> 常用选项：
>
> * `-v`，`--verbose`：显示解压缩进度。
> * `-k`，`--keep`：保留原文件。

> [!IMPORTANT]
>
> * ① `bzip2` 命令和 `bunzip2` 命令依赖于 `bzip2` 软件包。
> * ② 查看 `xxx.bz2` 压缩文件中的内容，需要使用 `bzcat xxx.bz2` 命令。



* 示例：压缩文件

```shell
bzip2 -kv services
```

![](./assets/47.gif)



* 示例：压缩多个文件

```shell
bzip2 -kv services passwd
```

![](./assets/48.gif)



* 示例：显示压缩文件中的内容

```shell
bzcat services.bz2
```

![](./assets/49.gif)



* 示例：解压缩

```shell
bunzip2 services.bz2
```

![](./assets/50.gif)

### 4.2.4 xz 和 unxz

* 压缩文件：

```shell
xz [-k][-d][-数字][-v] 文件1 文件2 ...
```

> [!NOTE]
>
> 常用选项：
>
> * `-k`，`--keep`：保留原文件。
> * `-d`，`--decompress`：解压缩 bzip2 压缩的文件。
> * `-1`，`--fast`：指定压缩比，取值为 1-9 ，值越大压缩比也大。
> * `-9`，`--best`：指定压缩比，取值为 1-9 ，值越大压缩比也大。
> * `-v`，`--verbose`：显示压缩进度。

* 解压缩：

```shell
unxz [-v][-k] xxx.xz
```

> [!NOTE]
>
> 常用选项：
>
> * `-v`，`--verbose`：显示解压缩进度。
> * `-k`，`--keep`：保留原文件。

> [!IMPORTANT]
>
> * ① `xz ` 命令和 `unxz` 命令依赖于 `xz` 软件包。
> * ② 查看 `xxx.xz` 压缩文件中的内容，需要使用 `xzcat xxx.xz` 命令。



* 示例：压缩文件

```shell
xz -kv services
```

![](./assets/51.gif)



* 示例：压缩多个文件

```shell
xz -kv services passwd
```

![](./assets/52.gif)



* 示例：显示压缩文件中的内容

```shell
xzcat services.xz
```

![](./assets/53.gif)



* 示例：解压缩

```shell
unxz services.xz
```

![](./assets/54.gif)

## 4.3 zip 和 unzip（⭐）

### 4.3.1 概述

* zip 格式的压缩包是 Linux 和 Windows 共同支持的格式，并且 tar 命令无法处理，只能使用 zip 命令或 unzip 命令。
* 其安装命令，如下所示：

```shell
dnf -y install zip unzip
```

* 压缩：

```shell
# -r 递归目录，如果压缩目录，需要此参数
zip [-r] xxx.zip [目录|文件...]
```

* 解压：

```shell
unzip xxx.zip -d 目录
```

> [!IMPORTANT]
>
> * ① 通常只会使用 `unzip` 解压命令。
> * ② `zip` 命令可以实现打包目录和多个文件到一个文件并压缩；但是，`zip` 命令可能会丢失文件属性信息，如：所有者和组信 息，一般建议使用 `tar` 代替。

### 4.3.2 应用示例

* 示例：

```shell
zip a.zip a.txt b.txt
```

![47](./assets/55.gif)



* 示例：

```shell
unzip a.zip
```

![48](./assets/56.gif)



* 示例：

```shell
zip -r demo.zip demo
```

![49](./assets/57.gif)



* 示例：

```shell
unzip demo.zip -d /tmp
```

![50](./assets/58.gif)

## 4.4 tar（⭐）

### 4.4.1 概述

* 在 Linux 中的打包压缩是分为两步：
  * ① 打包（将文件放到一起）：tar 。
  * ② 压缩（进行压缩，解决空间）：tar 命令的选项（如：z 等）。
* tar 命令最为常用的功能：
  * ① 创建压缩包。
  * ② 查看压缩包。
  * ③ 解压压缩包。
  * ④ 解压压缩包到指定目录。

* tar 命令的创建压缩包：

```shell
# -z, --gzip, --gunzip, --ungzip   通过 gzip 过滤归档（压缩选项）
# -c, --create   创建
# -f, --file=ARCHIVE  指定压缩包的路径和名称
# -v, --verbose       详细地列出处理的文件       
tar -zcvf xxx.tar.gz 文件|目录 ...
```

* tar 命令查看压缩包中的详细内容：

```shell
# -t, --list 列出压缩包中的内容
# -v, --verbose       详细地列出处理的文件 
# -f, --file=ARCHIVE  指定压缩包的路径和名称
tar -tvf xxx.tar.gz
```

* tar 命令解压压缩包：

```shell
# -x, --extract, --get       从归档中解出文件
# -v, --verbose       详细地列出处理的文件 
# -f, --file=ARCHIVE  指定压缩包的路径和名称
tar -xvf xxx.tar.gz
```

* tar 命令解压压缩包到指定目录：

```shell
# -x, --extract, --get       从归档中解出文件
# -v, --verbose       详细地列出处理的文件 
# -f, --file=ARCHIVE  指定压缩包的路径和名称
# -C, --directory=DIR        改变至目录 DIR
tar -xvf xxx.tar.gz -C xxx
```

### 4.4.2 案例

* 示例：创建压缩包

```shell
tar -zcvf etc.tar.gz /etc
```

![41](./assets/59.gif)



* 示例：查看压缩包中的详细内容

```shell
tar -tvf etc.tar.gz
```

![42](./assets/60.gif)



* 示例：解压到当前目录

```shell
tar -xvf etc.tar.gz
```

![43](./assets/61.gif)



* 示例：解压到 /tmp 目录

```shell
tar -xvf etc.tar.gz -C /tmp
```

![44](./assets/62.gif)

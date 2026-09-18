import type { LocalizedQuestion } from '../types';

export const faqQuestions: LocalizedQuestion[] = [
  {
    "id": "faq-1",
    "sourceRef": "part1-01",
    "tier": "ez",
    "tags": [
      "硬件",
      "常识"
    ],
    "answer": 0,
    "zh": {
      "prompt": "常被比作计算机「大脑」的部件是?",
      "options": [
        "CPU(中央处理器)",
        "内存条",
        "硬盘",
        "显示器"
      ],
      "explain": "CPU 负责取指令、做运算、控制各部件的节奏,所以被比作「大脑」。内存条是**临时**存放正在用的数据(断电即失),硬盘是**长期**存储,显示器只是输出画面 —— 三者都不做运算。考点是别把「存东西的」和「算东西的」混为一谈。"
    },
    "en": {
      "prompt": "Which component is usually called the \"brain\" of a computer?",
      "options": [
        "The CPU",
        "A RAM stick",
        "The hard drive",
        "The monitor"
      ],
      "explain": "The CPU fetches instructions, performs the arithmetic and paces every other part, which is why it gets the \"brain\" label. RAM holds data **temporarily** (it is lost on power-off), the hard drive stores it **long term**, and the monitor only shows output — none of them compute. The point is not to confuse \"where things are kept\" with \"where things are calculated\"."
    }
  },
  {
    "id": "faq-2",
    "sourceRef": "part1-02",
    "tier": "in",
    "tags": [
      "数据单位",
      "常识"
    ],
    "answer": 2,
    "zh": {
      "prompt": "`1 Byte`(字节)等于多少 `bit`(位)?",
      "options": [
        "4",
        "16",
        "8",
        "1024"
      ],
      "explain": "**1 字节 = 8 位**,这是计算机里最基础的一条换算。容易混的是 `1024`:那是 **1 KiB = 1024 Byte** 的进位数,拿它当 bit 与 Byte 的关系就错了一级。简记:bit 是 0/1 的最小单位,8 个 bit 凑成一个 Byte,刚好够表示一个 ASCII 字符。"
    },
    "en": {
      "prompt": "How many `bits` are there in one `Byte`?",
      "options": [
        "4",
        "16",
        "8",
        "1024"
      ],
      "explain": "**1 byte = 8 bits** — the most basic conversion in computing. The tempting `1024` is the step between **1 KiB and 1024 bytes**, one level up; using it here is off by a factor. Short version: a bit is the smallest 0/1 unit, and 8 of them make a byte, just enough for one ASCII character."
    }
  },
  {
    "id": "faq-3",
    "sourceRef": "part1-05",
    "tier": "ez",
    "tags": [
      "硬件",
      "输入输出"
    ],
    "answer": 1,
    "zh": {
      "prompt": "鼠标属于哪一类设备?",
      "options": [
        "输出设备",
        "输入设备",
        "存储设备",
        "网络设备"
      ],
      "explain": "输入设备负责把人的操作**送进**计算机,鼠标、键盘、麦克风、摄像头都是;输出设备负责把结果**送出来**,显示器、音箱、打印机是。鼠标把移动与点击转成信号交给系统,所以是输入设备。"
    },
    "en": {
      "prompt": "Which category does a mouse belong to?",
      "options": [
        "Output device",
        "Input device",
        "Storage device",
        "Network device"
      ],
      "explain": "Input devices carry your actions **into** the computer — mouse, keyboard, microphone, webcam. Output devices carry results **out** — monitor, speakers, printer. A mouse turns movement and clicks into signals for the system, so it is an input device."
    }
  },
  {
    "id": "faq-4",
    "sourceRef": "part1-11",
    "tier": "ez",
    "tags": [
      "文件",
      "扩展名"
    ],
    "answer": 3,
    "zh": {
      "prompt": "文件名后面的「扩展名」(如 `.jpg`、`.zip`)通常表示什么?",
      "options": [
        "文件大小",
        "文件的创建时间",
        "文件被打开的次数",
        "文件类型"
      ],
      "explain": "扩展名用来告诉系统「这个文件该用哪类程序打开」,也就是**文件类型**。它只是名字的一部分,改扩展名**不会**把文件真正变成另一种格式 —— 把 `.zip` 改成 `.jpg` 只会让图片查看器打不开它。大小要看文件属性,和扩展名无关。"
    },
    "en": {
      "prompt": "What does a file \"extension\" (like `.jpg` or `.zip`) normally indicate?",
      "options": [
        "The file size",
        "When the file was created",
        "How many times it was opened",
        "The file type"
      ],
      "explain": "The extension tells the system which kind of program should open the file — that is, the **file type**. It is only part of the name: renaming the extension does **not** convert the file. Turning `.zip` into `.jpg` just makes the image viewer fail to open it. Size lives in the file properties and has nothing to do with the extension."
    }
  },
  {
    "id": "faq-5",
    "sourceRef": "part1-12",
    "tier": "ez",
    "tags": [
      "文件",
      "图片格式"
    ],
    "answer": 0,
    "zh": {
      "prompt": "扩展名 `.jpg` 的文件通常是?",
      "options": [
        "一张图片",
        "一段音频",
        "一个压缩包",
        "一个可执行程序"
      ],
      "explain": "`.jpg`(也写作 `.jpeg`)是一种**图片**格式,特点是压缩率高、适合照片。容易混的是 `.gif`:它既能存静态图也能存动图,而 `.jpg` 只存静态图。音频常见的是 `.mp3` / `.wav`,压缩包是 `.zip` / `.rar`,可执行程序是 `.exe`。"
    },
    "en": {
      "prompt": "A file with the extension `.jpg` is usually:",
      "options": [
        "An image",
        "An audio clip",
        "A compressed archive",
        "An executable program"
      ],
      "explain": "`.jpg` (also written `.jpeg`) is an **image** format, tuned for photos with high compression. The confusable one is `.gif`, which can hold both still and animated images, while `.jpg` is still-only. Audio is usually `.mp3` / `.wav`, archives are `.zip` / `.rar`, and executables are `.exe`."
    }
  },
  {
    "id": "faq-6",
    "sourceRef": "part1-13",
    "tier": "ez",
    "tags": [
      "文件",
      "压缩"
    ],
    "answer": 2,
    "zh": {
      "prompt": "扩展名 `.zip` 的文件通常是?",
      "options": [
        "一个快捷方式",
        "一个系统配置文件",
        "一个压缩包",
        "一个网页文件"
      ],
      "explain": "`.zip` 是**压缩包**:把多个文件打包并压缩,省空间、也方便一次传输,打开前需要先解压。快捷方式通常是 `.lnk`(Windows),网页文件是 `.html`,系统配置常见 `.ini` / `.conf`。"
    },
    "en": {
      "prompt": "A file with the extension `.zip` is usually:",
      "options": [
        "A shortcut",
        "A system config file",
        "A compressed archive",
        "A web page file"
      ],
      "explain": "`.zip` is a **compressed archive**: it bundles several files and squeezes them, which saves space and makes transfer easier; you normally unpack it before use. Shortcuts are `.lnk` on Windows, web pages are `.html`, and system configuration is usually `.ini` / `.conf`."
    }
  },
  {
    "id": "faq-7",
    "sourceRef": "part2-22",
    "tier": "hd",
    "tags": [
      "操作系统",
      "故障处理"
    ],
    "answer": 1,
    "zh": {
      "prompt": "电脑卡死时,「先重启试试」为什么往往真的有效?",
      "options": [
        "重启会重装一遍系统",
        "重启会清空内存里的临时状态、结束卡死的进程,让系统回到干净起点",
        "重启时 IT 部门会远程登入替你修好",
        "重启能给 CPU 降温,温度降下来问题自然消失"
      ],
      "explain": "重启的本质是**把内存清空、让所有进程重新开始**。卡死多半是某个进程卡住、状态互相锁死或内存被占满,重启把这些一次性抹掉,所以能解决一大类问题。它**不**重装系统(那是恢复出厂/重装),也不靠降温 —— 降温只对过热这一种原因有效。"
    },
    "en": {
      "prompt": "When a computer freezes, why does \"try restarting first\" so often actually work?",
      "options": [
        "Restarting reinstalls the operating system",
        "Restarting clears temporary state in memory and ends the stuck processes, returning the system to a clean start",
        "IT logs in remotely during the restart and fixes it for you",
        "Restarting cools the CPU, and the problem disappears once it is cooler"
      ],
      "explain": "A restart essentially **empties memory and lets every process start over**. Freezes are usually a stuck process, deadlocked state or exhausted memory, and a restart wipes all of that at once — which is why it clears up a whole class of problems. It does **not** reinstall the system, and it is not about cooling: cooling only helps the single cause of overheating."
    }
  },
  {
    "id": "faq-8",
    "sourceRef": "part2-25",
    "tier": "hd",
    "tags": [
      "硬件",
      "内存与硬盘"
    ],
    "answer": 3,
    "zh": {
      "prompt": "给电脑加更大的内存( RAM ),硬盘的可用空间会怎样?",
      "options": [
        "跟着变大,内存会分一部分给硬盘",
        "变小,被内存占用掉",
        "变大,因为系统整体变快了",
        "不变 —— 内存和硬盘是两种不同的东西"
      ],
      "explain": "内存和硬盘是**两种不同的存储**:内存是断电即失的**临时工作区**,硬盘是长期保存数据的**仓库**。加内存只扩大工作区,和硬盘容量毫无关系。反过来说,不装硬盘、只加大内存,照样存不下文件。这是最常见的一类混淆。"
    },
    "en": {
      "prompt": "If you add more memory (RAM) to a computer, what happens to the free space on the hard drive?",
      "options": [
        "It grows, because RAM donates part of itself to the drive",
        "It shrinks, because RAM eats into it",
        "It grows, because the whole system gets faster",
        "Nothing — RAM and a hard drive are two different things"
      ],
      "explain": "RAM and a hard drive are **two different kinds of storage**: RAM is a **temporary workspace** that loses everything on power-off, while a drive is the **warehouse** that keeps data long term. Adding RAM enlarges the workspace only and has nothing to do with drive capacity. Conversely, a bigger RAM with no drive still cannot store files. This is the most common mix-up of all."
    }
  },
  {
    "id": "faq-9",
    "sourceRef": "part2-26",
    "tier": "in",
    "tags": [
      "云服务",
      "常识"
    ],
    "answer": 2,
    "zh": {
      "prompt": "「云存储」里的文件实际上放在哪?",
      "options": [
        "在你家路由器的缓存里",
        "在运营商机房到你电脑之间的网络链路上",
        "在服务商的数据中心的服务器上",
        "分散存在所有下载过它的人的电脑里"
      ],
      "explain": "「云」只是对**别人的服务器**的比喻说法:文件存在服务商的数据中心里,你通过网络读写它。所以它既不是玄学,也不是没有实体 —— 断网就用不了,服务商出故障或账号被封时你也可能拿不到自己的文件。重要数据仍然要本地留一份。"
    },
    "en": {
      "prompt": "Where do files in \"cloud storage\" actually live?",
      "options": [
        "In your home router cache",
        "On the network links between your ISP building and your computer",
        "On servers in the provider data centre",
        "Spread across the computers of everyone who has downloaded them"
      ],
      "explain": "\"The cloud\" is just a metaphor for **somebody else's servers**: the files sit in the provider's data centre and you read and write them over the network. So it is neither magic nor immaterial — no connection means no access, and a provider outage or a suspended account can lock you out of your own files. Keep a local copy of anything important."
    }
  },
  {
    "id": "faq-10",
    "sourceRef": "part2-27",
    "tier": "hd",
    "tags": [
      "操作系统",
      "进程"
    ],
    "answer": 1,
    "zh": {
      "prompt": "关掉程序窗口后,这个程序一定已经退出了吗?",
      "options": [
        "一定退出了,窗口就是程序",
        "不一定 —— 它可能仍在后台运行,只是没有可见窗口",
        "窗口一关,系统会把它连同相关服务一起卸载",
        "不一定 —— 但只可能残留在回收站里"
      ],
      "explain": "窗口只是程序**画出来的一张脸**,关掉脸不等于关掉人。很多程序会退到后台继续跑:下载器、音乐播放器、同步盘、聊天工具都是这样。所以才会出现「明明关了还在占内存/还在响」的情况。想确认就去任务管理器(macOS 是活动监视器)看进程列表,那里才是真相。"
    },
    "en": {
      "prompt": "After you close a program's window, has that program definitely exited?",
      "options": [
        "Yes — the window is the program",
        "Not necessarily: it may still be running in the background with no visible window",
        "Closing the window makes the system uninstall the program and its services",
        "Not necessarily, but the leftovers can only be in the recycle bin"
      ],
      "explain": "A window is just the **face the program draws** — closing the face does not close the program. Plenty of software keeps running in the background: downloaders, music players, sync clients, chat apps. That is why something can still eat memory or make noise after you \"closed\" it. To be sure, open Task Manager (Activity Monitor on macOS) and read the process list — that is where the truth is."
    }
  },
  {
    "id": "faq-11",
    "sourceRef": "part1-07",
    "tier": "hd",
    "tags": [
      "Web",
      "万维网"
    ],
    "answer": 0,
    "zh": {
      "prompt": "网址开头的 `WWW` 是什么的缩写?",
      "options": [
        "World Wide Web(万维网)",
        "World Web Window",
        "Wide Web Wire",
        "Wireless Web World"
      ],
      "explain": "`WWW` = **World Wide Web**,中文译作**万维网**,指通过超链接互相连起来的网页系统。要注意它和「互联网」不是一回事:互联网是底层的网络设施,万维网只是跑在上面的一项服务 —— 互联网上还有邮件、文件传输、在线游戏等等。"
    },
    "en": {
      "prompt": "In a web address, what does the leading `WWW` stand for?",
      "options": [
        "World Wide Web",
        "World Web Window",
        "Wide Web Wire",
        "Wireless Web World"
      ],
      "explain": "`WWW` = **World Wide Web**, the system of pages linked to each other by hyperlinks. Note it is not the same thing as \"the internet\": the internet is the underlying network, while the Web is one service running on top of it — alongside email, file transfer, online games and more."
    }
  },
  {
    "id": "faq-12",
    "sourceRef": "part2-20",
    "tier": "in",
    "tags": [
      "文件",
      "数据恢复"
    ],
    "answer": 1,
    "zh": {
      "prompt": "删除文件并清空了回收站,这个文件通常?",
      "options": [
        "彻底消失,任何手段都无法取回",
        "仍可能被恢复工具找回，取决于覆盖、TRIM 等情况",
        "会立刻被送到云端备份一份",
        "会被系统自动加密,再也读不出来"
      ],
      "explain": "清空回收站通常移除文件记录，并让空间可被重新使用，未覆盖的数据有时还能被恢复。但 SSD 的 TRIM、加密或后续覆盖可能使恢复失败，所以恢复不是保证；误删后应尽量停止写入。"
    },
    "en": {
      "prompt": "After deleting a file and emptying the recycle bin, that file has usually:",
      "options": [
        "Vanished completely, unrecoverable by any means",
        "May still be recoverable, depending on overwriting, TRIM, and other factors",
        "Been uploaded to a cloud backup immediately",
        "Been encrypted by the system so it can never be read again"
      ],
      "explain": "Emptying the bin normally removes file records and makes space reusable, so data may remain recoverable until overwritten. SSD TRIM, encryption, or later writes can prevent recovery; it is never guaranteed. Avoid further writes after an accidental deletion."
    }
  },
  {
    "id": "faq-13",
    "sourceRef": "part1-06",
    "tier": "hd",
    "tags": [
      "网络",
      "URL"
    ],
    "answer": 2,
    "zh": {
      "prompt": "常见的网页地址(URL)开头是哪一段?",
      "options": [
        "`ftp://`",
        "`smtp://`",
        "`http://` 或 `https://`",
        "`ssh://`"
      ],
      "explain": "网页地址以 `http://` 或 `https://` 开头,`https` 是加了传输加密的版本(`s` 就是 secure)。另外三个都是真实协议,但各有用途:`ftp` 传文件、`smtp` 发邮件、`ssh` 远程登录 —— 它们都**不是**用来打开网页的。"
    },
    "en": {
      "prompt": "A normal web page address (URL) starts with which piece?",
      "options": [
        "`ftp://`",
        "`smtp://`",
        "`http://` or `https://`",
        "`ssh://`"
      ],
      "explain": "Web addresses begin with `http://` or `https://`, where `https` is the transport-encrypted version (the `s` is for secure). The other three are all real protocols with their own jobs: `ftp` moves files, `smtp` sends mail, `ssh` logs in remotely — none of them opens a web page."
    }
  },
  {
    "id": "faq-14",
    "sourceRef": "part1-08",
    "tier": "hd",
    "tags": [
      "网络",
      "IP 地址"
    ],
    "answer": 3,
    "zh": {
      "prompt": "上网时用来标识一台设备的地址叫什么?",
      "options": [
        "家庭住址",
        "电子邮箱地址",
        "MAC 地址",
        "IP 地址"
      ],
      "explain": "IP 地址用于在 IP 网络中寻址和路由数据包。MAC 地址主要用于局域链路上的通信，可以被修改或随机化，也不保证全球唯一；公网中还可能有多个设备通过 NAT 共用一个地址。"
    },
    "en": {
      "prompt": "What is the address that identifies a device on a network called?",
      "options": [
        "A home address",
        "An email address",
        "A MAC address",
        "An IP address"
      ],
      "explain": "IP addresses support addressing and routing on IP networks. MAC addresses serve local-link communication and can be changed or randomized; global uniqueness is not guaranteed. Multiple devices may share a public IP through NAT."
    }
  },
  {
    "id": "faq-15",
    "sourceRef": "part1-09",
    "tier": "in",
    "tags": [
      "安全",
      "病毒"
    ],
    "answer": 2,
    "zh": {
      "prompt": "通常说的「电脑病毒」是?",
      "options": [
        "一种会传染给人的生物病毒",
        "一种硬件故障",
        "一段被刻意写成能自我复制、破坏系统的程序",
        "机箱里的灰尘引起的故障"
      ],
      "explain": "电脑病毒是**程序**,不是生物体:它会把自己附着到别的文件或程序上,借运行的机会复制、传播,并可能删数据、加密文件或偷账号。它也不会自己出现 —— 总要通过下载、外接设备或漏洞进入你的机器,所以「不乱点、不乱插、及时打补丁」才是有效的防线。"
    },
    "en": {
      "prompt": "A \"computer virus\" is:",
      "options": [
        "A biological virus that infects people",
        "A kind of hardware failure",
        "A piece of software deliberately written to copy itself and damage systems",
        "A fault caused by dust inside the case"
      ],
      "explain": "A computer virus is **software**, not an organism: it attaches itself to other files or programs, copies and spreads when they run, and may delete data, encrypt files or steal credentials. It also never appears by itself — it gets in through downloads, removable devices or vulnerabilities, which is why \"don't click blindly, don't plug in blindly, patch promptly\" is the real defence."
    }
  },
  {
    "id": "faq-16",
    "sourceRef": "part2-29",
    "tier": "in",
    "tags": [
      "网络",
      "localhost"
    ],
    "answer": 1,
    "zh": {
      "prompt": "在浏览器或命令行里访问 `localhost`,指的是?",
      "options": [
        "运营商的入口服务器",
        "你正在用的这台机器自己",
        "离你最近的 CDN 节点",
        "某个公共的测试网站"
      ],
      "explain": "`localhost` 是**本机**的固定名字,通常解析到回环地址 `127.0.0.1`(IPv6 是 `::1`)。数据根本不经过网卡和网络,直接回到本机,所以断网也能用 —— 开发时说的「本地跑一个服务」就是把服务绑到它上面。这也意味着 `localhost` 在别人的机器上指的是**别人那台**,不是你的。"
    },
    "en": {
      "prompt": "Visiting `localhost` in a browser or a terminal refers to:",
      "options": [
        "Your ISP's entry server",
        "The very machine you are using",
        "The CDN node closest to you",
        "Some public testing website"
      ],
      "explain": "`localhost` is the fixed name for **this machine**, normally resolving to the loopback address `127.0.0.1` (`::1` for IPv6). Traffic never touches the network card or the network at all — it loops straight back — so it works even offline, which is why \"run a service locally\" means binding it here. It also means `localhost` on somebody else's computer points at **their** machine, not yours."
    }
  },
  {
    "id": "faq-17",
    "sourceRef": "part2-30",
    "tier": "in",
    "tags": [
      "网络",
      "单位换算"
    ],
    "answer": 3,
    "zh": {
      "prompt": "宽带标称 100 Mbps,下载速度理论上限大约是?",
      "options": [
        "100 MB/s",
        "1000 MB/s",
        "50 MB/s",
        "12.5 MB/s"
      ],
      "explain": "坑在**大小写**:`Mbps` 里的 `b` 是 bit,而下载软件显示的 `MB/s` 里的 `B` 是 Byte,`1 Byte = 8 bit`。100 Mbps ÷ 8 = **12.5 MB/s**。所以「百兆宽带」下到 12 MB/s 左右就是跑满了,并不是被限速 —— 这是最常见的「网速虚标」误会。"
    },
    "en": {
      "prompt": "A connection rated at 100 Mbps can download at about what theoretical maximum?",
      "options": [
        "100 MB/s",
        "1000 MB/s",
        "50 MB/s",
        "12.5 MB/s"
      ],
      "explain": "The trap is the **capitalisation**: the `b` in `Mbps` is a bit, while the `B` in the `MB/s` your download manager shows is a Byte, and `1 Byte = 8 bits`. So 100 Mbps ÷ 8 = **12.5 MB/s**. Hitting roughly 12 MB/s on a \"100 meg\" line means you are already maxed out, not throttled — the most common \"my speed is fake\" misunderstanding there is."
    }
  },
  {
    "id": "faq-18",
    "sourceRef": "part2-24",
    "tier": "in",
    "tags": [
      "安全",
      "密码"
    ],
    "answer": 2,
    "zh": {
      "prompt": "把密码从 `123456` 改成 `123456!`,安全性会怎样?",
      "options": [
        "达到军用级强度,可以放心通用",
        "已经足够安全,因为多了特殊字符",
        "仍然很弱 —— 长度太短且是常见弱口令,加个符号挡不住字典攻击",
        "变得安全,但只对中文网站有效"
      ],
      "explain": "密码强度主要看**长度**和**是否常见**,不是看有没有符号。`123456!` 依然短,而且早被收进常见的弱口令字典,攻击工具几秒就能试出来。真正有效的做法是:用**长**密码(一句话或随机词组),并且**不同网站不重复** —— 因为一个站泄露,撞库会拿它去试你所有的账号。"
    },
    "en": {
      "prompt": "If you change your password from `123456` to `123456!`, how secure does it become?",
      "options": [
        "Military grade — safe to reuse everywhere",
        "Secure enough, because it now has a special character",
        "Still very weak: it is short and a well-known weak password, and one symbol does not stop a dictionary attack",
        "Secure, but only on Chinese websites"
      ],
      "explain": "Password strength is mostly about **length** and **commonness**, not about whether a symbol is present. `123456!` is still short and long since included in weak-password dictionaries, so cracking tools try it in seconds. What actually works: a **long** password (a phrase or random words) that is **unique per site** — because when one site leaks, credential-stuffing will replay it against all your other accounts."
    }
  },
  {
    "id": "faq-19",
    "sourceRef": "part2-23",
    "tier": "in",
    "tags": [
      "安全",
      "隐私"
    ],
    "answer": 2,
    "zh": {
      "prompt": "浏览器的「无痕 / 隐私模式」实际能做到什么?",
      "options": [
        "完全隐身,任何人都查不到你访问过什么",
        "网站、网络运营商和你的老板都看不到你的访问记录",
        "主要减少本机记录，但网站或网络侧仍可能观察部分活动",
        "自动帮你翻墙并隐藏 IP"
      ],
      "explain": "无痕模式主要减少本机保存的浏览历史和会话 Cookie，并不自动隐藏 IP 或提供完全匿名。网站、网络管理员或运营商仍可能观察部分活动；HTTPS 会加密内容，但不会因无痕模式而让所有网络信息消失。"
    },
    "en": {
      "prompt": "What does a browser's \"incognito / private mode\" really do?",
      "options": [
        "Full invisibility — nobody can find out what you visited",
        "Websites, your ISP and your boss can none of them see your history",
        "It mainly reduces local records; sites and network operators may still observe some activity",
        "It automatically bypasses censorship and hides your IP"
      ],
      "explain": "Private browsing mainly limits local browsing history and session cookies. It does not automatically hide your IP or make you anonymous. Sites and network operators may still observe some activity; HTTPS encrypts content, so visibility is not the same as seeing every page detail."
    }
  },
  {
    "id": "faq-20",
    "sourceRef": "part2-31",
    "tier": "in",
    "tags": [
      "网络",
      "HTTPS"
    ],
    "answer": 1,
    "zh": {
      "prompt": "`HTTPS` 主要保证了什么?",
      "options": [
        "网站上写的内容一定是真的",
        "传输过程被加密,别人截获也看不懂 —— 但这**不代表**这个网站可信",
        "你的电脑从此不会中毒",
        "访问会自动匿名,不留任何痕迹"
      ],
      "explain": "`HTTPS` 保护的是**信道**:数据在传输途中被加密,中途截获也读不出内容,同时能验证你连的确实是这个域名。但它**不**审查网站的内容与人品 —— 钓鱼站同样可以申请到证书,所以「有小锁」只说明连接是加密的,不等于可以放心输入密码。内容真假、网站可信与否,要自己判断。"
    },
    "en": {
      "prompt": "What does `HTTPS` mainly guarantee?",
      "options": [
        "That whatever a website says is true",
        "That the traffic is encrypted so eavesdroppers cannot read it — which does **not** make the site trustworthy",
        "That your computer can no longer get infected",
        "That your visit is anonymous and leaves no trace"
      ],
      "explain": "`HTTPS` protects the **channel**: data is encrypted in transit so an interceptor cannot read it, and it proves you really are connected to that domain. It does **not** vet the site's content or its character — phishing sites can obtain certificates too, so the padlock only means the connection is encrypted, not that it is safe to type your password. Whether the content is true and the site trustworthy is still your call."
    }
  },
  {
    "id": "faq-21",
    "sourceRef": "part2-33",
    "tier": "in",
    "tags": [
      "硬件",
      "SSD"
    ],
    "answer": 3,
    "zh": {
      "prompt": "固态硬盘(SSD)比机械硬盘快,那么 SSD 的数据?",
      "options": [
        "永远不会丢失,不需要备份",
        "断电存放多久都能保证数据不变",
        "天然免疫病毒",
        "仍然必须备份 —— 而且它一旦损坏,数据往往比机械盘更难恢复"
      ],
      "explain": "SSD 使用非易失性闪存，但仍可能因器件故障、误删或长期存放等原因丢失数据。机械盘也会毫无预警地失效；恢复难度取决于具体故障、控制器、加密和 TRIM，任何一种介质都需要独立备份。"
    },
    "en": {
      "prompt": "An SSD is faster than a mechanical hard drive, so its data:",
      "options": [
        "Can never be lost and needs no backup",
        "Its data is guaranteed to survive indefinitely without power",
        "Is naturally immune to viruses",
        "Still absolutely needs backup — and when an SSD dies, recovery is often harder than from a mechanical drive"
      ],
      "explain": "SSDs use nonvolatile flash but can still lose data through failure, deletion, or long storage. Mechanical disks can also fail without warning. Recovery depends on the fault, controller, encryption, and TRIM; both media need independent backups."
    }
  },
  {
    "id": "faq-22",
    "sourceRef": "part2-28",
    "tier": "in",
    "tags": [
      "硬件",
      "液体"
    ],
    "answer": 1,
    "zh": {
      "prompt": "电脑进水后**立刻开机测试**一下还能不能用,通常会?",
      "options": [
        "机器自己发热,刚好把水烘干",
        "可能短路,把原本只是进水的故障扩大成烧毁主板",
        "等于做了一次水冷改造,性能更好",
        "对机器没影响,水会从散热孔流出去"
      ],
      "explain": "通电是进水后**最危险**的动作:水里的杂质会让本来不相连的线路导通,一通电就可能短路烧毁主板、硬盘等部件。正确顺序是**立刻断电**(拔电源、能拆就拆电池)、不要反复按开机键、尽快送修做拆机清洗烘干。即使当时看着能用,残留水分也会在后面慢慢腐蚀电路。"
    },
    "en": {
      "prompt": "After a computer gets wet, you immediately power it on to test whether it still works. Usually this:",
      "options": [
        "Lets the machine's own heat dry the water out",
        "Risks a short circuit that turns a merely wet machine into a burnt motherboard",
        "Amounts to a water-cooling upgrade, so it performs better",
        "Does no harm, since the water drains out through the vents"
      ],
      "explain": "Powering on is the **most dangerous** thing to do: impurities in the water bridge traces that should not connect, and the moment current flows you can short out the motherboard, the drive and more. The right order is **cut power immediately** (unplug it, remove the battery if you can), do not keep pressing the power button, and get it to a repair shop for disassembly, cleaning and drying. Even if it seems fine, lingering moisture corrodes the circuits later."
    }
  },
  {
    "id": "faq-23",
    "sourceRef": "part2-32",
    "tier": "in",
    "tags": [
      "二进制",
      "进制转换"
    ],
    "answer": 3,
    "zh": {
      "prompt": "二进制里的 `10` 等于十进制的多少?",
      "options": [
        "10",
        "1",
        "看具体场景而定",
        "2"
      ],
      "explain": "二进制**逢二进一**,所以 `10` 表示「一个 2 加零个 1」,即十进制的 **2**。刚学的人容易把 `10` 直接念成「十」,但在二进制里它永远读作「一零」。顺手记住一个对应关系会很有用:二进制 `1 / 10 / 100 / 1000` 分别是十进制 `1 / 2 / 4 / 8` —— 每多一位就是多乘一个 2。"
    },
    "en": {
      "prompt": "The binary number `10` equals which decimal value?",
      "options": [
        "10",
        "1",
        "It depends on the context",
        "2"
      ],
      "explain": "Binary **carries at two**, so `10` means \"one 2 plus zero 1s\" — decimal **2**. Beginners tend to read `10` as \"ten\", but in binary it is always \"one zero\". A useful pair to memorise: binary `1 / 10 / 100 / 1000` are decimal `1 / 2 / 4 / 8` — each extra digit multiplies by 2 again."
    }
  },
  {
    "id": "faq-24",
    "sourceRef": "part1-10",
    "tier": "in",
    "tags": [
      "安全",
      "防护"
    ],
    "answer": 0,
    "zh": {
      "prompt": "下列哪一种做法**真正**有助于防病毒?",
      "options": [
        "及时安装系统与软件的安全更新,并保持杀毒软件的正常运行",
        "直接关掉防火墙,让网络更通畅",
        "把杀毒软件的通知全部忽略,免得打扰",
        "从任何网站下载软件并直接双击安装,装完再说"
      ],
      "explain": "防病毒靠的是**减少入口 + 及时修补**:打补丁堵住已知漏洞、杀毒软件拦住已知样本、防火墙限制不必要的连接,三者配合。关掉防火墙、忽略杀毒警告等于把门敞开;随便双击来路不明的安装包,正是病毒最常见的入场方式。安全从来不是装一个软件就完了,而是习惯。"
    },
    "en": {
      "prompt": "Which of these **actually** helps prevent malware?",
      "options": [
        "Installing system and software security updates promptly, and keeping your antivirus running properly",
        "Turning the firewall off so the network runs more smoothly",
        "Ignoring all antivirus notifications so they stop interrupting you",
        "Downloading installers from any website and double-clicking them right away"
      ],
      "explain": "Prevention comes from **fewer entrances plus timely patching**: updates close known holes, antivirus blocks known samples, and a firewall limits needless connections — the three work together. Disabling the firewall or ignoring antivirus warnings is leaving the door open, and double-clicking installers of unknown origin is exactly how malware most often gets in. Security is a habit, not a program you install once."
    }
  }
];

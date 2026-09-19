import type { LocalizedQuestion } from '../types';

/** Missing questions from 题库.docx; sourceRef maps to docs/question-bank-source.json. */
export const documentQuestions: LocalizedQuestion[] = [
  {
    "id": "doc-part1-03",
    "sourceRef": "part1-03",
    "tier": "ez",
    "tags": [
      "常识"
    ],
    "answer": 2,
    "zh": {
      "prompt": "“Ctrl+Z”通常用来？",
      "options": [
        "保存",
        "打印",
        "撤销",
        "删除"
      ],
      "explain": "Ctrl+Z 通常撤销最近一次可撤销的操作。保存一般使用 Ctrl+S，打印通常使用 Ctrl+P，删除则是另一个命令；具体快捷键仍取决于应用。"
    },
    "en": {
      "prompt": "What does Ctrl+Z usually do?",
      "options": [
        "Save",
        "Print",
        "Undo",
        "Delete"
      ],
      "explain": "Ctrl+Z usually undoes the last reversible action. Ctrl+S normally saves and Ctrl+P prints; deleting is a separate command. Applications may customize shortcuts."
    }
  },
  {
    "id": "doc-part1-04",
    "sourceRef": "part1-04",
    "tier": "ez",
    "tags": [
      "故障处理"
    ],
    "answer": 1,
    "zh": {
      "prompt": "电脑死机时，IT部门首先会建议你做什么？",
      "options": [
        "换CPU",
        "重启",
        "砸屏幕",
        "念咒语"
      ],
      "explain": "遇到一般软件卡死时，重启能清除临时状态并重新加载系统。能正常重启时优先正常重启，强制关机会丢失未保存的数据，不能修复所有硬件故障。"
    },
    "en": {
      "prompt": "When a computer freezes, what would IT usually suggest trying first?",
      "options": [
        "Replace the CPU",
        "Restart it",
        "Smash the screen",
        "Cast a spell"
      ],
      "explain": "For an ordinary software freeze, restarting clears temporary state and reloads the system. Prefer a normal restart when possible; forcing power off can lose unsaved work and does not fix every hardware fault."
    }
  },
  {
    "id": "doc-part1-14",
    "sourceRef": "part1-14",
    "tier": "ez",
    "tags": [
      "常识"
    ],
    "answer": 1,
    "zh": {
      "prompt": "bug指的是？",
      "options": [
        "挂",
        "程序错误或缺陷",
        "python爬虫",
        "广东双马尾"
      ],
      "explain": "软件里的 bug 指程序中的错误或缺陷，可能导致错误结果、崩溃或异常行为。安全漏洞只是其中一类，并不是所有 bug 都能被用于攻击系统。"
    },
    "en": {
      "prompt": "In software, what does a bug mean?",
      "options": [
        "A cheat or hack",
        "A program defect",
        "A Python web crawler",
        "A joke about Guangdong pigtails"
      ],
      "explain": "A software bug is a defect that can cause incorrect results, crashes, or unexpected behavior. A security vulnerability is one kind of bug; not every bug can be exploited."
    }
  },
  {
    "id": "doc-part1-15",
    "sourceRef": "part1-15",
    "tier": "hd",
    "tags": [
      "安全"
    ],
    "answer": 2,
    "zh": {
      "prompt": "以下哪一个是危害电脑软件安全的行为？",
      "options": [
        "拿mac打游戏",
        "外接键盘",
        "为了增快网速把防火墙卸了",
        "定期重启终止后台程序运行"
      ],
      "explain": "防火墙负责按规则限制网络连接，卸载它会减少系统的防护。为了所谓网速提升而关闭防护不是可靠的优化方式，外接键盘也不会天然降低软件安全。"
    },
    "en": {
      "prompt": "Which behavior harms a computer's software security?",
      "options": [
        "Playing games on a Mac",
        "Connecting a keyboard",
        "Removing the firewall to speed up the network",
        "Restarting periodically to stop background processes"
      ],
      "explain": "A firewall restricts network connections according to rules. Removing it weakens protection; doing so for a supposed speed boost is not a sound optimization. Connecting a keyboard is not inherently unsafe."
    }
  },
  {
    "id": "doc-part1-16",
    "sourceRef": "part1-16",
    "tier": "ez",
    "tags": [
      "数据单位"
    ],
    "answer": 2,
    "zh": {
      "prompt": "本题按二进制进位约定，1 KB 等于多少 Byte？",
      "options": [
        "100",
        "512",
        "1024",
        "2048"
      ],
      "explain": "本题明确采用二进制进位，因此答案是 1024 字节。更严格的单位写法是 1 KiB = 1024 B，而十进制的 1 kB = 1000 B，不能混用两种约定。"
    },
    "en": {
      "prompt": "Using the binary convention in this question, 1 KB means how many bytes?",
      "options": [
        "100",
        "512",
        "1024",
        "2048"
      ],
      "explain": "Under the stated binary convention, the answer is 1024 bytes. Strict unit notation uses 1 KiB = 1024 B and decimal 1 kB = 1000 B; the convention must be specified."
    }
  },
  {
    "id": "doc-part1-17",
    "sourceRef": "part1-17",
    "tier": "ez",
    "tags": [
      "内存与硬盘"
    ],
    "answer": 1,
    "zh": {
      "prompt": "计算机断电后，数据通常会丢失的是？",
      "options": [
        "硬盘",
        "内存",
        "U盘",
        "光盘"
      ],
      "explain": "普通 RAM 是易失性存储，断电后其中的工作数据通常丢失。硬盘、U 盘和光盘用于非易失存储；保存文档就是把内存中的内容写入持久存储。"
    },
    "en": {
      "prompt": "Which normally loses its data when the computer loses power?",
      "options": [
        "Hard disk",
        "RAM",
        "USB flash drive",
        "Optical disc"
      ],
      "explain": "Ordinary RAM is volatile, so its working data is normally lost without power. Hard drives, flash drives, and optical discs are nonvolatile; saving writes working data to persistent storage."
    }
  },
  {
    "id": "doc-part1-18",
    "sourceRef": "part1-18",
    "tier": "ez",
    "tags": [
      "操作系统"
    ],
    "answer": 2,
    "zh": {
      "prompt": "下列哪个是操作系统？",
      "options": [
        "Word",
        "Excel",
        "Windows",
        "Chrome"
      ],
      "explain": "Windows 是操作系统，负责管理硬件、进程与文件等资源。Word 是文字处理软件，Excel 是电子表格软件，Chrome 是浏览器，后三者通常运行在操作系统之上。"
    },
    "en": {
      "prompt": "Which of these is an operating system?",
      "options": [
        "Word",
        "Excel",
        "Windows",
        "Chrome"
      ],
      "explain": "Windows is an operating system that manages hardware, processes, and files. Word processes documents, Excel handles spreadsheets, and Chrome is a browser; these are applications running on an OS."
    }
  },
  {
    "id": "doc-part1-19",
    "sourceRef": "part1-19",
    "tier": "ez",
    "tags": [
      "Web"
    ],
    "answer": 2,
    "zh": {
      "prompt": "下列哪个是浏览器？",
      "options": [
        "Windows",
        "Excel",
        "Chrome",
        "记事本"
      ],
      "explain": "Chrome 是用于访问网页的浏览器。Windows 是操作系统，Excel 用于电子表格，记事本用于编辑纯文本，不能把所有软件都当成浏览器。"
    },
    "en": {
      "prompt": "Which of these is a web browser?",
      "options": [
        "Windows",
        "Excel",
        "Chrome",
        "Notepad"
      ],
      "explain": "Chrome is a web browser used to access web pages. Windows is an operating system, Excel is a spreadsheet application, and Notepad edits plain text."
    }
  },
  {
    "id": "doc-part1-20",
    "sourceRef": "part1-20",
    "tier": "ez",
    "tags": [
      "网络"
    ],
    "answer": 1,
    "zh": {
      "prompt": "电子邮件地址中通常必须有的符号是？",
      "options": [
        "#",
        "@",
        "$",
        "%"
      ],
      "explain": "电子邮件地址通常采用 用户名@域名 的形式，@ 用于分隔本地账号部分与邮件域名。它不是网站 URL 中协议和主机名之间使用的分隔符。"
    },
    "en": {
      "prompt": "Which symbol normally appears in an email address?",
      "options": [
        "#",
        "@",
        "$",
        "%"
      ],
      "explain": "An email address normally has the form local-part@domain. The @ separates the mailbox name from its domain; it is not the separator between a URL scheme and host."
    }
  },
  {
    "id": "doc-part1-21",
    "sourceRef": "part1-21",
    "tier": "ez",
    "tags": [
      "操作系统"
    ],
    "answer": 1,
    "zh": {
      "prompt": "正确关闭电脑通常应？",
      "options": [
        "直接拔电源",
        "开始菜单选择关机",
        "长按电源直到断电",
        "关闭显示器即可"
      ],
      "explain": "正常关机让系统通知程序退出并完成待写入的数据。直接拔电源或强制断电可能丢失未保存内容；关闭显示器仅停止显示，并没有关闭主机。"
    },
    "en": {
      "prompt": "What is the usual way to shut down a working computer safely?",
      "options": [
        "Unplug it immediately",
        "Choose Shut down from the Start menu",
        "Hold the power button until power is cut",
        "Only turn off the monitor"
      ],
      "explain": "A normal shutdown lets applications exit and the system finish pending writes. Pulling power or forcing power off can lose unsaved data; switching off the monitor does not shut down the computer."
    }
  },
  {
    "id": "doc-part1-22",
    "sourceRef": "part1-22",
    "tier": "ez",
    "tags": [
      "文件"
    ],
    "answer": 0,
    "zh": {
      "prompt": "文件被删除到回收站后，通常可以？",
      "options": [
        "直接还原",
        "变成病毒",
        "自动发送",
        "增大内存"
      ],
      "explain": "文件仍在回收站时通常可以选择还原，回到原来的位置。这与清空回收站不同；清空后是否还能恢复要看存储介质、覆盖情况和系统行为。"
    },
    "en": {
      "prompt": "After moving a file to the Recycle Bin, what can you usually do?",
      "options": [
        "Restore it",
        "Turn it into a virus",
        "Send it automatically",
        "Increase RAM"
      ],
      "explain": "A file still in the Recycle Bin can usually be restored to its original location. This differs from emptying the bin, after which recovery depends on the medium, overwriting, and system behavior."
    }
  },
  {
    "id": "doc-part1-23",
    "sourceRef": "part1-23",
    "tier": "ez",
    "tags": [
      "文件"
    ],
    "answer": 1,
    "zh": {
      "prompt": "文件夹的主要作用是？",
      "options": [
        "提高CPU频率",
        "分类管理文件",
        "杀毒",
        "增大内存"
      ],
      "explain": "文件夹用来组织和分类文件，可以形成层级目录，便于查找与管理。它是文件系统的组织方式，不会增加物理内存，也不会自动提升处理器性能。"
    },
    "en": {
      "prompt": "What is the main purpose of folders?",
      "options": [
        "Increase CPU frequency",
        "Organize files",
        "Remove viruses",
        "Increase RAM"
      ],
      "explain": "Folders organize files into a directory hierarchy for easier browsing and management. They are a filesystem structure and do not add physical memory or increase CPU performance."
    }
  },
  {
    "id": "doc-part1-24",
    "sourceRef": "part1-24",
    "tier": "ez",
    "tags": [
      "常识"
    ],
    "answer": 1,
    "zh": {
      "prompt": "在桌面上打开程序，通常可以？",
      "options": [
        "对着屏幕喊",
        "双击图标",
        "拔掉鼠标",
        "关机"
      ],
      "explain": "常见桌面设置中，双击程序图标会启动程序。有些系统可配置为单击打开，也可以通过键盘启动；本题问的是通常的默认桌面操作方式。"
    },
    "en": {
      "prompt": "Under the usual desktop settings, how do you open a program icon?",
      "options": [
        "Shout at the screen",
        "Double-click it",
        "Unplug the mouse",
        "Shut down the computer"
      ],
      "explain": "Under common desktop settings, double-clicking a program icon launches it. Some systems can use single-click opening and keyboard activation; this asks about the usual desktop interaction."
    }
  },
  {
    "id": "doc-part1-25",
    "sourceRef": "part1-25",
    "tier": "ez",
    "tags": [
      "输入输出"
    ],
    "answer": 2,
    "zh": {
      "prompt": "下列哪个是输入设备？",
      "options": [
        "显示器",
        "打印机",
        "键盘",
        "音箱"
      ],
      "explain": "键盘将用户按键转成计算机能接收的输入信号。显示器、打印机与音箱主要把计算机处理结果呈现给用户，因此在本题中属于输出设备。"
    },
    "en": {
      "prompt": "Which is an input device?",
      "options": [
        "Monitor",
        "Printer",
        "Keyboard",
        "Speakers"
      ],
      "explain": "A keyboard converts keystrokes into input for a computer. A monitor, printer, and speakers primarily present the computer's output to the user."
    }
  },
  {
    "id": "doc-part1-26",
    "sourceRef": "part1-26",
    "tier": "ez",
    "tags": [
      "输入输出"
    ],
    "answer": 3,
    "zh": {
      "prompt": "下列哪个是输出设备？",
      "options": [
        "鼠标",
        "键盘",
        "扫描仪",
        "显示器"
      ],
      "explain": "显示器把计算机处理后的内容以图像形式显示出来，因此属于输出设备。鼠标、键盘和扫描仪则把外界信息送入计算机，主要承担输入功能。"
    },
    "en": {
      "prompt": "Which is an output device?",
      "options": [
        "Mouse",
        "Keyboard",
        "Scanner",
        "Monitor"
      ],
      "explain": "A monitor displays the computer's results as images, making it an output device. A mouse, keyboard, and scanner primarily send information into the computer."
    }
  },
  {
    "id": "doc-part1-27",
    "sourceRef": "part1-27",
    "tier": "ez",
    "tags": [
      "硬件"
    ],
    "answer": 0,
    "zh": {
      "prompt": "下列哪个是存储设备？",
      "options": [
        "U盘",
        "鼠标",
        "显示器",
        "键盘"
      ],
      "explain": "U 盘使用闪存保存文件，断开电源后通常仍能保留数据，所以属于存储设备。鼠标和键盘是输入设备，显示器是输出设备，分类依据是主要功能。"
    },
    "en": {
      "prompt": "Which is a storage device?",
      "options": [
        "USB flash drive",
        "Mouse",
        "Monitor",
        "Keyboard"
      ],
      "explain": "A USB flash drive stores files in flash memory and normally retains them without power. Mice and keyboards are input devices, while a monitor is an output device."
    }
  },
  {
    "id": "doc-part1-28",
    "sourceRef": "part1-28",
    "tier": "ez",
    "tags": [
      "二进制"
    ],
    "answer": 2,
    "zh": {
      "prompt": "二进制数只有哪两个数字？",
      "options": [
        "1和2",
        "0和9",
        "0和1",
        "2和8"
      ],
      "explain": "二进制使用 0 和 1 两个数码，每一位的权值是 2 的幂。出现进位时向左增加一位，并不是使用十进制中的数字 2 来表示这一位。"
    },
    "en": {
      "prompt": "Which two digits does binary use?",
      "options": [
        "1 and 2",
        "0 and 9",
        "0 and 1",
        "2 and 8"
      ],
      "explain": "Binary uses only 0 and 1, with place values that are powers of two. Carrying moves into the next position rather than introducing the digit 2."
    }
  },
  {
    "id": "doc-part1-29",
    "sourceRef": "part1-29",
    "tier": "hd",
    "tags": [
      "二进制"
    ],
    "answer": 1,
    "zh": {
      "prompt": "十进制数 10 转换成二进制是？",
      "options": [
        "1000",
        "1010",
        "1100",
        "1110"
      ],
      "explain": "十进制 10 = 8 + 2，所以在 8、4、2、1 四个位权上依次填 1、0、1、0，得到二进制 1010。1000 对应 8，1100 对应 12，1110 对应 14。"
    },
    "en": {
      "prompt": "What is decimal 10 in binary?",
      "options": [
        "1000",
        "1010",
        "1100",
        "1110"
      ],
      "explain": "Decimal 10 equals 8 + 2. In the 8, 4, 2, 1 positions this gives 1, 0, 1, 0: binary 1010. The other choices represent 8, 12, and 14."
    }
  },
  {
    "id": "doc-part1-30",
    "sourceRef": "part1-30",
    "tier": "ez",
    "tags": [
      "扩展名"
    ],
    "answer": 1,
    "zh": {
      "prompt": "“.txt”通常是？",
      "options": [
        "图片",
        "文本",
        "音频",
        "视频"
      ],
      "explain": ".txt 通常表示纯文本文件，保存可读字符而不是复杂排版。扩展名只是文件命名约定，修改后缀不会自动把图片、音频或视频转换成文本内容。"
    },
    "en": {
      "prompt": "What does a .txt file usually contain?",
      "options": [
        "Images",
        "Plain text",
        "Audio",
        "Video"
      ],
      "explain": "The .txt extension usually denotes plain text without rich document layout. An extension is a naming convention; renaming a media file does not convert its contents to text."
    }
  },
  {
    "id": "doc-part1-31",
    "sourceRef": "part1-31",
    "tier": "ez",
    "tags": [
      "扩展名"
    ],
    "answer": 2,
    "zh": {
      "prompt": "“.mp3”通常是？",
      "options": [
        "图片",
        "文档",
        "音频",
        "压缩包"
      ],
      "explain": "MP3 是常见的有损音频编码格式，常用于音乐和录音。它不是图片或电子文档格式；虽然采用压缩编码，也不能因此把它当成通用压缩包。"
    },
    "en": {
      "prompt": "What is an .mp3 file usually used for?",
      "options": [
        "Images",
        "Documents",
        "Audio",
        "Compressed archives"
      ],
      "explain": "MP3 is a common lossy audio format used for music and recordings. Although it compresses audio, it is not a general-purpose archive format, image, or document."
    }
  },
  {
    "id": "doc-part1-32",
    "sourceRef": "part1-32",
    "tier": "ez",
    "tags": [
      "扩展名"
    ],
    "answer": 1,
    "zh": {
      "prompt": "“.mp4”通常是？",
      "options": [
        "文本",
        "视频",
        "图片",
        "表格"
      ],
      "explain": "MP4 是多媒体容器，常见用途是存放视频，也可以包含音频、字幕等流。因此在这些选项中选视频，但不能说每个 MP4 文件必定包含视频。"
    },
    "en": {
      "prompt": "What is an .mp4 file most commonly associated with?",
      "options": [
        "Text",
        "Video",
        "Images",
        "Spreadsheets"
      ],
      "explain": "MP4 is a multimedia container commonly associated with video and can also hold audio and subtitles. Video is the best option here, though an MP4 file need not contain video."
    }
  },
  {
    "id": "doc-part1-33",
    "sourceRef": "part1-33",
    "tier": "ez",
    "tags": [
      "常识"
    ],
    "answer": 2,
    "zh": {
      "prompt": "下列哪个是文字处理软件？",
      "options": [
        "画图",
        "计算器",
        "Word",
        "浏览器"
      ],
      "explain": "Word 是文字处理软件，可编辑文档并设置段落、字体和页面布局。画图主要处理图像，计算器用于计算，浏览器主要访问网页，软件用途不同。"
    },
    "en": {
      "prompt": "Which is word-processing software?",
      "options": [
        "Paint",
        "Calculator",
        "Word",
        "A web browser"
      ],
      "explain": "Word is a word processor for editing documents and their layout. Paint handles images, Calculator performs calculations, and a browser primarily accesses web pages."
    }
  },
  {
    "id": "doc-part1-34",
    "sourceRef": "part1-34",
    "tier": "ez",
    "tags": [
      "常识"
    ],
    "answer": 3,
    "zh": {
      "prompt": "下列哪个是电子表格软件？",
      "options": [
        "记事本",
        "画图",
        "播放器",
        "Excel"
      ],
      "explain": "Excel 用单元格组织数据，支持公式计算、表格和图表。记事本是纯文本编辑器，画图处理图片，播放器播放媒体，不能与电子表格软件混为一谈。"
    },
    "en": {
      "prompt": "Which is spreadsheet software?",
      "options": [
        "Notepad",
        "Paint",
        "A media player",
        "Excel"
      ],
      "explain": "Excel organizes data in cells and supports formulas, tables, and charts. Notepad edits plain text, Paint edits images, and a media player plays audio or video."
    }
  },
  {
    "id": "doc-part1-35",
    "sourceRef": "part1-35",
    "tier": "ez",
    "tags": [
      "Web"
    ],
    "answer": 1,
    "zh": {
      "prompt": "上网浏览网页通常使用？",
      "options": [
        "计算器",
        "浏览器",
        "画图",
        "杀毒软件"
      ],
      "explain": "浏览器负责请求网页资源并把网页呈现给用户，常见例子有 Chrome、Firefox 和 Edge。计算器、画图及杀毒软件各有用途，不是通常的网页浏览工具。"
    },
    "en": {
      "prompt": "What do you normally use to browse web pages?",
      "options": [
        "Calculator",
        "A web browser",
        "Paint",
        "Antivirus software"
      ],
      "explain": "A web browser requests and displays web content; examples include Chrome, Firefox, and Edge. Calculators, image editors, and antivirus tools serve other primary purposes."
    }
  },
  {
    "id": "doc-part1-36",
    "sourceRef": "part1-36",
    "tier": "hd",
    "tags": [
      "网络"
    ],
    "answer": 2,
    "zh": {
      "prompt": "网址中的 .com 最初主要面向哪一类机构？",
      "options": [
        "个人",
        "政府",
        "商业机构",
        "学校"
      ],
      "explain": ".com 最初面向商业机构，因此选商业机构。如今注册用途并不严格局限于公司，看到 .com 不能据此判断网站可信，也不能证明它由某种特定机构运营。"
    },
    "en": {
      "prompt": "What was the .com domain suffix originally associated with?",
      "options": [
        "Individuals",
        "Government",
        "Commercial organizations",
        "Schools"
      ],
      "explain": "The .com suffix was originally associated with commercial organizations. Its use is now broad, so it does not prove a site's trustworthiness or the nature of its owner."
    }
  },
  {
    "id": "doc-part1-37",
    "sourceRef": "part1-37",
    "tier": "ez",
    "tags": [
      "网络"
    ],
    "answer": 3,
    "zh": {
      "prompt": "Wi-Fi 是一种？",
      "options": [
        "硬盘接口",
        "图片格式",
        "编程语言",
        "无线网络技术"
      ],
      "explain": "Wi-Fi 是无线局域网技术，允许设备通过无线电连接到局域网。连接 Wi-Fi 不一定能访问互联网，还需要上游网络正常并具备相应的访问权限。"
    },
    "en": {
      "prompt": "What is Wi-Fi?",
      "options": [
        "A hard-drive interface",
        "An image format",
        "A programming language",
        "Wireless networking technology"
      ],
      "explain": "Wi-Fi provides wireless local networking. Joining a Wi-Fi network does not by itself guarantee internet access; the upstream connection and access permissions must also work."
    }
  },
  {
    "id": "doc-part1-38",
    "sourceRef": "part1-38",
    "tier": "ez",
    "tags": [
      "网络"
    ],
    "answer": 1,
    "zh": {
      "prompt": "蓝牙通常用于？",
      "options": [
        "给电脑供电",
        "短距离无线连接",
        "增大硬盘",
        "显示图像"
      ],
      "explain": "蓝牙常用于耳机、鼠标、键盘等设备之间的短距离无线通信。它传输数据，不会给电脑提供电源或增加硬盘容量，实际距离取决于设备与环境。"
    },
    "en": {
      "prompt": "What is Bluetooth commonly used for?",
      "options": [
        "Powering a computer",
        "Short-range wireless connections",
        "Increasing disk capacity",
        "Displaying images"
      ],
      "explain": "Bluetooth is commonly used for short-range wireless links to headphones, mice, keyboards, and similar devices. It transfers data rather than supplying computer power or adding storage."
    }
  },
  {
    "id": "doc-part1-39",
    "sourceRef": "part1-39",
    "tier": "hd",
    "tags": [
      "安全"
    ],
    "answer": 2,
    "zh": {
      "prompt": "安装软件时，较安全的做法是？",
      "options": [
        "从陌生论坛下载破解版",
        "关闭杀毒软件",
        "从官网下载",
        "随便点广告"
      ],
      "explain": "从确认过的官方网站或可信应用商店获取软件，更容易核实发布者并降低被篡改的风险。仍需检查网址和安装提示，不能因为名字熟悉就关闭安全防护。"
    },
    "en": {
      "prompt": "Which is the safer way to install software?",
      "options": [
        "Download cracked software from an unknown forum",
        "Disable antivirus protection",
        "Download from the official website",
        "Click an arbitrary advertisement"
      ],
      "explain": "Using a verified official website or trusted app store helps establish the publisher and reduces tampering risk. Check the address and installation prompts rather than disabling security protection."
    }
  },
  {
    "id": "doc-part1-40",
    "sourceRef": "part1-40",
    "tier": "hd",
    "tags": [
      "密码"
    ],
    "answer": 2,
    "zh": {
      "prompt": "密码安全的基本做法是？",
      "options": [
        "告诉同学",
        "设成123456",
        "使用足够长且不复用的密码，发现泄露后及时更换",
        "写在屏幕上"
      ],
      "explain": "密码应足够长、避免常见弱口令，并且每个账号使用不同密码。发现泄露时立即更换；没有泄露迹象时，不应把定期强制换密码当成安全性的主要来源。"
    },
    "en": {
      "prompt": "Which is a good basic password practice?",
      "options": [
        "Tell classmates your password",
        "Use 123456",
        "Use long, unique passwords and change compromised ones promptly",
        "Write it on the screen"
      ],
      "explain": "Use long passwords that are not common or predictable, with a unique one for each account. Change compromised passwords promptly; routine forced changes are not the main source of password strength."
    }
  },
  {
    "id": "doc-part2-01",
    "sourceRef": "part2-01",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行 print(type(3.14)) 的输出是",
      "options": [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'str'>",
        "<class 'bool'>"
      ],
      "explain": "3.14 是带小数点的浮点数字面量，type 返回其类型 float。print 显示类型对象时会输出 <class 'float'>，而不是整数、字符串或布尔类型。"
    },
    "en": {
      "prompt": "What does `print(type(3.14))` output in Python?",
      "options": [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'str'>",
        "<class 'bool'>"
      ],
      "explain": "The literal 3.14 is a floating-point number. Its type is float, so printing the type object produces <class 'float'> rather than int, str, or bool."
    }
  },
  {
    "id": "doc-part2-02",
    "sourceRef": "part2-02",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 2,
    "zh": {
      "prompt": "下列变量名合法的是",
      "options": [
        "2name",
        "my-name",
        "_score",
        "class"
      ],
      "explain": "Python 标识符可以以下划线或合适的字母开头，不能以数字开头，不能包含作为减号的连字符，也不能使用保留关键字。四个选项中只有 _score 满足这些条件。"
    },
    "en": {
      "prompt": "Which is a valid Python variable name?",
      "options": [
        "2name",
        "my-name",
        "_score",
        "class"
      ],
      "explain": "A Python identifier can start with an underscore or an allowed letter. It cannot start with a digit, contain a hyphen as part of its name, or be a reserved keyword. Only _score qualifies."
    }
  },
  {
    "id": "doc-part2-03",
    "sourceRef": "part2-03",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 0,
    "zh": {
      "prompt": "执行 print(7 // 2, 7 % 2) 的输出是",
      "options": [
        "3 1",
        "3.5 1",
        "3 0",
        "4 1"
      ],
      "explain": "对正整数来说，7 除以 2 的整数商是 3，余数是 1。// 得到向下取整的商，% 得到余数，print 默认在两个输出值之间加一个空格，所以输出 3 1。"
    },
    "en": {
      "prompt": "What does `print(7 // 2, 7 % 2)` output?",
      "options": [
        "3 1",
        "3.5 1",
        "3 0",
        "4 1"
      ],
      "explain": "Seven divided by two has floor quotient 3 and remainder 1. The // operator gives the floor quotient, % gives the remainder, and print separates the two results with a space."
    }
  },
  {
    "id": "doc-part2-04",
    "sourceRef": "part2-04",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 0,
    "zh": {
      "prompt": "执行 print(\"abc\" + \"def\") 的输出是",
      "options": [
        "abcdef",
        "abc def",
        "abc+def",
        "报错"
      ],
      "explain": "字符串的加号表示拼接，直接把右侧字符串接到左侧后面，不会额外加入空格或保留加号。因此 abc 与 def 拼接后是 abcdef，并不会触发类型错误。"
    },
    "en": {
      "prompt": "What does `print(\"abc\" + \"def\")` output?",
      "options": [
        "abcdef",
        "abc def",
        "abc+def",
        "An error"
      ],
      "explain": "Adding two strings concatenates them without inserting a space or retaining the plus sign. Thus abc and def become abcdef, with no type error."
    }
  },
  {
    "id": "doc-part2-05",
    "sourceRef": "part2-05",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行 print(\"Python\"[1:4]) 的输出是",
      "options": [
        "Pyt",
        "yth",
        "ytho",
        "tho"
      ],
      "explain": "Python 的字符串下标从 0 开始，切片 [1:4] 包含下标 1、2、3，但不包含 4。对应字符是 y、t、h，拼起来为 yth，不能把右端字符 o 也算进去。"
    },
    "en": {
      "prompt": "What does `print(\"Python\"[1:4])` output?",
      "options": [
        "Pyt",
        "yth",
        "ytho",
        "tho"
      ],
      "explain": "Python indexes strings from zero. The slice [1:4] includes positions 1, 2, and 3 but excludes 4, selecting y, t, and h to produce yth."
    }
  },
  {
    "id": "doc-part2-06",
    "sourceRef": "part2-06",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行 print(len(\"Hello\")) 的输出是",
      "options": [
        "4",
        "5",
        "6",
        "报错"
      ],
      "explain": "len 返回字符串中字符的数量，Hello 共有 H、e、l、l、o 五个字符。长度是 5，与最后一个字符的下标 4 不同，也不计算源码中包围字符串的引号。"
    },
    "en": {
      "prompt": "What does `print(len(\"Hello\"))` output?",
      "options": [
        "4",
        "5",
        "6",
        "An error"
      ],
      "explain": "len counts the characters in the string. Hello has five characters; its length is 5 even though its last index is 4. The source-code quotation marks are not counted."
    }
  },
  {
    "id": "doc-part2-07",
    "sourceRef": "part2-07",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 0,
    "zh": {
      "prompt": "执行以下代码，输出结果是",
      "options": [
        "A",
        "B",
        "AB",
        "报错"
      ],
      "explain": "变量 x 为 5，条件 x > 3 为真，所以执行 if 分支输出 A。else 分支不会执行；这是一组互斥分支，不会把两个 print 都执行而输出 AB。"
    },
    "en": {
      "prompt": "What does the following Python code output?",
      "options": [
        "A",
        "B",
        "AB",
        "An error"
      ],
      "explain": "x is 5, so x > 3 is true and the if branch prints A. The else branch is skipped; these branches are mutually exclusive and do not both print."
    },
    "code": "x = 5\nif x > 3:\n    print(\"A\")\nelse:\n    print(\"B\")",
    "lang": "python"
  },
  {
    "id": "doc-part2-08",
    "sourceRef": "part2-08",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行以下代码，输出结果是",
      "options": [
        "1 2 3",
        "0 1 2",
        "0 1 2 3",
        "1 2"
      ],
      "explain": "range(3) 从 0 开始，依次生成 0、1、2，右端的 3 不包含在内。每次 print 使用 end=\" \"，因此结果在同一行以空格分隔，末尾还带一个空格。"
    },
    "en": {
      "prompt": "What does the following Python loop output (ignoring the trailing space)?",
      "options": [
        "1 2 3",
        "0 1 2",
        "0 1 2 3",
        "1 2"
      ],
      "explain": "range(3) yields 0, 1, and 2, excluding 3. Each print uses a space as its ending, so the values appear on one line separated by spaces, including a final trailing space."
    },
    "code": "for i in range(3):\n    print(i, end=\" \")",
    "lang": "python"
  },
  {
    "id": "doc-part2-09",
    "sourceRef": "part2-09",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行以下代码，循环体执行几次",
      "options": [
        "3",
        "4",
        "5",
        "无限"
      ],
      "explain": "i 初值为 0，进入循环时依次是 0、1、2、3，共执行四次 i += 1。第四次后 i 变成 4，条件 i < 4 为假而停止，不会再执行第五次。"
    },
    "en": {
      "prompt": "How many times does the body of this Python loop execute?",
      "options": [
        "3",
        "4",
        "5",
        "Forever"
      ],
      "explain": "The loop starts with i equal to 0. It executes for i values 0, 1, 2, and 3. After four increments i is 4, so i < 4 becomes false."
    },
    "code": "i = 0\nwhile i < 4:\n    i += 1",
    "lang": "python"
  },
  {
    "id": "doc-part2-10",
    "sourceRef": "part2-10",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 0,
    "zh": {
      "prompt": "执行 print([1, 2, 3] + [4, 5]) 的输出是",
      "options": [
        "[1, 2, 3, 4, 5]",
        "[5, 7]",
        "[1, 2, 3, [4, 5]]",
        "报错"
      ],
      "explain": "两个列表相加表示拼接，保留原元素顺序，得到五个元素的列表。它不是逐位置进行数值相加，也不会把右侧整个列表作为一个嵌套元素追加进去。"
    },
    "en": {
      "prompt": "What does `print([1, 2, 3] + [4, 5])` output?",
      "options": [
        "[1, 2, 3, 4, 5]",
        "[5, 7]",
        "[1, 2, 3, [4, 5]]",
        "An error"
      ],
      "explain": "Adding lists concatenates their elements in order. It does not add values element by element or append the entire second list as one nested element."
    }
  },
  {
    "id": "doc-part2-11",
    "sourceRef": "part2-11",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 2,
    "zh": {
      "prompt": "执行 a = [10, 20, 30]; print(a[-1]) 的输出是",
      "options": [
        "10",
        "20",
        "30",
        "报错"
      ],
      "explain": "Python 列表的负下标从尾部计数，-1 指最后一个元素，-2 指倒数第二个。这里最后一个元素是 30，负下标合法，并不会因为小于零而报错。"
    },
    "en": {
      "prompt": "What does `a = [10, 20, 30]; print(a[-1])` output?",
      "options": [
        "10",
        "20",
        "30",
        "An error"
      ],
      "explain": "Negative list indexes count from the end in Python. Index -1 refers to the last element, which is 30 here; a negative index is not automatically an error."
    }
  },
  {
    "id": "doc-part2-12",
    "sourceRef": "part2-12",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行以下代码，输出结果是",
      "options": [
        "3",
        "4",
        "5",
        "报错"
      ],
      "explain": "列表原有三个元素，append(4) 在末尾追加一个元素后变成 [1,2,3,4]。len 计算元素个数，因此输出 4，而不是把元素值相加得到总和。"
    },
    "en": {
      "prompt": "What does the following Python code output?",
      "options": [
        "3",
        "4",
        "5",
        "An error"
      ],
      "explain": "The list starts with three elements. append(4) adds one element, making [1, 2, 3, 4]. len counts those four elements rather than summing their values."
    },
    "code": "a = [1, 2, 3]\na.append(4)\nprint(len(a))",
    "lang": "python"
  },
  {
    "id": "doc-part2-13",
    "sourceRef": "part2-13",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 0,
    "zh": {
      "prompt": "执行以下代码，输出结果是",
      "options": [
        "14",
        "24",
        "7",
        "12"
      ],
      "explain": "函数 f(x) 返回 x 的两倍，因此 f(3) 是 6，f(4) 是 8，相加得到 14。两个函数分别求值后再做加法，不能把加号误看成乘号。"
    },
    "en": {
      "prompt": "What does the following Python function call output?",
      "options": [
        "14",
        "24",
        "7",
        "12"
      ],
      "explain": "The function doubles its argument, so f(3) returns 6 and f(4) returns 8. The two returned values are then added, giving 14."
    },
    "code": "def f(x):\n    return x * 2\nprint(f(3) + f(4))",
    "lang": "python"
  },
  {
    "id": "doc-part2-14",
    "sourceRef": "part2-14",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行以下代码，输出结果是",
      "options": [
        "10",
        "15",
        "20",
        "21"
      ],
      "explain": "range(1,6) 生成 1 到 5，不包含 6。循环把这些数依次累加到初始为 0 的 s 中，结果是 1+2+3+4+5=15，不能漏掉 5 或把 6 加进去。"
    },
    "en": {
      "prompt": "What does the following Python accumulation loop output?",
      "options": [
        "10",
        "15",
        "20",
        "21"
      ],
      "explain": "range(1, 6) yields 1 through 5 and excludes 6. Accumulating them from zero gives 1 + 2 + 3 + 4 + 5 = 15."
    },
    "code": "s = 0\nfor i in range(1, 6):\n    s += i\nprint(s)",
    "lang": "python"
  },
  {
    "id": "doc-part2-15",
    "sourceRef": "part2-15",
    "tier": "hd",
    "tags": [
      "Python"
    ],
    "answer": 1,
    "zh": {
      "prompt": "执行以下代码，输出结果是",
      "options": [
        "3 5",
        "5 3",
        "5 5",
        "3 3"
      ],
      "explain": "Python 的多重赋值先求右侧表达式的值，再分配给左侧变量。右侧 b,a 先得到 5,3，因此 a 变成 5，b 变成 3，不会因先修改 a 而丢失原值。"
    },
    "en": {
      "prompt": "What does the following Python assignment output?",
      "options": [
        "3 5",
        "5 3",
        "5 5",
        "3 3"
      ],
      "explain": "Python evaluates the right-hand side before assigning to the left-hand variables. The right-hand pair b, a is 5, 3, so the values are swapped without losing the original a."
    },
    "code": "a = 3\nb = 5\na, b = b, a\nprint(a, b)",
    "lang": "python"
  },
  {
    "id": "doc-part2-16",
    "sourceRef": "part2-16",
    "tier": "hd",
    "tags": [
      "URL"
    ],
    "answer": 1,
    "zh": {
      "prompt": "浏览器无法打开 http://www.zhejiang.2026/it。如果只把 http 换成 www，得到 www://www.zhejiang.2026/it，下列说法正确的是？",
      "options": [
        "可以打开，因为 www 是浏览器协议",
        "仍不是合法的 HTTP(S) 网页地址，www 不能代替协议",
        "可以打开，因为 www 表示万维网",
        "浏览器一定会修复协议并打开网页"
      ],
      "explain": "http 是 URL 的协议方案，而 www 通常只是域名中的一个标签。把协议改成 www 不会修复无法访问的问题，也不能根据这一操作推断网站本身是否存在。"
    },
    "en": {
      "prompt": "A page at `http://www.zhejiang.2026/it` fails to load. Replacing only `http` with `www` produces `www://www.zhejiang.2026/it`. What is true?",
      "options": [
        "It opens because www is a browser protocol",
        "It still is not a valid HTTP(S) web address; www is not a replacement protocol",
        "It opens because www means World Wide Web",
        "The browser is guaranteed to repair the protocol and open it"
      ],
      "explain": "http is a URL scheme, whereas www is usually a label within a hostname. Replacing the scheme with www does not repair the address or establish that the website exists."
    }
  },
  {
    "id": "doc-part2-17",
    "sourceRef": "part2-17",
    "tier": "hd",
    "tags": [
      "URL"
    ],
    "answer": 1,
    "zh": {
      "prompt": "地址 http://www.zj. edu/2026 中，点号与 edu 之间确实有一个空格。仅根据这个地址，可以确定的问题是？",
      "options": [
        "缺少 :80 端口号",
        "主机名包含不允许的空格",
        "www 前缀必须一律删除",
        "教育网站必须使用 https"
      ],
      "explain": "题目里的主机名包含空格，这是可以直接确定的地址格式错误。URL 不一定需要文件扩展名或显式端口；单凭无法找到网页，不能推断缺少 index.html。"
    },
    "en": {
      "prompt": "The address `http://www.zj. edu/2026` contains a literal space between `.` and `edu`. Which defect is certain from the address alone?",
      "options": [
        "Port :80 is missing",
        "The hostname contains a forbidden space",
        "The www prefix must always be removed",
        "Education websites must always use https"
      ],
      "explain": "The literal space makes this hostname invalid. A URL need not have a filename extension or an explicit default port; a page-not-found message alone does not prove index.html is missing."
    }
  },
  {
    "id": "doc-part2-18",
    "sourceRef": "part2-18",
    "tier": "hd",
    "tags": [
      "URL"
    ],
    "answer": 2,
    "zh": {
      "prompt": "校内资源地址为 ftp://10.1.1.5/shared/exam.docx。下列说法正确的是？",
      "options": [
        "ftp 表示该地址使用文件传输协议，下载速度快于 http",
        "10.1.1.5 是一个域名，需要DNS服务器解析",
        "/shared/exam.docx 是服务器上的资源路径",
        "ftp 协议只能下载文件，不能上传"
      ],
      "explain": "ftp 是文件传输协议，10.1.1.5 是 IPv4 地址，后面的 /shared/exam.docx 是服务器资源路径。传输速度取决于网络和实现，FTP 也支持上传，不能作出绝对判断。"
    },
    "en": {
      "prompt": "A school resource is at `ftp://10.1.1.5/shared/exam.docx`. Which statement is correct?",
      "options": [
        "FTP always downloads faster than HTTP",
        "10.1.1.5 is a domain name requiring DNS resolution",
        "/shared/exam.docx is the resource path on the server",
        "FTP supports downloads but never uploads"
      ],
      "explain": "FTP is a file-transfer protocol, 10.1.1.5 is an IPv4 address, and /shared/exam.docx is the server resource path. Speed depends on the network and implementation; FTP can also upload files."
    }
  },
  {
    "id": "doc-part2-19",
    "sourceRef": "part2-19",
    "tier": "hd",
    "tags": [
      "URL"
    ],
    "answer": 3,
    "zh": {
      "prompt": "小红想给朋友发一个包含数学公式的网页链接。她复制的地址是 https://math.example.com/formula?id=42&lang=zh。关于该URL，下列说法不正确的是",
      "options": [
        "https 表示该连接经过加密，比 http 更安全",
        "?id=42&lang=zh 是查询参数，用于向服务器传递数据",
        "math.example.com 中 math 是子域名，example.com 是主域名",
        "该URL指向一个HTML文件，文件名为 formula"
      ],
      "explain": "URL 的路径不一定对应物理文件，/formula 可以由服务器路由动态生成内容。问号后是查询参数，math 是子域标签，https 表示使用加密的 HTTP 连接。"
    },
    "en": {
      "prompt": "For `https://math.example.com/formula?id=42&lang=zh`, which statement is incorrect?",
      "options": [
        "HTTPS encrypts the connection",
        "?id=42&lang=zh contains query parameters",
        "math is a subdomain of example.com",
        "This must be a physical HTML file named formula"
      ],
      "explain": "A URL path need not name a physical file: /formula can be handled by a server route. The query follows ?, math is a subdomain label, and HTTPS protects the connection."
    }
  },
  {
    "id": "doc-part2-21",
    "sourceRef": "part2-21",
    "tier": "ez",
    "tags": [
      "硬件"
    ],
    "answer": 1,
    "zh": {
      "prompt": "不更换主要硬件，只给电脑增加 RGB 灯，计算性能通常会怎样？",
      "options": [
        "提升300%",
        "不变，但信仰+100",
        "自动超频",
        "吓退bug"
      ],
      "explain": "RGB 灯主要改变外观，不会增加 CPU、显卡或内存的计算能力。灯效控制可能消耗少量资源，但颜色和灯的数量本身不能让程序运行更快。"
    },
    "en": {
      "prompt": "Adding RGB lights to a computer, without changing its main hardware, normally does what to computing performance?",
      "options": [
        "Improves it by 300%",
        "Does not improve it; it only adds visual flair",
        "Automatically overclocks it",
        "Scares bugs away"
      ],
      "explain": "RGB lighting primarily changes appearance and does not increase CPU, GPU, or memory capability. Lighting control may use a little power or processing, but the lights themselves do not speed up programs."
    }
  },
  {
    "id": "doc-part2-34",
    "sourceRef": "part2-34",
    "tier": "hd",
    "tags": [
      "进程"
    ],
    "answer": 1,
    "zh": {
      "prompt": "任务管理器主要用于？",
      "options": [
        "给CPU超频",
        "查看和结束进程",
        "自动写代码",
        "清理灰尘"
      ],
      "explain": "任务管理器可以查看运行的进程与资源使用情况，并结束卡死的进程。结束进程可能丢失未保存工作；它不负责物理清灰，也不是自动编程工具。"
    },
    "en": {
      "prompt": "What is a main use of Task Manager?",
      "options": [
        "Overclock the CPU",
        "Inspect and end processes",
        "Write code automatically",
        "Clean dust"
      ],
      "explain": "Task Manager lets you inspect processes and resource usage and end unresponsive processes. Ending one may lose unsaved work; it does not physically clean the machine or write software for you."
    }
  },
  {
    "id": "doc-part2-35",
    "sourceRef": "part2-35",
    "tier": "hd",
    "tags": [
      "故障处理"
    ],
    "answer": 2,
    "zh": {
      "prompt": "电脑蓝屏通常表示？",
      "options": [
        "屏幕坏了",
        "鼠标没电",
        "系统遇到严重错误",
        "网速太快"
      ],
      "explain": "蓝屏停止错误通常表示系统遇到了无法继续安全运行的严重错误。原因可能涉及驱动、硬件或系统软件，不能仅凭屏幕变蓝就断定显示器损坏。"
    },
    "en": {
      "prompt": "What does a Windows blue-screen stop error usually indicate?",
      "options": [
        "A broken screen",
        "A flat mouse battery",
        "A serious system error",
        "An excessively fast connection"
      ],
      "explain": "A Windows blue-screen stop error means the system encountered a serious error that prevents safe continuation. Drivers, hardware, or system software may be involved; it does not simply mean the screen is broken."
    }
  },
  {
    "id": "doc-part2-36",
    "sourceRef": "part2-36",
    "tier": "hd",
    "tags": [
      "操作系统"
    ],
    "answer": 1,
    "zh": {
      "prompt": "安全模式的主要作用是？",
      "options": [
        "让电脑更安全地上网",
        "以最少驱动和服务启动，便于排错",
        "自动杀毒",
        "提高游戏帧数"
      ],
      "explain": "安全模式使用精简的驱动和服务启动，帮助定位正常启动时出现的问题。它是故障排查环境，不代表上网完全安全，也不能保证自动清除所有恶意软件。"
    },
    "en": {
      "prompt": "What is the main purpose of Safe Mode?",
      "options": [
        "Guarantee safe internet browsing",
        "Start with minimal drivers and services for troubleshooting",
        "Automatically remove all malware",
        "Increase game frame rates"
      ],
      "explain": "Safe Mode starts with a limited set of drivers and services to help isolate startup problems. It is a troubleshooting environment, not a guarantee of safe browsing or automatic malware removal."
    }
  },
  {
    "id": "doc-part2-37",
    "sourceRef": "part2-37",
    "tier": "hd",
    "tags": [
      "网络"
    ],
    "answer": 2,
    "zh": {
      "prompt": "DNS的主要作用是？",
      "options": [
        "给电脑降温",
        "清理垃圾",
        "把域名解析成IP地址",
        "加密硬盘"
      ],
      "explain": "DNS 提供域名记录查询，常见用途是把人类易读的域名解析为 IP 地址。它还有邮件等其他记录类型，但不会清理垃圾、给电脑散热或加密磁盘。"
    },
    "en": {
      "prompt": "What is one main function of DNS?",
      "options": [
        "Cool the computer",
        "Clean junk files",
        "Resolve domain names to IP addresses",
        "Encrypt hard drives"
      ],
      "explain": "DNS provides lookups for domain records, commonly resolving readable hostnames to IP addresses. It also has other record types, but does not cool computers, remove junk, or encrypt disks."
    }
  },
  {
    "id": "doc-part2-38",
    "sourceRef": "part2-38",
    "tier": "hd",
    "tags": [
      "网络"
    ],
    "answer": 0,
    "zh": {
      "prompt": "路由器的主要作用是？",
      "options": [
        "连接不同网络并转发数据",
        "存储电影",
        "显示图像",
        "给CPU供电"
      ],
      "explain": "路由器根据目的地址和路由信息在网络之间转发数据包。家用路由器可能兼有无线接入和交换功能，但它的核心职责仍是连接不同网络并转发流量。"
    },
    "en": {
      "prompt": "What is a router's main function?",
      "options": [
        "Connect networks and forward packets",
        "Store movies",
        "Display images",
        "Power the CPU"
      ],
      "explain": "A router forwards packets between networks using destination addresses and routing information. Home routers may also include Wi-Fi and switching, but routing remains their core role."
    }
  },
  {
    "id": "doc-part2-39",
    "sourceRef": "part2-39",
    "tier": "hd",
    "tags": [
      "Web"
    ],
    "answer": 1,
    "zh": {
      "prompt": "HTTP 404通常表示？",
      "options": [
        "服务器着火",
        "请求的页面未找到",
        "密码错误",
        "网速太快"
      ],
      "explain": "HTTP 404 表示服务器未找到所请求的资源，可能是链接错误或资源已经移动、删除。它并不直接表示登录密码错误，也不能说明服务器已经发生硬件损坏。"
    },
    "en": {
      "prompt": "What does HTTP status 404 normally mean?",
      "options": [
        "The server is on fire",
        "The requested resource was not found",
        "The password is incorrect",
        "The network is too fast"
      ],
      "explain": "HTTP 404 means the requested resource was not found. The link may be wrong or the resource moved or deleted; it does not directly indicate a wrong password or damaged server hardware."
    }
  },
  {
    "id": "doc-part2-40",
    "sourceRef": "part2-40",
    "tier": "hd",
    "tags": [
      "安全"
    ],
    "answer": 3,
    "zh": {
      "prompt": "防火墙的主要作用是？",
      "options": [
        "提高屏幕亮度",
        "扩大硬盘容量",
        "给文件改名",
        "监控和限制网络流量"
      ],
      "explain": "防火墙按照配置的规则允许或阻止网络通信，帮助减少不必要的访问。它不能替代所有安全措施，也不会扩容硬盘、调整屏幕亮度或自动重命名文件。"
    },
    "en": {
      "prompt": "What is a firewall's main function?",
      "options": [
        "Increase screen brightness",
        "Expand disk capacity",
        "Rename files",
        "Monitor and restrict network traffic"
      ],
      "explain": "A firewall permits or blocks network traffic according to configured rules. It helps restrict unnecessary access but does not replace all security measures or change storage and display hardware."
    }
  },
  {
    "id": "doc-part2-41",
    "sourceRef": "part2-41",
    "tier": "in",
    "tags": [
      "隐私"
    ],
    "answer": 0,
    "zh": {
      "prompt": "VPN通常可以？",
      "options": [
        "建立加密隧道，但不等于完全匿名",
        "让电脑永不中毒",
        "免费提升硬件",
        "自动备份数据"
      ],
      "explain": "VPN 通常在设备与 VPN 端点之间建立加密隧道。网站仍可能通过账号、Cookie 等识别用户，VPN 服务商也处在信任链上，因此使用 VPN 不等于完全匿名。"
    },
    "en": {
      "prompt": "What can a VPN typically provide?",
      "options": [
        "An encrypted tunnel, without guaranteeing complete anonymity",
        "Permanent immunity to malware",
        "Free hardware upgrades",
        "Automatic backups"
      ],
      "explain": "A VPN normally creates an encrypted tunnel to a VPN endpoint. Websites may still identify you through accounts and cookies, and the VPN provider is part of the trust chain; it does not guarantee anonymity."
    }
  },
  {
    "id": "doc-part2-42",
    "sourceRef": "part2-42",
    "tier": "in",
    "tags": [
      "安全"
    ],
    "answer": 2,
    "zh": {
      "prompt": "钓鱼邮件通常试图？",
      "options": [
        "帮你清理磁盘",
        "提升网速",
        "诱导你点击链接或泄露信息",
        "给CPU降温"
      ],
      "explain": "钓鱼邮件通过冒充可信主体或制造紧迫感，诱导收件人访问假网站、打开附件或提供敏感信息。应通过独立渠道核实请求，不能仅凭显示名称判断真假。"
    },
    "en": {
      "prompt": "What is a phishing email usually trying to do?",
      "options": [
        "Clean your disk",
        "Increase network speed",
        "Trick you into following a link or revealing information",
        "Cool the CPU"
      ],
      "explain": "Phishing impersonates trusted senders or creates urgency to lure recipients into opening links or attachments or revealing information. Verify requests through an independent channel instead of trusting the display name."
    }
  },
  {
    "id": "doc-part2-43",
    "sourceRef": "part2-43",
    "tier": "in",
    "tags": [
      "安全"
    ],
    "answer": 3,
    "zh": {
      "prompt": "双因素认证是指？",
      "options": [
        "两个密码完全相同",
        "两台电脑同时登录",
        "两个杀毒软件",
        "密码之外增加不同类别的因素，例如安全密钥"
      ],
      "explain": "双因素认证要求两种不同类别的认证因素，例如知道的密码和持有的安全密钥。两个密码仍属于同一种知识因素，不能因为输入了两次就称为双因素认证。"
    },
    "en": {
      "prompt": "What does two-factor authentication require?",
      "options": [
        "Two identical passwords",
        "Logging in on two computers",
        "Two antivirus programs",
        "A password plus a different factor, such as a security key"
      ],
      "explain": "Two-factor authentication combines different factor categories, such as a password you know and a security key you possess. Two passwords are still the same knowledge factor, even if entered separately."
    }
  },
  {
    "id": "doc-part2-44",
    "sourceRef": "part2-44",
    "tier": "in",
    "tags": [
      "密码"
    ],
    "answer": 0,
    "zh": {
      "prompt": "强密码通常应？",
      "options": [
        "足够长、难以猜测，且每个账号不复用",
        "只用生日",
        "和用户名相同",
        "写在便签贴屏幕上"
      ],
      "explain": "足够长、难以猜测且不复用的密码更能抵抗猜测与撞库。复杂字符不是唯一标准，长的随机词组也可以有效；生日和用户名容易猜到，不应直接作为密码。"
    },
    "en": {
      "prompt": "Which describes a strong password practice?",
      "options": [
        "Use a long, unpredictable password unique to each account",
        "Use only your birthday",
        "Use the same text as your username",
        "Put it on a note stuck to the screen"
      ],
      "explain": "Long, unpredictable, unique passwords resist guessing and credential stuffing. Symbol complexity is not the only measure; a long random passphrase can work. Birthdays and usernames are predictable."
    }
  },
  {
    "id": "doc-part2-45",
    "sourceRef": "part2-45",
    "tier": "in",
    "tags": [
      "安全"
    ],
    "answer": 1,
    "zh": {
      "prompt": "软件更新的主要安全意义是？",
      "options": [
        "让电脑变贵",
        "修补已知漏洞",
        "增加灰尘",
        "减少硬盘容量"
      ],
      "explain": "软件更新可修复已知安全漏洞，降低攻击者利用公开缺陷入侵的机会。更新不保证没有未知漏洞，但长期忽略安全补丁会让系统持续暴露在已知风险下。"
    },
    "en": {
      "prompt": "What is a main security benefit of software updates?",
      "options": [
        "Making the computer more expensive",
        "Fixing known vulnerabilities",
        "Adding dust",
        "Reducing disk capacity"
      ],
      "explain": "Security updates repair known vulnerabilities and reduce exposure to documented attack methods. They do not guarantee the absence of unknown flaws, but ignoring them leaves known weaknesses in place."
    }
  },
  {
    "id": "doc-part2-46",
    "sourceRef": "part2-46",
    "tier": "in",
    "tags": [
      "数据恢复"
    ],
    "answer": 2,
    "zh": {
      "prompt": "备份和RAID的区别是？",
      "options": [
        "完全一样",
        "RAID一定更安全",
        "RAID不是备份，误删仍可能丢失",
        "备份只能存一份"
      ],
      "explain": "有冗余的 RAID 可帮助应对部分磁盘故障，但误删、勒索加密等操作也可能同步影响阵列中的数据。备份保留独立副本或历史版本，解决的问题与 RAID 不相同。"
    },
    "en": {
      "prompt": "How does RAID differ from a backup?",
      "options": [
        "They are exactly the same",
        "RAID is always safer",
        "RAID is not a backup; accidental deletion can still lose data",
        "Only one backup copy can exist"
      ],
      "explain": "Redundant RAID configurations can tolerate some drive failures, but deletion or ransomware can affect the array's data too. Backups preserve independent copies or versions and serve a different purpose."
    }
  },
  {
    "id": "doc-part2-47",
    "sourceRef": "part2-47",
    "tier": "in",
    "tags": [
      "数据恢复"
    ],
    "answer": 3,
    "zh": {
      "prompt": "3-2-1备份原则通常指？",
      "options": [
        "3个杀毒软件、2个系统、1个密码",
        "3天备份一次、2台电脑、1个U盘",
        "3个浏览器、2个邮箱、1个网盘",
        "至少3份数据、2种介质、1份异地"
      ],
      "explain": "3-2-1 通常表示至少三份数据（含原件），使用两种存储介质，并保留一份异地副本。它减少单点故障和现场灾害风险，但还应验证备份能够成功恢复。"
    },
    "en": {
      "prompt": "What does the 3-2-1 backup rule usually mean?",
      "options": [
        "Three antivirus tools, two systems, one password",
        "Back up every three days using two computers and one USB drive",
        "Three browsers, two email accounts, one cloud drive",
        "At least three copies of data, on two media types, with one off-site"
      ],
      "explain": "The rule calls for at least three copies including the original, on two media types, with one copy off-site. This reduces shared-failure risk; restoration still needs to be tested."
    }
  },
  {
    "id": "doc-part2-48",
    "sourceRef": "part2-48",
    "tier": "in",
    "tags": [
      "安全"
    ],
    "answer": 0,
    "zh": {
      "prompt": "加密型勒索软件通常会做什么？",
      "options": [
        "加密文件并索要赎金",
        "帮你整理桌面",
        "提高网速",
        "清理病毒"
      ],
      "explain": "加密型勒索软件把受害者文件加密，并索要赎金以换取所谓恢复手段。支付并不保证数据恢复；离线或不可变备份和及时修补漏洞有助于降低损失。"
    },
    "en": {
      "prompt": "What does file-encrypting ransomware typically do?",
      "options": [
        "Encrypt files and demand payment",
        "Organize your desktop",
        "Increase network speed",
        "Remove viruses"
      ],
      "explain": "File-encrypting ransomware locks victims' files and demands payment for supposed recovery. Payment does not guarantee restoration; offline or immutable backups and timely patching help reduce harm."
    }
  },
  {
    "id": "doc-part2-49",
    "sourceRef": "part2-49",
    "tier": "in",
    "tags": [
      "安全"
    ],
    "answer": 1,
    "zh": {
      "prompt": "最小权限原则是指？",
      "options": [
        "把管理员密码告诉所有人",
        "只授予完成任务所需的最小权限",
        "关闭所有安全软件",
        "不用密码"
      ],
      "explain": "最小权限原则要求只授予完成任务必需的权限，并尽量限制授权范围与持续时间。这样即使账号或程序被滥用，也能减少影响，不能把管理员权限随意发给所有人。"
    },
    "en": {
      "prompt": "What is the principle of least privilege?",
      "options": [
        "Give everyone the administrator password",
        "Grant only the permissions needed for the task",
        "Disable all security tools",
        "Use no passwords"
      ],
      "explain": "Least privilege grants only the access required for a task, limited in scope and duration where appropriate. It reduces the impact of compromised accounts or programs instead of giving everyone administrative access."
    }
  },
  {
    "id": "doc-part2-50",
    "sourceRef": "part2-50",
    "tier": "in",
    "tags": [
      "HTTPS"
    ],
    "answer": 2,
    "zh": {
      "prompt": "浏览器显示 HTTPS 连接的锁形图标时，它表示什么？",
      "options": [
        "网站绝对可信",
        "电脑不会中毒",
        "与网站之间的连接使用了HTTPS加密",
        "已经匿名"
      ],
      "explain": "HTTPS 的锁形标识表示连接使用了 HTTPS 保护，而不是网站内容经过审核。钓鱼站也能使用 HTTPS，因此不能把连接加密误当成网站可信或访问匿名的保证。"
    },
    "en": {
      "prompt": "When a browser shows a padlock for an HTTPS page, what does it indicate?",
      "options": [
        "The site is completely trustworthy",
        "Your computer cannot get malware",
        "The connection to the site uses HTTPS encryption",
        "Your visit is anonymous"
      ],
      "explain": "An HTTPS padlock concerns the protected connection, not an endorsement of the website's content. Phishing sites can use HTTPS too, so encryption does not guarantee trustworthiness or anonymity."
    }
  },
  {
    "id": "doc-part2-51",
    "sourceRef": "part2-51",
    "tier": "in",
    "tags": [
      "数据恢复"
    ],
    "answer": 3,
    "zh": {
      "prompt": "出售二手硬盘之前，应如何处理其中的敏感数据？",
      "options": [
        "直接格式化一次即可",
        "删除桌面文件即可",
        "放入回收站",
        "使用适合介质的方式净化数据并验证；无法安全再利用时安全销毁介质"
      ],
      "explain": "普通删除或快速格式化不等于彻底清除数据。应按介质类型采用合适的清除、净化方法并核实结果；不能安全再利用时，按适当方式销毁介质，而不是继续转卖。"
    },
    "en": {
      "prompt": "Before selling a used drive, what should you do with sensitive data?",
      "options": [
        "Quick-format it once and assume that is enough",
        "Delete only desktop files",
        "Move files to the Recycle Bin",
        "Sanitize it using an appropriate verified method; securely destroy the medium if safe reuse is not possible"
      ],
      "explain": "Deleting files or quick-formatting is not equivalent to sanitizing a drive. Use a suitable verified sanitization method for the medium; if safe reuse is impossible, securely destroy it instead of reselling it."
    }
  },
  {
    "id": "doc-part2-52",
    "sourceRef": "part2-52",
    "tier": "in",
    "tags": [
      "密码"
    ],
    "answer": 0,
    "zh": {
      "prompt": "密码管理器的作用是？",
      "options": [
        "安全保存和生成不同密码",
        "让密码全部一样",
        "自动破解密码",
        "关闭防火墙"
      ],
      "explain": "密码管理器可以生成并保存各网站不同的长密码，减少复用和记忆负担。仍需保护管理器本身的解锁凭据并妥善备份或设置恢复方式，它不是破解密码工具。"
    },
    "en": {
      "prompt": "What is a password manager used for?",
      "options": [
        "Securely storing and generating distinct passwords",
        "Making every password identical",
        "Automatically cracking passwords",
        "Disabling firewalls"
      ],
      "explain": "A password manager generates and stores long, distinct passwords, reducing reuse and memorization burden. Protect its own unlock credentials and recovery process; it is not a password-cracking tool."
    }
  },
  {
    "id": "doc-part2-53",
    "sourceRef": "part2-53",
    "tier": "in",
    "tags": [
      "扩展名"
    ],
    "answer": 2,
    "zh": {
      "prompt": "文件扩展名被隐藏时，风险是？",
      "options": [
        "文件会变大",
        "电脑会断电",
        "可能把 .exe 误认为文档或图片",
        "网速会下降"
      ],
      "explain": "隐藏扩展名可能让 document.pdf.exe 看起来像 PDF，误导用户运行可执行程序。显示完整扩展名有助于识别真实后缀，但仍应核实文件来源，不能只凭图标决定打开。"
    },
    "en": {
      "prompt": "What is a risk of hiding filename extensions?",
      "options": [
        "Files become larger",
        "The computer loses power",
        "An .exe file may be mistaken for a document or image",
        "The network slows down"
      ],
      "explain": "Hiding extensions can make document.pdf.exe appear to be a PDF and trick users into running it. Showing full extensions helps, but the source should still be checked instead of relying on the icon."
    }
  },
  {
    "id": "doc-part2-54",
    "sourceRef": "part2-54",
    "tier": "in",
    "tags": [
      "网络"
    ],
    "answer": 3,
    "zh": {
      "prompt": "ping命令通常用于？",
      "options": [
        "清理磁盘",
        "杀毒",
        "压缩文件",
        "测试网络连通性和延迟"
      ],
      "explain": "ping 通常发送 ICMP 回显请求来检查目标响应及往返时间。没有回复可能是断网，也可能是防火墙过滤或目标禁用响应，因此不能把无回复一概解释为主机离线。"
    },
    "en": {
      "prompt": "What is the ping command normally used to test?",
      "options": [
        "Disk cleanup",
        "Malware removal",
        "File compression",
        "Network reachability and round-trip time"
      ],
      "explain": "ping normally uses ICMP echo requests to check responses and round-trip time. A missing reply may reflect filtering or disabled responses, so it does not conclusively prove the host is offline."
    }
  },
  {
    "id": "doc-part2-55",
    "sourceRef": "part2-55",
    "tier": "in",
    "tags": [
      "网络"
    ],
    "answer": 0,
    "zh": {
      "prompt": "ipconfig命令通常用于？",
      "options": [
        "查看本机网络配置",
        "编辑图片",
        "播放音乐",
        "给CPU超频"
      ],
      "explain": "ipconfig 可显示 Windows 本机的 IP 地址、子网掩码、默认网关等网络配置。某些选项还能执行续租或 DNS 缓存操作，但它不是图像编辑、播放或超频工具。"
    },
    "en": {
      "prompt": "What is the Windows ipconfig command normally used for?",
      "options": [
        "Viewing local network configuration",
        "Editing images",
        "Playing music",
        "Overclocking the CPU"
      ],
      "explain": "On Windows, ipconfig displays details such as IP addresses, subnet masks, and default gateways. Some options renew leases or manage the DNS cache; it is not an image, media, or overclocking tool."
    }
  },
  {
    "id": "doc-part2-56",
    "sourceRef": "part2-56",
    "tier": "hd",
    "tags": [
      "硬件"
    ],
    "answer": 1,
    "zh": {
      "prompt": "显卡的主要功能是？",
      "options": [
        "存储文件",
        "处理图形图像",
        "连接打印机",
        "给CPU供电"
      ],
      "explain": "显卡主要处理图形渲染和图像相关计算，将画面输出到显示设备。现代 GPU 也能进行通用并行计算，但不会因此变成负责长期保存文件的存储设备。"
    },
    "en": {
      "prompt": "What is a graphics card's main function?",
      "options": [
        "Store files",
        "Process graphics and images",
        "Connect printers",
        "Power the CPU"
      ],
      "explain": "A graphics card primarily handles graphics rendering and image-related computation for display. Modern GPUs also support general parallel computation, but are not persistent file-storage devices."
    }
  },
  {
    "id": "doc-part2-57",
    "sourceRef": "part2-57",
    "tier": "in",
    "tags": [
      "操作系统"
    ],
    "answer": 2,
    "zh": {
      "prompt": "驱动程序的主要作用是？",
      "options": [
        "提高网速",
        "清理垃圾",
        "让操作系统与硬件通信",
        "增加硬盘容量"
      ],
      "explain": "驱动程序为操作系统与具体硬件之间提供接口，处理设备命令和数据交换。正确驱动有助于设备工作，但不会凭空增加硬盘容量或保证网络速度提升。"
    },
    "en": {
      "prompt": "What is the main role of a device driver?",
      "options": [
        "Increase network speed automatically",
        "Clean junk files",
        "Let the operating system communicate with hardware",
        "Increase disk capacity"
      ],
      "explain": "A device driver provides an interface between the operating system and particular hardware, handling commands and data exchange. It does not create disk capacity or guarantee faster networking."
    }
  },
  {
    "id": "doc-part2-58",
    "sourceRef": "part2-58",
    "tier": "in",
    "tags": [
      "内存与硬盘"
    ],
    "answer": 3,
    "zh": {
      "prompt": "在使用分页文件的常见系统中，虚拟内存如何帮助缓解物理内存压力？",
      "options": [
        "让显示器更亮",
        "杀毒",
        "自动备份",
        "把部分内存页换出到磁盘，支持超出物理 RAM 容量的内存使用"
      ],
      "explain": "虚拟内存是地址空间抽象；配合分页文件时，可将部分内存页换出到磁盘，缓解物理内存压力。磁盘通常比 RAM 慢，这不等于真正增加了物理内存。"
    },
    "en": {
      "prompt": "In a typical system using a page file, how can virtual memory help when RAM is under pressure?",
      "options": [
        "Make the display brighter",
        "Remove malware",
        "Back up files automatically",
        "Move some memory pages to disk to support memory use beyond physical RAM"
      ],
      "explain": "Virtual memory is an address-space abstraction. With a page file, some pages can move to disk under memory pressure. Disk is usually slower than RAM, so this does not add physical memory."
    }
  },
  {
    "id": "doc-part2-59",
    "sourceRef": "part2-59",
    "tier": "in",
    "tags": [
      "文件"
    ],
    "answer": 3,
    "zh": {
      "prompt": "文件系统 NTFS 通常用于？",
      "options": [
        "图片格式",
        "网络协议",
        "音频格式",
        "Windows 硬盘分区"
      ],
      "explain": "NTFS 是 Windows 常用的文件系统，用于组织磁盘卷上的文件、目录及权限等元数据。它既不是图片或音频编码，也不是计算机之间通信使用的网络协议。"
    },
    "en": {
      "prompt": "NTFS is commonly used as what?",
      "options": [
        "An image format",
        "A network protocol",
        "An audio format",
        "A filesystem for Windows disk volumes"
      ],
      "explain": "NTFS is a filesystem commonly used for Windows volumes, organizing files, directories, permissions, and other metadata. It is not an image/audio encoding or a network protocol."
    }
  },
  {
    "id": "doc-part3-01",
    "sourceRef": "part3-01",
    "tier": "in",
    "tags": [
      "算法"
    ],
    "answer": 1,
    "zh": {
      "prompt": "对一组数进行错位排序，即排序后从前往后依次是：最小的、最大的、第二小的、第二大的……如 [77, 52, 32, 82, 43, 21, 90, 28, 46] 经过排序后结果为 [21, 90, 28, 82, 32, 77, 43, 52, 46]。\n实现该功能的 Python 程序段如下（排序按升序/降序交替进行）：\n\n为使程序实现上述错位排序功能，划线处应填入的代码为：",
      "options": [
        "① i + 1  ② k * (a[j] - a[j - 1]) < 0",
        "① i  ② k * (a[j] - a[j - 1]) < 0",
        "① i  ② k * (a[j] - a[j - 1]) > 0",
        "① i + 1  ② k * (a[j] - a[j - 1]) > 0"
      ],
      "explain": "首轮 k=1 时，负差值触发交换，使较小值向左移动到位置 i。下一轮 k=-1 则让较大值左移。内层必须到 j=i+1，因此 range 的终点填 i。原答案 C 应改为 B。"
    },
    "en": {
      "prompt": "Reorder a list as smallest, largest, second-smallest, second-largest, and so on. For example, [77,52,32,82,43,21,90,28,46] must become [21,90,28,82,32,77,43,52,46]. Which substitutions make the code work (n is len(a))?",
      "options": [
        "① i + 1; ② k * (a[j] - a[j - 1]) < 0",
        "① i; ② k * (a[j] - a[j - 1]) < 0",
        "① i; ② k * (a[j] - a[j - 1]) > 0",
        "① i + 1; ② k * (a[j] - a[j - 1]) > 0"
      ],
      "explain": "With k=1, swapping on a negative difference moves the minimum left to position i. Flipping k moves the maximum left next. The loop must include j=i+1, so its stop is i. The supplied key C is incorrect; B produces the required order."
    },
    "code": "n = len(a)\nk = 1\nfor i in range(n - 1):\n    for j in range(n - 1, ① , -1):\n        if ② :\n            a[j - 1], a[j] = a[j], a[j - 1]\n    k = -k",
    "lang": "python"
  },
  {
    "id": "doc-part3-02",
    "sourceRef": "part3-02",
    "tier": "in",
    "tags": [
      "算法"
    ],
    "answer": 0,
    "zh": {
      "prompt": "汉诺塔游戏中，规定每次只能移动最上面的圆盘，且大盘不能压在小盘上。现有 A、B、C 三根柱子，A 柱上有 3 个圆盘（从上到下编号为 1、2、3，编号越大盘越大），目标是把 3 个圆盘全部移到 C 柱。\n某同学编写如下递归程序模拟移动过程：\n\n为使程序正确输出汉诺塔的移动序列，划线处应依次填入的代码为（ ）",
      "options": [
        "① a ② c ③ b ④ b ⑤ a ⑥ c",
        "① a ② b ③ c ④ b ⑤ a ⑥ c",
        "① a ② c ③ b ④ c ⑤ a ⑥ b",
        "① a ② b ③ c ④ c ⑤ a ⑥ b"
      ],
      "explain": "hanoi(n,a,b,c) 表示从 a 经辅助柱 b 搬到 c。先把 n-1 个盘从 a 经 c 搬到 b，再搬最大盘到 c，最后把 n-1 个盘从 b 经 a 搬到 c，因此选 A。"
    },
    "en": {
      "prompt": "Three disks start on peg A, smallest on top. Move them to C using B, moving one disk at a time and never placing a larger disk on a smaller one. Which arguments complete the recursive Hanoi function?",
      "options": [
        "① a ② c ③ b ④ b ⑤ a ⑥ c",
        "① a ② b ③ c ④ b ⑤ a ⑥ c",
        "① a ② c ③ b ④ c ⑤ a ⑥ b",
        "① a ② b ③ c ④ c ⑤ a ⑥ b"
      ],
      "explain": "hanoi(n,a,b,c) moves disks from a to c using b. First move n-1 disks from a to b using c, move the largest to c, then move n-1 from b to c using a. These arguments are exactly option A."
    },
    "code": "def hanoi(n, a, b, c):\n    if n == 1:\n        print(a, \"->\", c)\n    else:\n        hanoi(n - 1, ① , ② , ③ )\n        print(a, \"->\", c)\n        hanoi(n - 1, ④ , ⑤ , ⑥ )\nhanoi(3, \"A\", \"B\", \"C\")",
    "lang": "python"
  },
  {
    "id": "doc-part3-03",
    "sourceRef": "part3-03",
    "tier": "in",
    "tags": [
      "双指针"
    ],
    "answer": 1,
    "zh": {
      "prompt": "某单向链表包含节点 1 → 2 → 3 → 4 → 5。每个节点都有 data 和 next 属性，next 为 None 表示链尾。head 指向第一个节点。执行下列程序后输出什么？",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "explain": "p 每轮前进一步，q 每轮前进两步。五个节点时循环执行两轮，p 从 1 到 2 再到 3，q 到达节点 5 后其 next 为 None，循环停止，输出 3。"
    },
    "en": {
      "prompt": "A singly linked list contains 1 → 2 → 3 → 4 → 5. Each node has `.data` and `.next` attributes, and the tail's `.next` is None. Starting at head, what does the code print?",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "explain": "p advances one node per iteration while q advances two. After two iterations p is at 3 and q at 5. Since q.next is None, the loop ends and prints 3."
    },
    "code": "p = head\nq = head\nwhile q != None and q.next != None:\n    p = p.next\n    q = q.next.next\nprint(p.data)",
    "lang": "python"
  },
  {
    "id": "doc-part3-04",
    "sourceRef": "part3-04",
    "tier": "in",
    "tags": [
      "双指针"
    ],
    "answer": 1,
    "zh": {
      "prompt": "某单向链表包含节点 1 → 2 → 3 → 4 → 5 → 6。每个节点都有 data 和 next 属性，next 为 None 表示链尾。head 指向第一个节点。执行下列程序后输出什么？",
      "options": [
        "3",
        "4",
        "5",
        "程序报错"
      ],
      "explain": "六个节点时循环执行三轮，p 依次到 2、3、4，q 最后变为 None。下一次判断因 and 短路而不会访问 None.next，因此输出后一个中点 4，不会报错。"
    },
    "en": {
      "prompt": "A singly linked list contains 1 → 2 → 3 → 4 → 5 → 6. Each node has `.data` and `.next` attributes, and the tail's `.next` is None. Starting at head, what does the code print?",
      "options": [
        "3",
        "4",
        "5",
        "An error"
      ],
      "explain": "With six nodes there are three iterations: p reaches 2, 3, then 4 while q finally becomes None. Short-circuit evaluation avoids accessing None.next, so it prints the later middle node, 4."
    },
    "code": "p = head\nq = head\nwhile q != None and q.next != None:\n    p = p.next\n    q = q.next.next\nprint(p.data)",
    "lang": "python"
  }
];

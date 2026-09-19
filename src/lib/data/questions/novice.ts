import type { LocalizedQuestion } from '../types';

export const noviceQuestions: LocalizedQuestion[] = [
  {
    "id": "novice-1",
    "tier": "hd",
    "tags": [
      "补码",
      "二进制"
    ],
    "answer": 2,
    "zh": {
      "prompt": "计算机用**固定位数**的二进制存整数,常见表示法叫**补码**:正数按普通二进制写;求一个正数的相反数,做法是 **按位取反,再 +1**。\n8 位下 `1` = `00000001`,`1` 取反得 `11111110`,再 +1 得 `11111111`,即 `-1`。\n按同样规则,8 位下 `-2` 的二进制是?",
      "options": [
        "10000010",
        "11111101",
        "11111110",
        "10000001"
      ],
      "explain": "`2` = `00000010`,按位取反得 `11111101`,再 +1 得 `11111110`,这就是 `-2`。选 `11111101` 是**漏了最后那个 +1**;选 `10000010` 是拿最高位当符号位、其余照抄数值的朴素想法(它其实是 `-126`);选 `10000001` 则是把「取反」直接当成了 `-1`。"
    },
    "en": {
      "prompt": "Computers store integers in a **fixed number of binary digits**, usually in a form called **two's complement**: positive numbers are written as plain binary, and to negate a number you **flip every bit, then add 1**.\nIn 8 bits, `1` = `00000001`; flipping it gives `11111110`, and adding 1 gives `11111111`, which is `-1`.\nBy the same rule, what is `-2` in 8-bit binary?",
      "options": [
        "10000010",
        "11111101",
        "11111110",
        "10000001"
      ],
      "explain": "`2` = `00000010`; flipping the bits gives `11111101`, and adding 1 gives `11111110`, which is `-2`. Picking `11111101` means you **forgot the final +1**; picking `10000010` is the naive \"top bit is the sign, copy the rest\" idea (that pattern is actually `-126`); picking `10000001` treats \"flip the bits\" as if it already produced `-1`."
    }
  },
  {
    "id": "novice-2",
    "tier": "in",
    "tags": [
      "排序",
      "选择排序"
    ],
    "code": "void selectionSort(int a[], int n) {\n  for (int i = 0; i < n - 1; i++) {\n    int minIdx = i;\n    for (int j = i + 1; j < n; j++)\n      if (a[j] < a[minIdx]) minIdx = j;   // only the index is recorded\n    int t = a[i]; a[i] = a[minIdx]; a[minIdx] = t;  // exactly one swap per round\n  }\n}",
    "lang": "cpp",
    "answer": 3,
    "zh": {
      "prompt": "下面的选择排序代码每轮都会执行一次交换，即使 minIdx 等于 i，也把这次操作计为一次交换。对以下四个长度都为 6 的数组，哪一个执行的交换次数最多？",
      "options": [
        "[1, 2, 3, 4, 5, 6]",
        "[6, 5, 4, 3, 2, 1]",
        "[3, 1, 6, 2, 5, 4]",
        "都一样多"
      ],
      "explain": "代码没有跳过原地交换的判断，外层循环从 i=0 到 i=4，每轮无条件执行一次交换。因此四个数组都执行 5 次交换，答案是都一样多，不能混淆交换语句执行次数与实际改变元素位置的次数。"
    },
    "en": {
      "prompt": "This selection-sort code performs one swap operation every round, counting self-swaps when minIdx equals i. For the four arrays of length 6 below, which executes the most swap operations?",
      "options": [
        "[1, 2, 3, 4, 5, 6]",
        "[6, 5, 4, 3, 2, 1]",
        "[3, 1, 6, 2, 5, 4]",
        "All the same"
      ],
      "explain": "The code does not skip self-swaps. Its outer loop runs from i=0 through i=4 and unconditionally performs one swap per round. Every array therefore executes five swaps, regardless of whether a swap changes element positions."
    }
  },
  {
    "id": "novice-3",
    "tier": "hd",
    "tags": [
      "Python",
      "range"
    ],
    "code": ">>> list(range(0, 5, 2))\n[0, 2, 4]\n>>> list(range(5, 0, -2))\n[5, 3, 1]\n>>> list(range(1, 10, 3))",
    "lang": "python",
    "answer": 1,
    "zh": {
      "prompt": "Python 的 range(a,b,c) 从 a 开始每次加 c，且不包含终点 b。正步长在到达或超过 b 时停止，负步长在到达或低于 b 时停止。例子：range(0,5,2) 得到 0,2,4；range(5,0,-2) 得到 5,3,1。list(range(1,10,3)) 的结果是？",
      "options": [
        "[1, 4, 7, 10]",
        "[1, 4, 7]",
        "[1, 3, 6, 9]",
        "[3, 6, 9]"
      ],
      "explain": "从 1 出发每次加 3:1、4、7、10,但 10 已经**不小于** 10,所以停,结果是 `[1, 4, 7]`。选 `[1, 4, 7, 10]` 是忘了右端不包含;选 `[1, 3, 6, 9]` 是把步长 3 当成了起始值、又把 1 当成公差;选 `[3, 6, 9]` 则是把 `a` 和 `c` 的位置记反了。"
    },
    "en": {
      "prompt": "Python's range(a,b,c) starts at a and adds c, excluding b. A positive step stops at or above b; a negative step stops at or below b. For example, range(0,5,2) yields 0,2,4, and range(5,0,-2) yields 5,3,1. What does list(range(1,10,3)) produce?",
      "options": [
        "[1, 4, 7, 10]",
        "[1, 4, 7]",
        "[1, 3, 6, 9]",
        "[3, 6, 9]"
      ],
      "explain": "Starting from 1 and adding 3 gives 1, 4, 7, 10 — but 10 is **not less than** 10, so it stops and the result is `[1, 4, 7]`. Picking `[1, 4, 7, 10]` forgets that the right end is excluded; picking `[1, 3, 6, 9]` treats the step 3 as the start and 1 as the step; picking `[3, 6, 9]` swaps the roles of `a` and `c`."
    }
  },
  {
    "id": "novice-4",
    "tier": "ez",
    "tags": [
      "整除",
      "取余"
    ],
    "code": ">>> 17 // 5, 17 % 5\n(3, 2)\n>>> 1000 // 7, 1000 % 7",
    "lang": "python",
    "answer": 3,
    "zh": {
      "prompt": "在 Python 中，对于本题的正整数,两个整数相除有两种结果:`//` 是**整除**(只留商),`%` 是**取余数**,两者满足\n**被除数 = 除数 × 商 + 余数**。\n例如 `17 // 5` 得 3、`17 % 5` 得 2,因为 17 = 5 × 3 + 2。\n那么 `1000 // 7` 和 `1000 % 7` 分别是多少?",
      "options": [
        "143 和 1",
        "142 和 7",
        "143 和 -1",
        "142 和 6"
      ],
      "explain": "7 × 142 = 994,7 × 143 = 1001 已经超过 1000,所以商只能是 **142**;再由材料里的等式得余数 = 1000 - 994 = **6**。验算一遍:`7 × 142 + 6 = 1000`,正好对上。选 143 开头的两项是把除法「四舍五入」了;选 7 是把余数写成了除数 —— 余数**必须小于除数**。"
    },
    "en": {
      "prompt": "In Python, for the positive integers in this question, dividing two integers can give two different results: `//` is **integer division** (the quotient only) and `%` is the **remainder**, and together they satisfy\n**dividend = divisor × quotient + remainder**.\nFor example `17 // 5` is 3 and `17 % 5` is 2, because 17 = 5 × 3 + 2.\nSo what are `1000 // 7` and `1000 % 7`?",
      "options": [
        "143 and 1",
        "142 and 7",
        "143 and -1",
        "142 and 6"
      ],
      "explain": "Since 7 × 142 = 994 and 7 × 143 = 1001 already exceeds 1000, the quotient can only be **142**; the prompt's identity then gives remainder = 1000 - 994 = **6**. Check it: `7 × 142 + 6 = 1000` fits exactly. Both options starting with 143 rounded the division up; picking 7 writes the divisor as the remainder — a remainder **must be smaller than the divisor**."
    }
  },
  {
    "id": "novice-5",
    "tier": "ez",
    "tags": [
      "循环",
      "累加"
    ],
    "code": "int s = 0;\nfor (int i = 1; i <= 10; i++) {\n  s = s + i;\n}",
    "lang": "cpp",
    "answer": 1,
    "zh": {
      "prompt": "阅读下面这段程序:`s` 一开始是 0,然后让 `i` 依次取 1、2、3、…、10,每次执行 `s = s + i`。\n循环结束后 `s` 的值是多少?",
      "options": [
        "45",
        "55",
        "100",
        "10"
      ],
      "explain": "这是把 1 到 10 全部加起来,即 10 × 11 ÷ 2 = **55**。选 45 是把 1~9 相加(把 `i <= 10` 读成了 `i < 10`);选 100 是把它当成了 10 × 10;选 10 则是以为循环只执行最后一次,那是一种完全不同的赋值方式。"
    },
    "en": {
      "prompt": "Read this program: `s` starts at 0, then `i` takes the values 1, 2, 3, …, 10 in turn and each time executes `s = s + i`.\nWhat is the value of `s` after the loop ends?",
      "options": [
        "45",
        "55",
        "100",
        "10"
      ],
      "explain": "This adds 1 through 10, which is 10 × 11 ÷ 2 = **55**. Picking 45 sums 1–9 (reading `i <= 10` as `i < 10`); picking 100 treats it as 10 × 10; picking 10 assumes only the final iteration matters, which would be a completely different kind of assignment."
    }
  }
];

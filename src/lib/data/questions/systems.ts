import type { LocalizedQuestion } from '../types';

export const systemsQuestions: LocalizedQuestion[] = [
  {
    "id": "hacker-1",
    "tier": "in",
    "tags": [
      "大模型",
      "GPT"
    ],
    "code": "G = Generative      builds new output\nP = Pre-trained     trained on data first\nT = ?               the core architecture",
    "lang": "text",
    "answer": 0,
    "zh": {
      "prompt": "`ChatGPT` 里的 `GPT` 是三个英文单词的首字母缩写,其中 **T** 代表哪个词?",
      "options": [
        "Transformer",
        "Text",
        "Transfer",
        "Technology"
      ],
      "explain": "GPT 是 Generative Pre-trained Transformer 的缩写，其中 T 表示 Transformer。Text 和 Transfer 虽然形式相近，但都不是这个缩写的展开；Transformer 架构使用注意力机制处理序列。"
    },
    "en": {
      "prompt": "`GPT` in `ChatGPT` is an acronym of three English words. Which word does the **T** stand for?",
      "options": [
        "Transformer",
        "Text",
        "Transfer",
        "Technology"
      ],
      "explain": "GPT expands to Generative Pre-trained Transformer, so T stands for Transformer. Text and Transfer may look plausible but are not the expansion. The Transformer architecture uses attention to process sequences."
    }
  },
  {
    "id": "hacker-2",
    "tier": "hd",
    "tags": [
      "大模型",
      "厂商"
    ],
    "answer": 2,
    "zh": {
      "prompt": "`Mythos` 这个 AI 模型是哪家公司发布的?",
      "options": [
        "Google",
        "Meta",
        "Anthropic",
        "DeepSeek"
      ],
      "explain": "`Mythos` 出自 **Anthropic**,也就是 `Claude` 系列背后的那家公司。这题真正筛掉的是「只认识 ChatGPT」的人:知道 `Gemini` 属 Google、`Llama` 属 Meta、`DeepSeek` 是国内的,基本就能靠排除法锁定。",
      "source": "Anthropic 官方模型介绍"
    },
    "en": {
      "prompt": "Which company released the AI model called `Mythos`?",
      "options": [
        "Google",
        "Meta",
        "Anthropic",
        "DeepSeek"
      ],
      "explain": "`Mythos` comes from **Anthropic**, the company behind the `Claude` family. What this really filters out is people who only know ChatGPT: knowing that `Gemini` is Google's, `Llama` is Meta's and `DeepSeek` is Chinese is enough to lock the answer down by elimination.",
      "source": "Anthropic official model overview"
    }
  },
  {
    "id": "hacker-3",
    "tier": "ez",
    "tags": [
      "大模型",
      "API 计费"
    ],
    "code": "Hypothetical USD per 1,000,000 input tokens\nClaude Opus     15.00\nGemini 2.5 Pro   1.25\nGPT-4o          2.50\nGPT-4o mini     0.15",
    "lang": "text",
    "answer": 3,
    "zh": {
      "prompt": "按下面的假设计价表，仅处理 100 万输入 token，没有输出、缓存或其他费用，哪个模型的费用最低？这些数字只用于本题计算，并非实时价格。",
      "options": [
        "Claude Opus",
        "Gemini 2.5 Pro",
        "GPT-4o",
        "GPT-4o mini"
      ],
      "explain": "比较题目给定的输入费率即可：0.15 小于 1.25、2.50 和 15.00，因此选 GPT-4o mini。现实 API 的输入、输出、缓存与批处理可能分别计价，不能只凭模型名称或 token 总量判断账单。"
    },
    "en": {
      "prompt": "Using the hypothetical rate table below, which model costs least for 1 million input tokens, with no output, caching, or other fees? These figures are for this exercise, not live prices.",
      "options": [
        "Claude Opus",
        "Gemini 2.5 Pro",
        "GPT-4o",
        "GPT-4o mini"
      ],
      "explain": "Compare the supplied input rates: 0.15 is less than 1.25, 2.50, and 15.00, so GPT-4o mini is cheapest under these assumptions. Real APIs may price input, output, caching, and batching separately."
    }
  },
  {
    "id": "hacker-4",
    "tier": "in",
    "tags": [
      "Web",
      "前端框架"
    ],
    "code": "frontend: runs in the browser, draws the UI\nbackend:  runs on a server, owns the data",
    "lang": "text",
    "answer": 2,
    "zh": {
      "prompt": "下列哪一个是用于构建用户界面的前端库？",
      "options": [
        "Django",
        "Spring Boot",
        "React",
        "PostgreSQL"
      ],
      "explain": "React 是用于构建用户界面的库，可用于 Web 等平台。Django 与 Spring Boot 是服务端框架，PostgreSQL 是数据库。React 本身并不提供完整应用所需的全部路由和数据获取方案。"
    },
    "en": {
      "prompt": "Which of the following is a frontend library for building user interfaces?",
      "options": [
        "Django",
        "Spring Boot",
        "React",
        "PostgreSQL"
      ],
      "explain": "React is a library for building user interfaces on the web and other platforms. Django and Spring Boot are server-side frameworks, while PostgreSQL is a database. React itself does not prescribe all routing and data-fetching behavior."
    }
  },
  {
    "id": "hacker-5",
    "tier": "in",
    "tags": [
      "大模型",
      "开源"
    ],
    "answer": 0,
    "zh": {
      "prompt": "下列哪组指定版本的模型都发布了可供下载部署的权重（仍需遵守各自许可证）？",
      "options": [
        "Llama 3 与 DeepSeek-R1",
        "GPT-4o 与 Llama 3",
        "GPT-4o 与 DeepSeek-R1",
        "以上都可以"
      ],
      "explain": "Llama 3 与 DeepSeek-R1 都发布了可下载的权重，但部署和使用仍需遵守各自许可证。开放权重不等于没有使用限制；应核对具体版本，不能把一个厂商的全部模型都归为同一类别。"
    },
    "en": {
      "prompt": "Which pair of specific model releases both provide downloadable weights for self-hosting, subject to their licenses?",
      "options": [
        "Llama 3 and DeepSeek-R1",
        "GPT-4o and Llama 3",
        "GPT-4o and DeepSeek-R1",
        "All of the above"
      ],
      "explain": "Llama 3 and DeepSeek-R1 both publish downloadable model weights, subject to their respective licenses. Open weights do not mean unrestricted use. Check specific releases instead of classifying every model from a vendor identically."
    }
  }
];

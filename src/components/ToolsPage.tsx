import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Laptop, 
  Network, 
  Sparkles, 
  Calculator, 
  BookOpen, 
  Calendar, 
  Code2, 
  FileJson, 
  Search, 
  Palette, 
  Activity, 
  Server, 
  Globe, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Copy,
  Languages,
  X,
  RotateCcw,
  Check,
  Type,
  HelpCircle,
  Keyboard
} from 'lucide-react';
import { ToolCategory } from '../App';

// ==========================================
// 1. High-Frequency Nepali Word Dictionary
// ==========================================
const nepaliDictionary: Record<string, string> = {
  'nepal': 'नेपाल',
  'nepali': 'नेपाली',
  'nepaliko': 'नेपालीको',
  'nepalka': 'नेपालका',
  'nepalko': 'नेपालको',
  'nepalma': 'नेपालमा',
  'namaste': 'नमस्ते',
  'namaskar': 'नमस्कार',
  'dhanyabad': 'धन्यवाद',
  'dhanyabaad': 'धन्यवाद',
  'subhakamana': 'शुभकामना',
  'shubhakamana': 'शुभकामना',
  'kasto': 'कस्तो',
  'chha': 'छ',
  'cha': 'छ',
  'chhu': 'छु',
  'chhan': 'छन्',
  'chhin': 'छिन्',
  'chhau': 'छौ',
  'thiyo': 'थियो',
  'thie': 'थिए',
  'thiena': 'थिएन',
  'hunchha': 'हुन्छ',
  'huncha': 'हुन्छ',
  'hudaina': 'हुँदैन',
  'ho': 'हो',
  'haina': 'हैन',
  'bho': 'भो',
  'mero': 'मेरो',
  'hamro': 'हाम्रो',
  'timro': 'तिम्रो',
  'timi': 'तिमी',
  'timilai': 'तिमीलाई',
  'tapai': 'तपाईं',
  'tapaiko': 'तपाईंको',
  'tapailai': 'तपाईंलाई',
  'ma': 'म',
  'lai': 'लाई',
  'ko': 'को',
  'ka': 'का',
  'ki': 'की',
  'le': 'ले',
  'bata': 'बाट',
  'dekhi': 'देखि',
  'haru': 'हरू',
  'sanga': 'सँग',
  'sit': 'सित',
  'sita': 'सित',
  'ramro': 'राम्रो',
  'sundar': 'सुन्दर',
  'desh': 'देश',
  'deshko': 'देशको',
  'aaja': 'आज',
  'bholi': 'भोलि',
  'parsi': 'पर्सि',
  'hijo': 'हिजो',
  'asti': 'अस्ति',
  'pani': 'पनि',
  'ani': 'अनि',
  'tara': 'तर',
  'ra': 'र',
  'kina': 'किन',
  'kin': 'किन',
  'kasari': 'कसरी',
  'kahile': 'कहिले',
  'kaha': 'कहाँ',
  'kata': 'कतै',
  'ke': 'के',
  'k': 'के',
  'swagatam': 'स्वागतम्',
  'swagat': 'स्वागत',
  'sabai': 'सबै',
  'sabaiko': 'सबैको',
  'sabailai': 'सबैलाई',
  'dherai': 'धेरै',
  'thorai': 'थोरै',
  'sanchai': 'सञ्चै',
  'sanchai chha': 'सञ्चै छ',
  'khabar': 'खबर',
  'ghar': 'घर',
  'kaam': 'काम',
  'kam': 'काम',
  'naam': 'नाम',
  'roshan': 'रोशन',
  'sah': 'साह',
  'sathi': 'साथी',
  'saathi': 'साथी',
  'bato': 'बाटो',
  'manchhe': 'मान्छे',
  'sansar': 'संसार',
  'samaya': 'समय',
  'shanti': 'शान्ति',
  'shantimay': 'शान्तिमय',
  'prem': 'प्रेम',
  'maya': 'माया',
  'school': 'स्कूल',
  'college': 'कलेज',
  'kathmandu': 'काठमाडौँ',
  'pokhara': 'पोखरा',
  'lalitpur': 'ललितपुर',
  'bhaktapur': 'भक्तपुर',
  'simara': 'सिमरा',
  'birgunj': 'वीरगन्ज',
  'chitwan': 'चितवन',
  'butwal': 'बुटवल',
  'dharan': 'धरान',
  'biratnagar': 'विराटनगर'
};

const phoneticVowels: Record<string, string> = {
  'aa': 'आ', 'a': 'अ', 'ii': 'ई', 'ee': 'ई', 'i': 'इ',
  'uu': 'ऊ', 'oo': 'ऊ', 'u': 'उ', 'e': 'ए', 'ai': 'ऐ',
  'o': 'ओ', 'au': 'औ', 'ou': 'औ', 'ri': 'ऋ', 'Ri': 'ऋ'
};

const phoneticMatras: Record<string, string> = {
  'aa': 'ा', 'a': '', 'ii': 'ी', 'ee': 'ी', 'i': 'ि',
  'uu': 'ू', 'oo': 'ू', 'u': 'ु', 'e': 'े', 'ai': 'ै',
  'o': 'ो', 'au': 'ौ', 'ou': 'ौ', 'ri': 'ृ', 'Ri': 'ृ'
};

const phoneticConsonants: Record<string, string> = {
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
  'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'yn': 'ञ',
  'T': 'ट', 'Th': 'ठ', 'D': 'ड', 'Dh': 'ढ', 'N': 'ण',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
  'p': 'प', 'ph': 'फ', 'f': 'फ', 'b': 'ब', 'bh': 'भ', 'v': 'भ',
  'm': 'म', 'y': 'य', 'r': 'र', 'l': 'ल', 'w': 'व',
  'sh': 'श', 'shh': 'ष', 'Sh': 'ष', 's': 'स', 'h': 'ह',
  'ksh': 'क्ष', 'x': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ', 'gya': 'ज्ञ'
};

// ====================================================
// 2. Romanized English -> Nepali Unicode Transliteration
// ====================================================
function romanizedWordToUnicode(rawWord: string): string {
  const lower = rawWord.toLowerCase();
  if (nepaliDictionary[lower]) {
    return nepaliDictionary[lower];
  }

  let i = 0;
  let out = '';
  const len = rawWord.length;

  while (i < len) {
    const isStart = (i === 0);
    const c3 = rawWord.substring(i, i + 3).toLowerCase();
    const c2 = rawWord.substring(i, i + 2).toLowerCase();
    const c1 = rawWord.substring(i, i + 1);
    const c1Lower = c1.toLowerCase();

    // Check numbers
    if (/[0-9]/.test(c1)) {
      const numMap: Record<string, string> = {
        '0':'०','1':'१','2':'२','3':'३','4':'४','5':'५','6':'६','7':'७','8':'८','9':'९'
      };
      out += numMap[c1] || c1;
      i += 1;
      continue;
    }

    // Check punctuation
    if (/[.,!?;:\-()"'\/]/.test(c1)) {
      if (c1 === '.') out += '।';
      else out += c1;
      i += 1;
      continue;
    }

    // Check independent vowels
    if (isStart || out.endsWith(' ') || out.length === 0) {
      if (phoneticVowels[c2]) {
        out += phoneticVowels[c2];
        i += 2;
        continue;
      }
      if (phoneticVowels[c1Lower]) {
        out += phoneticVowels[c1Lower];
        i += 1;
        continue;
      }
    }

    // Match consonants
    let matchedConsonant: string | null = null;
    let consLen = 0;

    if (phoneticConsonants[c3]) {
      matchedConsonant = phoneticConsonants[c3];
      consLen = 3;
    } else if (phoneticConsonants[c2]) {
      matchedConsonant = phoneticConsonants[c2];
      consLen = 2;
    } else if (phoneticConsonants[c1Lower]) {
      matchedConsonant = phoneticConsonants[c1Lower];
      consLen = 1;
    }

    if (matchedConsonant) {
      i += consLen;
      const next2 = rawWord.substring(i, i + 2).toLowerCase();
      const next1 = rawWord.substring(i, i + 1).toLowerCase();

      if (phoneticMatras[next2] !== undefined) {
        out += matchedConsonant + phoneticMatras[next2];
        i += 2;
      } else if (phoneticMatras[next1] !== undefined) {
        out += matchedConsonant + phoneticMatras[next1];
        i += 1;
      } else {
        if (i >= len) {
          out += matchedConsonant;
        } else {
          out += matchedConsonant + '्';
        }
      }
      continue;
    }

    out += c1;
    i += 1;
  }

  return out;
}

function convertEnglishToUnicode(text: string): string {
  if (!text) return '';
  return text.replace(/[A-Za-z0-9]+/g, (word) => romanizedWordToUnicode(word));
}

// ==========================================
// 3. High-Accuracy Unicode -> Preeti Converter
// ==========================================
function convertUnicodeToPreeti(unicodeStr: string): string {
  if (!unicodeStr) return '';
  let str = unicodeStr;

  // 1. Preeti Reph (र् + consonant -> consonant + {)
  str = str.replace(/र्([क-ह])/g, '$1{');
  
  // 2. Preeti Short 'ि' matra (precedes consonant or consonant cluster)
  str = str.replace(/([क-ह]्[क-ह]्[क-ह]|[क-ह]्[क-ह]|[क-ह])ि/g, 'l$1');

  // 3. Preeti Half-letter and conjunct mappings
  const conjunctMap: Record<string, string> = {
    'क्ष': 'I',
    'त्र': 'q',
    'ज्ञ': '1',
    'श्र': '>',
    'द्य': 'B',
    'द्ध': '4',
    'त्त': 'Tt',
    'न्न': 'Gg',
    'म्म': 'Dd',
    'ल्ल': 'Nn',
    'स्त': ':t',
    'स्क': ':s',
    'स्प': ':k',
    'स्म': ':d',
    'स्य': ':o',
    'स्व': ':j',
    'स्न': ':g',
    'स्थ': ':y',
    'ष्ट': 'i6',
    'ष्ठ': 'i7',
    'ष्ण': 'i0f',
    'ष्क': 'is',
    'ष्प': 'ik',
    'श्व': 'Zj',
    'श्च': 'Zr',
    'श्न': 'Zg',
    'श्ल': 'Zn',
    'श्य': 'Zo',
    'न्त': 'Gt',
    'न्थ': 'Gy',
    'न्द': 'Gb',
    'न्ध': 'Gw',
    'न्प': 'Gk',
    'न्फ': 'Gkm',
    'न्ब': 'Ga',
    'न्भ': 'Ge',
    'न्म': 'Gd',
    'न्य': 'Go',
    'न्व': 'Gj',
    'न्स': 'G;',
    'म्क': 'Ds',
    'म्त': 'Dt',
    'म्प': 'Dk',
    'म्फ': 'Dkm',
    'म्ब': 'Da',
    'म्भ': 'De',
    'म्य': 'Do',
    'म्ल': 'Dn',
    'प्र': 'k|',
    'फ्र': 'km|',
    'ब्र': 'a|',
    'भ्र': 'e|',
    'म्र': 'd|',
    'ग्र': 'u|',
    'ध्र': 'w|',
    'स्र': ';|',
    'क्र': 'qm',
    'द्र': 'b|',
    'ट्र': '6«',
    'ठ्र': '7«',
    'ड्र': '8«',
    'ढ्र': '9«',
    // Half letters standalone
    'क्': 'S',
    'ख्': 'V',
    'ग्': 'U',
    'घ्': '3|',
    'च्': 'R',
    'छ्': '5|',
    'ज्': 'H',
    'झ्': 'H|',
    'ञ्': '`|',
    'ण्': '0',
    'त्': 'T',
    'थ्': 'Y',
    'द्': 'b|',
    'ध्': 'W',
    'न्': 'G',
    'प्': 'K',
    'फ्': 'km|',
    'ब्': 'A',
    'भ्': 'E',
    'म्': 'D',
    'य्': 'o|',
    'र्': '{',
    'ल्': 'N',
    'व्': 'J',
    'श्': 'Z',
    'ष्': 'i',
    'स्': ':',
    'ह्': 'x|'
  };

  for (const [k, v] of Object.entries(conjunctMap)) {
    str = str.split(k).join(v);
  }

  // 4. Base Character Map
  const baseMap: Record<string, string> = {
    '०': ')', '१': '!', '२': '@', '३': '#', '४': '$', '५': '%', '६': '^', '७': '&', '८': '*', '९': '(',
    'अ': 'c', 'आ': 'cf', 'इ': 'O', 'ई': 'O{', 'उ': 'p', 'ऊ': 'pm', 'ऋ': 'C', 'ए': 'P', 'ऐ': 'P]', 'ओ': 'cf]', 'औ': 'cf}', 'अं': 'c+', 'अः': 'cM',
    'क': 's', 'ख': 'v', 'ग': 'u', 'घ': '3', 'ङ': 'ª',
    'च': 'r', 'छ': '5', 'ज': 'h', 'झ': 'H', 'ञ': '`',
    'ट': '6', 'ठ': '7', 'ड': '8', 'ढ': '9', 'ण': '0f',
    'त': 't', 'थ': 'y', 'द': 'b', 'ध': 'w', 'न': 'g',
    'प': 'k', 'फ': 'km', 'ब': 'a', 'भ': 'e', 'म': 'd',
    'य': 'o', 'र': '/', 'ल': 'n', 'व': 'j', 'श': 'z',
    'ष': 'if', 'स': ';', 'ह': 'x',
    'ा': 'f', 'ी': 'L', 'ु': "'", 'ू': '"', 'े': ']', 'ै': '}', 'ो': 'f]', 'ौ': 'f}',
    '्': '|', 'ं': '+', 'ँ': 'F', 'ः': 'M', 'ृ': '[', '।': '>'
  };

  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    result += baseMap[char] !== undefined ? baseMap[char] : char;
  }
  return result;
}

// ==========================================
// 4. Preeti -> Unicode Reverse Converter
// ==========================================
function convertPreetiToUnicode(preetiStr: string): string {
  if (!preetiStr) return '';
  let str = preetiStr;
  
  const revMap: Record<string, string> = {
    ')': '०', '!': '१', '@': '२', '#': '३', '$': '४', '%': '५', '^': '६', '&': '७', '*': '८', '(': '९',
    'cf]': 'ओ', 'cf}': 'औ', 'cf': 'आ', 'c+': 'अं', 'cM': 'अः', 'c': 'अ', 'O{': 'ई', 'O': 'इ', 'pm': 'ऊ', 'p': 'उ', 'C': 'ऋ', 'P]': 'ऐ', 'P': 'ए',
    's': 'क', 'v': 'ख', 'u': 'ग', '3': 'घ', 'ª': 'ङ',
    'r': 'च', '5': 'छ', 'h': 'ज', 'H': 'झ', '`': 'ञ',
    '6': 'ट', '7': 'ठ', '8': 'ड', '9': 'ढ', '0f': 'ण',
    't': 'त', 'y': 'थ', 'b': 'द', 'w': 'ध', 'g': 'न',
    'k': 'प', 'km': 'फ', 'a': 'ब', 'e': 'भ', 'd': 'म',
    'o': 'य', '/': 'र', 'n': 'ल', 'j': 'व', 'z': 'श',
    'if': 'ष', ';': 'स', 'x': 'ह', 'I': 'क्ष', 'q': 'त्र', '1': 'ज्ञ',
    'f]': 'ो', 'f}': 'ौ', 'f': 'ा', 'L': 'ी', "'": 'ु', '"': 'ू', ']': 'े', '}': 'ै',
    '+': 'ं', 'F': 'ँ', 'M': 'ः', '|': '्', '>': '।',
    ':t': 'स्त', ':s': 'स्क', ':k': 'स्प', ':d': 'स्म', ':o': 'स्य', ':j': 'स्व', ':g': 'स्न', ':y': 'स्थ',
    ':': 'स्', 'G': 'न्', 'D': 'म्', 'T': 'त्', 'N': 'ल्', 'J': 'व्', 'A': 'ब्', 'E': 'भ्', 'R': 'च्',
    'S': 'क्', 'V': 'ख्', 'U': 'ग्', 'W': 'ध्', 'K': 'प्', 'Z': 'श्', 'i': 'ष्'
  };

  const keys = Object.keys(revMap).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    str = str.split(k).join(revMap[k]);
  }
  str = str.replace(/l([क-ह])/g, '$1ि');
  return str;
}

// Tool Catalog definitions
interface ToolItem {
  id: string;
  name: string;
  category: 'educational' | 'tech' | 'networking';
  icon: typeof Calculator;
  tag: string;
  description: string;
  features: string[];
  status: 'Ready' | 'Popular' | 'New';
  isInteractive?: boolean;
}

const allTools: ToolItem[] = [
  // Educational & Typography Tools
  {
    id: 'edu-unicode',
    name: 'Romanized Nepali to Unicode & Preeti Suite',
    category: 'educational',
    icon: Languages,
    tag: '3-in-1 Typography Engine',
    description: 'Type Nepali in English (Romanized) and get both standard Nepali Unicode and Preeti Font live with 3-box synchronization.',
    features: [
      'Type English (e.g. Nepali) ➔ Unicode (नेपाली) ➔ Preeti (g]kfnL)',
      'Real-time 3-box live synchronization',
      'Bidirectional Unicode & Preeti converter',
      'One-click copy for both Unicode and Preeti'
    ],
    status: 'Popular',
    isInteractive: true
  },
  {
    id: 'edu-1',
    name: 'GPA & Marks Estimator',
    category: 'educational',
    icon: Calculator,
    tag: 'Academic Calculator',
    description: 'Calculate semester GPA, percentage conversions, and academic standing with customizable grading scales.',
    features: ['Semester & CGPA conversion', 'Weighted credit calculation', 'Instant printable report'],
    status: 'Ready'
  },
  {
    id: 'edu-2',
    name: 'School ERP & Record Helper',
    category: 'educational',
    icon: BookOpen,
    tag: 'Management Tool',
    description: 'Streamline student rosters, grading sheets, attendance logs, and academic database schemas.',
    features: ['Gradebook export formatters', 'CSV roster validator', 'Batch report generator'],
    status: 'Ready'
  },
  {
    id: 'edu-3',
    name: 'Class Routine & Schedule Planner',
    category: 'educational',
    icon: Calendar,
    tag: 'Organization',
    description: 'Create conflict-free school and college timetables with teacher assignment and room allocation checks.',
    features: ['Visual weekly grid planner', 'Subject load balancing', 'Mobile-friendly export'],
    status: 'New'
  },

  // Tech / Web Dev Tools
  {
    id: 'tech-1',
    name: 'JSON & API Payload Formatter',
    category: 'tech',
    icon: FileJson,
    tag: 'Full Stack Dev',
    description: 'Instantly format, validate, minify, and inspect JSON payloads with syntax error diagnostics.',
    features: ['One-click formatting & copy', 'Tree view inspection', 'TypeScript interface generator'],
    status: 'Popular'
  },
  {
    id: 'tech-2',
    name: 'SEO & Meta Tag Studio',
    category: 'tech',
    icon: Search,
    tag: 'Web Optimization',
    description: 'Generate and test Open Graph, Twitter Cards, and Google JSON-LD schema snippets for high search visibility.',
    features: ['Live social card preview', 'Schema.org JSON-LD builder', 'SERP snippet simulator'],
    status: 'Ready'
  },
  {
    id: 'tech-3',
    name: 'CSS Glass & Gradient Engine',
    category: 'tech',
    icon: Palette,
    tag: 'UI & Styling',
    description: 'Interactive visual creator for modern glassmorphism blur layers, radial glow spotlights, and mesh gradients.',
    features: ['Tailwind CSS snippet output', 'Cross-browser CSS code', 'Real-time backdrop preview'],
    status: 'New'
  },
  {
    id: 'tech-4',
    name: 'REST API & Webhook Tester',
    category: 'tech',
    icon: Code2,
    tag: 'Backend Utilities',
    description: 'Quickly draft, test, and inspect HTTP headers, status codes, and JSON response mockups.',
    features: ['CURL command generator', 'Header validator', 'Status code cheatsheet'],
    status: 'Ready'
  },

  // Networking & IT Support Tools
  {
    id: 'net-1',
    name: 'IP & CIDR Subnet Calculator',
    category: 'networking',
    icon: Server,
    tag: 'Network Engineering',
    description: 'Calculate subnet masks, usable host IP ranges, wildcard masks, and broadcast addresses for IPv4/IPv6 networks.',
    features: ['CIDR notation to Subnet Mask', 'Usable IP range counter', 'Binary bit breakdown'],
    status: 'Popular'
  },
  {
    id: 'net-2',
    name: 'DNS & Domain Record Inspector',
    category: 'networking',
    icon: Globe,
    tag: 'Network Diagnostics',
    description: 'Quick reference and query helper for A, AAAA, CNAME, MX, TXT (SPF/DKIM), and NS records.',
    features: ['Record configuration templates', 'Email SPF/DKIM helper', 'TTL guidelines'],
    status: 'Ready'
  },
  {
    id: 'net-3',
    name: 'Port & Protocol Reference Hub',
    category: 'networking',
    icon: ShieldCheck,
    tag: 'IT Security & Support',
    description: 'Comprehensive directory of standard TCP/UDP ports, firewall security rules, and troubleshooting protocols.',
    features: ['Instant search by port or service', 'Security & vulnerability notes', 'Default router ports guide'],
    status: 'Ready'
  },
  {
    id: 'net-4',
    name: 'Bandwidth & Latency Analyzer',
    category: 'networking',
    icon: Activity,
    tag: 'Diagnostics',
    description: 'Estimate file transfer durations, connection speed throughput, and latency round-trip estimations.',
    features: ['Download/Upload time calculator', 'Mbps to MB/s converter', 'Jitter & Ping guidelines'],
    status: 'New'
  }
];

interface ToolsPageProps {
  activeCategory?: ToolCategory;
  onSelectCategory?: (category: ToolCategory) => void;
}

export default function ToolsPage({ activeCategory = 'all', onSelectCategory }: ToolsPageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Nepali Suite Converter State
  const [isUnicodeModalOpen, setIsUnicodeModalOpen] = useState(false);
  const [converterMode, setConverterMode] = useState<'englishToAll' | 'unicodeToPreeti' | 'preetiToUnicode'>('englishToAll');
  
  // Three synchronized states
  const [englishInput, setEnglishInput] = useState('Nepali namaste sabailai mero desh nepal ho.');
  const [directUnicodeInput, setDirectUnicodeInput] = useState('नमस्कार सबैलाई, मेरो देश नेपाल हो।');
  const [directPreetiInput, setDirectPreetiInput] = useState("g]kfnL gd:t]");
  
  const [copiedUnicode, setCopiedUnicode] = useState(false);
  const [copiedPreeti, setCopiedPreeti] = useState(false);
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  // Synchronized dynamic calculations based on current active mode
  const { displayUnicode, displayPreeti } = useMemo(() => {
    if (converterMode === 'englishToAll') {
      const uni = convertEnglishToUnicode(englishInput);
      const preeti = convertUnicodeToPreeti(uni);
      return { displayUnicode: uni, displayPreeti: preeti };
    } else if (converterMode === 'unicodeToPreeti') {
      const preeti = convertUnicodeToPreeti(directUnicodeInput);
      return { displayUnicode: directUnicodeInput, displayPreeti: preeti };
    } else {
      const uni = convertPreetiToUnicode(directPreetiInput);
      return { displayUnicode: uni, displayPreeti: directPreetiInput };
    }
  }, [converterMode, englishInput, directUnicodeInput, directPreetiInput]);

  const handleCopyUnicode = () => {
    navigator.clipboard.writeText(displayUnicode);
    setCopiedUnicode(true);
    setTimeout(() => setCopiedUnicode(false), 2000);
  };

  const handleCopyPreeti = () => {
    navigator.clipboard.writeText(displayPreeti);
    setCopiedPreeti(true);
    setTimeout(() => setCopiedPreeti(false), 2000);
  };

  const handleTabClick = (cat: ToolCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  const handleCopyToolLink = (id: string) => {
    navigator.clipboard.writeText(`https://rsn01.portfolio/#tools?id=${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLaunchTool = (tool: ToolItem) => {
    if (tool.id === 'edu-unicode') {
      setIsUnicodeModalOpen(true);
    } else {
      alert(`Launching ${tool.name}... (Ready to integrate full custom logic)`);
    }
  };

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8 bg-[#050505] grid-overlay">
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-950/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-8 h-[1px] bg-purple-500" />
              <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">PORTFOLIO UTILITIES</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
            >
              Tools & Utilities Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed"
            >
              A curated collection of practical utilities built for Romanized Nepali typing, Unicode & Preeti font conversions, web development, and network systems administration.
            </motion.p>
          </div>

          {/* Quick Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-72"
          >
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleTabClick('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                : 'glass text-zinc-400 hover:text-white hover:border-purple-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Categories ({allTools.length})</span>
          </button>

          <button
            onClick={() => handleTabClick('educational')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === 'educational'
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                : 'glass text-zinc-400 hover:text-white hover:border-purple-500/30'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
            <span>Educational ({allTools.filter(t => t.category === 'educational').length})</span>
          </button>

          <button
            onClick={() => handleTabClick('tech')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === 'tech'
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                : 'glass text-zinc-400 hover:text-white hover:border-purple-500/30'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-purple-300" />
            <span>Tech & Web ({allTools.filter(t => t.category === 'tech').length})</span>
          </button>

          <button
            onClick={() => handleTabClick('networking')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === 'networking'
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                : 'glass text-zinc-400 hover:text-white hover:border-purple-500/30'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-purple-300" />
            <span>Networking ({allTools.filter(t => t.category === 'networking').length})</span>
          </button>
        </div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchTerm}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const isCopied = copiedId === tool.id;

              return (
                <div
                  key={tool.id}
                  className="glow-card glass p-6 rounded-3xl border border-white/10 hover:border-purple-500/30 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-purple-600/5 blur-2xl group-hover:bg-purple-600/10 transition-colors pointer-events-none" />

                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full border ${
                          tool.status === 'Popular'
                            ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                            : tool.status === 'New'
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}>
                          {tool.status}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono tracking-widest uppercase text-purple-400/80 block mb-1">
                      {tool.tag}
                    </span>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-200 transition-colors mb-2.5">
                      {tool.name}
                    </h3>

                    <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-light">
                      {tool.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-4 border-t border-white/5 mb-6">
                      {tool.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleCopyToolLink(tool.id)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 text-zinc-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
                      title="Copy tool share link"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-purple-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleLaunchTool(tool)}
                      className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-purple-600 text-white font-medium text-xs tracking-wider transition-all duration-300 flex items-center gap-1.5 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    >
                      <span>Launch</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl border border-white/5">
            <p className="text-zinc-400 text-base">No tools found matching your search query.</p>
            <button
              onClick={() => { setSearchTerm(''); handleTabClick('all'); }}
              className="mt-4 px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3-in-1 Interactive Nepali Romanized to Unicode & Preeti Converter Modal   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isUnicodeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUnicodeModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="relative w-full max-w-6xl glass border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto max-h-[94vh]"
            >
              {/* Top Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-inner">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-white text-base md:text-lg">
                        Romanized Nepali ➔ Unicode ➔ Preeti Converter
                      </h3>
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-semibold">
                        3-in-1 Live Flow
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Type in English to get live Nepali Unicode and Preeti Font code simultaneously
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCheatsheet(!showCheatsheet)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                      showCheatsheet 
                        ? 'bg-purple-600/30 border-purple-500 text-purple-200' 
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                    title="Toggle Phonetic Key Guide"
                  >
                    <Keyboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Phonetic Key Guide</span>
                  </button>

                  <button
                    onClick={() => setIsUnicodeModalOpen(false)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mode Switcher & Quick Samples Bar */}
              <div className="px-6 py-3 bg-black/50 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                {/* Modes */}
                <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setConverterMode('englishToAll')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      converterMode === 'englishToAll'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    English (Romanized) ➔ All
                  </button>

                  <button
                    onClick={() => setConverterMode('unicodeToPreeti')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      converterMode === 'unicodeToPreeti'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Unicode ➔ Preeti
                  </button>

                  <button
                    onClick={() => setConverterMode('preetiToUnicode')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      converterMode === 'preetiToUnicode'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Preeti ➔ Unicode
                  </button>
                </div>

                {/* Quick Sample Buttons */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-zinc-500 font-mono text-[10px] uppercase">Quick Samples:</span>
                  <button
                    onClick={() => {
                      if (converterMode === 'englishToAll') setEnglishInput('Nepali');
                      else if (converterMode === 'unicodeToPreeti') setDirectUnicodeInput('नेपाली');
                      else setDirectPreetiInput('g]kfnL');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 text-xs border border-purple-500/20 transition-all font-mono"
                  >
                    "Nepali"
                  </button>

                  <button
                    onClick={() => {
                      if (converterMode === 'englishToAll') setEnglishInput('namaste sabailai');
                      else if (converterMode === 'unicodeToPreeti') setDirectUnicodeInput('नमस्ते सबैलाई');
                      else setDirectPreetiInput('gd:t] ;a}nfO{');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs border border-white/5 transition-all font-mono"
                  >
                    "namaste"
                  </button>

                  <button
                    onClick={() => {
                      if (converterMode === 'englishToAll') setEnglishInput('mero desh nepal sundar chha.');
                      else if (converterMode === 'unicodeToPreeti') setDirectUnicodeInput('मेरो देश नेपाल सुन्दर छ।');
                      else setDirectPreetiInput("d]/f] b]z g]kfn ;'Gb/ 5 .");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs border border-white/5 transition-all font-mono"
                  >
                    "mero desh nepal"
                  </button>

                  <button
                    onClick={() => {
                      setEnglishInput('');
                      setDirectUnicodeInput('');
                      setDirectPreetiInput('');
                    }}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Clear All"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Phonetic Cheatsheet Drawer */}
              <AnimatePresence>
                {showCheatsheet && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-purple-950/20 border-b border-purple-500/20 px-6 py-4 text-xs font-mono text-zinc-300 space-y-2"
                  >
                    <div className="flex items-center justify-between text-purple-300 font-semibold mb-2">
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        Phonetic Romanized Typing Map
                      </span>
                      <button onClick={() => setShowCheatsheet(false)} className="text-[11px] text-zinc-400 hover:text-white">
                        Hide
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-purple-400 font-bold">k/kh/g/gh</span> ➔ क ख ग घ
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-purple-400 font-bold">ch/chh/j/jh</span> ➔ च छ ज झ
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-purple-400 font-bold">t/th/d/dh/n</span> ➔ त थ द ध न
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-purple-400 font-bold">p/ph/b/bh/m</span> ➔ प फ ब भ म
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-purple-400 font-bold">sh/s/h/gya</span> ➔ श स ह ज्ञ
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-purple-400 font-bold">aa/i/ee/u/oo</span> ➔ आ इ ई उ ऊ
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Synchronized 3-Box / Dual-Box Grid */}
              <div className="p-6 overflow-y-auto flex-1">
                {converterMode === 'englishToAll' ? (
                  /* 3-Box Tri-Panel Synchronized View */
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* Box 1: English Input */}
                    <div className="flex flex-col space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                          <Keyboard className="w-4 h-4 text-purple-400" />
                          1. Type in English
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {englishInput.length} chars
                        </span>
                      </div>

                      <div className="relative">
                        <textarea
                          rows={8}
                          value={englishInput}
                          onChange={(e) => setEnglishInput(e.target.value)}
                          placeholder="Type in English (e.g. Nepali, namaste, mero desh nepal, kasto chha)..."
                          className="w-full h-64 p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.04] transition-all resize-none font-sans leading-relaxed shadow-inner"
                        />
                        <span className="absolute bottom-3 left-4 text-[10px] font-mono text-purple-400/80 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                          Live Phonetic Engine
                        </span>
                      </div>
                    </div>

                    {/* Box 2: Nepali Unicode Output */}
                    <div className="flex flex-col space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-fuchsia-300 font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-fuchsia-400" />
                          2. Nepali Unicode
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {displayUnicode.length} chars
                        </span>
                      </div>

                      <div className="relative">
                        <textarea
                          rows={8}
                          value={displayUnicode}
                          onChange={(e) => setEnglishInput(e.target.value)}
                          placeholder="नेपाली युनिकोड यहाँ स्वतः देखा पर्नेछ..."
                          className="w-full h-64 p-4 bg-fuchsia-950/10 border border-fuchsia-500/20 rounded-2xl text-sm text-fuchsia-100 placeholder-zinc-600 focus:outline-none transition-all resize-none font-sans leading-relaxed selection:bg-fuchsia-500/40"
                        />

                        <button
                          onClick={handleCopyUnicode}
                          className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-xs tracking-wider flex items-center gap-1.5 shadow-lg shadow-fuchsia-600/30 transition-all hover:scale-105 active:scale-95"
                          title="Copy Nepali Unicode"
                        >
                          {copiedUnicode ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>COPY UNICODE</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Box 3: Preeti Font Output */}
                    <div className="flex flex-col space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1.5">
                          <Type className="w-4 h-4 text-emerald-400" />
                          3. Preeti Font Code
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {displayPreeti.length} chars
                        </span>
                      </div>

                      <div className="relative">
                        <textarea
                          readOnly
                          rows={8}
                          value={displayPreeti}
                          placeholder="Preeti font code (e.g. g]kfnL) will appear here..."
                          className="w-full h-64 p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-2xl text-sm text-emerald-100 placeholder-zinc-600 focus:outline-none transition-all resize-none font-mono leading-relaxed selection:bg-emerald-500/40"
                        />

                        <button
                          onClick={handleCopyPreeti}
                          className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
                          title="Copy Preeti Font text"
                        >
                          {copiedPreeti ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>COPY PREETI</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* Dual Box Direct Conversion View (Unicode <-> Preeti) */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Source Input */}
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                          <Type className="w-3.5 h-3.5" />
                          {converterMode === 'unicodeToPreeti' ? 'Nepali Unicode Input' : 'Preeti Font Input'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {converterMode === 'unicodeToPreeti' ? directUnicodeInput.length : directPreetiInput.length} chars
                        </span>
                      </div>

                      <textarea
                        rows={8}
                        value={converterMode === 'unicodeToPreeti' ? directUnicodeInput : directPreetiInput}
                        onChange={(e) => {
                          if (converterMode === 'unicodeToPreeti') setDirectUnicodeInput(e.target.value);
                          else setDirectPreetiInput(e.target.value);
                        }}
                        placeholder={
                          converterMode === 'unicodeToPreeti'
                            ? 'यहाँ नेपाली युनिकोड टाइप गर्नुहोस् वा पेस्ट गर्नुहोस्...'
                            : 'Type or paste Preeti text here (e.g. g]kfnL)...'
                        }
                        className="w-full h-64 p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.04] transition-all resize-none font-sans leading-relaxed"
                      />
                    </div>

                    {/* Converted Output */}
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          {converterMode === 'unicodeToPreeti' ? 'Preeti Font Output' : 'Nepali Unicode Output'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {converterMode === 'unicodeToPreeti' ? displayPreeti.length : displayUnicode.length} chars
                        </span>
                      </div>

                      <div className="relative">
                        <textarea
                          readOnly
                          rows={8}
                          value={converterMode === 'unicodeToPreeti' ? displayPreeti : displayUnicode}
                          placeholder="Converted output will appear here instantly..."
                          className="w-full h-64 p-4 bg-purple-950/10 border border-purple-500/20 rounded-2xl text-sm text-purple-100 placeholder-zinc-600 focus:outline-none transition-all resize-none font-mono leading-relaxed"
                        />

                        <button
                          onClick={converterMode === 'unicodeToPreeti' ? handleCopyPreeti : handleCopyUnicode}
                          className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
                        >
                          {(converterMode === 'unicodeToPreeti' ? copiedPreeti : copiedUnicode) ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>COPY RESULT</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Modal Footer Note */}
              <div className="px-6 py-3.5 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Live instant translation: Supports English typing, standard Unicode Devanagari, and authentic Preeti keyboard layouts.
                </span>

                <button
                  onClick={() => setIsUnicodeModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

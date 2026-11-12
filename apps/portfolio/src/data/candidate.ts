export const CANDIDATE = {
  name: { en: 'Mahmoud Mohsen', ar: 'محمود محسن' },
  role: {
    en: 'Mobile App UI/UX Designer & Front-End Developer (AI)',
    ar: 'مصمم واجهات وتجربة مستخدم ومطور واجهات أمامية بالذكاء الاصطناعي',
  },
  location: { en: 'Cairo, Egypt · Remote Full-Time Ready', ar: 'القاهرة، مصر · جاهز للعمل عن بُعد بدوام كامل' },
  email: 'mahmoudmohsenatta@gmail.com',
  phone: '+20 109 790 8137',
  telHref: 'tel:+201097908137',
  links: {
    // Update with your exact profile URLs before deploying
    github: 'https://github.com/mahmoudmohsenatta/protfolio',
    linkedin: 'https://www.linkedin.com/in/mahmoud-mohsen-9684601b5/',
    behance: 'https://behance.net',
    figmaSystem: '#design-system',
    figmaNabd: '/work/nabd-mobile',
  },
  experience: [
    {
      role: { en: 'Mobile App & Front-End Software Engineer', ar: 'مهندس برمجيات تطبيقات الجوال والواجهات الأمامية' },
      company: 'Mohr AI Solution',
      period: { en: 'Jan 2025 – Present · Remote', ar: 'يناير ٢٠٢٥ – حتى الآن · عن بُعد' },
      bullets: [
        {
          en: 'Designed and developed responsive mobile and web applications using React Native, Expo, React, and TypeScript.',
          ar: 'تصميم وتطوير تطبيقات جوال وويب متجاوبة باستخدام React Native وExpo وReact وTypeScript.',
        },
        {
          en: 'Created intuitive UI/UX wireframes and interactive prototypes in Figma with seamless cross-platform RTL support.',
          ar: 'إعداد مخططات UI/UX ونماذج أولية تفاعلية في Figma مع دعم متكامل لاتجاه العربية RTL.',
        },
        {
          en: 'Integrated RESTful APIs, payment gateways, and AI-powered workflows to boost product functionality and engagement.',
          ar: 'ربط واجهات RESTful APIs وبوابات الدفع الإلكتروني وتدفقات العمل المدعومة بالذكاء الاصطناعي.',
        },
      ],
    },
  ],
  priorProjects: [
    {
      title: 'ProjectFlow – Cross-Platform App & UI Hub',
      stack: 'React Native · Next.js · Tailwind CSS',
      desc: {
        en: 'Architected cross-platform mobile interfaces and responsive web dashboards with AI assistant features and modern UI/UX design systems.',
        ar: 'هيكلة واجهات جوال متعددة المنصات ولوحات تحكم ويب متجاوبة مع ميزات مساعد ذكي ونظام تصميم حديث.',
      },
    },
    {
      title: 'Iso-meter – Performance Analytics & UI Utility',
      stack: 'React · TypeScript · UI Components',
      desc: {
        en: 'Developed dynamic data-driven dashboard interfaces featuring optimized rendering and responsive multi-device layouts.',
        ar: 'تطوير واجهات تحليلات بيانات ديناميكية بأداء محسن وتصميم متجاوب لمختلف الأجهزة.',
      },
    },
  ],
  education: [
    {
      degree: { en: 'M.Sc. in Data Science & Artificial Intelligence', ar: 'ماجستير علوم البيانات والذكاء الاصطناعي' },
      school: { en: 'Arab Open University (AOU) · Cairo', ar: 'الجامعة العربية المفتوحة · القاهرة' },
      period: { en: 'Expected 2028', ar: 'متوقع ٢٠٢٨' },
    },
    {
      degree: { en: 'B.Sc. in Computer Science', ar: 'بكالوريوس علوم الحاسب' },
      school: { en: 'Arab Open University (AOU) · Cairo', ar: 'الجامعة العربية المفتوحة · القاهرة' },
      period: { en: 'Aug 2019 – Aug 2023', ar: '٢٠١٩ – ٢٠٢٣' },
    },
  ],
  demos: {
    darWeb: process.env.NEXT_PUBLIC_DAR_URL || 'http://localhost:3001',
    nabdPartner: process.env.NEXT_PUBLIC_PARTNER_URL || 'http://localhost:3002',
    nabdWeb: process.env.NEXT_PUBLIC_NABD_WEB_URL || 'http://localhost:8081',
    nabdApkUrl: process.env.NEXT_PUBLIC_NABD_APK_URL || '',
    expoUrl: process.env.NEXT_PUBLIC_EXPO_URL || 'exp://127.0.0.1:8081',
  },
};

import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Computer Engineering =====*/
// From the department's old site (ce.hut.ac.ir), October 2026. Files and photos still live there; the seed copies the
// photos into the app's storage and links the files where they are. The profile pages hide their e-mail addresses
// behind a script, so only the ones printed on the home page are here.

const FILES = "https://ce.hut.ac.ir/documents/79217/";
const HOMEPAGES = "https://ce.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";
const LAB_MANUALS = "http://profs.hut.ac.ir/~bashiri/files/";

/** `path` is the file's address after `/documents/79217/`, query string included. */
const photo = (path: string) => `${FILES}${path}`;

export const ce: DepartmentSeed = {
  slug: "ce",
  name: { fa: "مهندسی کامپیوتر", en: "Computer Engineering" },
  lede: {
    fa: "طراحی سخت‌افزار و ساخت نرم‌افزار؛ از مدارهای منطقی و معماری رایانه تا شبکه، داده و هوش مصنوعی.",
    en: "Designing hardware and building software, from logic circuits and computer architecture to networks, data and artificial intelligence.",
  },
  quote: {
    fa: "مهندسی کامپیوتر شاخه‌ای از مهندسی است که در آن از زمینه‌های علوم کامپیوتر و الکترونیک، برای توسعه سخت‌افزار و تولید نرم‌افزار استفاده می‌شود.",
    en: "Computer engineering draws on computer science and electronics to develop hardware and produce software.",
  },
  intro: {
    fa: [
      "دانشگاه صنعتی همدان از ابتدای تأسیس، با نگاهی کاربردی و مبتنی بر فعالیت‌های عملی روز دنیا، در رشته مهندسی کامپیوتر گرایش سخت‌افزار دانشجو پذیرفت. با پذیرش دانشجو در رشته‌های مهندسی فناوری اطلاعات و مهندسی نرم‌افزار، حلقه رشته‌های مهندسی کامپیوتر کامل شد. از ورودی ۱۴۰۳ این رشته‌ها در یک برنامه مشترک، مهندسی کامپیوتر، گرد آمده‌اند. دوره کارشناسی ارشد با گرایش هوش مصنوعی و رباتیک آغاز شد تا دانشجویان محیط پژوهشی مناسبی داشته باشند و اکنون در دو گرایش هوش مصنوعی و مهندسی داده ادامه دارد.",
      "گروه با توجه به نفوذ روزافزون فناوری اطلاعات در همه ابعاد زندگی و نیاز مبرم کشور به فارغ‌التحصیلان آن، هم آموزش می‌دهد و هم پژوهش‌های گسترده و روزآمد انجام می‌دهد. زمینه‌های پژوهشی آن شامل یادگیری ماشین و یادگیری عمیق، بینایی ماشین و پردازش تصویر، داده‌کاوی، امنیت و حریم خصوصی شبکه، سیستم‌های پیچیده و طراحی مدارهای دیجیتال است.",
      "عضو هیئت علمی گروه در سال‌های ۱۳۹۶ و ۱۳۹۷ فناور برتر استان همدان شد، گروه در کارگروه «وام وجوه اداره شده» وزارت ارتباطات و اطلاعات عضویت دارد، دانشجویانش هر سال به مرحله پایانی المپیادهای کشوری راه می‌یابند و شمار قابل توجهی از فارغ‌التحصیلانش در دانشگاه‌های برتر ایران در مقطع کارشناسی ارشد پذیرفته می‌شوند.",
    ].join("\n\n"),
    en: [
      "From its first years, with a practical outlook shaped by current work in the field, Hamedan University of Technology admitted students to computer engineering in the hardware track. Admitting students to information technology engineering and software engineering completed the family of computer disciplines. From the 2024 intake these programmes are gathered into one shared curriculum, computer engineering. The MSc began in artificial intelligence and robotics, to give students a good research setting, and now runs in two specialisations: artificial intelligence and data engineering.",
      "With information technology reaching every part of life, and the country in urgent need of graduates in it, the department both teaches and carries out broad, up-to-date research. Its research covers machine learning and deep learning, machine vision and image processing, data mining, network security and privacy, complex systems and digital circuit design.",
      "A faculty member of the department was named the province's top technologist in 2017 and 2018, the department sits on the Ministry of Communications' working group on managed-fund loans, its students reach the finals of the national olympiads every year, and many of its graduates are admitted to MSc programmes at Iran's leading universities.",
    ].join("\n\n"),
  },
  milestones: [],
  labsUrl: "https://hut.ac.ir/آزمایشگاه-مهندسی-کامپیوتر",

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "مه‌لقا افراسیابی", en: "Mahlagha Afrasiabi" },
      rank: "assistant",
      phone: "08138411212",
      email: "m.afrasiabi@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}m.afrasiabi001`,
      scholarUrl: `${SCHOLAR}gl52V8cAAAAJ`,
      photoUrl: photo(
        "897594/%D8%A7%D9%81%D8%B1%D8%A7%D8%B3%DB%8C%D8%A7%D8%A8%DB%8C.jpg/5f2a2d2b-b408-0560-6a24-4b0f14a66b1c?t=1654497954329&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "محمود پری‌پور", en: "Mahmoud Paripour" },
      rank: "associate",
      phone: "08138411100",
      homepageUrl: `${HOMEPAGES}paripour`,
      scholarUrl: `${SCHOLAR}_YE5PEkAAAAJ`,
      photoUrl: photo("0/paripor.jpg/603385df-4d33-26a6-ad38-2c2c914725a2?t=1762168177384&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "حسن بشیری", en: "Hassan Bashiri" },
      rank: "assistant",
      phone: "08138411543",
      homepageUrl: `${HOMEPAGES}bashiri`,
      photoUrl: photo(
        "897594/%D8%A8%D8%B4%DB%8C%D8%B1%DB%8C.jpg/5f0824a4-4a5b-f5b8-664d-0fe100d2da61?t=1654497840206&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "فاطمه امیری", en: "Fatemeh Amiri" },
      rank: "assistant",
      phone: "08138411455",
      homepageUrl: `${HOMEPAGES}fateme.amiri`,
      scholarUrl: `${SCHOLAR}dh-qCVoAAAAJ`,
      photoUrl: photo(
        "897594/%D8%AE+%D8%A7%D9%85%DB%8C%D8%B1%DB%8C.jpg/390148c2-2198-8ad5-ba84-f04383c1c70a?t=1654497518264&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "زهره نقیبی", en: "Zohreh Naghibi" },
      rank: "assistant",
      phone: "08138411235",
      homepageUrl: `${HOMEPAGES}zohreh.naghibi`,
      photoUrl: photo(
        "897594/%D8%AE+%D9%86%D9%82%DB%8C%D8%A8%DB%8C.jpg/77f176a4-8b18-fdb6-0c50-3e8b9a548b4a?t=1654497665458&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجید اسدی", en: "Majid Asadi" },
      rank: "assistant",
      phone: "08138411406",
      homepageUrl: `${HOMEPAGES}majid.asadi3992`,
      // The old site shows its grey silhouette placeholder for him; the page has its own for a missing photo.
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "وحید خدامرادی", en: "Vahid Khodamoradi" },
      rank: "assistant",
      phone: "08138411101",
      homepageUrl: `${HOMEPAGES}v.khodamoradi.86`,
      scholarUrl: `${SCHOLAR}bfU4-bcAAAAJ`,
      photoUrl: photo(
        "0/%D8%AE%D8%AF%D8%A7%D9%85%D8%B1%D8%A7%D8%AF%DB%8C+%283%29.jpg/5417d89e-88f1-25b1-9a0b-51cf2e06fcf6?t=1762253737393&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "engineer",
      name: { fa: "محسن احمدوند", en: "Mohsen Ahmadvand" },
      rank: "lecturer",
      phone: "08138411426",
      homepageUrl: `${HOMEPAGES}ahmadvand`,
      photoUrl: photo(
        "897594/%D9%85%D8%AD%D8%B3%D9%86+%D8%A7%D8%AD%D9%85%D8%AF%D9%88%D9%86%D8%AF+%281%29.jpg/2ad7da71-1ac3-e84c-75d8-8098835d9d46?t=1654497538024&download=true",
      ),
    },
    {
      kind: "staff",
      name: { fa: "محبوبه روستایی", en: "Mahboobeh Rostaee" },
      jobTitle: { fa: "کارشناس گروه آموزشی", en: "Department officer" },
      phone: "08138411220",
      email: "rustaee@gmail.com",
    },
  ],

  /*------ Fields and Tracks ------*/
  // The old site lists degrees rather than fields, so each field is a track or a pair of them. The three BSc tracks
  // merged into computer engineering from the 2024 intake; the older two stay for students admitted before then.
  fields: [
    {
      key: "computer",
      name: { fa: "مهندسی کامپیوتر", en: "Computer engineering" },
      summary: {
        fa: "از مدار منطقی و معماری تا سیستم کامل",
        en: "From logic circuits and architecture to a whole system",
      },
      tracks: [
        {
          degree: "bsc",
          name: { fa: "مهندسی کامپیوتر", en: "Computer engineering" },
          note: { fa: "ورودی ۱۴۰۳ به بعد", en: "students admitted from 2024" },
          chartUrl: `${FILES}322463/%DA%86%D8%A7%D8%B1%D8%AA+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%DA%A9%D8%A7%D9%85%D9%BE%DB%8C%D9%88%D8%AA%D8%B1.pdf/e90d6538-c582-ac91-fa56-fb7928fc842f?t=1750745487898`,
        },
      ],
    },
    {
      key: "software",
      name: { fa: "نرم‌افزار", en: "Software" },
      summary: { fa: "ساختن نرم‌افزار، از طراحی تا نگهداری", en: "Building software, from design to upkeep" },
      tracks: [
        {
          degree: "bsc",
          name: { fa: "مهندسی نرم‌افزار", en: "Software engineering" },
          note: { fa: "ورودی قبل از ۱۴۰۳", en: "students admitted before 2024" },
          chartUrl: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%DA%A9%D8%A7%D9%85%D9%84+%D9%85%D9%87%D9%86+%D9%82%D8%A8%D9%84+1403.pdf/d55742c6-c4b9-97bc-85ac-9462b7d2aa1b?t=1718512845465`,
        },
      ],
    },
    {
      key: "it",
      name: { fa: "فناوری اطلاعات", en: "Information technology" },
      summary: { fa: "شبکه، خدمات و زیرساخت اطلاعاتی", en: "Networks, services and information infrastructure" },
      tracks: [
        {
          degree: "bsc",
          name: { fa: "مهندسی فناوری اطلاعات", en: "Information technology engineering" },
          note: { fa: "ورودی قبل از ۱۴۰۳", en: "students admitted before 2024" },
          chartUrl: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%DA%A9%D8%A7%D9%85%D9%84+%D9%81%D9%86%D8%A7+%D9%82%D8%A8%D9%84+1403.pdf/2387a53b-1cfb-32ac-ffa2-00a45337059d?t=1718512844548`,
        },
      ],
    },
    {
      key: "ai",
      name: { fa: "هوش مصنوعی", en: "Artificial intelligence" },
      summary: { fa: "ماشین‌هایی که یاد می‌گیرند و تصمیم می‌گیرند", en: "Machines that learn and decide" },
      tracks: [
        {
          degree: "msc",
          name: { fa: "هوش مصنوعی", en: "Artificial intelligence" },
          chartUrl: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%D8%A7%D8%B1%D8%B4%D8%AF+%D9%87%D9%88%D8%B4.pdf/a9f77c3d-1f04-bfe6-d10b-c92d2db21016?t=1718512844295`,
        },
      ],
    },
    {
      key: "data",
      name: { fa: "مهندسی داده", en: "Data engineering" },
      summary: { fa: "ذخیره، پالایش و تحلیل داده‌های بزرگ", en: "Storing, refining and analysing big data" },
      tracks: [
        {
          degree: "msc",
          name: { fa: "مهندسی داده", en: "Data engineering" },
          chartUrl: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%D8%A7%D8%B1%D8%B4%D8%AF+%D8%AF%D8%A7%D8%AF%D9%87.pdf/b3d6d843-7f44-99a3-7367-59c46597fcc5?t=1718512843977`,
        },
      ],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "آزمایشگاه شبکه‌های کامپیوتری", en: "Computer Networks Lab" },
    { fa: "آزمایشگاه پایگاه داده", en: "Database Lab" },
    { fa: "آزمایشگاه سیستم عامل", en: "Operating Systems Lab" },
    { fa: "آزمایشگاه مدار منطقی و معماری", en: "Logic Circuits and Architecture Lab" },
    { fa: "آزمایشگاه ریزپردازنده", en: "Microprocessor Lab" },
    { fa: "آزمایشگاه تحقیقاتی کامپیوتر", en: "Computer Research Lab" },
    { fa: "کارگاه کامپیوتر", en: "Computer Workshop" },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: {
        fa: "چارت درسی کارشناسی مهندسی کامپیوتر، ورودی ۱۴۰۳ به بعد",
        en: "Computer engineering BSc chart, from 2024",
      },
      url: `${FILES}322463/%DA%86%D8%A7%D8%B1%D8%AA+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%DA%A9%D8%A7%D9%85%D9%BE%DB%8C%D9%88%D8%AA%D8%B1.pdf/e90d6538-c582-ac91-fa56-fb7928fc842f?t=1750745487898`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: { fa: "فرم پیشنهاد پروژه کارشناسی", en: "BSc project proposal form" },
      url: `${FILES}0/pform.pdf/bd5e09fa-45ee-1c3d-2652-fd4ae47ed291?version=1.0&t=1626936522231&download=true`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: { fa: "فرم پیشنهاد پروژه کارشناسی (ورد)", en: "BSc project proposal form (Word)" },
      url: `${FILES}0/pform.docx/80981877-0acd-f21d-7f1c-04f0eb2c1074?version=1.0&t=1627200165137&download=true`,
      format: "docx",
    },
    {
      degree: "bsc",
      title: { fa: "دستور کار آزمایشگاه مدار منطقی و معماری", en: "Logic circuits and architecture lab manual" },
      url: `${LAB_MANUALS}logic-lab.pdf`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: { fa: "دستور کار آزمایشگاه ریزپردازنده", en: "Microprocessor lab manual" },
      url: `${LAB_MANUALS}computer-archi.pdf`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: { fa: "دستور کار آزمایشگاه طراحی به کمک کامپیوتر", en: "Computer-aided design lab manual" },
      url: `${LAB_MANUALS}fpga.pdf`,
      format: "pdf",
    },
    {
      degree: "msc",
      title: { fa: "چارت درسی کارشناسی ارشد، هوش مصنوعی", en: "MSc course chart, artificial intelligence" },
      url: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%D8%A7%D8%B1%D8%B4%D8%AF+%D9%87%D9%88%D8%B4.pdf/a9f77c3d-1f04-bfe6-d10b-c92d2db21016?t=1718512844295`,
      format: "pdf",
    },
    {
      degree: "msc",
      title: { fa: "چارت درسی کارشناسی ارشد، مهندسی داده", en: "MSc course chart, data engineering" },
      url: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%D8%A7%D8%B1%D8%B4%D8%AF+%D8%AF%D8%A7%D8%AF%D9%87.pdf/b3d6d843-7f44-99a3-7367-59c46597fcc5?t=1718512843977`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "چارت درسی کارشناسی مهندسی نرم‌افزار، قبل از ۱۴۰۳",
        en: "Software engineering BSc chart, before 2024",
      },
      url: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%DA%A9%D8%A7%D9%85%D9%84+%D9%85%D9%87%D9%86+%D9%82%D8%A8%D9%84+1403.pdf/d55742c6-c4b9-97bc-85ac-9462b7d2aa1b?t=1718512845465`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "چارت درسی کارشناسی مهندسی فناوری اطلاعات، قبل از ۱۴۰۳",
        en: "Information technology BSc chart, before 2024",
      },
      url: `${FILES}4345594/%DA%86%D8%A7%D8%B1%D8%AA+%DA%A9%D8%A7%D9%85%D9%84+%D9%81%D9%86%D8%A7+%D9%82%D8%A8%D9%84+1403.pdf/2387a53b-1cfb-32ac-ffa2-00a45337059d?t=1718512844548`,
      format: "pdf",
    },
  ],
};

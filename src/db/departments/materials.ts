import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Materials Engineering =====*/
// From the department's old site (materials.hut.ac.ir), October 2026. Files and photos still live there; the seed
// copies the photos into the app's storage and links the files where they are. The site gives the start year (1387)
// but no day, so the founding date is the first day of that year. Babak Ghorbanian's photo is a BMP file, which the
// media upload doesn't accept, and he has no homepage yet, so he is listed without either.

const FILES = "https://materials.hut.ac.ir/documents/79224/";
const HOMEPAGES = "https://materials.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";

/** `path` is the file's address after `/documents/79224/0/`. */
const photo = (path: string) => `${FILES}0/${path}&download=true`;

const COURSES = `${FILES}503183/`;
const BSC_CHART = `${COURSES}Course+Chart-HUT+Materials+Group.pdf/eaa2b884-fe28-dfdf-cc0e-28b871522670?t=1639332067375`;
const BSC_LIST = `${COURSES}Course+List-HUT+Materials+Group.pdf/49b5d546-21e9-af3d-11d9-05623741ed8d?t=1639332067549`;
const BSC_LIST_1403 = `https://www.hut.ac.ir/documents/79224/503183/Course+List-HUT+Materials+Group+%281%29.pdf/d7ae7c6a-82bd-f497-5676-c55b600f1bd8?t=1735969386720`;
const MSC_LIST = `${COURSES}%D8%AF%D8%B1%D9%88%D8%B3+%D8%A7%D8%B1%D8%B4%D8%AF.pdf/5de8e598-6dfd-07a8-0e22-1ac33841ca48?t=1760246429125`;

export const materials: DepartmentSeed = {
  slug: "materials",
  name: { fa: "مهندسی مواد", en: "Materials Engineering" },
  lede: {
    fa: "شناخت، تولید و شکل‌دهی فلزات، آلیاژها و مواد پیشرفته؛ از استخراج و ریخته‌گری تا خوردگی و پوشش‌دهی.",
    en: "Understanding, producing and shaping metals, alloys and advanced materials, from extraction and casting to corrosion and coating.",
  },
  quote: {
    fa: "رشته مهندسی مواد و متالورژی زمینه‌ساز تولید و توسعه انواع مواد مهندسی است که تقریباً در هر جنبه‌ای از زندگی مدرن مورد استفاده قرار می‌گیرند.",
    en: "Materials and metallurgical engineering underlies the production and development of the engineering materials used in almost every part of modern life.",
  },
  intro: {
    fa: [
      "گروه مهندسی مواد و متالورژی دانشگاه صنعتی همدان از سال ۱۳۸۷ آغاز به فعالیت کرده و در دو مقطع کارشناسی و کارشناسی ارشد دانشجو می‌پذیرد. کارشناسی ارشد در دو گرایش شناسایی و انتخاب مواد مهندسی و استخراج فلزات است. در حال حاضر بیش از ۲۰۰ دانشجوی کارشناسی و ۵۰ دانشجوی کارشناسی ارشد در گروه تحصیل می‌کنند. از ورودی ۱۴۰۳ دوره کارشناسی با نام مهندسی و علم مواد برگزار می‌شود.",
      "مهندسان مواد و متالورژی با فرایندهای گوناگون، گستره‌ای از فولادها، فلزات، آلیاژهای آهنی و غیرآهنی و مواد پیشرفته را تولید می‌کنند و با ریخته‌گری، شکل‌دهی و متالورژی پودر، آن‌ها را به قطعاتی مانند ایمپلنت‌های جراحی، تراشه‌های رایانه، خودرو و هواپیما تبدیل می‌کنند. این رشته به طراحی مواد تجدیدپذیر و بازیافت فلزات هم متعهد است و به حفظ محیط زیست کمک می‌کند.",
      "زمینه‌های پژوهشی اعضای هیئت علمی شامل استخراج و تولید فلزات و آلیاژها، ریخته‌گری، شکل‌دهی، عملیات حرارتی، خوردگی و حفاظت فلزات، پوشش‌دهی، سنتز مواد پیشرفته و بازیافت فلزات است. دانشجویان از راه آموزش نظری و عملی، کارآموزی و تجربه پژوهشی آماده می‌شوند و فارغ‌التحصیلان در صنایع فلزی، ریخته‌گری، پوشش‌دهی، کامپوزیت، سرامیک و شیشه، خودرو، نفت و پتروشیمی، نانومواد و زیست‌مواد کار می‌کنند.",
    ].join("\n\n"),
    en: [
      "The Department of Materials and Metallurgical Engineering at Hamedan University of Technology began work in 2008 and admits students at BSc and MSc level. The MSc has two specialisations: identification and selection of engineering materials, and metal extraction. More than 200 BSc students and 50 MSc students are studying in the department at present. From the 2024 intake the BSc is offered as materials science and engineering.",
      "Materials and metallurgical engineers use a range of processes to produce steels, metals, ferrous and non-ferrous alloys and advanced materials, and turn them by casting, forming and powder metallurgy into parts such as surgical implants, computer chips, cars and aircraft. The field is also committed to designing renewable materials and recycling metals, which helps protect the environment.",
      "The faculty's research covers the extraction and production of metals and alloys, casting, forming, heat treatment, corrosion and protection of metals, coating, synthesis of advanced materials and metal recycling. Students are prepared through theory and practice, internships and research experience, and graduates work in the metals, casting, coating, composites, ceramics and glass, automotive, oil and petrochemical, nanomaterials and biomaterials industries.",
    ].join("\n\n"),
  },
  milestones: [],
  foundedOn: "2008-03-21",
  studentCount: 250,

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "مزدک ایزدی", en: "Mazdak Eizadi" },
      rank: "assistant",
      phone: "08138411410",
      email: "mazdak.eizadi@gmail.com",
      homepageUrl: `${HOMEPAGES}mazdak.eizadi`,
      scholarUrl: `${SCHOLAR}ciqsHU13wtMC`,
      photoUrl: photo(
        "%D9%85%D8%B2%D8%AF%DA%A9+%D8%A7%DB%8C%D8%B2%D8%AF%DB%8C.png/364c101e-bb4f-1f76-853b-074e8a10ed56?t=1674554436276",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "امیر مومنی", en: "Amir Momeni" },
      rank: "associate",
      phone: "08138411473",
      homepageUrl: `${HOMEPAGES}momeni`,
      scholarUrl: `${SCHOLAR}rxoIoNEAAAAJ`,
      photoUrl: photo("momeni.jpg/999cf34a-a2f5-0929-dcc2-f3ce6af044b5?t=1627113677948"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "اکبر حیدرپور", en: "Akbar Heidarpour" },
      rank: "associate",
      phone: "08138411448",
      homepageUrl: `${HOMEPAGES}heidarpour`,
      scholarUrl: `${SCHOLAR}-_FC8MoAAAAJ`,
      photoUrl: photo("heydarpoor.jpg/45bb0889-bcdd-d196-7ccb-c63558156d59?t=1627113946787"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "امید بیات", en: "Omid Bayat" },
      rank: "associate",
      phone: "08138411306",
      homepageUrl: `${HOMEPAGES}obayat`,
      scholarUrl: `${SCHOLAR}QXKKkLsAAAAJ`,
      photoUrl: photo("bayat+%281%29.jpg/2ba473fb-b254-3a61-4717-d017ae93f9de?t=1627114977912"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مهدی پورعبدلی", en: "Mehdi Pourabdoli" },
      rank: "associate",
      phone: "08138411445",
      homepageUrl: `${HOMEPAGES}mpourabdoli`,
      scholarUrl: `${SCHOLAR}yQ3ZD50AAAAJ`,
      photoUrl: photo("poorabdoli.jpg/18ab052b-4460-b0f2-f192-2176d283021d?t=1627112668091"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "صمد قاسمی نجف‌آبادی", en: "Samad Ghasemi Najafabadi" },
      rank: "assistant",
      phone: "08138411451",
      homepageUrl: `${HOMEPAGES}samad.ghasemi`,
      scholarUrl: `${SCHOLAR}8-1oI40AAAAJ`,
      photoUrl: photo("ghasemi.jpg/efba5ba0-e510-a091-7b6b-c83baf04b3db?t=1627114744734"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "احمد قادری حمیدی", en: "Ahmad Ghaderi Hamidi" },
      rank: "assistant",
      phone: "08138411446",
      homepageUrl: `${HOMEPAGES}ghaderi`,
      scholarUrl: `${SCHOLAR}ZpUp7GsAAAAJ`,
      photoUrl: photo("ghaderi+hamidi.jpg/7c419f3d-3b5d-b3ac-6725-94d380f664b8?t=1627112847193"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سعید کریمی", en: "Saeed Karimi" },
      rank: "assistant",
      phone: "08138411451",
      homepageUrl: `${HOMEPAGES}karimi6439`,
      scholarUrl: `${SCHOLAR}3ZboefAAAAAJ`,
      photoUrl: photo("karimi.jpg/5be80d5d-886e-ea69-024b-0235ea61fa73?t=1627115025397"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مریم مولایی", en: "Maryam Molaei" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}m.molaie93`,
      scholarUrl: `${SCHOLAR}dthzQc0AAAAJ`,
      photoUrl: photo(
        "%D8%AE+%D9%85%D9%88%D9%84%D8%A7%DB%8C%DB%8C.jpg/22cfcd57-7753-7fbc-21c5-957751975ee2?t=1736298195581",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "بابک قربانیان", en: "Babak Ghorbanian" },
      rank: "assistant",
      scholarUrl: `${SCHOLAR}KrtcNTUAAAAJ`,
    },
    {
      kind: "staff",
      name: { fa: "احمد نثری", en: "Ahmad Nasri" },
      jobTitle: { fa: "کارشناس گروه آموزشی", en: "Department officer" },
      phone: "08138411222",
      photoUrl: photo("nasri%282%29.jpg/103d313f-78a9-ba25-817b-c800c7a1b119?t=1639293172304"),
    },
  ],

  /*------ Fields and Tracks ------*/
  // The old site names no fields beyond the degrees: one BSc programme (renamed from the 2024 intake) and the two MSc
  // specialisations, so each of those is a field. The MSc course list is one file for both specialisations.
  fields: [
    {
      key: "materials",
      name: { fa: "مهندسی مواد", en: "Materials engineering" },
      summary: {
        fa: "از ساختار بلوری تا قطعه ساخته‌شده",
        en: "From crystal structure to a finished part",
      },
      tracks: [
        {
          degree: "bsc",
          name: { fa: "مهندسی و علم مواد", en: "Materials science and engineering" },
          note: { fa: "ورودی ۱۴۰۳ به بعد", en: "students admitted from 2024" },
          planUrl: BSC_LIST_1403,
        },
        {
          degree: "bsc",
          name: { fa: "مهندسی مواد و متالورژی", en: "Materials and metallurgical engineering" },
          note: { fa: "ورودی قبل از ۱۴۰۳", en: "students admitted before 2024" },
          planUrl: BSC_LIST,
          chartUrl: BSC_CHART,
        },
      ],
    },
    {
      key: "selection",
      name: { fa: "شناسایی و انتخاب مواد", en: "Materials identification and selection" },
      summary: {
        fa: "شناخت ساختار و خواص، و گزینش ماده مناسب",
        en: "Knowing structure and properties, and choosing the right material",
      },
      tracks: [
        {
          degree: "msc",
          name: { fa: "شناسایی و انتخاب مواد مهندسی", en: "Identification and selection of engineering materials" },
        },
      ],
    },
    {
      key: "extraction",
      name: { fa: "استخراج فلزات", en: "Metal extraction" },
      summary: {
        fa: "از سنگ معدن تا فلز؛ فرایندهای حرارتی، محلولی و الکتریکی",
        en: "From ore to metal through heat, solution and electricity",
      },
      tracks: [
        {
          degree: "msc",
          name: { fa: "استخراج فلزات", en: "Metal extraction" },
        },
      ],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "آزمایشگاه خواص مکانیکی مواد", en: "Mechanical Properties of Materials Lab" },
    { fa: "آزمایشگاه عملیات حرارتی", en: "Heat Treatment Lab" },
    { fa: "آزمایشگاه متالوگرافی", en: "Metallography Lab" },
    { fa: "آزمایشگاه استخراج فلزات", en: "Metal Extraction Lab" },
    { fa: "آزمایشگاه تحقیقاتی مواد", en: "Materials Research Lab" },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: {
        fa: "فهرست دروس کارشناسی مهندسی و علم مواد، ورودی ۱۴۰۳ به بعد",
        en: "Materials science and engineering BSc course list, from 2024",
      },
      url: BSC_LIST_1403,
      format: "pdf",
    },
    {
      degree: "msc",
      title: {
        fa: "فهرست دروس کارشناسی ارشد مهندسی مواد و متالورژی",
        en: "Materials and metallurgical engineering MSc course list",
      },
      url: MSC_LIST,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "چارت درسی کارشناسی مهندسی مواد و متالورژی، قبل از ۱۴۰۳",
        en: "Materials and metallurgical engineering BSc chart, before 2024",
      },
      url: BSC_CHART,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "فهرست دروس کارشناسی مهندسی مواد و متالورژی، قبل از ۱۴۰۳",
        en: "Materials and metallurgical engineering BSc course list, before 2024",
      },
      url: BSC_LIST,
      format: "pdf",
    },
  ],
};

import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Electrical Engineering =====*/
// From the department's old site (ee.hut.ac.ir), October 2026. Files and photos still live there; the seed copies the
// photos into the app's storage and links the files where they are.

const FILES = "https://ee.hut.ac.ir/documents/79210/";
const HOMEPAGES = "https://ee.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";

const MAIN_EAST = { fa: "ساختمان اصلی، بال شرقی", en: "Main building, east wing" };
const MAIN_EAST_4 = { fa: "ساختمان اصلی، بال شرقی، طبقه ۴", en: "Main building, east wing, 4th floor" };
const FARSHCHIAN_5 = { fa: "ساختمان فرشچیان، طبقه ۵", en: "Farshchian building, 5th floor" };
const FARSHCHIAN_6 = { fa: "ساختمان فرشچیان، طبقه ۶", en: "Farshchian building, 6th floor" };

const photo = (path: string) => `${FILES}${path}&download=true`;

export const ee: DepartmentSeed = {
  slug: "ee",
  name: { fa: "مهندسی برق", en: "Electrical Engineering" },
  lede: {
    fa: "مطالعه و کاربرد الکتریسیته، الکترونیک و الکترومغناطیس؛ از افزاره‌های نانومقیاس و مدارهای مجتمع تا ماشین‌های الکتریکی و شبکه‌های قدرت.",
    en: "The study and use of electricity, electronics and electromagnetism, from nanoscale devices and integrated circuits to electric machines and power grids.",
  },
  quote: {
    fa: "بسیاری از پیشرفت‌های دنیای امروز در علوم و فنون مختلف، مرهون توسعه‌هایی است که در این رشته صورت گرفته است.",
    en: "Much of today's progress across science and technology rests on advances made in this field.",
  },
  intro: {
    fa: [
      "مهندسی برق یکی از گسترده‌ترین، به‌روزترین و کاربردی‌ترین رشته‌های فنی و مهندسی است. افزون بر فناوری، مبانی نظری حوزه‌های مختلف آن (الکترونیک، مخابرات، سخت‌افزار و سیستم‌های دیجیتال، قدرت و کنترل) راهگشای بسیاری از رشته‌ها و تخصص‌های علمی بوده است.",
      "گروه مهندسی برق دانشگاه صنعتی همدان از مهر ۱۳۸۵ با پذیرش دانشجوی کارشناسی در گرایش کنترل آغاز به کار کرد و امروز در سه گرایش الکترونیک، کنترل و مخابرات دانشجوی کارشناسی می‌پذیرد. دوره کارشناسی ارشد از مهر ۱۳۹۲ با گرایش کنترل آغاز شد و اکنون در پنج گرایش فعال است. گروه با حدود ۵۰۰ دانشجوی فعال، یکی از مراکز مهم آموزش و پژوهش و تربیت نیروی متخصص برای صنعت است.",
    ].join("\n\n"),
    en: [
      "Electrical engineering is one of the broadest, most current and most applied branches of engineering. Beyond the technology itself, the theory behind its areas (electronics, telecommunications, digital hardware and systems, power and control) has opened the way for many other sciences and specialities.",
      "The Department of Electrical Engineering at Hamedan University of Technology opened in September 2006 with a BSc in control, and today admits BSc students in electronics, control and telecommunications. Its MSc programme began in September 2013 in control and now runs in five specialisations. With about 500 students, the department is a major centre for teaching and research, and for training specialists for industry.",
    ].join("\n\n"),
  },
  milestones: [
    { on: "2006-09-23", label: { fa: "کارشناسی کنترل", en: "BSc in control" } },
    { on: "2013-09-23", label: { fa: "کارشناسی ارشد کنترل", en: "MSc in control" } },
  ],
  foundedOn: "2006-09-23",
  studentCount: 500,
  labsUrl: "https://hut.ac.ir/آزمایشگاه-مهندسی-برق",

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "شعیب بابایی توسکی", en: "Shoaib Babaei Touski" },
      rank: "associate",
      phone: "08138411526",
      email: "s.b.touski@gmail.com",
      office: MAIN_EAST,
      homepageUrl: `${HOMEPAGES}s.b.touski`,
      scholarUrl: "https://scholar.google.com/scholar?q=babaei+tooski",
      photoUrl: photo(
        "425633/%D8%A8%D8%A7%D8%A8%D8%A7%DB%8C%DB%8C.jpg/53c9f5e0-3bd3-af03-bffa-b448a5fd00ef?t=1654590276059",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "هادی دلاوری", en: "Hadi Delavari" },
      rank: "associate",
      phone: "08138411528",
      email: "delavari@hut.ac.ir",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}hdelavary`,
      scholarUrl: `${SCHOLAR}kqP3cGkAAAAJ`,
      photoUrl: photo(
        "425633/%D8%AF%D9%84%D8%A7%D9%88%D8%B1%DB%8C.jpg/7b948c41-11f3-3088-c31b-ca679d6a0d67?t=1654590236324",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "حمیدرضا شاه‌دوستی", en: "Hamidreza Shahdoosti" },
      rank: "associate",
      phone: "08138411529",
      email: "h.doosti@hut.ac.ir",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}h.doosti`,
      scholarUrl: `${SCHOLAR}ZCmWy4IAAAAJ`,
      photoUrl: photo(
        "425633/%D8%B4%D8%A7%D9%87+%D8%AF%D9%88%D8%B3%D8%AA%DB%8C.jpg/b4ef3535-2a5a-87ae-4afc-3fd548fbb482?t=1654590249260",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سید محمد عظیمی", en: "Seyed Mohammad Azimi" },
      rank: "associate",
      phone: "08138411226",
      email: "azimi@hut.ac.ir",
      office: { fa: "ساختمان فرشچیان، اتاق ۱۱۰", en: "Farshchian building, room 110" },
      homepageUrl: `${HOMEPAGES}azimismpe`,
      scholarUrl: `${SCHOLAR}yHUoj3wAAAAJ`,
      photoUrl: photo("425633/%D8%B9%D8%B8%DB%8C%D9%85%DB%8C.jpg/2087424f-1512-02e7-7216-fdd081ac5042?t=1654590332690"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "علیرضا کوکبی", en: "Alireza Kokabi" },
      rank: "associate",
      phone: "08138411525",
      email: "alireza.kokabi@gmail.com",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}alireza.kokabi`,
      scholarUrl: `${SCHOLAR}aXzM2sEAAAAJ`,
      photoUrl: photo("0/%DA%A9%D9%88%DA%A9%D8%A8%DB%8C.jpg/d4ef699a-f5c9-0bba-e4fd-83740a499bae?t=1736396007833"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "عباس فتاحی", en: "Abbas Fattahi" },
      rank: "assistant",
      phone: "08138411554",
      email: "fattahi@hut.ac.ir",
      office: FARSHCHIAN_5,
      homepageUrl: `${HOMEPAGES}af_meyabadi`,
      scholarUrl: `${SCHOLAR}BJtQCcEAAAAJ`,
      photoUrl: photo("425633/%D9%81%D8%AA%D8%A7%D8%AD%DB%8C.jpg/e34d62e5-87c5-133a-231c-94ea9720891e?t=1654590355531"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سید محمدمهدی موسوی", en: "Seyed Mohammad Mahdi Moosavi" },
      rank: "assistant",
      phone: "08138411516",
      email: "moosavi@hut.ac.ir",
      office: FARSHCHIAN_6,
      homepageUrl: `${HOMEPAGES}moosavi`,
      scholarUrl: `${SCHOLAR}BztLdxAAAAAJ`,
      photoUrl: photo("425633/%D9%85%D9%88%D8%B3%D9%88%DB%8C.jpg/067e9e53-ed1c-d234-eb22-df8660739003?t=1654590387615"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "رمضانعلی نقی‌زاده", en: "Ramezanali Naghizadeh" },
      rank: "assistant",
      phone: "08138411567",
      email: "ra.naghizadeh@gmail.com",
      office: FARSHCHIAN_6,
      homepageUrl: `${HOMEPAGES}ra.naghizadeh`,
      scholarUrl: `${SCHOLAR}7pWGuiEAAAAJ`,
      photoUrl: photo(
        "425633/%D9%86%D9%82%DB%8C+%D8%B2%D8%A7%D8%AF%D9%87.jpg/91ee907b-3c83-2d07-0990-41a4a634155d?t=1654590401105",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "قاسم علی‌پور", en: "Ghasem Alipoor" },
      rank: "assistant",
      phone: "08138411530",
      email: "g.alipoor@gmail.com",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}alipoor`,
      scholarUrl: `${SCHOLAR}Gyq2VscAAAAJ`,
      photoUrl: photo(
        "425633/%D8%B9%D9%84%DB%8C%D9%BE%D9%88%D8%B1.jpg/0b6410b4-67f2-8e1d-0f90-d1e4e3cb9e42?t=1654590345321",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سیاوش رجبی", en: "Siavash Rajabi" },
      rank: "assistant",
      phone: "08138411535",
      email: "siavash.rajabi@gmail.com",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}siavash.rajabi`,
      scholarUrl: `${SCHOLAR}QhTEvqsAAAAJ`,
      photoUrl: photo("425633/%D8%B1%D8%AC%D8%A8%DB%8C.jpg/78d6f722-1891-bbfb-4527-b3067f454429?t=1654590317651"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجتبی حسینی تودشکی", en: "Mojtaba Hosseini Toodeshki" },
      rank: "assistant",
      phone: "08138411524",
      email: "mhosseini.t@hut.ac.ir",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}mhosseini_t`,
      scholarUrl: "https://scholar.google.com/scholar?q=mojtaba+hosseini+todeshki",
      photoUrl: photo(
        "425633/%D8%AA%D9%88%D8%AF%D8%B4%DA%A9%DB%8C.jpg/250afa83-9f17-fdf3-f419-6ac76a578f68?t=1654590291033",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "میثم شفاعی", en: "Meysam Shafaee" },
      rank: "assistant",
      email: "shafaee.edu@gmail.com",
      photoUrl: photo("425633/%D8%B4%D9%81%D8%A7%D8%B9%DB%8C.jpg/3001257c-4da0-87fb-3477-3d227a454cf1?t=1654590470743"),
    },
    {
      kind: "faculty",
      honorific: "engineer",
      name: { fa: "حمیدرضا قنبری خرم", en: "Hamidreza Ghanbari Khorram" },
      rank: "assistant",
      phone: "08138411508",
      email: "ghanbari@hut.ac.ir",
      office: FARSHCHIAN_6,
      homepageUrl: `${HOMEPAGES}ghanbari`,
      scholarUrl: `${SCHOLAR}c68pqskAAAAJ`,
      photoUrl: photo("425633/%D9%82%D9%86%D8%A8%D8%B1%DB%8C.jpg/18fb454b-57be-0302-d48b-1f56516995f6?t=1654590483050"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "پژمان بیات", en: "Pezhman Bayat" },
      rank: "assistant",
      phone: "08138411513",
      email: "pezhman.bayat@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}pezhman.bayat`,
      scholarUrl: `${SCHOLAR}oDp2EiEAAAAJ`,
      photoUrl: photo(
        "0/%D9%BE%DA%98%D9%85%D8%A7%D9%86+%D8%A8%DB%8C%D8%A7%D8%AA.jpg/3022f20f-0dac-dfa1-dcbf-ea9f78352d14?t=1776061314376",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "پیمان بیات", en: "Peyman Bayat" },
      rank: "assistant",
      phone: "08138411512",
      email: "peyman.bayat@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}peyman.bayat`,
      scholarUrl: `${SCHOLAR}XsM5A_oAAAAJ`,
      photoUrl: photo(
        "0/%D9%BE%DB%8C%D9%85%D8%A7%D9%86+%D8%A8%DB%8C%D8%A7%D8%AA.jpg/58c73fc4-0ede-6834-0156-239224d01767?t=1776062106812",
      ),
    },
    {
      kind: "faculty",
      honorific: "engineer",
      name: { fa: "محمدحسین دوست‌محمدی", en: "Mohammad Hossein Doostmohammadi" },
      rank: "lecturer",
      phone: "08138411534",
      email: "doost.mohammadi@gmail.com",
      office: MAIN_EAST_4,
      homepageUrl: `${HOMEPAGES}doost.nohammadi`,
      scholarUrl: `${SCHOLAR}0WXph5IAAAAJ`,
      photoUrl: photo("0/4-3.jpg/da8cae64-2c43-f490-e6da-d927f1c00dd6?t=1763283296912"),
    },
    {
      kind: "staff",
      name: { fa: "علی محمدی جهت", en: "Ali Mohammadi Jahat" },
      jobTitle: { fa: "کارشناس گروه و آزمایشگاه", en: "Department and laboratory officer" },
      phone: "08138411423",
    },
  ],

  /*------ Fields and Tracks ------*/
  fields: [
    {
      key: "electronics",
      name: { fa: "الکترونیک", en: "Electronics" },
      summary: { fa: "از افزاره و تراشه تا مدارهای مجتمع", en: "From devices and chips to integrated circuits" },
      tracks: [
        { degree: "bsc", name: { fa: "الکترونیک", en: "Electronics" } },
        {
          degree: "msc",
          name: { fa: "مدارهای مجتمع الکترونیک", en: "Integrated electronic circuits" },
          planUrl: `${FILES}0/%D9%85%D8%AF%D8%A7%D8%B1%D9%87%D8%A7%DB%8C+%D9%85%D8%AC%D8%AA%D9%85%D8%B9+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D9%86%DB%8C%DA%A9.pdf/090383b0-eb3a-1a2d-096e-1a5f92e22f75?t=1628399779632`,
          chartUrl: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF+-+%D9%85%D8%AF%D8%A7%D8%B1%D9%87%D8%A7%DB%8C+%D9%85%D8%AC%D8%AA%D9%85%D8%B9+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D9%86%DB%8C%DA%A9.pdf/798949f7-cb4f-5353-7e44-71dac37a2f82?t=1628399778775`,
        },
        {
          degree: "msc",
          name: { fa: "افزاره‌های میکرو و نانو الکترونیک", en: "Micro- and nanoelectronic devices" },
          planUrl: `${FILES}0/%D8%A7%D9%81%D8%B2%D8%A7%D8%B1%D9%87%E2%80%8C%D9%87%D8%A7%DB%8C+%D9%85%DB%8C%DA%A9%D8%B1%D9%88+%D9%88+%D9%86%D8%A7%D9%86%D9%88+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D9%86%DB%8C%DA%A9.pdf/9dc6afcd-e23f-5c26-fc62-a842f7ba8f6f?t=1628399777941`,
          chartUrl: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF+-%D8%A7%D9%81%D8%B2%D8%A7%D8%B1%D9%87+%D9%87%D8%A7%D9%8A+%D9%85%DB%8C%DA%A9%D8%B1%D9%88+%D9%88+%D9%86%D8%A7%D9%86%D9%88+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D9%86%DB%8C%DA%A9.pdf/37e8d818-922a-518d-384c-0fa6e532e897?t=1628399778980`,
        },
      ],
    },
    {
      key: "control",
      name: { fa: "کنترل", en: "Control" },
      summary: { fa: "سیستم‌هایی که خودشان را تنظیم می‌کنند", en: "Systems that regulate themselves" },
      tracks: [
        { degree: "bsc", name: { fa: "کنترل", en: "Control" } },
        {
          degree: "msc",
          name: { fa: "کنترل", en: "Control" },
          planUrl: `${FILES}0/%DA%A9%D9%86%D8%AA%D8%B1%D9%84+%28%D9%85%D8%AC%D9%85%D9%88%D8%B9%D9%87+%D8%B3%DB%8C%D8%B3%D8%AA%D9%85%D9%87%D8%A7%DB%8C+%DA%A9%D9%86%D8%AA%D8%B1%D9%84%29.pdf/27b16dbc-a885-3dbd-3b88-6cabff0dcd66?t=1628399779563`,
          chartUrl: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF+-+%DA%A9%D9%86%D8%AA%D8%B1%D9%84.pdf/39bdea37-776b-5407-a775-4ee8ff51f855?t=1628399778667`,
        },
      ],
    },
    {
      key: "telecom",
      name: { fa: "مخابرات", en: "Telecommunications" },
      summary: { fa: "انتقال اطلاعات، از آنتن تا سیگنال", en: "Moving information, from antenna to signal" },
      tracks: [{ degree: "bsc", name: { fa: "مخابرات", en: "Telecommunications" } }],
    },
    {
      key: "power",
      name: { fa: "قدرت", en: "Power" },
      summary: {
        fa: "تولید، انتقال و تبدیل انرژی الکتریکی",
        en: "Generating, transmitting and converting electrical energy",
      },
      tracks: [
        {
          degree: "msc",
          name: { fa: "سیستم‌های قدرت", en: "Power systems" },
          note: { fa: "ورودی ۹۸ به بعد", en: "students admitted from 2019" },
          planUrl: `${FILES}0/%D8%B3%DB%8C%D8%B3%D8%AA%D9%85%D9%87%D8%A7%DB%8C+%D9%82%D8%AF%D8%B1%D8%AA-+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+98+%D9%88+%D9%85%D8%A7+%D8%A8%D8%B9%D8%AF.pdf/ac0de192-b6ab-ecd9-52fa-d325b8a40de7?t=1628399779484`,
          chartUrl: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF+-+%D8%B3%DB%8C%D8%B3%D8%AA%D9%85+%D9%87%D8%A7%D9%8A+%D9%82%D8%AF%D8%B1%D8%AA.pdf/b0a60f76-2f9c-b18c-fcf5-803c7965a549?t=1628399778516`,
        },
        {
          degree: "msc",
          name: { fa: "الکترونیک قدرت و ماشین‌های الکتریکی", en: "Power electronics and electric machines" },
          planUrl: `${FILES}0/%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D9%86%DB%8C%DA%A9+%D9%82%D8%AF%D8%B1%D8%AA+%D9%88+%D9%85%D8%A7%D8%B4%DB%8C%D9%86%D9%87%D8%A7%DB%8C+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%DB%8C%DA%A9%DB%8C.pdf/98de7491-6c1a-28d0-94df-0e673401e4d6?t=1628399778075`,
          chartUrl: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%D9%83%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF+-%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D9%86%DB%8C%DA%A9+%D9%82%D8%AF%D8%B1%D8%AA+%D9%88+%D9%85%D8%A7%D8%B4%DB%8C%D9%86%D9%87%D8%A7%DB%8C+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%DB%8C%DA%A9%DB%8C.pdf/faba11fb-b7f9-eda6-7fb0-b0354a9dd05e?t=1628399779164`,
        },
      ],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "آزمایشگاه مدار و الکترونیک", en: "Circuits and Electronics Lab" },
    { fa: "آزمایشگاه مدارهای پالس و دیجیتال", en: "Pulse and Digital Circuits Lab" },
    { fa: "آزمایشگاه سیستم‌های دیجیتال", en: "Digital Systems Lab" },
    { fa: "آزمایشگاه الکترونیک صنعتی", en: "Industrial Electronics Lab" },
    { fa: "آزمایشگاه پردازش سیگنال‌های دیجیتال", en: "Digital Signal Processing Lab" },
    { fa: "آزمایشگاه ماشین‌های الکتریکی", en: "Electric Machines Lab" },
    { fa: "آزمایشگاه کنترل خطی", en: "Linear Control Lab" },
    { fa: "آزمایشگاه کنترل صنعتی", en: "Industrial Control Lab" },
    { fa: "آزمایشگاه ابزار دقیق", en: "Instrumentation Lab" },
    { fa: "آزمایشگاه مدار مخابراتی", en: "Communication Circuits Lab" },
    { fa: "کارگاه برق", en: "Electrical Workshop" },
    { fa: "آزمایشگاه تحقیقاتی برق", en: "Electrical Research Lab" },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: { fa: "چارت درسی کارشناسی، ورودی ۱۴۰۳ به بعد", en: "BSc course chart, students admitted from 2024" },
      url: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+1403%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%281%29.docx/054e5d27-1d2d-fc2c-a485-828c1300cec5?t=1771056220631`,
      format: "docx",
    },
    {
      degree: "bsc",
      title: {
        fa: "برنامه درسی جامع وزارت علوم، ۱۴۰۳ به بعد",
        en: "Ministry of Science curriculum, from 2024",
      },
      url: `${FILES}0/chart+bargh.pdf/59f30207-1af2-45fe-7deb-f0dd6c58e02c?t=1770718191663`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: { fa: "روند و شیوه انتخاب گرایش", en: "How to choose a specialisation" },
      url: `${FILES}0/%D8%B1%D9%88%D9%86%D8%AF+%D9%88+%D8%B4%DB%8C%D9%88%D9%87+%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8+%DA%AF%D8%B1%D8%A7%DB%8C%D8%B4+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C%D8%A7%D9%86+%D8%B1%D8%B4%D8%AA%D9%87+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D8%A8%D8%B1%D9%82.pdf/602df949-9fb5-a147-101f-485977f8985a?t=1628399779251`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: { fa: "چارت درسی کارشناسی، ۱۴۰۰ به بعد", en: "BSc course chart, from 2021" },
      url: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%A8%D8%B1%D9%82+1400-1401.doc/af3593a4-0801-6862-5825-30f4e1d351b2?t=1771056220282`,
      format: "doc",
    },
    {
      degree: "bsc",
      archived: true,
      title: { fa: "برنامه درسی جامع وزارت علوم، ۱۴۰۰ به بعد", en: "Ministry of Science curriculum, from 2021" },
      url: `${FILES}0/Barname+bargh1400.pdf/f7e1f413-9442-8dd0-82a3-803446cf951f?t=1771056218409`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: { fa: "چارت درسی کارشناسی، مصوب ۲۰ بهمن ۱۳۹۹", en: "BSc course chart, approved 8 February 2021" },
      url: `${FILES}0/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D8%B3%DB%8C+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D8%A8%D8%B1%D9%82+%28%D9%85%D8%B5%D9%88%D8%A8+20+%D8%A8%D9%87%D9%85%D9%86+1399%29.pdf/b60fd2ec-2bc5-f57e-9526-6d1099fd345b?t=1628399778222`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: { fa: "برنامه درسی جامع کارشناسی برق", en: "Electrical engineering BSc curriculum" },
      url: "https://ee.hut.ac.ir/documents/79210/181437/BSc-+92_comment.pdf/334ef4c7-6512-5686-da82-5c4ebf307ff7?t=1639975697943",
      format: "pdf",
    },
  ],
};

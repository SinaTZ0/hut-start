import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Basic Sciences =====*/
// From the department's old site (bs.hut.ac.ir), October 2026. Photos still live there; the seed copies them into the
// app's storage. The department mostly teaches service courses to the engineering departments and runs no degree
// programme of its own, so its fields are its subject groups (mathematics, physics, chemistry) with no tracks, and it
// has no curriculum files. The site gives the founding as Tir 1388, so the date is the first day of that month.
// Mojtaba Kianpour and Ghasem Shiravand are listed on the homepage only, and their photos are BMP files the media
// upload can't read, so they have none. Saeed Daneshyar's and Samina Bidmeshkipour's cards share one phone number and
// one email address on the site; the email is kept for Bidmeshkipour only.

const PHOTOS = "https://bs.hut.ac.ir/documents/79259/";
const HOMEPAGES = "https://bs.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";

/** `path` is the file's address after `/documents/79259/`. */
const photo = (path: string) => `${PHOTOS}${path}&download=true`;

export const bs: DepartmentSeed = {
  slug: "bs",
  name: { fa: "علوم پایه", en: "Basic Sciences" },
  lede: {
    fa: "ریاضی، فیزیک و شیمی؛ دانشی که پایه‌ی همه‌ی رشته‌های مهندسی دانشگاه است.",
    en: "Mathematics, physics and chemistry: the knowledge every engineering field at the university is built on.",
  },
  intro: {
    fa: [
      "نظر به اهمیت دروس علوم پایه برای دانشجویان رشته‌های مهندسی دانشگاه، گروه علوم پایه در تیر ۱۳۸۸ تشکیل شد.",
      "گروه دروس علوم پایه، یعنی ریاضی، فیزیک و شیمی، را برای رشته‌های مهندسی ارائه می‌کند، در رشته‌های گوناگون علوم پایه پروژه‌های علمی، بنیادی و کاربردی انجام می‌دهد، دروس تخصصی و اختیاری را با تأکید بر اصول و مبانی علمی برای رشته‌های دانشگاه برگزار می‌کند و اصول کار آزمایشگاهی را آموزش می‌دهد.",
      "اعضای هیئت علمی گروه در رشته‌های ریاضی، فیزیک و شیمی هستند. تأسیس گرایش‌های بین‌رشته‌ای، از جمله نانوفیزیک، نانوشیمی و علوم کامپیوتر، در مقاطع کارشناسی ارشد و دکتری از برنامه‌های آینده‌ی گروه است.",
    ].join("\n\n"),
    en: [
      "Because the basic sciences matter so much to the university's engineering students, the Basic Sciences Department was formed in Tir 1388 (summer 2009).",
      "The department teaches the basic science courses, mathematics, physics and chemistry, to the engineering fields. It carries out scientific, fundamental and applied projects across the basic sciences, offers specialised and elective courses with an emphasis on scientific principles for the university's fields, and teaches the principles of laboratory work.",
      "Its faculty work in mathematics, physics and chemistry. Among its plans is to start interdisciplinary tracks, including nanophysics, nanochemistry and computer science, at the MSc and PhD levels.",
    ].join("\n\n"),
  },
  milestones: [{ on: "2009-06-22", label: { fa: "تشکیل گروه علوم پایه", en: "The department is formed" } }],
  foundedOn: "2009-06-22",
  labsUrl:
    "https://hut.ac.ir/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87-%D8%B9%D9%84%D9%88%D9%85-%D9%BE%D8%A7%DB%8C%D9%87",

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "مژگان نجفی", en: "Mojgan Najafi" },
      rank: "associate",
      phone: "08138411450",
      email: "m.najafi@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}mojgannajafi1`,
      scholarUrl: `${SCHOLAR}FC8ENsgAAAAJ`,
      photoUrl: photo("0/profile_photo-190x190.jpg/799b11be-6bed-e32d-2cd2-3eace3afdca2?t=1627205147646"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجید رضایی‌والا", en: "Majid Rezaeivala" },
      rank: "associate",
      phone: "08138411501",
      email: "mrezaeivala@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}mrezaeivala`,
      scholarUrl: `${SCHOLAR}9uQLK8QAAAAJ`,
      photoUrl: photo(
        "435717/%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C+%D9%88%D8%A7%D9%84%D8%A7.jpg/5f156641-c25c-5fd5-8e6b-c04d372335a0?t=1638968786191",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "حمید گودرزی افشار", en: "Hamid Goudarzi Afshar" },
      rank: "associate",
      phone: "08138411101",
      email: "goudarziafshar@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}hamid_gafshar`,
      photoUrl: photo("0/Pic-Goudarzi+%282%29.jpg/6ecd49d8-5b77-e7ff-dc6a-851b99ac3eef?t=1628146078207"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجتبی مظاهری", en: "Mojtaba Mazaheri" },
      rank: "associate",
      phone: "08138411566",
      email: "mojtaba.mazaheri@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}mojtaba.mazaheri`,
      scholarUrl: `${SCHOLAR}m1IT04gAAAAJ`,
      photoUrl: photo("0/mazaheri.jpg/0b5de778-687b-58e1-77f0-ae1dab5097c4?t=1628145334886"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سعید دانشیار", en: "Saeed Daneshyar" },
      rank: "associate",
      phone: "08138411316",
      homepageUrl: `${HOMEPAGES}s.daneshyar`,
      scholarUrl: `${SCHOLAR}2zagYQ4AAAAJ`,
      photoUrl: photo(
        "435717/%D9%BE%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84+-+Copy.jpg/02fc82e8-107b-acf9-02cc-359edfa6b2fd?t=1736399774134",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "لطف‌الله کریمی", en: "Lotfollah Karimi" },
      rank: "assistant",
      phone: "08138411505",
      email: "lkarimi@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}lkarimi`,
      photoUrl: photo(
        "435717/%DA%A9%D8%B1%DB%8C%D9%85%DB%8C+%283%29.jpg/fc08fa78-b731-b2b4-00d1-d35e863055bc?t=1637129742383",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "ساناز بوجاری", en: "Sanaz Bojari" },
      rank: "assistant",
      phone: "08138411100",
      email: "sanaz.bojari@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}s.bojari`,
      photoUrl: photo(
        "435717/%D8%A8%D9%88%D8%AC%D8%A7%D8%B1%DB%8C.png/102c7375-9e21-3495-f2cf-8aa2993fb49b?t=1638968245346",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "ثمینا بیدمشکی‌پور", en: "Samina Bidmeshkipour" },
      rank: "assistant",
      phone: "08138411316",
      email: "s.bidmeshkipour@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}s.bidmeshkipour`,
      photoUrl: photo(
        "0/%D8%A8%DB%8C%D8%AF+%D9%85%D8%B4%DA%A9%DB%8C+%281%29.jpg/336db576-b1aa-a973-3434-3f20f2f7ffda?t=1736481437739",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "امجد سالاری", en: "Amjad Salari" },
      rank: "assistant",
      email: "a.salari@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}a.salari`,
      scholarUrl: `${SCHOLAR}dhC7QaAAAAJ`,
      photoUrl: photo("0/photo_29517881092_x.jpg/937d0c34-bdec-4a38-4c27-8d1f79c5e8d9?t=1791271401725"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "قاسم شیراوند", en: "Ghasem Shiravand" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}gshiravand`,
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجتبی کیانپور", en: "Mojtaba Kianpour" },
      rank: "assistant",
    },
    {
      kind: "faculty",
      name: { fa: "امید حمیدی", en: "Omid Hamidi" },
      rank: "lecturer",
      phone: "08138411226",
      email: "omid_hamidi@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}omidhamidi77`,
      photoUrl: photo("435717/%D8%AD%D9%85%DB%8C%D8%AF%DB%8C.jpg/25b6befe-af3b-79a6-2482-03321b80421c?t=1637129561148"),
    },
  ],

  /*------ Fields and Tracks ------*/
  fields: [
    {
      key: "math",
      name: { fa: "ریاضی", en: "Mathematics" },
      summary: {
        fa: "حسابان، معادلات دیفرانسیل و ریاضیات مهندسی برای همه‌ی رشته‌ها",
        en: "Calculus, differential equations and engineering mathematics for every field",
      },
      tracks: [],
    },
    {
      key: "physics",
      name: { fa: "فیزیک", en: "Physics" },
      summary: {
        fa: "مکانیک، الکتریسیته و نور، با آزمایشگاه فیزیک",
        en: "Mechanics, electricity and light, with the physics labs",
      },
      tracks: [],
    },
    {
      key: "chemistry",
      name: { fa: "شیمی", en: "Chemistry" },
      summary: {
        fa: "شیمی عمومی و اصول کار آزمایشگاهی",
        en: "General chemistry and the principles of laboratory work",
      },
      tracks: [],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "آزمایشگاه فیزیک ۱", en: "Physics Lab 1" },
    { fa: "آزمایشگاه فیزیک ۲", en: "Physics Lab 2" },
    { fa: "آزمایشگاه شیمی عمومی", en: "General Chemistry Lab" },
  ],

  /*------ Curriculum Files ------*/
  documents: [],
};

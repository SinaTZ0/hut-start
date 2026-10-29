import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Mining Engineering =====*/
// From the department's old site (me.hut.ac.ir), October 2026. The site gives no founding date, student count or
// milestones, so those are left out. It names no fields either: the department offers one BSc programme, so that is
// the one field. Its staff tab is empty. The faculty list also shows three general-education lecturers (Bagherzadeh,
// Kazemi, Kadkhodaei); they teach for several departments and are not listed here. Zohreh Rezaei and Zohreh
// Hosseinzadeh Khorzoghi have no Google Scholar page linked, and Rezaei's, Ghorbani's and Hosseinzadeh's phone
// numbers are not published.

const SITE = "https://me.hut.ac.ir";
const HOMEPAGES = `${SITE}/~`;
const SCHOLAR = "https://scholar.google.com/citations?user=";

/** `path` is the file's address after `/documents/79245/0/`. */
const photo = (path: string) => `${SITE}/documents/79245/0/${path}&download=true`;

const BSC_CHART = `${SITE}/documents/79245/0/%D9%85%D8%B9%D8%AF%D9%86.pdf/01bb525d-e6c2-838a-81d6-34a2068c6e10?t=1768124704713`;
const BSC_EIGHT_TERM = `${SITE}/documents/79245/0/%D9%87%D8%B4%D8%AA+%D8%AA%D8%B1%D9%85%D9%87.pdf/f713c7aa-69fe-aa54-be22-235216492a9f?t=1628493653018`;

export const mining: DepartmentSeed = {
  slug: "mining",
  name: { fa: "مهندسی معدن", en: "Mining Engineering" },
  lede: {
    fa: "شناخت، اکتشاف و استخراج منابع معدنی؛ از سنگ و زمین تا فراوری و طراحی معدن.",
    en: "Finding, understanding and extracting mineral resources, from rock and ground to processing and mine design.",
  },
  quote: {
    fa: "آموزش‌هایی که به دانشجویان کارشناسی معدن ارائه می‌شود، دانش و مهارت لازم برای پاسخ به نیازهای بخش‌های گوناگون صنعت را به فارغ‌التحصیلان می‌دهد.",
    en: "The teaching offered to mining students gives graduates the knowledge and skills to meet the needs of the different parts of industry.",
  },
  intro: {
    fa: [
      "گروه مهندسی معدن دانشگاه صنعتی همدان در مقطع کارشناسی دانشجو می‌پذیرد. استان همدان ظرفیت اجرایی و پژوهشی بالایی در صنایع گوناگون دارد و با پیشرفت صنعتی استان، نیاز به نیروی کارآمد روزبه‌روز بیشتر می‌شود.",
      "گروه با تکیه بر هیئت علمی متخصص و تجهیزات آزمایشگاهی و پژوهشی مناسب، نیروهای متخصص معدن را برای استان همدان و غرب کشور تربیت می‌کند. آزمایشگاه‌های گروه شامل مکانیک سنگ، فراوری مواد معدنی، سنگ‌شناسی و کانی‌شناسی، ژئوفیزیک و کارتوگرافی، نقشه‌برداری و طراحی معادن است.",
    ].join("\n\n"),
    en: [
      "The Department of Mining Engineering at Hamedan University of Technology admits students at BSc level. Hamedan province has a high capacity for practice and research across many industries, and as the province's industry grows, the need for capable people grows with it.",
      "With a specialist faculty and suitable laboratory and research equipment, the department trains mining specialists for Hamedan province and the west of the country. Its laboratories cover rock mechanics, mineral processing, petrology and mineralogy, geophysics, and cartography, surveying and mine design.",
    ].join("\n\n"),
  },
  milestones: [],

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "ساسان قربانی", en: "Sasan Ghorbani" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}sasan_gh22`,
      scholarUrl: `${SCHOLAR}vA8KFO8AAAAJ`,
      photoUrl: photo(
        "%D8%AF%DA%A9%D8%AA%D8%B1+%D8%B3%D8%A7%D8%B3%D8%A7%D9%86+%D9%82%D8%B1%D8%A8%D8%A7%D9%86%DB%8C.jpg/1c00b181-2449-c629-ae82-4207fb802818?t=1736398747725",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "وهاب سرفرازی", en: "Vahab Sarfarazi" },
      rank: "associate",
      phone: "08138411409",
      homepageUrl: `${HOMEPAGES}vahab.sarfarazi`,
      scholarUrl: `${SCHOLAR}lE6fXG0AAAAJ`,
      photoUrl: `${SITE}/documents/79245/182696/%D8%AF%DA%A9%D8%AA%D8%B1+%D8%B3%D8%B1%D8%A7%D9%81%D8%B1%D8%A7%D8%B2%DB%8C2.jpg/be9ab930-456d-9c34-bd24-8f9b54847716?t=1627560117011&download=true`,
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "حسام دهقانی", en: "Hesam Dehghani" },
      rank: "associate",
      phone: "08138411405",
      homepageUrl: `${HOMEPAGES}dehghani`,
      scholarUrl: `${SCHOLAR}-qGSe0EAAAAJ`,
      photoUrl: `${SITE}/documents/79245/182696/%D8%AF%DA%A9%D8%AA%D8%B1+%D8%AF%D9%87%D9%82%D8%A7%D9%86%DB%8C2.jpg/99845607-9d7f-e1c6-41e9-8585b5854590?t=1627557768276&download=true`,
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "نیما بابانوری", en: "Nima Babanouri" },
      rank: "associate",
      phone: "08138411421",
      homepageUrl: `${HOMEPAGES}babanouri`,
      scholarUrl: `${SCHOLAR}wUoJKnwAAAAJ`,
      photoUrl: `${SITE}/documents/79245/182696/%D8%AF%DA%A9%D8%AA%D8%B1+%D8%A8%D8%A7%D8%A8%D8%A7%D9%86%D9%88%D8%B1%DB%8C2.jpg/d6dd4c35-fd1b-cfc2-cdca-1454878c03fa?t=1627560978093&download=true`,
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "زهره رضائی", en: "Zohreh Rezaei" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}zrezaey`,
      photoUrl: photo(
        "%D8%AE+%D8%B2%D9%87%D8%B1%D9%87+%D8%B1%D8%B6%D8%A7%DB%8C%DB%8C.jpg/787150cc-0833-3a8e-4a98-787e0834d500?t=1736399471663",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "زهره حسین‌زاده خرزوقی", en: "Zohreh Hosseinzadeh Khorzoghi" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}zhoseinzadeh`,
      photoUrl: photo(
        "%D8%B2%D9%87%D8%B1%D8%A7+%D8%AD%D8%B3%DB%8C%D9%86+%D8%B2%D8%A7%D8%AF%D9%87.jpg/617bb4cf-6b75-d2cd-218a-e9b106756584?t=1776494163845",
      ),
    },
  ],

  /*------ Fields and Tracks ------*/
  fields: [
    {
      key: "mining",
      name: { fa: "مهندسی معدن", en: "Mining engineering" },
      summary: {
        fa: "از شناخت سنگ و زمین تا طراحی و بهره‌برداری معدن",
        en: "From knowing rock and ground to designing and running a mine",
      },
      tracks: [
        {
          degree: "bsc",
          name: { fa: "مهندسی معدن", en: "Mining engineering" },
          note: { fa: "ورودی ۱۳۹۸ به بعد", en: "students admitted from 2019" },
          planUrl: BSC_EIGHT_TERM,
          chartUrl: BSC_CHART,
        },
      ],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "آزمایشگاه مکانیک سنگ", en: "Rock Mechanics Lab" },
    { fa: "آزمایشگاه فراوری مواد معدنی", en: "Mineral Processing Lab" },
    {
      fa: "آزمایشگاه‌های سنگ‌شناسی و کانی‌شناسی",
      en: "Petrology and Mineralogy Labs",
    },
    { fa: "آزمایشگاه ژئوفیزیک", en: "Geophysics Lab" },
    {
      fa: "آزمایشگاه‌های کارتوگرافی، نقشه‌برداری و طراحی معادن",
      en: "Cartography, Surveying and Mine Design Labs",
    },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: {
        fa: "چارت درسی کارشناسی مهندسی معدن، ورودی ۱۳۹۸ به بعد",
        en: "Mining engineering BSc chart, from 2019",
      },
      url: BSC_CHART,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: {
        fa: "برنامه هشت‌ترمه کارشناسی مهندسی معدن، ورودی ۱۳۹۸",
        en: "Mining engineering BSc eight-semester plan, 2019 intake",
      },
      url: BSC_EIGHT_TERM,
      format: "pdf",
    },
  ],
};

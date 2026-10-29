import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Chemical Engineering =====*/
// From the department's old site (chemeng.hut.ac.ir), October 2026. Photos and the one form still live there; the
// seed copies the photos into the app's storage and links the form where it is. The site gives the BSc start as
// Mehr 1388, so the founding date is the first day of that month, and the MSc starts by year only. It names no
// fields beyond the degrees, so each programme is a field. The BSc and MSc curriculum buttons carry no links, so no
// track has a plan or chart. Maryam Sahraro's rank is not listed, and the homepage the site gives her is another
// member's, so she is listed without either.

const PHOTOS = "https://chemeng.hut.ac.ir/documents/79252/";
const HOMEPAGES = "https://chemeng.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";

/** `path` is the file's address after `/documents/79252/`. */
const photo = (path: string) => `${PHOTOS}${path}&download=true`;

const LAB_FORM =
  "http://hut.sain.ir/documents/79252/0/%D9%81%D8%B1%D9%85+%D8%A8%D9%87%D8%B1%D9%87+%D9%85%D9%86%D8%AF%D9%8A+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C%D8%A7%D9%86+%D8%A7%D8%B2+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D9%87%D8%A7%D9%8A+%DA%AF%D8%B1%D9%88%D9%87+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D8%B4%DB%8C%D9%85%DB%8C+pdf.pdf/6a35afd3-43ad-25de-6b98-42e3b3ea980f?t=1628402065511";

export const chem: DepartmentSeed = {
  slug: "chem",
  name: { fa: "مهندسی شیمی", en: "Chemical Engineering" },
  lede: {
    fa: "طراحی و راه‌اندازی واحدهای صنعتی واکنش و جداسازی؛ از پالایشگاه و پتروشیمی تا صنایع غذایی و دارویی.",
    en: "Designing and running the industrial units that react and separate, from refineries and petrochemicals to food and pharmaceuticals.",
  },
  quote: {
    fa: "هدف نهایی از طراحی یک فرایند رسیدن به محصولی با کیفیت مناسب است که بازار هدف می‌خواهد.",
    en: "The final aim of designing a process is a product of the right quality, the one the target market wants.",
  },
  intro: {
    fa: [
      "مهندسی شیمی علم طراحی و ساخت واحدهای صنعتی تولید محصولات شیمیایی است که بر مبانی شیمیایی و فیزیکی تکیه دارد و در آن‌ها معمولاً واحدهای واکنش و جداسازی دیده می‌شود. پیش از خرید و ساخت تجهیزات و آزمودن فرایند، با دانش مهندسی شیمی می‌توان ترکیب اجزا و مقدار انرژی و کار مصرفی را به دست آورد.",
      "گروه مهندسی شیمی دانشگاه صنعتی همدان در مهر ۱۳۸۸ با دوره کارشناسی آغاز شد. کارشناسی ارشد طراحی فرایند در سال ۱۳۹۲ و کارشناسی ارشد ترموسینتیک و کاتالیست در سال ۱۴۰۰ به آن افزوده شد.",
      "هدف گروه تربیت نیروی متخصص برای صنایع شیمیایی، پتروشیمی، پالایشگاهی، غذایی و دارویی، و مربیان پژوهشی و آموزشی برای مراکز علمی، پارک‌های فناوری و شرکت‌های مرتبط است. پژوهش‌های گروه شامل ساخت و شناسایی غشاها و کاربرد آن‌ها در جداسازی، ساخت پایلوت‌های جداسازی غشایی، سنتز پلی‌پروپیلن مقاوم در برابر خش، راه‌اندازی پایلوت تولید پروتئین تک‌یاخته و ساخت انواع جاذب‌هاست.",
    ].join("\n\n"),
    en: [
      "Chemical engineering is the science of designing and building industrial units that make chemical products. It rests on chemical and physical principles, and these units usually include reaction and separation steps. Before equipment is bought and built and the process is tested, chemical engineering knowledge gives the composition of every stream and the energy and work the process uses.",
      "The Chemical Engineering Department at Hamedan University of Technology began in Mehr 1388 (autumn 2009) with the BSc. The MSc in process design followed in 2013 and the MSc in thermokinetics and catalysts in 2021.",
      "The department aims to train specialists for the chemical, petrochemical, refining, food and pharmaceutical industries, and teachers and researchers for academic centres, technology parks and related companies. Its research includes making and characterising membranes and using them in separation, building membrane-separation pilots, synthesising scratch-resistant polypropylene, starting a single-cell protein pilot and making a range of adsorbents.",
    ].join("\n\n"),
  },
  milestones: [
    { on: "2009-09-23", label: { fa: "کارشناسی مهندسی شیمی", en: "BSc in chemical engineering" } },
    { on: "2013-03-21", label: { fa: "کارشناسی ارشد طراحی فرایند", en: "MSc in process design" } },
    {
      on: "2021-03-21",
      label: { fa: "کارشناسی ارشد ترموسینتیک و کاتالیست", en: "MSc in thermokinetics and catalysts" },
    },
  ],
  foundedOn: "2009-09-23",

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "جابر یوسفی سیف", en: "Jaber Yousefi Seif" },
      rank: "assistant",
      phone: "08138411453",
      homepageUrl: `${HOMEPAGES}jaber.yosofi`,
      scholarUrl: `${SCHOLAR}ZDUMb9cAAAAJ`,
      photoUrl: photo("412915/%DB%8C%D9%88%D8%B3%D9%81%DB%8C.jpg/f3b0244a-4ff3-07fe-6423-e92115c90871?t=1635581480179"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجید پاکیزه", en: "Majid Pakizeh" },
      rank: "professor",
      phone: "08138411473",
      homepageUrl: `${HOMEPAGES}pakizeh`,
      scholarUrl: `${SCHOLAR}5LtMpegAAAAJ`,
      photoUrl: photo(
        "412915/%D9%BE%D8%A7%DA%A9%DB%8C%D8%B2%D9%87.jpg/a4a0bcc2-d692-8483-f15f-27533252a28d?t=1635581479982",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "علیرضا بهرامیان", en: "Alireza Bahramian" },
      rank: "associate",
      phone: "08138411465",
      homepageUrl: `${HOMEPAGES}bahramian`,
      scholarUrl: `${SCHOLAR}THEfZqQAAAAJ`,
      photoUrl: photo(
        "412915/%D8%A8%D9%87%D8%B1%D8%A7%D9%85%DB%8C%D8%A7%D9%86.jpg/5e442b54-af33-61f5-6a57-0df9fc900a88?t=1635581479926",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "علیرضا سبزواری", en: "Alireza Sabzevari" },
      rank: "associate",
      phone: "08138411000",
      homepageUrl: `${HOMEPAGES}a.sabzvari`,
      scholarUrl: `${SCHOLAR}g_L7PGoAAAAJ`,
      photoUrl: photo(
        "412915/%D8%AF%DA%A9%D8%AA%D8%B1+%D8%B3%D8%A8%D8%B2%D9%88%D8%A7%D8%B1%DB%8C.jpg/be4276aa-9577-69a0-effb-4b2079671dc7?t=1736480320672",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مسعود وصالی ناصح", en: "Masoud Vesali Naseh" },
      rank: "assistant",
      phone: "08138411460",
      homepageUrl: `${HOMEPAGES}masood.vesali`,
      scholarUrl: `${SCHOLAR}D6gQi8QAAAAJ`,
      photoUrl: photo("412915/%D9%88%D8%B5%D8%A7%D9%84%DB%8C.jpg/1333c8bd-5fe0-60fe-e584-13d906e5d87c?t=1635581480150"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "هادی سبحانی", en: "Hadi Sobhani" },
      rank: "assistant",
      phone: "08138411458",
      homepageUrl: `${HOMEPAGES}sobhani`,
      photoUrl: photo(
        "412915/%D8%B3%D8%A8%D8%AD%D8%A7%D9%86%DB%8C.jpg/9aa855da-b606-f2b3-2128-a0c67f0775df?t=1635581480067",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "بیژن مدی", en: "Bijan Medi" },
      rank: "assistant",
      phone: "08138411452",
      homepageUrl: `${HOMEPAGES}medi`,
      scholarUrl: `${SCHOLAR}sxUbaBoAAAAJ`,
      photoUrl: photo("412915/%D9%85%D8%AF%DB%8C.jpg/c75250b5-491a-8eab-d512-5dd00127ba49?t=1635581480122"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "ابوالفضل شجاعیان", en: "Abolfazl Shojaeian" },
      rank: "assistant",
      phone: "08138411459",
      homepageUrl: `${HOMEPAGES}shojaeian`,
      scholarUrl: `${SCHOLAR}xFmhFScAAAAJ`,
      photoUrl: photo(
        "412915/%D8%AF%DA%A9%D8%AA%D8%B1+%D8%B4%D8%AC%D8%A7%D8%B9%DB%8C%D8%A7%D9%86.jpeg/756c6c20-301f-034e-1fce-defe9b4817ee?t=1736480618542",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مجتبی رسته", en: "Mojtaba Rasteh" },
      rank: "assistant",
      phone: "08138411458",
      homepageUrl: `${HOMEPAGES}moj167`,
      scholarUrl: `${SCHOLAR}OxOlBPcAAAAJ`,
      photoUrl: photo("412915/%D8%B1%D8%B3%D8%AA%D9%87.jpg/09f6baab-73df-4474-f7c7-1986725a1674?t=1635581480036"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "محمدباقر سبحانی متین", en: "Mohammad Bagher Sobhani Matin" },
      rank: "assistant",
      phone: "08138411448",
      homepageUrl: `${HOMEPAGES}m.b.s.matin/home`,
      photoUrl: photo(
        "412915/%D8%B3%D8%A8%D8%AD%D8%A7%D9%86%DB%8C+%D9%85%D8%AA%DB%8C%D9%86.jpg/0e3ad976-7d2b-c771-81f6-a0c74ec08e7e?t=1739600940589",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "مریم صحرارو", en: "Maryam Sahraro" },
      scholarUrl: `${SCHOLAR}y_w5bMgAAAAJ`,
      photoUrl: photo(
        "0/%D9%85%D8%B1%DB%8C%D9%85+%D8%B5%D8%AD%D8%B1%D8%A7%D8%B1%D9%88.jpg/616f9b9c-b2d6-29b8-052a-494d4f7446a3?t=1776675171814",
      ),
    },
    {
      kind: "staff",
      name: { fa: "زهرا روحی", en: "Zahra Roohi" },
      jobTitle: { fa: "کارشناس گروه و آزمایشگاه", en: "Department and lab officer" },
      phone: "08138411304",
      photoUrl: photo(
        "412915/%D8%AE%D8%A7%D9%86%D9%85+%D8%B1%D9%88%D8%AD%DB%8C.jpg/b5464a4b-249c-86eb-845d-1ad6a3940496?t=1635581480010",
      ),
    },
  ],

  /*------ Fields and Tracks ------*/
  fields: [
    {
      key: "chemical",
      name: { fa: "مهندسی شیمی", en: "Chemical engineering" },
      summary: {
        fa: "از مبانی شیمیایی و فیزیکی تا طراحی واحد صنعتی",
        en: "From chemical and physical principles to an industrial unit",
      },
      tracks: [{ degree: "bsc", name: { fa: "مهندسی شیمی", en: "Chemical engineering" } }],
    },
    {
      key: "process",
      name: { fa: "طراحی فرایند", en: "Process design" },
      summary: {
        fa: "طراحی، شبیه‌سازی و کنترل فرایندهای شیمیایی",
        en: "Designing, simulating and controlling chemical processes",
      },
      tracks: [{ degree: "msc", name: { fa: "طراحی فرایند", en: "Process design" } }],
    },
    {
      key: "catalyst",
      name: { fa: "ترموسینتیک و کاتالیست", en: "Thermokinetics and catalysts" },
      summary: {
        fa: "ترمودینامیک و سرعت واکنش‌ها، و طراحی کاتالیست",
        en: "The thermodynamics and rates of reactions, and catalyst design",
      },
      tracks: [{ degree: "msc", name: { fa: "ترموسینتیک و کاتالیست", en: "Thermokinetics and catalysts" } }],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "آزمایشگاه عملیات واحد", en: "Unit Operations Lab" },
    { fa: "آزمایشگاه مکانیک سیالات", en: "Fluid Mechanics Lab" },
    { fa: "آزمایشگاه انتقال حرارت", en: "Heat Transfer Lab" },
    { fa: "آزمایشگاه کنترل فرایند", en: "Process Control Lab" },
    { fa: "آزمایشگاه محاسبات به کمک کامپیوتر", en: "Computer-Aided Calculation Lab" },
    { fa: "آزمایشگاه تحقیقاتی", en: "Research Lab" },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: {
        fa: "فرم بهره‌مندی دانشجویان از آزمایشگاه‌های گروه مهندسی شیمی",
        en: "Form for students' use of the chemical engineering labs",
      },
      url: LAB_FORM,
      format: "pdf",
    },
  ],
};

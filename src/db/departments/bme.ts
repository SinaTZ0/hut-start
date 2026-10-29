import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Biomedical Engineering =====*/
// From the department's old site (bme.hut.ac.ir), October 2026. Files and photos still live there; the seed copies the
// photos into the app's storage and links the files where they are. Most profile pages hide their e-mail addresses
// behind a script, so only the ones printed on the site are here.

const FILES = "https://bme.hut.ac.ir/documents/79238/";
const HOMEPAGES = "https://bme.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";

/** `path` is the file's address after `/documents/79238/`, query string included. */
const photo = (path: string) => `${FILES}${path}`;

export const bme: DepartmentSeed = {
  slug: "bme",
  name: { fa: "مهندسی پزشکی", en: "Biomedical Engineering" },
  lede: {
    fa: "مهندسی در خدمت سلامت؛ از سیگنال‌های حیاتی و تصویربرداری پزشکی تا ریزسامانه‌ها و حسگرهای زیستی.",
    en: "Engineering in the service of health, from vital signals and medical imaging to microsystems and biosensors.",
  },
  quote: {
    fa: "مهندسی پزشکی، بکارگیری علوم مهندسی برای درک، تغییر، کنترل و مشاهده عملکرد سیستم‌های زنده است.",
    en: "Biomedical engineering is the use of engineering to understand, change, control and observe living systems.",
  },
  intro: {
    fa: [
      "در سال‌های اخیر پیشرفت مراقبت‌های پزشکی بسیار چشمگیر بوده و از علل اصلی آن پیوند میان دو فضای علمی مهندسی و پزشکی است. مهندسی پزشکی رشته‌ای است که در آن در زمینه علوم مهندسی، زیستی و پزشکی پژوهش و فعالیت می‌شود تا با روش‌های تحلیلی و تجربی مبتنی بر مهندسی، سلامت جامعه بهبود یابد. نیاز کشور به دانش‌آموختگان این رشته، با وابستگی روزافزون به فناوری‌های درمانی و پیچیده‌تر شدن فرایندهای تشخیصی، به شدت افزایش یافته است.",
      "گروه مهندسی پزشکی دانشگاه صنعتی همدان نخستین گروه مهندسی پزشکی در غرب کشور و محور اصلی آموزش و پژوهش این رشته در این ناحیه است. گروه سالانه حدود ۵۰ دانشجوی کارشناسی و ۱۵ دانشجوی کارشناسی ارشد در گرایش بیوالکتریک می‌پذیرد و با ۸ عضو هیئت علمی تمام‌وقت، از فارغ‌التحصیلان دانشگاه‌های برتر ایران و گاه دانشگاه‌های معتبر خارجی، به آموزش و پژوهش می‌پردازد.",
      "دانش‌آموختگان این رشته می‌توانند دستگاه‌های پزشکی را طراحی و بسازند، تجهیزات پزشکی را نصب، راه‌اندازی و نگهداری کنند، در مراکز درمانی مدیریت فنی را بر عهده بگیرند و در پژوهش‌های زیست‌پزشکی، طراحی تجهیزات توان‌بخشی و ابداع مواد مصرفی حوزه سلامت همکاری کنند. گرایش بیوالکتریک یکی از گسترده‌ترین حوزه‌های پژوهشی مهندسی پزشکی است و ابزاردقیق پزشکی، پردازش سیگنال‌های حیاتی، پردازش تصاویر پزشکی، مدلسازی سیستم‌های بیولوژیکی و طراحی ریزسامانه‌ها و بیوسنسورها را در بر می‌گیرد.",
    ].join("\n\n"),
    en: [
      "Progress in medical care has been remarkable in recent years, and a main reason is the link between engineering and medicine. Biomedical engineering is the field in which engineering, biology and medicine are studied and practised together, using analytical and experimental engineering methods to improve the health of society. As treatment technology becomes ever more central and diagnostic procedures more complex, the country's need for graduates in this field has grown sharply.",
      "The biomedical engineering department at Hamedan University of Technology is the first of its kind in the west of the country and the main centre of teaching and research in the field in this region. Each year it admits about 50 BSc students and 15 MSc students in the bioelectric track, and its 8 full-time faculty members, graduates of Iran's leading universities and sometimes of respected universities abroad, teach and carry out research.",
      "Graduates can design and build medical devices, install, commission and maintain medical equipment, take on the technical management of treatment centres, and contribute to biomedical research, rehabilitation equipment design and new materials for healthcare. The bioelectric track is one of the broadest research areas in biomedical engineering, covering medical instrumentation, vital signal processing, medical image processing, modelling of biological systems, and the design of microsystems and biosensors.",
    ].join("\n\n"),
  },
  milestones: [],

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "علیرضا فلاحی", en: "Alireza Fallahi" },
      rank: "assistant",
      phone: "08138411507",
      email: "ali.r.fallahi@gmail.com",
      homepageUrl: `${HOMEPAGES}ali.r.fallahi`,
      scholarUrl: `${SCHOLAR}FZgiB8MAAAAJ`,
      photoUrl: photo("0/fallahi.jpg/f2897f32-34f2-733f-f9e5-8fd4151955f8?t=1770628719931&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "شهریار جاماسب", en: "Shahriar Jamasb" },
      rank: "associate",
      phone: "08138411511",
      homepageUrl: `${HOMEPAGES}shahriar_jamasb`,
      scholarUrl: `${SCHOLAR}NvmirCYAAAAJ`,
      photoUrl: photo("446151/DrJamasb.jpg/28153287-fbde-842b-a87d-1dec8fd50a98?t=1637734476261&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "رسول باغبانی خضرلو", en: "Rasoul Baghbani Khezrloo" },
      rank: "associate",
      phone: "08138411513",
      email: "baghbani@hut.ac.ir",
      office: { fa: "ساختمان فرشچیان، طبقه پنجم", en: "Farshchian Building, fifth floor" },
      homepageUrl: `${HOMEPAGES}baghbani`,
      scholarUrl: `${SCHOLAR}ZP5OCWkAAAAJ`,
      photoUrl: photo("446151/DrBaghbani.jpg/17c38062-75f7-8074-9e02-34b1505d3a0a?t=1637734476226&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "محمدباقر خدابخشی", en: "Mohammad Bagher Khodabakhshi" },
      rank: "associate",
      phone: "08138411507",
      email: "mb.khodabakhshi@hut.ac.ir",
      homepageUrl: `${HOMEPAGES}mb.khodabakhshi`,
      scholarUrl: `${SCHOLAR}RX1__0QAAAAJ`,
      photoUrl: photo(
        "0/%D8%AF%DA%A9%D8%AA%D8%B1+%D8%AE%D8%AF%D8%A7+%D8%A8%D8%AE%D8%B4%DB%8C.jpeg/5ab6cfc5-6c6d-020a-2088-ed36ea5782f1?t=1637055973214&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "معصومه آشوری راد", en: "Masoumeh Ashouri Rad" },
      rank: "assistant",
      phone: "08138411557",
      homepageUrl: `${HOMEPAGES}ashoori`,
      scholarUrl: `${SCHOLAR}KDH660QAAAAJ`,
      photoUrl: photo("446151/DrAshoori.jpeg/ad6bb412-f5e9-d54c-3618-f56f947dea79?t=1637734476186&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "محمدرضا رضاییان", en: "Mohammad Reza Rezaeian" },
      rank: "assistant",
      phone: "08138411509",
      homepageUrl: `${HOMEPAGES}rezaeian`,
      scholarUrl: `${SCHOLAR}t2eYSWwAAAAJ`,
      photoUrl: photo("446151/Dr+Rezaieyan.jpg/37fd31ab-e4ee-53e0-e450-31c2a0f3374b?t=1637734476149&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سمیرا عباسی", en: "Samira Abbasi" },
      rank: "assistant",
      phone: "08138411401",
      homepageUrl: `${HOMEPAGES}samira.abbasi`,
      scholarUrl: `${SCHOLAR}LPIRP0UAAAAJ`,
      photoUrl: photo("0/new+ax.jpg/7f824e57-8063-ef19-7f9d-8857aa4c0ede?t=1627638747306&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "صفورا قاسمی", en: "Safoura Ghasemi" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}s.ghasemi`,
      scholarUrl: `${SCHOLAR}FZ6-RcUAAAAJ`,
      photoUrl: photo(
        "0/%D8%AE%D8%A7%D9%86%D9%85+%D8%AF%DA%A9%D8%AA%D8%B1+%D9%82%D8%A7%D8%B3%D9%85%DB%8C.jpeg/afd2eb33-f901-e6a5-f4f4-c95d090ba360?t=1736397546287&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "پریسا قادری دانشمند", en: "Parisa Ghaderi Daneshmand" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}daneshmand.eng`,
      scholarUrl: `${SCHOLAR}d30V5KEAAAAJ`,
      photoUrl: photo(
        "0/%D9%82%D8%A7%D8%AF%D8%B1%DB%8C+%D8%AF%D8%A7%D9%86%D8%B4%D9%85%D9%86%D8%AF.jpg/8f9e50b9-d35b-11c2-905c-8289dc2c06ec?t=1736397693069&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سهیلا شعبانی مشکول", en: "Soheila Shabani Meshkoul" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}soheila.shabani`,
      scholarUrl: `${SCHOLAR}VsYDSmgAAAAJ`,
      photoUrl: photo("0/shabani.png/5d1dd662-a713-3973-c445-d4363a75339a?t=1772953969196&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "محمدحسین نوروزی بیرامی", en: "Mohammad Hossein Norouzi Biramy" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}mh.noroozi`,
      scholarUrl: `${SCHOLAR}gEUtBI4AAAAJ`,
      photoUrl: photo(
        "0/%D9%85%D8%AD%D9%85%D8%AF+%D8%AD%D8%B3%DB%8C%D9%86+%D9%86%D9%88%D8%B1%D9%88%D8%B2%DB%8C.jpg/2a9d8b10-a9d5-56dd-aa9b-f198341a4a90?t=1778660715985&download=true",
      ),
    },
  ],

  /*------ Fields and Tracks ------*/
  // The old site names one BSc programme and one MSc track (bioelectric). Its five research areas are described in
  // the intro rather than invented as fields.
  fields: [
    {
      key: "biomedical",
      name: { fa: "مهندسی پزشکی", en: "Biomedical engineering" },
      summary: {
        fa: "مهندسی و زیست‌شناسی در خدمت تشخیص و درمان",
        en: "Engineering and biology in service of diagnosis and treatment",
      },
      tracks: [
        {
          degree: "bsc",
          name: { fa: "مهندسی پزشکی", en: "Biomedical engineering" },
          note: { fa: "ورودی ۱۴۰۳ به بعد", en: "students admitted from 2024" },
          chartUrl: `${FILES}4241122/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D8%B3%DB%8C+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%BE%D8%B2.pdf/ccd8e8f7-68d6-d437-7df9-27204ec0d392?t=1748412001015`,
        },
      ],
    },
    {
      key: "bioelectric",
      name: { fa: "بیوالکتریک", en: "Bioelectric" },
      summary: {
        fa: "سیگنال، تصویر و ریزسامانه‌های زیستی",
        en: "Biological signals, images and microsystems",
      },
      tracks: [
        {
          degree: "msc",
          name: { fa: "مهندسی پزشکی، بیوالکتریک", en: "Biomedical engineering, bioelectric" },
          chartUrl: `${FILES}4241122/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AE%D9%84%D8%A7%D8%B5%D9%87+%D8%B4%D8%AF+%D8%A7%D8%B1%D8%B4%D8%AF+%D8%A8%DB%8C%D9%88+%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%DB%8C%DA%A9.pdf/274e17db-37ec-1f90-1aa5-649d10881500?t=1716206778736`,
        },
      ],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "کارگاه تجهیزات پزشکی", en: "Medical Equipment Workshop" },
    { fa: "آزمایشگاه فیزیولوژی", en: "Physiology Lab" },
    { fa: "آزمایشگاه میکروپروسسور", en: "Microprocessor Lab" },
    { fa: "اتاق پروژه", en: "Project Room" },
    {
      fa: "آزمایشگاه اندازه‌گیری و ابزاردقیق پزشکی (در حال راه‌اندازی)",
      en: "Medical Measurement and Instrumentation Lab (being set up)",
    },
    { fa: "آزمایشگاه تحقیقاتی کارشناسی ارشد مهندسی پزشکی", en: "Biomedical Engineering MSc Research Lab" },
    {
      fa: "آزمایشگاه تحقیقاتی سلولی نانو بیوالکترونیک (در حال راه‌اندازی)",
      en: "Cellular Nano-Bioelectronics Research Lab (being set up)",
    },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: {
        fa: "چارت درسی کارشناسی مهندسی پزشکی، ورودی ۱۴۰۳ به بعد",
        en: "Biomedical engineering BSc chart, from 2024",
      },
      url: `${FILES}4241122/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D8%B3%DB%8C+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%BE%D8%B2.pdf/ccd8e8f7-68d6-d437-7df9-27204ec0d392?t=1748412001015`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: { fa: "دستور کار آزمایشگاه فیزیولوژی", en: "Physiology lab manual" },
      url: "https://hut.ac.ir/documents/79238/2970725/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1+%DA%A9%D8%A7%D8%B1+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D9%81%DB%8C%D8%B2%DB%8C%D9%88%D9%84%D9%88%DA%98%DB%8C.pdf/c794d53f-7b76-576a-cec1-a402350d66e5?t=1697971544853&download=true",
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "چارت درسی کارشناسی مهندسی پزشکی، ورودی ۱۴۰۰ و بعد از آن",
        en: "Biomedical engineering BSc chart, from 2021",
      },
      url: `${FILES}4241122/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D8%B3%DB%8C+%DA%A9%D8%A7%D8%B1.pdf/d13ba135-b375-18c2-9928-7052b56bdfe2?t=1716206779137`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "چارت درسی کارشناسی مهندسی پزشکی، ورودی‌های ۱۳۹۶ تا ۱۳۹۹",
        en: "Biomedical engineering BSc chart, 2017 to 2020",
      },
      url: `${FILES}0/Chart96.pdf/fa5e666a-8968-3e73-d1bd-b7edf03a5861?t=1628487869676`,
      format: "pdf",
    },
  ],
};

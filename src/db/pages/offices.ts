import type { LocalizedText } from "#/lib/localized-text";
import type { AcademicRank, Honorific } from "#/orpc/department/constants";
import type { FeedCategory } from "#/orpc/home-feed/constants";
import type { OfficeLinkIcon, OfficeRole, OfficeSection } from "#/orpc/office/constants";

/*===== Offices =====*/
// The university offices' pages, from the old site on 2026-10-29: hut.ac.ir for the president, public relations,
// international affairs, shahed affairs, the incubator, online learning and continuing education; web.hut.ac.ir for
// the education and sports offices. Persian is the old pages' text, tidied; English is a first translation. Ledes are
// written for this site, since the old pages have none. Photos are downloaded and stored by the seed.

export type OfficeSeed = {
  slug: string;
  section: OfficeSection;
  name: LocalizedText;
  lede: LocalizedText;
  /** Paragraphs separated by a blank line. */
  intro?: LocalizedText;
  duties?: LocalizedText[];
  notes?: LocalizedText[];
  place?: LocalizedText;
  hours?: LocalizedText;
  phone?: string;
  fax?: string;
  email?: string;
  feedCategory?: FeedCategory;
  members: {
    role: OfficeRole;
    honorific?: Honorific;
    name: LocalizedText;
    jobTitle?: LocalizedText;
    rank?: AcademicRank;
    degree?: LocalizedText;
    term?: string;
    phone?: string;
    email?: string;
    resumeUrl?: string;
    photoUrl?: string;
  }[];
  links: { title: LocalizedText; description?: LocalizedText; url: string; icon: OfficeLinkIcon }[];
};

const MAIN = "https://hut.ac.ir";
const WEB = "https://web.hut.ac.ir";

/*------ Shared Tools ------*/

const GOLESTAN = {
  title: { fa: "سامانه گلستان", en: "Golestan" },
  description: { fa: "انتخاب واحد، نمره‌ها و درخواست‌ها", en: "Registration, grades and requests" },
  url: "https://golestan.hut.ac.ir/",
  icon: "system",
} as const;

const LMS = {
  title: { fa: "کلاس‌های آنلاین", en: "Online classes" },
  description: { fa: "ورود به کلاس‌های مجازی (ادوبی کانکت)", en: "Join virtual classes (Adobe Connect)" },
  url: "http://lms.hut.ac.ir/",
  icon: "classroom",
} as const;

const COURSEWARE = {
  title: { fa: "درس‌افزار", en: "Courseware" },
  description: { fa: "جزوه، تمرین و آزمون درس‌ها", en: "Course notes, assignments and quizzes" },
  url: "https://ec.hut.ac.ir/",
  icon: "courseware",
} as const;

export const offices: OfficeSeed[] = [
  /*------ President ------*/
  {
    slug: "president",
    section: "about",
    name: { fa: "ریاست دانشگاه", en: "Office of the President" },
    lede: {
      fa: "رئیس دانشگاه صنعتی همدان، دفتر ریاست و رؤسای پیشین دانشگاه.",
      en: "The president of Hamedan University of Technology, the president's office, and the university's former presidents.",
    },
    phone: "08138411564",
    fax: "08138380660",
    email: "info@hut.ac.ir",
    feedCategory: "university",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "محمود پری‌پور", en: "Mahmoud Paripour" },
        jobTitle: { fa: "رئیس دانشگاه", en: "President" },
        rank: "associate",
        degree: { fa: "دکتری ریاضی کاربردی (آنالیز عددی)", en: "PhD in applied mathematics (numerical analysis)" },
        phone: "08138411551",
        email: "paripour@hut.ac.ir",
        resumeUrl: `${MAIN}/documents/38165/55248/PARIPOUR+CV..pdf/c268c31d-14da-33dc-ae35-1c2bf4d6d9fa`,
        photoUrl: `${MAIN}/documents/38165/1331639/0147414.jpg/061a7efa-e5fb-26a8-c07e-5eba5baa598a?download=true`,
      },
      {
        role: "staff",
        honorific: "doctor",
        name: { fa: "لطف‌الله کریمی", en: "Lotfollah Karimi" },
        jobTitle: { fa: "رئیس دفتر", en: "Head of the president's office" },
        phone: "08138411564",
        email: "info@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/0/01+%282%29.jpg/53616547-9e07-fbe4-e9b9-53301da5b8ed?download=true`,
      },
      {
        role: "staff",
        name: { fa: "محمد بخشنده", en: "Mohammad Bakhshandeh" },
        jobTitle: { fa: "کارشناس حوزه ریاست", en: "President's office officer" },
        phone: "08138411551",
        photoUrl: `${MAIN}/documents/38165/1331639/01IMG_20250422_081117.jpg/3c2204d9-9122-0402-6f33-4fec4e06f263?download=true`,
      },
      {
        role: "former",
        honorific: "doctor",
        name: { fa: "امیر مومنی", en: "Amir Momeni" },
        rank: "associate",
        degree: { fa: "دکتری مهندسی متالورژی و مواد", en: "PhD in metallurgy and materials engineering" },
        term: "1400-1404",
        photoUrl: `${MAIN}/documents/38165/1331639/%D9%85%D9%88%D9%85%D9%86%DB%8C.jpg/dbf74645-8929-d2a9-f4d5-c0cceb36dec3?download=true`,
      },
      {
        role: "former",
        honorific: "doctor",
        name: { fa: "حسن ختن‌لو", en: "Hassan Khotanlou" },
        rank: "professor",
        degree: { fa: "دکتری مهندسی کامپیوتر", en: "PhD in computer engineering" },
        term: "1398-1400",
        photoUrl: `${MAIN}/documents/38165/1331639/%D8%AE%D8%AA%D9%86+%D9%84%D9%88.jpg/4e509f48-807e-2087-e203-6cadced9a7f6?download=true`,
      },
      {
        role: "former",
        honorific: "doctor",
        name: { fa: "محمود نیلی", en: "Mahmoud Nili" },
        rank: "associate",
        degree: { fa: "دکتری مهندسی عمران", en: "PhD in civil engineering" },
        term: "1393-1398",
        photoUrl: `${MAIN}/documents/38165/1331639/%D9%86%DB%8C%D9%84%DB%8C.jpg/b3b946b0-580c-6083-c7a9-6ddf4b0e1aca?download=true`,
      },
      {
        role: "former",
        honorific: "doctor",
        name: { fa: "حسن کی‌پور", en: "Hassan Keypour" },
        rank: "professor",
        degree: { fa: "دکتری شیمی معدنی", en: "PhD in inorganic chemistry" },
        term: "1387-1393",
        photoUrl: `${MAIN}/documents/38165/1331639/%DA%A9%DB%8C+%D9%BE%D9%88%D8%B1.jpg/cfcd4400-d597-5103-7593-f990927e2657?download=true`,
      },
      {
        // The old page gives him the same years as the next president (1387–1393); left out until the office confirms.
        role: "former",
        honorific: "doctor",
        name: { fa: "محمدحسین مرادی", en: "Mohammad Hossein Moradi" },
        rank: "professor",
        degree: { fa: "دکتری مهندسی برق", en: "PhD in electrical engineering" },
        photoUrl: `${MAIN}/documents/38165/1331639/%D9%85%D8%B1%D8%A7%D8%AF%DB%8C.jpg/dcb43cd3-c85a-8be8-2d6d-d81c70975ce7?download=true`,
      },
    ],
    links: [
      {
        title: { fa: "ارتباط مستقیم با ریاست", en: "Write to the president" },
        description: {
          fa: "پیام شما مستقیم به دفتر ریاست می‌رسد",
          en: "Your message goes straight to the president's office",
        },
        url: `${MAIN}/connect-us`,
        icon: "contact",
      },
    ],
  },

  /*------ Public Relations ------*/
  {
    slug: "public-relations",
    section: "about",
    name: { fa: "اداره روابط عمومی", en: "Public Relations" },
    lede: {
      fa: "خبرها و اطلاع‌رسانی دانشگاه، و پاسخ به پرسش‌های رسانه‌ها و مردم.",
      en: "The university's news and announcements, and answers for the press and the public.",
    },
    phone: "08138411564",
    fax: "08138380660",
    email: "info@hut.ac.ir",
    feedCategory: "university",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "لطف‌الله کریمی", en: "Lotfollah Karimi" },
        jobTitle: { fa: "رئیس دفتر روابط عمومی", en: "Head of public relations" },
        phone: "08138411564",
        email: "info@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/275863/01+%281%29.jpg/dfb9ff30-6f9e-00a8-de9f-90dc921960f4?download=true`,
      },
      {
        role: "staff",
        name: { fa: "سید کمال حسینی", en: "Seyed Kamal Hosseini" },
        jobTitle: { fa: "مسئول دفتر روابط عمومی", en: "Public relations officer" },
        phone: "08138411550",
        email: "info@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/1331639/photo_2024-05-27_15-35-40.jpg/03e16c46-b282-5d88-f281-0f5f5f6c3f28?download=true`,
      },
    ],
    links: [],
  },

  /*------ International ------*/
  {
    slug: "international",
    section: "about",
    name: { fa: "اداره همکاری‌های علمی بین‌المللی", en: "International Scientific Cooperation" },
    lede: {
      fa: "همکاری‌های علمی دانشگاه با دانشگاه‌ها و پژوهشگران خارج از کشور.",
      en: "The university's scientific cooperation with universities and researchers abroad.",
    },
    phone: "08138411560",
    fax: "08138411100",
    email: "isco@hut.ac.ir",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "حسن بشیری", en: "Hassan Bashiri" },
        jobTitle: { fa: "رئیس اداره همکاری‌های علمی بین‌المللی", en: "Head of international cooperation" },
        photoUrl: `${MAIN}/documents/38165/275863/%D8%A8%D8%B4%DB%8C%D8%B1%DB%8C.jpg/df40140f-e1ee-212f-5c40-827873acf7e9?download=true`,
      },
      {
        role: "staff",
        name: { fa: "جعفر لطفیان", en: "Jafar Lotfian" },
        jobTitle: { fa: "کارشناس", en: "Officer" },
        phone: "08138411560",
        email: "isco@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/0/lotfiyan+%281%29.jpg/5404f8a1-cbef-2543-431b-9023bffc931b?download=true`,
      },
    ],
    links: [],
  },

  /*------ Shahed and Isargar Students ------*/
  {
    slug: "shahed",
    section: "campus-life",
    name: { fa: "اداره امور دانشجویان شاهد و ایثارگر", en: "Shahed and Isargar Student Affairs" },
    lede: {
      fa: "پیگیری امور تحصیلی، فرهنگی و رفاهی دانشجویان شاهد و ایثارگر.",
      en: "Academic, cultural and welfare support for the children of martyrs and veterans.",
    },
    intro: {
      fa: "اداره امور دانشجویان شاهد و ایثارگر دانشگاه در مهر ۱۳۸۸ با هدف ارتقای سطح علمی و فرهنگی دانشجویان شاهد و ایثارگر و ترویج فرهنگ ایثار و شهادت به کار خود را آغاز کرد.",
      en: "The office opened in autumn 2009 to raise the academic and cultural standing of students from martyrs' and veterans' families, and to keep the culture of sacrifice alive.",
    },
    duties: [
      {
        fa: "رسیدگی به همه امور تحصیلی دانشجویان شاهد و ایثارگر، از مشکلات آموزشی تا فرهنگی و رفاهی",
        en: "Handling every academic matter of these students, from teaching to cultural and welfare problems",
      },
      {
        fa: "برنامه‌ریزی برای تقویت بنیه علمی و بهبود وضعیت آموزشی، پژوهشی، فرهنگی و رفاهی آنان",
        en: "Planning to strengthen their studies and their academic, research, cultural and welfare standing",
      },
      {
        fa: "تعیین استاد مشاور برای گروه‌های درسی مختلف",
        en: "Assigning academic advisers across the departments",
      },
      { fa: "برنامه‌ریزی امور فرهنگی دانشجویان شاهد و ایثارگر", en: "Planning cultural activities for these students" },
      {
        fa: "نظارت بر اجرای آیین‌نامه‌های آموزشی مربوط به این دانشجویان در دانشگاه",
        en: "Overseeing the education regulations that apply to them",
      },
      {
        fa: "پیگیری روند تحصیلی دانشجویان و گزارش آن به مراجع مربوط",
        en: "Following each student's progress and reporting it to the bodies concerned",
      },
      {
        fa: "پیگیری مشکلات دانشجویان در شوراهای آموزشی، فرهنگی و دیگر نهادهای دانشگاه",
        en: "Taking their problems to the university's education and cultural councils and other bodies",
      },
      {
        fa: "برنامه‌ریزی برای ترویج فرهنگ ایثار و شهادت و بزرگداشت مقام شهدا و ایثارگران",
        en: "Programmes that honour martyrs and veterans",
      },
      {
        fa: "تنظیم برنامه سالانه و گزارش عملکرد سالانه برای ریاست دانشگاه و وزارت علوم",
        en: "The yearly plan and the yearly report to the president and the Ministry of Science",
      },
    ],
    place: { fa: "ساختمان فرشچیان، طبقه سوم", en: "Farshchian building, third floor" },
    phone: "08138411226",
    feedCategory: "student",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "سید محمد عظیمی", en: "Seyed Mohammad Azimi" },
        jobTitle: { fa: "مدیر امور دانشجویان شاهد و ایثارگر", en: "Head of the office" },
        phone: "08138411226",
        email: "azimismpe@gmail.com",
        photoUrl: `${MAIN}/documents/303995/2311553/%D8%B3%DB%8C%D8%AF-%D9%85%D8%AD%D9%85%D8%AF-%D8%B9%D8%B8%DB%8C%D9%85%DB%8C.jpg/a2f84713-b735-4844-628a-3a0fbe49d2c1?download=true`,
      },
      {
        role: "staff",
        name: { fa: "مصطفی سلیمانی فرخ", en: "Mostafa Soleimani Farokh" },
        jobTitle: { fa: "مسئول دفتر", en: "Office manager" },
        phone: "08138411311",
        photoUrl: `${MAIN}/documents/38165/934305/MOSTAFA.jpg/d9a67c3e-60d1-6c88-1835-3c2a02fc8a50?download=true`,
      },
    ],
    links: [],
  },

  /*------ Incubator ------*/
  {
    slug: "incubator",
    section: "research",
    name: { fa: "مرکز رشد، فناوری و کارآفرینی", en: "Incubator, Technology and Entrepreneurship Centre" },
    lede: {
      fa: "فضای کار، مشاوره و خدمات برای کسب‌وکارهای نوپا و صاحبان ایده، از ایده تا راه‌اندازی.",
      en: "Space, advice and services for start-ups and people with an idea, from the idea to launch.",
    },
    intro: {
      fa: "مراکز رشد برای آماده‌سازی کسب‌وکارهای نوپا و آسان کردن رشد آن‌ها کار می‌کنند. هیچ کسب‌وکار تازه‌ای نمی‌تواند از روز اول همه امکانات و تجهیزات را فراهم کند؛ مرکز رشد برای مدتی مکان و ابزار کار را در اختیار صاحبان ایده می‌گذارد تا برای فعالیت در بازار واقعی آماده شوند.\n\nدر کنار فضای کار اشتراکی، مرکز رشد دسترسی به فناوری‌های تازه، دفتر کار، تسهیلات مالی و مشاوره در بازاریابی، خدمات فنی، مدیریت و منابع انسانی، امور حقوقی و مالی را فراهم می‌کند تا کسب‌وکارها راحت‌تر و سریع‌تر به مرحله راه‌اندازی برسند.\n\nمرکز رشد دانشگاه صنعتی همدان در ۱۳ بهمن ۱۴۰۲ با حضور وزیر علوم، تحقیقات و فناوری و رئیس دانشگاه افتتاح شد. اکنون فضایی به مساحت ۵۰۰ متر مربع در داخل و خارج دانشگاه برای استقرار واحدهای فناور و دفتر مرکز در نظر گرفته شده است.",
      en: "Incubators prepare new businesses and ease their growth. No new venture can have every facility from day one, so the incubator lends founders a place and the tools to work with for a while, until they are ready for the real market.\n\nBeside the shared workspace, it gives access to new technology, offices, funding and advice on marketing, technical services, management and staffing, legal and financial matters, so ventures reach launch sooner and more easily.\n\nThe university's incubator was opened on 2 February 2024 by the Minister of Science, Research and Technology and the university's president. It has 500 square metres on and off campus for its technology units and its office.",
    },
    hours: { fa: "۸ تا ۱۶، روزهای غیرتعطیل", en: "8:00 to 16:00 on working days" },
    phone: "08138411464",
    feedCategory: "growth",
    members: [
      {
        role: "head",
        honorific: "engineer",
        name: { fa: "محمدحسین دوست‌محمدی", en: "Mohammad Hossein Doostmohammadi" },
        jobTitle: { fa: "رئیس مرکز رشد، فناوری و کارآفرینی", en: "Head of the centre" },
        degree: { fa: "مهندسی برق، گرایش الکترونیک", en: "Electrical engineering (electronics)" },
        phone: "08138411464",
        email: "doost.nohammadi@gmail.com",
        resumeUrl: "https://ee.hut.ac.ir/~doost.nohammadi",
        photoUrl: `${MAIN}/documents/234917/0/4-2.jpg/f6625f80-10f8-d9a7-4d27-f83911456293?download=true`,
      },
      {
        role: "staff",
        name: { fa: "محمدامین رنجبران", en: "Mohammad Amin Ranjbaran" },
        jobTitle: { fa: "کارشناس مرکز", en: "Centre officer" },
        phone: "08138411112",
      },
    ],
    links: [],
  },

  /*------ Academic Services ------*/
  {
    slug: "academic-services",
    section: "education",
    name: { fa: "اداره امور خدمات آموزشی", en: "Academic Services Office" },
    lede: {
      fa: "انتخاب واحد، کلاس‌ها، امتحانات و پرونده آموزشی دانشجویان کارشناسی.",
      en: "Registration, classes, exams and the academic records of undergraduate students.",
    },
    email: "edu@hut.ac.ir",
    feedCategory: "education",
    members: [
      {
        role: "staff",
        name: { fa: "خانم حسینی", en: "Ms Hosseini" },
        jobTitle: { fa: "کارشناس مسئول آموزش", en: "Senior academic officer" },
        phone: "08138411320",
        email: "edu@hut.ac.ir",
      },
      {
        role: "staff",
        name: { fa: "حسین خدابخشیان", en: "Hossein Khodabakhshian" },
        jobTitle: { fa: "دبیرخانه آموزش", en: "Academic secretariat" },
        phone: "08138411407",
      },
    ],
    links: [
      GOLESTAN,
      LMS,
      COURSEWARE,
      {
        title: { fa: "آیین‌نامه‌ها، مقررات و شیوه‌نامه‌ها", en: "Regulations and rules" },
        url: `${WEB}/web/edu/آیین-نامه-و-مقررات-و-شیوه-نامه`,
        icon: "regulations",
      },
      {
        title: { fa: "فرایندها و فایل‌های راهنما", en: "Procedures and guides" },
        url: `${WEB}/web/edu/فرآیندها-و-فایل‌های-راهنما`,
        icon: "guide",
      },
      { title: { fa: "تقویم آموزشی", en: "Academic calendar" }, url: "/calendar", icon: "calendar" },
      {
        title: { fa: "گزارش‌ها و پردازش‌های پرکاربرد گلستان", en: "Common Golestan reports" },
        url: `${WEB}/web/edu/گزارش-پرکاربرد`,
        icon: "list",
      },
      {
        title: { fa: "سرفصل رشته‌ها و برنامه هشت‌ترمی", en: "Curricula and eight-term plans" },
        url: `${WEB}/web/edu/سرفصل-رشته-ها`,
        icon: "list",
      },
    ],
  },

  /*------ Graduate Studies ------*/
  {
    slug: "graduate",
    section: "education",
    name: { fa: "اداره تحصیلات تکمیلی", en: "Graduate Studies Office" },
    lede: {
      fa: "پذیرش، انتخاب استاد راهنما، پروپوزال، دفاع و تسویه حساب دانشجویان کارشناسی ارشد و دکتری.",
      en: "Admission, supervisors, proposals, defences and clearance for master's and doctoral students.",
    },
    notes: [
      {
        fa: "درخواست دفاع از پایان‌نامه دست‌کم شش ماه پس از تصویب پروپوزال در شورای تحصیلات تکمیلی پذیرفته می‌شود. تاریخ تصویب در اطلاعات جامع دانشجو در گلستان آمده است.",
        en: "A defence can be requested at least six months after the graduate council approves the proposal. The approval date is in your full record in Golestan.",
      },
      {
        fa: "متن پایان‌نامه باید دست‌کم یک ماه پیش از دفاع آماده باشد و درخواست دفاع، همراه با نتیجه همانندجویی متن کامل، در گلستان ثبت شده باشد.",
        en: "The thesis must be ready at least a month before the defence, with the defence request and the full text's plagiarism report filed in Golestan.",
      },
      {
        fa: "یک هفته پس از پایان حذف و اضافه، انتخاب واحد خود را دوباره بررسی کنید تا از تغییرات احتمالی درس‌ها باخبر شوید.",
        en: "A week after add and drop ends, check your registration again for any changes to your courses.",
      },
      {
        fa: "بدون ارزشیابی استادان، کارت ورود به جلسه امتحان صادر نمی‌شود.",
        en: "Without the teaching evaluation, no exam entry card is issued.",
      },
    ],
    hours: {
      fa: "پاسخ به ایمیل و تماس تلفنی فقط در ساعت اداری.",
      en: "Emails and calls are answered in office hours only.",
    },
    email: "postgraduate@hut.ac.ir",
    feedCategory: "graduate",
    members: [
      {
        role: "staff",
        name: { fa: "مریم معین", en: "Maryam Moein" },
        jobTitle: { fa: "کارشناس مسئول تحصیلات تکمیلی", en: "Graduate studies officer" },
        phone: "08138411318",
        email: "postgraduate@hut.ac.ir",
      },
    ],
    links: [
      {
        title: { fa: "سامانه ملی ثبت پایان‌نامه", en: "National thesis registry" },
        description: {
          fa: "ثبت پروپوزال و پایان‌نامه در ایرانداک",
          en: "Register your proposal and thesis with IranDoc",
        },
        url: "https://sabt.irandoc.ac.ir/",
        icon: "thesis",
      },
      GOLESTAN,
      {
        title: { fa: "سامانه همانندجو", en: "Plagiarism check" },
        description: { fa: "همانندجویی متن پایان‌نامه پیش از دفاع", en: "Check your thesis text before the defence" },
        url: "https://tik.irandoc.ac.ir/User/Login",
        icon: "plagiarism",
      },
    ],
  },

  /*------ Admissions and Alumni ------*/
  {
    slug: "alumni-affairs",
    section: "education",
    name: { fa: "اداره پذیرش و دانش‌آموختگان", en: "Admissions and Alumni Office" },
    lede: {
      fa: "ثبت‌نام و پرونده دانشجویان تازه‌وارد، تسویه حساب، و صدور دانشنامه و ریزنمرات.",
      en: "Enrolment and records for new students, clearance, and degree certificates and transcripts.",
    },
    intro: {
      fa: "ثبت‌نام و تشکیل پرونده در آغاز ورود به دانشگاه، تکمیل پرونده تحصیلی، تسویه حساب دانش‌آموختگان، معرفی دانش‌آموختگان مشمول به نظام وظیفه، صدور مدارک دانش‌آموختگی (دانشنامه، گواهی موقت، ریزنمرات فارسی و انگلیسی و گواهی رتبه)، تعیین دانش‌آموختگان ممتاز و صدور تأییدیه تحصیلی به درخواست مراجع مختلف بر عهده این اداره است.",
      en: "This office enrols new students and opens their records, keeps those records complete, clears graduates, refers graduates due for military service, issues graduation documents (degree certificate, provisional certificate, transcripts in Persian and English, and rank certificates), names the top graduates, and confirms degrees at the request of other bodies.",
    },
    email: "egrad@hut.ac.ir",
    feedCategory: "education",
    members: [
      {
        role: "staff",
        name: { fa: "علیرضا سراقی", en: "Alireza Saraghi" },
        jobTitle: { fa: "کارشناس مسئول امور دانش‌آموختگان", en: "Senior alumni officer" },
        phone: "08138411424",
        email: "egrad@hut.ac.ir",
        photoUrl: `${WEB}/documents/228119/0/%D8%B9%D9%84%DB%8C%D8%B1%D8%B6%D8%A7+%D8%B3%D8%B1%D8%A7%D9%82%DB%8C.jpg/99083387-3f66-fe02-a105-d7d2daa616df?download=true`,
      },
      {
        role: "staff",
        name: { fa: "حسین خدابخشیان", en: "Hossein Khodabakhshian" },
        jobTitle: { fa: "کارشناس دبیرخانه و بایگانی دانش‌آموختگان", en: "Alumni records officer" },
        phone: "08138411425",
      },
    ],
    links: [
      {
        title: { fa: "سامانه سجاد", en: "Sajad" },
        description: { fa: "تأیید مدرک و خدمات وزارت علوم", en: "Degree verification and Ministry services" },
        url: "https://portal.saorg.ir/",
        icon: "certificate",
      },
      GOLESTAN,
      {
        title: { fa: "سازمان سنجش آموزش کشور", en: "National Organization of Educational Testing" },
        url: "https://www.sanjesh.org/",
        icon: "website",
      },
      {
        title: { fa: "آیین‌نامه‌ها و دستورالعمل‌ها", en: "Regulations and instructions" },
        url: `${WEB}/web/edu/آیین-نامه-دانش-آموختگان`,
        icon: "regulations",
      },
      { title: { fa: "فایل‌های راهنما", en: "Guides" }, url: `${WEB}/web/edu/فایل-های-راهنما`, icon: "guide" },
      { title: { fa: "دانلود فرم‌ها", en: "Forms" }, url: `${MAIN}/web/edu/دانلود-فرم`, icon: "list" },
    ],
  },

  /*------ Sports ------*/
  {
    slug: "sports",
    section: "campus-life",
    name: { fa: "اداره تربیت بدنی", en: "Physical Education Office" },
    lede: {
      fa: "کلاس‌های ورزشی، سالن تندرستی و مسابقات ورزشی برای دانشجویان، کارکنان و استادان.",
      en: "Sports classes, the fitness hall and competitions for students, staff and faculty.",
    },
    intro: {
      fa: "ورزش بر سلامت و شادابی اثر روشنی دارد و جامعه‌ای که نیروی انسانی سالم و شادابی داشته باشد، سریع‌تر به سوی توسعه گام برمی‌دارد. اداره تربیت بدنی دانشگاه، در چارچوب برنامه‌های تربیت بدنی و ورزش دانشگاه‌ها، فعالیت‌های ورزشی و فوق‌برنامه را برای دانشجویان، کارکنان و اعضای هیئت علمی فراهم می‌کند تا به رشد معنوی، جسمی، عاطفی، عقلانی و اجتماعی آنان کمک کند.\n\nامیدواریم با همراهی جامعه دانشگاهی، در بهبود کیفیت تحصیلی دانشجویان، که هدف اصلی دانشگاه است، گام‌های مؤثری برداریم.",
      en: "Sport has a clear effect on health and well-being, and a community of healthy, lively people moves faster toward real progress. Within the national programme for university sport, the office runs sports and extracurricular activities for students, staff and faculty, to help them grow in spirit, body, mind and as members of a community.\n\nWith the whole university's help, we hope to take real steps toward the university's main aim: the quality of its students' studies.",
    },
    place: { fa: "سالن تندرستی، ساختمان فرشچیان", en: "Fitness hall, Farshchian building" },
    phone: "08138411551",
    feedCategory: "student",
    members: [
      {
        role: "head",
        name: { fa: "محمد بخشنده", en: "Mohammad Bakhshandeh" },
        jobTitle: { fa: "رئیس اداره تربیت بدنی", en: "Head of physical education" },
        phone: "08138411551",
      },
      {
        role: "staff",
        name: { fa: "علی‌اکبر ناصری", en: "Ali Akbar Naseri" },
        jobTitle: { fa: "کارشناس تربیت بدنی", en: "Physical education officer" },
        phone: "08138411551",
        photoUrl: `${WEB}/documents/227555/0/%D9%86%D8%A7%D8%B5%D8%B1%DB%8C2.jpg/a2b2de05-5ab1-2747-ac32-a34d4243aea1?download=true`,
      },
    ],
    links: [],
  },

  /*------ Online Learning ------*/
  {
    slug: "online-learning",
    section: "education",
    name: { fa: "آموزش مجازی", en: "Online Learning" },
    lede: {
      fa: "درس‌افزار برای درس‌های آفلاین و سامانه کلاس‌های آنلاین، با راهنمای استفاده برای دانشجویان و استادان.",
      en: "Courseware for offline courses and the online classroom, with guides for students and teachers.",
    },
    feedCategory: "education",
    members: [],
    links: [
      {
        ...COURSEWARE,
        description: {
          fa: "آموزش مجازی آفلاین: جزوه، تمرین و آزمون",
          en: "Offline learning: notes, assignments, quizzes",
        },
      },
      { ...LMS, description: { fa: "آموزش مجازی آنلاین: کلاس‌های زنده", en: "Online learning: live classes" } },
      {
        title: { fa: "راهنمای سامانه آموزش مجازی آنلاین", en: "Guide to the online classroom" },
        url: `${MAIN}/fa/web/hut/-/-9-11`,
        icon: "guide",
      },
      {
        title: { fa: "کلاس‌های مجازی، ویژه استادان", en: "Virtual classes, for teachers" },
        url: `${MAIN}/fa/web/hut/-/-9-10`,
        icon: "guide",
      },
      {
        title: { fa: "پرسش و پاسخ سامانه آنلاین", en: "Online classroom FAQ" },
        url: `${MAIN}/fa/web/hut/-/-194`,
        icon: "guide",
      },
    ],
  },

  /*------ Continuing Education ------*/
  {
    slug: "continuing-education",
    section: "education",
    name: { fa: "مرکز آموزش‌های آزاد و مجازی", en: "Continuing Education Centre" },
    lede: {
      fa: "دوره‌های کوتاه‌مدت، کارگاه‌ها و آموزش‌های سازمانی برای دانشجویان، متخصصان و صنعت.",
      en: "Short courses, workshops and corporate training for students, professionals and industry.",
    },
    feedCategory: "openEducation",
    members: [],
    links: [
      {
        title: { fa: "سامانه آموزش آزاد و مجازی", en: "Continuing education portal" },
        description: { fa: "فهرست دوره‌ها و ثبت‌نام", en: "Courses and registration" },
        url: "https://academics.hut.ac.ir/",
        icon: "system",
      },
    ],
  },
];

import type { LibrarySeed } from "#/db/pages/library";
import type { OfficeSeed } from "#/db/pages/offices";

/*===== Research Units =====*/
// The research affairs' units, from their own sites on 2026-10-29: press.hut.ac.ir, library.hut.ac.ir (its FAQ from
// /پرسش-های-متداول), industry.hut.ac.ir and lab.hut.ac.ir (each machine's model and maker from its own page). Persian
// is the old pages' text, tidied; ledes and English are written here (a book's English title is a gloss). The books'
// credits and the machines' specs stay Persian on /en.

export const researchOffices: OfficeSeed[] = [
  /*------ Press ------*/
  {
    slug: "press",
    section: "research",
    name: { fa: "اداره انتشارات", en: "University Press" },
    lede: {
      fa: "کتاب‌های تألیفی و ترجمه دانشگاه در فنی‌مهندسی، علوم پایه و مدیریت، و راه چاپ کتاب در مرکز نشر.",
      en: "The university's books, written and translated, in engineering, the sciences and management, and how to publish one with it.",
    },
    intro: {
      fa: "نشر کتاب از نشانه‌های توسعه یک مجموعه دانشگاهی است. مرکز نشر دانشگاه صنعتی همدان با پیشینه‌ای حدود ده‌ساله در انتشار کتاب‌های فنی‌مهندسی، علوم پایه و مدیریت صنایع، با چاپ بیش از ۵۰ عنوان کتاب تألیفی و ترجمه، در ارتقای جامعه علمی کشور سهم دارد.\n\nکتاب‌های پذیرفته‌شده پس از بررسی در شورای چاپ و نشر دانشگاه برای داوری فرستاده می‌شوند. داوران از میان استادان صاحب‌نظر دانشگاه‌های کشور در موضوع هر کتاب انتخاب می‌شوند و اگر نتیجه داوری ارزش علمی، آموزشی و پژوهشی کتاب را تأیید کند، کتاب با نشان دانشگاه صنعتی همدان چاپ می‌شود.",
      en: "Publishing books is one of the marks of a growing university. The press has published engineering, science and industrial management books for about ten years, more than 50 titles written or translated by the university's people.\n\nA proposed book is first reviewed by the university's publishing council and then sent to referees: professors from universities across Iran who know its subject. If they confirm its scientific, teaching and research value, the book is printed under the university's name.",
    },
    phone: "08138411546",
    email: "entesharat.hut2025@gmail.com",
    members: [
      {
        role: "head",
        name: { fa: "آرزو انصاری دلشاد", en: "Arezoo Ansari Delshad" },
        jobTitle: {
          fa: "رئیس اداره انتشارات و دبیر شورای انتشارات",
          en: "Head of the press and secretary of its council",
        },
        phone: "08138411546",
        email: "entesharat.hut2025@gmail.com",
        photoUrl:
          "https://press.hut.ac.ir/documents/79149/0/%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C+%283%29.jpg/966d6a5f-79ee-6c9c-aadd-13a263d2afad?download=true",
      },
    ],
    links: [],
    lists: [
      {
        title: { fa: "کتاب‌های دانشگاه", en: "Our books" },
        items: [
          {
            title: {
              fa: "کربوکاتیون‌ها و کاربرد کاتالیزگری آنها در واکنش‌های آلی",
              en: "Carbocations and their catalytic use in organic reactions",
            },
            text: { fa: "ترجمه سید احمدرضا موسوی زارع، ۱۴۰۳" },
            url: "https://press.hut.ac.ir/carbocationha",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m1.jpg/72c43fb7-4bff-2447-6bb2-87ffe6cc7e21?download=true",
          },
          {
            title: { fa: "فازهای مکس (MAX) خواص نیتریدها و کاربیدهای سه‌تایی قابل ماشین‌کاری", en: "MAX phases" },
            text: { fa: "ترجمه اکبر حیدرپور، امیر الحاجی، امیر حسین حقیقی رفیگر، ۱۳۹۹" },
            url: "https://press.hut.ac.ir/fazmax",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m2.jpg/aa13d1ca-3092-be6c-9933-f6dada605ab4?download=true",
          },
          {
            title: { fa: "کاربرد اسپن پلاس در آموزش ترمودینامیک", en: "Teaching thermodynamics with Aspen Plus" },
            text: { fa: "ترجمه ابوالفضل شجاعیان، ۱۳۹۷" },
            url: "https://press.hut.ac.ir/aspenplus",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m3.jpg/20ab5a2c-a83d-451b-8831-69ba724ac300?download=true",
          },
          {
            title: { fa: "کنترل غیر خطی مرتبه کسری کاربردی", en: "Applied fractional-order nonlinear control" },
            text: { fa: "تألیف هادی دلاوری، حمید حیدری‌نژاد، ۱۳۹۸" },
            url: "https://press.hut.ac.ir/kasri",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m4.jpg/ecc88688-f779-d821-2a62-a6fbf293da24?download=true",
          },
          {
            title: { fa: "مروری بر روش استخراج تخریب بزرگ", en: "A review of block caving" },
            text: { fa: "ترجمه مصطفی اسدی زاده، بهنام علی پنهانی، ۱۳۹۸" },
            url: "https://press.hut.ac.ir/takhrib",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m5.jpg/da8bb4fc-93ab-c48b-285d-efbd422889bc?download=true",
          },
          {
            title: { fa: "تحلیل مدارهای الکتریکی۲", en: "Electric circuit analysis 2" },
            text: { fa: "ترجمه محمدحسین دوست محمدی، حمید جنتی، ۱۳۹۹" },
            url: "https://press.hut.ac.ir/Tahlil2",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m6.jpg/0f1e10b5-9e0c-42b4-d0e6-9f430068c629?download=true",
          },
          {
            title: { fa: "تحلیل مدارهای الکتریکی جلد اول", en: "Electric circuit analysis 1" },
            text: { fa: "ترجمه محمدحسین دوست محمدی، حمید جنتی، ۱۳۹۹" },
            url: "https://press.hut.ac.ir/Tahlil1",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m7.jpg/750af3a3-ad68-50e5-b456-d6f7e5a67edd?download=true",
          },
          {
            title: { fa: "بیوالکتریسیته با رویکرد کمی", en: "Bioelectricity: a quantitative approach" },
            text: { fa: "ترجمه سمیرا عباسی، کیان اسماعیلیان، شیرکو رسولی، ۱۳۹۹" },
            url: "https://press.hut.ac.ir/bioelecricity",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m8.jpg/5f7f2a61-8fb9-924f-955d-370d232d4373?download=true",
          },
          {
            title: {
              fa: "مکانیک سیالات کاربردی برای مهندسان شیمی جلد اول",
              en: "Applied fluid mechanics for chemical engineers, vol. 1",
            },
            text: { fa: "تألیف علیرضا بهرامیان، ۱۴۰۲" },
            url: "https://press.hut.ac.ir/MS-j1",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m9.jpg/8e3409bc-47b3-337d-6548-b289a769728d?download=true",
          },
          {
            title: { fa: "ساخت افزایشی آلیاژهای تیتانیوم", en: "Additive manufacturing of titanium alloys" },
            text: { fa: "ترجمه امید بیات، مرتضی هادی، ۱۴۰۱" },
            url: "https://press.hut.ac.ir/Titanium",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m10.jpg/021a4dbe-5d4f-06d2-ff9b-e1c2542c7207?download=true",
          },
          {
            title: { fa: "طراحی سیستم‌های دیجیتال", en: "Digital systems design" },
            text: { fa: "ترجمه محسن احمدوند، ۱۴۰۲" },
            url: "https://press.hut.ac.ir/tarahi-s-d",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m11.jpg/9c7ae606-1cfd-d5c5-a25d-018932508c68?download=true",
          },
          {
            title: {
              fa: "مکانیک سیالات کاربردی برای مهندسان شیمی جلد دوم",
              en: "Applied fluid mechanics for chemical engineers, vol. 2",
            },
            text: { fa: "تألیف علیرضا بهرامیان، ۱۴۰۲" },
            url: "https://press.hut.ac.ir/MS-j2",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m12.jpg/db7d08a1-e714-baab-31ca-dfb6d1a2fb28?download=true",
          },
          {
            title: { fa: "شاتکریت پاشی در استرالیا", en: "Shotcreting in Australia" },
            text: { fa: "ترجمه وهاب سرفرازی، کاوه عسگره، صدیقه کردشولی" },
            url: "https://press.hut.ac.ir/shatcreit",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m13.jpg/9855071c-995f-340b-ae78-c2c2f003f53f?download=true",
          },
          {
            title: { fa: "کنترل غیر خطی مبتنی بر داده کاربردی", en: "Applied data-driven nonlinear control" },
            text: { fa: "ترجمه هادی دلاوری، امیر ویسی، ۱۴۰۴" },
            url: "https://press.hut.ac.ir/Control-gh",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m14.jpg/f9de44db-cda6-6265-7ebe-6a38afcbc31f?download=true",
          },
          {
            title: {
              fa: "مقایسه و ارزیابی نتایج نرم افزار کامسول (COMSOL) با نتایج تحلیلی و آزمایشگاهی",
              en: "COMSOL results against analytical and lab results",
            },
            text: { fa: "تألیف جابر یوسفی سیف، حمیدرضا شمس زرندی، ۱۳۹۹" },
            url: "https://press.hut.ac.ir/moghayese",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m15.jpg/43a4d6d2-f449-a644-f2a8-dcd5a2f2a806?download=true",
          },
          {
            title: { fa: "بازیابی و بازسازی برجای فلزات", en: "In-situ recovery of metals" },
            text: { fa: "ترجمه وهاب سرفرازی، کاوه عسگره، صدیقه کردشولی" },
            url: "https://press.hut.ac.ir/bazyabi",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m1+%283%29.jpg/351e30c7-182b-e5cf-58d8-48ccf60838a7?download=true",
          },
          {
            title: { fa: "ریاضیات عمومی ۲ برای رشته های مهندسی", en: "Engineering mathematics 2" },
            text: { fa: "ترجمه وانیا خداکرمی، ۱۴۰۴" },
            url: "https://press.hut.ac.ir/Riyaziat",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m2+%283%29.jpg/129800ff-448b-0bf8-afec-a2935b6da30d?download=true",
          },
          {
            title: { fa: "مبانی علوم و مهندسی پلیمر", en: "Fundamentals of polymer science and engineering" },
            text: { fa: "ترجمه محمد باقر سبحانی متین، ۱۴۰۴" },
            url: "https://press.hut.ac.ir/Mabani-olom",
            imageUrl:
              "https://press.hut.ac.ir/documents/79149/0/m3%281%29.jpg/c230d164-f8df-e001-f32f-5cb61c255cda?download=true",
          },
        ],
      },
      {
        title: { fa: "شورای انتشارات", en: "Publishing council" },
        items: [
          { title: { fa: "دکتر مهدی پورعبدلی", en: "Dr Mehdi Pourabdoli" }, text: { fa: "رئیس شورا", en: "Chair" } },
          {
            title: { fa: "دکتر حمیدرضا شاه‌دوستی", en: "Dr Hamidreza Shahdoosti" },
            text: { fa: "عضو شورا", en: "Member" },
          },
          { title: { fa: "دکتر پیام ورشوی", en: "Dr Payam Varshovi" }, text: { fa: "عضو شورا", en: "Member" } },
          { title: { fa: "دکتر هادی دلاوری", en: "Dr Hadi Delavari" }, text: { fa: "عضو شورا", en: "Member" } },
          { title: { fa: "دکتر مزدک ایزدی", en: "Dr Mazdak Izadi" }, text: { fa: "عضو شورا", en: "Member" } },
          { title: { fa: "دکتر مژگان نجفی", en: "Dr Mojgan Najafi" }, text: { fa: "عضو شورا", en: "Member" } },
          {
            title: { fa: "دکتر معصومه آشوری‌راد", en: "Dr Masoumeh Ashourirad" },
            text: { fa: "عضو شورا", en: "Member" },
          },
          {
            title: { fa: "آرزو انصاری دلشاد", en: "Arezoo Ansari Delshad" },
            text: { fa: "دبیر شورا", en: "Secretary" },
          },
        ],
      },
    ],
  },

  /*------ Central Library ------*/
  {
    slug: "library",
    section: "research",
    name: { fa: "کتابخانه مرکزی", en: "Central Library" },
    lede: {
      fa: "امانت، رزرو و تمدید کتاب، سالن مطالعه، پایگاه‌های علمی و راهنمای جست‌وجو و نگارش پایان‌نامه.",
      en: "Borrowing, reserving and renewing books, the reading room, research databases, and guides to searching and writing a thesis.",
    },
    intro: {
      fa: "کتابخانه مرکزی دانشگاه صنعتی همدان هم‌زمان با تأسیس دانشگاه در سال ۱۳۸۵ برای گردآوری منابع علمی و آموزشی و رساندن اطلاعات مورد نیاز دانشجویان و استادان، در خدمت برنامه‌های آموزشی و پژوهشی دانشگاه، راه‌اندازی شد. کتابخانه در طبقه همکف ساختمان دانشگاه است.\n\nکتابخانه با نرم‌افزار سیمرغ کار می‌کند: اعضا می‌توانند منابع را از رایانه‌های کتابخانه یا از راه اینترنت جست‌وجو، رزرو و تمدید کنند.",
      en: "The central library opened with the university in 2006, to gather books and teaching material and bring students and faculty the information their teaching and research need. It is on the ground floor of the university building.\n\nThe library runs on the Simorgh system: members can search, reserve and renew from the library's computers or online.",
    },
    place: { fa: "طبقه همکف ساختمان دانشگاه", en: "Ground floor, university building" },
    phone: "08138411103",
    email: "library@hut.ac.ir",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "سعید دانشیار", en: "Saeed Daneshyar" },
        jobTitle: {
          fa: "رئیس کتابخانه و مرکز اطلاع‌رسانی و اسناد",
          en: "Head of the library and documentation centre",
        },
        rank: "associate",
        degree: { fa: "دکتری فیزیولوژی بالینی و ورزشی", en: "PhD in clinical and exercise physiology" },
        phone: "08138411103",
        email: "s.daneshyar@hut.ac.ir",
        photoUrl:
          "https://library.hut.ac.ir/documents/79181/0/%D9%BE%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84+-+Copy+%281%29%281%29.jpg/0fd59224-ccdd-957c-3443-ac8594d2de55?download=true",
      },
      {
        role: "staff",
        name: { fa: "نیره جهانگیر وظیفه", en: "Nayyereh Jahangir Vazifeh" },
        jobTitle: { fa: "کارشناس بخش سازماندهی منابع", en: "Cataloguing officer" },
        degree: { fa: "کارشناسی ارشد کتابداری و اطلاع‌رسانی", en: "MSc in library and information science" },
        phone: "08138411104",
        photoUrl:
          "https://library.hut.ac.ir/documents/79181/0/%D8%B9%DA%A9%D8%B3.jpg/b50f35f9-49ee-7f89-6645-c6e21350ca62?download=true",
      },
      {
        role: "staff",
        name: { fa: "مریم رحیمیون", en: "Maryam Rahimiyoun" },
        jobTitle: { fa: "کارشناس بخش امانت", en: "Circulation officer" },
        degree: { fa: "کارشناسی ریاضی", en: "BSc in mathematics" },
        phone: "08138411104",
      },
    ],
    links: [
      {
        title: { fa: "جست‌وجوی منابع", en: "Search the catalogue" },
        description: { fa: "جست‌وجو، رزرو و تمدید در سیمرغ", en: "Search, reserve and renew in Simorgh" },
        url: "http://simorgh.hut.ac.ir/simwebclt/WebAccess/SimwebPortal.dll",
        icon: "system",
      },
      {
        title: { fa: "کتابخانه دیجیتال", en: "Digital library" },
        description: { fa: "متن کامل پایان‌نامه‌ها و کتاب‌ها", en: "Full-text theses and books" },
        url: "http://elibrary.hut.ac.ir/diglibguest/WebUI/Index.aspx",
        icon: "website",
      },
      {
        title: { fa: "سامانه پیشینه پژوهش", en: "Research background (IranDoc)" },
        url: "https://pishineh.irandoc.ac.ir/",
        icon: "thesis",
      },
      {
        title: { fa: "سامانه همانندجو", en: "Plagiarism check" },
        url: "https://tik.irandoc.ac.ir/User/Login",
        icon: "plagiarism",
      },
      {
        title: { fa: "سامانه ملی ثبت پایان‌نامه", en: "National thesis registry" },
        url: "https://sabt.irandoc.ac.ir/",
        icon: "thesis",
      },
      {
        title: { fa: "قوانین و مقررات کتابخانه", en: "Library rules" },
        url: "https://library.hut.ac.ir/%D8%A7%D9%85%D8%A7%D9%86%D8%AA%D8%8C-%D8%B1%D8%B2%D8%B1%D9%88-%D9%88-%D8%AA%D9%85%D8%AF%DB%8C%D8%AF",
        icon: "regulations",
      },
    ],
    schedules: [
      {
        title: { fa: "نیمه نخست سال", en: "First half of the year" },
        columns: [
          { fa: "شنبه تا چهارشنبه", en: "Saturday to Wednesday" },
          { fa: "پنجشنبه", en: "Thursday" },
          { fa: "جمعه", en: "Friday" },
        ],
        rows: [
          {
            label: { fa: "امانت", en: "Loans desk" },
            cells: [
              { fa: "۸ تا ۱۲:۳۰ و ۱۴ تا ۱۶", en: "8:00–12:30 and 14:00–16:00" },
              { fa: "تعطیل", en: "Closed" },
              { fa: "تعطیل", en: "Closed" },
            ],
          },
          {
            label: { fa: "سالن مطالعه", en: "Reading room" },
            cells: [
              { fa: "۸ تا ۲۰", en: "8:00–20:00" },
              { fa: "۸ تا ۱۸", en: "8:00–18:00" },
              { fa: "تعطیل", en: "Closed" },
            ],
          },
        ],
      },
      {
        title: { fa: "نیمه دوم سال", en: "Second half of the year" },
        columns: [
          { fa: "شنبه تا چهارشنبه", en: "Saturday to Wednesday" },
          { fa: "پنجشنبه", en: "Thursday" },
          { fa: "جمعه", en: "Friday" },
        ],
        rows: [
          {
            label: { fa: "امانت", en: "Loans desk" },
            cells: [
              { fa: "۸ تا ۱۲ و ۱۳:۳۰ تا ۱۶", en: "8:00–12:00 and 13:30–16:00" },
              { fa: "تعطیل", en: "Closed" },
              { fa: "تعطیل", en: "Closed" },
            ],
          },
          {
            label: { fa: "سالن مطالعه", en: "Reading room" },
            cells: [
              { fa: "۸ تا ۲۰", en: "8:00–20:00" },
              { fa: "۸ تا ۱۸", en: "8:00–18:00" },
              { fa: "تعطیل", en: "Closed" },
            ],
          },
        ],
      },
    ],
    faq: [
      {
        question: {
          fa: "چند کتاب و تا چه مدت می‌توانم امانت بگیرم؟",
          en: "How many books can I borrow, and for how long?",
        },
        answer: {
          fa: "دانشجوی کارشناسی ۳ کتاب برای دو هفته و دانشجوی کارشناسی ارشد ۵ کتاب برای سه هفته. کارکنان ۳ کتاب برای یک ماه و اعضای هیئت علمی ۵ کتاب برای دو ماه امانت می‌گیرند. ۲ نسخه هم برای مطالعه در کتابخانه در اختیار هر عضو است.",
          en: "Undergraduates 3 books for two weeks, master's students 5 books for three weeks, staff 3 books for a month and faculty 5 books for two months. Every member can also take 2 books to read in the library.",
        },
      },
      {
        question: { fa: "کتاب را چطور تمدید کنم؟", en: "How do I renew a book?" },
        answer: {
          fa: "اگر کتاب دیر نشده و کسی آن را رزرو نکرده باشد، می‌توانید آن را دو هفته دیگر تمدید کنید: در «جست‌وجوی منابع» به سرویس‌های امانت بروید، با شماره دانشجویی و گذرواژه وارد شوید و کتاب را تمدید کنید. هر کتاب حداکثر دو بار تمدید می‌شود؛ پس از آن به بخش امانت بروید.",
          en: "If it isn't late and nobody has reserved it, you can renew it for two more weeks: open the loan services in the catalogue search, sign in with your student number and password, and renew it. A book can be renewed twice; after that, come to the loans desk.",
        },
      },
      {
        question: { fa: "جریمه دیرکرد چقدر است؟", en: "What is the late fee?" },
        answer: {
          fa: "برای کتاب امانی روزی ۲۰۰۰ ریال و برای کتاب «مطالعه در محل» ساعتی ۱۰۰۰ ریال. تا کتاب را برنگردانید، پرونده امانت شما بسته می‌ماند. با بدهی مالی تا ۱۰٬۰۰۰ ریال، اگر کتابی پیش شما نباشد، باز هم می‌توانید امانت بگیرید. جریمه فقط از راه بانک پرداخت می‌شود، نه نقدی.",
          en: "2,000 rials a day for a borrowed book, and 1,000 rials an hour for a book lent to read in the library. Until you return the book, your account stays closed. With up to 10,000 rials owed and no book out, you can still borrow. Fees are paid through the bank only, never in cash.",
        },
      },
      {
        question: {
          fa: "از بیرون دانشگاه هم می‌توانم از خدمات کتابخانه استفاده کنم؟",
          en: "Can I use the library from outside the university?",
        },
        answer: {
          fa: "بله. جست‌وجو، رزرو و تمدید از راه وب‌سایت کتابخانه انجام می‌شود. گذرواژه را از بخش امانت بگیرید؛ اگر آن را فراموش کرده‌اید هم به همان بخش بروید.",
          en: "Yes. You can search, reserve and renew on the library's website. Get your password from the loans desk, and go there too if you have forgotten it.",
        },
      },
      {
        question: { fa: "صندوق بازگشت کتاب چیست؟", en: "What is the return box?" },
        answer: {
          fa: "صندوقی در کتابخانه که وقتی بخش امانت بسته است، کتاب‌ها را در آن می‌اندازید. کتابدار صندوق را در آغاز هر روز کاری باز می‌کند.",
          en: "A box in the library for returning books when the loans desk is closed. The librarian empties it at the start of each working day.",
        },
      },
      {
        question: { fa: "چه منابعی امانت داده نمی‌شوند؟", en: "What can't be borrowed?" },
        answer: {
          fa: "پایان‌نامه‌ها و کتاب‌های مرجع. کتاب‌های مرجع فارسی با حرف «م» و لاتین با حرف R پیش از رده مشخص شده‌اند.",
          en: "Theses and reference books. Reference books are marked م (Persian) or R (other languages) before their class number.",
        },
      },
      {
        question: {
          fa: "اگر کتاب امانی گم شود یا آسیب ببیند چه کنم؟",
          en: "What if I lose or damage a borrowed book?",
        },
        answer: {
          fa: "زود به بخش امانت خبر دهید. از آن روز یک ماه فرصت دارید همان کتاب را تهیه و تحویل دهید؛ پس از آن، افزون بر تهیه کتاب، جریمه نقدی هم دارد. اگر کتاب نایاب است، برای راهنمایی به بخش امانت بروید. تا کتاب برنگردد، تسویه حساب کتابخانه انجام نمی‌شود.",
          en: "Tell the loans desk straight away. From then you have a month to buy the same book and hand it in; after that there is a fine as well. If the book is out of print, ask the loans desk what to do. The library won't clear you until the book is replaced.",
        },
      },
    ],
  },

  /*------ Industry Liaison ------*/
  {
    slug: "industry",
    section: "research",
    name: { fa: "گروه تحقیقات کاربردی و ارتباط با صنعت", en: "Industry Liaison and Applied Research" },
    lede: {
      fa: "پل دانشگاه با صنایع و سازمان‌ها: طرح‌های صنعتی، تفاهم‌نامه‌ها، کارآموزی و فرصت مطالعاتی در صنعت.",
      en: "The university's bridge to industry: industrial projects, agreements, internships and faculty sabbaticals in industry.",
    },
    intro: {
      fa: "با همکاری مؤثر دانشگاه و صنعت، دانشگاه‌ها و پژوهشگران می‌توانند به حل مشکلات پژوهشی و صنعتی کشور کمک کنند. این واحد پل ارتباطی دانشگاه با سازمان‌ها، صنایع و معادن کشور در پژوهش و فناوری است.\n\nرسالت دیگر این واحد، تقویت روحیه کارآفرینی در دانشجویان، استادان و دانش‌آموختگان، افزایش دانش کسب‌وکار، و بهره‌گیری از توانمندی‌های جامعه دانشگاه برای ایجاد و توسعه کسب‌وکار، به‌ویژه کسب‌وکار دانش‌بنیان است.",
      en: "When the university and industry work together well, researchers can help solve the country's research and industrial problems. This office is the university's bridge to organisations, industry and mining in research and technology.\n\nIt also builds an entrepreneurial spirit in students, faculty and graduates, teaches business, and puts the university's skills to work in new businesses, above all knowledge-based ones.",
    },
    duties: [
      {
        fa: "برنامه‌ریزی برای توسعه پژوهش‌های کاربردی و فناوری متناسب با اولویت‌های تحقیقاتی کشور",
        en: "Planning applied research and technology to match the country's research priorities",
      },
      {
        fa: "نیازسنجی صنایع و سازمان‌های بیرون از دانشگاه",
        en: "Finding out what industry and outside organisations need",
      },
      {
        fa: "فرهنگ‌سازی و ایجاد بستر برای ارجاع پروژه‌های صنعتی به دانشگاه",
        en: "Making it usual and easy for industry to bring its projects to the university",
      },
      {
        fa: "افزایش تعامل اعضای هیئت علمی و دانشجویان با مراکز صنعتی",
        en: "Bringing faculty and students closer to industry",
      },
      {
        fa: "حمایت از ابتکارات و اختراعات و ارتباط با بنیاد ملی نخبگان، صندوق حمایت از پژوهشگران و نهادهای حامی",
        en: "Supporting inventions and linking them to the National Elites Foundation, the researchers' support fund and other backers",
      },
      {
        fa: "گسترش ارتباطات ملی و بین‌المللی دانشگاه با صنایع",
        en: "Widening the university's national and international ties with industry",
      },
      {
        fa: "شناسایی مراکز صنعتی و ارتباط مستمر با آن‌ها برای اعزام کارآموزان",
        en: "Finding industrial sites and keeping in touch with them to place interns",
      },
      {
        fa: "دعوت از مسئولان و متخصصان صنایع برای بازدید از دانشگاه، و هماهنگی بازدید دانشگاه از صنایع",
        en: "Inviting industry managers and experts to the university, and arranging visits the other way",
      },
      {
        fa: "انعقاد تفاهم‌نامه‌های همکاری علمی، پژوهشی و فناوری با صنایع و سازمان‌ها",
        en: "Signing research and technology agreements with industry and organisations",
      },
      {
        fa: "برگزاری کارگاه‌های آموزشی کارآفرینی برای دانشجویان و دانش‌آموختگان",
        en: "Running entrepreneurship workshops for students and graduates",
      },
      {
        fa: "حمایت از ایده‌ها و طرح‌های خلاقانه دانشجویان در کانون شکوفایی خلاقیت و نوآوری",
        en: "Backing students' new ideas in the creativity and innovation hub",
      },
    ],
    place: { fa: "ساختمان فرشچیان، طبقه پنجم", en: "Farshchian building, fifth floor" },
    phone: "08138411517",
    fax: "08138380520",
    email: "IRIE@hut.ac.ir",
    feedCategory: "industry",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "محمدباقر سبحانی متین", en: "Mohammad Bagher Sobhani Matin" },
        jobTitle: {
          fa: "رئیس گروه تحقیقات کاربردی و ارتباط با صنعت",
          en: "Head of industry liaison and applied research",
        },
        rank: "assistant",
        phone: "08138411448",
        resumeUrl: "https://industry.hut.ac.ir/documents/79167/0/DrSobhani.pdf/c77275b1-27e0-c102-4dff-25fed68392c9",
        photoUrl:
          "https://industry.hut.ac.ir/documents/79167/0/faculty.jpg/3a5a9979-70ee-688b-e216-03938005743b?download=true",
      },
      {
        role: "staff",
        name: { fa: "کاظم پارسایی‌منش", en: "Kazem Parsaeimanesh" },
        jobTitle: { fa: "کارشناس ارتباط با صنعت", en: "Industry liaison officer" },
        phone: "08138411522",
        photoUrl:
          "https://industry.hut.ac.ir/documents/79167/0/%DA%A9%D8%A7%D8%B8%D9%85+%D9%BE%D8%A7%D8%B1%D8%B3%D8%A7%DB%8C%DB%8C.jpg/db97105f-752b-7216-b1c3-8b4da6127190?download=true",
      },
    ],
    links: [
      { title: { fa: "مرکز نوآوری", en: "Innovation centre" }, url: "https://industry.hut.ac.ir/", icon: "website" },
      { title: { fa: "کارآموزی", en: "Internships" }, url: "https://industry.hut.ac.ir/", icon: "guide" },
    ],
    lists: [
      {
        title: { fa: "تفاهم‌نامه‌های همکاری", en: "Cooperation agreements" },
        items: [
          { title: { fa: "جهاد دانشگاهی واحد استان همدان", en: "ACECR, Hamedan branch" } },
          { title: { fa: "شرکت سیمان هگمتان", en: "Hegmatan Cement" } },
          { title: { fa: "شرکت مخابرات استان همدان", en: "Hamedan Telecommunication Company" } },
          {
            title: {
              fa: "پارک علم و فناوری همدان، طرح دستیار فناوری",
              en: "Hamedan Science and Technology Park: technology assistant scheme",
            },
          },
          { title: { fa: "شرکت گاز استان همدان", en: "Hamedan Gas Company" } },
          { title: { fa: "شرکت آب و فاضلاب استان همدان", en: "Hamedan Water and Wastewater Company" } },
          { title: { fa: "شرکت همراهان مدیر اشراف", en: "Hamrahan Modir Eshraf" } },
          { title: { fa: "شرکت دانش‌بنیان بهیار صنعت سپاهان", en: "Behyar Sanat Sepahan" } },
          {
            title: {
              fa: "شرکت ملی پخش فراورده‌های نفتی منطقه همدان",
              en: "National Iranian Oil Products Distribution Company, Hamedan",
            },
          },
          { title: { fa: "دانشگاه علوم پزشکی همدان", en: "Hamadan University of Medical Sciences" } },
          {
            title: {
              fa: "مجتمع (برج) فناوری ابن سینا: طراحی، ساخت، راه‌اندازی و مدیریت",
              en: "Avicenna Technology Tower: design, building, launch and management",
            },
          },
          { title: { fa: "نیروگاه برق شهید مفتح همدان", en: "Shahid Mofatteh Power Plant" } },
          { title: { fa: "پارک علم و فناوری استان همدان", en: "Hamedan Science and Technology Park" } },
          { title: { fa: "بنیاد ملی نخبگان استان همدان", en: "National Elites Foundation, Hamedan" } },
        ],
      },
    ],
  },

  /*------ Central Laboratory ------*/
  {
    slug: "central-lab",
    section: "research",
    name: { fa: "آزمایشگاه مرکزی", en: "Central Laboratory" },
    lede: {
      fa: "تجهیزات پیشرفته آزمایشگاهی دانشگاه در دو سطح، برای پژوهشگران دانشگاه و بیرون از آن، صنایع و بخش خصوصی.",
      en: "The university's advanced lab equipment, at two levels, for researchers inside and outside the university, industry and private clients.",
    },
    intro: {
      fa: "آزمایشگاه مرکزی دانشگاه صنعتی همدان در سال ۱۳۹۵، در راستای سند راهبردی دانشگاه، برای ارائه خدمات پژوهشی به اعضای هیئت علمی، پژوهشگران و دانشجویان تحصیلات تکمیلی دانشگاه، پژوهشگران و صنعتگران کشور و مؤسسات بیرون از دانشگاه راه‌اندازی شد. این مجموعه می‌کوشد نیازهای تحقیقاتی پژوهشگران را نه‌تنها در دانشگاه و استان، که در سطح کشور برآورده کند.\n\nتجهیزات آزمایشگاه در دو سطح است: سطح A تجهیزات پیشرفته (Hi-Tech) و سطح B تجهیزات عمومی آزمایشگاهی. متمرکز کردن تجهیزات مورد نیاز رشته‌های مختلف، بهره‌وری بیشتر از آن‌ها، صرفه‌جویی در هزینه پروژه‌ها، ارتباط بیشتر میان پژوهشگران و پرهیز از انحصاری شدن دستگاه‌ها از اهداف آن است.\n\nخدمات آزمایشگاه برای همه دانشگاه‌ها، مؤسسات علمی و تحقیقاتی، صنایع و بخش خصوصی است: هر شخص حقیقی یا حقوقی می‌تواند با مراجعه یا تماس تلفنی از آن استفاده کند. برای ثبت درخواست، فرم سطح A یا B را از بخش فایل‌ها بگیرید و پس از تکمیل به ایمیل آزمایشگاه بفرستید.",
      en: "The central laboratory opened in 2016, as part of the university's strategic plan, to serve the university's faculty, researchers and graduate students, researchers and industry across Iran, and outside institutions. It aims to meet researchers' needs not only at the university and in the province but nationally.\n\nIts equipment is at two levels: level A is high-tech instruments, level B general lab equipment. Keeping the instruments different fields need in one place lets them be used more, saves projects money, brings researchers together and keeps any machine from becoming one group's own.\n\nIts services are open to every university, research institute, company and private client: anyone can come in or call. To book a test, fill in the level A or B request form from the files below and email it to the lab.",
    },
    phone: "08138411446",
    email: "Centrallab@hut.ac.ir",
    hours: { fa: "شنبه تا چهارشنبه، به‌جز روزهای تعطیل", en: "Saturday to Wednesday, except holidays" },
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "احمد قادری حمیدی", en: "Ahmad Ghaderi Hamidi" },
        jobTitle: { fa: "مدیر آزمایشگاه مرکزی", en: "Director of the central laboratory" },
        rank: "assistant",
        degree: { fa: "دکتری مهندسی مواد", en: "PhD in materials engineering" },
        phone: "08138411446",
        email: "Centrallab@hut.ac.ir",
        photoUrl:
          "https://lab.hut.ac.ir/documents/79174/0/ghaderi+hamidi.jpg/e1692301-4405-41b2-db86-0a409a67a89c?download=true",
      },
      {
        role: "staff",
        honorific: "doctor",
        name: { fa: "معصومه بلالی", en: "Masoumeh Balali" },
        jobTitle: { fa: "کارشناس آزمایشگاه مرکزی", en: "Laboratory expert" },
        degree: { fa: "دکتری شیمی معدنی (نانو)", en: "PhD in inorganic chemistry (nano)" },
        phone: "08138411217",
        email: "Centrallab@hut.ac.ir",
        photoUrl:
          "https://lab.hut.ac.ir/documents/79174/0/%D8%A8%D9%84%D8%A7%D9%84%DB%8C.jpg/261a55db-57d3-ef73-2870-557a059a3600?download=true",
      },
      {
        role: "staff",
        name: { fa: "لیلا وطن‌نواز", en: "Leila Vatannavaz" },
        jobTitle: { fa: "کارشناس آزمایشگاه مرکزی", en: "Laboratory expert" },
      },
      {
        role: "staff",
        name: { fa: "محدثه مهدیان", en: "Mohaddeseh Mahdian" },
        jobTitle: { fa: "کارشناس آزمایشگاه مرکزی", en: "Laboratory expert" },
      },
    ],
    links: [],
    lists: [
      {
        title: { fa: "آزمایشگاه‌های تحقیقاتی", en: "Research labs" },
        items: [
          { title: { fa: "آزمایشگاه تحقیقاتی شیمی", en: "Chemistry research lab" } },
          { title: { fa: "آزمایشگاه تحقیقاتی مواد", en: "Materials research lab" } },
          { title: { fa: "آزمایشگاه تحقیقاتی معدن", en: "Mining research lab" } },
        ],
      },
      {
        title: { fa: "تجهیزات سطح A", en: "Level A equipment" },
        items: [
          {
            title: { fa: "کروماتوگرافی گازی", en: "Gas chromatograph" },
            url: "https://lab.hut.ac.ir/%DA%A9%D8%B1%D9%88%D9%85%D8%A7%D8%AA%D9%88%DA%AF%D8%B1%D8%A7%D9%81%DB%8C-%DA%AF%D8%A7%D8%B2%DB%8C",
            text: { fa: "7890 B · Agilent technologies" },
          },
          {
            title: { fa: "جذب اتمی", en: "Atomic absorption spectrometer" },
            url: "https://lab.hut.ac.ir/%D8%AC%D8%B0%D8%A8-%D8%A7%D8%AA%D9%85%DB%8C",
            text: { fa: "Agilent technologies 200 series AA · Agilent technologies" },
          },
          {
            title: { fa: "مغناطومتر نمونه مرتعش VSM", en: "Vibrating sample magnetometer (VSM)" },
            url: "https://lab.hut.ac.ir/%D9%85%D8%BA%D9%86%D8%A7%D8%B7%D9%88%D9%85%D8%AA%D8%B1-%D9%86%D9%85%D9%88%D9%86%D9%87-%D9%85%D8%B1%D8%AA%D8%B9%D8%B4-vsm",
            text: { fa: "FORC-MDKF · مغناطیس دانش پژوه کاشان" },
          },
          {
            title: { fa: "آنالیز حرارتی", en: "Thermal analysis (SDT)" },
            url: "https://lab.hut.ac.ir/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D9%87-%D8%A2%D9%86%D8%A7%D9%84%DB%8C%D8%B2%D9%87%D8%A7%DB%8C-%D8%AD%D8%B1%D8%A7%D8%B1%D8%AA%DB%8C",
            text: { fa: "SDT-Q600 · TA Instrument" },
          },
          {
            title: { fa: "مشخصه‌یابی الکتروشیمیایی (پتانسیواستات)", en: "Electrochemical workstation (potentiostat)" },
            url: "https://lab.hut.ac.ir/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D9%87-%D9%85%D8%B4%D8%AE%D8%B5%D9%87%C2%AC%DB%8C%D8%A7%D8%A8%DB%8C-%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%D9%88%D8%B4%DB%8C%D9%85%DB%8C%D8%A7%DB%8C%DB%8C-%D9%BE%D8%AA%D8%A7%D9%86%D8%B3%DB%8C%D9%88%D8%A7%D8%B3%D8%AA%D8%A7%D8%AA-",
            text: { fa: "CompactStat, 20250h · Ivium" },
          },
          {
            title: { fa: "دانسیتومتر", en: "Density meter" },
            url: "https://lab.hut.ac.ir/%D8%AF%D8%A7%D9%86%D8%B3%DB%8C%D8%AA%D9%88%D9%85%D8%AA%D8%B1",
            text: { fa: "DMA 4500 M · Anton paar" },
          },
          {
            title: { fa: "ویسکومتر", en: "Viscometer" },
            url: "https://lab.hut.ac.ir/%D9%88%DB%8C%D8%B3%DA%A9%D9%88%D9%85%D8%AA%D8%B1",
            text: { fa: "Lovis 2000 M · Anton paar" },
          },
          {
            title: { fa: "تنسیومتر", en: "Tensiometer" },
            url: "https://lab.hut.ac.ir/%D8%AA%D9%86%D8%B3%DB%8C%D9%88%D9%85%D8%AA%D8%B1",
            text: { fa: "TD4 · لاودا" },
          },
          {
            title: { fa: "آزمون سایش", en: "Wear tester" },
            url: "https://lab.hut.ac.ir/%D8%A2%D8%B2%D9%85%D9%88%D9%86-%D8%B3%D8%A7%DB%8C%D8%B4",
            text: { fa: "Pin on disc · دانشگاه صنعتی مالک اشتر" },
          },
          {
            title: { fa: "وایرکات", en: "Wire EDM" },
            url: "https://lab.hut.ac.ir/%D9%88%D8%A7%DB%8C%D8%B1%DA%A9%D8%A7%D8%AA",
            text: { fa: "DK7740Z · Suzhou baoma" },
          },
          {
            title: { fa: "میکروسختی ویکرز", en: "Vickers microhardness tester" },
            url: "https://lab.hut.ac.ir/%D9%85%DB%8C%DA%A9%D8%B1%D9%88-%D8%B3%D8%AE%D8%AA%DB%8C-%D9%88%DB%8C%DA%A9%D8%B1%D8%B2",
            text: { fa: "MH4 · کوپا پژوهش" },
          },
          {
            title: { fa: "کشش ۲۵ تن", en: "Universal testing machine, 25 t" },
            url: "https://lab.hut.ac.ir/%DA%A9%D8%B4%D8%B4-25-%D8%AA%D9%86",
            text: { fa: "STM-250 · SANTAM" },
          },
          {
            title: { fa: "اسپکتروفتومتر فرابنفش‌مرئی (UV-Vis)", en: "UV-Vis spectrophotometer" },
            url: "https://lab.hut.ac.ir/%D8%A7%D8%B3%D9%BE%DA%A9%D8%AA%D8%B1%D9%81%D9%88%D8%AA%D9%88%D9%85%D8%AA%D8%B1-%D9%81%D8%B1%D8%A7%D8%A8%D9%86%D9%81%D8%B4-%D9%85%D8%B1%D8%A6%DB%8C-uv-visible-",
            text: { fa: "1280 · Shimadzu" },
          },
          {
            title: { fa: "کشش ۲ تن", en: "Universal testing machine, 2 t" },
            url: "https://lab.hut.ac.ir/%DA%A9%D8%B4%D8%B4-2-%D8%AA%D9%86",
            text: { fa: "STM-20 · SANTAM" },
          },
          {
            title: { fa: "دوربین حرارتی", en: "Thermal camera" },
            url: "https://lab.hut.ac.ir/%D8%AF%D9%88%D8%B1%D8%A8%DB%8C%D9%86-%D8%AD%D8%B1%D8%A7%D8%B1%D8%AA%DB%8C",
            text: { fa: "IR802-M · Dali-Tech" },
          },
          {
            title: { fa: "تصویرساز آکوستیک صنعتی", en: "Industrial acoustic imager" },
            url: "https://lab.hut.ac.ir/%D8%AA%D8%B5%D9%88%DB%8C%D8%B1%D8%B3%D8%A7%D8%B2-%D8%A2%DA%A9%D9%88%D8%B3%D8%AA%DB%8C%DA%A9-%D8%B5%D9%86%D8%B9%D8%AA%DB%8C",
            text: { fa: "CRY2623 · CRYSOUND" },
          },
          {
            title: { fa: "تجهیزات اندازه‌گیری الکتریکی", en: "Electrical measurement kit" },
            url: "https://lab.hut.ac.ir/%D8%AA%D8%AC%D9%87%DB%8C%D8%B2%D8%A7%D8%AA-%D8%A7%D9%86%D8%AF%D8%A7%D8%B2%D9%87-%DA%AF%DB%8C%D8%B1%DB%8C-%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%DB%8C%DA%A9%DB%8C",
            text: { fa: "PQ3198 · HIOKI ژاپن" },
          },
          {
            title: { fa: "پاورآنالایزر", en: "Power analyser" },
            url: "https://lab.hut.ac.ir/%D9%BE%D8%A7%D9%88%D8%B1%D8%A2%D9%86%D8%A7%D9%84%D8%A7%DB%8C%D8%B2%D8%B1",
            text: { fa: "PQ3198 · HIOKI ژاپن" },
          },
          {
            title: { fa: "آنالیز ارتعاشات", en: "Vibration analyser" },
            url: "https://lab.hut.ac.ir/%D8%A2%D9%86%D8%A7%D9%84%DB%8C%D8%B2-%D8%A7%D8%B1%D8%AA%D8%B9%D8%A7%D8%B4%D8%A7%D8%AA",
            text: { fa: "3 channel Leonova Emerald Portable Vibration Analyzer · Leonova Emerald سوئد" },
          },
          {
            title: { fa: "دستگاه پراکندگی نور پویا (DLS)", en: "Dynamic light scattering (DLS)" },
            url: "https://lab.hut.ac.ir/%D8%AF%D8%B3%D8%AA%DA%AF%D8%A7%D9%87-%D9%BE%D8%B1%D8%A7%DA%A9%D9%86%D8%AF%DA%AF%DB%8C-%D9%86%D9%88%D8%B1-%D9%BE%D9%88%DB%8C%D8%A7-dls-",
            text: { fa: "SZ-100V2 · HORIBA" },
          },
        ],
      },
      {
        title: { fa: "تجهیزات سطح B", en: "Level B equipment" },
        items: [
          {
            title: { fa: "سانتریفیوژ", en: "Centrifuge" },
            url: "https://lab.hut.ac.ir/%D8%B3%D8%A7%D9%86%D8%AA%D8%B1%DB%8C%D9%81%DB%8C%D9%88%DA%98",
            text: { fa: "HS18500 · فرزانه آرمان" },
          },
          {
            title: { fa: "سانتریفیوژ T.16", en: "Centrifuge T.16" },
            url: "https://lab.hut.ac.ir/%D8%B3%D8%A7%D9%86%D8%AA%D8%B1%DB%8C%D9%81%DB%8C%D9%88%DA%98-t.16",
            text: { fa: "T.16 · اروم تجهیز گستر" },
          },
          {
            title: { fa: "دیونایزر آب", en: "Water deioniser" },
            url: "https://lab.hut.ac.ir/%D8%AF%DB%8C%D9%88%D9%86%D8%A7%DB%8C%D8%B2%D8%B1-%D8%A2%D8%A8-%D9%85%D9%82%D8%B7%D8%B1-%DA%AF%DB%8C%D8%B1%DB%8C",
            text: { fa: "Water purification system pure 2000 IN · AQUA ARA. ARA TADJHIZ" },
          },
          {
            title: { fa: "آب‌مقطرگیر", en: "Water distiller" },
            url: "https://lab.hut.ac.ir/%D8%A2%D8%A8-%C2%AC%D9%85%D9%82%D8%B7%D8%B1%DA%AF%DB%8C%D8%B1%DB%8C",
            text: { fa: "DW 3000 · اروم تجهیز" },
          },
          {
            title: { fa: "انکوباتور", en: "Incubator" },
            url: "https://lab.hut.ac.ir/incubator",
            text: { fa: "PAAT ARIYA Co." },
          },
          {
            title: { fa: "هموژنایزر اولتراسونیک آزمایشگاهی", en: "Ultrasonic homogeniser" },
            url: "https://lab.hut.ac.ir/%D9%87%D9%85%D9%88%DA%98%D9%86%D8%A7%DB%8C%D8%B2%D8%B1-%D8%A7%D9%88%D9%84%D8%AA%D8%B1%D8%A7%D8%B3%D9%88%D9%86%DB%8C%DA%A9-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87%DB%8C",
            text: { fa: "Instruction ultrasonic Homogenizer [400W-20kHz] · شرکت توسعه فناوری مافوق صوت" },
          },
          {
            title: { fa: "آون خلأ", en: "Vacuum oven" },
            url: "https://lab.hut.ac.ir/%D8%A2%D9%88%D9%86-%D8%AE%D9%84%D8%A3",
            text: { fa: "AFE200LV · آترا" },
          },
          {
            title: { fa: "ترازوی دیجیتال", en: "Digital balance" },
            url: "https://lab.hut.ac.ir/%D8%AA%D8%B1%D8%A7%D8%B2%D9%88%DB%8C-%D8%AF%DB%8C%D8%AC%DB%8C%D8%AA%D8%A7%D9%84",
            text: { fa: "AS 220.R2 · RADWAG" },
          },
          {
            title: { fa: "هات‌پلیت مگنت (هیتر استیرر)", en: "Hot plate stirrer" },
            url: "https://lab.hut.ac.ir/%D9%87%D8%A7%D8%AA-%D9%BE%D9%84%DB%8C%D8%AA-%D9%85%DA%AF%D9%86%D8%AA-%D9%87%DB%8C%D8%AA%D8%B1-%D8%A7%D8%B3%D8%AA%DB%8C%D8%B1%D8%B1-",
            text: { fa: "HPMT700 · فرزانه آرمان" },
          },
          {
            title: { fa: "pH متر", en: "pH meter" },
            url: "https://lab.hut.ac.ir/%D9%BE%DB%8C-%D8%A7%DA%86-%D9%85%D8%AA%D8%B1",
            text: { fa: "a-AB33PH-F · Ohaus سوئیس" },
          },
          {
            title: { fa: "کوره الکتریکی آزمایشگاهی", en: "Laboratory furnace" },
            url: "https://lab.hut.ac.ir/%DA%A9%D9%88%D8%B1%D9%87-%D8%A7%D9%84%DA%A9%D8%AA%D8%B1%DB%8C%DA%A9%DB%8C-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87%DB%8C",
            text: { fa: "AFE1200L/18DU · ATRA" },
          },
          {
            title: { fa: "آسیاب گلوله‌ای سیاره‌ای", en: "Planetary ball mill" },
            url: "https://lab.hut.ac.ir/-%D8%A2%D8%B3%DB%8C%D8%A7%D8%A8-%DA%AF%D9%84%D9%88%D9%84%D9%87-%D8%A7%DB%8C-%D8%B3%DB%8C%D8%A7%D8%B1%D9%87-%D8%A7%DB%8C-planetary-ball-mill-",
            text: { fa: "PM100 · RETSCH آلمان" },
          },
          {
            title: { fa: "رفرکتومتر", en: "Refractometer" },
            url: "https://lab.hut.ac.ir/%D8%B1%D9%81%D8%B1%DA%A9%D8%AA%D9%88%D9%85%D8%AA%D8%B1",
            text: { fa: "Abbemat 300 · Anton paar" },
          },
          {
            title: { fa: "کوره تیوبی آزمایشگاهی", en: "Tube furnace" },
            url: "https://lab.hut.ac.ir/%DA%A9%D9%88%D8%B1%D9%87-%D8%AA%DB%8C%D9%88%D8%A8%DB%8C-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87%DB%8C",
            text: { fa: "TF5/40-1500 · آذر کوره" },
          },
        ],
      },
    ],
  },
];

/*===== Files =====*/
// Shown on each office's page, grouped as on the forms page.

export const researchOfficeFiles: LibrarySeed = [
  /*------ Publishing a book (press) ------*/
  {
    key: "press-files",
    icon: "guides",
    office: "press",
    title: { fa: "چاپ کتاب", en: "Publishing a book" },
    groups: [
      {
        title: { fa: "فرم‌ها", en: "Forms" },
        documents: [
          {
            title: { fa: "فرم پیشنهاد چاپ کتاب از سوی گروه", en: "Book proposal from a department" },
            url: "https://press.hut.ac.ir/documents/79149/219878/%D9%81%D8%B1%D9%85-%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7%D8%AF-%DA%86%D8%A7%D9%BE-%DA%A9%D8%AA%D8%A7%D8%A8-%D8%AA%D9%88%D8%B3%D8%B7-%DA%AF%D8%B1%D9%88%D9%87.pdf/4102d1c1-8fb9-17df-f2eb-36e596768a45",
            format: "pdf",
          },
          {
            title: { fa: "فرم پیشنهاد چاپ کتاب از سوی متقاضی", en: "Book proposal from an author" },
            url: "https://press.hut.ac.ir/documents/79149/219878/%D9%81%D8%B1%D9%85-%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7%D8%AF-%DA%86%D8%A7%D9%BE-%DA%A9%D8%AA%D8%A7%D8%A8-%D8%AA%D9%88%D8%B3%D8%B7-%D9%85%D8%AA%D9%82%D8%A7%D8%B6%DB%8C-.pdf/a4653a64-17e2-38a4-9919-e416120e01b9",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "راهنما و آیین‌نامه", en: "Guides and rules" },
        documents: [
          {
            title: { fa: "روند چاپ کتاب", en: "How a book is published" },
            url: "https://press.hut.ac.ir/documents/79149/219878/%D9%85%D8%B1%D8%A7%D8%AD%D9%84+%DA%86%D8%A7%D9%BE+%DA%A9%D8%AA%D8%A7%D8%A8.pdf/d572cc73-79fe-03aa-687a-8826e4708b4d",
            format: "pdf",
          },
          {
            title: { fa: "مدارک لازم برای ارائه به شورای انتشارات", en: "What to submit to the publishing council" },
            url: "https://press.hut.ac.ir/documents/79149/219878/%D9%85%D8%AF%D8%A7%D8%B1%DA%A9-%D9%84%D8%A7%D8%B2%D9%85-%D8%AC%D9%87%D8%AA-%D8%A7%D8%B1%D8%A7%D8%A6%D9%87-%D8%A8%D9%87-%D8%B4%D9%88%D8%B1%D8%A7%DB%8C-%D8%A7%D9%86%D8%AA%D8%B4%D8%A7%D8%B1%D8%A7%D8%AA-%D8%AC%D9%87%D8%AA-%DA%86%D8%A7%D9%BE-%DA%A9%D8%AA%D8%A7%D8%A8.pdf/8b0cc162-b862-db3e-c186-16a53c06ff6c",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه اجرایی انتشارات", en: "The press's regulations" },
            url: "https://press.hut.ac.ir/documents/79149/0/%D8%A2%DB%8C%DB%8C%D9%86+%D9%86%D8%A7%D9%85%D9%87+%D8%A7%D8%AC%D8%B1%D8%A7%DB%8C%DB%8C+%D8%A7%D9%86%D8%AA%D8%B4%D8%A7%D8%B1%D8%A7%D8%AA.pdf/cf05bc93-348d-f869-3edf-6a3577979484",
            format: "pdf",
          },
        ],
      },
    ],
  },

  /*------ Guides (library) ------*/
  {
    key: "library-guides",
    icon: "guides",
    office: "library",
    title: { fa: "راهنماهای آموزشی", en: "Guides" },
    groups: [
      {
        title: { fa: "منابع کتابخانه", en: "The library's books" },
        documents: [
          {
            title: { fa: "راهنمای جست‌وجوی منابع", en: "Searching the catalogue" },
            url: "https://web.hut.ac.ir/documents/79181/445846/1%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AC%D8%B3%D8%AA%D8%AC%D9%88%DB%8C-%D9%85%D9%86%D8%A7%D8%A8%D8%B9.pdf/12189b21-6d6a-6cfe-821d-e43c4f69f53a",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای رزرو منابع", en: "Reserving a book" },
            url: "https://web.hut.ac.ir/documents/79181/445846/2%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%B1%D8%B2%D8%B1%D9%88-%D9%85%D9%86%D8%A7%D8%A8%D8%B9.pdf/48d42018-e26c-f1a1-07d7-87d3345c3cb2",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای تمدید منابع", en: "Renewing a loan" },
            url: "https://library.hut.ac.ir/documents/79181/445846/3%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AA%D9%85%D8%AF%DB%8C%D8%AF-%D9%85%D9%86%D8%A7%D8%A8%D8%B9.pdf/1a537d0e-5e77-0cd5-97cd-0a1a4fb67662",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "پایان‌نامه و مقاله", en: "Theses and papers" },
        documents: [
          {
            title: { fa: "راهنمای نگارش پایان‌نامه کارشناسی", en: "Writing a bachelor's thesis" },
            url: "https://library.hut.ac.ir/documents/79181/445846/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D9%86%DA%AF%D8%A7%D8%B1%D8%B4-%D9%BE%D8%A7%DB%8C%D8%A7%D9%86-%D9%86%D8%A7%D9%85%D9%87-%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C.pdf/d58c8fe4-c03d-e611-7a26-528ff6df7929",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای نگارش پایان‌نامه کارشناسی ارشد", en: "Writing a master's thesis" },
            url: "https://library.hut.ac.ir/documents/79181/445846/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D9%86%DA%AF%D8%A7%D8%B1%D8%B4-%D9%BE%D8%A7%DB%8C%D8%A7%D9%86-%D9%86%D8%A7%D9%85%D9%87-%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C-%D8%A7%D8%B1%D8%B4%D8%AF.pdf/83b5a8e3-47a3-a81a-e2b1-bf8bdee7debb",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای ثبت پایان‌نامه در ایرانداک", en: "Registering a thesis with IranDoc" },
            url: "https://library.hut.ac.ir/documents/79181/445846/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AB%D8%A8%D8%AA-%D9%BE%D8%A7%DB%8C%D8%A7%D9%86-%D9%86%D8%A7%D9%85%D9%87-1.pdf/afb0c553-5381-ba8c-49e8-a41ac4849336",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای جست‌وجو و دریافت مقاله‌های لاتین", en: "Finding and downloading papers in English" },
            url: "https://library.hut.ac.ir/documents/79181/445846/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AF%D8%A7%D9%86%D9%84%D9%88%D8%AF-%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D9%84%D8%A7%D8%AA%DB%8C%D9%86.pdf/cb1fca94-968a-e3f7-2faf-64ace051a581",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای جست‌وجو و درخواست استاندارد", en: "Finding and requesting standards" },
            url: "https://library.hut.ac.ir/documents/79181/445846/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AC%D8%B3%D8%AA%D8%AC%D9%88-%D9%88-%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D8%AF%D8%A7%D8%B1%D8%AF%D9%87%D8%A7.pdf/73e6cfb5-8087-d307-a40d-15f218b78e2f",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای جست‌وجو در پایگاه سیویلیکا", en: "Searching Civilica" },
            url: "https://library.hut.ac.ir/documents/79181/445846/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AF%D8%A7%D9%86%D9%84%D9%88%D8%AF-%D9%85%D9%82%D8%A7%D9%84%D9%87-%D8%A7%D8%B2-%D8%B3%DB%8C%D9%88%DB%8C%D9%84%DB%8C%DA%A9%D8%A7.pdf/b5e86856-7d83-55c6-e529-f3f9f33eeccb",
            format: "pdf",
          },
        ],
      },
    ],
  },

  /*------ Forms (industry) ------*/
  {
    key: "industry-forms",
    icon: "files",
    office: "industry",
    title: { fa: "فرم‌ها", en: "Forms" },
    groups: [
      {
        title: { fa: "استادان و دانشجویان", en: "Faculty and students" },
        documents: [
          {
            title: { fa: "فرصت مطالعاتی استادان در صنعت", en: "Faculty sabbatical in industry" },
            url: "https://industry.hut.ac.ir/documents/79167/216438/forsat-motaleat_sanat.pdf/b8481d6d-361a-b747-65a5-f2bc7f129cb8",
            format: "pdf",
          },
          {
            title: { fa: "فرم درخواست بازدید دانشجویی از صنعت", en: "Request for a student visit to industry" },
            url: "https://industry.hut.ac.ir/documents/79167/216438/%D9%81%D8%B1%D9%85-%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%A8%D8%A7%D8%B2%D8%AF%DB%8C%D8%AF-%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88-%D8%A7%D8%B2.pdf/5527ffe3-b9ce-48d9-0f74-b1d3145659f7",
            format: "pdf",
          },
        ],
      },
    ],
  },

  /*------ Booklet and forms (central-lab) ------*/
  {
    key: "central-lab-files",
    icon: "research",
    office: "central-lab",
    title: { fa: "دفترچه و فرم‌ها", en: "Booklet and forms" },
    groups: [
      {
        title: { fa: "درخواست خدمات", en: "Booking a test" },
        documents: [
          {
            title: { fa: "فرم درخواست استفاده از آزمایشگاه مرکزی، سطح A", en: "Request form, level A" },
            url: "https://lab.hut.ac.ir/documents/79174/281998/A+level.pdf/96d5c1f3-cf92-8b4e-79e1-9e63cb0f2311",
            format: "pdf",
          },
          {
            title: { fa: "فرم درخواست استفاده از آزمایشگاه مرکزی، سطح B", en: "Request form, level B" },
            url: "https://lab.hut.ac.ir/documents/79174/281998/Level+%28B%29.pdf/2f48a84c-d5f1-5ec2-4f9e-bb2ac5394842",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "معرفی", en: "About the lab" },
        documents: [
          {
            title: { fa: "کتابچه معرفی آزمایشگاه مرکزی", en: "The central laboratory's booklet" },
            url: "https://lab.hut.ac.ir/documents/79174/0/ccccc.pdf/ba01931c-ce1c-88ef-e8a4-855f7cc96225",
            format: "pdf",
          },
        ],
      },
    ],
  },
];

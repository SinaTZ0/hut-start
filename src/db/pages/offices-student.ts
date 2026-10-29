import type { LibrarySeed } from "#/db/pages/library";
import type { OfficeSeed } from "#/db/pages/offices";

/*===== Student Affairs =====*/
// The student and cultural affairs' offices, from student.hut.ac.ir on 2026-10-29. Persian is the old pages' text,
// tidied (the welfare FAQ's Covid-era answers are left out); ledes and English are written here.

export const studentOffices: OfficeSeed[] = [
  /*------ Welfare ------*/
  {
    slug: "welfare",
    section: "campus-life",
    name: { fa: "خدمات رفاهی دانشجویی", en: "Student Welfare" },
    lede: {
      fa: "وام‌های صندوق رفاه، بیمه حوادث، کار دانشجویی و همیار دانشجو.",
      en: "Student loans, accident insurance, student jobs and the student aid scheme.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "ساره فرهادی", en: "Sareh Farhadi" },
        jobTitle: { fa: "کارشناس اداره رفاه دانشجویی", en: "Student welfare officer" },
        degree: { fa: "کارشناسی ارشد حقوق جزا و جرم‌شناسی", en: "MA in criminal law and criminology" },
        phone: "08138411430",
        email: "refahi@hut.ac.ir",
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D9%81%D8%B1%D9%87%D8%A7%D8%AF%DB%8C3.png/140a37e7-1b1b-cf5f-614c-6cc8109f8d29?download=true",
      },
    ],
    links: [
      {
        title: { fa: "صندوق رفاه دانشجویان", en: "Student Welfare Fund" },
        description: { fa: "ثبت‌نام وام‌ها", en: "Applying for loans" },
        url: "https://swf.ir/",
        icon: "website",
      },
    ],
    duties: [
      { fa: "تشکیل پرونده همه وام‌های دانشجویی", en: "Opening the file for every kind of student loan" },
      {
        fa: "بارگذاری جداگانه اطلاعات دانشجویان متأهل و دانشجویان تحت پوشش نهادهای خاص در سایت صندوق رفاه",
        en: "Entering married students and students covered by other bodies separately on the welfare fund's site",
      },
      {
        fa: "بستن فهرست وام‌ها در تاریخ اعلام‌شده صندوق رفاه دانشجویان وزارت علوم و ارسال به‌موقع آن در هر ترم",
        en: "Closing the loan lists by the welfare fund's deadline and sending them on time every semester",
      },
      {
        fa: "پیگیری وام‌ها و اعتبارات دانشجویی از وزارت علوم تا واریز به حساب دانشجو",
        en: "Following each loan from the ministry until it reaches the student's account",
      },
      {
        fa: "تکمیل گزارش آماری درخواستی وزارت علوم در پایان هر ترم",
        en: "Filing the ministry's statistics at the end of each semester",
      },
      {
        fa: "قراردادهای کار دانشجویی همه واحدهای دانشگاه و ارسال آن‌ها به امور مالی برای پرداخت",
        en: "Handling student job contracts across the university and sending them to finance for payment",
      },
      {
        fa: "قرارداد بیمه حوادث دانشجویی در مهر هر سال و صدور گواهی بیمه برای دانشجویان متقاضی",
        en: "Arranging student accident insurance every autumn and issuing insurance certificates on request",
      },
    ],
    phone: "08138411430",
    email: "refahi@hut.ac.ir",
    faq: [
      {
        question: { fa: "چرا مبلغ وام‌ها کم است؟", en: "Why are the loans so small?" },
        answer: {
          fa: "مبلغ همه وام‌ها را صندوق رفاه دانشجویان تعیین می‌کند و هیچ دانشگاهی نمی‌تواند آن را تغییر دهد.",
          en: "The welfare fund sets every loan's amount, and no university can change it.",
        },
      },
      {
        question: {
          fa: "دیر برای تشکیل پرونده اقدام کرده‌ام؛ به من وام تعلق می‌گیرد؟",
          en: "I opened my file late. Can I still get a loan?",
        },
        answer: {
          fa: "وقتی اعتبار ابلاغ می‌شود، کارشناس باید بر هزینه کردن و اطلاع‌رسانی آن تمرکز کند و تشکیل پرونده در آن روزها ممکن نیست. اگر وام می‌خواهید، هر چه زودتر پرونده تشکیل دهید.",
          en: "When funds arrive, the officer has to spend them and tell students, and can't open new files in those days. If you want a loan, open your file as early as you can.",
        },
      },
      {
        question: {
          fa: "قبلاً وام کمک‌آموزشی گرفته‌ام؛ این ترم هم می‌توانم برای لپ‌تاپ یا گوشی وام بگیرم؟",
          en: "I had an education-aid loan before. Can I get another for a laptop or phone?",
        },
        answer: {
          fa: "خیر. طبق قوانین صندوق رفاه، هر دانشجو در هر مقطع فقط یک بار وام کمک‌آموزشی می‌گیرد.",
          en: "No. Under the fund's rules, each student gets one education-aid loan per degree.",
        },
      },
      {
        question: {
          fa: "با موافقت معاونت دانشجویی یا رئیس دانشگاه می‌توانم وامی بیرون از قوانین صندوق بگیرم؟",
          en: "Can the vice-president or the president approve a loan outside the fund's rules?",
        },
        answer: {
          fa: "خیر. هیچ‌یک از قوانین بخشنامه صندوق رفاه تغییرپذیر نیست.",
          en: "No. None of the rules in the fund's circular can be changed.",
        },
      },
      {
        question: { fa: "بدون ضامن هم وام داده می‌شود؟", en: "Can I get a loan without a guarantor?" },
        answer: { fa: "خیر.", en: "No." },
      },
      {
        question: { fa: "وام ضروری برتر به چه کسی تعلق می‌گیرد؟", en: "Who gets the top-student emergency loan?" },
        answer: {
          fa: "به دانشجویانی که رتبه کنکورشان ۱ تا ۵۰۰ باشد، یا رتبه ۱ تا ۳ جشنواره خوارزمی یا المپیادهای علمی را داشته باشند.",
          en: "Students ranked 1 to 500 in the national entrance exam, or 1 to 3 in the Kharazmi festival or a science olympiad.",
        },
      },
      {
        question: { fa: "وام دقیقاً چه زمانی به حسابم واریز می‌شود؟", en: "When exactly will the loan be paid?" },
        answer: {
          fa: "واریز وام بر عهده صندوق رفاه وزارت علوم است و زمان مشخصی ندارد؛ گاهی به دلیل کمبود اعتبار با تأخیر پرداخت می‌شود.",
          en: "The ministry's welfare fund pays the loans, and there is no set date; when funds run short, payments come late.",
        },
      },
      {
        question: {
          fa: "از زمان ثبت‌نام و مبلغ وام‌ها چطور باخبر شوم؟",
          en: "How do I hear when loan applications open?",
        },
        answer: {
          fa: "اطلاعیه ثبت‌نام با توضیحات کامل در اخبار سایت دانشگاه منتشر می‌شود، معمولاً یک ماه پیش از آغاز ثبت‌نام هر ترم. تاریخ دقیق را صندوق رفاه از پیش اعلام نمی‌کند.",
          en: "A notice with the details goes up in the university's news, usually a month before each semester's applications open. The fund doesn't set the date in advance.",
        },
      },
      {
        question: { fa: "درخواست وام داده‌ام؛ چرا به من وام تعلق نگرفت؟", en: "I applied. Why didn't I get a loan?" },
        answer: {
          fa: "وام به همه متقاضیان دارای پرونده تعلق می‌گیرد، مگر دانشجویانی که سنوات تحصیلشان تمام شده، بیرون از مهلت صندوق رفاه درخواست داده‌اند یا پرونده وام ندارند.",
          en: "Every applicant with a loan file gets one, except students past their allowed terms, those who applied after the fund's deadline, and those without a file.",
        },
      },
    ],
  },

  /*------ Housing ------*/
  {
    slug: "dorms",
    section: "campus-life",
    name: { fa: "اداره خوابگاه‌ها", en: "Student Housing" },
    lede: {
      fa: "اسکان دانشجویان در خوابگاه‌های خودگردان شهر، و سرویس رفت‌وآمد خوابگاه‌ها.",
      en: "Rooms for students in the city's self-run halls, and the halls' shuttle buses.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "حسین مجیدی برنا", en: "Hossein Majidi Borna" },
        jobTitle: { fa: "کارشناس اداره خوابگاه‌ها", en: "Housing officer" },
        degree: { fa: "کارشناسی کتابداری و اطلاع‌رسانی", en: "BA in library and information science" },
        phone: "08138411427",
        email: "khabgah@hut.ac.ir",
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D9%85%D8%AC%DB%8C%D8%AF%DB%8C+%D8%A8%D8%B1%D9%86%D8%A7.png/4b4564ad-ec0e-0358-03d4-5f3370270201?download=true",
      },
    ],
    links: [
      {
        title: { fa: "نقشه همدان", en: "Map of Hamedan" },
        url: "https://goo.gl/maps/Ddbr4Uv17ZUKVGr7A",
        icon: "website",
      },
    ],
    duties: [
      {
        fa: "اسکان دانشجویان متقاضی خوابگاه (برادران و خواهران) در خوابگاه‌های خودگردان شهر",
        en: "Housing students who ask for a room, men and women, in the city's self-run halls",
      },
      {
        fa: "قرارداد با خوابگاه‌داران غیردولتی برای اسکان و پرداخت کمک‌هزینه دانشجویی",
        en: "Contracting private hall owners for rooms and paying the student subsidy",
      },
      {
        fa: "بازدید مرتب از خوابگاه‌ها و بررسی مشکلات و نیازهای آن‌ها",
        en: "Visiting the halls regularly and looking into their problems and needs",
      },
      {
        fa: "نظارت بر کار مدیران و ناظمان خوابگاه‌ها و اجرای آیین‌نامه‌ها و مقررات",
        en: "Overseeing the halls' managers and wardens, and how the rules are kept",
      },
      { fa: "کنترل ورود و خروج دانشجویان خوابگاهی", en: "Keeping track of residents coming and going" },
      {
        fa: "گزارش ماهانه کار خوابگاه‌ها برای پرداخت کمک‌هزینه",
        en: "Monthly reports on the halls for paying the subsidy",
      },
      {
        fa: "عضویت در شورای نظارت بر خوابگاه‌های خودگردان استان همدان",
        en: "Sitting on Hamedan province's council for self-run halls",
      },
      {
        fa: "همکاری در تسویه حساب دانش‌آموختگان و انصرافی‌ها از خوابگاه",
        en: "Helping graduates and students who leave to clear their rooms",
      },
      {
        fa: "فراهم کردن سرویس رفت‌وآمد روزانه خوابگاه‌ها در چند نوبت، و سرویس اردوها و مراسم دانشجویی",
        en: "Running the halls' daily shuttle several times a day, and buses for trips and events",
      },
    ],
    phone: "08138411427",
    email: "khabgah@hut.ac.ir",
  },

  /*------ Dining ------*/
  {
    slug: "dining",
    section: "campus-life",
    name: { fa: "اداره تغذیه", en: "Dining Office" },
    lede: {
      fa: "ناهار و شام دانشجویی، برنامه هفتگی سلف و رزرو غذا در سامانه تغذیه.",
      en: "Students' lunch and dinner, the refectory's weekly menu, and booking meals in the dining system.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "حسین شجاعیان", en: "Hossein Shojaeian" },
        jobTitle: { fa: "کارشناس اداره تغذیه", en: "Dining officer" },
        phone: "08138411211",
      },
    ],
    links: [
      {
        title: { fa: "سامانه تغذیه", en: "Dining system" },
        description: { fa: "رزرو غذا و کیف پول", en: "Meal booking and wallet" },
        url: "http://nutrition.hut.ac.ir/",
        icon: "system",
      },
    ],
    intro: {
      fa: "اداره تغذیه ناهار و شام دانشجویان، ناهار کارکنان و استادان، و غذای مراسم، اردوها و المپیادهای ورزشی را فراهم می‌کند.\n\nفعال‌سازی کارت یکپارچه دانشجویی و تغذیه، ثبت‌نام دانشجویان تازه‌وارد در سامانه، تهیه برنامه غذایی هفتگی، ماهانه و فصلی، آمار هفتگی رزرو غذای دانشجویان خوابگاهی و غیرخوابگاهی، و خرید، تحویل و نگهداری مواد غذایی نیز بر عهده این اداره است.",
      en: "The dining office serves students' lunch and dinner, lunch for staff and faculty, and meals for events, trips and sports competitions.\n\nIt also activates the student and meal card, signs new students up to the dining system, plans the weekly, monthly and seasonal menus, counts the week's bookings for residents and non-residents, and buys, receives and stores the food.",
    },
    duties: [
      {
        fa: "تهیه، پخت و توزیع غذا بر اساس اصول بهداشتی و ضوابط ابلاغی",
        en: "Preparing, cooking and serving food to the health rules",
      },
      {
        fa: "آموزش کارکنان سلف سرویس و تهیه کارت سلامت آن‌ها",
        en: "Training the refectory's staff and keeping their health cards",
      },
      { fa: "آزمایش مواد غذایی خام و پخته", en: "Testing raw and cooked food" },
      {
        fa: "نظرسنجی غذایی از دانشجویان برای تنظیم برنامه غذایی",
        en: "Asking students about the food to plan the menus",
      },
      {
        fa: "بازدیدهای مستمر و سرزده از سلف سرویس‌ها و مراکز توزیع غذای خوابگاه‌ها",
        en: "Regular unannounced visits to the refectories and the halls' food points",
      },
      {
        fa: "مشاوره تغذیه و برنامه غذایی برای گروه‌های مختلف دانشجویان",
        en: "Nutrition advice and meal plans for different groups of students",
      },
      { fa: "ارتقای سامانه اتوماسیون تغذیه", en: "Improving the dining system" },
    ],
    phone: "08138411211",
  },

  /*------ Disciplinary Council ------*/
  {
    slug: "discipline",
    section: "campus-life",
    name: { fa: "شورای انضباطی", en: "Disciplinary Council" },
    lede: {
      fa: "رسیدگی به تخلفات و شکایات دانشجویی، و آشنایی با قوانین انضباطی.",
      en: "Student misconduct and complaints, and the disciplinary rules.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "مریم رشادی", en: "Maryam Reshadi" },
        jobTitle: { fa: "دبیر شورای انضباطی", en: "Secretary of the disciplinary council" },
        degree: { fa: "کارشناسی ارشد فقه و مبانی حقوق اسلامی", en: "MA in Islamic jurisprudence and law" },
        phone: "08138411436",
        email: "st.shora@hut.ac.ir",
      },
    ],
    links: [],
    intro: {
      fa: "شورای انضباطی دانشجویان تنها مرجع صالح دانشگاه برای رسیدگی به تخلفات و شکایات دانشجویی است. این شورا، افزون بر رسیدگی به تخطی از منش دانشجویی، می‌کوشد از هر برخورد تحقیرآمیز، حتی در جایی که تخلف ثابت شده است، جلوگیری کند.\n\nدبیر شورای انضباطی بدوی، طبق روند زیر، کارهای لازم برای تشکیل پرونده و طرح موضوع در جلسات شورا را انجام می‌دهد.",
      en: "The disciplinary council is the only body at the university that may hear student misconduct and complaints. Besides hearing breaches of student conduct, it takes care that no student is treated with contempt, even when an offence is proven.\n\nThe secretary of the first-instance council prepares each case and brings it before the council, as follows.",
    },
    duties: [
      { fa: "ثبت شکایت و گزارش", en: "Recording the complaint or report" },
      {
        fa: "بررسی انطباق شکایت با مواد ۱ تا ۸ شیوه‌نامه اجرایی رسیدگی به تخلفات دانشجویان",
        en: "Checking it against articles 1 to 8 of the procedure for student misconduct",
      },
      { fa: "گردآوری و اعتبارسنجی مستندات تخلف", en: "Gathering and checking the evidence" },
      {
        fa: "احضار دانشجو، تفهیم اتهام، مصاحبه حضوری و گرفتن دفاعیات",
        en: "Summoning the student, explaining the charge, and hearing their defence in person",
      },
      {
        fa: "طرح موضوع در جلسه شورای انضباطی و تنظیم صورت‌جلسه",
        en: "Bringing the case to the council and writing the minutes",
      },
      { fa: "نگهداری و امانت‌داری پرونده‌های انضباطی", en: "Keeping the case files safe and confidential" },
      {
        fa: "پیگیری مصوبات و درخواست‌های شورای انضباطی مرکزی",
        en: "Following up the central council's decisions and requests",
      },
      {
        fa: "ابلاغ احکام بدوی به دانشجو و احکام قطعی به بخش‌های مرتبط دانشگاه",
        en: "Notifying the student of first-instance rulings, and the university's offices of final ones",
      },
      {
        fa: "پاک کردن آثار احکام از پرونده دانشجو طبق شیوه‌نامه",
        en: "Clearing rulings from the student's record as the procedure allows",
      },
    ],
    phone: "08138411436",
    email: "st.shora@hut.ac.ir",
  },

  /*------ Scientific Associations ------*/
  {
    slug: "associations",
    section: "campus-life",
    name: { fa: "انجمن‌های علمی", en: "Scientific Associations" },
    lede: {
      fa: "انجمن‌های علمی دانشجویی هر رشته: کلاس‌ها، نشست‌ها، بازدیدها و نشریه‌های علمی.",
      en: "The student scientific associations of each field: classes, talks, visits and their journals.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "میثم پیله‌وریان", en: "Meysam Pilehvarian" },
        jobTitle: { fa: "کارشناس انجمن‌های علمی", en: "Scientific associations officer" },
        degree: { fa: "کارشناسی ارشد", en: "Master's degree" },
        phone: "08138411428",
        email: "farhangi@hut.ac.ir",
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D9%BE%DB%8C%D9%84%D9%87+%D9%88%D8%B1%DB%8C%D8%A7%D9%86.png/3eaf97c1-93c6-1a0b-0259-4505375645bf?download=true",
      },
    ],
    links: [],
    intro: {
      fa: "انجمن‌های علمی دانشجویی متناسب با رشته‌های تحصیلی فعالیت می‌کنند. تقویت نشاط علمی دانشجویان، حمایت از پژوهش و فعالیت‌های جمعی و خودجوش آنان، و همراهی دانشجویان مستعد در بالندگی علمی و فرهنگی دانشگاه از اهداف آن‌هاست.\n\nبستر شکوفایی استعدادها، نهادینه کردن فعالیت‌های فوق‌برنامه علمی، مشارکت و رقابت در فعالیت‌های علمی جمعی و ارتباط با استادان، شناسایی دانشجویان نخبه، پیوند دانشگاه با جامعه، برگزاری گردهمایی‌های علمی و انتشار کتاب و نشریه کار این انجمن‌هاست.",
      en: "Each field has its student scientific association. They keep science lively among students, back their research and the projects they start themselves, and help able students grow the university's scientific and cultural life.\n\nThey give talent room to show, make extracurricular science a habit, get students working and competing together and closer to their teachers, find the strongest students, link the university with the wider community, hold scientific meetings, and publish books and journals.",
    },
    duties: [
      {
        fa: "نظارت بر کار انجمن‌های علمی و تشکل‌های دانشجویی بر اساس آیین‌نامه‌ها",
        en: "Overseeing the associations and student groups under their regulations",
      },
      {
        fa: "ارتباط مستمر با دبیران انجمن‌ها و ارتباط آنان با استادان مشاور",
        en: "Keeping in touch with the associations' secretaries and linking them with their faculty advisers",
      },
      {
        fa: "پیگیری درخواست برنامه‌ها (بازدید علمی، همایش، نشست، دوره آموزشی و مسابقه) و گرفتن مجوز آن‌ها",
        en: "Following up requests for visits, conferences, talks, courses and competitions, and getting them approved",
      },
      {
        fa: "پیگیری بیمه‌نامه دانشجویی برای اردوها و بازدیدهای علمی",
        en: "Arranging student insurance for trips and visits",
      },
      { fa: "نگهداری وسایل و اموال انجمن‌ها و تشکل‌ها", en: "Looking after the associations' equipment and property" },
      {
        fa: "برنامه‌های قرآنی و جشنواره‌های قرآن و عترت در دانشگاه، استان و کشور",
        en: "Quran programmes and festivals at university, provincial and national level",
      },
    ],
    phone: "08138411428",
    email: "farhangi@hut.ac.ir",
    lists: [
      {
        title: { fa: "انجمن‌های علمی دانشگاه", en: "Our associations" },
        items: [
          { title: { fa: "انجمن علمی مهندسی برق", en: "Electrical Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی مکانیک", en: "Mechanical Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی شیمی", en: "Chemical Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی کامپیوتر", en: "Computer Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی مواد", en: "Materials Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی پزشکی", en: "Biomedical Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی معدن", en: "Mining Engineering Association" } },
          { title: { fa: "انجمن علمی مهندسی رباتیک", en: "Robotics Association" } },
          { title: { fa: "انجمن علمی شیمی کاتالیست و نانو", en: "Catalysis and Nano Chemistry Association" } },
          { title: { fa: "انجمن علمی مهندسی سیستم‌های انرژی", en: "Energy Systems Engineering Association" } },
          { title: { fa: "شاخه دانشجویی IEEE", en: "IEEE Student Branch" } },
        ],
      },
    ],
  },

  /*------ Cultural Clubs ------*/
  {
    slug: "clubs",
    section: "campus-life",
    name: { fa: "کانون‌های فرهنگی", en: "Cultural Clubs" },
    lede: {
      fa: "کانون‌های فرهنگی دانشجویی، از شعر و تئاتر تا ایرانگردی و کارآفرینی.",
      en: "The students' cultural clubs, from poetry and theatre to travel and entrepreneurship.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "سمیه قوزانی", en: "Somayeh Ghozani" },
        jobTitle: { fa: "کارشناس کانون‌های فرهنگی", en: "Cultural clubs officer" },
        phone: "08138411431",
        email: "farhangi@hut.ac.ir",
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D9%82%D9%88%D8%B2%D8%A7%D9%86%DB%8C.png/b90e313a-ee2f-1ddc-8a6e-ac55913d1417?download=true",
      },
    ],
    links: [],
    duties: [
      {
        fa: "گردآوری و پیگیری درخواست برنامه‌های کانون‌ها برای طرح در شورای فرهنگی دانشگاه",
        en: "Collecting the clubs' event requests and taking them to the university's cultural council",
      },
      {
        fa: "نظارت بر مجمع عمومی و جلسات شورای مرکزی کانون‌ها",
        en: "Overseeing the clubs' general assemblies and central council meetings",
      },
      {
        fa: "پیگیری عملکرد کانون‌ها و گرفتن گزارش عملکرد از آن‌ها",
        en: "Following the clubs' work and collecting their reports",
      },
      {
        fa: "اجرای دستورالعمل‌های وزارتی کانون‌ها و برنامه‌های قرآنی، جشنواره‌ها و مناسبت‌ها",
        en: "Carrying out the ministry's instructions for clubs, Quran programmes, festivals and occasions",
      },
      {
        fa: "برگزاری و نظارت بر انتخابات شورای مرکزی کانون‌ها",
        en: "Running the elections for the clubs' central council",
      },
      { fa: "جلسات فرهنگی و اجرایی با دبیران کانون‌ها", en: "Meeting the clubs' secretaries on culture and logistics" },
      {
        fa: "تهیه گزارش عملکرد کانون‌ها و فعالیت‌های فرهنگی",
        en: "Reporting on the clubs and the university's cultural work",
      },
    ],
    phone: "08138411431",
    email: "farhangi@hut.ac.ir",
    lists: [
      {
        title: { fa: "کانون‌های دانشگاه", en: "Our clubs" },
        items: [
          { title: { fa: "کانون شعر و ادب", en: "Poetry and Literature" } },
          { title: { fa: "کانون ایرانگردی و جهانگردی", en: "Travel" } },
          { title: { fa: "کانون فیلم و عکس", en: "Film and Photography" } },
          { title: { fa: "کانون قرآن و عترت", en: "Quran and Etrat" } },
          { title: { fa: "کانون هلال احمر", en: "Red Crescent" } },
          { title: { fa: "کانون همیاران سلامت", en: "Health Helpers" } },
          { title: { fa: "کانون بازی و سرگرمی", en: "Games" } },
          { title: { fa: "کانون کارآفرینی و مهارت‌افزایی", en: "Entrepreneurship and Skills" } },
          { title: { fa: "کانون مهدویت", en: "Mahdaviat" } },
          { title: { fa: "کانون تئاتر", en: "Theatre" } },
        ],
      },
    ],
  },

  /*------ Student Organisations ------*/
  {
    slug: "organizations",
    section: "campus-life",
    name: { fa: "تشکل‌های دانشجویی", en: "Student Organisations" },
    lede: {
      fa: "هیئت‌های دانشجویی، بسیج دانشجویی و نمازخانه دانشگاه.",
      en: "The student religious circles, the Basij, and the university's prayer hall.",
    },
    feedCategory: "student",
    members: [
      {
        role: "staff",
        name: { fa: "محمود رابطی رنجبر", en: "Mahmoud Rabeti Ranjbar" },
        jobTitle: { fa: "کارشناس تشکل‌های دانشجویی", en: "Student organisations officer" },
        phone: "08138411427",
        email: "farhangi@hut.ac.ir",
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D8%B1%D8%A7%D8%A8%D8%B7%DB%8C.png/478fd6ef-e518-3a6f-7709-5ba2013b90c2?download=true",
      },
    ],
    links: [],
    duties: [
      { fa: "هماهنگی امور نمازخانه دانشگاه و اقامه نماز", en: "Running the university's prayer hall and its prayers" },
    ],
    phone: "08138411427",
    email: "farhangi@hut.ac.ir",
    lists: [
      {
        title: { fa: "تشکل‌ها", en: "The organisations" },
        items: [
          {
            title: { fa: "هیئت دانشجویی فاطمیون", en: "Fatemiyoun student circle" },
            text: {
              fa: "از سال ۱۳۸۹ فعال است و مراسم سوگواری و جشن مناسبت‌های مذهبی و هیئت هفتگی برگزار می‌کند.",
              en: "Active since 2010, it holds mourning and celebration ceremonies on religious occasions and a weekly gathering.",
            },
          },
          {
            title: { fa: "هیئت دانشجویی علامه طباطبایی", en: "Allameh Tabatabaei student circle" },
            text: {
              fa: "هیئت دانشجویی دیگر دانشگاه، به نام علامه طباطبایی.",
              en: "The university's other student circle, named after Allameh Tabatabaei.",
            },
          },
          {
            title: { fa: "بسیج دانشجویی", en: "Student Basij" },
            text: {
              fa: "سال ۱۳۸۷ در دو حوزه برادران و خواهران تأسیس شد و دوره‌ها، اردوها، یادواره‌ها، همایش‌ها و مسابقه‌های فرهنگی، علمی و دفاعی برگزار می‌کند.",
              en: "Founded in 2008 with a men's and a women's branch, it runs cultural, scientific and defence courses, trips, commemorations, conferences and competitions.",
            },
          },
        ],
      },
    ],
  },
];

/*===== Files =====*/
// Shown on each office's page, grouped as on the forms page.

export const studentOfficeFiles: LibrarySeed = [
  /*------ Guides and rules (welfare) ------*/
  {
    key: "welfare-files",
    icon: "guides",
    office: "welfare",
    title: { fa: "راهنماها و آیین‌نامه‌ها", en: "Guides and rules" },
    groups: [
      {
        title: { fa: "وام‌ها", en: "Loans" },
        documents: [
          {
            title: { fa: "راهنمای تشکیل پرونده اداره رفاه", en: "Opening your welfare file" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C%DB%8C+%D8%AA%D8%B4%DA%A9%DB%8C%D9%84+%D9%BE%D8%B1%D9%88%D9%86%D8%AF%D9%87+%D8%A7%D8%AF%D8%A7%D8%B1%D9%87+%D8%B1%D9%81%D8%A7%D9%87+.pdf/9c80e605-30f6-2bd0-5c62-b017b395b26f",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای دریافت تسهیلات", en: "Getting a loan" },
            url: "https://student.hut.ac.ir/documents/227555/451345/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA+%D8%AA%D8%B3%D9%87%DB%8C%D9%84%D8%A7%D8%AA.pdf/94af1e31-de19-6bcf-f56d-365c3344184c",
            format: "pdf",
          },
          {
            title: { fa: "برگه درخواست وام", en: "Loan application form" },
            url: "https://student.hut.ac.ir/documents/227555/451345/%D8%A8%D8%B1%DA%AF%D9%87+%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA+%D9%88%D8%A7%D9%85.pdf/792d35cc-9f82-81f3-433a-f98d6887f419",
            format: "pdf",
          },
          {
            title: { fa: "جدول انواع وام", en: "The kinds of loan" },
            url: "https://student.hut.ac.ir/documents/227555/451345/%D8%AC%D8%AF%D9%88%D9%84+%D8%A7%D9%86%D9%88%D8%A7%D8%B9+%D9%88%D8%A7%D9%85.pdf/0302cf6e-6971-18ee-0ccf-1efbcaa47644",
            format: "pdf",
          },
          {
            title: {
              fa: "بخشنامه وام‌های دانشجویی نیم‌سال اول ۱۴۰۴–۱۴۰۵",
              en: "Student loan circular, first semester 2025–26",
            },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%A8%D8%AE%D8%B4%D9%86%D8%A7%D9%85%D9%87+%D9%88%D8%A7%D9%85+%D9%87%D8%A7%D9%8A+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%D9%8A%D9%8A+%D9%86%D9%8A%D9%85%D8%B3%D8%A7%D9%84+%D8%A7%D9%88%D9%84+%D8%B3%D8%A7%D9%84+%D8%AA%D8%AD%D8%B5%D9%8A%D9%84%D9%8A+1404-1405.pdf/63a4e8b4-5089-431b-c265-7ee4db1d5c0c",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه پرداخت و بازپرداخت وام", en: "Paying and repaying loans" },
            url: "https://student.hut.ac.ir/documents/227555/451345/%D8%A2%DB%8C%DB%8C%D9%86+%D9%86%D8%A7%D9%85%D9%87+%D9%BE%D8%B1%D8%AF%D8%A7%D8%AE%D8%AA+%D9%88+%D8%A8%D8%A7+%D9%BE%D8%B1%D8%AF%D8%A7%D8%AE%D8%AA+%D9%88%D8%A7%D9%85.pdf/98548b6a-6e77-5e7e-8a46-021267a8c99f",
            format: "pdf",
          },
          {
            title: { fa: "فرم سه‌برگی سند تعهدنامه دانشجویی", en: "Student undertaking (three-page form)" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D9%81%D8%B1%D9%85+3%D8%A8%D8%B1%DA%AF%DB%8C+%D8%B3%D9%86%D8%AF+%D8%AA%D8%B9%D9%87%D8%AF%D9%86%D8%A7%D9%85%D9%87+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C%DB%8C.pdf/9f6be4fb-0365-6630-d14a-532cfccba1e8",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "همیار دانشجو", en: "Student aid scheme" },
        documents: [
          {
            title: { fa: "راهنمای ثبت‌نام همیار دانشجو", en: "Signing up for the student aid scheme" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%AB%D8%A8%D8%AA+%D9%86%D8%A7%D9%85+%D9%87%D9%85%DB%8C%D8%A7%D8%B1+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88+.pdf/bf511cd4-0cdb-f636-63f4-8f775554e184",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه همیار دانشجو", en: "The student aid scheme's rules" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D9%87%D9%85%DB%8C%D8%A7%D8%B1+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88.pdf/fa07e983-162a-c45c-6e2f-022760ac2e16",
            format: "pdf",
          },
        ],
      },
    ],
  },

  /*------ Guides and rules (dorms) ------*/
  {
    key: "dorms-files",
    icon: "guides",
    office: "dorms",
    title: { fa: "راهنماها و آیین‌نامه‌ها", en: "Guides and rules" },
    groups: [
      {
        title: { fa: "سامانه یکپارچه صندوق رفاه", en: "The welfare fund's system" },
        documents: [
          {
            title: { fa: "ورود و ثبت‌نام در سامانه یکپارچه صندوق رفاه", en: "Signing in and registering" },
            url: "https://student.hut.ac.ir/documents/227555/0/1677492397-11.pdf/88f89265-7ef1-368c-47dc-5ed8b0350569",
            format: "pdf",
          },
          {
            title: { fa: "ثبت اطلاعات در سامانه یکپارچه صندوق رفاه", en: "Entering your details" },
            url: "https://student.hut.ac.ir/documents/227555/0/1677492491-12.pdf/5f290ccc-af7d-6185-8167-6ab6d1133155",
            format: "pdf",
          },
          {
            title: {
              fa: "درخواست خوابگاه و پرداخت بدهی خوابگاه در سامانه",
              en: "Asking for a room and paying housing debts",
            },
            url: "https://student.hut.ac.ir/documents/227555/0/1677492679-14.pdf/8ed2cb3e-7cc3-3fe4-fded-77500d01de30",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "خوابگاه‌ها", en: "The halls" },
        documents: [
          {
            title: {
              fa: "راهنمای ثبت درخواست خوابگاه (سامانه ستاره جهان‌گستر)",
              en: "Asking for a room (Setareh Jahangostar system)",
            },
            url: "https://student.hut.ac.ir/documents/227555/0/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA+%D8%A7%D8%AA%D8%A7%D9%82.pdf/a7c20bbd-5a33-8955-09eb-383e52c05fb3",
            format: "pdf",
          },
          {
            title: { fa: "نشانی خوابگاه‌ها", en: "Where the halls are" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%A2%D8%AF%D8%B1%D8%B3+%D8%AE%D9%88%D8%A7%D8%A8%DA%AF%D8%A7%D9%87.pdf/d231e930-e255-caca-77d4-070f56fb48b6",
            format: "pdf",
          },
          {
            title: { fa: "تعرفه سراهای دانشجویی", en: "Hall fees" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%AA%D8%B9%D8%B1%D9%81%D9%87+%D8%B3%D8%B1%D8%A7%D9%87%D8%A7%DB%8C+.pdf/5eba84a0-1ef7-a764-403f-086d3760d6e9",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه تعهد خوابگاهی", en: "The residents' undertaking" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%A2%DB%8C%DB%8C%D9%86+%D9%86%D8%A7%D9%85%D9%87+%D8%AA%D8%B9%D9%87%D8%AF+%D8%AE%D9%88%D8%A7%D8%A8%DA%AF%D8%A7%D9%87%DB%8C.pdf/b32637ab-f5e2-db83-f61f-8222da8c8496",
            format: "pdf",
          },
        ],
      },
    ],
  },

  /*------ Guide and prices (dining) ------*/
  {
    key: "dining-files",
    icon: "files",
    office: "dining",
    title: { fa: "راهنما و تعرفه‌ها", en: "Guide and prices" },
    groups: [
      {
        title: { fa: "رزرو و قیمت غذا", en: "Booking and prices" },
        documents: [
          {
            title: { fa: "راهنمای سامانه تغذیه", en: "Using the dining system" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D8%A2%D9%85%D9%88%D8%B2%D8%B4+%D9%BE%D9%86%D9%84+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88+%D9%86%D8%B1%D9%85+%D8%A7%D9%81%D8%B2%D8%A7%D8%B1+%D8%B3%D8%AA%D8%A7%D8%B1%D9%87.pdf/5a7f5a03-1a3f-b404-ccf9-37c6bdad1600",
            format: "pdf",
          },
          {
            title: { fa: "قیمت غذای مصوب وزارت علوم", en: "Meal prices set by the ministry" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D9%82%DB%8C%D9%85%D8%AA+%D8%BA%D8%B0%D8%A7.pdf/ea13792c-ca19-6cb5-64f5-6141f680575a",
            format: "pdf",
          },
          {
            title: { fa: "بخشنامه قیمت غذا", en: "Meal price circular" },
            url: "https://web.hut.ac.ir/documents/227555/0/%D9%BE%D9%8A%D9%88%D8%B3%D8%AA-%D8%A8%D8%AE%D8%B4%D9%86%D8%A7%D9%85%D9%87+%D9%82%D9%8A%D9%85%D8%AA+%D8%BA%D8%B0%D8%A7-%D8%B3%D8%A7%D9%84+%D8%AA%D8%AD.pdf/152d257b-bc21-748e-996b-5afdf3ae984a",
            format: "pdf",
          },
        ],
      },
    ],
  },

  /*------ Rules and procedures (discipline) ------*/
  {
    key: "discipline-files",
    icon: "regulations",
    office: "discipline",
    title: { fa: "قوانین و شیوه‌نامه‌ها", en: "Rules and procedures" },
    groups: [
      {
        title: { fa: "قوانین انضباطی", en: "The disciplinary rules" },
        documents: [
          {
            title: { fa: "آشنایی دانشجویان با قوانین انضباطی", en: "The disciplinary rules for students" },
            url: "https://student.hut.ac.ir/documents/227555/0/%D8%B4%DB%8C%D9%88%D9%87+%D9%86%D8%A7%D9%85%D9%87+%D8%A7%D9%86%D8%B6%D8%A8%D8%A7%D8%B7%DB%8C+%D8%B4%D9%87%D8%B1%DB%8C%D9%88%D8%B1+1403.pdf/e53e6fb2-07b8-efc7-0268-37dbb1034cc3",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه انضباطی دانشجویان", en: "Student disciplinary regulations" },
            url: "https://student.hut.ac.ir/documents/227555/451259/%D9%85%D8%AA%D9%86+%DA%A9%D8%AA%D8%A7%D8%A8%DA%86%D9%87+%D8%A2%DB%8C%DB%8C%D9%86+%D9%86%D8%A7%D9%85%D9%87-+%D8%B3%D9%86%D8%AF+%D8%A8%D8%A7%D9%84%D8%A7%D8%AF%D8%B3%D8%AA%DB%8C.pdf/57fa7684-f487-fa07-798b-7fa9ee9a176e",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه انضباطی", en: "Disciplinary procedure" },
            url: "https://student.hut.ac.ir/documents/227555/5166869/document.pdf/1b601476-677c-5e4f-212e-18b642b43b08",
            format: "pdf",
          },
          {
            title: { fa: "فلوچارت کلی رسیدگی به پرونده", en: "How a case is handled (flowchart)" },
            url: "https://web.hut.ac.ir/documents/227555/451259/%D9%81%D9%84%D9%88%DA%86%D8%A7%D8%B1%D8%AA+%DA%A9%D9%84%DB%8C+%D8%B1%D8%B3%DB%8C%D8%AF%DA%AF%DB%8C+%D8%A8%D9%87+%D9%BE%D8%B1%D9%88%D9%86%D8%AF%D9%87.pdf/fc9affaa-58e1-e0da-66f6-32dfc8b61382",
            format: "pdf",
          },
        ],
      },
    ],
  },
];

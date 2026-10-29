import type { LibrarySeed } from "#/db/pages/library";
import type { OfficeSeed } from "#/db/pages/offices";

/*===== Vice-Presidencies =====*/
// The vice-presidencies and two offices under the president, from their own sites on 2026-10-29: edu.hut.ac.ir
// (education and research, and its research affairs), student.hut.ac.ir (student and cultural affairs), daf.hut.ac.ir
// (administration and finance) and jazb.hut.ac.ir (faculty recruitment). Persian is the old pages' text, tidied; ledes
// and English are written here. Each vice-presidency's units are a card list linking to their pages.

export const vicePresidencies: OfficeSeed[] = [
  /*------ Education and Research ------*/
  {
    slug: "vp-education",
    section: "education",
    name: { fa: "معاونت آموزشی و پژوهشی", en: "Vice-Presidency for Education and Research" },
    lede: {
      fa: "سیاست‌ها و برنامه‌های آموزشی و پژوهشی دانشگاه، و اداره‌هایی که آن‌ها را اجرا می‌کنند.",
      en: "The university's education and research policy, and the offices that carry it out.",
    },
    intro: {
      fa: "معاون آموزشی و پژوهشی ریاست شورای آموزشی دانشگاه را بر عهده دارد و واحدهای تابعه را در اجرای سیاست‌ها و برنامه‌های مصوب دانشگاه در آموزش هدایت می‌کند و بر اجرای آن‌ها نظارت دارد. جمع‌بندی نظرات دانشکده‌ها درباره برنامه‌های آموزشی و پیشنهاد آن‌ها به شورای دانشگاه، انعکاس نظرات دانشگاه در امور آموزشی به وزارت علوم، تحقیقات و فناوری، اجرای بخشنامه‌ها و تعیین ضوابط مقاطع کارشناسی ارشد و دکتری نیز بر عهده این معاونت است.\n\nبررسی و تصمیم‌گیری درباره مسائل آموزشی، تنظیم برنامه‌های درسی و امتحانی، فراهم کردن زمینه ارتباط با دانشگاه‌های داخل و خارج کشور، نظارت بر آزمون‌های کارشناسی ارشد و دکتری در حوزه دانشگاه، اجرای دوره‌های کوتاه‌مدت و گسترش خدمات رایانه‌ای در خدمت اهداف آموزشی دانشگاه از دیگر وظایف این معاونت است.",
      en: "The vice-president for education and research chairs the university's education council, guides the offices under it in carrying out the university's approved education policy, and oversees how it is done. The vice-presidency also gathers the faculties' views on teaching programmes and puts them to the university council, speaks for the university on teaching to the Ministry of Science, Research and Technology, carries out its circulars, and sets the rules for master's and doctoral studies.\n\nIts other work: deciding on teaching matters, setting course and exam schedules, building ties with universities in Iran and abroad, overseeing the master's and doctoral entrance exams held at the university, running short courses, and extending computing services to serve the university's teaching.",
    },
    duties: [
      {
        fa: "تهیه سیاست‌ها، خط‌مشی‌ها و چشم‌انداز آموزشی دانشگاه و پیگیری تصویب، ابلاغ، اجرا و به‌روزرسانی آن‌ها",
        en: "Drafting the university's teaching policy, guidelines and outlook, and seeing them approved, issued, carried out and kept up to date",
      },
      {
        fa: "برنامه‌ریزی امور آموزشی و تحصیلات تکمیلی و نظارت بر برنامه‌ها و فعالیت‌های آموزشی هر دانشکده",
        en: "Planning undergraduate and graduate teaching, and overseeing each faculty's programmes",
      },
      {
        fa: "تهیه برنامه‌های کوتاه‌مدت، میان‌مدت و بلندمدت آموزشی دانشگاه با همکاری دانشکده‌ها و مراکز",
        en: "Preparing the university's short-, medium- and long-term teaching plans with the faculties and centres",
      },
      {
        fa: "پایش وضعیت آموزشی دانشگاه و شناسایی نقاط قوت، ضعف، فرصت‌ها و تهدیدها",
        en: "Monitoring the state of teaching and naming its strengths, weaknesses, opportunities and threats",
      },
      {
        fa: "بررسی راه‌اندازی رشته‌ها، گروه‌های آموزشی و دوره‌های تحصیلات تکمیلی جدید",
        en: "Reviewing proposals for new programmes, departments and graduate courses",
      },
      {
        fa: "ارزیابی عملکرد آموزشی دانشجویان، استادان و مدیران آموزشی در هر نیم‌سال و اعلام نتیجه به ریاست دانشگاه",
        en: "Evaluating the teaching record of students, faculty and academic managers every semester and reporting it to the president",
      },
      { fa: "نظارت بر اجرای مقررات و آیین‌نامه‌های آموزشی", en: "Overseeing how the teaching regulations are applied" },
      {
        fa: "بررسی صلاحیت علمی داوطلبان عضویت در هیئت علمی، پس از تأیید گروه آموزشی",
        en: "Reviewing the academic standing of candidates for the faculty, after their department approves them",
      },
    ],
    phone: "08138411100",
    fax: "08138411528",
    email: "eduvice@hut.ac.ir",
    feedCategory: "education",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "مهدی پورعبدلی", en: "Mehdi Pourabdoli" },
        jobTitle: { fa: "معاون آموزشی و پژوهشی", en: "Vice-president for education and research" },
        rank: "associate",
        degree: { fa: "دکتری مهندسی مواد", en: "PhD in materials engineering" },
        resumeUrl: "https://edu.hut.ac.ir/documents/228119/0/Resume.pdf/06da67a4-2bbc-4c8e-b41a-f4831b0faa1d",
        photoUrl:
          "https://edu.hut.ac.ir/documents/228119/0/poorabdoli.jpg/a3787d1f-f286-94a8-c9f5-16fb3dc4035e?download=true",
      },
      {
        role: "staff",
        name: { fa: "علی لطف", en: "Ali Lotf" },
        jobTitle: { fa: "مسئول دفتر", en: "Head of the vice-president's office" },
        degree: { fa: "کارشناسی ارشد ریاضی", en: "MSc in mathematics" },
        phone: "08138411528",
        photoUrl: "https://edu.hut.ac.ir/documents/228119/0/2.jpg/a005e5f3-b4fc-2e88-b40f-7aca52b354c1?download=true",
      },
    ],
    links: [],
    lists: [
      {
        title: { fa: "اداره‌ها و مدیریت‌ها", en: "Offices" },
        items: [
          {
            title: { fa: "اداره امور خدمات آموزشی", en: "Academic Services Office" },
            text: { fa: "انتخاب واحد، کلاس‌ها و امتحانات", en: "Registration, classes and exams" },
            url: "/offices/academic-services",
          },
          {
            title: { fa: "اداره تحصیلات تکمیلی", en: "Graduate Studies Office" },
            text: { fa: "کارشناسی ارشد و دکتری", en: "Master's and doctoral studies" },
            url: "/offices/graduate",
          },
          {
            title: { fa: "اداره پذیرش و دانش‌آموختگان", en: "Admissions and Alumni Office" },
            text: { fa: "ثبت‌نام، تسویه و مدارک", en: "Enrolment, clearance and certificates" },
            url: "/offices/alumni-affairs",
          },
          {
            title: { fa: "مدیریت امور پژوهشی", en: "Research Affairs" },
            text: { fa: "طرح‌ها، گرنت‌ها و همایش‌ها", en: "Projects, grants and conferences" },
            url: "/offices/research-affairs",
          },
          {
            title: { fa: "نودانشجویان", en: "New students" },
            text: { fa: "ثبت‌نام و نخستین روزهای دانشگاه", en: "Enrolment and the first days" },
            url: "/new-students",
          },
        ],
      },
    ],
  },

  /*------ Student and Cultural Affairs ------*/
  {
    slug: "vp-student-affairs",
    section: "campus-life",
    name: { fa: "معاونت دانشجویی و فرهنگی", en: "Vice-Presidency for Student and Cultural Affairs" },
    lede: {
      fa: "رفاه، خوابگاه، تغذیه، سلامت و انضباط دانشجویان، و برنامه‌های فرهنگی دانشگاه.",
      en: "Students' welfare, housing, meals, health and discipline, and the university's cultural life.",
    },
    intro: {
      fa: "معاونت دانشجویی و فرهنگی دانشگاه صنعتی همدان از دو بخش دانشجویی و فرهنگی‌اجتماعی تشکیل شده است. این معاونت در حوزه دانشجویی سیاست‌گذاری، برنامه‌ریزی، سازماندهی و نظارت بر امور رفاهی، معیشتی، صنفی، سلامت و تندرستی و انضباطی دانشجویان را بر عهده دارد و از راه مدیریت‌های تابعه به اهداف خود می‌رسد.\n\nدر حوزه فرهنگی‌اجتماعی، همت این معاونت ساختن بستری برای پاسخ به نیازهای فرهنگی، مذهبی و اجتماعی دانشجویان، استادان و کارکنان است.",
      en: "The vice-presidency has two sides, student affairs and cultural and social affairs. On the student side it sets policy for, plans, organises and oversees students' welfare, living costs, representation, health and discipline, working through the offices under it.\n\nOn the cultural side it builds room for the cultural, religious and social needs of students, faculty and staff.",
    },
    phone: "08138411436",
    email: "stdvice@hut.ac.ir",
    feedCategory: "student",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "مجتبی حسینی تودشکی", en: "Mojtaba Hosseini Toodeshki" },
        jobTitle: { fa: "معاون دانشجویی و فرهنگی", en: "Vice-president for student and cultural affairs" },
        rank: "assistant",
        degree: { fa: "دکتری مهندسی برق", en: "PhD in electrical engineering" },
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D8%AA%D9%88%D8%AF%D8%B4%DA%A9%DB%8C.jpg/7d5660b5-8911-dd27-69ac-8e7a4b172f88?download=true",
      },
      {
        role: "staff",
        name: { fa: "علی‌اکبر ناصری", en: "Ali Akbar Naseri" },
        jobTitle: { fa: "مدیر امور دانشجویی", en: "Director of student affairs" },
        degree: { fa: "کارشناسی ارشد تربیت بدنی", en: "MSc in physical education" },
        phone: "08138411435",
        photoUrl:
          "https://student.hut.ac.ir/documents/227555/0/%D9%86%D8%A7%D8%B5%D8%B1.png/ba9b7772-da45-7b7d-23fa-49e77092acfe?download=true",
      },
      {
        role: "staff",
        name: { fa: "مریم رشادی", en: "Maryam Reshadi" },
        jobTitle: { fa: "مسئول دفتر", en: "Head of the vice-president's office" },
        phone: "08138411436",
        email: "std@hut.ac.ir",
      },
    ],
    links: [],
    lists: [
      {
        title: { fa: "امور دانشجویی", en: "Student affairs" },
        items: [
          {
            title: { fa: "خدمات رفاهی دانشجویی", en: "Student Welfare" },
            text: { fa: "وام‌ها، بیمه و کار دانشجویی", en: "Loans, insurance and student jobs" },
            url: "/offices/welfare",
          },
          {
            title: { fa: "اداره خوابگاه‌ها", en: "Student Housing" },
            text: { fa: "اسکان و سرویس رفت‌وآمد", en: "Rooms and the shuttle" },
            url: "/offices/dorms",
          },
          {
            title: { fa: "اداره تغذیه", en: "Dining Office" },
            text: { fa: "سلف و رزرو غذا", en: "The refectory and meal booking" },
            url: "/offices/dining",
          },
          {
            title: { fa: "شورای انضباطی", en: "Disciplinary Council" },
            text: { fa: "رسیدگی به تخلفات دانشجویی", en: "Student misconduct cases" },
            url: "/offices/discipline",
          },
          {
            title: { fa: "مرکز مشاوره و سبک زندگی", en: "Counselling Centre" },
            text: { fa: "مشاوره برخط", en: "Online counselling" },
            url: "/consultation",
          },
        ],
      },
      {
        title: { fa: "امور فرهنگی و ورزش", en: "Culture and sport" },
        items: [
          { title: { fa: "انجمن‌های علمی", en: "Scientific Associations" }, url: "/offices/associations" },
          { title: { fa: "کانون‌های فرهنگی", en: "Cultural Clubs" }, url: "/offices/clubs" },
          { title: { fa: "تشکل‌های دانشجویی", en: "Student Organisations" }, url: "/offices/organizations" },
          { title: { fa: "اداره تربیت بدنی", en: "Physical Education Office" }, url: "/offices/sports" },
        ],
      },
    ],
  },

  /*------ Administration and Finance ------*/
  {
    slug: "vp-admin",
    section: "about",
    name: { fa: "معاونت اداری و مالی", en: "Vice-Presidency for Administration and Finance" },
    lede: {
      fa: "امور اداری، پشتیبانی و مالی دانشگاه، بودجه و سامانه‌های کارکنان.",
      en: "The university's administration, support services, finances and budget, and the staff systems.",
    },
    duties: [
      {
        fa: "ابلاغ مصوبات، مقررات و آیین‌نامه‌های ابلاغی رئیس دانشگاه به واحدهای مربوط و نظارت بر اجرای آن‌ها",
        en: "Passing the president's decisions, rules and regulations to the offices concerned and overseeing how they are applied",
      },
      {
        fa: "تدوین آیین‌نامه‌ها، دستورالعمل‌ها و دستور جلسات مرتبط با وظایف معاونت برای تصویب",
        en: "Drafting the vice-presidency's regulations, instructions and meeting agendas for approval",
      },
      {
        fa: "نظارت بر واحدهای تابعه برای اطمینان از اجرای درست وظایف آن‌ها",
        en: "Overseeing the offices under it to make sure they do their work properly",
      },
      {
        fa: "ارائه گزارش‌های لازم درباره واحدهای تحت نظر به رئیس دانشگاه",
        en: "Reporting to the president on the offices it oversees",
      },
      {
        fa: "پیشنهاد افراد شایسته برای سمت‌های مدیریتی حوزه معاونت به رئیس دانشگاه",
        en: "Proposing qualified people for the vice-presidency's management posts",
      },
      {
        fa: "همکاری با معاونت‌های دیگر برای اجرای اهداف، وظایف و برنامه‌های دانشگاه",
        en: "Working with the other vice-presidencies on the university's aims and plans",
      },
      {
        fa: "اداره امور اداری، پشتیبانی و مالی دانشگاه مطابق مصوبات و مقررات",
        en: "Running the university's administration, support services and finances under its rules",
      },
      {
        fa: "هماهنگی گردش کار و روش‌های کاری واحدها در راستای اهداف اجرایی دانشگاه",
        en: "Keeping the offices' workflows and methods in step with the university's goals",
      },
      {
        fa: "نظارت بر مصرف اعتبارات واحدها بر اساس بودجه تفصیلی مصوب هیئت امنا و گزارش آن به هیئت امنا",
        en: "Overseeing each office's spending against the budget approved by the board of trustees, and reporting it to the board",
      },
      {
        fa: "شناسایی نقاط قوت، تنگناها، فرصت‌ها و تهدیدها برای پیشنهاد راهبردهای بهبود",
        en: "Naming strengths, bottlenecks, opportunities and threats to propose ways forward",
      },
      {
        fa: "تشکیل کمیته تدوین روش‌های اجرایی برای بهبود تعاملات اداری میان واحدها",
        en: "Setting up a committee on procedures to improve how the offices work together",
      },
      {
        fa: "شناسایی درآمدها و کنترل چرخه مالی برای گزارش‌های مدیریتی و انضباط مالی",
        en: "Tracking income and controlling the financial cycle for management reports and financial discipline",
      },
      {
        fa: "شرکت در جلسات و کمیسیون‌های تصمیم‌گیری درباره مسائل مالی و اداری دانشگاه",
        en: "Taking part in the meetings and committees that decide the university's financial and administrative matters",
      },
    ],
    phone: "08138380420",
    email: "adminvice@hut.ac.ir",
    feedCategory: "university",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "عباس فتاحی", en: "Abbas Fattahi" },
        jobTitle: { fa: "معاون اداری و مالی", en: "Vice-president for administration and finance" },
        rank: "assistant",
        degree: { fa: "دکتری مهندسی برق", en: "PhD in electrical engineering" },
        email: "fatahi@hut.ac.ir",
        resumeUrl: "https://ee.hut.ac.ir/~fattahi/home",
        photoUrl:
          "https://daf.hut.ac.ir/documents/226980/0/fatahi.jpg/c6869b28-ae17-4c80-bd4a-e58152fc42fa?download=true",
      },
      {
        role: "staff",
        name: { fa: "امیر نامدارمنش", en: "Amir Namdarmanesh" },
        jobTitle: { fa: "مسئول دفتر", en: "Head of the vice-president's office" },
        phone: "08138380420",
        photoUrl: "https://daf.hut.ac.ir/documents/226980/0/nam.jpg/68140d04-ae1d-0ddc-03f6-9170a374a26d?download=true",
      },
    ],
    links: [
      {
        title: { fa: "سامانه حضور و غیاب", en: "Attendance" },
        description: { fa: "ورود و خروج کارکنان", en: "Staff clock-in" },
        url: "http://io.hut.ac.ir/eosLogin.aspx",
        icon: "system",
      },
      {
        title: { fa: "اتوماسیون اداری", en: "Office automation" },
        description: { fa: "نامه‌ها و گردش کار", en: "Letters and workflow" },
        url: "https://eoffice.hut.ac.ir/",
        icon: "system",
      },
    ],
  },

  /*------ Research Affairs ------*/
  {
    slug: "research-affairs",
    section: "research",
    name: { fa: "مدیریت امور پژوهشی", en: "Research Affairs" },
    lede: {
      fa: "طرح‌های پژوهشی، گرنت‌ها و هزینه شرکت در همایش‌ها، و گزارش‌های JCR.",
      en: "Research projects, grants, conference funding and the JCR reports.",
    },
    phone: "08138411546",
    feedCategory: "industry",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "حمیدرضا شاه‌دوستی", en: "Hamidreza Shahdoosti" },
        jobTitle: { fa: "مدیر امور پژوهشی", en: "Director of research affairs" },
        rank: "associate",
        photoUrl:
          "https://edu.hut.ac.ir/documents/228119/0/%D8%B4%D8%A7%D9%87+%D8%AF%D9%88%D8%B3%D8%AA%DB%8C+%281%29.jpg/b4fe3997-4fb2-d885-1559-f6ac881b3072?download=true",
      },
      {
        role: "staff",
        name: { fa: "آرزو انصاری دلشاد", en: "Arezoo Ansari Delshad" },
        jobTitle: { fa: "کارشناس امور پژوهشی", en: "Research affairs officer" },
        phone: "08138411546",
        photoUrl:
          "https://edu.hut.ac.ir/documents/228119/0/%D8%A7%D9%86%D8%B5%D8%A7%D8%B1%DB%8C.jpg/42efc17a-3754-e21f-da6d-b3d5d64b6fa4?download=true",
      },
    ],
    links: [
      {
        title: { fa: "فرم‌ها و آیین‌نامه‌های پژوهشی", en: "Research forms and regulations" },
        description: { fa: "همایش‌ها، طرح‌ها و گرنت‌ها", en: "Conferences, projects and grants" },
        url: "/forms#forms-research",
        icon: "regulations",
      },
    ],
    lists: [
      {
        title: { fa: "زیرمجموعه‌ها", en: "Units" },
        items: [
          { title: { fa: "کتابخانه مرکزی", en: "Central Library" }, url: "/offices/library" },
          { title: { fa: "گروه تحقیقات کاربردی و ارتباط با صنعت", en: "Industry Liaison" }, url: "/offices/industry" },
          { title: { fa: "آزمایشگاه مرکزی", en: "Central Laboratory" }, url: "/offices/central-lab" },
          { title: { fa: "اداره انتشارات", en: "University Press" }, url: "/offices/press" },
        ],
      },
    ],
  },

  /*------ Faculty Recruitment ------*/
  {
    slug: "recruitment",
    section: "about",
    name: { fa: "هیئت اجرایی جذب اعضای هیئت علمی", en: "Faculty Recruitment Board" },
    lede: {
      fa: "فراخوان جذب، بررسی صلاحیت علمی و عمومی متقاضیان، و استخدام و تبدیل وضعیت اعضای هیئت علمی.",
      en: "Calls for faculty, the review of applicants' academic and general standing, and faculty hiring and tenure.",
    },
    intro: {
      fa: "شورای عالی انقلاب فرهنگی در سال ۱۳۸۶ با تصویب آیین‌نامه‌ای، ساختار تازه‌ای برای جذب و تبدیل وضعیت استخدامی اعضای هیئت علمی دانشگاه‌ها و مراکز تحقیقاتی تعریف کرد تا از توان دانش‌آموختگان کارآمد بهره بگیرد، نیروهای جوان داخل و خارج کشور را جذب کند، شیوه جذب را یکسان کند و دیوان‌سالاری را کاهش دهد.\n\nدر این ساختار سه سطح وجود دارد: هیئت عالی جذب زیر نظر شورای عالی انقلاب فرهنگی؛ هیئت مرکزی جذب در وزارت علوم، تحقیقات و فناوری و وزارت بهداشت، که بر جذب و تبدیل وضعیت نظارت می‌کند؛ و هیئت‌های اجرایی جذب در هر دانشگاه، که صلاحیت علمی و عمومی متقاضیان را بررسی می‌کنند.\n\nترکیب هیئت اجرایی جذب دانشگاه: رئیس دانشگاه (رئیس هیئت)، مسئول نهاد نمایندگی مقام معظم رهبری در دانشگاه، و پنج تا هفت عضو هیئت علمی به پیشنهاد رئیس دانشگاه و انتخاب هیئت عالی جذب. دبیر هیئت از میان اعضا و با حکم رئیس دانشگاه منصوب می‌شود.",
      en: "In 2007 the Supreme Council of the Cultural Revolution set out a new way to hire faculty and change their employment status at universities and research centres: to draw on able graduates, attract young researchers from Iran and abroad, make hiring the same everywhere and cut red tape.\n\nIt has three levels: the high board under the Council; a central board in each of the two ministries (science, and health), which oversees hiring and tenure; and an executive board at each university, which reviews applicants' academic and general standing.\n\nThe university's executive board is the president (who chairs it), the head of the Supreme Leader's representative office at the university, and five to seven faculty members proposed by the president and chosen by the high board. Its secretary is one of the members, appointed by the president.",
    },
    duties: [
      {
        fa: "شناسایی و تعیین نیازهای جذب هیئت علمی در گروه‌های آموزشی و پژوهشی",
        en: "Identifying where the departments need new faculty",
      },
      { fa: "فراخوان عمومی برای جذب اعضای هیئت علمی", en: "Publishing calls for faculty" },
      {
        fa: "تصمیم‌گیری درباره نوع استخدام (قراردادی، پیمانی، رسمی آزمایشی، رسمی قطعی، طرح سربازی، مأموریت و انتقال)",
        en: "Deciding the kind of employment (contract, fixed-term, probationary, permanent, military-service scheme, secondment, transfer)",
      },
      {
        fa: "اعلام نظر درباره توانایی علمی و صلاحیت عمومی متقاضیان استخدام و متقاضیان راتبه تحصیلی",
        en: "Ruling on the academic ability and general standing of applicants and of scholarship candidates",
      },
      { fa: "نظارت بر اجرای قوانین و مقررات استخدام اعضای هیئت علمی", en: "Overseeing the rules on hiring faculty" },
      {
        fa: "ارائه گزارش سالانه به هیئت مرکزی جذب وزارت علوم",
        en: "Reporting every year to the ministry's central board",
      },
    ],
    notes: [
      {
        fa: "۱. دریافت درخواست متقاضیان، ۲. بررسی اولیه پرونده در هیئت اجرایی، ۳. تکمیل پرونده و ارسال به کارگروه‌های توانایی علمی و صلاحیت عمومی، ۴. بررسی در کارگروه‌ها، ۵. ارسال نتایج به هیئت اجرایی، ۶. تصمیم هیئت اجرایی، ۷. ارسال خلاصه پرونده به هیئت مرکزی جذب، ۸. تصمیم نهایی هیئت مرکزی، ۹. اعلام نتیجه به متقاضی.",
        en: "1. Applications come in, 2. the board looks at each file, 3. complete files go to the academic and general standing panels, 4. the panels meet, 5. their findings go to the board, 6. the board decides, 7. a summary goes to the ministry's central board, 8. the central board decides, 9. the university tells the applicant.",
      },
    ],
    phone: "08138411539",
    email: "jazb@hut.ac.ir",
    members: [
      {
        role: "head",
        honorific: "doctor",
        name: { fa: "هادی دلاوری", en: "Hadi Delavari" },
        jobTitle: { fa: "دبیر هیئت اجرایی جذب", en: "Secretary of the recruitment board" },
        rank: "associate",
        degree: { fa: "دکتری مهندسی برق", en: "PhD in electrical engineering" },
        phone: "08138411539",
        email: "jazb@hut.ac.ir",
        photoUrl:
          "https://jazb.hut.ac.ir/documents/79287/0/delavari+%281%29.jpg/ccbdc122-ecbd-5643-c41c-35c1ac3209e1?download=true",
      },
      {
        role: "staff",
        name: { fa: "سید محمد امیرحسینی‌پناه", en: "Seyed Mohammad Amir Hosseinipanah" },
        jobTitle: { fa: "کارشناس دبیرخانه", en: "Secretariat officer" },
        phone: "08138411539",
        email: "jazb@hut.ac.ir",
      },
    ],
    links: [],
  },
];

/*===== Files =====*/
// Shown on each office's page, grouped as on the forms page.

export const vicePresidencyFiles: LibrarySeed = [
  /*------ JCR reports (research-affairs) ------*/
  {
    key: "research-affairs-jcr",
    icon: "research",
    office: "research-affairs",
    title: { fa: "گزارش‌های JCR", en: "JCR reports" },
    groups: [
      {
        title: { fa: "گزارش‌های ۲۰۲۴", en: "2024" },
        documents: [
          {
            title: { fa: "JCR 2024، مجله‌ها به تفکیک موضوع", en: "JCR 2024, journals by category" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR+2024+by+categories.xlsx/b09977ac-7876-72c4-d934-27c4f3e59934",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2024، میانه ضریب تأثیر (MIF)", en: "JCR 2024, median impact factor (MIF)" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR_2024_MIF.xlsx/48e24724-daf0-e4d8-a55c-8191a9f9d8d6",
            format: "xlsx",
          },
        ],
      },
      {
        title: { fa: "گزارش‌های پنج سال اخیر", en: "The five years before" },
        documents: [
          {
            title: { fa: "JCR 2023، نخستین فهرست JIF", en: "JCR 2023, first JIF journal list" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/2023_First_JIF_Journal_List.xlsx/bdddfc9c-d660-4c99-3f89-e7e5243afc1b",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2023، مجله‌ها به تفکیک موضوع", en: "JCR 2023, journals by category" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR+2023.xlsx/f5da2f5e-f7aa-63b0-723e-3f3f6445fb52",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2023، میانه ضریب تأثیر (MIF)", en: "JCR 2023, median impact factor (MIF)" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/MIF+2023.xlsx/7ef336fa-6e1e-0513-cbf0-3ee784a03ad0",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2022، مجله‌ها به تفکیک موضوع", en: "JCR 2022, journals by category" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR+2022.xlsx/a0355c29-65c9-bc32-f2b0-44d218b0c4ca",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2022، میانه ضریب تأثیر (MIF)", en: "JCR 2022, median impact factor (MIF)" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/MIF2022.xlsx/373d4b45-8fff-420e-c526-931bf833f681",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2021، مجله‌ها به تفکیک موضوع", en: "JCR 2021, journals by category" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR2021.xls/96484f5c-d15f-af0c-2efc-f44e9481863b",
            format: "xls",
          },
          {
            title: { fa: "JCR 2021، میانه ضریب تأثیر (MIF)", en: "JCR 2021, median impact factor (MIF)" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/MIF20211.xls/10226441-8925-4315-7b60-3c557120b7ff",
            format: "xls",
          },
          {
            title: { fa: "JCR 2020، مجله‌ها به تفکیک موضوع", en: "JCR 2020, journals by category" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/ALL-JCR2020-Categories.xls/8b15a66d-3f90-9d7b-14de-33cc35559c38",
            format: "xls",
          },
          {
            title: { fa: "JCR 2020، همه مجله‌ها", en: "JCR 2020, all journals" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR-2020-.xls/87b97185-a8bb-fa47-ecdf-6cbe03f2c188",
            format: "xls",
          },
          {
            title: { fa: "JCR 2019، مجله‌ها به تفکیک موضوع", en: "JCR 2019, journals by category" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR+2019-By+Categories.xlsx/b59d8218-5f2a-ebba-2375-88a49b07cff1",
            format: "xlsx",
          },
          {
            title: { fa: "JCR 2019، همه مجله‌ها", en: "JCR 2019, all journals" },
            url: "https://edu.hut.ac.ir/documents/228119/18252083/JCR-2019.xlsx/4fadd97d-3a1c-ad02-5e3e-c1d606f7b2db",
            format: "xlsx",
          },
        ],
      },
    ],
  },

  /*------ Documents (recruitment) ------*/
  {
    key: "recruitment-files",
    icon: "regulations",
    office: "recruitment",
    title: { fa: "مدارک", en: "Documents" },
    groups: [
      {
        title: { fa: "متقاضیان", en: "Applicants" },
        documents: [
          {
            title: { fa: "مدارک لازم برای متقاضیان جذب هیئت علمی", en: "What faculty applicants need to submit" },
            url: "https://jazb.hut.ac.ir/documents/79287/215395/MOSTANADAT96.pdf/62137e8c-044a-8bea-4b36-b96c9718f750",
            format: "pdf",
          },
        ],
      },
    ],
  },
];

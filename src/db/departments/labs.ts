import type { LocalizedText } from "#/lib/localized-text";
import type { Honorific, LabFileFormat } from "#/orpc/department/constants";

/*===== Department Labs =====*/
// Each department's labs page (`/departments/<slug>/labs`), from the old site's «آزمایشگاه مهندسی …» pages on
// 2026-10-29. The English is written here from the Persian, freely where the old text was rough. The
// basic sciences page's introduction was placeholder text about the Persian language, so its introduction is written
// here; the mechanical engineering page's term schedules (1402–1403) are out of date and left out.

export type LabsSeed = {
  intro: LocalizedText;
  labs: { name: LocalizedText; description?: LocalizedText; equipment?: LocalizedText[] }[];
  /** Matched to the department's members by name; anyone not among them is added as staff. */
  people: {
    role: "supervisor" | "expert";
    honorific?: Honorific;
    name: LocalizedText;
    note?: LocalizedText;
    phone?: string;
    email?: string;
    photoUrl?: string;
  }[];
  files: { title: LocalizedText; url: string; format: LabFileFormat }[];
};

const MAIN = "https://hut.ac.ir";

export const departmentLabs: Record<string, LabsSeed> = {
  ee: {
    intro: {
      fa: "آزمایشگاههای گروه برق فعالیت خود را از سال ۱۳85 با هدف ارائه خدمات آموزشی به دانشجویان محترم آغاز نموده ‌است. گروه مهندسی برق تلاش نموده‌است با تهیه تجهیزات استاندارد و دقیق، زمینه‌های تحقیقاتی و آزمایشگاهی مهندسی برق را پوشش داده و در جهت رفع نیازهای علمی و آزمایشگاهی دانشجویان گام بردارد. هم‌اکنون آزمایشگاههای این گروه با دارا بودن تجهیزات دقیق و استاندارد آماده انجام کلیه دروس آزمایشگاهی می‌باشد که شامل آزمایشگاه‌های ذیل است.",
      en: "The department's labs opened in 2006 to support teaching. With standard, precise equipment they cover electrical engineering's research and lab work, and are ready for every lab course the department teaches.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه مدار و الکترونیک", en: "Circuits and electronics lab" },
        description: {
          fa: "دراین آزمایشگاه دانشجویان، جنبه های عملی و نرم افزاری مفاهیم و کاربردهای دانش مدارو الکترونیک در طراحی وآزمایش مدارها و سیستم های الکترونیکی پایه را که به صورت تئوری در دروس مدارهای الکتریکی و الکترونیک 1، 2 و3 فرا گرفته اند، مورد بررسی قرار می دهند.",
          en: "Students work through the practical and software side of circuits and electronics, designing and testing the basic circuits and electronic systems they studied in theory in Electric Circuits and Electronics 1, 2 and 3.",
        },
      },
      {
        name: { fa: "آزمایشگاه سیستم های دیجیتال", en: "Digital systems lab" },
        description: {
          fa: "در این آزمایشگاه دانشجویان بصورت عملی با روش‌های تحلیل و طراحی مدارهای منطقی و سیستم‌های دیجیتال از طریق آشنایی با سخت افزار، نرم‌افزار و زبان توصیف سخت‌افزار سیستم‌های دیجیتال توسط ست آموزشی FPGA آشنا می شوند.",
          en: "Hands-on analysis and design of logic circuits and digital systems: students learn the hardware, the software and a hardware description language on FPGA training kits.",
        },
      },
      {
        name: { fa: "آزمایشگاه الکترونیک صنعتی", en: "Industrial electronics lab" },
        description: {
          fa: "الکترونیک صنعتی ترکیبی از قدرت,الکترونیک و کنترل است. کنترل به بررسی مشخصه های دینامیک و حالت پایدار سیستم با حلقه بسته می پردازد.",
          en: "Industrial electronics brings together power, electronics and control; the control side studies the dynamic and steady-state behaviour of closed-loop systems.",
        },
      },
      {
        name: { fa: "آزمایشگاه پردازش سیگنال های دیجیتال", en: "Digital signal processing lab" },
        description: {
          fa: "آشنایی با پردازنده های DSP و چگونگی پیاده سازی الگوریتمهای ریاضی بر روی آنها مد نظر بوده است. تست انواع الگوريتمهاي پردازش سيگنال با استفاده از دو عدد A to D و D to A كه تنظيم آنها به آساني قابل انجام است.",
          en: "An introduction to DSP processors and how mathematical algorithms are implemented on them. Signal-processing algorithms are tested through an A/D and a D/A converter that are easy to configure.",
        },
      },
      {
        name: { fa: "آزمایشگاه ماشین های الکتریکی", en: "Electric machines lab" },
        description: {
          fa: "در این آزمایشگاه دانشجویان ماشینهای DC را در حالتهای ژنراتوری و موتوری در اتصالا ت مختلف می بندند. سپس ماشینهای جریان متناوب سنکرون و آسنکرون و موتورهای تکفاز را مورد آزمایش قرار می دهند. ترانسفورماتورهای تکفاز و سه فاز از دیگر آزمایشهای قابل انجام در این آزمایشگاه می باشد. همچنین دانشجویان در این کارگاه راه اندازی الکتروموتورهای تکفاز و سه فاز و کنترل آنها را فراگرفته و با مدارات قدرت و فرمان آشنا می شوند.",
          en: "Students wire DC machines as generators and motors in different connections, then test synchronous and induction AC machines and single-phase motors. Single- and three-phase transformers are tested here too, and students learn to start and control single- and three-phase motors and to build power and control circuits.",
        },
      },
      {
        name: { fa: "آزمایشگاه کنترل خطی", en: "Linear control lab" },
        description: {
          fa: "در اين آزمايشگا ه دانشجویان با سيستمهاي كنترل خطي آشنا خواهند شد . در اين راستا آزمايشهايي طراحي شده اند كه دانشجویان را با تحليل، پياده سازي و شناسايي فرايندها و كنترل كننده هاي مختلف آشنا نمـوده و پـس از آن با كاربرد اين سيستمها در كنترل چند فرايند آشنا خواهند شد",
          en: "An introduction to linear control systems. The experiments take students through analysing, building and identifying processes and different controllers, and then through using them to control several processes.",
        },
      },
      {
        name: { fa: "آزمایشگاه کنترل صنعتی", en: "Industrial control lab" },
        description: {
          fa: "هدف از این آزمایشگاه، آشنایی عملی دانشجویان با مباحث فنی پیاده سازی کنترل¬ کننده¬ ها در محیط صنعتی است. در این راستا، آموزش و برنامه ¬نویسی کنترل¬ کننده¬ های منطقی برنامه¬ پذیر PLC (Programmable Logic Controller) بطور خاص مورد توجه قرار گرفته است.",
          en: "Practical work on implementing controllers in an industrial setting, with a focus on learning and programming programmable logic controllers (PLCs).",
        },
      },
      {
        name: { fa: "آزمایشگاه ابزار دقیق", en: "Instrumentation lab" },
        description: {
          fa: "آزمايشگاه ابزار دقيق با استفاده از مجموعه هاي آزمايشگاهي و خطوط توليد و كنترل صنعتي شبيه سازي شده ؛ سنسور هاي صنعتي كه در صنعت استفاده مي شود را مورد بررسي قرار مي دهد. در اين آزمايشگاه مي توان با استفاده از سنسورهاي موجود و بردهاي ميكرو كنترلر و PLC موجود در آزمايشگاه پروژه هاي تحقيقاتي مورد نياز در بخش صنعت را انجام داد و سنسورهاي خاص را در بخش تحقيق طراحي و سپس به مرحله توليد صنعتي رساند.",
          en: "Using lab kits and simulated industrial production and control lines, the instrumentation lab studies the sensors used in industry. With its sensors, microcontroller boards and PLCs, it also takes on research projects for industry, and special sensors designed here can be taken through to production.",
        },
      },
      {
        name: { fa: "آزمایشگاه مدارهای مخابراتی", en: "Communication circuits lab" },
        description: {
          fa: "در این آزمایشگاه دانشجویان با عملکرد مدارات و سیستم های مخابراتی آنالوگ بصورت عملی در قالب مجموعه برد های آموزشی آشنا می شونددر این آزمایشگاه به",
          en: "Students learn how analog communication circuits and systems work, hands-on, on a set of training boards.",
        },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "سید محمد عظیمی", en: "Seyed Mohammad Azimi" },
        note: { fa: "سرپرست آزمایشگاه قدرت", en: "Power lab supervisor" },
        phone: "08138411226",
        email: "azimi@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/324711/%D8%B9%D8%B8%DB%8C%D9%85%DB%8C.jpg/0c092abb-967f-f23a-cac5-6653f149bbe3?download=true`,
      },
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "سید محمدمهدی موسوی", en: "Seyed Mohammad Mahdi Moosavi" },
        note: { fa: "سرپرست آزمایشگاه تحقیقاتی", en: "Research lab supervisor" },
        phone: "08138411516",
        email: "moosavi@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/0/%D9%85%D9%88%D8%B3%D9%88%DB%8C.jpg/3dfaa293-7dce-b0c3-edeb-748e43967ff7?download=true`,
      },
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "قاسم علی‌پور", en: "Ghasem Alipoor" },
        note: { fa: "سرپرست آزمایشگاه مخابرات", en: "Communications lab supervisor" },
        phone: "08138411530",
        email: "g.alipoor@gmail.com",
        photoUrl: `${MAIN}/documents/38165/0/%D8%B9%D9%84%DB%8C%D9%BE%D9%88%D8%B1.jpg/fe5088eb-49ac-2e95-209c-ecf9da1304fa?download=true`,
      },
      {
        role: "supervisor",
        honorific: "engineer",
        name: { fa: "محمدحسین دوست‌محمدی", en: "Mohammad Hossein Doostmohammadi" },
        note: { fa: "سرپرست آزمایشگاه الکترونیک", en: "Electronics lab supervisor" },
        phone: "08138411534",
        email: "doost.mohammadi@gmail.com",
        photoUrl: `${MAIN}/documents/38165/0/%D8%AF%D9%88%D8%B3%D8%AA+%D9%85%D8%AD%D9%85%D8%AF%DB%8C.jpg/74553e67-1547-92c4-e46e-3393bec94f13?download=true`,
      },
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "هادی دلاوری", en: "Hadi Delavari" },
        note: { fa: "سرپرست آزمایشگاه کنترل", en: "Control lab supervisor" },
        phone: "08138411528",
        email: "delavari@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/0/%D8%AF%D9%84%D8%A7%D9%88%D8%B1%DB%8C+%281%29.jpg/432471aa-5e3e-d155-9a12-b744d1f57517?download=true`,
      },
      {
        role: "expert",
        name: { fa: "احسان زمانیان", en: "Ehsan Zamanian" },
        note: {
          fa: "مدار و الکترونیک، سیستم‌های دیجیتال، پردازش سیگنال‌های دیجیتال، مدارهای مخابراتی",
          en: "Circuits and electronics, digital systems, DSP, communication circuits",
        },
        phone: "08138411321",
        photoUrl: `${MAIN}/documents/38165/324711/zamanian.jpeg/52df0e54-3feb-2b20-967c-648a4c3fa25b?download=true`,
      },
      {
        role: "expert",
        name: { fa: "رضا میررازی", en: "Reza Mirrazi" },
        note: {
          fa: "الکترونیک صنعتی، ماشین‌های الکتریکی، کارگاه برق",
          en: "Industrial electronics, electric machines, electrical workshop",
        },
        phone: "08138411222",
        photoUrl: `${MAIN}/documents/38165/383947/reza.jpg/adc4ee89-f1c2-c164-b5dd-1bad43abb8f6?download=true`,
      },
    ],
    files: [],
  },
  ce: {
    intro: {
      fa: "گروه مهندسی فناوری اطلاعات یکی از جدیدترین و به‌روزترین بخش‌های دانشگاه صنعتی همدان می‌باشد. این بخش با توجه به نفوذ روز‌افزون فناوری اطلاعات در همه ابعاد زندگی بشر و احساس نیاز مبرم کشور به فارغ‌التحصیلان آن، با هدف آموزش و تعلیم دانشجویان و انجام تحقیقات گسترده و روزآمد در حوزه پر‌ رونق و پویای فناوری اطلاعات و ارتباطات فعالیت می‌نماید. گروه مهندسی نرم‌افزار دانشگاه صنعتی همدان جزء گروه‌های پیشتاز دانشگاه بوده و با تمرکز بر حوزه‌های مرتبط با مهندسی نرم‌افزار و تعامل با گروه‌هایی نظیر مهندسی فناوری اطلاعات و هوش ماشین و رباتیک، زمینه‌های متعدد همکاری میان‌گروهی را فراهم نموده است.",
      en: "The computer engineering labs serve teaching and research across computer engineering, IT and software: networks, databases, operating systems, logic circuits and architecture, and microprocessors.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه شبکه های کامپیوتری", en: "Computer networks lab" },
        description: {
          fa: "تاریخ بشر پر از رویدادهای بزرگ است و هر قرن از زندگی بشر، با یک فناوری شاخص شناخته می‌شود. برای مثال، قرن هجدهم عصر سیستم‌های بزرگ مکانیکی و انقلاب صنعتی بود، قرن نوزدهم عصر بخار نامیده شد، و قرن بیستم که برای ما قرن آشناتری است، عصر جمع‌آوری، پردازش و توزیع اطلاعات بود و تلفن، رادیو، تلویزیون، کامپیوتر و ماهواره‌های مخابراتی همه از اختراعات این قرن بودند که تحول بسیاری را در زندگی بشر ایجاد کرده است.",
          en: "Each century is known for a defining technology: the eighteenth for large mechanical systems and the industrial revolution, the nineteenth for steam, and the twentieth for gathering, processing and distributing information, with the telephone, radio, television, the computer and communication satellites. This lab covers computer networks, the technology that grew out of that last one.",
        },
        equipment: [
          { fa: "آشنایی با انواع شبکه‌ها", en: "Types of networks" },
          { fa: "آشنایی با مفهوم IP Address", en: "IP addresses" },
          { fa: "بررسی توپولوژی‌های مختلف شبکه و ساختار آن", en: "Network topologies and their structure" },
          { fa: "بررسی سیستم عامل شبکه", en: "Network operating systems" },
          { fa: "بررسی تجهیزات شبکه", en: "Network equipment" },
          {
            fa: "راه‌اندازی شبکه Workgroup و نحوه به اشتراک گذاشتن داده‌ها",
            en: "Setting up a workgroup network and sharing data",
          },
          { fa: "امنیت فایل‌ها و داده‌ها در شبکه", en: "File and data security on a network" },
          { fa: "آشنایی با سرورها و کلاینت‌ها", en: "Servers and clients" },
          {
            fa: "آشنایی با شبکه داخلی (Intranet)، شبکه خارجی (Extranet) و شبکه اینترنت (Internet)",
            en: "Intranets, extranets and the internet",
          },
          {
            fa: "آشنایی با تکرارگر (Repeater)، هاب (Hub)، پل (Bridge)، راهگزین (Switch) و مسیریاب (Router)",
            en: "Repeaters, hubs, bridges, switches and routers",
          },
        ],
      },
      {
        name: { fa: "آزمایشگاه پایگاه داده ها", en: "Databases lab" },
        description: {
          fa: "نیاز به تحقیق در مورد علوم و فناوری‌های پیشرفته مرتبط با پایگاه داده از اهداف اصلی این آزمایشگاه می‌باشد. اهمیت فناوری‌های پیشرفته پایگاه داده در سیستم‌های اطلاعاتی بر کسی پوشیده نیست و روز به روز نیز بیشتر نمایان می‌شود. پایگاه داده سالهاست که مورد توجه محققین زیادی در سراسر دنیا می‌باشد و تحقیقات زیادی در این شاخه از مهندسی صورت گرفته است.",
          en: "The lab researches advanced database science and technology. Advanced database technology matters more every year to information systems, and it has drawn researchers around the world for decades.",
        },
        equipment: [
          { fa: "پژوهش و تحقیق در مورد فناوری‌های روز دنیا", en: "Research on current technologies" },
          {
            fa: "جهت‌دهی آموزش دانشجویان در زمینه‌های جدید فناوری پایگاه داده‌ها",
            en: "Guiding students into new areas of database technology",
          },
          { fa: "بیوانفورماتیک و شبکه های اجتماعی", en: "Bioinformatics and social networks" },
          { fa: "پردازش موازی و سیستم‌های توزیع یافته", en: "Parallel processing and distributed systems" },
          { fa: "داده کاوی و انباره‌های داده", en: "Data mining and data warehouses" },
          { fa: "بازیابی هوشمند اطلاعات", en: "Intelligent information retrieval" },
          {
            fa: "مدیریت پایگاه‌های داده (Object Rel ,Object Oriented , XML و Relational)",
            en: "Database management (object-relational, object-oriented, XML and relational)",
          },
          {
            fa: "بهینه‌سازی سیستم‌هاِی اطلاعاتی (GIS, MIS, ERP)",
            en: "Optimizing information systems (GIS, MIS, ERP)",
          },
          {
            fa: "روش‌های هوشمند ارتقاء معماری داده و ارتقاء معماری نرم‌افزار",
            en: "Intelligent methods for improving data and software architecture",
          },
          { fa: "سیستم‌های خبره و چندعاملی", en: "Expert and multi-agent systems" },
        ],
      },
      {
        name: { fa: "آزمایشگاه سیستم عامل", en: "Operating systems lab" },
        description: {
          fa: "سیستم عامل نرم‌افزاری سیستمی است که اجرای برنامه‌های کاربردی را کنترل کرده و به عنوان واسط بین نرم‌افزار و سخت‌افزار کامپیوتر عمل می‌نماید. وظیفه سیستم عامل استفاده و کنترل سخت‌افزار کامپیوتر و ایجاد یک محیط نرم‌افزاری قدرتمند و در عین حال ساده، برای انجام کارهای کاربر است. در آزمایشگاه سیستم عامل بسیاری از مفاهیم عملی سیستم عامل، همراه با کد‌نویسی آموزش داده می‌شود.",
          en: "An operating system is the system software that controls how applications run and sits between software and the computer's hardware, giving the user a powerful yet simple environment. The lab teaches many of its practical concepts, with coding.",
        },
        equipment: [
          {
            fa: "استفاده بهینه‌تر از منابع و جلوگیری از به هدر رفتن آن‌ها",
            en: "Using resources efficiently and without waste",
          },
          { fa: "تخصیص و آزادسازی منابع", en: "Allocating and releasing resources" },
          { fa: "اداره صف‌ها و زمان‌بندی استفاده از منابع", en: "Managing queues and scheduling resource use" },
          { fa: "حسابداری میزان استفاده از منابع", en: "Accounting for resource use" },
          { fa: "ایجاد امنیت", en: "Security" },
          { fa: "ایجاد، حذف و اداره فرایندها", en: "Creating, removing and managing processes" },
          {
            fa: "ایجاد مکانیسم‌های ارتباط بین فرایندها و همگام‌سازی آن‌ها",
            en: "Inter-process communication and synchronization",
          },
          { fa: "مدیریت فایل‌ها و پوشه‌ها", en: "Managing files and folders" },
          { fa: "مدیریت حافظه‌های اصلی و جانبی", en: "Managing main and secondary memory" },
          {
            fa: "برقراری امکان دسترسی چندتایی و اجرای هم‌روند فرایندها",
            en: "Multiple access and concurrent processes",
          },
          { fa: "به اشتراک‌گذاری منابع", en: "Sharing resources" },
          { fa: "تعیین راهکارهایی برای اداره بن‌بست", en: "Handling deadlock" },
          {
            fa: "جلوگیری از وضعیت رقابتی و تداخل یا در هم قفل شدن فرایندها",
            en: "Preventing race conditions and processes locking each other",
          },
        ],
      },
      {
        name: { fa: "آزمایشگاه مدارمنطقی و معماری", en: "Logic circuits and computer architecture lab" },
        description: {
          fa: 'دنیای امروز به سرعت به سمت "دیجیتال شدن" حرکت می‌کند. در دنیای آنالوگ با مقدارهای پیوسته‌ای روبه‌رو می‌شویم اما در دنیای دیجیتال فقط دو مقدار صفر و یک وجود دارد. سیستم‌های دیجیتال و آنالوگ در کنار یکدیگر یک سیستم بزرگ‌تر را ساخته و امکان انجام کارهای گسترده‌ای را به ما می‌دهد.',
          en: "The world is fast going digital. Analog systems deal with continuous values, digital ones with only zero and one; together they make larger systems that can do a great deal.",
        },
      },
      {
        name: { fa: "آزمایشگاه ریزپردازنده", en: "Microprocessors lab" },
        description: {
          fa: "میکروپروسسور یا ریز‌پردازنده، یک پردازنده همه کاره قابل برنامه‌ریزی است که داده‌های دیجیتال را از ورودی خوانده و بر اساس دستورالعمل‌هایی که در حافظه دارد، داده‌ها را پردازش کرده و نتایج را در خروجی به صورت دیجیتال ارائه می‌دهد. ریزپردازنده‌ها در منطق باینری کار کرده و اطلاعات را بر اساس این منطق دریافت و پردازش می‌نمایند.",
          en: "A microprocessor is a general-purpose programmable processor: it reads digital input, processes it by the instructions in its memory and gives digital output, all in binary logic.",
        },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "فاطمه امیری", en: "Fatemeh Amiri" },
        note: { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
        phone: "08138411455",
        photoUrl: `${MAIN}/documents/38165/154654/amiri.jpg/ca1890f1-8221-9935-8fb7-b94d7110a73b?download=true`,
      },
      {
        role: "expert",
        name: { fa: "محبوبه روستایی", en: "Mahboobeh Rostaee" },
        phone: "08138411220",
      },
    ],
    files: [],
  },
  mech: {
    intro: {
      fa: "هم‌زمان با تأسیس گروه مهندسی مکانیک در سال 1397 در دانشگاه صنعتی همدان، آزمایشگاه‌ها و کارگاه‌های آموزشی و پژوهشی گروه مهندسی مکانیک شروع به فعالیت کردند. هم اکنون مجموعه آزمایشگاه‌ها و کارگاه‌های گروه مهندسی مکانیک با در اختیار داشتن فضایی بیش از 350 متر مربع که شامل دو مجموعه‌ی آزمایشگاهی‌ در ساختمان فرشچیان طبقه چهارم، یک مجموعه کارگاهی و یک سایت مدرن نقشه‌کشی، آماده بهره‌گیری از دانش و تجربه اساتید هیئت علمی و دانشجویان این دانشگاه است. گروه مهندسی مکانیک تلاش نموده ‌است با تهیه تجهیزات استاندارد و دقیق، زمینه‌های تحقیقاتی و آزمایشگاهی مهندسی مکانیک را پوشش داده و در جهت رفع نیازهای علمی و آزمایشگاهی دانشجویان گام بردارد. هم‌اکنون آزمایشگاههای این گروه به صورت آموزشی و پژوهشی بوده و با دارا بودن تجهیزات دقیق و استاندارد آماده انجام کلیه دروس آزمایشگاهی است.",
      en: "The mechanical engineering labs and workshops opened with the department in 2018. They take up more than 350 square metres: two lab suites on the fourth floor of the Farshchian building, a workshop and a modern drawing room.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه مقاومت مصالح", en: "Strength of materials lab" },
      },
      {
        name: { fa: "آزمایشگاه دینامیک ماشین و ارتعاشات", en: "Machine dynamics and vibration lab" },
      },
      {
        name: { fa: "آزمایشگاه مکانیک سیالات", en: "Fluid mechanics lab" },
      },
      {
        name: { fa: "آزمایشگاه رباتیک", en: "Robotics lab" },
      },
      {
        name: { fa: "سایت نقشه‌کشی صنعتی", en: "Engineering drawing room" },
      },
      {
        name: { fa: "کارگاه ماشین‌ابزار و ابزارسازی", en: "Machine tools workshop" },
      },
      {
        name: { fa: "کارگاه جوشکاری و ورق‌کاری", en: "Welding and sheet-metal workshop" },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "نعیمه فخار", en: "Naemeh Fakhar" },
        note: {
          fa: "سرپرست آزمایشگاه‌ها؛ ساختمان اصلی، طبقه سوم، اتاق ۳۰۱",
          en: "Labs supervisor; main building, room 301",
        },
        phone: "08138411402",
        email: "n.fakhar@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/1331639/Naeimeh_Fakhar2.jpg/8aade438-163c-2689-090c-71e5ae24c168?download=true`,
      },
      {
        role: "expert",
        name: { fa: "رضا میررازی", en: "Reza Mirrazi" },
        note: { fa: "ساختمان اصلی، طبقه اول، اتاق ۱۰۷", en: "Main building, room 107" },
        phone: "08138411221",
        email: "mech.eng@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/383947/reza.jpg/adc4ee89-f1c2-c164-b5dd-1bad43abb8f6?download=true`,
      },
      {
        role: "expert",
        name: { fa: "بهنام رفیعی", en: "Behnam Rafiei" },
        note: { fa: "ساختمان فرشچیان، طبقه چهارم، اتاق ۴۰۵", en: "Farshchian building, room 405" },
        phone: "08138411429",
        email: "mech.eng@hut.ac.ir",
        photoUrl: `${MAIN}/documents/38165/0/Behnam-Rafiei.jpg/7b9ae29d-b071-a0c3-b29a-5ca92df9095f?download=true`,
      },
    ],
    files: [
      {
        title: {
          fa: "معرفی آزمایشگاه دینامیک ماشین و ارتعاشات",
          en: "Machine dynamics and vibration lab: introduction",
        },
        url: "https://hut.ac.ir/documents/79231/3167184/%D9%85%D8%B9%D8%B1%D9%81%DB%8C+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D8%AF%DB%8C%D9%86%D8%A7%D9%85%DB%8C%DA%A9+%D9%85%D8%A7%D8%B4%DB%8C%D9%86+%D9%88+%D8%A7%D8%B1%D8%AA%D8%B9%D8%A7%D8%B4%D8%A7%D8%AA.pdf/d885abbc-b7aa-5d2e-545c-856efcb5f007",
        format: "pdf",
      },
      {
        title: { fa: "معرفی آزمایشگاه رباتیک", en: "Robotics lab: introduction" },
        url: "https://hut.ac.ir/documents/79231/3167184/%D9%85%D8%B9%D8%B1%D9%81%DB%8C+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D8%B1%D8%A8%D8%A7%D8%AA%DB%8C%DA%A9.pdf/a85667a1-8caf-c10a-d5a7-cb4964ba73a8",
        format: "pdf",
      },
      {
        title: { fa: "معرفی آزمایشگاه مقاومت مصالح", en: "Strength of materials lab: introduction" },
        url: "https://hut.ac.ir/documents/79231/3167184/%D9%85%D8%B9%D8%B1%D9%81%DB%8C+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D9%85%D9%82%D8%A7%D9%88%D9%85%D8%AA+%D9%85%D8%B5%D8%A7%D9%84%D8%AD.pdf/4be2e143-5365-c7b1-7050-e655e89b4df6",
        format: "pdf",
      },
      {
        title: { fa: "معرفی سایت نقشه‌کشی صنعتی", en: "Engineering drawing room: introduction" },
        url: "https://hut.ac.ir/documents/79231/3167184/%D9%85%D8%B9%D8%B1%D9%81%DB%8C+%D8%B3%D8%A7%DB%8C%D8%AA+%D9%86%D9%82%D8%B4%D9%87%E2%80%8C%DA%A9%D8%B4%DB%8C+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C.pdf/9d60cd28-ac53-e865-e8e2-5699166a3b65",
        format: "pdf",
      },
      {
        title: { fa: "معرفی کارگاه جوشکاری و ورق‌کاری", en: "Welding and sheet-metal workshop: introduction" },
        url: "https://hut.ac.ir/documents/79231/3167184/%D9%85%D8%B9%D8%B1%D9%81%DB%8C+%DA%A9%D8%A7%D8%B1%DA%AF%D8%A7%D9%87+%D8%AC%D9%88%D8%B4%DA%A9%D8%A7%D8%B1%DB%8C+%D9%88+%D9%88%D8%B1%D9%82%DA%A9%D8%A7%D8%B1%DB%8C+%28%D8%B9%D9%85%D9%88%D9%85%DB%8C%29.pdf/a11d82f2-be5c-4b70-2ed5-9105691140ca",
        format: "pdf",
      },
      {
        title: { fa: "معرفی کارگاه ماشین‌ابزار و ابزارسازی", en: "Machine tools workshop: introduction" },
        url: "https://hut.ac.ir/documents/79231/3167184/%D9%85%D8%B9%D8%B1%D9%81%DB%8C+%DA%A9%D8%A7%D8%B1%DA%AF%D8%A7%D9%87+%D9%85%D8%A7%D8%B4%DB%8C%D9%86%E2%80%8C%D8%A7%D8%A8%D8%B2%D8%A7%D8%B1+%D9%88+%D8%A7%D8%A8%D8%B2%D8%A7%D8%B1%D8%B3%D8%A7%D8%B2%DB%8C.pdf/12724c51-7be8-09ca-7df6-21d31ca04917",
        format: "pdf",
      },
      {
        title: {
          fa: "دستورکارهای دستگاه سنتام، آزمایشگاه مقاومت مصالح",
          en: "Santam machine manuals, strength of materials lab",
        },
        url: "https://hut.ac.ir/documents/79231/3167049/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%DA%A9%D8%A7%D8%B1%D9%87%D8%A7%DB%8C+%D8%B3%D9%86%D8%AA%D8%A7%D9%85-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D9%85%D9%82%D8%A7%D9%88%D9%85%D8%AA+%D9%85%D8%B5%D8%A7%D9%84%D8%AD.rar/8334fafe-9baa-7139-26ae-7da1f74641fe",
        format: "rar",
      },
      {
        title: {
          fa: "دستورکارهای آزمایشگاه دینامیک ماشین و ارتعاشات",
          en: "Machine dynamics and vibration lab manuals",
        },
        url: "https://hut.ac.ir/documents/79231/3167049/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%DA%A9%D8%A7%D8%B1%D9%87%D8%A7%DB%8C+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D8%AF%DB%8C%D9%86%D8%A7%D9%85%DB%8C%DA%A9+%D9%85%D8%A7%D8%B4%DB%8C%D9%86+%D9%88+%D8%A7%D8%B1%D8%AA%D8%B9%D8%A7%D8%B4%D8%A7%D8%AA.rar/f7e78d86-a81e-b2e3-737b-0a3235bb11cd",
        format: "rar",
      },
      {
        title: { fa: "دستورکار آزمایشگاه مقاومت مصالح", en: "Strength of materials lab manual" },
        url: "https://hut.ac.ir/documents/79231/3167049/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%DA%A9%D8%A7%D8%B1+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D9%85%D9%82%D8%A7%D9%88%D9%85%D8%AA+%D9%85%D8%B5%D8%A7%D9%84%D8%AD+%28%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C+%D9%87%D9%85%D8%AF%D8%A7%D9%86%29.pdf/4759eb6c-ec77-e7df-925d-0f5e9ab9131f",
        format: "pdf",
      },
    ],
  },
  bme: {
    intro: {
      fa: "محصولات و تجهیزات پزشکی همواره تاثیر بسزایی در زندگی انسان داشته و دارد. تاکنون دستگاه‌هایی از جمله سامانه‌های تصویربرداری، سامانه‌های پرتوپزشکی، تجهیزات توانبخشی ، تجهیزات ثبت سیگنال، دندان پزشکی و جراحی، نرم افزارهای مرتبط با تشخیص و درمان و ... کمک بزرگی به پزشکی نموده و تجهیزات و ملزومات پزشکی نیز هم راستای علم پزشکی گسترش یافته است. لذا آشنایی دانشجویان این رشته با عملکرد بدن انسان، طراحی ، تعمیر و نگهداشت، کالیبراسیون تجهیزات پزشکی و همین طور آشنایی با علم روز دنیا در این حوزه بسیار حائز اهمیت است.",
      en: "Medical devices shape modern care. To learn how the body works and how medical equipment is designed, repaired, maintained and calibrated, the department has a physiology lab, a medical equipment workshop, a microprocessor lab, a project room and a research lab.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه میکرو پروسسور", en: "Microprocessors lab" },
        description: {
          fa: "در این آزمایشگاه دانشجویان با نحوه ی برنامه نویسی ، شبیه سازی و پیاده سازی مدارات مبتنی بر ریزپردازنده ها آشنا می شوند که این کار با تمرکز بر پروژه های مرتبط با حوزه ی بیوالکتریک انجام می گیرد.",
          en: "Students learn to program, simulate and build microprocessor-based circuits, through projects in bioelectrics.",
        },
      },
      {
        name: { fa: "آزمایشگاه فیزیولوژی", en: "Physiology lab" },
        description: {
          fa: "در این آزمایشگاه دانشجویان در عمل با فیزیولوژی بدن انسان و همچنین اندازه گیری مواردی مانند فشار خون، قند خون، اکسیژن خون و بررسی ضربان قلب و شمارش سلول های خون و اندازه گیری انواع پارامترهای خونی و .... آشنا می شوند.وهمین طور دانشجویان با تجهیزاتی نظیر الکتروکاردیوگراف، مانیتور علائم حیاتی و تجهیزات معاینه ی عمومی و... آشنا می شوند.",
          en: "Hands-on human physiology: measuring blood pressure, blood sugar and blood oxygen, checking the heart rate, counting blood cells and measuring other blood parameters. Students also work with equipment such as electrocardiographs, vital-signs monitors and general examination tools.",
        },
      },
      {
        name: { fa: "کارگاه تجهیزات پزشکی", en: "Medical equipment workshop" },
        description: {
          fa: "در این کارگاه آشنایی دانشجو با انواع تجهیزات وملزومات پزشکی ودندان پزشکی ، روش های کنترل کیفی، قوانین و استاندارد های این حوزه و ثبت سیگنالهای حیاتی مد نظر قرار می گیرد.",
          en: "The workshop introduces medical and dental equipment and supplies, quality-control methods, the field's regulations and standards, and recording vital signals.",
        },
      },
      {
        name: { fa: "اتاق پروژه", en: "Project room" },
      },
      {
        name: { fa: "آزمایشگاه تحقیقاتی", en: "Research lab" },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "رسول باغبانی خضرلو", en: "Rasoul Baghbani Khezrloo" },
        note: { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
        phone: "08138411557",
        photoUrl: `${MAIN}/documents/38165/0/DrBaghbani.jpg/5e8a093f-5686-1ed3-eb12-ed4a41536ea3?download=true`,
      },
      {
        role: "expert",
        name: { fa: "سحر قیاسوند", en: "Sahar Ghiasvand" },
        phone: "08138411209",
      },
    ],
    files: [
      {
        title: { fa: "دستور کار آزمایشگاه فیزیولوژی", en: "Physiology lab manual" },
        url: "https://hut.ac.ir/documents/79238/2970725/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1+%DA%A9%D8%A7%D8%B1+%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%DA%AF%D8%A7%D9%87+%D9%81%DB%8C%D8%B2%DB%8C%D9%88%D9%84%D9%88%DA%98%DB%8C.pdf/c794d53f-7b76-576a-cec1-a402350d66e5",
        format: "pdf",
      },
    ],
  },
  materials: {
    intro: {
      fa: "مهندسي مواد يكي از رشته هاي مهندسي است كه به درستي لقب مادر رشته هاي مهندسي را به خود اختصاص داده است.اين رشته به عنوان يك رشته مستقل،قدمتي حدود هفتاد ساله دارد. در ايران نيز از حدود40سال قبل اين رشته در دانشگاههاي كشور تدريس ميشود. تحولاتي كه در عرصه علم و صنعت صورت گرفته، بطور مستقيم يا غير مستقيم حاصل تلاش و پيشرفت در اين رشته مهندسي است. علم مواد شامل پژوهش و تحقیق برای دستیابی به دانش پایه و اساسی در مورد ساختار درونی، خواص و فرآیند بهینه‌سازی مواد جهت استفاده نمودن آن‌‌‌هاست. در حالی که مهندسی مواد اصولاً در ارتباط با استفاده عملی از دانش پایه مواد (علم مواد) است، به گونه‌ای که بتوان مواد را به محصولات دلخواه یا مورد نیاز جامعه تبدیل کرد.",
      en: "Materials engineering is often called the mother of engineering. Its labs serve teaching and research in mechanical properties, heat treatment, metallography and extractive metallurgy, with a research lab for graduate work.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه خواص مکانیکی", en: "Mechanical properties lab" },
        description: {
          fa: "آزمایشگاه خواص مکانیکی مواد مجهز به دستگاه کشش و فشار (سنتام 5 تن) با قابلیت تغییر شکل گرم،‌ دستگاه ضربه شارپی، سختی سنج برینل،‌ راکول و ویکرز؛",
          en: "Equipped with a 5-tonne Santam tensile and compression tester capable of hot deformation, a Charpy impact tester, and Brinell, Rockwell and Vickers hardness testers.",
        },
      },
      {
        name: { fa: "آزمایشگاه عملیات حرارتی", en: "Heat treatment lab" },
        description: {
          fa: "آزمایشگاه عملیات حرارتی مجهز به انواع کوره ها تا دمای 1700 درجه سانتیگراد،‌ کوره القایی با قابلیت انجام عملیات حرارتی،‌ کوره القایی ذوب؛",
          en: "Equipped with furnaces up to 1700 °C, an induction furnace for heat treatment and an induction melting furnace.",
        },
      },
      {
        name: { fa: "آزمایشگاه متالوگرافی", en: "Metallography lab" },
        description: {
          fa: "آزمایشگاه متالوگرافی مجهز به کاتر، مانت گرم، سمباده زنی و پولیشر اتوماتیک و دستی، انواع میکروسکوپهای نوری،‌ نرم افزارهای تحلیل ساختار؛",
          en: "Equipped with a cutter, hot mounting, automatic and manual grinding and polishing machines, optical microscopes and structure-analysis software.",
        },
      },
      {
        name: { fa: "آزمایشگاه استخراج فلزات", en: "Extractive metallurgy lab" },
        description: {
          fa: "آزمایشگاه استخراج فلزات مجهز به انواع تجهیزات فرایند های پیرومتالورژی، هیدرومتالورژی و الکترومتالورژی (سنگ شکن، آسیای فست میل،‌‌ آسیای پر انرژی،‌ الک و شیکر،‌ انواع کوره های باکسی و تیوپی تا دمای 1700 درجه سانتیگراد، کوره القایی ذوب، رکتیفایر،‌ انواع pH متر و ...).",
          en: "Equipped for pyrometallurgy, hydrometallurgy and electrometallurgy: a crusher, a fast mill, a high-energy mill, sieves and a shaker, box and tube furnaces up to 1700 °C, an induction melting furnace, a rectifier, pH meters and more.",
        },
      },
      {
        name: { fa: "آزمایشگاه تحقیقاتی مواد", en: "Materials research lab" },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "اکبر حیدرپور", en: "Akbar Heidarpour" },
        note: { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
        phone: "08138411448",
        photoUrl: `${MAIN}/documents/38165/383947/heydarpoor.jpg/097211b1-1472-5862-832c-3129fd1f93b2?download=true`,
      },
      {
        role: "expert",
        name: { fa: "احمد نثری", en: "Ahmad Nasri" },
        phone: "08138411222",
        photoUrl: `${MAIN}/documents/38165/383947/nasri%282%29.jpg/972cea4b-21b8-20f3-2617-ed220bd3986f?download=true`,
      },
    ],
    files: [],
  },
  chem: {
    intro: {
      fa: "اين گروه دارای پنج آزمايشگاه تخصصی در مقطع کارشناسی شامل عمليات واحد، مکانیک سیالات، انتقال حرارت و کنترل فرآیند میباشد. همچنین یک آزمایشگاه تحقیقاتی مجهز برای دانشجویان کارشناسی ارشد دارد. با توجه به تجهیزات موجود در اين آزمايشگاهها، پتانسیل انجام پروژههاي پژوهشي در سطح كارشناسي و کارشناسی ارشد موجود است. از فعاليتهای تحقيقاتی اين گروه چندین مقاله در مجلات شناخته شده جهانی منتشر و يا در مجامع علمی ارائه شده است.",
      en: "The department has specialised undergraduate labs in unit operations, fluid mechanics, heat transfer and process control, and an equipped research lab for master's students, enough for research projects at both levels.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه عمليات واحد", en: "Unit operations lab" },
        description: {
          fa: "هدف از ارائه اين آزمايشگاه آشنايي دانشجويان با تجهيزات و فرآيندهاي جداسازي در مقیاس نيمه صنعتي و كاربرد آموخته‌هاي دانشجويان است. تجهيزاتي كه در حال حاضر در حال سرويس‌دهي به دانشجويان هستند عبارتند از:",
          en: "The lab introduces separation equipment and processes at pilot scale, where students apply what they have learned. The equipment now in service:",
        },
        equipment: [
          { fa: "برج استخراج مايع-مايع آكنده", en: "Packed liquid–liquid extraction column" },
          { fa: "برج تقطير سيني‌دار", en: "Tray distillation column" },
          { fa: "برج جذب گاز آكنده", en: "Packed gas absorption column" },
        ],
      },
      {
        name: { fa: "آزمایشگاه مکانیک سیالات", en: "Fluid mechanics lab" },
        description: {
          fa: "هدف از این آزمایشگاه درک مفاهیم مکانیک سیالات، ویژگیهای سیال، بکارگیری قوانین اساسی مکانیک و همچنین انجام محاسبات با استفاده از اطلاعات تجربی بدست آمده در آزمایشگاه میباشد. برخي از مهمترين تجهيزات موجود در این آزمايشگاه عبارتند از:",
          en: "The lab covers fluid mechanics, the properties of fluids and the basic laws of mechanics, with calculations from the data measured here. Its main equipment:",
        },
        equipment: [
          {
            fa: "دستگاه اندازه گيري نرخ حجمي سيال در سرريزهاي مستطيلي و مثلثي",
            en: "Flow rate over rectangular and triangular weirs",
          },
          {
            fa: "دستگاه تونل باد: جهت بررسي ميزان فشار و سرعت در ايرفويلها",
            en: "Wind tunnel, for pressure and velocity over airfoils",
          },
          {
            fa: "دستگاه تعيين عدد رينولدز: جهت بررسي نوع رژيم جريان سيال",
            en: "Reynolds number apparatus, for the flow regime",
          },
          { fa: "اندازهگيري دبي در اريفيس و ونتوري", en: "Flow measurement with orifice and venturi meters" },
          { fa: "دستگاه تعيين ويسکوزيته: تعيين گرانروي سيال به کمک روش گلوله غوطهور", en: "Falling-ball viscometer" },
          { fa: "بررسي عملکرد پمپها در شرايط سري و موازي", en: "Pumps in series and in parallel" },
          {
            fa: "دستگاه تعيين نيروي هيدروستاتيکي: بررسي غوطهوري نسبي و کامل يک جسم در آب",
            en: "Hydrostatic force apparatus, for partly and fully submerged bodies",
          },
        ],
      },
      {
        name: { fa: "آزمایشگاه انتقال حرارت", en: "Heat transfer lab" },
        description: {
          fa: "هدف از اين آزمايشگاه مشاهده‌ي انواع مکانيزمهاي انتقال حرارت شامل هدایتی، جابجایی و تشعشعی و انجام محاسبات مربوطه با استفاده از اطلاعات تجربي بدست آمده در آزمايشگاه ميباشد. تجهيزات موجود در آزمايشگاه عبارتند از:",
          en: "Students observe heat transfer by conduction, convection and radiation and work out the calculations from the data measured here. The equipment:",
        },
        equipment: [
          {
            fa: "دستگاه انتقال حرارت هدايتي: تعيين ميزان حرارت در دو جهت طولي و شعاعي",
            en: "Conduction apparatus, for heat flow along a bar and radially",
          },
          {
            fa: "دستگاه انتقال حرارت جابجايي: بررسي انتقال حرارت بين سيال و جامد داغ",
            en: "Convection apparatus, for heat transfer between a fluid and a hot solid",
          },
          {
            fa: "دستگاه انتقال حرارت تشعشعي: تعيين ميزان شدت تشعشع",
            en: "Radiation apparatus, for radiation intensity",
          },
          {
            fa: "مبدل حرارتي: به دو صورت پوسته- لوله و صفحهاي جهت اندازهگيري ميزان تبادل حرارتي",
            en: "Shell-and-tube and plate heat exchangers",
          },
        ],
      },
      {
        name: { fa: "آزمایشگاه کنترل فرایند", en: "Process control lab" },
        description: {
          fa: "هدف از ارائه اين آزمایشگاه بكارگيري آموخته‌هاي دانشجويان در درسهای كنترل فرآيندهای 1 و 2 است. آزمايش‌هايی كه در حال حاضر در سرويس هستند عبارتند از:",
          en: "Students apply what they learned in Process Control 1 and 2. The experiments now in service:",
        },
        equipment: [
          {
            fa: "آزمايش کنترل دما: کنترل دماي فرآيند در میله عایق توسط المان پلتیر",
            en: "Temperature control of an insulated rod with a Peltier element",
          },
          { fa: "آزمايش کنترل دبي: کنترل جريان سيال توسط شیر کنترل", en: "Flow control with a control valve" },
          { fa: "آزمايش کنترل فشار: تنظیم فشار در دو مخزن متوالی", en: "Pressure control in two tanks in series" },
          { fa: "آزمايش کنترل سطح: تنظیم سطح به صورت پسخور و پیشخور", en: "Level control, feedback and feedforward" },
        ],
      },
      {
        name: { fa: "آزمایشگاه تحقیقاتی", en: "Research lab" },
        description: {
          fa: "دانشجویان کارشناسی ارشد پس از گذراندن دروس تئوری برای انجام پروژه کارشناسی خود وارد آزمایشگاه تحقیقاتی می شوند و از تجهیزات و امکانات زیر در جهت پیش برد پروژه خود استفاده خواهند کرد.",
          en: "After their coursework, master's students carry out their projects in the research lab, with the equipment below.",
        },
        equipment: [
          { fa: "دستگاه اندازه گیری دانسیته تا 5 رقم اعشار", en: "Density meter, to five decimal places" },
          { fa: "دستگاه اندازه گیری ویسکوزیته", en: "Viscometer" },
          { fa: "دستگاه اندازه گیری ضریب شکست تا دقت 6 رقم اعشار", en: "Refractometer, to six decimal places" },
          { fa: "دستگاه اندازه گیری کشش سطحی (تنسیومتر)", en: "Surface tension meter (tensiometer)" },
          { fa: "دستگاه اسپکتروفوتومتر UV-Visible", en: "UV-Visible spectrophotometer" },
          { fa: "ترازوی چهار رقم اعشار", en: "Analytical balance, four decimal places" },
          { fa: "هدایت سنج، pH متر", en: "Conductivity meter and pH meter" },
          { fa: "دستگاه آب مقطر دوبار تقطیر", en: "Double-distilled water still" },
          { fa: "خشک کن نانو", en: "Nano dryer" },
          { fa: "جداسازی گازها", en: "Gas separation" },
          { fa: "دستگاه اندازه گیری حلالیت داروها و", en: "Drug solubility apparatus" },
          { fa: "سیرکولاتور با دقت 01/0 درجه", en: "Circulator, accurate to 0.01 °C" },
        ],
      },
      {
        name: { fa: "آزمایشگاه محاسبات به کمک کامپیوتر (CAD)", en: "Computer-aided design (CAD) lab" },
        description: {
          fa: "این آزمایشگاه مجهز به 4 سیستم پر قدرت با هارد SSD برای انجام سریع پروژهای شبیه سازی به کمک نرم افزارهای COMSOL، ANSYS، MATLAB، ASPEN-HYSYS و ... می باشد. دانشجویانی که پروژه آن ها شبیه سازی و ... می باشد می تواند از این آزمایشگاه بهره ببرند.",
          en: "Four powerful SSD workstations for fast simulation with COMSOL, ANSYS, MATLAB, Aspen HYSYS and more, open to students whose projects are simulations.",
        },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "مجید پاکیزه", en: "Majid Pakizeh" },
        note: { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
        phone: "08138411473",
        photoUrl: `${MAIN}/documents/38165/154654/profile_photo-190x190.jpeg/9867d66b-a12e-2965-16e3-f19dd160be11?download=true`,
      },
      {
        role: "expert",
        name: { fa: "زهرا روحی", en: "Zahra Roohi" },
        phone: "08138411304",
        photoUrl: `${MAIN}/documents/38165/383947/%D8%AE%D8%A7%D9%86%D9%85+%D8%B1%D9%88%D8%AD%DB%8C.jpg/f361d1ea-934c-1135-0075-5813507019bf?download=true`,
      },
    ],
    files: [],
  },
  mining: {
    intro: {
      fa: "استان همدان دارای ظرفیت بالای اجرایی و تحقیقاتی در صنایع مختلف است و با توجه به روند توسعه صنعتی این استان، نیاز روزافزون به جذب نیروی کارآمد بیش از پیش احساس میشود. آموزشهای ارائه شده به فراگیران کارشناسی معدن موجب میگردد تا فارغ التحصیلان این رشته از دانش و مهارت مناسبی برای پاسخگویی به نیازهای بخشهای مختلف صنعتی برخوردار باشند. در حال حاضر كمبود نيروي انساني متخصص کارامد در این حوزه در استان همدان و منطقه غرب کشور به گونهای است که در صورت عدم توسعه متناسب رشته‌های فنی و مهندسی، نیاز صنایع این استان به نحو مطلوبی مرتفع نخواهد شد. نظر به رسالتی که دانشگاه صنعتی همدان در پیشبرد اهداف توسعه‌ای استان دارد و با توجه به بهره‌مندي از كادر هيئت علمي متخصص و تجهيرات آزمايشگاهي و پژوهشي مناسب، شایسته است این دانشگاه نسبت به تربیت نیروهای متخصص در رشته مهندسی معدن اقدام نماید.",
      en: "Hamedan province has a large mining and industrial base. The mining labs give students the hands-on skills the region's industries need, from rock mechanics and mineral processing to mineralogy, geophysics and surveying.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه مکانیک سنگ", en: "Rock mechanics lab" },
        equipment: [
          { fa: "دستگاه برش مقاطع سنگ و بتن", en: "Rock and concrete section saw" },
          { fa: "دستگاه بار نقطه ایی دیجیتالی", en: "Digital point load tester" },
          { fa: "دستگاه تک محوری سنگ با جک فشاری", en: "Uniaxial rock tester with hydraulic jack" },
          { fa: "دستگاه سه محوری سنگ با جک فشاری", en: "Triaxial rock tester with hydraulic jack" },
          {
            fa: "دستگاه لس آنجلس با کنترل دور اتوماتیک",
            en: "Los Angeles abrasion machine with automatic speed control",
          },
          { fa: "مغزه گیر سنگ", en: "Rock core drill" },
          { fa: "دستگاه تست دوام سنگ", en: "Slake durability tester" },
          { fa: "دستگاه کشش غیر مستقیم برزیلی", en: "Brazilian indirect tensile tester" },
          { fa: "دستگاه برش مستقیم سطوح ضعیف سنگ", en: "Direct shear tester for rock discontinuities" },
          { fa: "دستگاه برش و تسطیح مغزه سنگ", en: "Core cutting and lapping machine" },
          { fa: "میز و سطل ارشمیدس به همراه ترازوی دیجیتال", en: "Archimedes table and bucket with digital balance" },
          { fa: "چکش اشمیت", en: "Schmidt hammer" },
          { fa: "نیمرخ سنج شانه ایی بارتون", en: "Barton comb profilometer" },
          { fa: "دستگاه آزمایش انحراف", en: "Deflection tester" },
        ],
      },
      {
        name: { fa: "آزمایشگاه فراوری مواد معدنی", en: "Mineral processing lab" },
        equipment: [
          { fa: "دستگاه فیلتر پرس 11 لیتری", en: "11-litre filter press" },
          { fa: "دستگاه فلوتاسیون آزمایشگاهی", en: "Laboratory flotation cell" },
          { fa: "مخلوط کن دو دور اتوماتیک", en: "Two-speed automatic mixer" },
          { fa: "سنگ شکن مخروطی", en: "Cone crusher" },
          { fa: "آسیای گلوله ایی خمره ایی", en: "Jar ball mill" },
          { fa: "دستگاه جیگ دنور", en: "Denver jig" },
          { fa: "انواع ریفل آزمایشگاهی", en: "Laboratory riffle splitters" },
          { fa: "شیکر برقی", en: "Electric sieve shaker" },
          { fa: "سری الک 15 عددی", en: "Set of 15 sieves" },
          { fa: "آون آزمایشگاهی دیجیتال 100 لیتری فن دار", en: "100-litre digital fan oven" },
        ],
      },
      {
        name: {
          fa: "آزمایشگاههای سنگ شناسی و کانی شناسی توصیفی و کانی شناسی نوری",
          en: "Petrology and mineralogy lab",
        },
        equipment: [
          { fa: "دستگاه پولیشر اتوماتیک", en: "Automatic polisher" },
          { fa: "ست مانت سرد", en: "Cold mounting set" },
          { fa: "قلم سختی", en: "Hardness pens" },
          { fa: "مجموعه اسلاید های آموزشی کانی شناسی", en: "Mineralogy teaching slides" },
          { fa: "نمونه ی آموزشی و آزمایشگاهی کانی شناسی", en: "Mineralogy teaching and lab samples" },
          { fa: "میکروسکوپ پلاریزان دوچشمی", en: "Binocular polarizing microscope" },
          { fa: "مجموعه ی بلورشناسی", en: "Crystallography set" },
          {
            fa: "مجموعه ی آموزشی کانی های سیلیکاته و غیرسیلیکاته",
            en: "Teaching set of silicate and non-silicate minerals",
          },
          {
            fa: "مجموعه ی اختصاصی سنگ رسوبی و آذرین و دگرگون",
            en: "Sedimentary, igneous and metamorphic rock collection",
          },
          { fa: "مجموعه ی جدول سختی موهس", en: "Mohs hardness set" },
          {
            fa: "مجموعه ی عمومی و اختصاصی مقاطع نازک سنگ آذرین",
            en: "Thin sections of igneous rocks, general and special",
          },
        ],
      },
      {
        name: { fa: "آزمایشگاه ژئوفیزیک", en: "Geophysics lab" },
        equipment: [
          { fa: "دستگاه ژئوالکتریک سس 1000", en: "SAS 1000 geoelectric meter" },
          { fa: "دستگاه لرزه سنج v9000", en: "V9000 seismograph" },
        ],
      },
      {
        name: {
          fa: "آزمایشگاههای کارتوگرافی و نقشه برداری و طراحی معادن",
          en: "Cartography, surveying and mine design lab",
        },
        equipment: [
          { fa: "استریوسکوپ رومیزی آینه دار", en: "Tabletop mirror stereoscope" },
          { fa: "جی پی اس دستی گارمین", en: "Garmin handheld GPS" },
          { fa: "کمپاس برانتون", en: "Brunton compass" },
          { fa: "دوربین تئودولیت دیجیتال", en: "Digital theodolite" },
          { fa: "ترازیاب سوکیا", en: "Sokkia level" },
          { fa: "متر لیزری لایکا", en: "Leica laser distance meter" },
          { fa: "ژالون تلسکوپی", en: "Telescopic ranging pole" },
          { fa: "شاخص کشویی آلومینیومی 5 متری", en: "5-metre aluminium sliding staff" },
        ],
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "حسام دهقانی", en: "Hesam Dehghani" },
        note: { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
        phone: "08138411405",
        photoUrl: `${MAIN}/documents/38165/154654/profile_photo-190+%281%29.jpg/d7c93016-fd65-8ccf-aa43-80f9fb4d5ec0?download=true`,
      },
    ],
    files: [],
  },
  bs: {
    intro: {
      fa: "آزمایشگاه‌های گروه علوم پایه، فیزیک ۱، فیزیک ۲ و شیمی عمومی، درس‌های آزمایشگاهی پایه همه رشته‌های مهندسی دانشگاه را برگزار می‌کنند.",
      en: "The basic sciences labs (physics 1, physics 2 and general chemistry) run the foundation lab courses for every engineering programme.",
    },
    labs: [
      {
        name: { fa: "آزمایشگاه فیزیک ۱", en: "Physics 1 lab" },
      },
      {
        name: { fa: "آزمایشگاه فیزیک ۲", en: "Physics 2 lab" },
      },
      {
        name: { fa: "آزمایشگاه شیمی عمومی", en: "General chemistry lab" },
      },
    ],
    people: [
      {
        role: "supervisor",
        honorific: "doctor",
        name: { fa: "مژگان نجفی", en: "Mojgan Najafi" },
        note: { fa: "سرپرست آزمایشگاه", en: "Lab supervisor" },
        phone: "08138411450",
        photoUrl: `${MAIN}/documents/38165/154654/%D8%B3%D8%B3%D8%B3.jpg/92f14b25-4a6e-6488-5356-d395353ed458?download=true`,
      },
      {
        role: "expert",
        name: { fa: "محمد بهرامی مقدس", en: "Mohammad Bahrami Moghaddas" },
        phone: "08138411223",
        photoUrl: `${MAIN}/documents/38165/383947/%D8%A8%D9%87%D8%B1%D8%A7%D9%85%DB%8C+%D9%85%D9%82%D8%AF%D8%B3.jpg/d8fbab34-9cb8-15bb-8add-12618015157c?download=true`,
      },
    ],
    files: [],
  },
};

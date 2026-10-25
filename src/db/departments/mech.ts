import type { DepartmentSeed } from "#/db/seed-departments";

/*===== Mechanical Engineering =====*/
// From the department's old site (mech.hut.ac.ir), October 2026. Files and photos still live there; the seed copies the
// photos into the app's storage and links the files where they are.

const FILES = "https://mech.hut.ac.ir/documents/79231/";
const HOMEPAGES = "https://mech.hut.ac.ir/~";
const SCHOLAR = "https://scholar.google.com/citations?user=";

const photo = (path: string) => `${FILES}${path}`;

export const mech: DepartmentSeed = {
  slug: "mech",
  name: { fa: "مهندسی مکانیک", en: "Mechanical Engineering" },
  lede: {
    fa: "طراحی، تحلیل و ساخت سیستم‌های مکانیکی و فرایندهای گرمایی؛ از نیرو و حرکت تا انرژی و گرما.",
    en: "The design, analysis and making of mechanical systems and thermal processes, from force and motion to energy and heat.",
  },
  quote: {
    fa: "نه تنها صنعتی را نمی‌توان یافت که از مهندسی مکانیک بی‌نیاز باشد، بلکه بخش مهمی از توسعه همه صنایع مرهون پیشرفت‌های این رشته است.",
    en: "No industry can do without mechanical engineering, and much of every industry's progress rests on advances made in this field.",
  },
  intro: {
    fa: [
      "مهندسی مکانیک یکی از شاخه‌های کهن مهندسی است که کاربرد وسیعی در تمام بخش‌های صنعتی جهان امروز دارد و نقشی شایسته و بارز در توسعه دانش و فناوری ایفا می‌کند. مهندسان این رشته، اصول اساسی نیرو، انرژی، حرکت و گرما را به کار می‌برند و با دانش تخصصی خود به طراحی، تحلیل و ساخت سیستم‌های مکانیکی و دستگاه‌ها و فرایندهای گرمایی می‌پردازند.",
      "حوزه فعالیت مهندسی مکانیک آن‌قدر گسترده است که نه تنها صنعتی را نمی‌توان یافت که از آن بی‌نیاز باشد، بلکه بخش مهمی از توسعه همه صنایع مرهون پیشرفت‌های به‌دست‌آمده در این رشته است. گروه مهندسی مکانیک دانشگاه صنعتی همدان دانشجو را در دوره‌های کارشناسی و کارشناسی ارشد می‌پذیرد و آزمایشگاه‌هایی برای مقاومت مصالح، دینامیک ماشین و ارتعاشات، رباتیک، ماشین‌ابزار و جوشکاری دارد.",
    ].join("\n\n"),
    en: [
      "Mechanical engineering is one of the oldest branches of engineering, used across every industrial sector today and central to the growth of science and technology. Its engineers apply the basic principles of force, energy, motion and heat to design, analyse and build mechanical systems, machines and thermal processes.",
      "The field is so broad that no industry can do without it, and much of every industry's progress rests on advances made in mechanical engineering. The Department of Mechanical Engineering at Hamedan University of Technology admits BSc and MSc students, and runs laboratories for strength of materials, machine dynamics and vibration, robotics, machine tools and welding.",
    ].join("\n\n"),
  },
  milestones: [],
  labsUrl: "https://hut.ac.ir/آزمایشگاه-مهندسی-مکانیک",

  /*------ People ------*/
  members: [
    {
      kind: "faculty",
      head: true,
      honorific: "doctor",
      name: { fa: "جواد پاینده پیمان", en: "Javad Payandeh Peyman" },
      rank: "assistant",
      phone: "08138411440",
      email: "j.payandeh@hut.ac.ir",
      office: { fa: "ساختمان فرشچیان، طبقه ۴، اتاق ۴۱۴", en: "Farshchian building, 4th floor, room 414" },
      homepageUrl: `${HOMEPAGES}j.payandehpeyman`,
      photoUrl: photo("0/payandeh2.jpg/481bfaa8-ad66-2882-d5b5-71545d463ef6?t=1652512869344&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "نعیمه فخار", en: "Naemeh Fakhar" },
      rank: "assistant",
      phone: "08138411402",
      email: "n.fakhar@hut.ac.ir",
      office: { fa: "ساختمان اصلی، طبقه ۳، اتاق ۳۰۱", en: "Main building, 3rd floor, room 301" },
      homepageUrl: `${HOMEPAGES}naemeh.fakhar`,
      scholarUrl: `${SCHOLAR}TSMeyS4AAAAJ`,
      photoUrl: photo("0/Naeimeh_Fakhar2.jpg/43729356-8cff-8332-917b-404e7f595bc7?t=1652512685748&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "پیام ورشوی جاغرق", en: "Payam Varshovi Jaghargh" },
      rank: "assistant",
      phone: "08138411439",
      email: "varshovi@hut.ac.ir",
      office: { fa: "ساختمان فرشچیان، طبقه ۳", en: "Farshchian building, 3rd floor" },
      homepageUrl: `${HOMEPAGES}varshovi`,
      photoUrl: photo("0/varshovi2.jpg/6a010e4d-297d-6c83-9c58-7b883bdc6851?t=1652513049131&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "نجمه حاجی‌علی‌گل", en: "Najmeh Hajialigol" },
      rank: "assistant",
      phone: "08138411100",
      email: "n.hajialigol@hut.ac.ir",
      office: { fa: "ساختمان اصلی، طبقه ۱، اتاق ۱۰۲", en: "Main building, 1st floor, room 102" },
      homepageUrl: `${HOMEPAGES}n.hajialigol`,
      scholarUrl: "https://scholar.google.com/scholar?q=najmeh+hajialigol",
      photoUrl: photo("0/Dr+Hajialigol3.jpg/45d78cbf-6b5e-7a06-0799-2feedfe2a191?t=1706429281603&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "محمدمهدی رضائی", en: "Mohammad Mahdi Rezaei" },
      rank: "assistant",
      phone: "08138411532",
      email: "mmrezaei@hut.ac.ir",
      office: { fa: "ساختمان اصلی، طبقه ۴، اتاق ۴۰۳", en: "Main building, 4th floor, room 403" },
      homepageUrl: `${HOMEPAGES}mmrezaei.mech`,
      photoUrl: photo("0/Dr+MMRezaei_Picture2.jpg/3747eed7-c776-cb44-225b-7c1c787771d7?t=1687586842023&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "امیر بصیری پارسا", en: "Amir Basiri Parsa" },
      rank: "assistant",
      phone: "08138411444",
      email: "amirbparsa@hut.ac.ir",
      office: { fa: "ساختمان اصلی، طبقه ۳", en: "Main building, 3rd floor" },
      homepageUrl: `${HOMEPAGES}amirbparsa`,
      scholarUrl: `${SCHOLAR}yk9lqyUAAAAJ`,
      photoUrl: photo("0/Dr+Basiriparsa3.jpg/2f2c5be7-8e87-adbc-ac44-ec0eb4d484f0?t=1706429271752&download=true"),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "سیدسجاد جعفری", en: "Seyed Sajjad Jafari" },
      rank: "assistant",
      office: { fa: "ساختمان اصلی، طبقه ۳", en: "Main building, 3rd floor" },
      homepageUrl: `${HOMEPAGES}s.jafari`,
      photoUrl: photo(
        "0/%D8%B3%D8%AC%D8%A7%D8%AF+%D8%AC%D8%B9%D9%81%D8%B1%DB%8C.jpg/87706480-2979-7b12-7a6b-d0db16fd1391?t=1736481027239&download=true",
      ),
    },
    {
      kind: "faculty",
      honorific: "doctor",
      name: { fa: "علیرضا معصومی", en: "Alireza Masoumi" },
      rank: "assistant",
      homepageUrl: `${HOMEPAGES}aerosina90`,
      photoUrl: photo(
        "0/%D8%B9%D9%84%DB%8C%D8%B1%D8%B6%D8%A7+%D9%85%D8%B9%D8%B5%D9%88%D9%85%DB%8C.jpg/b3520420-4b1a-6ff5-31bd-b2f5fb984f29?t=1777440880491&download=true",
      ),
    },
    {
      kind: "staff",
      name: { fa: "رضا میررازی", en: "Reza Mirrazi" },
      jobTitle: { fa: "کارشناس گروه و آزمایشگاه", en: "Department and laboratory officer" },
      phone: "08138411221",
      email: "mech.eng@hut.ac.ir",
      office: { fa: "ساختمان اصلی، طبقه ۱، اتاق ۱۰۷", en: "Main building, 1st floor, room 107" },
      photoUrl: photo("0/Mirrazi.jpg/1313a6b3-c326-8e18-4805-d4c33f9340a6?t=1690016238443&download=true"),
    },
  ],

  /*------ Fields and Tracks ------*/
  // The old site names no specialisations, so the department is one field with a BSc and an MSc programme.
  fields: [
    {
      key: "mechanical",
      name: { fa: "مهندسی مکانیک", en: "Mechanical engineering" },
      summary: {
        fa: "طراحی، ساخت و تحلیل ماشین‌ها و سیستم‌های گرمایی",
        en: "Designing, building and analysing machines and thermal systems",
      },
      tracks: [
        { degree: "bsc", name: { fa: "مهندسی مکانیک", en: "Mechanical engineering" } },
        { degree: "msc", name: { fa: "مهندسی مکانیک", en: "Mechanical engineering" } },
      ],
    },
  ],

  /*------ Labs ------*/
  labs: [
    { fa: "کارگاه عمومی و جوشکاری", en: "General and Welding Workshop" },
    { fa: "آزمایشگاه مقاومت مصالح", en: "Strength of Materials Lab" },
    { fa: "آزمایشگاه دینامیک ماشین و ارتعاشات", en: "Machine Dynamics and Vibration Lab" },
    { fa: "سایت نقشه‌کشی", en: "Technical Drawing Studio" },
    { fa: "آزمایشگاه رباتیک", en: "Robotics Lab" },
    { fa: "کارگاه ماشین‌ابزار", en: "Machine Tools Workshop" },
  ],

  /*------ Curriculum Files ------*/
  documents: [
    {
      degree: "bsc",
      title: {
        fa: "چارت دروس کارشناسی، ورودی ۱۴۰۱ به بعد",
        en: "BSc course chart, students admitted from 2022",
      },
      url: `${FILES}3424418/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%D9%85%D9%82%D8%B7%D8%B9+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C+%D9%87%D9%85%D8%AF%D8%A7%D9%86-+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+%DB%B1%DB%B4%DB%B0%DB%B1+%D9%88+%D8%A8%D8%B9%D8%AF.pdf/1e88197d-cd1d-17fa-56e2-e21254c825d7?t=1700633693234`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: {
        fa: "برنامه پیشنهادی هشت‌ترمی کارشناسی، ورودی ۱۴۰۱ به بعد",
        en: "Suggested eight-semester BSc plan, from 2022",
      },
      url: `${FILES}3424418/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87+%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7%D8%AF%DB%8C+%D9%87%D8%B4%D8%AA+%D8%AA%D8%B1%D9%85%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+-+%D9%85%D8%AE%D8%B5%D9%88%D8%B5+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+%DB%B1%DB%B4%DB%B0%DB%B1+%D9%88+%D8%A8%D8%B9%D8%AF.pdf/ce2a4ed6-270f-67d9-16c3-a489cdfe6238?t=1700633692981`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: {
        fa: "برنامه آموزشی مصوب دفتر گسترش، کارشناسی، ورودی ۱۴۰۱ به بعد",
        en: "Ministry-approved BSc curriculum, from 2022",
      },
      url: `${FILES}3424418/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87+%D8%A2%D9%85%D9%88%D8%B2%D8%B4%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%D9%85%D8%B5%D9%88%D8%A8+%D8%AF%D9%81%D8%AA%D8%B1+%DA%AF%D8%B3%D8%AA%D8%B1%D8%B4+%D8%A8%D8%B1%D8%A7%DB%8C+%D8%AF%D9%88%D8%B1%D9%87+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+-+%D9%85%D8%AE%D8%B5%D9%88%D8%B5+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+%DB%B1%DB%B4%DB%B0%DB%B1+%D9%88+%D8%A8%D8%B9%D8%AF.pdf/018026f5-009d-772d-8371-0b2ba4ffe6e9?t=1700633689939`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "چارت دروس کارشناسی، ورودی پیش از ۱۴۰۱",
        en: "BSc course chart, students admitted before 2022",
      },
      url: `${FILES}3424310/%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D9%88%D8%B3+%D9%85%D9%82%D8%B7%D8%B9+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C+%D9%87%D9%85%D8%AF%D8%A7%D9%86-+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+%D9%82%D8%A8%D9%84+%D8%A7%D8%B2+%DB%B1%DB%B4%DB%B0%DB%B1.pdf/89aafac7-2add-21aa-171e-e46765712b0d?t=1700633710047`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "برنامه پیشنهادی هشت‌ترمی کارشناسی، ورودی پیش از ۱۴۰۱",
        en: "Suggested eight-semester BSc plan, before 2022",
      },
      url: `${FILES}3424310/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87+%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7%D8%AF%DB%8C+%D9%87%D8%B4%D8%AA+%D8%AA%D8%B1%D9%85%DB%8C+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+-+%D9%85%D8%AE%D8%B5%D9%88%D8%B5+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+%D9%82%D8%A8%D9%84+%D8%A7%D8%B2+%DB%B1%DB%B4%DB%B0%DB%B1.pdf/a5d8be48-61e3-8e84-26b9-a6cac23c52e9?t=1700633709794`,
      format: "pdf",
    },
    {
      degree: "bsc",
      archived: true,
      title: {
        fa: "برنامه آموزشی مصوب دفتر گسترش، کارشناسی، ورودی پیش از ۱۴۰۱",
        en: "Ministry-approved BSc curriculum, before 2022",
      },
      url: `${FILES}3424310/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87+%D8%A2%D9%85%D9%88%D8%B2%D8%B4%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%D9%85%D8%B5%D9%88%D8%A8+%D8%AF%D9%81%D8%AA%D8%B1+%DA%AF%D8%B3%D8%AA%D8%B1%D8%B4+%D8%A8%D8%B1%D8%A7%DB%8C+%D8%AF%D9%88%D8%B1%D9%87+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+-+%D9%85%D8%AE%D8%B5%D9%88%D8%B5+%D9%88%D8%B1%D9%88%D8%AF%DB%8C%E2%80%8C%D9%87%D8%A7%DB%8C+%D9%82%D8%A8%D9%84+%D8%A7%D8%B2+%DB%B1%DB%B4%DB%B0%DB%B1.pdf/0d827f0c-6780-71a0-ee66-c3467d58ec0e?t=1700633709561`,
      format: "pdf",
    },
    {
      degree: "bsc",
      title: {
        fa: "آیین‌نامه آموزشی دوره‌های کاردانی و کارشناسی، پیوسته و ناپیوسته",
        en: "Education regulations for associate and BSc programmes",
      },
      url: `${FILES}3424526/%D8%A2%DB%8C%DB%8C%D9%86+%D9%86%D8%A7%D9%85%D9%87++%D8%AC%D8%AF%DB%8C%D8%AF+%D8%A2%D9%85%D9%88%D8%B2%D8%B4%DB%8C+%D8%AF%D9%88%D8%B1%D9%87+%D9%87%D8%A7%DB%8C+%DA%A9%D8%A7%D8%B1%D8%AF%D8%A7%D9%86%DB%8C+%D9%88+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+-+%D9%BE%DB%8C%D9%88%D8%B3%D8%AA%D9%87+%D9%88%D9%86%D8%A7%D9%BE%DB%8C%D9%88%D8%B3%D8%AA%D9%87.pdf/7e2a3d30-8e4a-0332-dad2-6ca476d71390?t=1700633676612`,
      format: "pdf",
    },
    {
      degree: "msc",
      title: {
        fa: "برنامه پیشنهادی مصوب گروه، کارشناسی ارشد",
        en: "Department-approved MSc plan",
      },
      url: `${FILES}3424202/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87+%D8%A2%D9%85%D9%88%D8%B2%D8%B4%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%D9%85%D8%B5%D9%88%D8%A8+%D8%AF%D9%81%D8%AA%D8%B1+%DA%AF%D8%B3%D8%AA%D8%B1%D8%B4+%D8%A8%D8%B1%D8%A7%DB%8C+%D8%AF%D9%88%D8%B1%D9%87+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF.pdf/2c15109b-18ef-21cb-e080-b3426734171d?t=1700633726341`,
      format: "pdf",
    },
    {
      degree: "msc",
      title: {
        fa: "برنامه آموزشی مصوب دفتر گسترش، کارشناسی ارشد",
        en: "Ministry-approved MSc curriculum",
      },
      url: `${FILES}3424202/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87+%D9%BE%DB%8C%D8%B4%D9%86%D9%87%D8%A7%D8%AF%DB%8C+%D9%85%D8%B5%D9%88%D8%A8+%DA%AF%D8%B1%D9%88%D9%87+%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C+%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF.pdf/f4a93bfe-c4a6-bc24-9c83-6cdb1eae1999?t=1700633727126`,
      format: "pdf",
    },
  ],
};

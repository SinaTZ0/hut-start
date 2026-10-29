import type { LocalizedText } from "#/lib/localized-text";
import type { LibraryFormat, LibraryIcon } from "#/orpc/library/constants";

/*===== Document Library =====*/
// The forms and regulations page, from hut.ac.ir/university-forms on 2026-10-29. Titles are tidied (spelling, ZWNJs,
// the master's thesis guide's title, which the old page gave as the bachelor's). Left out: the nine files linked over
// `ftp://`, which browsers no longer open, and three links that opened a different document than their title.
// Office files (the graduate office's guides) are sections with an `office`, in `offices.ts`.

export type LibrarySeed = {
  key: string;
  icon: LibraryIcon;
  title: LocalizedText;
  /** The office whose page shows it; none for the forms page. */
  office?: string;
  groups: { title: LocalizedText; documents: { title: LocalizedText; url: string; format: LibraryFormat }[] }[];
}[];

export const library: LibrarySeed = [
  {
    key: "students",
    icon: "graduation",
    title: { fa: "دانشجویان", en: "Students" },
    groups: [
      {
        title: { fa: "کارشناسی", en: "Bachelor's" },
        documents: [
          {
            title: { fa: "راهنمای نگارش پایان‌نامه کارشناسی", en: "Bachelor's thesis writing guide" },
            url: "https://hut.ac.ir/documents/38165/83513/hut-97-BS_Thesis_Guide.pdf/4b097024-0923-a64c-660b-d5623ba0b78b",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای رزرو منابع کتابخانه", en: "Reserving library resources" },
            url: "https://hut.ac.ir/documents/38165/83513/resources-reservation-guide-hut.pdf/0b8eac9e-3dc0-8306-317f-dd98049329df",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای جست‌وجوی منابع کتابخانه", en: "Searching library resources" },
            url: "https://hut.ac.ir/documents/38165/83513/resources-search-guide-hut.pdf/011a4cf7-68ce-c133-09ca-9e68304db0f0",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای تمدید منابع کتابخانه", en: "Renewing library loans" },
            url: "https://hut.ac.ir/documents/38165/83513/Renewal-resources-Guide.pdf/237f5f5e-1d30-e09e-c231-6898d6f6c00e",
            format: "pdf",
          },
          {
            title: {
              fa: "فرم درخواست استفاده از امکانات آزمایشگاه‌ها و اتاق پروژه",
              en: "Request to use the labs and project rooms",
            },
            url: "https://hut.ac.ir/documents/38165/83513/Application-form-for-the-use-of-laboratory-facilities-and-project-room.pdf/78b0c0d7-0ec4-657e-4295-df0a524a7ba6",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "کارشناسی ارشد", en: "Master's" },
        documents: [
          {
            title: { fa: "راهنمای نگارش پایان‌نامه کارشناسی ارشد", en: "Master's thesis writing guide" },
            url: "https://hut.ac.ir/documents/38165/83683/hut-97-MSc_Thesis_Guide.pdf/41edf3db-76fd-5492-ccc8-39063c71a5fb",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای رزرو منابع کتابخانه", en: "Reserving library resources" },
            url: "https://hut.ac.ir/documents/38165/83683/resources-reservation-guide-hut.pdf/5ea6aa3c-70fd-ba07-7eb7-d518daf76858",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای جست‌وجوی منابع کتابخانه", en: "Searching library resources" },
            url: "https://hut.ac.ir/documents/38165/83683/resources-search-guide-hut.pdf/490dc8f2-c04f-77a3-6451-6f1a00e4e061",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای تمدید منابع کتابخانه", en: "Renewing library loans" },
            url: "https://hut.ac.ir/documents/38165/83683/Renewal-resources-Guide.pdf/d0351831-a9fd-0105-dd75-b0905f3d5b9c",
            format: "pdf",
          },
          {
            title: {
              fa: "فرم درخواست استفاده از امکانات آزمایشگاه‌ها و اتاق پروژه",
              en: "Request to use the labs and project rooms",
            },
            url: "https://hut.ac.ir/documents/38165/83683/Application-form-for-the-use-of-laboratory-facilities-and-project-room.pdf/899892db-aae5-8320-3d48-0365f8c653ca",
            format: "pdf",
          },
        ],
      },
    ],
  },
  {
    key: "education",
    icon: "education",
    title: { fa: "آموزشی", en: "Education" },
    groups: [
      {
        title: { fa: "آیین‌نامه‌ها و فرم‌های آموزشی", en: "Education regulations and forms" },
        documents: [
          {
            title: {
              fa: "مدارک لازم برای صدور دانشنامه و ریزنمرات تأییدشده",
              en: "Documents needed for certified degrees and transcripts",
            },
            url: "https://hut.ac.ir/documents/38165/83847/rizNomre.pdf/0ee83ee5-7587-03ff-c8dc-969a755e08a7",
            format: "pdf",
          },
          {
            title: { fa: "فرم حضور و غیاب", en: "Attendance sheet" },
            url: "https://hut.ac.ir/documents/38165/83847/form2.docx/68700d7f-84c1-a758-4d16-77a17651d9c9",
            format: "docx",
          },
          {
            title: { fa: "آیین‌نامه شرکت در همایش‌ها و کنفرانس‌ها", en: "Regulations for attending conferences" },
            url: "https://hut.ac.ir/documents/38165/83847/conference-participation-for-faculty-members-and-students-hut.pdf/8f850560-ad51-b58e-218b-6f8f2cf61e81",
            format: "pdf",
          },
        ],
      },
    ],
  },
  {
    key: "research",
    icon: "research",
    title: { fa: "پژوهشی", en: "Research" },
    groups: [
      {
        title: { fa: "آیین‌نامه‌ها و شیوه‌نامه‌های پژوهشی", en: "Research regulations" },
        documents: [
          {
            title: { fa: "آیین‌نامه شرکت در همایش‌های علمی داخلی", en: "Attending domestic scientific conferences" },
            url: "https://hut.ac.ir/documents/38165/83847/sherkat-dar-hamayesh-dakheli.pdf/ae1ce2e9-45d5-7030-7e70-c23c56c2abcc",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه ارزیابی فعالیت‌های پژوهشی و فناوری", en: "Assessing research and technology work" },
            url: "https://hut.ac.ir/documents/38165/83847/shive.pdf/0dc1afe9-adcb-80fb-7872-a3380b7fa763",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه تشکیل هسته پژوهشی", en: "Forming a research group" },
            url: "https://hut.ac.ir/documents/38165/83847/haste-pazhohesh.pdf/192c98b8-c1b0-e737-49ed-efd61a0dea1e",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه اجرایی هسته‌های پژوهشی", en: "Running research groups" },
            url: "https://hut.ac.ir/documents/38165/83847/haste-ejraei.pdf/fc93aa13-449d-21e5-1c85-13ce508c92f4",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه شرح وظایف کارشناسان آزمایشگاه", en: "Lab experts' duties" },
            url: "https://hut.ac.ir/documents/38165/83847/sharhe-vazife.pdf/3074a0ae-10ca-7827-fb3d-48ae1d8c64b3",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه طرح‌های تقاضامحور", en: "Demand-driven projects" },
            url: "https://hut.ac.ir/documents/38165/83847/tarhe-taqaza-mehvar.pdf/e0d301cb-c14b-40c6-1a3c-ebffc7b3387f",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه شورای فناوری اطلاعات", en: "IT council regulations" },
            url: "https://hut.ac.ir/documents/38165/83847/shoraye-fani.pdf/d0c4ee9d-d7ca-c959-3e6c-660366fd6acf",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه فرصت مطالعاتی ارتباط با صنعت", en: "Industry sabbaticals" },
            url: "https://hut.ac.ir/documents/38165/83847/forsat-motaleat.pdf/da1e31a5-f57d-3cc2-7918-4cb952f16225",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "فرم‌های همایش‌ها و کنفرانس‌ها", en: "Conference forms" },
        documents: [
          {
            title: {
              fa: "کاربرگ هزینه شرکت در همایش‌های داخلی، اعضای هیئت علمی",
              en: "Domestic conference costs, faculty",
            },
            url: "https://hut.ac.ir/documents/38165/83847/%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DA%AF+%D9%87%D8%B2%DB%8C%D9%86%D9%87+%D9%87%D8%A7%DB%8C+%DA%A9%D9%86%D9%81%D8%B1%D8%A7%D9%86%D8%B3+%D9%87%DB%8C%D8%A3%D8%AA+%D8%B9%D9%84%D9%85%DB%8C.doc/cee8876f-709a-a4b3-a755-a60955ad9de5",
            format: "doc",
          },
          {
            title: {
              fa: "کاربرگ هزینه شرکت در همایش‌های داخلی، دانشجویان تحصیلات تکمیلی",
              en: "Domestic conference costs, graduate students",
            },
            url: "https://hut.ac.ir/documents/38165/83847/%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%DA%AF+%D9%87%D8%B2%DB%8C%D9%86%D9%87+%D9%87%D8%A7%DB%8C+%DA%A9%D9%86%D9%81%D8%B1%D8%A7%D9%86%D8%B3+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88.docx/037b6d17-6789-5cfe-1adc-c55bae7eb859",
            format: "docx",
          },
          {
            title: {
              fa: "افزایش کمک‌هزینه شرکت اعضای هیئت علمی در همایش‌های خارجی",
              en: "Higher allowance for faculty at international conferences",
            },
            url: "https://hut.ac.ir/documents/38165/83847/afzayesh.docx/467eb055-47d1-3f37-3412-e7958c0b9edd",
            format: "docx",
          },
        ],
      },
      {
        title: { fa: "فرم‌های طرح پژوهشی", en: "Research project forms" },
        documents: [
          {
            title: { fa: "پرسش‌نامه درخواست اعتبار طرح پژوهشی", en: "Research project funding questionnaire" },
            url: "https://hut.ac.ir/documents/38165/83847/porsheshetebar.docx/60755296-187f-4f3f-526d-c9e7f96d2785",
            format: "docx",
          },
          {
            title: { fa: "قالب گزارش نهایی طرح پژوهشی (Word)", en: "Final project report template (Word)" },
            url: "https://hut.ac.ir/documents/38165/83847/final_report.docx/a923c222-aea1-146a-28f0-09b48251ce40",
            format: "docx",
          },
          {
            title: { fa: "قالب گزارش نهایی طرح پژوهشی (PDF)", en: "Final project report template (PDF)" },
            url: "https://hut.ac.ir/documents/38165/83847/final_report.pdf/dafbcef8-308d-d838-a10f-5f881308497b",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "فرم‌های گرنت", en: "Grant forms" },
        documents: [
          {
            title: { fa: "فرم درخواست گرنت پژوهشی", en: "Research grant application" },
            url: "https://hut.ac.ir/documents/38165/83847/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA+%DA%AF%D8%B1%D9%86%D8%AA.docx/b738e8d6-4738-b801-cd06-e00206b3f540",
            format: "docx",
          },
          {
            title: { fa: "روند تسویه‌حساب اقساط گرنت پژوهشی", en: "Settling research grant instalments" },
            url: "https://hut.ac.ir/documents/38165/83847/%D8%B1%D9%88%DB%8C%D9%87-%D8%AA%D8%B3%D9%88%DB%8C%D9%87-%D8%AD%D8%B3%D8%A7%D8%A8.docx/eb674eee-9bee-30a5-b5b9-7ba07665f976",
            format: "docx",
          },
          {
            title: { fa: "فرم الف: روکش تسویه‌حساب گرنت", en: "Form A: grant settlement cover sheet" },
            url: "https://hut.ac.ir/documents/38165/83847/%D9%81%D8%B1%D9%85+%D8%A7%D9%84%D9%81+-+%D8%B1%D9%88%DA%A9%D8%B4+%D8%AA%D8%B3%D9%88%DB%8C%D9%87+%DA%AF%D8%B1%D9%86%D8%AA.docx/a0a30cc1-9e97-06d5-e484-ae2485058c5c",
            format: "docx",
          },
          {
            title: { fa: "فرم ب: ریز هزینه‌های بدون فاکتور", en: "Form B: costs without invoices" },
            url: "https://hut.ac.ir/documents/38165/83847/%D9%81%D8%B1%D9%85+%D8%A8-+%D8%B1%DB%8C%D8%B2+%D8%A8%D8%AF%D9%88%D9%86+%D9%81%D8%A7%DA%A9%D8%AA%D9%88%D8%B1+%281%29.docx/25b9c09b-5e12-0774-c16a-1941e0ed20fb",
            format: "docx",
          },
        ],
      },
    ],
  },
  {
    key: "faculty",
    icon: "faculty",
    title: { fa: "اعضای هیئت علمی", en: "Faculty" },
    groups: [
      {
        title: { fa: "فرصت مطالعاتی", en: "Sabbaticals" },
        documents: [
          {
            title: { fa: "کاربرگ فرصت مطالعاتی", en: "Sabbatical application" },
            url: "https://hut.ac.ir/documents/38165/83847/forsat-motaleat-2.doc/c362a38c-1548-2f01-dae7-b53bc9c42132",
            format: "doc",
          },
          {
            title: { fa: "گزارش نهایی فرصت مطالعاتی", en: "Sabbatical final report" },
            url: "https://www.hut.ac.ir/documents/38165/83847/%DA%AF%D8%B2%D8%A7%D8%B1%D8%B4+%D9%86%D9%87%D8%A7%DB%8C%DB%8C+%D9%81%D8%B1%D8%B5%D8%AA+%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A7%D8%AA%DB%8C.docx/7f608e93-07a7-1548-6c56-d072fb4b4bc5",
            format: "docx",
          },
        ],
      },
    ],
  },

  /*------ Office Files ------*/
  // The graduate office's files, from web.hut.ac.ir/web/edu/اداره-تحصیلات-تکمیلی2, grouped by the step of a degree they
  // belong to.
  {
    key: "graduate-guides",
    icon: "guides",
    office: "graduate",
    title: { fa: "راهنماها و فرم‌ها، مرحله به مرحله", en: "Guides and forms, step by step" },
    groups: [
      {
        title: { fa: "۱. پذیرش و انتخاب واحد", en: "1. Admission and registration" },
        documents: [
          {
            title: { fa: "راهنمای پذیرش", en: "Admission guide" },
            url: "https://edu.hut.ac.ir/documents/228119/354443/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D9%BE%D8%B0%DB%8C%D8%B1%D8%B4.pdf/6efee134-bce4-3a6b-1c23-d3220dc011dc",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای انتخاب واحد", en: "Course registration guide" },
            url: "https://edu.hut.ac.ir/documents/228119/354461/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8+%D9%88%D8%A7%D8%AD%D8%AF.pdf/e4ae9e36-3d57-3fa5-6974-dbdaf08fbf2d",
            format: "pdf",
          },
          {
            title: { fa: "مدت تحصیل مقطع کارشناسی ارشد", en: "Length of master's studies" },
            url: "https://web.hut.ac.ir/documents/228119/0/%D8%B3%D9%86%D9%88%D8%A7%D8%AA+%D8%A7%D8%B1%D8%B4%D8%AF+%D9%88%D8%B1%D9%88%D8%AF%DB%8C+1402+%D8%A8%D9%87+%D8%A8%D8%B9%D8%AF.pdf/b41d8ae3-463a-bdc6-f843-caa5e1e9d67a",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای دریافت گواهی اشتغال به تحصیل", en: "Getting an enrolment certificate" },
            url: "https://web.hut.ac.ir/documents/228119/2286655/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%DA%AF%D9%88%D8%A7%D9%87.pdf/84c8c564-6de8-9ce5-422c-b1f4827d195f",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "۲. انتخاب استاد راهنما", en: "2. Choosing a supervisor" },
        documents: [
          {
            title: { fa: "فلوچارت مراحل انتخاب استاد راهنما", en: "Flowchart: choosing a supervisor" },
            url: "https://edu.hut.ac.ir/documents/228119/353923/%D9%81%D9%84%D9%88%DA%86%D8%A7%D8%B1%D8%AA+%D9%85%D8%B1%D8%A7%D8%AD%D9%84+%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8+%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF+%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7.pdf/c817e1a2-6f18-17f4-2a60-84921eac3cba",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای پیشخوان خدمت گلستان", en: "Golestan service desk guide" },
            url: "https://edu.hut.ac.ir/documents/228119/353923/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7.pdf/4db74ca2-26b8-220d-5462-620f2c71cc24",
            format: "pdf",
          },
          {
            title: {
              fa: "راهنمای ثبت درخواست در پیشخوان خدمت گلستان",
              en: "Filing a request at the Golestan service desk",
            },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%AB%D8%A8%D8%AA+%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C+%DA%A9%D8%A7%D8%B1%D8%B4%D9%86%D8%A7%D8%B3%DB%8C+%D8%A7%D8%B1%D8%B4%D8%AF+%D8%AF%D8%B1+%D9%BE%DB%8C%D8%B4%D8%AE%D9%88%D8%A7%D9%86+%D8%AE%D8%AF%D9%85%D8%AA+%D8%B3%D8%A7%D9%85%D8%A7%D9%86%D9%87+%DA%AF%D9%84%D8%B3%D8%AA%D8%A7%D9%86.pdf/01afa1fc-f784-163a-eaf2-601122200b07",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "۳. سمینار", en: "3. Seminar" },
        documents: [
          {
            title: { fa: "قوانین اخذ درس سمینار", en: "Seminar course rules" },
            url: "https://edu.hut.ac.ir/documents/228119/354641/%D9%82%D9%88%D8%A7%D9%86%DB%8C%D9%86+%D8%A7%D8%AE%D8%B0+%D8%AF%D8%B1%D8%B3+%D8%B3%D9%85%DB%8C%D9%86%D8%A7%D8%B1.pdf/7e96d532-6579-524b-79da-b9507bb3382f",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای استفاده از فرم سمینار", en: "Using the seminar form" },
            url: "https://edu.hut.ac.ir/documents/228119/354641/%D8%B3%D9%85%DB%8C%D9%86%D8%A7%D8%B1.pdf/c0852ea1-109f-d39f-fc11-c50966b589f0",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "۴. پروپوزال", en: "4. Proposal" },
        documents: [
          {
            title: { fa: "فلوچارت مراحل تصویب عنوان پایان‌نامه", en: "Flowchart: approving a thesis title" },
            url: "https://edu.hut.ac.ir/documents/228119/354165/%D9%81%D9%84%D9%88%DA%86%D8%A7%D8%B1%D8%AA+%D9%85%D8%B1%D8%A7%D8%AD%D9%84+%D8%AA%D8%B5%D9%88%DB%8C%D8%A8+%D8%B9%D9%86%D9%88%D8%A7%D9%86+%D9%BE%D8%A7%DB%8C%D8%A7%D9%86.pdf/19cdb79f-6bdb-7ded-939e-675088c2a55c",
            format: "pdf",
          },
          {
            title: { fa: "فرم پروپوزال", en: "Proposal form" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D9%81%D8%B1%D9%85+%D9%BE%D8%B1%D9%88%D9%BE%D9%88%D8%B2%D8%A7%D9%84+%D8%A7%D8%B1%D8%B4%D8%AF.docx/55a81c88-8fe0-c64b-b5bd-1375590ee44d",
            format: "docx",
          },
          {
            title: { fa: "راهنمای پروپوزال", en: "Proposal guide" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D9%BE%D8%B1%D9%88%D9%BE.pdf/465118e0-a70d-c94f-e311-bd3e68db365b",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "۵. گزارش پیشرفت", en: "5. Progress reports" },
        documents: [
          {
            title: { fa: "فرم ارائه گزارش پیشرفت تحصیلی", en: "Progress report form" },
            url: "https://edu.hut.ac.ir/documents/228119/639344/%D8%A7%D8%B1%D8%A7%D8%A6%D9%87+%DA%AF%D8%B2%D8%A7%D8%B1%D8%B4+%D9%BE%DB%8C%D8%B4%D8%B1%D9%81%D8%AA+%D8%AA%D8%AD%D8%B5%DB%8C%D9%84%DB%8C.pdf/2c4e1895-ccc2-dc50-67d7-d63694569e2e",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای ثبت گزارش پیشرفت پایان‌نامه", en: "Filing a thesis progress report" },
            url: "https://edu.hut.ac.ir/documents/228119/639344/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%AB%D8%A8%D8%AA+%DA%AF%D8%B2%D8%A7%D8%B1%D8%B4+%D9%BE%DB%8C%D8%B4%D8%B1%D9%81%D8%AA+%D9%BE%D8%A7%DB%8C%D8%A7%D9%86.pdf/7a67db86-5af2-807a-b58a-456e07546c41",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "۶. دفاع", en: "6. Defence" },
        documents: [
          {
            title: { fa: "دستورالعمل تدوین پایان‌نامه", en: "Thesis formatting instructions" },
            url: "https://edu.hut.ac.ir/documents/228119/353936/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%84%D8%B9%D9%85%D9%84+%D8%AA%D8%AF%D9%88%DB%8C%D9%86+%D9%BE%D8%A7%DB%8C%D8%A7%D9%86+%D9%86%D8%A7%D9%85%D9%87.docx/49555ae7-dad9-843f-9e1f-1a2ee9f551db",
            format: "docx",
          },
          {
            title: { fa: "راهنمای سامانه همانندجو", en: "Plagiarism check guide" },
            url: "https://edu.hut.ac.ir/documents/228119/353936/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%B3%D8%A7%D9%85%D8%A7%D9%86%D9%87+%D9%87%D9%85%D8%A7%D9%86%D9%86%D8%AF%D8%AC%D9%88.pdf/5b6eb815-e1ad-a4b7-645c-87d2bbf66f34",
            format: "pdf",
          },
          {
            title: { fa: "فلوچارت دفاع", en: "Flowchart: the defence" },
            url: "https://edu.hut.ac.ir/documents/228119/353936/%D9%81%D9%84%D9%88%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D9%81%D8%A7%D8%B9+.pdf/b63685ea-975f-5cac-4ca8-0db098227435",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای دفاع", en: "Defence guide" },
            url: "https://edu.hut.ac.ir/documents/228119/353936/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7-+%D8%AF%D9%81%D8%A7%D8%B9.pdf/a258080e-617d-99e3-3f19-555a674f3adc",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه دفاع از پایان‌نامه کارشناسی ارشد", en: "Master's thesis defence rules" },
            url: "https://web.hut.ac.ir/documents/228119/1711506/%D8%B4%DB%8C%D9%88%D9%87+%D9%86%D8%A7%D9%85%D9%87+%D8%AF%D9%81%D8%A7.pdf/262c4ba1-f479-1ce7-43c2-a93e4b88902f",
            format: "pdf",
          },
          {
            title: { fa: "فرم اطلاعیه دفاع", en: "Defence notice form" },
            url: "https://web.hut.ac.ir/documents/228119/1711506/%D8%A7%D8%B7%D9%84%D8%A7%D8%B9%DB%8C%D9%87+%D8%AF%D9%81%D8%A7%D8%B9+%2829%29.docx/1538d8f3-c015-326f-6542-1a2cddf298e9",
            format: "docx",
          },
          {
            title: { fa: "فرم حضور در جلسه دفاع", en: "Defence attendance form" },
            url: "https://web.hut.ac.ir/documents/228119/1711506/%D8%AD%D8%B6%D9%88%D8%B1+%D8%AF%D8%B1+%D8%AC%D9%84%D8%B3%D9%87+%D8%AF%D9%81%D8%A7%D8%B9.docx/794822ad-394b-98aa-eb9c-2a49741fdbb7",
            format: "docx",
          },
          {
            title: { fa: "اصلاحات پایان‌نامه", en: "Thesis corrections" },
            url: "https://web.hut.ac.ir/documents/228119/353936/%D8%A7%D8%B5%D9%84%D8%A7%D8%AD%D8%A7%D8%AA+%D9%BE%D8%A7%DB%8C%D8%A7%D9%86+%D9%86%D8%A7%D9%85%D9%87.pdf/e8e8dd1f-ccf7-f024-4bcb-1d8fe503216c",
            format: "pdf",
          },
          {
            title: { fa: "هزینه تکثیر", en: "Printing costs" },
            url: "https://edu.hut.ac.ir/documents/228119/353936/%D9%87%D8%B2%DB%8C%D9%86%D9%87+%D8%AA%DA%A9%D8%AB%DB%8C%D8%B1.docx/08e27f3f-4c63-2241-b20c-84407b30803b",
            format: "docx",
          },
        ],
      },
      {
        title: { fa: "۷. تسویه حساب", en: "7. Clearance" },
        documents: [
          {
            title: { fa: "مراحل تسویه حساب دانشجوی کارشناسی ارشد", en: "Master's clearance steps" },
            url: "https://edu.hut.ac.ir/documents/228119/354479/%D9%85%D8%B1%D8%A7%D8%AD%D9%84+%D8%AA%D8%B3%D9%88%DB%8C%D9%87+%D8%AD%D8%B3%D8%A7%D8%A8+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C+%DA%A9%D8%A7%D8%B1.pdf/ea4d8060-c577-6ede-0932-8b7bf193d445",
            format: "pdf",
          },
        ],
      },
      {
        title: { fa: "دکتری", en: "Doctorate" },
        documents: [
          {
            title: { fa: "فرم درخواست انتخاب استاد راهنمای دانشجویان دکتری", en: "PhD supervisor request form" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF+%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7+%D8%AF%DA%A9%D8%AA%D8%B1%DB%8C+%281%29.doc/6da67c09-ee5c-8887-1bbe-e60cdd0fd2f9",
            format: "doc",
          },
          {
            title: { fa: "فرم پروپوزال دانشجویان دکتری", en: "PhD proposal form" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D9%81%D8%B1%D9%85+%D9%BE%D8%B1%D9%88%D9%BE%D9%88%D8%B2%D8%A7%D9%84+%D8%AF%DA%A9%D8%AA%D8%B1%DB%8C+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C+%D9%87%D9%85.docx/b7363565-66eb-4d42-fddb-e6dc39b7445f",
            format: "docx",
          },
          {
            title: { fa: "فلوچارت درخواست جذب دانشجوی استادمحور", en: "Flowchart: supervisor-led PhD admission" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D9%81%D9%84%D9%88%DA%86%D8%A7%D8%B1%D8%AA+%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA+%D8%A7%D8%AE%D8%B0+%D8%AF%D8%A7%D9%86%D8%B4%D8%AC%D9%88%DB%8C+%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF%D9%85%D8%AD%D9%88%D8%B1.pdf/34892047-5301-96b9-d00d-056dc1c11601",
            format: "pdf",
          },
        ],
      },
    ],
  },
  {
    key: "graduate-regulations",
    icon: "regulations",
    office: "graduate",
    title: { fa: "آیین‌نامه‌ها", en: "Regulations" },
    groups: [
      {
        title: { fa: "آیین‌نامه‌ها", en: "Regulations" },
        documents: [
          {
            title: { fa: "آیین‌نامه کارشناسی ارشد", en: "Master's regulations" },
            url: "https://web.hut.ac.ir/documents/228119/0/%D9%82%D9%88%D8%A7%D9%86%DB%8C%D9%86+%D8%A7%D8%B1%D8%B4%D8%AF+.pdf/acd8e785-b600-b3a6-347f-61b0e42d9264",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه دکتری تخصصی", en: "PhD regulations" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D8%A2%DB%8C%DB%8C%D9%86+%D9%86%D8%A7%D9%85%D9%87+%D8%AF%DA%A9%D8%AA%D8%B1%DB%8C+%D8%B5%D9%86%D8%B9%D8%AA%DB%8C+%D9%87%D9%85%D8%AF%D8%A7%D9%86.pdf/9ac214ee-d5aa-0527-f4a6-1d6440e5a395",
            format: "pdf",
          },
          {
            title: { fa: "شیوه‌نامه بسندگی زبان خارجی دانشجویان دکتری", en: "PhD foreign-language proficiency" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D8%A8%D8%B3%D9%86%D8%AF%DA%AF%DB%8C+%D8%B2%D8%A8%D8%A7%D9%86.pdf/7909072c-f2d9-8348-2da6-4c6739ebab24",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه تشویق مقاله", en: "Paper award regulations" },
            url: "https://web.hut.ac.ir/documents/228119/1662408/%D8%AA%D8%B4%D9%88%DB%8C%D9%82-%D9%85%D9%82%D8%A7%D9%84%D9%87.pdf/1474f2d0-5f06-fd31-1914-5abce648ac09",
            format: "pdf",
          },
          {
            title: { fa: "آیین‌نامه ورودی ممتاز کارشناسی ارشد", en: "Top-ranked master's entry" },
            url: "https://web.hut.ac.ir/documents/228119/1662408/%D9%88%D8%B1%D9%88%D8%AF%DB%8C-%D9%85%D9%85%D8%AA%D8%A7%D8%B2-%D8%A7%D8%B1%D8%B4%D8%AF.pdf/d9315931-f9c6-6c6f-36ab-f73ffcca8ecd",
            format: "pdf",
          },
          {
            title: { fa: "راهنمای تأسیس رشته", en: "Founding a new programme" },
            url: "https://web.hut.ac.ir/documents/228119/350457/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C+%D8%AA%D8%A7%D8%B3%DB%8C%D8%B3+%D8%B1%D8%B4%D8%AA%D9%87.zip/64792529-3c21-bf04-2baf-22ff96fc05db",
            format: "zip",
          },
        ],
      },
    ],
  },
];

import { createCaptchaChallengeProcedure } from "#/orpc/captcha/procedure";
import { submitConsultationProcedure } from "#/orpc/consultation/procedure";
import { getDepartmentProcedure, listDepartmentsProcedure } from "#/orpc/department/procedure";
import { getPhonebookProcedure } from "#/orpc/directory/procedure";
import { submitFeedbackProcedure } from "#/orpc/feedback/procedure";
import {
  getArticleProcedure,
  getHomeFeedProcedure,
  listArchiveProcedure,
  syncHomeFeedProcedure,
} from "#/orpc/home-feed/procedure";
import { implementer } from "#/orpc/implementer.server";
import { getLibraryFormsProcedure } from "#/orpc/library/procedure";
import { uploadMediaProcedure } from "#/orpc/media/procedure";
import { createNoteProcedure, deleteNoteProcedure, listNotesProcedure } from "#/orpc/note/procedure";
import { getOfficeProcedure, listOfficesProcedure } from "#/orpc/office/procedure";
import { viewerProcedure } from "#/orpc/session/procedure";
import { siteOriginProcedure } from "#/orpc/site/procedure";

/*===== API Router =====*/
// Assembled with the undecorated implementer (see `implementer.server.ts`).
export const router = implementer.router({
  captcha: {
    createChallenge: createCaptchaChallengeProcedure,
  },
  consultation: {
    submit: submitConsultationProcedure,
  },
  department: {
    get: getDepartmentProcedure,
    list: listDepartmentsProcedure,
  },
  directory: {
    phonebook: getPhonebookProcedure,
  },
  feedback: {
    submit: submitFeedbackProcedure,
  },
  homeFeed: {
    get: getHomeFeedProcedure,
    article: getArticleProcedure,
    list: listArchiveProcedure,
    sync: syncHomeFeedProcedure,
  },
  library: {
    forms: getLibraryFormsProcedure,
  },
  media: {
    upload: uploadMediaProcedure,
  },
  note: {
    list: listNotesProcedure,
    create: createNoteProcedure,
    delete: deleteNoteProcedure,
  },
  office: {
    get: getOfficeProcedure,
    list: listOfficesProcedure,
  },
  session: {
    viewer: viewerProcedure,
  },
  site: {
    origin: siteOriginProcedure,
  },
});

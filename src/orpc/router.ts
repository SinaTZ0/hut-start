import { createCaptchaChallengeProcedure } from "#/orpc/captcha/procedure";
import { submitConsultationProcedure } from "#/orpc/consultation/procedure";
import { getDepartmentProcedure, listDepartmentsProcedure } from "#/orpc/department/procedure";
import { submitFeedbackProcedure } from "#/orpc/feedback/procedure";
import { getHomeFeedProcedure, syncHomeFeedProcedure } from "#/orpc/home-feed/procedure";
import { implementer } from "#/orpc/implementer.server";
import { uploadMediaProcedure } from "#/orpc/media/procedure";
import { createNoteProcedure, deleteNoteProcedure, listNotesProcedure } from "#/orpc/note/procedure";
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
  feedback: {
    submit: submitFeedbackProcedure,
  },
  homeFeed: {
    get: getHomeFeedProcedure,
    sync: syncHomeFeedProcedure,
  },
  media: {
    upload: uploadMediaProcedure,
  },
  note: {
    list: listNotesProcedure,
    create: createNoteProcedure,
    delete: deleteNoteProcedure,
  },
  session: {
    viewer: viewerProcedure,
  },
  site: {
    origin: siteOriginProcedure,
  },
});

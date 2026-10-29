import { captchaContract } from "#/orpc/captcha/contract";
import { consultationContract } from "#/orpc/consultation/contract";
import { departmentContract } from "#/orpc/department/contract";
import { directoryContract } from "#/orpc/directory/contract";
import { feedbackContract } from "#/orpc/feedback/contract";
import { homeFeedContract } from "#/orpc/home-feed/contract";
import { libraryContract } from "#/orpc/library/contract";
import { mediaContract } from "#/orpc/media/contract";
import { noteContract } from "#/orpc/note/contract";
import { officeContract } from "#/orpc/office/contract";
import { sessionContract } from "#/orpc/session/contract";
import { siteContract } from "#/orpc/site/contract";

/*===== API Contract =====*/
// Source of truth for the API. The browser client is typed from this, never from the router.
export const contract = {
  captcha: captchaContract,
  consultation: consultationContract,
  department: departmentContract,
  directory: directoryContract,
  feedback: feedbackContract,
  homeFeed: homeFeedContract,
  library: libraryContract,
  media: mediaContract,
  note: noteContract,
  office: officeContract,
  session: sessionContract,
  site: siteContract,
};

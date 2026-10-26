import { captchaContract } from "#/orpc/captcha/contract";
import { consultationContract } from "#/orpc/consultation/contract";
import { departmentContract } from "#/orpc/department/contract";
import { feedbackContract } from "#/orpc/feedback/contract";
import { homeFeedContract } from "#/orpc/home-feed/contract";
import { mediaContract } from "#/orpc/media/contract";
import { noteContract } from "#/orpc/note/contract";
import { sessionContract } from "#/orpc/session/contract";
import { siteContract } from "#/orpc/site/contract";

/*===== API Contract =====*/
// Source of truth for the API. The browser client is typed from this, never from the router.
export const contract = {
  captcha: captchaContract,
  consultation: consultationContract,
  department: departmentContract,
  feedback: feedbackContract,
  homeFeed: homeFeedContract,
  media: mediaContract,
  note: noteContract,
  session: sessionContract,
  site: siteContract,
};

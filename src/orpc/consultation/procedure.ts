import { submitConsultation } from "#/orpc/consultation/service";
import { base } from "#/orpc/implementer.server";
import { captchaMiddleware } from "#/orpc/middleware/captcha/captcha.middleware";
import { provideDbMiddleware } from "#/orpc/middleware/db/db.middleware";
import { rateLimitMiddleware } from "#/orpc/middleware/rate-limit/rate-limit.middleware";

/*===== Submit =====*/
// Public and writing, so it gets its own limit on top of the captcha. Kept loose enough for many students behind one
// mobile carrier's address (docs/backend/architecture.md → Rate limiting).
const SUBMIT_RATE_LIMIT = { name: "consultation-submit", limit: 10, windowMs: 10 * 60_000 };

export const submitConsultationProcedure = base.consultation.submit
  .use(rateLimitMiddleware(SUBMIT_RATE_LIMIT))
  .use(captchaMiddleware)
  .use(provideDbMiddleware)
  .handler(async ({ context, input, errors }) => {
    const result = await submitConsultation({ db: context.db, input });

    if (result.kind === "invalid") throw errors.INVALID_INPUT({ data: { errors: [], fields: result.fields } });

    return result.receipt;
  });

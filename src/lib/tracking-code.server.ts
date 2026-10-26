import { createTrackingCode, type TrackingCodeKind } from "#/lib/tracking-code";

/*===== Issuing Codes =====*/
// Postgres' code for a unique index violation. Drizzle wraps the driver's error, so the code may be on its `cause`.
const UNIQUE_VIOLATION = "23505";
const ATTEMPTS = 3;

function errorCode(value: unknown): unknown {
  return (value as { code?: unknown } | null)?.code;
}

function isUniqueViolation(error: unknown): boolean {
  return (
    errorCode(error) === UNIQUE_VIOLATION ||
    errorCode((error as { cause?: unknown } | null)?.cause) === UNIQUE_VIOLATION
  );
}

/**
 * Runs `insert` with a fresh tracking code, and again with a new code if that one is taken. With 32⁸ codes a year a
 * clash is very unlikely; the retry only keeps one from turning into a failed submission.
 *
 * `insert` must write nothing else that would survive a failed attempt (one insert, or its own transaction).
 *
 * @throws the last error once every attempt hit a taken code, and any other error at once.
 */
export async function withTrackingCode<T>({
  kind,
  insert,
}: {
  kind: TrackingCodeKind;
  insert: (trackingCode: string) => Promise<T>;
}): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await insert(createTrackingCode({ kind }));
    } catch (error) {
      if (attempt >= ATTEMPTS || !isUniqueViolation(error)) throw error;
    }
  }
}

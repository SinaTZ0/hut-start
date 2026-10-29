import type { Database } from "#/db/client.server";
import { localize } from "#/lib/localized-text";
import { oneOf } from "#/orpc/allowed-values";
import { DIRECTORY_GROUPS, DIRECTORY_ROLES } from "#/orpc/directory/constants";
import type { Phonebook } from "#/orpc/directory/contract";
import { findEntries, findUnits } from "#/orpc/directory/repository";

/*===== Phone Book =====*/
/** Every unit with its people, in the request's locale. Units with nobody in them are left out. */
export async function getPhonebook({ db }: { db: Database }): Promise<Phonebook> {
  const [units, entries] = await Promise.all([findUnits({ db }), findEntries({ db })]);

  const result = units
    .map((unit) => ({
      key: unit.key,
      group: oneOf({ allowed: DIRECTORY_GROUPS, value: unit.group, what: "directory group" }),
      name: localize(unit.name),
      entries: entries
        .filter((entry) => entry.unitId === unit.id)
        .map((entry) => ({
          id: entry.id,
          name: localize(entry.name),
          role: entry.role ? oneOf({ allowed: DIRECTORY_ROLES, value: entry.role, what: "directory role" }) : null,
          extensions: entry.extensions,
        })),
    }))
    .filter((unit) => unit.entries.length > 0);

  const updatedAt = units.reduce<Date | null>(
    (latest, unit) => (latest && latest > unit.updatedAt ? latest : unit.updatedAt),
    null,
  );
  return { units: result, updatedAt };
}

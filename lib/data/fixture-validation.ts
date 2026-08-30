import type { CommonFixture, FixtureStatus, KickoffStatus, MatchCategory } from "../types/fixture";
export type FixtureValidationError = { fixtureId: string; field: string; message: string };
const categories = new Set<MatchCategory>(["top", "u21", "beleza"]);
const statuses = new Set<FixtureStatus>(["scheduled", "live", "half_time", "finished", "postponed", "cancelled", "abandoned"]);
const kickoffStatuses = new Set<KickoffStatus>(["confirmed", "tbd", "date_range"]);

export const validateFixture = (fixture: CommonFixture): FixtureValidationError[] => {
  const errors: FixtureValidationError[] = [];
  const add = (field: string, message: string) => errors.push({ fixtureId: fixture.id || "(unknown)", field, message });
  if (!fixture.id?.trim()) add("id", "id is required");
  if (!categories.has(fixture.category)) add("category", "category is invalid");
  if (!fixture.teamName?.trim()) add("teamName", "teamName is required");
  if (!fixture.opponentName?.trim()) add("opponentName", "opponentName is required");
  if (!fixture.competition?.name?.trim()) add("competition.name", "competition name is required");
  if (!kickoffStatuses.has(fixture.kickoffStatus)) add("kickoffStatus", "kickoffStatus is invalid");
  if (!statuses.has(fixture.status)) add("status", "status is invalid");
  if (fixture.kickoffAt !== undefined && Number.isNaN(Date.parse(fixture.kickoffAt))) add("kickoffAt", "kickoffAt must be a valid date");
  if (fixture.kickoffStatus === "confirmed" && fixture.kickoffAt === undefined) add("kickoffAt", "confirmed kickoff requires kickoffAt");
  if (fixture.kickoffStatus !== "confirmed" && fixture.kickoffAt !== undefined) add("kickoffAt", "non-confirmed kickoff must not have kickoffAt");
  if (fixture.score && (!Number.isInteger(fixture.score.home) || fixture.score.home < 0 || !Number.isInteger(fixture.score.away) || fixture.score.away < 0)) add("score", "score must contain non-negative integers");
  if (fixture.status === "finished" && (!fixture.score || fixture.kickoffAt === undefined)) add("status", "finished fixture requires kickoffAt and score");
  if (fixture.status === "scheduled" && fixture.score) add("score", "scheduled fixture should not have a score");
  if (fixture.sourceUrl !== undefined && !/^https?:\/\//.test(fixture.sourceUrl)) add("sourceUrl", "sourceUrl must use http or https");
  return errors;
};
export const validateFixtures = (fixtures: readonly CommonFixture[]) => {
  const errors = fixtures.flatMap(validateFixture);
  const ids = new Set<string>(); const detailIds = new Set<string>();
  fixtures.forEach((fixture) => {
    if (ids.has(fixture.id)) errors.push({ fixtureId: fixture.id, field: "id", message: "duplicate fixture id" }); ids.add(fixture.id);
    if (fixture.detailMatchId && detailIds.has(fixture.detailMatchId)) errors.push({ fixtureId: fixture.id, field: "detailMatchId", message: "duplicate detailMatchId" });
    if (fixture.detailMatchId) detailIds.add(fixture.detailMatchId);
  });
  return errors;
};

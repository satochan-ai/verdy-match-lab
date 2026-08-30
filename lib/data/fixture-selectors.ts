import type { CommonFixture, MatchCategory } from "../types/fixture";

const timeOf = (value?: string) => {
  if (!value) return undefined;
  const time = Date.parse(value);
  return Number.isNaN(time) ? undefined : time;
};
const pending = (fixture: CommonFixture) => fixture.status === "scheduled" && (fixture.kickoffStatus === "tbd" || fixture.kickoffStatus === "date_range");
const orderedUpcoming = (fixtures: readonly CommonFixture[], now: Date) => {
  const confirmed: { fixture: CommonFixture; time: number; index: number }[] = [];
  const pendingFixtures: { fixture: CommonFixture; index: number }[] = [];
  fixtures.forEach((fixture, index) => {
    const time = timeOf(fixture.kickoffAt);
    if (fixture.status === "scheduled" && fixture.kickoffStatus === "confirmed" && time !== undefined && time > now.getTime()) confirmed.push({ fixture, time, index });
    else if (pending(fixture)) pendingFixtures.push({ fixture, index });
  });
  confirmed.sort((a, b) => a.time - b.time || a.index - b.index);
  return [...confirmed.map((item) => item.fixture), ...pendingFixtures.map((item) => item.fixture)];
};

export const getNextFixture = (fixtures: readonly CommonFixture[], now = new Date()) => orderedUpcoming(fixtures, now)[0];
export const getUpcomingFixtures = (fixtures: readonly CommonFixture[], now = new Date(), limit = 5) => limit > 0 ? orderedUpcoming(fixtures, now).slice(0, limit) : [];
export const getLatestFinishedFixture = (fixtures: readonly CommonFixture[]) => fixtures.filter((f) => f.status === "finished" && f.score !== undefined && timeOf(f.kickoffAt) !== undefined).sort((a, b) => (timeOf(b.kickoffAt) ?? 0) - (timeOf(a.kickoffAt) ?? 0))[0];
export const getSeasonHistory = (fixtures: readonly CommonFixture[], options: { category?: MatchCategory } = {}) => fixtures.filter((f) => f.status === "finished" && f.score !== undefined && timeOf(f.kickoffAt) !== undefined).filter((f) => options.category === undefined || f.category === options.category).sort((a, b) => (timeOf(b.kickoffAt) ?? 0) - (timeOf(a.kickoffAt) ?? 0));

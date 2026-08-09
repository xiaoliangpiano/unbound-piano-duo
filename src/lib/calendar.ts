import type { Performance } from "@/data/calendar";

export function sortPerformancesByDate(
  performances: Performance[]
): Performance[] {
  return [...performances].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getNextUpcomingPerformance(
  performances: Performance[],
  referenceDate: Date = new Date()
): Performance | undefined {
  return sortPerformancesByDate(performances).find(
    (performance) =>
      performance.status === "Upcoming" &&
      new Date(performance.date).getTime() >= referenceDate.getTime()
  );
}

export function formatAbbreviatedDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);
  const month = date
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  return `${month} ${date.getDate()}`;
}

export function formatFullDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const US_STATE_ABBREVIATIONS: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
  "district of columbia": "DC",
};

export function getCityStateAbbreviated(city: string): string {
  const [cityPart, statePart] = city.split(",").map((part) => part.trim());
  if (!statePart) return cityPart ?? city;

  const abbreviation = US_STATE_ABBREVIATIONS[statePart.toLowerCase()];
  return abbreviation ? `${cityPart}, ${abbreviation}` : city;
}

export function getYearRange(performances: Performance[]): string {
  if (performances.length === 0) return "";
  const years = performances.map((performance) =>
    new Date(performance.date).getFullYear()
  );
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min}` : `${min} — ${max}`;
}

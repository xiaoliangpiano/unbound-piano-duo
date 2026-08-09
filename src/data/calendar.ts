export type PerformanceStatus = "Upcoming" | "Past" | "Cancelled";

export interface Performance {
  date: string;
  venue: string;
  city: string;
  location: string;
  time: string;
  status: PerformanceStatus;
  image: string;
}

export const calendar: Performance[] = [
  {
    date: "2026-09-18",
    venue: "Spelman College",
    city: "Atlanta, Georgia",
    location: "TBA",
    time: "TBA",
    status: "Upcoming",
    image: "/images/calendar/spelman-college.jpg",
  },
  {
    date: "2026-10-16",
    venue: "Auburn University",
    city: "Auburn, Alabama",
    location: "TBA",
    time: "TBA",
    status: "Upcoming",
    image: "/images/calendar/auburn-university.jpg",
  },
  {
    date: "2026-11-12",
    venue: "Fountain Street Church",
    city: "Grand Rapids, Michigan",
    location: "TBA",
    time: "TBA",
    status: "Upcoming",
    image: "/images/calendar/fountain-street-church.jpg",
  },
  {
    date: "2027-02-21",
    venue: "University of Virginia's College at Wise",
    city: "Wise, Virginia",
    location: "Cantrell Hall",
    time: "2:00 PM",
    status: "Upcoming",
    image: "/images/calendar/uva-wise.jpg",
  },
];

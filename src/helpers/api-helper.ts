import { Event } from "@web/common/types/types";

const getAllEvents = async () => {
  const response = await fetch(
    "https://events-calendar-3bc83-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await response.json();

  const events: Event[] = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
};

const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
};

const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id) ?? null;
};

export { getAllEvents, getFeaturedEvents, getEventById, getFilteredEvents };

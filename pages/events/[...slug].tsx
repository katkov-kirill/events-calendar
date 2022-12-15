import { getFilteredEvents } from "@web/helpers/api-helper";
import {
  PageHead,
  ResultsTitle,
  Button,
  EventList,
  ErrorAlert,
} from "@web/components/components";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const FilteredEvents: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ events, hasError, date }) => {
  if (hasError) {
    return (
      <ErrorAlert>
        <PageHead title="Filtered Events" />
        <h2>Invalid filters.</h2>
      </ErrorAlert>
    );
  }

  const filteredItems = events;

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <>
        <PageHead title="Filtered Events" />
        <ErrorAlert>
          <h2>No events for specified period</h2>
        </ErrorAlert>
        <Button link="/events">Show all events</Button>
      </>
    );
  }

  const displayDate = new Date(date.year, date.month - 1);

  return (
    <>
      <PageHead title="Filtered Events" />
      <ResultsTitle date={displayDate} />
      <EventList items={filteredItems} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.slug;

  if (!query) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredYear = query[0];
  const filteredMonth = query[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth)) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
};

export default FilteredEvents;

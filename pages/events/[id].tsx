import { getAllEvents, getEventById } from "@web/helpers/api-helper";
import {
  EventSummary,
  PageHead,
  EventLogistics,
  EventContent,
  ErrorAlert,
} from "@web/components/components";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Event } from "@web/common/types/types";

const EventDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  event,
}) => {
  if (!event) {
    return (
      <ErrorAlert>
        <PageHead title="Not found" />
        <h2>No event found :c</h2>
      </ErrorAlert>
    );
  }

  return (
    <>
      <PageHead title={event.title} />
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ event: Event | null }> = async (
  context
) => {
  const eventId = context.params?.id;

  const event = await getEventById(eventId as string);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths,
    fallback: false,
  };
};

export default EventDetail;

import { EventList, PageHead, EventsSearch } from "@web/components/components";
import { getAllEvents } from "@web/helpers/api-helper";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

const Events: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  items,
}) => {
  const router = useRouter();

  const handleFindEvent = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <PageHead title="All Events" />
      <EventsSearch onSearch={handleFindEvent} />
      <EventList items={items} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      items: events,
    },
    revalidate: 60,
  };
};

export default Events;

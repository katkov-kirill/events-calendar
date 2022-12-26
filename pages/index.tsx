import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { EventList, PageHead } from "@web/components/components";
import { getFeaturedEvents } from "@web/helpers/api-helper";
import NewsletterRegistration from "@web/components/newsletter-registration/newsletter-registration";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  items,
}) => {
  return (
    <div>
      <PageHead title="Events Calendar" />
      <NewsletterRegistration />
      <EventList items={items} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getFeaturedEvents();

  return {
    props: {
      items: events,
    },
    revalidate: 1800,
  };
};

export default Home;

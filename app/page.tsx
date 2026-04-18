import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

const page = () => {
  return (
    <section className="max-w-7xl mx-auto px-2 lg:px-4 py-16 md:py-24">
      <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-6 text-lg text-white/60 max-w-2xl mx-auto">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul  className="events">
          {events.map((event) => (
            <li key={event.slug}  className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;

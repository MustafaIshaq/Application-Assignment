import DashboardTable from "./eventsTable";
import DashboardCards from "./cards";
import UpComingEventsTable from "./upComingEventsTable";
import EventOfTheMonthCard from "./eventOfTheMonthCard";
import { Event } from "@/types";

interface DashboardTabProps {
  eventOfTheMonth: Event;
}

const DashboardTab = (props: DashboardTabProps) => {
  return (
    <div className="flex flex-col w-screen xl:w-[100%] h-[100%]">
      <div className="flex flex-col-reverse xl:flex-row w-full">
        <div className="xl:mr-5 w-full">
          <div className="m-2 xl:m-0">
            <DashboardTable />
          </div>
          <div className="m-2 xl:m-0 mt-4 xl:mt-0">
            <DashboardCards></DashboardCards>
          </div>
        </div>
        <div className="xl:max-w-[27%]">
          <div>
            <UpComingEventsTable />
          </div>
          <div className="hidden xl:block mr-2">
            <EventOfTheMonthCard eventOfTheMonth={props.eventOfTheMonth} />
          </div>
        </div>
      </div>

      <div className="xl:hidden">
        <EventOfTheMonthCard eventOfTheMonth={props.eventOfTheMonth} />
      </div>
    </div>
  );
};

export default DashboardTab;

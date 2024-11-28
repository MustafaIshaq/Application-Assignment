import React, { useEffect, useState } from "react";
import { Card } from "../../ui/card";
import { getTotalEventsCount } from "@/services";
import moment from "moment";
import { useStore } from "@/stores";

const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

interface dashboardCardsProps {}

const DashboardCards = (props: dashboardCardsProps) => {
  const [totalEventCount, setTotalEventCount] = useState(0);
  const [thisMonthEventCount, setThisMonthEventCount] = useState(0);
  const { favouriteEvents } = useStore();

  useEffect(() => {
    const handleData = () => {
      getTotalEventsCount({}).then((response) => {
        setTotalEventCount(response.count);
      });
    };
    handleData();
  }, []);

  useEffect(() => {
    const handleData = () => {
      getTotalEventsCount({
        "start.lte": moment().endOf("month").format("YYYY-MM-DD"),
        "start.gte": moment().startOf("month").format("YYYY-MM-DD"),
      }).then((response) => {
        setThisMonthEventCount(response.count - 1863000);
      });
    };
    handleData();
  }, []);

  return (
    <div className="flex flex-row justify-evenly w-auto mt-2 truncate mx-2 lg:mx-0">
      <Card className="rounded-lg w-[33%] text-left lg:mx-2 mx-1 lg:mr-2 lg:h-14 xl:h-14 h-[110px] bg-secondary">
        <div className="flex flex-col lg:flex-row text-center justify-between h-full px-2 lg:px-4">
          <h1 className="my-2 lg:my-auto font-[600] text-[#797D8C] text-[14px]">
            All Events
          </h1>
          <p className="my-2 lg:my-auto font-[700] text-[22px] sm:text-[32px]  text-[#04103B]">
            {formatNumber(totalEventCount)}
          </p>
        </div>
      </Card>
      <Card className="rounded-lg w-[33%] text-left lg:mx-2 mx-1 lg:mr-2 lg:h-14 xl:h-14 h-[110px] bg-secondary">
        <div className="flex flex-col lg:flex-row text-center justify-between h-full px-2 lg:px-4">
          <h1 className="mt-1 lg:my-auto font-[600] text-balance text-[#797D8C] text-[14px]">
            This Months Events
          </h1>
          <p className="mb-2 lg:my-auto font-[700] lg:mr-[-8px] text-[22px] sm:text-[32px] text-[#04103B]">
            {formatNumber(thisMonthEventCount)}
          </p>
        </div>
      </Card>
      <Card className="rounded-lg w-[33%] text-left lg:mx-2 mx-1 lg:mr-2 lg:h-14 xl:h-14 h-[110px] bg-secondary">
        <div className="flex flex-col lg:flex-row text-center justify-between h-full px-2 lg:px-4">
          <h1 className="my-2 lg:my-auto font-[600] text-balance text-[#797D8C] text-[14px]">
            Favorite Events
          </h1>
          <p className="my-2  lg:my-auto font-[700] text-[22px] sm:text-[32px] text-[#04103B]">
            {formatNumber(favouriteEvents.length)}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCards;

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import moment from "moment";
import TableSkeleton from "./tableSkeleton";
import { CircularProgress } from "@mui/material";
import { Event } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "@/stores";

interface DashboardUpComingTableProps {}

const UpComingEventsTable = (props: DashboardUpComingTableProps) => {
  const [page, setPage] = useState(1);
  const {
    upComingEventsTableData,
    setUpComingEventsTableData,
    favouriteEvents,
    setFavouriteEvents,
  } = useStore();

  useEffect(() => {
    const handleData = () => {
      setUpComingEventsTableData();
    };
    handleData();
  }, []);

  const fetchMoreData = () => {
    setUpComingEventsTableData();

    setPage(page + 1);
  };

  return (
    <div className="border-x-zinc-100 h-[270px] lg:h-[370px] lg:min-w-[385px] xl:min-w-min w-[98%] rounded-lg bg-secondary relative overflow-hidden mx-2 xl:mx-0 mb-2 xl:mb-0 mt-3 xl:mt-0 m-2 xl:m-0">
      <div className="lg:hidden bg-gradient-to-t from-secondary to-transparent absolute bottom-0 h-[120px] w-full pointer-events-none" />

      <div>
        <h1 className="text-2xl py-4 text-left px-4 font-[400]">
          Upcoming Events
        </h1>
      </div>

      <InfiniteScroll
        height={292}
        dataLength={upComingEventsTableData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div className="flex justify-center my-3">
            <CircularProgress />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-1 pr-1 gap-2 px-2 lg:px-0">
          {upComingEventsTableData.length === 0 ? (
            <div className="bg-primary col-span-2 xl:col-span-1 ">
              <TableSkeleton />
            </div>
          ) : null}
          {upComingEventsTableData.map((col: Event, index: number) => (
            <div
              key={index}
              className="grid grid-cols-5 text-left justify-around p-1 lg:mx-3 border-2 border-[#F3F3F3] rounded-lg h-fit bg-white"
            >
              <div className="col-span-4 grid-row-2">
                <div className="lg:size-4 text-black font-[600] lg:w-full min-h-7 truncate row-span-1">
                  {col.title}
                </div>
                <div className="row-span-1 text-[#797D8C] text-sm font-normal">
                  {moment(col.start).format("ddd D MMM hh:mm A")}
                </div>
              </div>
              <Heart
                className={`w-9 lg:pr-4 pr-2 col-span-1 m-auto ${
                  favouriteEvents.some((event) => event.id === col.id)
                    ? "fill-red-600"
                    : ""
                }`}
                color={
                  favouriteEvents.some((event) => event.id === col.id)
                    ? "red-600"
                    : "#5041BC"
                }
                onClick={() =>
                  setFavouriteEvents(
                    favouriteEvents.some((event) => event.id === col.id)
                      ? favouriteEvents.filter((event) => event.id !== col.id)
                      : [...favouriteEvents, col]
                  )
                }
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UpComingEventsTable;

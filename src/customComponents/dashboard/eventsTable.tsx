import { useState, useEffect } from "react";
import { DropdownMenuCheckboxes } from "./dropDownMenu";
import { Heart } from "lucide-react";
import moment from "moment";
import EventDialog from "./eventDialog";
import TableSkeleton from "./tableSkeleton";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { APIparameters, Event } from "@/types";
import { useStore } from "@/stores";

interface DashboardTableProps {}

const DashboardTable = (props: DashboardTableProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalRow, setModalRow] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { tableData, setTableData } = useStore();
  const { favouriteEvents, setFavouriteEvents, tableFilter } = useStore();

  useEffect(() => {
    setLoading(true);
    const handleData = () => {
      setTableData();
    };
    handleData();
  }, [tableFilter.category]);

  const fetchMoreData = () => {
    setTableData();
  };

  return (
    <div className="w-auto mb-2 xl:mb-0 mt-3 xl:mt-0 xl:min-h-[520px]">
      <div className="flex flex-row justify-between pb-2 mx-3">
        <p className="w-auto text-2xl font-[600] mb-2">Events List</p>
        <DropdownMenuCheckboxes />
      </div>
      {openModal && (
        <EventDialog modalRow={modalRow} setOpenModal={setOpenModal} />
      )}

      <InfiniteScroll
        height={464}
        dataLength={tableData.length}
        next={fetchMoreData}
        hasMore={false}
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
        <div className="grid grid-cols-7 gap-2 md:text-2xl max-h-4/5 text-lg text-wrap text-black text-left min-w-[650px] mx-3">
          <div className="col-span-1 pl-4 font-[600]">#</div>
          <div className="col-span-2 pl-3 font-[600]">Name</div>
          <div className="col-span-1 font-[600]">Time</div>
          <div className="col-span-1 font-[600]">Date</div>
          <div className="col-span-1 font-[600]">Location</div>
          <div className="col-span-1 font-[600]"></div>
          <hr className="h-px border-[#6A6A6A] col-span-7" />
          <div className="col-span-7 xl:min-w-[650px]">
            {tableData.map((row: any, index: number) => (
              <div
                onClick={() => {
                  setOpenModal(true);
                  setModalRow(row);
                }}
                className="col-span-7 text-wrap grid grid-cols-7 border-1 my-2  p-2 rounded-lg bg-secondary font-normal text-base cursor-pointer"
                key={index}
              >
                <div className="text-black font-[600] col-span-1 xl:ml-2 ">
                  {index + 1}
                </div>

                <div className="text-[#797D8C] col-span-2 mr-4 font-[400] truncate">
                  {row.title}
                </div>
                <div className="text-[#797D8C] font-[600]">
                  {moment(row.start).format("hh:mm A")}
                </div>
                <div className="text-[#797D8C] pl-2 font-[600]">
                  {moment(row.start).format("ddd D MMM")}
                </div>
                <div className="text-[#797D8C] px-11 font-[500]">
                  {row.country}
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <Heart
                    className={`w-9 m-auto md:ml-10 ${
                      favouriteEvents?.find((event: any) => event.id == row.id)
                        ? "fill-red-600"
                        : ""
                    }`}
                    color={
                      favouriteEvents?.find((event: any) => event.id == row.id)
                        ? "red-600"
                        : "#5041BC"
                    }
                    onClick={() =>
                      setFavouriteEvents(
                        favouriteEvents?.find(
                          (event: any) => event.id == row.id
                        )
                          ? favouriteEvents.filter(
                              (event: any) => event.id !== row.id
                            )
                          : [...favouriteEvents, row]
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default DashboardTable;

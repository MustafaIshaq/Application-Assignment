import { create } from "zustand";
import { Event, APIparameters } from "../types";
import { getData } from "../services";
import { persist, createJSONStorage } from "zustand/middleware";

interface Store {
  tableData: Event[];
  setTableData: () => void;
  upComingEventsTableData: Event[];
  setUpComingEventsTableData: () => void;
  favouriteEvents: Event[];
  setFavouriteEvents: (parameters: Event[]) => void;
  tableFilter: APIparameters;
  setTableFilter: (parameters: APIparameters) => void;
  eventOfTheMonth: Event | null;
  setEventOfTheMonth: (parameters: APIparameters) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      tableData: [],
      setTableData: () => {
        getData().then((response) => {
          set((state) => ({
            tableData: response.results.filter((event) => {
              return (
                state.tableFilter.category === "all" ||
                state.tableFilter.category === event.category
              );
            }),
          }));
        });
      },
      upComingEventsTableData: [],
      setUpComingEventsTableData: () => {
        getData().then((response) => {
          set((state) => ({
            upComingEventsTableData: response.results.slice(0, 10),
          }));
        });
      },
      favouriteEvents: [],
      setFavouriteEvents: (parameters: Event[]) => {
        set((state) => ({
          favouriteEvents: parameters,
        }));
      },
      tableFilter: {
        limit: 10,
        offset: 0,
      },
      setTableFilter: (parameters: APIparameters) => {
        set((state) => ({
          tableFilter: { ...state.tableFilter, ...parameters },
        }));
      },
      eventOfTheMonth: null,
      setEventOfTheMonth: () => {
        getData().then((response) => {
          set({
            eventOfTheMonth: response.results[0],
          });
        });
      },
    }),
    {
      name: "my-app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favouriteEvents: state.favouriteEvents,
        tableFilter: state.tableFilter,
      }),
    }
  )
);

export { useStore };

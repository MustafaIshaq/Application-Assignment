"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { DatePicker } from "../../ui/datePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ListEnd } from "lucide-react";
import { useStore } from "@/stores";

interface DropdownMenuProps {}

export function DropdownMenuCheckboxes(props: DropdownMenuProps) {
  const { tableFilter, setTableFilter } = useStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center bg-white border-white rounded-lg px-2 cursor-pointer ">
          <ListEnd />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto min-w-64 p-5">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        <Select
          onValueChange={(e) => {
            setTableFilter({ category: e, page: 1 });
          }}
          value={tableFilter.category}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="concerts">Concerts</SelectItem>
            <SelectItem value="community">Community</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="conferences">Conferences</SelectItem>
            <SelectItem value="expos">Expos</SelectItem>
            <SelectItem value="festivals">Festivals</SelectItem>
            <SelectItem value="performing-arts">Performing Arts</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="school-holidays">School Holidays</SelectItem>
            <SelectItem value="public-holidays">Public Holidays</SelectItem>
            <SelectItem value="observances">Observances</SelectItem>
            <SelectItem value="politics">Politics</SelectItem>
            <SelectItem value="daylight-savings">Daylight Saving</SelectItem>
            <SelectItem value="airport-delays">Airport Delays</SelectItem>
            <SelectItem value="severe-weather">Severe Weather</SelectItem>
            <SelectItem value="disasters">Disasters</SelectItem>
            <SelectItem value="terror">Terror</SelectItem>
            <SelectItem value="health-warnings">Health Warning</SelectItem>
          </SelectContent>
        </Select>

        {/* <DropdownMenuLabel>Date</DropdownMenuLabel>
        <div className="flex md:flex-row flex-col m-2">
          <div>
            <span>From:</span>
            <br />
            <DatePicker
              date={tableFilter.startDate}
              setDate={(e: Date) => {
                setTableFilter({ startDate: e, page: 1 });
              }}
            />
          </div>
          <div>
            <span>To:</span>
            <br />
            <DatePicker
              date={tableFilter.endDate}
              setDate={(e: Date) => {
                setTableFilter({ endDate: e, page: 1 });
              }}
            />
          </div>
        </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

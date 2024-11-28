import { APIresponse, APIparameters } from "@/types";
import { eventsList, eventCount } from "./mocks";
require("dotenv");

const getData = async (): Promise<APIresponse> => {
  try {
    const response = eventsList;
    return response as any;
  } catch (error) {
    throw error;
  }
};

const getTotalEventsCount = async (
  params: APIparameters
): Promise<APIresponse> => {
  try {
    const response = eventCount;
    return response as any;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getData, getTotalEventsCount };

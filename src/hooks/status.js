import { useQuery } from "@tanstack/react-query";
import { getStatusList } from "../api/status";

export const useGetStatusList = () => {
  return useQuery({
    queryKey: ["statusList"],
    queryFn: getStatusList,
  });
};

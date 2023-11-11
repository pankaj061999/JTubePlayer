import get from "loadsh/get";
import { useEffect } from "react";
import { useQueries } from "react-query";

const useParallelQueries = (query, config) => {
  let result = useQueries(query);

  let data = result.map((item, i) => {
    return item.status == "success" ? { ...item, data: get(item, config.path[i]) } : item;
  });

  return [...data];
};

export default useParallelQueries;

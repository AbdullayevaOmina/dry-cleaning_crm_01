import { useLocation } from "react-router-dom";

const useQueryHandler = () => {
  const location = useLocation();
  const changeQuery = (
    type: string,
    key: string,
    value?: string | undefined
  ) => {
    const searchParams = new URLSearchParams(location.search);
    if (type === "set") searchParams.set(key, value ? value : "");
    else return searchParams.get(key);
  };
  return changeQuery;
};

export default useQueryHandler;

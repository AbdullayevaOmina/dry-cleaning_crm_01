import { getDataFromCookie } from "@data-service";
import { CommonlyUsedComponent, Chart } from "@ui";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@store";

const Index = () => {
  const {
    // mainSatisticData,
    // getMainStatistics,
    ordersSatisticData,
    isLoading,
    getOrdersStatistics,
  } = useDashboardStore();
  const date = new Date();
  const end = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const [params, setParams] = useState({
    start: getDataFromCookie("start") || "",
    end: end,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    // getMainStatistics();
    getOrdersStatistics(params);
    const result: any[] = [];
    for (let key in ordersSatisticData) {
      result.push({ label: key, value: ordersSatisticData[key] });
    }
    setData(result);
  }, [params]);

  const changeParams = (start: string, end: string) => {
    setParams((prevState) => ({
      ...prevState,
      start: start,
      end: end,
    }));
  };

  // const p_data = [
  //   { id: 0, value: 10, label: "series A" },
  //   { id: 1, value: 15, label: "series B" },
  //   { id: 2, value: 20, label: "series C" },
  // ];

  return (
    <>
      <CommonlyUsedComponent changeParams={changeParams} />
      {isLoading ? <h1 className="mt-7">Loading...</h1> : <Chart data={data} />}
    </>
  );
};

export default Index;

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useOrderStore } from "@store";
import { Orders } from "@modals";
import { ToastContainer } from "react-toastify";
import { GlobalTable, GlobalPagination, GlobalSearch } from "@ui";
import { orders } from "@service";
import { orders_headers } from "@table-headers";

const Index = () => {
  const location = useLocation();
  const { searchOrders, data, isLoading, totalCount, updateStatus } =
    useOrderStore();
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});

  const [search, setSearch] = useState("");
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    name: search,
  });

  useEffect(() => {
    searchOrders(params);
  }, [params, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    const search = params.get("search");
    const searchString = search ? search : "";
    setParams((preParams) => ({
      ...preParams,
      page: pageNumber,
      name: searchString,
    }));
    setSearch(searchString);
  }, [location.search]);

  const handleClose = () => {
    setModal(false);
    setItem({});
  };

  const changePage = (value: number) => {
    setParams((preParams) => ({
      ...preParams,
      page: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      {modal && <Orders open={modal} handleClose={handleClose} item={item} />}
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <GlobalSearch />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal(true)}
        >
          buyurtma qo'shish
        </Button>
      </div>
      {data?.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-2xl text-stone-400">
          <h1>Hozircha ma'lumot topilmadi</h1>
        </div>
      ) : (
        <div>
          <GlobalTable
            headers={orders_headers}
            body={data}
            isLoading={isLoading}
            deleteAction={orders.delete_order}
            edit={orders.update_order}
            handleStatus={updateStatus}
          />
          {totalCount !== 0 && (
            <GlobalPagination
              totalCount={totalCount}
              page={params.page}
              setParams={changePage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Index;

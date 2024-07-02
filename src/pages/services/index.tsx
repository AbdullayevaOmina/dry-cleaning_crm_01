import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useServiceStore } from "@store";
import { CreateService } from "@modals";
import { ToastContainer } from "react-toastify";
import { GlobalTable, GlobalPagination, GlobalSearch } from "@ui";
import { services_headers } from "@table-headers";

const Index = () => {
  const {
    getServicesData,
    servicesData,
    isLoading,
    totalCount,
    updateData,
    deleteData,
  } = useServiceStore();
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});

  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    name: "",
  });

  useEffect(() => {
    getServicesData(params);
  }, [params, getServicesData, updateData]);

  useEffect(() => {
    const paramss = new URLSearchParams(location.search);
    const page = paramss.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    const search = paramss.get("search");
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
      name: search ? search : "",
    }));
  }, [location.search]);

  const handleClose = () => {
    setModal(false);
    setItem({});
  };

  const changePage = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      {modal && (
        <CreateService open={modal} handleClose={handleClose} item={item} />
      )}
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <GlobalSearch />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal(true)}
        >
          xizmat qo'shish
        </Button>
      </div>
      {servicesData?.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-2xl text-stone-400">
          <h1>Hozircha ma'lumot topilmadi</h1>
        </div>
      ) : (
        <div>
          <GlobalTable
            headers={services_headers}
            body={servicesData}
            isLoading={isLoading}
            deleteAction={deleteData}
            edit={updateData}
            pageName="services"
          />
          <GlobalPagination
            totalCount={totalCount}
            page={params.page}
            setParams={changePage}
          />
        </div>
      )}
    </>
  );
};

export default Index;

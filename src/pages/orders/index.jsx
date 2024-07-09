import GlobalTable from "../../components/ui/globalTable";
import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrderModal, OrderUpdate } from "../../components/modal";
import useOrderStore from "../../store/orders";
import Notification from "../../utils/notification";
// import GlobalPagination from "@pagination";
const index = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const { getOrders, data, isLoading, deleteOrder, totalCount } =
    useOrderStore();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const deleteItem = async (id) => {
    const response = await deleteOrder(id);
    if (response.status === 200) {
      Notification({
        title: "Buyurtma muvaffaqiyatli o'chirildi",
        type: "success",
      });
    }
  };

  const editItem = (item) => {
    setModal(true);
    setItem(item);
    console.log(item);
  }

  const handleClose = () => {
    setModal(false);
    setItem({});
  }
  const handleOpen = () => {
    setModal(true);
  }

  useEffect(() => {
    getOrders(params);
  }, [params, getOrders]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  }, [location.search]);
  const changePage = (value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };
  const headers = [
    { title: "№", value: "index" },
    { title: "Client name", value: "client_name" },
    { title: "Service name", value: "service_name" },
    { title: "Order price", value: "price" },
    { title: "Amount", value: "amount" },
    { title: "Status", value: "status" },
    { title: "Action", value: "action" },
  ];


  return (
    <div>
      <OrderUpdate open={modal} handleOpen={handleOpen} handleClose={handleClose} item={item}/>
      <div className="py-3 flex justify-end items-center">
        <OrderModal />
      </div>
      <GlobalTable
        headers={headers}
        body={data}
        isLoading={isLoading}
        editItem={editItem}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default index;

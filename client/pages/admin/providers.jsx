import { useState } from "react";
import Table from "rc-table";
import { ExchangeIcon, TasksIcon, ThListIcon } from "react-line-awesome";
import {
  getProviders,
  deleteProvider,
} from "../../store/actions-creator/providers-action";
import { useSelector } from "react-redux";
import CrudIcon from "../../components/CrudIcon";
import { Button, Modal } from "react-bootstrap";
import { wrapper } from "../../store";
import ProviderForm from "./ProviderForm";
import { useDispatch } from "react-redux";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch(await getProviders());
  }
);

const initialState = { open: false, id: null };

const Channels = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector((state) => state.providers);
  const [nodeSelected, setSelectedNode] = useState({
    id: "",
    isDisabled: true,
  });
  const [isOpen, setIsOpen] = useState(initialState);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Точно удалить?");
    if (confirm) {
      await dispatch(deleteProvider(id));
    }
  };

  const columns = [
    {
      title: <ThListIcon />,
      dataIndex: "icon",
      key: "icon",
      width: "5%",
    },
    {
      title: (
        <span onClick={() => sortCustomers("id")} style={{ cursor: "pointer" }}>
          id
          <ExchangeIcon
            className="ml-2"
            style={{ transform: "rotate(90deg)" }}
          />
        </span>
      ),
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: (
        <span
          onClick={() => sortCustomers("name")}
          style={{ cursor: "pointer" }}
        >
          Hазвание
          <ExchangeIcon
            className="ml-2"
            style={{ transform: "rotate(90deg)" }}
          />
        </span>
      ),
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      tile: "",
      dataIndex: "crudIcon",
      key: "crudIcon",
    },
  ];

  const columnData = (arr) =>
    arr
      .sort((a, b) => a.id - b.id)
      .map((el) => ({
        key: el.id,
        icon: <TasksIcon />,
        name: el.name,
        id: el.id,
        crudIcon: (
          <div className="showWhenHovered">
            <CrudIcon
              iconClass="las la-edit"
              action={() =>
                setIsOpen((prev) => ({ ...prev, open: true, id: el.id }))
              }
              tooltip="Редактировать"
            />

            <CrudIcon
              iconClass="las la-trash-alt"
              action={() => deleteHandler(el.id)}
              tooltip="Удалить"
            />
          </div>
        ),
      }));

  return (
    <div className="mt-4 container-fluid">
      <div className="text-right">
        <Button
          onClick={() => {
            setIsOpen((prev) => ({ ...prev, open: true, id: null }));
            setSelectedNode((prev) => ({ ...prev, id: null }));
          }}
        >
          Добавить провайдера
        </Button>
      </div>
      <Table
        columns={columns}
        data={columnData(providers)}
        scroll={{ y: "calc(100vh - 315px)" }}
        emptyText={<div className="text-center">Нет данных о клиентах</div>}
      />
      <Modal show={isOpen.open} onHide={() => setIsOpen(initialState)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isOpen.id ? "Редактировать провайдера" : "Добавить провайдера"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProviderForm id={isOpen.id} close={() => setIsOpen(initialState)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Channels;

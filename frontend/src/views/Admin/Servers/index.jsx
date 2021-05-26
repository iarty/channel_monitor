import { useState, useEffect } from "react";
import Table from "rc-table";
import { ExchangeIcon, TasksIcon, ThListIcon } from "react-line-awesome";
import { useAction } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import CrudIcon from "../../../components/CrudIcon";
import { Button, Modal, Spinner } from "react-bootstrap";
import ProviderForm from "./ServerForm";
import { useDispatch } from "react-redux";

const initialState = { open: false, id: null };

const Servers = () => {
  const dispatch = useDispatch();
  const { getServers, deleteServer } = useAction();
  const { servers, loading, error } = useSelector((state) => state.servers);
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    !servers.length && dispatch(getServers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>{error}</div>;

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Точно удалить?");
    if (confirm) {
      dispatch(() => deleteServer(id));
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
        <span style={{ cursor: "pointer" }}>
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
        <span style={{ cursor: "pointer" }}>
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
    <div className="container-fluid">
      <div className="text-right">
        <Button
          onClick={() => {
            setIsOpen((prev) => ({ ...prev, open: true, id: null }));
          }}
        >
          {loading && (
            <Spinner
              animation="border"
              role="status"
              size="sm"
              className="mr-2"
            />
          )}
          Добавить сервер
        </Button>
      </div>
      <Table
        columns={columns}
        data={columnData(servers)}
        scroll={{ y: "calc(100vh - 315px)" }}
        emptyText={<div className="text-center">Нет данных о клиентах</div>}
      />
      <Modal show={isOpen.open} onHide={() => setIsOpen(initialState)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isOpen.id ? "Редактировать сервер" : "Добавить сервер"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProviderForm id={isOpen.id} close={() => setIsOpen(initialState)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Servers;

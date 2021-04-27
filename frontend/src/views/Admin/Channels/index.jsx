import { useState, useEffect } from "react";
import Table from "rc-table";
import { ExchangeIcon, TasksIcon, ThListIcon } from "react-line-awesome";
import { useSelector } from "react-redux";
import CrudIcon from "../../../components/CrudIcon";
import { Button, Modal, Spinner } from "react-bootstrap";
import ChannelsForm from "./ChannelForm";
import { useDispatch } from "react-redux";
import { useAction } from "../../../hooks/useActions";

const initialState = { open: false, id: null };

const Channels = () => {
  const { getChannels, getProviders, deleteChannel } = useAction();
  const dispatch = useDispatch();
  const { channels, loading, error } = useSelector((state) => state.channels);
  const { providers } = useSelector((state) => state.providers);
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    !channels.length && dispatch(getChannels);
    !providers.length && dispatch(getProviders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Точно удалить?");
    if (confirm) {
      dispatch(() => deleteChannel(id));
    }
  };

  if (error) return <div>error</div>;

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
      title: (
        <span style={{ cursor: "pointer" }}>
          Мониторинг
          <ExchangeIcon
            className="ml-2"
            style={{ transform: "rotate(90deg)" }}
          />
        </span>
      ),
      dataIndex: "monitoring",
      key: "monitoring",
      width: "10%",
    },
    {
      title: (
        <span style={{ cursor: "pointer" }}>
          Провайдер
          <ExchangeIcon
            className="ml-2"
            style={{ transform: "rotate(90deg)" }}
          />
        </span>
      ),
      dataIndex: "provider",
      key: "provider",
      width: "10%",
    },
    {
      title: (
        <span style={{ cursor: "pointer" }}>
          Url
          <ExchangeIcon
            className="ml-2"
            style={{ transform: "rotate(90deg)" }}
          />
        </span>
      ),
      dataIndex: "url",
      key: "url",
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
        url: el.url,
        monitoring: el.monitoring ? "Да" : "Нет",
        provider: el.provider.name,
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
          Добавить канал
        </Button>
      </div>
      <Table
        columns={columns}
        data={columnData(channels)}
        scroll={{ y: "calc(100vh - 315px)" }}
        emptyText={<div className="text-center">Нет данных о клиентах</div>}
      />
      <Modal show={isOpen.open} onHide={() => setIsOpen(initialState)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isOpen.id ? "Редактировать канал" : "Добавить канал"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChannelsForm
            id={isOpen.id}
            providers={providers}
            close={() => setIsOpen(initialState)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Channels;

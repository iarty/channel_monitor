import { useEffect } from "react";
import ChannelCard from "../../components/ChannelCard/index";
import { useHistory } from "react-router-dom";
import { useChannels } from "../../hooks/useChannels";
import { Spinner } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAction } from "../../hooks/useActions";

const Channels = () => {
  const history = useHistory();
  const { channels, DT } = useChannels();
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const { getServers } = useAction();
  const { servers } = useSelector((state) => state.servers);

  useEffect(() => {
    !servers.length && dispatch(getServers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    channels.filter((el) => el.server.name === filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  console.log(servers);
  console.log(channels);
  console.log("RERENDER");
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-4 pb-5">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 ">
          <Form.Group
            controlId="exampleForm.SelectCustom"
            className="mb-0 flex-grow-1 mr-4"
          >
            <Form.Label>Фильтр по серверам:</Form.Label>
            <Form.Control
              as="select"
              custom
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option hidden></option>
              {servers.map((server) => (
                <option key={server.id} value={server.name}>
                  {server.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="danger"
            onClick={() => setFilter("")}
            className="mb-0"
          >
            Сброс
          </Button>
        </div>
        <div
          className="ml-5 mr-2"
          style={{
            border: "1px solid #cecece",
            padding: "10px",
            background: "#cecece",
          }}
        >
          <p className="font-weight-bold p-0 mb-1">Последнее обновление: </p>
          {new Date(DT).toLocaleDateString("ru-Ru", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>
      <div>
        {channels.length && servers.length ? (
          filter ? (
            <div>
              <p
                className="font-weight-bold mb-0"
                style={{
                  background: "#cecece",
                  padding: "5px 10px",
                  marginRight: "33px",
                  marginLeft: "10px",
                }}
              >
                {filter}
              </p>
              <div className="d-flex flex-wrap">
                {channels
                  .filter((el) => (filter ? el.server.name === filter : el))
                  .map((el) => (
                    <ChannelCard
                      key={el.id}
                      name={el.name}
                      status={el.status}
                      datetime={el.lastDate}
                      provider={el?.provider.name}
                      onClick={() =>
                        history.push({
                          pathname: `/channels/${el.id}`,
                        })
                      }
                    />
                  ))}
              </div>
            </div>
          ) : (
            servers.map((server) => (
              <div className="mb-5">
                <p
                  className="font-weight-bold mb-0"
                  style={{
                    background: "#cecece",
                    padding: "5px 10px",
                    marginRight: "33px",
                    marginLeft: "10px",
                  }}
                >
                  {server.name}
                </p>
                <div className="d-flex flex-wrap">
                  {channels
                    .filter((channel) => channel.server?.name === server.name)
                    .map((el) => (
                      <ChannelCard
                        key={el.id}
                        name={el.name}
                        status={el.status}
                        datetime={el.lastDate}
                        provider={el?.provider.name}
                        onClick={() =>
                          history.push({
                            pathname: `/channels/${el.id}`,
                          })
                        }
                      />
                    ))}
                </div>
              </div>
            ))
          )
        ) : (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status" size="xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Channels;

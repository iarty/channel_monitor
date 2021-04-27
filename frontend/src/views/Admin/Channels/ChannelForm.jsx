import React, { useEffect } from "react";
import { Row, Form, Col, Button, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useAction } from "../../../hooks/useActions";

const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Данное поле обязательное."),
    providerId: Yup.string().required("Данное поле обязательное."),
    url: Yup.string().url().required("Данное поле обязательное."),
  });

const ChannelsForm = ({ close, id }) => {
  const dispatch = useDispatch();
  const { postChannel, putChannel } = useAction();
  const { providers, channels } = useSelector((state) => ({
    providers: state.providers.providers,
    channels: state.channels.channels,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = async (data) => {
    id ? dispatch(() => putChannel(data)) : dispatch(() => postChannel(data));
    close();
  };

  useEffect(() => {
    if (id) {
      const channel = channels.find((el) => el.id === id);
      Object.keys(channel).forEach((el) => setValue(el, channel[el]));
    }
  }, [id, setValue, channels]);

  return (
    <Form
      className="form-wrapper"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row>
        <Col xs={12}>
          <div className="d-none">
            <FormControl name="id" type="text" {...register("id")} />
          </div>
          <Form.Group controlId="name">
            <Form.Label>Название</Form.Label>
            <FormControl name="name" type="text" {...register("name")} />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>Cсылка на канал</Form.Label>
            <FormControl name="url" type="text" {...register("url")} />
            {errors.url && (
              <Form.Control.Feedback type="invalid">
                {errors.url?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="providerId">
            <Form.Label>Провайдер</Form.Label>
            <FormControl
              name="providerId"
              as="select"
              {...register("providerId")}
            >
              <option hidden value="" />
              {providers.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </FormControl>
            {errors.providerId && (
              <Form.Control.Feedback type="invalid">
                {errors.providerId?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="default-checkbox"
            label="Мониторить канал"
            className="my-3"
            {...register("monitoring")}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} className="text-right">
          <Form.Group>
            <Button type="submit" variant="primary" className="mr-2">
              Сохранить
            </Button>
            <Button variant="secondary" onClick={close}>
              Отмена
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default ChannelsForm;

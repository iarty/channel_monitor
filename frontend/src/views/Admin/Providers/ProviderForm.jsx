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
  });

const ChannelsForm = ({ close, id }) => {
  const dispatch = useDispatch();
  const { putProvider, postProvider } = useAction();
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(validationSchema()),
  });
  const { providers } = useSelector((state) => state.providers);
  const { errors } = formState;

  const onSubmit = async (data) => {
    id ? dispatch(() => putProvider(data)) : dispatch(() => postProvider(data));
    close();
  };

  useEffect(() => {
    if (id) {
      const provider = providers.find((el) => el.id === id);
      Object.keys(provider).forEach((el) => setValue(el, provider[el]));
    }
  }, [id, setValue, providers]);

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

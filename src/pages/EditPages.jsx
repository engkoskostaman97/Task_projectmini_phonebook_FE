import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function EditPages() {
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    nohp: "",
    email: "",
    address: "",
  });

  // eslint-disable-next-line no-unused-vars
  let { data: phonebook1 } = useQuery("phonebook2", async () => {
    const response = await API.get(`/phonebooks/${id}`);
    setForm({
      ...form,
      nama: response.data.nama,
      nohp: response.data.nohp,
      email: response.data.email,
      address: response.data.address,
      
    });
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.put(`/phonebooks/${id}`, form);
      alert("data berhasil dirubah");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
            <img src={icon} style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data PhoneBook
        </h3>
        <h5 className="my-3">Edit Data Phonebook</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama"
                      id="nama"
                      value={form.nama}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>No Handphone</Form.Label>
                    <Form.Control
                      type="text"
                      name="nohp"
                      id="nohp"
                      value={form.nohp}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      id="email"
                      value={form.nohp}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Ubah
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Kembali
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
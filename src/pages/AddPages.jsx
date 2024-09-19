import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function AddPages() {
  const [form, setForm] = useState({
    nama: "",
    nohp: "",
    email:"",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.nama]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/phonebooks", form);
      alert("data berhasil tersimpan");
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
          Aplikasi Phone Book
        </h3>
        <h5 className="my-3">Tambah Data Phonebook</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type="text"
                      id="nama"
                      name="nama"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>No Handphone</Form.Label>
                    <Form.Control
                      type="text"
                      id="nohp"
                      name="nohp"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      id="address"
                      name="address"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Simpan
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

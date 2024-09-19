import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function Monitoring() {
  let navigate = useNavigate();

  let { data: phonebook, refetch } = useQuery("PhonebookCache", async () => {
    const response = await API.get("/phonebooks");
    return response.data;
  });

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id); // Menyimpan ID saja
    handleShow();
  };
  
  const handleDeletes = () => {
    setConfirmDelete(true);
  };
  
  const deleteById = useMutation(async (id) => {
    console.log("Deleting ID:", id);
    try {
      await API.delete(`/phonebooks/${id}`); // Mengirim ID langsung ke endpoint
      refetch();
    } catch (error) {
      console.log(error);
    }
  });
  
  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete); // Menggunakan ID langsung
      setConfirmDelete(null);
    }
  }, [confirmDelete]);
  

  const handleUpdate = (id) => {
    navigate("/edit-data/" + id);
  };

  const [filter, setFilter] = useState("");
  let searchData = (e) => {
    setFilter(e.target.value);
  };

  let dataFilter = phonebook?.filter((item) => {
    if (filter === "") {
      return item;
    } else if (item.nama.toLowerCase().includes(filter.toLowerCase())) {
      return item;
    }
  });

  return (
    <div>
      <Container className="mt-3 ">
        <h3>
          <span>
            <img src={icon} style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi phone Book
        </h3>
        <Card className=" bg-search">
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label className="fw-bolder opacity-75 mt-2">
                  Seach Data Phone Book
                </Form.Label>
                <Form.Control
                  type="search"
                  id="nama"
                  name="nama"
                  onChange={searchData.bind(this)}
                  style={{ width: "30%" }}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Col className="text-end">
          <Link to={"/add-data"}>
            <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
            >
              Add
            </Button>
          </Link>
        </Col>
        <Table responsive striped bordered hover className="text-center">
          <thead>
            <tr className="opacity-75">
              <th>No</th>
              <th>Nama</th>
              <th>No Handphone</th>
              <th>Alamat</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter?.map((item, index) => (
              <tr key={index} className="opacity-75">
                <td>{index + 1}</td>
                <td>{item?.nama}</td>
                <td>{item?.nohp}</td>
                <td>{item?.email}</td>
                <td>{item?.address}</td>
                <td className="d-flex gap-3">
                  <div
                    className="text-primary pointer "
                    onClick={() => {
                      handleUpdate(item?.id);
                    }}
                  >
                    <Button 
                  variant="success"
                  className="my-2 fw-bolder"
                  style={{ width: "100%" }}>
                    Edit
                  </Button>
                  </div>
                  <div
                    className="text-danger pointer"
                    onClick={() => {
                      handleDelete(item?.id);
                    }}
                  >
                  <Button 
                  variant="danger"
                  className="my-2 fw-bolder"
                  style={{ width: "100%" }}>
                    Delete
                  </Button>
                  </div>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                      <h3 className="text-center">Delete Data</h3>
                      <div className="my-4">
                        Anda yakin menghapus data {item?.id} ?
                      </div>
                      <div className="my-3 text-end">
                        <Button
                          variant="danger"
                          className="me-2"
                          style={{ width: "100px" }}
                          onClick={handleDeletes}
                        >
                          Ok
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ width: "100px" }}
                          onClick={handleClose}
                        >
                          Batal
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

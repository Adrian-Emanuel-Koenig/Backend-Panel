import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import Swal from "sweetalert2";

export function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = { nombre, precio, stock, categoria, img };
    try {
      apiConnection.post("/api/productos", newProduct);
      Swal.fire({
        position: "center",
        background: "#198754",
        color: "white",
        width: "17rem",
        toast: true,
        icon: "success",
        title: "Producto añadido al carro.",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
        imageHeight: "10rem",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="dashboard">
      <Card>
        <Card.Header as="h5">Agregar Producto</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ingresa el nombre del producto"
                required
              />
            </Form.Group>

            <Form.Group controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={precio}
                onChange={(event) => setPrecio(event.target.value)}
                placeholder="Ingresa el precio del producto"
                required
              />
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                placeholder="Ingresa la cantidad en stock"
                required
              />
            </Form.Group>

            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
                placeholder="Ingresa la categoría del producto"
                required
              />
            </Form.Group>

            <Form.Group controlId="img">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                type="text"
                value={img}
                onChange={(event) => setImg(event.target.value)}
                placeholder="Ingresa la URL de la imagen"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

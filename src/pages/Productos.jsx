import React, { useContext, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { counterContext } from "../context/counterContext";
import { ProductForm } from "../components/ProductForm";
import { apiConnection } from "../config/axiosConfig";

const Productos = () => {
  const { productos } = useContext(counterContext);

  const handleEditarProducto = (producto, nuevosValores) => {
    const productoModificado = {
      ...producto,
      ...nuevosValores,
    };
    const idProd = producto._id;
    apiConnection.put("/api/productos/" + idProd, productoModificado);
  };

  const handleBorrarProducto = (producto) => {
    const idProd = producto._id;
    apiConnection.delete("/api/productos/" + idProd);
  };

  return (
    <>
      <ProductForm />
      <Container>
        <h2>Listado de productos</h2>
        <div className="table">
          <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <Producto
                  key={producto._id}
                  producto={producto}
                  onEditarProd={handleEditarProducto}
                  onQuitarProd={handleBorrarProducto}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

const Producto = ({ producto, onEditarProd, onQuitarProd }) => {
  const [editando, setEditando] = useState(false);
  const [nuevosValores, setNuevosValores] = useState({});

  const handleSubmit = (e) => {
    console.log(producto)
    console.log(nuevosValores)
    e.preventDefault();
    onEditarProd(producto, nuevosValores);
    setEditando(false);
    setNuevosValores({});
  };

  const handleChange = (e, campo) => {
    setNuevosValores((prevState) => ({
      ...prevState,
      [campo]: e.target.value,
    }));
  };
  return (
    <tr>
      {editando ? (
        <td colSpan="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                defaultValue={producto.nombre}
                onChange={(e) => handleChange(e, "nombre")}
              />
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                defaultValue={producto.precio}
                onChange={(e) => handleChange(e, "precio")}
              />
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                defaultValue={producto.stock}
                onChange={(e) => handleChange(e, "stock")}

              />
            </Form.Group>
            <Form.Group controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                defaultValue={producto.categoria}
                onChange={(e) => handleChange(e, "categoria")}
              />
            </Form.Group>
            <Form.Group controlId="img">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                defaultValue={producto.img}
                onChange={(e) => handleChange(e, "img")}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Guardar
            </Button>
            {/* {" "} */}
            <Button variant="secondary" onClick={() => setEditando(false)}>
              Cancelar
            </Button>
          </Form>
        </td>
      ) : (
        <>
          <td>{producto.nombre}</td>
          <td>${producto.precio}</td>
          <td>{producto.stock}</td>
          <th>{producto.categoria}</th>
          <td>
            <img
              src={producto.img}
              alt={producto.nombre}
              style={{ width: "70px", height: "80px" }}
            />
          </td>
          <td>
            <Button variant="warning" onClick={() => setEditando(true)}>
              Editar
            </Button>

            <Button variant="danger" onClick={() => onQuitarProd(producto)}>
              Quitar
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Productos;

import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";

const Profile = () => {
  const [storedOrders, setStoredOrders] = useState([]);

  useEffect(() => {
    apiConnection.get(`/api/cart`).then((res) => {
      setStoredOrders(res.data.data);
    });
  }, []);

  const handleAprobar = (data) => {
    const dataId = data._id;
    apiConnection.put("/api/cart/" + dataId, { orderStatus: true }).then(() => {
      const updatedOrders = storedOrders.map((order) => {
        if (order._id === dataId) {
          return { ...order, orderStatus: true };
        }
        return order;
      });
      setStoredOrders(updatedOrders);
    });
  };
  
  const handleRechazar = (data) => {
    const dataId = data._id;
    apiConnection.put("/api/cart/" + dataId, { orderStatus: false }).then(() => {
      const updatedOrders = storedOrders.map((order) => {
        if (order._id === dataId) {
          return { ...order, orderStatus: false };
        }
        return order;
      });
      setStoredOrders(updatedOrders);
    });
  };

  return (
    <>
      <Container>
        <h3>Mis ordenes</h3>
        <Table striped bordered variant="dark">
          <thead>
            <tr>
              <th>N° de orden</th>
              <th>Usuario</th>
              <th>Productos</th>
              <th>Monto total</th>
              <th>Fecha</th>
              <th>Estado de Orden</th>
            </tr>
          </thead>
          <tbody>
            {storedOrders.map((data) => (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.username}</td>
                <td>
                  {data.cart
                    .map((item) => JSON.stringify(item.nombre))
                    .join(", ")}
                </td>
                <td>${data.totalPrice}</td>
                <td>{data.date}</td>
                <td>
                  {data.orderStatus === true ? (
                    "Aprobado"
                  ) : data.orderStatus === false ? (
                    "Rechazado"
                  ) : (
                    <>
      <Button onClick={() => handleAprobar(data)}>Aprobar</Button>
      <Button variant="danger" onClick={() => handleRechazar(data)}>
        Rechazar
      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Profile;

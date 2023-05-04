import { Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/soporte">Soporte</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Outlet />
    </>
  );
};

export default Layout;

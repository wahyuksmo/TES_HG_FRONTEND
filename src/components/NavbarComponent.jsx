import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">FrontEnd</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/pembayaran">Pembayaran</Nav.Link>
          <Nav.Link href="/pembayaranForm">Form Pembayaran Kredit</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export  default NavbarComponent;

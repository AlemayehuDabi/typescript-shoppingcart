import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useShoppingContext } from "../context/context";
const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingContext();

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            variant="outline-primary"
            className="rounded-circle"
            style={{
              width: "2.7rem",
              height: "2.5rem",
              position: "relative",
            }}
          >
            <FaCartShopping />

            <div
              className="rounded-circle bg-danger text-light"
              style={{
                fontSize: "12px",
                width: "1.2rem",
                height: "1.2rem",
                position: "absolute",
                right: 0,
                bottom: 0,
                transform: "translate(10%, 20%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
};

export default Navbar;

import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingContext } from "../context/context";
import { CartItems } from "./CartItem";
import { formatCurrency } from "../util/formatCurrency";
export function ShoppingCartOpen() {
  const { isOpen, closeCart, cartItem, storeItems } = useShoppingContext();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItem.map((item) => (
            <CartItems key={item.id} {...item} />
          ))}
          <div className="ms-auto fs-5 fw-bold">
            Total:
            {formatCurrency(
              cartItem.reduce((total, item) => {
                const items = storeItems.find((i) => i.id === item.id);
                return total + (items?.price || 0) * item.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

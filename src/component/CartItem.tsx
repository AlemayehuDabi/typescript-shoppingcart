import { Button, Stack } from "react-bootstrap";
import { useShoppingContext } from "../context/context";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItems({ id, quantity }: CartItemProps) {
  const { storeItems, cartQuantity, removeFromCart } = useShoppingContext();

  const items = storeItems.find((item) => item.id === id);

  if (!items) {
    return null;
  }

  return (
    <Stack direction="horizontal" className="d-flex align-items-center" gap={2}>
      <img
        src={items.image}
        style={{
          width: "6rem",
          height: "6rem",
          objectFit: "cover",
        }}
      />
      <div className="me-auto d-flex align-items-center">
        <div>
          <p>
            {items.title}
            <span className="text-muted" style={{ fontSize: ".8rem" }}>
              x{quantity}
            </span>
          </p>
          <span className="text-muted" style={{ fontSize: ".8rem" }}>
            ${items.price}
          </span>
        </div>
        <div className="d-flex">
          <p className="me-auto" style={{ fontSize: "1.5rem" }}>
            ${items.price * cartQuantity}
          </p>

          <Button
            variant="outline-danger"
            onClick={() => removeFromCart(items.id)}
          >
            x
          </Button>
        </div>
      </div>
    </Stack>
  );
}

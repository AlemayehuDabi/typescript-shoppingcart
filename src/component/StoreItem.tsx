import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useShoppingContext } from "../context/context";

type StoreItemProps = {
  id: number;
  image: string;
  title: string;
  price: number;
};

const StoreItem = ({ id, image, title, price }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingContext();

  const quantity = getItemQuantity(id);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between gap-4">
          <span className="fs-6">{title}</span>
          <span>${price}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              Add
            </Button>
          ) : (
            <div className="d-flex flex-column gap-2 align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                {quantity}
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                className="bg-danger border-danger"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;

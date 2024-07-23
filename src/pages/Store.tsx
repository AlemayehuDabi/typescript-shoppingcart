import { Col, Row } from "react-bootstrap";
import StoreItem from "../component/StoreItem";
import { useEffect } from "react";
import { useShoppingContext } from "../context/context";
const Store = () => {
  const { fetchData, storeItems } = useShoppingContext();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row xs={1} md={2} lg={3} className="d-flex align-items-center">
        {storeItems.map((items) => (
          <Col className="d-flex justify-content-center" key={items.id}>
            <StoreItem {...items} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;

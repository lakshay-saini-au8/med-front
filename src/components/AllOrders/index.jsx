import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { allOrders, updateOrderStatus } from "../../utils/api";
import Loader from "../Reuseable/Loader";
const AllOrders = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  const [orders, setOrders] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!orders) {
      setLoading(true);
      allOrders(userInfo.token).then((res) => {
        const { data, message } = res;
        if (data) {
          setOrders(data);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [orders, userInfo.token]);
  const updateStatus = (orderId) => {
    setLoading(true);
    updateOrderStatus(userInfo.token, orderId).then((res) => {
      const { status, data, message } = res;
      if (status) {
        allOrders(userInfo.token).then((res) => {
          const { data, message } = res;
          if (data) {
            setOrders(data);
          }
          if (message) {
            setError(message);
          }
          setLoading(false);
        });
      }
      if (message) {
        setError(message);
      }
      setLoading(false);
    });
  };
  return (
    <Container>
      <Row>
        <Col>
          {error && error}
          <Table responsive className="m-0 mt-3 ">
            <thead>
              <tr>
                <th className="border-0">ID</th>
                <th className="border-0">Date</th>
                <th className="border-0">Total</th>
                <th className="border-0">Paid</th>
                <th className="border-0">Delivered</th>
                {userInfo.isAdmin && <th className="border-0">Update</th>}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Loader />
              ) : (
                orders &&
                orders.map((order) => (
                  <tr className="table-row " key={order._id}>
                    <td className="align-middle">
                      <p>{order._id}</p>
                    </td>

                    <td className="align-middle">
                      <p>{order.paidAt.split("T")[0]}</p>
                    </td>

                    <td className="align-middle">
                      <p>₹{order.totalPrice}</p>
                    </td>

                    <td className="align-middle ">
                      {order.isPaid ? (
                        <p className="font-weight-bold text-success ">Paid</p>
                      ) : (
                        <p className=" font-weight-bold  text-danger">
                          Not Paid
                        </p>
                      )}
                    </td>
                    <td className="align-middle ">
                      {order.isDelivered ? (
                        <p className="font-weight-bold text-success ">
                          Delivered
                        </p>
                      ) : (
                        <p className=" font-weight-bold  text-danger">
                          Not Delivered
                        </p>
                      )}
                    </td>
                    {userInfo.isAdmin && (
                      <td className="align-middle ">
                        <Badge
                          className="p-2 mb-3 mr-1 view-button"
                          onClick={() => {
                            updateStatus(order._id);
                          }}
                        >
                          Update As Delivered
                        </Badge>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllOrders;

import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { deleteUserById, getAllUser, updateUser } from "../../utils/api";
import Loader from "../Reuseable/Loader";
const Users = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  const [users, setUsers] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!users) {
      setLoading(true);
      getAllUser(userInfo.token).then((res) => {
        const { data, message } = res;
        if (data) {
          setUsers(data);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [users, userInfo.token]);
  const updateStatus = (userId, userData) => {
    setLoading(true);
    updateUser(userInfo.token, userId, userData).then((res) => {
      const { success, message } = res;
      if (success) {
        setLoading(true);
        getAllUser(userInfo.token).then((res) => {
          const { data, message } = res;
          if (data) {
            setUsers(data);
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
    });
  };
  const deleteUser = (userId) => {
    setLoading(true);
    deleteUserById(userInfo.token, userId).then((res) => {
      const { success, message } = res;
      if (success) {
        setLoading(true);
        getAllUser(userInfo.token).then((res) => {
          const { data, message } = res;
          if (data) {
            setUsers(data);
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
                <th className="border-0">Name</th>
                <th className="border-0">Email</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Loader />
              ) : (
                users &&
                users.map((user) => (
                  <tr className="table-row " key={user._id}>
                    <td className="align-middle">
                      <p>{user._id}</p>
                    </td>
                    <td className="align-middle">
                      <p>{user.name}</p>
                    </td>

                    <td className="align-middle">
                      <p>{user.email}</p>
                    </td>

                    <td className="align-middle">
                      {user.isAdmin ? (
                        <Badge
                          className="p-2 mb-3 mr-1 view-button"
                          onClick={() => {
                            updateStatus(user._id, { isAdmin: false });
                          }}
                        >
                          Remove From Admin
                        </Badge>
                      ) : (
                        <Badge
                          className="p-2 mb-3 mr-1 print-button"
                          onClick={() => {
                            updateStatus(user._id, { isAdmin: true });
                          }}
                        >
                          Make Admin
                        </Badge>
                      )}

                      <Badge
                        className="p-2 mb-3 mr-1 print-button"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete
                      </Badge>
                    </td>
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

export default Users;

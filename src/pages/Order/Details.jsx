import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat } from "../../library";

const OrderDetails = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const { data } = await http.get(`/api/orders/${id}`);
            setOrder(data.order);
        } catch (error) {
            console.error("Error fetching order:", error);
            alert("Failed to load order.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus) => {
        try {
            await http.patch(`/api/orders/${id}`, { status: newStatus });
            fetchOrder();
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update status.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await http.delete(`/api/orders/${id}`);
                navigate("/orders");
            } catch (error) {
                console.error("Error deleting order:", error);
                alert("Failed to delete order.");
            }
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) return <LoadingComponent />;
    if (!order) return <div>Order not found</div>;

    const orderItems = order.items || [];

    // Compute grand total from items
    const grandTotal = orderItems.reduce((sum, item) => sum + (item.totalPriceAtOrder || 0), 0);

    return (
        <Container>
            <Row>
                <Col className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
                    <Row className="mb-3">
                        <Col>
                            <h1>Order Details</h1>
                        </Col>
                        <Col className="text-end">
                            <Button variant="danger" onClick={handleDelete}>
                                Delete Order
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col md={6}>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Created At:</strong> {dtFormat(order.createdAt)}</p>
                            <p><strong>Updated At:</strong> {dtFormat(order.updatedAt)}</p>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Update Status</Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Select
                                        value={order.status}
                                        onChange={(e) => handleUpdateStatus(e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h4>Order Items</h4>
                            <Table bordered hover size="sm">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No items in this order</td>
                                        </tr>
                                    ) : (
                                        orderItems.map((item, idx) => (
                                            <tr key={item._id || idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.productNameAtOrder || item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.priceAtOrder}</td>
                                                <td>{item.totalPriceAtOrder}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                                {orderItems.length > 0 && (
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4" className="text-end fw-bold">Grand Total:</td>
                                            <td className="fw-bold">${grandTotal.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </Table>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <Link to="/orders" className="btn btn-secondary">
                                Back to Orders
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderDetails;
import {
  Button,
  Container,
  DropdownDivider,
  Nav,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../store";
import { ClearStorage } from "../library";
import { useEffect } from "react";

function AppMenu() {
  const user = useSelector((state) => state.user.value);

  console.log(user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    ClearStorage("r130cmtoken");
    navigate("/login");
  };

  return (
    user && (
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Link className="navbar-brand">React 130</Link>
          <NavbarToggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Item>
                {user.role === "admin" && (
                  <NavLink className="navbar-brand nav-link" to="/staff">
                    <i class="fa-solid fa-users me-2"></i>Staff
                  </NavLink>
                )}
              </Nav.Item>
              <Nav.Item>
                <NavLink className="navbar-brand nav-link" to="/customer">
                  <i class="fa-solid fa-users me-2"></i>Customers
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="navbar-brand nav-link" to="/category">
                  <i class="fa-solid fa-list me-2"></i>Category
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="navbar-brand nav-link" to="/brand">
                  <i class="fa-solid fa-users me-2"></i>Brand
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="navbar-brand nav-link" to="/product">
                  <i class="fa-solid fa-users me-2"></i>Product
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="navbar-brand nav-link" to="/review">
                  <i class="fa-solid fa-comments me-2"></i>Review
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="navbar-brand nav-link" to="/order">
                  <i class="fa-solid fa-comments me-2"></i>Order
                </NavLink>
              </Nav.Item>
            </Nav>

            <Nav className="mb-lg-0 mb-2">
              <NavDropdown
                title={
                  <>
                    <i className="fa-solid fa-user me-2"></i>
                    {user.username}
                  </>
                }
                align="end"
              >
                <Link to="/profile/edit" className="dropdown-item">
                  <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                </Link>
                <Link to="/profile/password" className="dropdown-item">
                  <i className="fa-solid fa-asterisk me-2"></i>change Password
                </Link>

                <DropdownDivider />

                <Button
                  to="/logout"
                  className="dropdown-item"
                  variant="link"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                  LogOut
                </Button>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      // <h1>Hello</h1>
    )
  );
}

export default AppMenu;

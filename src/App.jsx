import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";

import Layout from "./components/Layout";
import * as Pages from "./pages";
import { AdminRoute } from "./Routes/AdminRoute";

// import { List } from "./pages/Staff";

// import { List } from "./pages";

// import { Staff, CreateStaff } from "./pages/staffs";

// import ProfileEdit from "./pages/Profile/profileEdit";

function App() {
  // console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      {/* <Login /> */}

      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<AppMenu />} /> */}

          <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="login" element={<Login />} />

            {/* <Route
              path="profile/edit"
              element={<PrivateRoute element={<Pages.Profile.Edit />} />}
            />
            <Route
              path="profile/password"
              element={<PrivateRoute element={<Pages.Profile.Password />} />}
            /> */}

            {/* <Route path="profile" element={<PrivateRoute element={<Outlet/>}  />}
              
            </Route> */}

            {/* Profile Route */}

            <Route
              path="profile"
              element={<PrivateRoute element={<Outlet />} />}
            >
              <Route path="edit" element={<Pages.Profile.Edit />} />
              <Route path="password" element={<Pages.Profile.Password />} />

              <Route />
            </Route>

            {/* Staff Route */}
            <Route path="staff">
              <Route
                index
                element={
                  <AdminRoute
                    element={<PrivateRoute element={<Pages.Staff.List />} />}
                  />
                }
              />
              <Route
                path="create"
                element={
                  <AdminRoute
                    element={<PrivateRoute element={<Pages.Staff.Create />} />}
                  />
                }
              />
              <Route
                path="edit/:id"
                element={
                  <AdminRoute
                    element={<PrivateRoute element={<Pages.Staff.Edit />} />}
                  />
                }
              />
            </Route>

            {/* <Route
              path="staff"
              element={
                <AdminRoute
                  element={<PrivateRoute element={<Pages.Staff.List />} />}
                />
              }
            />
            <Route
              path="staff/create"
              element={
                <AdminRoute
                  element={<PrivateRoute element={<Pages.Staff.Create />} />}
                />
              }
            />
            <Route
              path="staff/edit/:id"
              element={<PrivateRoute element={<Pages.Staff.Edit />} />}
            /> */}

            {/* <Route path"/> */}

            {/* Customer Route */}

            <Route
              path="customer"
              element={<PrivateRoute element={<Outlet />} />}
            >
              <Route index element={<Pages.Customer.List />} />
              <Route path="create" element={<Pages.Customer.Create />} />
              <Route path="edit/:id" element={<Pages.Customer.Edit />} />
            </Route>

            <Route
              path="product"
              element={<PrivateRoute element={<Outlet />} />}
            >
              <Route index element={<Pages.Product.List />} />
              <Route path="create" element={<Pages.Product.Create />} />
              <Route path="edit/:slug" element={<Pages.Product.Edit />} />
            </Route>

            <Route
              path="category"
              element={<PrivateRoute element={<Outlet />} />}
            >
              <Route index element={<Pages.Category.List />} />
              <Route path="create" element={<Pages.Category.Create />} />
              <Route path="edit/:slug" element={<Pages.Category.Edit />} />
            </Route>

            <Route path="brand" element={<PrivateRoute element={<Outlet />} />}>
              <Route index element={<Pages.Brand.List />} />
              <Route path="create" element={<Pages.Brand.Create />} />
              <Route path="edit/:slug" element={<Pages.Brand.Edit />} />
            </Route>

            <Route
              path="review"
              element={<PrivateRoute element={<Pages.Review.List />} />}
            />

            <Route path="order" element={<PrivateRoute element={<Outlet />} />}>
              <Route index element={<Pages.Order.List />} />
              <Route path="create" element={<Pages.Order.Create />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

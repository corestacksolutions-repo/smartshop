import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

import Profile from "../components/admin components/admin profile";
import OrderCard from "../components/admin components/order card";
import OrderDetails from "../components/admin components/ordered details";

import { Link } from "react-router-dom";

const Admin = () => {
  // ==========================
  // ORDER DETAILS MODAL
  // ==========================
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // ==========================
  // ORDERS
  // ==========================
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [fetchError, setFetchError] =
    useState(null);

  // ==========================
  // FETCH ORDERS
  // ==========================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const { data, error } =
          await supabase
            .from("orders")
            .select()
            // .order("created_at", {
            //   ascending: false,
            // });

        if (error) throw error;

        console.log(data)
        setOrders(data || []);
        setFetchError(null);
      } catch (error) {
        console.error(error);

        setFetchError(
          "Failed to load orders."
        );

        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP PROFILE */}
      <Profile />

      {/* MAIN CONTAINER */}
      <div className="max-w-[1600px] mx-auto px-5 py-8">

        <div className="grid md:grid-cols-6 gap-6">

          {/* SIDEBAR */}
          <aside
            className="
              hidden
              md:block
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-5
              h-fit
              shadow-sm
            "
          >
            <h3 className="font-bold text-lg mb-6">
              Dashboard
            </h3>

            <nav className="flex flex-col gap-3">

              <Link
                to="/admin"
                className="
                  px-4
                  py-3
                  rounded-xl
                  bg-black
                  text-white
                  font-medium
                "
              >
                Current Orders
              </Link>

              <button
                className="
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  text-gray-700
                  text-left
                "
              >
                Dispatched Orders
              </button>

              <button
                className="
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  text-gray-700
                  text-left
                "
              >
                Pending Orders
              </button>

            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <section className="md:col-span-5">

            {/* HEADER */}
            <div className="mb-8">

              <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-2">
                Smart Shop Dashboard
              </p>

              <h1 className="text-3xl md:text-4xl font-bold">
                Current Orders
              </h1>

              <p className="text-gray-500 mt-2">
                Manage customer orders and
                track fulfillment status.
              </p>

            </div>

            {/* LOADING */}
            {loading && (
              <div className="bg-white rounded-2xl p-10 text-center border">
                <h3 className="text-xl font-semibold">
                  Loading Orders...
                </h3>
              </div>
            )}

            {/* ERROR */}
            {!loading && fetchError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <p className="text-red-600">
                  {fetchError}
                </p>
              </div>
            )}

            {/* EMPTY */}
            {!loading &&
              !fetchError &&
              orders.length === 0 && (
                <div className="bg-white border rounded-2xl p-10 text-center">

                  <h3 className="text-2xl font-semibold text-gray-800">
                    No Orders Yet
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Orders will appear here
                    once customers start
                    purchasing products.
                  </p>

                </div>
              )}

            {/* ORDERS GRID */}
            {!loading &&
              orders.length > 0 && (
                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                  "
                >
                  {orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      viewDetails={
                        handleViewDetails
                      }
                    />
                  ))}
                </div>
              )}

          </section>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <OrderDetails
          detail={selectedOrder}
          handleCloseDetails={
            handleCloseDetails
          }
        />
      )}
    </div>
  );
};

export default Admin;
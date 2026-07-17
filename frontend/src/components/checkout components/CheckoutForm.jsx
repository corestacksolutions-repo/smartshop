import { useState } from "react";
import { useOrder } from "../../utils/OrderContext";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

const CheckoutForm = () => {
  const { order, setOrder } = useOrder();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    courier: "",
  });

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const completeOrder = {
      ...order,
      customer: formData,
    };

    try {
      setLoading(true);

const { data, error } = await supabase
  .from("orders")
  .insert([
    {
      product_id: completeOrder.id,
      product_name: completeOrder.name,
      product_brand: completeOrder.brand,
      product_category: completeOrder.category,

      product_image: completeOrder.image,

      product_color: completeOrder.color,
      product_size: completeOrder.size,

      quantity: completeOrder.quantity,

      unit_price: completeOrder.unitPrice,
      total_amount: completeOrder.totalPrice,

      customer_name: completeOrder.customer.name,
      customer_email: completeOrder.customer.email,
      customer_phone: completeOrder.customer.phone,
      customer_location: completeOrder.customer.location,

      courier_service: completeOrder.customer.courier,

      order_status: "complete",
      payment_status: "paid",
    },
  ])
  .select();

      console.log(data)
      console.log(error)

      if (error) throw error;

      console.log("Order Saved:", data);

      setOrder({
        ...completeOrder,
        orderId: data[0].id,
      });

      navigate("/receipt");
    } catch (error) {
      console.error(
        "Failed to save order:",
        error
      );

      alert(
        "Something went wrong while creating your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-[900px] mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-3">
            Secure Checkout
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Complete Your Order
          </h1>

          <p className="text-gray-500 mt-4">
            Confirm your order details and provide
            delivery information.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-8">

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="grid md:grid-cols-[120px_1fr] gap-6 items-start">

            {/* Product Image */}
            {order.image && (
              <img
                src={order.image}
                alt={order.name}
                className="
                  w-28
                  h-28
                  object-cover
                  rounded-xl
                  border
                "
              />
            )}

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-y-4">

              <p className="text-gray-500">
                Product
              </p>
              <p className="font-medium">
                {order.name}
              </p>

              <p className="text-gray-500">
                Brand
              </p>
              <p className="font-medium">
                {order.brand}
              </p>

              <p className="text-gray-500">
                Category
              </p>
              <p className="font-medium capitalize">
                {order.category}
              </p>

              <p className="text-gray-500">
                Color
              </p>
              <p className="font-medium">
                {order.color}
              </p>

              <p className="text-gray-500">
                Size
              </p>
              <p className="font-medium">
                {order.size}
              </p>

              <p className="text-gray-500">
                Quantity
              </p>
              <p className="font-medium">
                {order.quantity}
              </p>

              <p className="text-gray-500">
                Unit Price
              </p>
              <p className="font-medium">
                MWK{" "}
                {Number(
                  order.unitPrice || 0
                ).toLocaleString()}
              </p>

              <p className="text-gray-500">
                Total
              </p>
              <p className="font-bold text-lg">
                MWK{" "}
                {Number(
                  order.totalPrice || 0
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        {/* Customer Form */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-8
            shadow-sm
          "
        >

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Delivery Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Banda"
                className="
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-black
                "
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+265..."
                className="
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-black
                "
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-medium text-gray-700">
                Email Address (Optional)
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-black
                "
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-medium text-gray-700">
                Delivery Location *
              </label>

              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Area 49, Lilongwe"
                className="
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-black
                "
              />
            </div>

            {/* Courier */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-medium text-gray-700">
                Courier Service *
              </label>

              <select
                name="courier"
                required
                value={formData.courier}
                onChange={handleChange}
                className="
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-black
                "
              >
                <option value="">
                  Select Courier Service
                </option>

                <option value="cts">
                  CTS Courier
                </option>

                <option value="post-express">
                  Post Express Courier
                </option>

                <option value="speed">
                  Speed Courier
                </option>

              </select>
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-8
              bg-black
              text-white
              py-4
              rounded-xl
              font-semibold
              tracking-wide
              hover:bg-gray-900
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Creating Order..."
              : "Confirm Order"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default CheckoutForm;
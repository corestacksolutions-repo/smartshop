import { FiX } from "react-icons/fi";

const OrderDetails = ({
  detail,
  handleCloseDetails,
}) => {
  if (!detail) return null;

  const date = new Date(
    detail.created_at
  );

  const formattedDate =
    date.toLocaleDateString();

  const formattedTime =
    date.toLocaleTimeString();

  const courierNames = {
    cts: "CTS Courier",
    "post-express":
      "Post Express Courier",
    speed: "Speed Courier",
  };

  const statusColor =
    detail.order_status === "delivered"
      ? "text-green-600"
      : detail.order_status ===
        "dispatched"
      ? "text-blue-600"
      : "text-orange-600";

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/70
        backdrop-blur-sm
        flex
        justify-center
        items-center
        p-4
      "
    >
      <div
        className="
          relative
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-6xl
          max-h-[90vh]
          overflow-y-auto
          p-8
        "
      >
        {/* Close Button */}
        <button
          onClick={handleCloseDetails}
          className="
            absolute
            top-5
            right-5
            bg-black
            text-white
            p-2
            rounded-full
          "
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div className="mb-8 border-b pb-6">
          <p className="uppercase tracking-[0.25em] text-sm text-gray-400 mb-2">
            Order Information
          </p>

          <h2 className="text-3xl font-bold">
            Order #{detail.id}
          </h2>

          <p className="text-gray-500 mt-2">
            Created on {formattedDate} at{" "}
            {formattedTime}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* PRODUCT */}
          <div className="border rounded-2xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Product Details
            </h3>

            <img
              src={
                detail.product_image ||
                "https://placehold.co/500x500"
              }
              alt={detail.product_name}
              className="
                w-full
                h-64
                object-cover
                rounded-xl
                border
                mb-5
              "
            />

            <div className="space-y-3">

              <p>
                Product:
                <strong className="ml-2">
                  {detail.product_name}
                </strong>
              </p>

              <p>
                Brand:
                <strong className="ml-2">
                  {detail.product_brand}
                </strong>
              </p>

              <p>
                Category:
                <strong className="ml-2 capitalize">
                  {
                    detail.product_category
                  }
                </strong>
              </p>

              <p>
                Product ID:
                <strong className="ml-2">
                  {detail.product_id}
                </strong>
              </p>

              <p>
                Size:
                <strong className="ml-2">
                  {detail.product_size}
                </strong>
              </p>

              <div className="flex items-center gap-3">

                <span>Color:</span>

                <div
                  className="
                    w-5
                    h-5
                    rounded-full
                    border
                  "
                  style={{
                    backgroundColor:
                      detail.product_color_hex ||
                      "#ccc",
                  }}
                />

                <strong>
                  {detail.product_color}
                </strong>

              </div>

              <p>
                Quantity:
                <strong className="ml-2">
                  {detail.quantity}
                </strong>
              </p>

            </div>
          </div>

          {/* CUSTOMER */}
          <div className="border rounded-2xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Customer Details
            </h3>

            <div className="space-y-4">

              <p>
                Name:
                <strong className="ml-2">
                  {
                    detail.customer_name
                  }
                </strong>
              </p>

              <p>
                Phone:
                <strong className="ml-2">
                  {
                    detail.customer_phone
                  }
                </strong>
              </p>

              <p>
                Email:
                <strong className="ml-2">
                  {detail.customer_email ||
                    "Not Provided"}
                </strong>
              </p>

              <p>
                Location:
                <strong className="ml-2">
                  {
                    detail.customer_location
                  }
                </strong>
              </p>

              <p>
                Courier:
                <strong className="ml-2">
                  {courierNames[
                    detail
                      .courier_service
                  ] ||
                    detail.courier_service}
                </strong>
              </p>

            </div>
          </div>

          {/* PAYMENT & STATUS */}
          <div className="border rounded-2xl p-6">

            <h3 className="font-bold text-xl mb-5">
              Order Summary
            </h3>

            <div className="space-y-4">

              <p>
                Unit Price:
                <strong className="ml-2">
                  MWK{" "}
                  {Number(
                    detail.product_price ||
                      0
                  ).toLocaleString()}
                </strong>
              </p>

              <p>
                Total Amount:
                <strong className="ml-2">
                  MWK{" "}
                  {Number(
                    detail.total_amount ||
                      0
                  ).toLocaleString()}
                </strong>
              </p>

              <p>
                Payment Status:
                <strong className="ml-2 text-green-600">
                  {detail.payment_status}
                </strong>
              </p>

              <p>
                Order Status:
                <strong
                  className={`ml-2 capitalize ${statusColor}`}
                >
                  {detail.order_status ||
                    "pending"}
                </strong>
              </p>

              <p>
                Date:
                <strong className="ml-2">
                  {formattedDate}
                </strong>
              </p>

              <p>
                Time:
                <strong className="ml-2">
                  {formattedTime}
                </strong>
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="border-t mt-8 pt-6">

          <p className="text-gray-600">
            This order was submitted by{" "}
            <strong>
              {detail.customer_name}
            </strong>{" "}
            and is currently marked as{" "}
            <strong
              className={`capitalize ${statusColor}`}
            >
              {detail.order_status ||
                "pending"}
            </strong>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
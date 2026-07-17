import { HiUser } from "react-icons/hi";

const OrderCard = ({
  order,
  viewDetails,
}) => {
  const statusColor =
    order.order_status === "delivered"
      ? "bg-green-100 text-green-700"
      : order.order_status === "dispatched"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <article
      className="
        relative
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
      "
    >

      {/* Status */}
      <div className="absolute top-4 right-4">
        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            capitalize
            ${statusColor}
          `}
        >
          {order.order_status || "pending"}
        </span>
      </div>

      {/* Product */}
      <div className="flex gap-4">

        <img
          src={
            order.product_image ||
            "https://placehold.co/100x100"
          }
          alt={order.product_name}
          className="
            w-20
            h-20
            object-cover
            rounded-xl
            border
          "
        />

        <div className="flex-1">

          <h3 className="font-semibold text-lg">
            {order.product_name}
          </h3>

          <p className="text-sm text-gray-500">
            {order.product_brand}
          </p>

          <p className="text-sm text-gray-500 capitalize">
            {order.product_category}
          </p>

        </div>
      </div>

      {/* Product Details */}
      <div className="mt-5 space-y-2">

        <div className="flex items-center gap-2">

          <span
            className="
              text-sm
              text-gray-600
            "
          >
            Color:
          </span>

          <div
            className="
              w-5
              h-5
              rounded-full
              border
            "
            style={{
              backgroundColor:
                order.product_color_hex ||
                "#cccccc",
            }}
          />

          <span className="text-sm font-medium">
            {order.product_color}
          </span>

        </div>

        <p className="text-sm">
          <span className="text-gray-600">
            Size:
          </span>{" "}
          <strong>
            {order.product_size}
          </strong>
        </p>

        <p className="text-sm">
          <span className="text-gray-600">
            Quantity:
          </span>{" "}
          <strong>
            {order.quantity}
          </strong>
        </p>

      </div>

      {/* Customer */}
      <div className="mt-6 border-t pt-4">

        <div className="flex gap-3">

          <div
            className="
              w-10
              h-10
              rounded-full
              border
              flex
              items-center
              justify-center
            "
          >
            <HiUser className="text-gray-600" />
          </div>

          <div>

            <p className="font-medium">
              {order.customer_name}
            </p>

            <p className="text-sm text-gray-500">
              {order.customer_phone}
            </p>

            <p className="text-sm text-gray-500">
              {order.customer_location}
            </p>

          </div>

        </div>

      </div>

      {/* Total */}
      <div className="mt-5 border-t pt-4">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <p className="text-xl font-bold">
              MWK{" "}
              {Number(
                order.total_amount || 0
              ).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() =>
              viewDetails(order)
            }
            className="
              px-4
              py-2
              bg-black
              text-white
              rounded-lg
              text-sm
              font-medium
              hover:bg-gray-900
              transition-all
            "
          >
            View Details
          </button>

        </div>

      </div>

    </article>
  );
};

export default OrderCard;
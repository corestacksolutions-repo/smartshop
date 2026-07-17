import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

      if (error) {
        setMessage(error.message);

        setCredentials({
          email: "",
          password: "",
        });

        return;
      }

      if (data?.user) {
        navigate("/admin");
      }
    } catch (err) {
      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        min-h-screen
        bg-[#f8f8f8]
        flex
        items-center
        justify-center
        px-6
        py-12
      "
    >
      <div
        className="
          w-full
          max-w-[1200px]
          grid
          lg:grid-cols-2
          overflow-hidden
          rounded-[32px]
          bg-white
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
        "
      >
        {/* LEFT PANEL */}
        <div
          className="
            hidden
            lg:flex
            relative
            min-h-[750px]
            items-end
            p-12
          "
        >
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
            alt="Fashion Collection"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/60
              to-black/20
            "
          />

          <div
            className="
              relative
              z-20
              text-white
              max-w-lg
            "
          >
            <p
              className="
                uppercase
                tracking-[0.35em]
                text-xs
                text-gray-300
                mb-5
              "
            >
              MODA ADMIN
            </p>

            <h2
              className="
                text-6xl
                font-bold
                leading-[105%]
                mb-6
              "
            >
              Manage Your Store.
            </h2>

            <p
              className="
                text-lg
                text-gray-200
                leading-8
              "
            >
              Access products, orders, inventory,
              customers and business insights from
              one centralized dashboard.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="
            flex
            items-center
            justify-center
            px-8
            py-16
            md:px-14
          "
        >
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                    text-lg
                  "
                >
                  M
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    MODA
                  </h2>

                  <p className="text-sm text-gray-500">
                    Smart Shop Admin
                  </p>
                </div>
              </div>

              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-xs
                  text-gray-400
                  mb-4
                "
              >
                Administration Portal
              </p>

              <h1
                className="
                  text-4xl
                  font-bold
                  text-gray-900
                  mb-4
                "
              >
                Sign In
              </h1>

              <p className="text-gray-500 leading-7">
                Enter your credentials to access
                the Smart Shop dashboard.
              </p>

              {message && (
                <div
                  className="
                    mt-6
                    bg-red-50
                    border
                    border-red-200
                    text-red-700
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                  "
                >
                  {message}
                </div>
              )}
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* EMAIL */}
              <div>
                <label
                  className="
                    block
                    mb-3
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="admin@moda.com"
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-300
                    focus:outline-none
                    focus:border-black
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  className="
                    block
                    mb-3
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-300
                    focus:outline-none
                    focus:border-black
                  "
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-black
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  text-lg
                  hover:bg-gray-900
                  transition-all
                  duration-300
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Signing In..."
                  : "Access Dashboard"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-400">
                Smart Shop Management System
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
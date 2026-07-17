import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className="
        w-full
        flex
        justify-between
        items-center
        p-5
        border-b
        bg-white
      "
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">
          SmartShop
        </p>

        <h1 className="text-xl md:text-4xl font-bold text-black">
          Admin Dashboard
        </h1>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
          border
          rounded-xl
          px-4
          py-2
          shadow-sm
        "
      >
        {/* Profile Avatar */}
        <div
          className="
            w-12
            h-12
            rounded-full
            bg-gray-800
            flex
            items-center
            justify-center
          "
        >
          <FiUser className="text-white text-xl" />
        </div>

        {/* User Info */}
        <div className="hidden sm:block">
          <p className="font-semibold text-gray-800">
            Harriet Mandala
          </p>

          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="
            px-4
            py-2
            rounded-lg
            border
            text-sm
            font-medium
            transition-all
            duration-300
            cursor-pointer
            hover:bg-red-50
            hover:text-red-600
            hover:border-red-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Profile;
import { useForm } from "react-hook-form";
import {
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import MyInput from "../MyInput/MyInput";
import MyLabel from "../MyLabel/MyLabel";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../Button/Button";
import useSecureAxios from "../../hooks/useSecureAxios";
import { toast } from "sonner";
import { getAlert } from "../../utilities/getAlert";
import { useState } from "react";
import ActionSpinner from "../ActionSpinner/ActionSpinner";

const OrderModal = ({ isOpen, closeModal, book, refetch }) => {
  const [loading, setLoading] = useState(false);
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const orderData = {
      bookId: book._id,
      librarianEmail: book.librarianEmail,
      customerName: user.displayName,
      customerEmail: user.email,
      ...data,
    };

    try {
      const { data } = await secureAxios.post("/orders", orderData);

      if (data.insertedId) {
        refetch();

        getAlert({
          title: `${book.bookName} successfully ordered. Please pay to continue.`,
        });

        reset();
        closeModal();
      }
    } catch {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
            <FaShoppingCart className="text-xl sm:text-2xl text-primary" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Place Your Order
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Fill in your details to complete the order
            </p>
          </div>
        </div>

        {/* Book Info */}
        {book && (
          <div className="card bg-base-200 mb-4 sm:mb-6">
            <div className="card-body p-3 sm:p-4">
              <div className="flex gap-3 sm:gap-4">
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  className="w-14 h-18 sm:w-16 sm:h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base text-gray-800 line-clamp-1">
                    {book.bookName}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {book.author}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-primary mt-1">
                    ৳ {book.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {/* Name */}
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-base-200 rounded-lg">
            <FaUser className="text-primary text-base sm:text-lg" />
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-semibold text-sm sm:text-base text-gray-800">
                {user.displayName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-base-200 rounded-lg">
            <FaEnvelope className="text-primary text-base sm:text-lg" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold text-sm sm:text-base text-gray-800">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone */}
          <div>
            <MyLabel htmlFor="phone">
              <span className="text-sm sm:text-base">
                Phone Number <span className="text-error">*</span>
              </span>
            </MyLabel>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <MyInput
                id="phone"
                type="tel"
                disabled={loading}
                placeholder="Enter your phone number"
                className="pl-10 text-sm sm:text-base"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
            </div>
            <ErrorMessage message={errors.phone?.message} />
          </div>

          {/* Address */}
          <div>
            <MyLabel htmlFor="address">
              <span className="text-sm sm:text-base">
                Address <span className="text-error">*</span>
              </span>
            </MyLabel>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400 text-sm" />
              <textarea
                id="address"
                disabled={loading}
                placeholder="Enter your delivery address"
                className="textarea textarea-bordered w-full pl-10 min-h-20 sm:min-h-24 text-sm sm:text-base"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
              />
            </div>
            <ErrorMessage message={errors.address?.message} />
          </div>

          {/* Actions */}
          <div className="modal-action flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              disable={loading}
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              disable={loading}
              type="submit"
              variant="primary"
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              {loading ? (
                <ActionSpinner />
              ) : (
                <>
                  <FaShoppingCart />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={handleClose}></div>
    </div>
  );
};

export default OrderModal;

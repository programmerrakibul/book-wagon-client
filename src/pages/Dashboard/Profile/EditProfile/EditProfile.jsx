import { useForm } from "react-hook-form";
import { FaUser, FaImage, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import MyInput from "../../../../components/MyInput/MyInput";
import MyLabel from "../../../../components/MyLabel/MyLabel";
import Button from "../../../../components/Button/Button";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import { uploadImage } from "../../../../utilities/uploadImage";
import { toast } from "sonner";
import { getAlert } from "../../../../utilities/getAlert";
import ActionSpinner from "../../../../components/ActionSpinner/ActionSpinner";
import Avatar from "../../../../components/Avatar/Avatar";

const EditProfile = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user.photoURL);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      displayName: user.displayName,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const imageInfo = data.photoURL[0];
    const displayName = data.displayName.trim();

    setLoading(true);

    try {
      if (imageInfo || displayName) {
        if (imageInfo) {
          const photoURL = await uploadImage(imageInfo);
          await updateUserProfile({ photoURL });
          setUser({ ...user, photoURL });
        }

        if (displayName) {
          await updateUserProfile({ displayName });
          setUser({ ...user, displayName });
        }

        getAlert({ title: "Profile information updated" });
      } else {
        toast.info(`Invalid info can't update`);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setImagePreview(user.photoURL);
  };

  return (
    <>
      <title>Edit your profile information - BookWagon</title>

      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Edit Profile
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Update your profile information
        </p>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-8"
      >
        {/* Profile Image Section */}
        <div className="card bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/20">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <FaImage className="text-primary" />
              Profile Picture
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Image Preview */}
              <Avatar
                src={imagePreview}
                alt="Profile Preview"
                size="size-32 sm:size-40"
              />

              {/* File Input */}
              <div className="flex-1 w-full">
                <MyLabel htmlFor="photoURL">
                  Profile Image <span className="text-error">*</span>
                </MyLabel>
                <input
                  type="file"
                  id="photoURL"
                  disabled={loading}
                  accept="image/*"
                  {...register("photoURL")}
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-primary w-full text-sm sm:text-base"
                />
                <ErrorMessage message={errors.photoURL?.message} />

                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <FaUser className="text-primary" />
              Personal Information
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Display Name */}
              <div>
                <MyLabel htmlFor="displayName">
                  Full Name <span className="text-error">*</span>
                </MyLabel>
                <MyInput
                  type="text"
                  id="displayName"
                  disabled={loading}
                  placeholder="Enter your full name"
                  {...register("displayName", {
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />

                <ErrorMessage message={errors.displayName?.message} />
              </div>

              {/* Email (Read-only) */}
              <div>
                <MyLabel htmlFor="email">Email Address</MyLabel>
                <MyInput type="email" id="email" value={user.email} disabled />
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Email cannot be changed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={handleCancel}
            className="btn btn-outline btn-error gap-2 text-sm sm:text-base"
          >
            <MdCancel className="text-lg" />
            Cancel
          </button>

          <Button disabled={loading}>
            {loading ? (
              <ActionSpinner />
            ) : (
              <>
                <FaSave className="text-lg" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;

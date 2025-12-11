import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { toast } from "sonner";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <title>Contact Us - BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <Container>
          {/* Header */}
          <Heading
            title="Get In Touch"
            subtitle="Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MdEmail className="text-xl sm:text-2xl text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">
                          Email
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          support@bookwagon.com
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          info@bookwagon.com
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary/10 rounded-full">
                        <FaPhone className="text-xl sm:text-2xl text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">
                          Phone
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          +880 1234-567890
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          +880 9876-543210
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <FaMapMarkerAlt className="text-xl sm:text-2xl text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">
                          Address
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          123 Library Street
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          Dhaka 1000, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <div className="card-body p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Office Hours
                  </h2>
                  <div className="space-y-2 text-sm sm:text-base text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Send Us a Message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Name */}
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="name" className="label">
                      <span className="label-text text-sm sm:text-base">
                        Your Name <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="relative group">
                      <BsFillPersonFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className="input input-bordered w-full pl-10 text-sm sm:text-base"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="email" className="label">
                      <span className="label-text text-sm sm:text-base">
                        Your Email <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="relative group">
                      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full pl-10 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="subject" className="label">
                      <span className="label-text text-sm sm:text-base">
                        Subject <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What is this about?"
                      className="input input-bordered w-full text-sm sm:text-base"
                      required
                      minLength={5}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="message" className="label">
                      <span className="label-text text-sm sm:text-base">
                        Message <span className="text-error">*</span>
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      className="textarea textarea-bordered w-full min-h-32 text-sm sm:text-base"
                      required
                      minLength={10}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button className="btn-block">
                    <FaPaperPlane />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactUs;

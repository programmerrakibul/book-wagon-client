import { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner";
import Container from "../shared/Container/Container";
import bgImage from "../../assets/newsletter.jpg";
import Button from "../../components/Button/Button";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-secondary/25 to-primary/30"></div>
      </div>

      <Container>
        <div className="card bg-base-100/55 backdrop-blur-sm shadow-2xl overflow-hidden relative z-10">
          <div className="card-body p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              {/* Icon & Text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block p-4 sm:p-5 bg-primary/20 rounded-full mb-4 sm:mb-6">
                  <FaEnvelope className="text-4xl sm:text-5xl lg:text-6xl text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Stay updated with the latest book arrivals, exclusive offers,
                  and reading recommendations delivered straight to your inbox.
                </p>
              </div>

              {/* Form */}
              <div className="flex-1 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="input input-bordered w-full pl-11 sm:pl-12 pr-4 text-sm sm:text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button className="btn-block gap-2" disabled={loading}>
                    {loading ? (
                      <ActionSpinner />
                    ) : (
                      <>
                        <FaPaperPlane />
                        Subscribe Now
                      </>
                    )}
                  </Button>

                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12 border-t border-base-300">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                  10K+
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Subscribers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                  Weekly
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Updates</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                  100%
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Free</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsLetter;

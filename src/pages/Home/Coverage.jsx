import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";
import { availableCities } from "../../data/availableCities";

const Coverage = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
      <Container>
        <Heading
          title="Delivery Coverage"
          subtitle="We deliver books to major cities across Bangladesh"
          size="large"
        />

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Map */}
          <div className="flex-1 z-0!">
            <div className="card bg-base-100 shadow-2xl overflow-hidden lg:sticky! lg:top-20">
              <div className="h-64 sm:h-80 lg:h-96 w-full">
                <MapContainer
                  center={[23.685, 90.3563]}
                  zoom={7}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {availableCities.map((city, index) => (
                    <Marker key={index} position={city.position}>
                      <Popup>
                        <div className="text-center p-2">
                          <h3 className="font-bold text-base dark:text-neutral!">
                            {city.name}
                          </h3>
                          <p className="text-sm">{city.population} people</p>
                          <p className="text-xs text-success mt-1">
                            ✓ Delivery Available
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Cities List */}
          <div className="flex-1 lg:max-w-md">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold  mb-4 sm:mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Available Cities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {availableCities.map((city, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-3 sm:p-4 bg-base-200 rounded-lg hover:bg-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheckCircle className="text-success text-base sm:text-lg shrink-0" />
                        <h4 className="font-semibold text-sm sm:text-base">
                          {city.name}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm mb-2">
                        {city.population} people
                      </p>
                      <span className="badge badge-success badge-sm self-start">
                        Active
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-linear-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <p className="text-xs sm:text-sm text-center">
                    <strong className="text-primary">Expanding Soon!</strong>{" "}
                    We're working to bring our services to more cities across
                    Bangladesh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Coverage;

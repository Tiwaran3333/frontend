import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-300 text-center mb-10">
          Contact Us
        </h1>

        {/* Contact Info */}
        <div className="grid md:grid-cols-5 gap-6 text-center mb-12">
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:scale-105 transition">
            <Phone className="mx-auto mb-3 text-blue-400" size={40} />
            <h2 className="text-lg font-semibold">Phone</h2>
            <p className="text-gray-400">099-999-9991</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:scale-105 transition">
            <Mail className="mx-auto mb-3 text-blue-400" size={40} />
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-400">Tiwaran@gmail.com</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:scale-105 transition">
            <MapPin className="mx-auto mb-3 text-blue-400" size={40} />
            <h2 className="text-lg font-semibold">Location</h2>
            <p className="text-gray-400">Chiang Mai, Thailand</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:scale-105 transition">
            <Facebook className="mx-auto mb-3 text-blue-400" size={40} />
            <h2 className="text-lg font-semibold">Facebook</h2>
            <p className="text-gray-400">Tiwaran</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:scale-105 transition">
            <Instagram className="mx-auto mb-3 text-blue-400" size={40} />
            <h2 className="text-lg font-semibold">Instagram</h2>
            <p className="text-gray-400">@tiwaran.ig</p>
          </div>
        </div>
      </div>
    </div>
  );
}

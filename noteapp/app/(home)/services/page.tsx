import React from "react";

const ServicesPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[60vh] flex flex-col justify-center mt-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Services</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        NoteVault provides a seamless way to manage your notes and collaborate with friends in real-time.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">Create & Manage Notes</h2>
          <p className="text-gray-600">
            Easily create, update, view, and delete your notes in an intuitive interface.
          </p>
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">Real-time Collaboration</h2>
          <p className="text-gray-600">
            Chat and collaborate with your friends while taking notes together.
          </p>
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">Secure & Private</h2>
          <p className="text-gray-600">
            Your notes are stored securely with authentication and encryption.
          </p>
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">Cross-Platform Access</h2>
          <p className="text-gray-600">
            Access your notes from any device with our web-based platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

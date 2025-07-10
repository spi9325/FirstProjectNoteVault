import React from "react";

const ManualPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">User Manual</h1>
        <p className="text-lg mt-2">Learn how to use NoteVault efficiently</p>
      </header>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Section 1: Getting Started */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Getting Started</h2>
          <p className="text-gray-700">
            Sign up for an account to start creating and organizing your notes. You can access your notes from anywhere.
          </p>
        </section>

        {/* Section 2: Creating Notes */}
        <section className="bg-blue-50 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Creating Notes</h2>
          <p className="text-gray-700">
            Click on the "New Note" button to create a note. You can format text, add tags, and save it instantly.
          </p>
        </section>

        {/* Section 3: Collaborating */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Collaborating with Friends</h2>
          <p className="text-gray-700">
            Share notes with friends and edit them in real-time. Use the built-in chat feature for discussions.
          </p>
        </section>

        {/* Section 4: Security */}
        <section className="bg-blue-50 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Security & Privacy</h2>
          <p className="text-gray-700">
            All your notes are encrypted and stored securely. Only you and authorized collaborators can access them.
          </p>
        </section>

        {/* Section 5: Access Anywhere */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Accessing Notes Anywhere</h2>
          <p className="text-gray-700">
            NoteVault is available on mobile and desktop. Login from any device and sync your notes instantly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ManualPage;

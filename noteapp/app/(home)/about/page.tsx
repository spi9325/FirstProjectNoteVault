
const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center mt-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">About NoteVault</h1>
      <p className="text-lg text-gray-700 mb-6">
        NoteVault is a powerful and intuitive platform designed to help you take notes, stay organized, and collaborate effortlessly.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 mt-8">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            Our goal is to simplify note-taking and collaboration, allowing users to focus on what truly matters.
          </p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Why Choose Us?</h2>
          <p className="text-gray-600">
            We provide a secure, user-friendly, and real-time collaboration experience for all your note-taking needs.
          </p>
        </div>
      </div>

      <div className="mt-10 bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-900">Join Us on Our Journey</h2>
        <p className="text-gray-700 mt-2">
          Experience a new way of organizing and collaborating. Start using NoteVault today!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 py-12 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-purple-500">Cine</span>
                <span className="text-white">Verse</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Your personal cinema universe with thousands of movies and TV
                shows to discover.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    TV Shows
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Channels
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Collections
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Help</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Supported Devices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2023 CineVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

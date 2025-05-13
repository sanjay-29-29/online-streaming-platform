/* eslint-disable @next/next/no-img-element */
export default function NavBar() {
  return (
    <>
      <nav className="navbar fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <a href="/browse" className="text-3xl font-bold">
            <span className="text-purple-500">Cine</span>
            <span className="text-white">Verse</span>
          </a>
          <div className="hidden lg:flex space-x-8">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Discover
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Genres
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Collections
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Channels
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <i className="fas fa-search text-lg"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <i className="fas fa-bell text-lg"></i>
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-purple-500"
              />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl py-1 hidden group-hover:block">
              <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

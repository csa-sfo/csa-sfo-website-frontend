
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation Header */}
      <nav className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Your Brand
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">Home</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">About</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">Services</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent leading-tight">
            Welcome to Your
            <span className="block mt-2">Amazing Project</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Start building something extraordinary. This is your blank canvas, ready for your creative vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transform hover:scale-105 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Your Brand. Ready to be customized.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

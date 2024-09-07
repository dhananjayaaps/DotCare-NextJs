import Image from "next/image";
import pregnantMomSVG from '../public/pregnet-mother.svg';

// import Image from "next/image";
// import pregnantMomSVG from '../public/pregnant-mother.svg'; // Ensure the SVG file is correctly named
const handleLogin = () => {
  na
  alert('Login button clicked');
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-0 bg-gradient-to-b from-pink-100 to-white text-gray-800">
      {/* Navigation Bar */}
      <nav className="w-full py-6 bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <a href="#" className="text-teal-700 font-bold text-2xl">DotCare</a>
          <div className="hidden md:flex space-x-4">

          <a href="/auth/login">
            <button className="py-2 px-6 bg-transparent text-teal-700 border border-teal-700 rounded hover:bg-teal-700 hover:text-white transition">
              Login
            </button>
          </a><div className="space-x-4">
          <a href="/auth/signup">
            <button className="py-2 px-6 bg-teal-500 text-white rounded hover:bg-teal-600 transition">
              Sign Up
            </button>
          </a>
          </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-28 md:pt-40">
        <div className="container mx-auto px-8 lg:flex">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none text-teal-700">
              Welcome to DotCare
            </h1>
            <p className="text-xl lg:text-2xl mt-6 font-medium">
              Your Comprehensive Partner in Maternal Health Care
            </p>
            <p className="mt-4 md:mt-8 text-lg text-gray-600">
              Empowering mothers and clinics with advanced digital tools to manage appointments, monitor health, and stay connected throughout the journey of motherhood.
            </p>
            <p className="mt-8 md:mt-12">
              <button type="button" className="py-4 px-12 bg-teal-500 hover:bg-teal-600 rounded text-white">
                Join DotCare
              </button>
            </p>
            <p className="mt-4 text-gray-600">Register today and start your journey with us.</p>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <Image 
              src={pregnantMomSVG} 
              width={400}
              alt="Illustration of a pregnant mother" 
              className="mx-auto lg:mx-0"
              priority 
            />
          </div>
        </div>
      </section>
      
      <section className="mt-20 lg:mt-40">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl lg:text-4xl font-semibold text-center text-teal-700">
            Why Choose DotCare?
          </h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full lg:w-1/3 p-4 text-center">
              <h3 className="text-xl font-bold">Personalized Health Tracking</h3>
              <p className="mt-2 text-gray-600">
                Keep track of your health milestones with our easy-to-use digital mother and baby cards.
              </p>
            </div>
            <div className="w-full lg:w-1/3 p-4 text-center">
              <h3 className="text-xl font-bold">Convenient Appointments</h3>
              <p className="mt-2 text-gray-600">
                Schedule and manage your clinic visits effortlessly, from anywhere, at any time.
              </p>
            </div>
            <div className="w-full lg:w-1/3 p-4 text-center">
              <h3 className="text-xl font-bold">Real-time Symptom Reporting</h3>
              <p className="mt-2 text-gray-600">
                Report and track symptoms instantly and receive professional advice when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

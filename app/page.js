import Image from "next/image";
import pregnetMomSVG from '../public/pregnet-mother.svg';


export default function Home() {
    

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <section className="pt-20 md:pt-40">
            <div className="container mx-auto px-8 lg:flex">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Main title of your
                        landing page</h1>
                    <p className="text-xl lg:text-2xl mt-6 font-dark">Free landing page template to promote your
                        business startup and generate leads for the offered services
                    </p>
                    <p className="mt-8 md:mt-12">
                        <button type="button"
                            className=" py-4 px-12 bg-teal-500 hover:bg-teal-600 rounded text-white">Get Started</button>
                    </p>
                    <p className="mt-4 text-gray-600">Sed fermentum felis ut cursu
                    </p>
                </div>

                <div className="lg:w-1/2">
                    {/* <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1167.52 754.06">
                        
                    </svg> */}
                    <Image src={pregnetMomSVG} alt="Description of SVG" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1167.52 754.06"/>
                    
                </div>
            </div>
        </section>
    </main>
  );
}

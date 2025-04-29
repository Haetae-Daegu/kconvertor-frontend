import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/SEO';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Haetae - Student Accommodation Platform" 
        description="Learn about Haetae, Keimyung University, and how we help students find their perfect accommodation." 
      />
      
      <header className="bg-gradient-to-r bg-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Haetae</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted platform for finding perfect accommodations near Keimyung University
          </p>
        </div>
      </header>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At Haetae, we understand that finding the right accommodation is one of the most important decisions for students. Named after the mythical Korean creature that symbolizes protection and good fortune, Haetae is dedicated to helping students find safe, comfortable, and convenient housing near Keimyung University.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The platform was founded by a former international students who experienced firsthand the challenges of finding suitable accommodation in a new country. We've made it our mission to simplify this process for both local and international students.
              </p>
              <p className="text-lg text-gray-700">
                We carefully verify all listings to ensure they meet our quality standards, and we provide comprehensive information to help you make informed decisions about your housing options.
              </p>
            </div>
            <div className="hidden md:block md:w-1/2 relative h-80 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/Haetae.jpeg" alt="Haetae" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How Haetae Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Search & Filter</h3>
              <p className="text-gray-700 text-center">
                Browse through our extensive database of verified accommodations near Keimyung University. Filter by price, room type, amenities, and distance from campus.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Connect</h3>
              <p className="text-gray-700 text-center">
                Contact property owners directly through our secure messaging system. Schedule viewings and ask questions to find your perfect match.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Move In</h3>
              <p className="text-gray-700 text-center">
                Finalize your agreement with peace of mind. Use our resources to understand leases, local regulations, and student rights for a smooth transition.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Keimyung University</h2>
              <p className="text-lg text-gray-700 mb-4">
                Keimyung University, founded in 1954, is one of the most prestigious private universities in South Korea. Located in Daegu, the university is known for its beautiful campus, strong academic programs, and vibrant international community.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With over 24,000 students, including a growing international student body, Keimyung University offers a wide range of undergraduate and graduate programs across multiple disciplines. The university is particularly renowned for its programs in medicine, business, engineering, and Korean language studies.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The main campus, Seongseo, spans over 1.5 million square meters and features modern facilities, including state-of-the-art libraries, research centers, sports complexes, and student housing. The campus is well-connected to the city center via public transportation, making it easily accessible for students living off-campus.
              </p>
            </div>
            <div className="hidden md:block md:w-1/2 relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/KMU2.jpg"
                alt="Keimyung University"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                loading="eager"
                className="opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Discover Keimyung University</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Take a virtual tour of Keimyung University's beautiful campus and get a glimpse of student life.
            This video showcases the facilities, surrounding areas, and what makes Keimyung a special
            place to study.
          </p>
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <div className="relative pb-[56.25%]">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/BlilCrJqV3Y?list=PL1J2PNZ7vGAoRMcLZCujgOgpl0fLnYIPI" 
                title="Keimyung University Campus Tour" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a 
              href="https://www.youtube.com/watch?v=BlilCrJqV3Y&list=PL1J2PNZ7vGAoRMcLZCujgOgpl0fLnYIPI&index=10" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>
      
            
      <section className="py-12 dark:bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Accommodation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join students who've found their ideal home near Keimyung University with Haetae.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Create Free Account
            </Link>
            <Link href="/accommodations" className="px-8 py-3 border border-white text-white rounded-md font-semibold hover:bg-blue-700 transition-colors">
              Browse Accommodations
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              Have questions or feedback? Our team is here to help you find the perfect accommodation for your time at Keimyung University.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Arneol</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:nicolas.yapobi@epitech.eu" className="hover:text-blue-600 transition-colors">
                  nicolas.yapobi@epitech.eu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
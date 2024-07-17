"use client";
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';


export default function Home() {

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      <Head>
        <title>The GenAI Show</title>
      </Head>

      <header className="py-10 bg-white text-black w-full">
        <div className="container mx-auto flex justify-between items-center px-6 max-w-6xl">
          <Image 
            src="https://thegenai.show/wp-content/uploads/2024/06/Screenshot-2024-06-03-at-8.47.49-PM.png" 
            alt="The Gen AI Show" 
            width={32} 
            height={32} 
          />
          <nav className="space-x-4">
            <a href="#about" className="hover:underline">About</a>
            <a href="#categories" className="hover:underline">Categories</a>
            <a href="#timeline" className="hover:underline">Timeline</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-6xl">
        <section className="text-center my-20">
          <h2 className="text-5xl font-extrabold mb-4">World’s Largest Platform for Kids to Showcase Their Generative AI Talent</h2>
          <p className="text-xl">Generative AI is Redefining the Human Life. The change is happening at the speed of light and we need to make our children ready for it.</p>
          <div>Hello, @{user.username} {user.fullName} welcome to Clerk</div>
          <Link href={user.username}> <a>PROFILE</a> </Link>
        </section>

        <section id="about" className="my-20 text-center">
          <h3 className="text-4xl font-bold mb-4">About The GenAI Show</h3>
          <p className="text-lg">The GenAI Show is an inter-school competition for the selected kids to showcase their GenAI Talent. Kids can compete in 3 categories after going through our comprehensive GenAI program, GenAI Master.</p>
        </section>

        <section id="categories" className="my-20">
          <h3 className="text-4xl font-bold mb-4 text-center">Competition Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">GenAI Talks</h4>
              <p>Kids present their ideas on how GenAI can solve world problems.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Creative GenAI Show</h4>
              <p>Showcase GenAI creative assets in a competitive environment.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-2">Product GenAI Show</h4>
              <p>A hackathon for kids to showcase their GenAI product building capabilities.</p>
            </div>
          </div>
        </section>

        <section id="timeline" className="my-20 text-center">
          <h3 className="text-4xl font-bold mb-4">Timeline</h3>
          <ul className="list-disc list-inside inline-block text-left">
            <li>Last Date for School Signup: 30 Jun 24</li>
            <li>Last Date for Workshops: 15 Jul 24</li>
            <li>Last Date for Course Signup: 31 Jul 24</li>
            <li>Completion of the Course: 31 Oct 24</li>
            <li>Last Date to Signup for the Competition: 15 Nov 24</li>
            <li>Last Date for Round 1 Assessments: 15 Dec 24</li>
            <li>Round 2 Assessments: 23 Jan 25</li>
            <li>Grand Finale: 25 Jan 25</li>
          </ul>
        </section>

        <section id="contact" className="my-20">
          <h3 className="text-4xl font-bold mb-4 text-center">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-2xl font-bold">Registered Office</h4>
              <p>AIGEBRA.IO INC.<br />651 N BROAD ST, SUITE 205<br />Middletown, DE 19709<br />United States</p>
              <p>Phone: 510-579-2392</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold">Raipur Office</h4>
              <p>{'{igebra.ai}'}<br />#E-10, Wallfort Enclave<br />Pachpedi Naka<br />Raipur – 492001<br />Chhattisgarh, India</p>
              <p>Phone: +91 9993115000</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold">Head Office</h4>
              <p>{'{igebra.ai}'}<br />#204, Sai Datta Residency<br />Arunodaya Nagar Colony<br />Madhapur<br />Hyderabad – 500081<br />Telangana, India</p>
              <p>Phone: +91 8121040955</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center">
        <p>&copy; 2024 The GenAI Show. All rights reserved.</p>
      </footer>
    </div>
  );
}

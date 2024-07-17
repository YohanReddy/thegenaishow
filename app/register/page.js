"use client";
import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    fullName: 'Yohan 1',
    email: 'yohan@1',
    age: '25',
    workshop: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    console.log('Form Data Submitted:', formData);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Registration successful!');
        setTimeout(() => {
          window.location.href = `/${user.username}`;
        }, 3000); // Redirect after 3 seconds
      } else {
        const data = await response.json();
        setMessage(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <Head>
        <title>Register for Workshops</title>
      </Head>

      <header className="bg-white text-black w-full">
        <div className="container mx-auto flex justify-between items-center px-6 max-w-6xl">
          <Image 
            src="https://thegenai.show/wp-content/uploads/2024/06/Screenshot-2024-06-03-at-8.47.49-PM.png" 
            alt="The Gen AI Show" 
            width={64} 
            height={64} 
          />
          <nav className="space-x-4">
            <a href="#about" className="hover:underline">About</a>
            <a href="#categories" className="hover:underline">Categories</a>
            <a href="#timeline" className="hover:underline">Timeline</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <Link href="/" className="bg-rose-500 text-white px-4 py-2 rounded-lg">Home</Link>
            <Link href={user.username} className="bg-rose-500 text-white px-4 py-2 rounded-lg">Portfolio</Link>
          </nav>
        </div>
      </header>

      <div className="w-full max-w-md text-gray-700 flex flex-col py-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Register for Workshops</h1>

        {message && (
          <div className={`mb-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workshop">
              Workshop
            </label>
            <select
              id="workshop"
              name="workshop"
              value={formData.workshop}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Workshop</option>
              <option value="GenAI Talks">GenAI Talks</option>
              <option value="Creative GenAI Show">Creative GenAI Show</option>
              <option value="Product GenAI Show">Product GenAI Show</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

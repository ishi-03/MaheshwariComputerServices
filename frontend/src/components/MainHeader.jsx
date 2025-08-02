import React, { useState } from 'react';
import { Phone, Mail, MapPin, Search } from 'lucide-react';
import Navigation from '../pages/auth/Navigation';
import { Link } from 'react-router-dom';

// Custom Logo Component for Maheshwari Computer Services
const MCSLogo = () => (
    <div className="flex items-center space-x-3">
        <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <div className="text-white font-bold text-xl">MCS</div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-red-500">
                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
                </svg>
            </div>
        </div>
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Maheshwari
            </h1>
            <p className="text-sm text-gray-600 font-medium -mt-1">Computer Services</p>
        </div>
    </div>
);

const MainHeader = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            console.log(`Searching for: ${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <header className="bg-white shadow-sm">
            {/* Top Info Bar */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2 text-sm">
                        <div className="flex items-center space-x-6 text-gray-600">
                            <a href="tel:9414173244" className="flex items-center hover:text-red-600 transition-colors duration-200">
                                <Phone className="w-4 h-4 mr-2 text-red-500" />
                                <span className="font-medium underline">Call: 9414173244</span>
                            </a>
                            <a href="mailto:maheshwaricmp@gmail.com" className="flex items-center hover:text-red-600 transition-colors duration-200">
                                <Mail className="w-4 h-4 mr-2 text-red-500" />
                                <span className="underline">maheshwaricmp@gmail.com</span>
                            </a>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600">
                            <a
                                href="https://www.google.com/maps?q=Rajsamand,+Rajasthan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center hover:text-red-600 transition-colors duration-200"
                            >
                                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                <span className="underline">Rajsamand, Rajasthan</span>
                            </a>
                            <div className="text-red-600 font-medium">Free Delivery Available!</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        {/* Logo Section */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="block">
                                <MCSLogo />
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for computers, laptops, accessories..."
                                    className="w-full px-4 py-3 pl-4 pr-12 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-red-400 focus:bg-white transition-all duration-200 shadow-sm"
                                    onKeyPress={(e) => e.key === 'Enter' && submitHandler(e)}
                                />
                                <button
                                    onClick={submitHandler}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200 shadow-md"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3 flex-shrink-0">
                            <Link to="/about">

                                <button className="group px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 font-medium border-2 border-red-200 hover:border-red-300">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        About Us
                                    </span>
                                </button>
                            </Link>

                            <Link to="/contact">
                                <button className="group px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                                    <span className="flex items-center">

                                        Contact Us
                                    </span>
                                </button>

                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* Services Banner */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-t border-red-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-3 space-x-8 text-sm">
                        <div className="flex items-center text-red-700">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Quality you can Trust</span>
                        </div>
                        <div className="flex items-center text-red-700">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="font-medium">Fast Delivery</span>
                        </div>
                        <div className="flex items-center text-red-700">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            <span className="font-medium">After Sales Service</span>
                        </div>
                        <div className="flex items-center text-red-700">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Best Price Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation bar below header */}
            <Navigation />
        </header>
    );
};

export default MainHeader;

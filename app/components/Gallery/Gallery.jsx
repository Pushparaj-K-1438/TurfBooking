"use client"
import GalleryCard from './GalleryCard';
import { useState } from 'react';

// Import images
import turfFootball from '../../../public/turf-football.jpg';
import pitchCricket from '../../../public/pitch-cricket.jpg';

const Gallery = () => {
  // Sample data - this would come from your admin panel API
  const galleryItems = [
    {
      id: '1',
      title: 'Premium Football Turf',
      image: turfFootball,
      location: 'Sector 18, Noida',
      price: '1200',
    },
    {
      id: '2',
      title: 'Indoor Basketball Court',
      image: pitchCricket,
      location: 'Connaught Place, Delhi',
      price: '800',
    },
    {
      id: '3',
      title: 'Cricket Practice Ground',
      image: pitchCricket,
      location: 'Dwarka, Delhi',
      price: '1500',
    },
    {
      id: '4',
      title: 'Badminton Hall',
      image: turfFootball,
      location: 'Gurgaon, Haryana',
      price: '600',
    },
    {
      id: '5',
      title: 'Tennis Court Complex',
      image: turfFootball,
      location: 'Vasant Kunj, Delhi',
      price: '1000',
    },
    {
      id: '6',
      title: 'Multi-Sport Arena',
      image: pitchCricket,
      location: 'Saket, Delhi',
      price: '2000',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-4xl font-medium">Gallery</h1>
            <p className="text-xl md:text-lg max-w-2xl mx-auto text-gray-400">
              Book premium sports venues for your games and training
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} {...item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

/*
import Image from "next/image";

export default function Service() {
  return (
    <h1 className="font-blod text-blue-300"><center>Service page</center></h1>
  );
}
*/
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Card() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cards = [
    {
      image: '/images/Card/ADD.jpeg',
      title: 'A Dance with Dragon',
      text: 'This is the first card description.',
      category: 'หนังสือ',
      price: 360,
    },
    {
      image: '/images/Card/hp.png',
      title: 'Headphone',
      text: 'This is the second card description.',
      category: 'อุปกรณ์',
      price: 4290,
    },
    {
      image: '/images/Card/IT.jpg',
      title: 'IT',
      text: 'This is the third card description.',
      category: 'หนังสือ',
      price: 360,
    },
    {
      image: '/images/Card/B.png',
      title: 'Runfalcon 5',
      text: 'This is the first card description.',
      category: 'สิ่งของ',
      price: 1320,
    },
    {
      image: '/images/Card/ka.jpeg',
      title: 'กระทะ',
      text: 'This is the first card description.',
      category: 'สิ่งของ',
      price: 250,
    },
    {
      image: '/images/Card/cpu.jpg',
      title: 'CPU',
      text: 'This is the second card description.',
      category: 'Cpu',
      price: 7500,
    },
    {
      image: '/images/Card/ch.jpeg',
      title: 'Chair',
      text: 'This is the third card description.',
      category: 'สิ่งของ',
      price: 1200,
    },
    {
      image: '/images/Card/key.jpeg',
      title: 'Keyboard',
      text: 'This is the second card description.',
      category: 'อุปกรณ์',
      price: 890,
    },
    {
      image: '/images/Card/com.jpeg',
      title: 'Monitor',
      text: 'This is the second card description.',
      category: 'อุปกรณ์',
      price: 5600,
    },
    {
      image: '/images/Card/mou.jpg',
      title: 'Mouse',
      text: 'This is the first card description.',
      category: 'อุปกรณ์',
      price: 450,
    },
    {
      image: '/images/Card/Mu.jpeg',
      title: 'Muhaha',
      text: 'This is the first card description.',
      category: 'Meme',
      price: 99,
    },
  ];

  const categories = ['All', ...Array.from(new Set(cards.map(card => card.category)))];

  const filteredCards = cards.filter(card => {
    const matchesCategory = activeTab === 'All' || card.category === activeTab;
    const matchesSearch = (card.title + card.text).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-black text-white min-vh-100 w-100 py-4 px-3">
      {/* หมวดหมู่ Dropdown */}
      <div className="mb-4 position-relative d-inline-block">
        <button
          className="btn btn-outline-light dropdown-toggle"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          หมวดหมู่: {activeTab}
        </button>
        {dropdownOpen && (
          <ul
            className="dropdown-menu show mt-2"
            style={{ position: 'absolute', zIndex: 1000 }}
          >
            {categories.map((category) => (
              <li key={category}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTab(category);
                    setDropdownOpen(false);
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ช่องค้นหา */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Card Grid */}
      <div className="row">
        {filteredCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="card bg-secondary text-white rounded-4 shadow h-100">
              <img
                src={card.image}
                className="card-img-top rounded-top-4"
                alt={card.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                {/* ✅ แสดงราคา */}
                <p className="fw-bold text-white">฿ {card.price.toLocaleString()}</p>
                <a href="#" className="btn btn-primary rounded-pill px-4">Go</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


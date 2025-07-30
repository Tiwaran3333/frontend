'use client';

import Image from "next/image";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen py-5 px-3">
      <div className="container">
        <motion.h1
          className="text-center text-3xl font-bold text-blue-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>

        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <Image
              src="/images/Card/Nothing.png"
              alt="About our shop"
              width={600}
              height={400}
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6">
            <h2 className="text-xl font-semibold mb-3">web</h2>
            <p className="mb-3">
              web
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

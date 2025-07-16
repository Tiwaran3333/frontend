/**
export default function Card() {
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="font-bold text-blue-300 text-center mb-4">Muhaha</h1>

                <div className="col-12 col-md-4 mb-4">
                    <div className="card rounded-4 shadow">
                        <img src="/images/Card/Mu.jpeg" className="card-img-top rounded-top-4" alt="Mu Image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="#" className="btn btn-primary rounded-pill px-4">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-4">
                    <div className="card rounded-4 shadow">
                        <img src="/images/Card/Bones.jpeg" className="card-img-top rounded-top-4" alt="Bones Image" />
                        <div className="card-body">
                            <h5 className="card-title">To Claim Their Bones</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="#" className="btn btn-primary rounded-pill px-4">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mb-4">
                    <div className="card rounded-4 shadow">
                        <img src="/images/Card/Roland.jpg" className="card-img-top rounded-top-4" alt="Mu Image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="#" className="btn btn-primary rounded-pill px-4">Go somewhere</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
**/
'use client';

import { motion } from 'framer-motion';

export default function Card() {
  const cards = [
    {
      image: '/images/Card/Mu.jpeg',
      title: 'Card One',
      text: 'This is the first card description.',
    },
    {
      image: '/images/Card/Bones.jpeg',
      title: 'Card Two',
      text: 'This is the second card description.',
    },
    {
      image: '/images/Card/Roland.jpg',
      title: 'Card Three',
      text: 'This is the third card description.',
    },
  ];

  return (
    <div className="container">
      <div className="row">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="col-12 col-md-4 mb-4"
          >
            <div className="card rounded-4 shadow h-100">
              <img
                src={card.image}
                className="card-img-top rounded-top-4"
                alt={card.title}
              />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <a href="#" className="btn btn-primary rounded-pill px-4">
                  Go
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


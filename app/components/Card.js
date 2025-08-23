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
      image: '/images/Card/ADD.jpeg',
      title: 'A Dance with Dragon',
      text: 'This is the first card description.',
    },
    {
      image: '/images/Card/hp.png',
      title: 'Headphone',
      text: 'This is the second card description.',
    },
    {
      image: '/images/Card/IT.jpg',
      title: 'IT',
      text: 'This is the third card description.',
    },
    {
      image: '/images/Card/B.png',
      title: 'Runfalcon 5',
      text: 'This is the first card description.',
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
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" //card 4
          >
            <div className="card rounded-4 shadow h-100">
              <img
                src={card.image}
                className="card-img-top rounded-top-4"
                alt={card.title}
                style={{ height: '200px', objectFit: 'cover' }}
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


import Image from "next/image";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="container my-5">
      <h1 className="text-center text-3xl font-bold text-blue-500 mb-4">About Us</h1>

      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <Image
            src="/images/Card/L.jpg" // ใส่รูปเกี่ยวกับร้านค้า
            alt="About our shop"
            width={600}
            height={400}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-xl font-semibold mb-3">เราคือใคร?</h2>
          <p className="mb-3">
            ร้านของเราเริ่มต้นจากความตั้งใจที่จะมอบสินค้า [เช่น แฟชั่น / gadget / lifestyle ฯลฯ] คุณภาพดี
            ในราคาที่จับต้องได้ พร้อมบริการที่อบอุ่นและรวดเร็ว
          </p>
          <p className="mb-3">
            เราคัดสรรสินค้าทุกชิ้นอย่างพิถีพิถัน จัดส่งจากไทย และมีบริการหลังการขาย
            เพื่อให้คุณมั่นใจได้ว่าทุกคำสั่งซื้อจะได้รับการดูแลอย่างดีที่สุด
          </p>
          <p>ขอบคุณที่ไว้วางใจเรา</p>
        </div>
      </div>
    </div>
  );
}

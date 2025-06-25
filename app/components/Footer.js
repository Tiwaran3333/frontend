'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          {/* แถวที่ 1 - เกี่ยวกับ */}
          <div className="col-md-4 mb-3">
            <h5>เกี่ยวกับเรา</h5>
            <p>เว็บไซต์ frontend</p>
          </div>

          {/* แถวที่ 2 - เมนู */}
          <div className="col-md-4 mb-3">
            <h5>เมนู</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-light text-decoration-none">หน้าแรก</Link></li>
              <li><Link href="/about" className="text-light text-decoration-none">เกี่ยวกับ</Link></li>
              <li><Link href="/contact" className="text-light text-decoration-none">ติดต่อ</Link></li>
            </ul>
          </div>

          {/* แถวที่ 3 - ช่องทางติดต่อ */}
          <div className="col-md-4 mb-3">
            <h5>ติดต่อเรา</h5>
            <p>Email: MUhaha@email.com<br />โทร: 099-888-7654</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} My Website. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

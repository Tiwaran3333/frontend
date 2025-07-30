'use client';
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">frontend</Link>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link active">หน้าหลัก</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">เกี่ยวกับ</Link>
            </li>
            <li className="nav-item">
              <Link href="/service" className="nav-link">บริการ</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">ติดต่อ</Link>
            </li>
            <li className="nav-item">
              <Link href="/sdmin/users" className="nav-link">Admin</Link>
            </li>
          </ul>

          {/* ส่วน Login/Logout ด้านขวา */}
          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="btn btn-outline-light me-2">เข้าสู่ระบบ</Link>
                
              </>
            ) : (
              <>
                <span className="text-white me-3">สวัสดี, ผู้ใช้</span>
                <button onClick={handleLogout} className="btn btn-danger">ออกจากระบบ</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

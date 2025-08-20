/*
'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // ถ้ามี token = true, ไม่มี = false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token จริง
    setIsLoggedIn(false);
    router.push('/signin'); // พากลับหน้า SignIn
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">Shop</Link>

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
              <Link href="/signin" className="nav-link">admin</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link href="/sdmin/users" className="nav-link">edit user</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <Link href="/login" className="btn btn-outline-light me-2">เข้าสู่ระบบ</Link>
            ) : (
              <>
                <span className="text-white me-3">admin</span>
                <button onClick={handleLogout} className="btn btn-danger">ออกจากระบบ</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
*/
'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false); // ตรวจสอบฝั่ง client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // ตอนนี้อยู่ฝั่ง client
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // ถ้ามี token = true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token
    setIsLoggedIn(false);
    router.push('/signin'); // พากลับหน้า SignIn
  };

  // ถ้ายังไม่ใช่ client ให้ return null เพื่อไม่ให้ render
  if (!isClient) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">Shop</Link>

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
              <Link href="/signin" className="nav-link">admin</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link href="/sdmin/users" className="nav-link">edit user</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <Link href="/login" className="btn btn-outline-light me-2">เข้าสู่ระบบ</Link>
            ) : (
              <>
                <span className="text-white me-3">admin</span>
                <button onClick={handleLogout} className="btn btn-danger">ออกจากระบบ</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

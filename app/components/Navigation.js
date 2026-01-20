'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // ใช้เช็ค path ปัจจุบัน

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/signin');
  };

  if (!isClient) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* โลโก้ + Shop */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-cart-fill me-2"></i> Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                หน้าหลัก
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link ${pathname === "/about" ? "active" : ""}`}
              >
                เกี่ยวกับ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/service"
                className={`nav-link ${pathname === "/service" ? "active" : ""}`}
              >
                บริการ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
              >
                ติดต่อ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/signin"
                className={`nav-link ${pathname === "/signin" ? "active" : ""}`}
              >
                admin
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  href="/admin/users"
                  className={`nav-link ${
                    pathname === "/admin/users" ? "active" : ""
                  }`}
                >
                  edit user
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <Link href="/login" className="btn btn-outline-light me-2">
                เข้าสู่ระบบ
              </Link>
            ) : (
              <>
                <span className="text-white me-3">admin</span>
                <button onClick={handleLogout} className="btn btn-danger">
                  ออกจากระบบ
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

'use client';
import Link from "next/link";

export default function Navigation() {
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
              <Link href="/" className="nav-link active" aria-current="page">หน้าหลัก</Link>
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
            
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" href="#" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link href="#" className="dropdown-item">Action</Link></li>
                <li><Link href="#" className="dropdown-item">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="#" className="dropdown-item">Something else here</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

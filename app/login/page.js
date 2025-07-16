'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ เพิ่ม

export default function LoginPage() {
  const router = useRouter(); // ✅ ใช้งาน Router
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // 🔐 ตรวจสอบ username/password ตรงนี้ถ้ามี

    // ✅ ย้ายหน้าไป home หลัง login สำเร็จ
    router.push('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-4">เข้าสู่ระบบ</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="remember">จำฉันไว้</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <Link href="/register" className="me-2">สมัครสมาชิก</Link>
          |
          <Link href="/forgot-password" className="ms-2">ลืมรหัสผ่าน</Link>
        </div>
      </div>
    </div>
  );
}

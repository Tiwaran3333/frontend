'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // +บรรทัด

export default function RegisterPage() {
  const router = useRouter(); // +บรรทัด
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    prefix: '',
    firstname: '',
    lastname: '',
    address: '',
    gender: '',
    birthdate: '',
    acceptTerms: false,
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
    if (!formData.acceptTerms) {
      alert('กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก');
      return;
    }
    console.log('Register Data:', formData);
    // ส่งข้อมูลไปยัง backend ได้ที่นี่
    router.push('/login'); //ไปหน้า login
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
        <h3 className="mb-4 text-center">สมัครสมาชิก</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">คำนำหน้าชื่อ</label>
            <select
              className="form-select"
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              required
            >
              <option value="">-- เลือก --</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อ</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">นามสกุล</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ที่อยู่</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">เพศ</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="ชาย"
                  onChange={handleChange}
                  checked={formData.gender === 'ชาย'}
                  required
                />
                <label className="form-check-label">ชาย</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="หญิง"
                  onChange={handleChange}
                  checked={formData.gender === 'หญิง'}
                />
                <label className="form-check-label">หญิง</label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">วันเกิด</label>
            <input
              type="date"
              className="form-control"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label className="form-check-label">
              ฉันยอมรับเงื่อนไข และ ข้อตกลง
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            สมัครสมาชิค
          </button>
        </form>
      </div>
    </div>
  );
}

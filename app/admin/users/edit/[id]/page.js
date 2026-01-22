'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // ✅ แก้ตรงนี้: ให้รองรับทั้ง Localhost และ Vercel (ดึงค่าจาก .env.local)
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);

  // 1. ดึงข้อมูลเก่ามาแสดง
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
           router.push('/signin');
           return;
        }

        const res = await fetch(`${API_BASE}/api/users/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        
        // เซ็ตข้อมูลลง State
        setForm({
          firstname: data.firstname || '',
          lastname: data.lastname || '', 
          username: data.username || '',
          password: '', 
        });
        setLoading(false);

      } catch (err) {
        Swal.fire('Error', 'ไม่พบข้อมูล User', 'error');
        router.push('/users'); 
      }
    };

    fetchUser();
  }, [id, router, API_BASE]); // ✅ เพิ่ม API_BASE ใน dependency เพื่อความชัวร์

  // ฟังก์ชันพิมพ์เปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. กดบันทึก
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // เตรียมข้อมูลส่ง
    const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        // ส่ง fullname เป็น null ไปด้วยเพื่อให้ Backend ไม่ error (ถ้า Backend รอรับค่านี้)
        fullname: null 
    };

    if (form.password) {
        payload.password = form.password;
    }

    try {
      const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await Swal.fire('สำเร็จ', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success');
        router.push('/users');
      } else {
        // อ่าน Error message จาก Backend
        const errorData = await res.json();
        Swal.fire('ล้มเหลว', errorData.message || 'ไม่สามารถบันทึกข้อมูลได้', 'error');
      }

    } catch (err) {
      Swal.fire('Error', 'เชื่อมต่อ Server ไม่ได้', 'error');
    }
  };

  if (loading) return <div className="p-5 text-center text-white">⏳ กำลังโหลดข้อมูล...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg bg-dark text-white border-secondary">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">✏️ แก้ไขข้อมูลผู้ใช้งาน</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">ชื่อจริง (Firstname)</label>
                  <input
                    className="form-control"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">นามสกุล (Lastname)</label>
                  <input
                    className="form-control"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">ชื่อผู้ใช้ (Username)</label>
                  <input
                    className="form-control"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <hr className="border-secondary my-4" />

                <div className="mb-4">
                  <label className="form-label text-warning">
                    🔑 รหัสผ่านใหม่ (กรอกเฉพาะถ้าต้องการเปลี่ยน)
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="ปล่อยว่างไว้ถ้าใช้รหัสเดิม"
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button 
                        type="button" 
                        className="btn btn-secondary me-2"
                        onClick={() => router.back()}
                    >
                        ยกเลิก
                    </button>
                    <button type="submit" className="btn btn-success px-4">
                        💾 บันทึกการเปลี่ยนแปลง
                    </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
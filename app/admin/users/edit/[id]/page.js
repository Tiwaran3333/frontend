'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage() {
  const { id } = useParams(); // ดึง ID จาก URL
  const router = useRouter();
  
  // ✅ ใช้ URL ให้ตรงกับหน้า List
  const API_BASE = 'http://localhost:3000';

  const [form, setForm] = useState({
    firstname: '',
    lastname: '', // เพิ่ม lastname ให้ครบ
    username: '',
    password: '', // password แยกไว้ (เผื่อไม่อยากแก้)
  });

  // 1. โหลดข้อมูลเก่ามาโชว์
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
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // ✅ ต้องแนบ Token
            }
        });

        if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');

        const data = await res.json();
        
        // เซ็ตข้อมูลลงฟอร์ม (เช็คว่า Database ส่ง field ไหนมาบ้าง)
        setForm({
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          username: data.username || '',
          password: '', // รหัสผ่านไม่ต้องดึงมาโชว์ (Security)
        });

      } catch (err) {
        Swal.fire('Error', 'ไม่พบข้อมูล User นี้', 'error');
        router.push('/users'); // ถ้าหาไม่เจอ ให้ดีดกลับหน้า List
      }
    };

    fetchUser();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. บันทึกการแก้ไข
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    // เตรียมข้อมูลส่งไป Backend
    const payload = {
      firstname: form.firstname,
      lastname: form.lastname,
      username: form.username,
    };

    // ถ้ามีการกรอกรหัสผ่านใหม่ ให้ส่งไปด้วย (ถ้าช่องว่าง ไม่ต้องส่ง)
    if (form.password) {
      payload.password = form.password;
    }

    try {
      const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: 'PUT', // ✅ ใช้ Method PUT สำหรับการแก้ไข
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // ✅ ต้องแนบ Token
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await Swal.fire('สำเร็จ', 'อัปเดตข้อมูลเรียบร้อย', 'success');
        router.push('/users'); // ✅ บันทึกเสร็จ กลับไปหน้า List (ถ้าหน้า List อยู่ที่ /users)
      } else {
        const errData = await res.json();
        Swal.fire('Error', errData.message || 'อัปเดตไม่สำเร็จ', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'เชื่อมต่อ Server ไม่ได้', 'error');
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 bg-dark text-white">
        <h2 className="mb-4">✏️ แก้ไขข้อมูลผู้ใช้ (Edit User)</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Firstname</label>
            <input
              className="form-control"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lastname</label>
            <input
              className="form-control"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-warning">New Password (ปล่อยว่างถ้าไม่เปลี่ยน)</label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="กรอกเฉพาะเมื่อต้องการเปลี่ยนรหัสผ่าน"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success flex-grow-1">
              💾 บันทึกการแก้ไข
            </button>
            <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => router.back()}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
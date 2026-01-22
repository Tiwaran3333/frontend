'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_BASE = 'http://localhost:3000';

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      await Swal.fire('แจ้งเตือน', 'กรุณา Login ก่อน', 'warning');
      router.push('/signin');
      return;
    }

    try {
      console.log(`🚀 กำลังยิงไปที่: ${API_BASE}/api/users`);

      // ✅ เพิ่มระบบ Timeout: ถ้าเกิน 5 วินาที ให้ตัดจบเลย
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 วินาที

      const res = await fetch(`${API_BASE}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal, // ผูกกับตัวจับเวลา
      });

      clearTimeout(timeoutId); // ยกเลิกตัวจับเวลาถ้าโหลดเสร็จทัน

      if (!res.ok) {
        throw new Error(`Server ตอบกลับมาว่า Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ ข้อมูลมาแล้ว:", data);
      setItems(data);
      setLoading(false);

    } catch (err) {
      console.error("❌ Error:", err);
      setLoading(false);

      if (err.name === 'AbortError') {
        Swal.fire('หมดเวลา', 'Backend ไม่ตอบสนอง (เช็ค Database หรือ CORS)', 'error');
      } else if (err.message.includes('Failed to fetch')) {
        Swal.fire('เชื่อมต่อไม่ได้', 'ไม่เจอ Server (เปิด node index.js หรือยัง?)', 'error');
      } else {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ส่วนลบ User (Code เดิม)
  const handleDelete = async (id) => {
     /* ... ใช้โค้ดเดิมได้เลย ... */
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Users List</h2>
        <button className="btn btn-primary" onClick={fetchUsers}>🔄 Refresh</button>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-5 text-warning">
                  <h3>⏳ กำลังโหลด... (รอสักครู่)</h3>
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-5 text-muted">
                  ❌ ไม่พบข้อมูล (หรือ Backend มีปัญหา)
                </td>
              </tr>
            ) : (
              items.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.username}</td>
                  <td>
                     {/* เช็คเรื่อง /admin ตรงนี้อีกทีนะครับ */}
                    <Link href={`/admin/users/edit/${user.id}`}>
                      <button className="btn btn-warning btn-sm me-2">Edit</button>
                    </Link>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
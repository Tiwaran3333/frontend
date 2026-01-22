'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  // โหลด users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }

      const res = await fetch(`${API_BASE}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setItems(data);
    } catch (err) {
      Swal.fire('Error', 'โหลดข้อมูลไม่ได้', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ลบ user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'ข้อมูลผู้ใช้จะถูกลบถาวร',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Swal.fire('สำเร็จ', 'ลบผู้ใช้แล้ว', 'success');
        fetchUsers(); // โหลดข้อมูลใหม่
      } else {
        Swal.fire('ผิดพลาด', 'ไม่สามารถลบผู้ใช้ได้', 'error');
      }
    } catch (err) {
      Swal.fire('ผิดพลาด', 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้', 'error');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Users List</h2>

      <table className="table table-bordered text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Fullname</th>
            <th>Lastname</th>
            <th>Username</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="6">ไม่มีข้อมูล</td>
            </tr>
          )}

          {items.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.fullname}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>
                <Link href={`/admin/users/edit/${user.id}`}>
                  <button className="btn btn-warning btn-sm me-2">
                    Edit
                  </button>
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
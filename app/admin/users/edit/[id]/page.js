/*
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [form, setForm] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          firstname: data.firstname || '',
          fullname: data.fullname || '',
          lastname: data.lastname || '',
          username: data.username || '',
          password: '',
        });
      })
      .catch(() => Swal.fire('Error', 'โหลดข้อมูลไม่ได้', 'error'));
  }, [id, API_BASE]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      firstname: form.firstname,
      fullname: form.fullname,
      lastname: form.lastname,
      username: form.username,
    };

    if (form.password) {
      payload.password = form.password;
    }

    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      Swal.fire('Success', 'อัปเดตข้อมูลแล้ว', 'success');
      router.push('/admin/users');
    } else {
      Swal.fire('Error', 'อัปเดตไม่สำเร็จ', 'error');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          placeholder="Firstname"
        />

        <input
          className="form-control mb-2"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Fullname"
        />

        <input
          className="form-control mb-2"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          placeholder="Lastname"
        />

        <input
          className="form-control mb-2"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          className="form-control mb-3"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New password (optional)"
        />

        <button className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}
*/
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function UsersPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  // ✅ 1. ชี้ไปที่ Backend Localhost:3000
  const API_BASE = 'http://localhost:3000';

  // ฟังก์ชันโหลดข้อมูล Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }

      const res = await fetch(`${API_BASE}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ต้องมี Token
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
           localStorage.removeItem('token');
           router.push('/signin');
           return;
        }
        throw new Error('Load failed');
      }

      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'โหลดข้อมูลไม่สำเร็จ', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ฟังก์ชันลบ User
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'ข้อมูลจะถูกลบถาวร',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบเลย',
      cancelButtonText: 'ยกเลิก',
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Swal.fire('Deleted!', 'ลบเรียบร้อยแล้ว', 'success');
        fetchUsers(); // โหลดข้อมูลใหม่
      } else {
        Swal.fire('Error', 'ลบไม่สำเร็จ', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'เกิดข้อผิดพลาดที่ Server', 'error');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-white">Users Management</h2>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Username</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  ไม่พบข้อมูลผู้ใช้
                </td>
              </tr>
            ) : (
              items.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>
                    {/* ✅ จุดที่แก้ (สำคัญมาก): 
                       เอา /admin ออก เพื่อให้ตรงกับโครงสร้างโฟลเดอร์ 
                       ลิ้งค์จะเป็น: /users/edit/1 
                    */}
                    <Link href={`/users/edit/${user.id}`}>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
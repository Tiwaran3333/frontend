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

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  // ✅ FIX: fallback API (local + production)
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    'https://backend-nextjs-virid.vercel.app';

  const [form, setForm] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
  });

  // ✅ โหลดข้อมูล user
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem('token');

    fetch(`${API_BASE}/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then(data => {
        setForm({
          firstname: data.firstname || '',
          fullname: data.fullname || '',
          lastname: data.lastname || '',
          username: data.username || '',
          password: '',
        });
      })
      .catch(() =>
        Swal.fire('Error', 'โหลดข้อมูลไม่ได้', 'error')
      );
  }, [id, API_BASE]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ อัปเดตข้อมูล
  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const payload = {
      firstname: form.firstname,
      fullname: form.fullname,
      lastname: form.lastname,
      username: form.username,
    };

    if (form.password) {
      payload.password = form.password;
    }

    try {
      const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Update failed');

      Swal.fire('Success', 'อัปเดตข้อมูลแล้ว', 'success');
      router.push('/admin/users');
    } catch (err) {
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

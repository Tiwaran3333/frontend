'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function Register() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    status: 'user', // ⭐ บังคับเป็น user
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        'http://localhost:3000/api/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const result = await res.json()

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ',
          text: 'สามารถเข้าสู่ระบบได้แล้ว',
        }).then(() => router.push('/signin'))
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.error || result.message || 'ไม่สามารถสมัครสมาชิกได้',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้',
      })
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 500 }}>
        <h3 className="mb-4 text-center">สมัครสมาชิก</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Firstname</label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fullname</label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lastname</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ⭐ ซ่อน status แต่ส่งค่าไป backend */}
          <input type="hidden" name="status" value="user" />

          <button type="submit" className="btn btn-primary w-100">
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  )
}
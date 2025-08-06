'use client'

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    prefix: '',
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    sex: '',
    birthday: '',
    address: '',
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`)
        const data = await res.json()

        const user = Array.isArray(data) ? data[0] : data
        if (user) {
          setFormData({
            prefix: user.prefix || '',
            firstname: user.firstname || '',
            fullname: user.fullname || '',
            lastname: user.lastname || '',
            username: user.username || '',
            password: user.password || '',
            sex: user.sex || '',
            birthday: user.birthday || '',
            address: user.address || '',
          })
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    if (id) getUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users`, {
        method: 'PUT', // หรือ PATCH ถ้า backend รองรับ
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...formData }),
      })

      const result = await res.json()
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => router.push('/admin/users'))
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message || 'ไม่สามารถบันทึกได้',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
      })
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
        <h3 className="mb-4 text-center">แก้ไขข้อมูลสมาชิก</h3>
        <form onSubmit={handleUpdateSubmit} className="space-y-3">

          
          {/* ชื่อ */}
          <div className="mb-3">
            <label className="form-label">ชื่อ</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="ชื่อ"
            />
          </div>

          {/* ชื่อเต็ม */}
          <div className="mb-3">
            <label className="form-label">ชื่อเต็ม</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="ชื่อเต็ม"
            />
          </div>

          {/* นามสกุล */}
          <div className="mb-3">
            <label className="form-label">นามสกุล</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="นามสกุล"
            />
          </div>

          {/* ที่อยู่ */}
          <div className="mb-3">
            <label className="form-label">ที่อยู่</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="ที่อยู่"
            />
          </div>

          {/* เพศ */}
          <div className="mb-3">
            <label className="form-label">เพศ</label>
            <input
              type="text"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="เพศ"
            />
          </div>

          {/* วันเดือนปีเกิด */}
          <div className="mb-3">
            <label className="form-label">วันเดือนปีเกิด</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* ชื่อผู้ใช้ */}
          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="ชื่อผู้ใช้"
            />
          </div>

          {/* รหัสผ่าน */}
          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="รหัสผ่าน"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </div>
  )
}

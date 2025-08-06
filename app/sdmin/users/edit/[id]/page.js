'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Swal from 'sweetalert2'

export default function EditUser() {
  const router = useRouter()
  const { id } = useParams() || {}

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
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`)
        const data = await res.json()

        setFormData({
          ...data,
          birthday: data.birthday ?? '', // ป้องกัน null
        })
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }

    if (id) fetchUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'PATCH', // ลองเปลี่ยนเป็น PATCH หรือ POST ถ้า PUT ไม่ทำงาน
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ',
          confirmButtonText: 'ตกลง',
        }).then(() => {
          router.push('/admin/users')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message || 'ไม่สามารถแก้ไขข้อมูลได้',
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
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
        <h3 className="mb-4 text-center">แก้ไขข้อมูลผู้ใช้</h3>
        <form onSubmit={handleSubmit} className="space-y-3">

          {[
            ['prefix', 'คำนำหน้า', 'นาย/นาง/นางสาว'],
            ['firstname', 'ชื่อ', 'ชื่อ'],
            ['fullname', 'ชื่อเต็ม', 'ชื่อเต็ม'],
            ['lastname', 'นามสกุล', 'นามสกุล'],
            ['address', 'ที่อยู่', 'ที่อยู่'],
            ['sex', 'เพศ', 'ชาย/หญิง'],
            ['username', 'ชื่อผู้ใช้', 'ชื่อผู้ใช้'],
            ['password', 'รหัสผ่าน', 'รหัสผ่าน']
          ].map(([key, label, placeholder]) => (
            <div className="mb-3" key={key}>
              <label className="form-label">{label}</label>
              <input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                className="form-control"
                value={formData[key]}
                onChange={handleChange}
                required
                placeholder={placeholder}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">วันเดือนปีเกิด</label>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={formData.birthday}
              onChange={handleChange}
              required
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

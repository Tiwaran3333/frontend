'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function Register() {
  const router = useRouter()

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
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'POST',
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
          title: 'สมัครสมาชิกสำเร็จ',
          text: 'คุณสามารถเข้าสู่ระบบได้แล้ว',
          confirmButtonText: 'ตกลง',
        }).then(() => {
          router.push('/login')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message || 'ไม่สามารถสมัครสมาชิกได้',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์',
      })
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
        <h3 className="mb-4 text-center">สมัครสมาชิก</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div className="mb-3">
            <label className="form-label">ชื่อ</label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              value={formData.firstname}
              onChange={handleChange}
              required
              placeholder="ชื่อ"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อเต็ม</label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              value={formData.fullname}
              onChange={handleChange}
              required
              placeholder="ชื่อเต็ม"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">นามสกุล</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              value={formData.lastname}
              onChange={handleChange}
              required
              placeholder="นามสกุล"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ที่อยู่</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="ที่อยู่"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">เพศ</label>
            <input
              type="text"
              name="sex"
              className="form-control"
              value={formData.sex}
              onChange={handleChange}
              required
              placeholder="เพศ"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">วันเดือนปีเกิด</label>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>


          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="ชื่อผู้ใช้"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="รหัสผ่าน"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  )
}








/*
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function RegisterPage() {
  const router = useRouter()
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
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อตกลงยังไม่ถูกยอมรับ',
        text: 'กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก',
      })
      return
    }

    try {
      // ส่งข้อมูลไป backend (ถ้าต้องการ)
      // const res = await fetch('http://your-backend/api/register', {...})

      console.log('Register Data:', formData)

      Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ',
        text: 'คุณสามารถเข้าสู่ระบบได้แล้ว',
        confirmButtonText: 'ตกลง',
      }).then(() => {
        router.push('/login') // ไปหน้า login หลังผู้ใช้กดตกลง
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่',
      })
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600 }}>
        <h3 className="mb-4 text-center">สมัครสมาชิก</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
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
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  )
}
*/
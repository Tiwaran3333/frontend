'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { motion } from 'framer-motion';
import bcrypt from 'bcryptjs';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const prefixOptions = [
    { value: 'นาย', label: 'นาย' },
    { value: 'นาง', label: 'นาง' },
    { value: 'นางสาว', label: 'นางสาว' },
  ];

  const [userData, setUserData] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    dob: '',
    address: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchUser() {
      try {
        const res = await fetch(`https://bend-blue.vercel.app/api/users/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        const user = Array.isArray(data) ? data[0] : data;

        setUserData({
          firstname: user.firstname || '',
          fullname: user.fullname || '',
          lastname: user.lastname || '',
          dob: user.dob ? user.dob.split('T')[0] : '',
          address: user.address || '',
          username: user.username || '',
          password: '',
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้', 'error');
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!userData.firstname || !userData.fullname || !userData.lastname || !userData.address || !userData.username) {
      Swal.fire('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const payload = { id, ...userData };

    if (userData.password.trim() !== '') {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userData.password, salt);
      payload.password = hashedPassword;
    } else {
      delete payload.password;
    }

    if (!payload.dob) delete payload.dob;

    try {
      const res = await fetch('https://bend-blue.vercel.app/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'อัปเดตข้อมูลแล้ว',
          icon: 'success',
          background: '#1a1a1a',
          color: '#FFD700',
          confirmButtonColor: '#FFD700',
        });
        router.push('/admin/users');
      } else {
        Swal.fire({
          title: 'ผิดพลาด',
          text: result.message || 'ไม่สามารถอัปเดตได้',
          icon: 'error',
          background: '#1a1a1a',
          color: '#FFD700',
          confirmButtonColor: '#FFD700',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'เครือข่ายผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์',
        icon: 'error',
        background: '#1a1a1a',
        color: '#FFD700',
        confirmButtonColor: '#FFD700',
      });
    }
  };

  const motionItem = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  if (loading) return <div className="text-center mt-5 text-warning">Loading user data...</div>;

  return (
    <motion.div
      className="d-flex justify-content-center align-items-start min-vh-100 py-5"
      style={{ background: 'linear-gradient(145deg, #0b131a, #1a1f28)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleUpdateSubmit}
        className="bg-dark text-white p-5 rounded-4 shadow-lg"
        style={{ width: '100%', maxWidth: '700px' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 className="text-center text-warning fw-bold mb-4" {...motionItem(0)}>
          ✏️ แก้ไขข้อมูลผู้ใช้
        </motion.h2>

        {/* คำนำหน้า */}
        <motion.div className="mb-3" {...motionItem(0.1)}>
          <label className="form-label text-warning">คำนำหน้า</label>
          <Select
            instanceId="prefix-select"
            options={prefixOptions}
            value={prefixOptions.find(opt => opt.value === userData.firstname) || null}
            onChange={selected => setUserData(prev => ({ ...prev, firstname: selected?.value || '' }))}
            isSearchable={false}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: '#222',
                borderColor: state.isFocused ? '#FFD700' : '#555',
                boxShadow: state.isFocused ? '0 0 6px rgba(255,215,0,0.6)' : 'none',
                borderRadius: '10px',
                minHeight: '46px',
                color: '#fff',
              }),
              menu: base => ({ ...base, borderRadius: '10px', backgroundColor: '#222' }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#FFD700' : state.isSelected ? '#FFC107' : '#222',
                color: state.isFocused || state.isSelected ? '#1f1f1f' : '#fff',
                cursor: 'pointer',
                fontWeight: state.isSelected ? 600 : 400,
              }),
              singleValue: base => ({ ...base, color: '#FFD700', fontWeight: 600 }),
              placeholder: base => ({ ...base, color: '#ccc' }),
            }}
          />
        </motion.div>

        {/* ฟิลด์อื่น ๆ */}
        <div className="row g-3">
          {/* ชื่อจริง */}
          <motion.div className="col-md-6" {...motionItem(0.2)}>
            <label className="form-label text-warning">ชื่อจริง</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-1 border-secondary rounded-3 shadow-sm"
              value={userData.fullname}
              onChange={e => setUserData({ ...userData, fullname: e.target.value })}
            />
          </motion.div>

          {/* นามสกุล */}
          <motion.div className="col-md-6" {...motionItem(0.3)}>
            <label className="form-label text-warning">นามสกุล</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-1 border-secondary rounded-3 shadow-sm"
              value={userData.lastname}
              onChange={e => setUserData({ ...userData, lastname: e.target.value })}
            />
          </motion.div>

          {/* วันเกิด */}
          <motion.div className="col-md-6" {...motionItem(0.4)}>
            <label className="form-label text-warning">วันเกิด (เว้นว่างถ้าไม่เปลี่ยน)</label>
            <input
              type="date"
              className="form-control bg-dark text-white border-1 border-secondary rounded-3 shadow-sm"
              value={userData.dob}
              onChange={e => setUserData({ ...userData, dob: e.target.value })}
            />
          </motion.div>

          {/* อีเมล / ชื่อผู้ใช้ */}
          <motion.div className="col-md-6" {...motionItem(0.5)}>
            <label className="form-label text-warning">อีเมล / ชื่อผู้ใช้</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-1 border-secondary rounded-3 shadow-sm"
              value={userData.username}
              onChange={e => setUserData({ ...userData, username: e.target.value })}
              placeholder="กรอกอีเมล หรือชื่อผู้ใช้"
            />
          </motion.div>

          {/* ที่อยู่ */}
          <motion.div className="col-12" {...motionItem(0.6)}>
            <label className="form-label text-warning">ที่อยู่</label>
            <textarea
              className="form-control bg-dark text-white border-1 border-secondary rounded-3 shadow-sm"
              rows={3}
              value={userData.address}
              onChange={e => setUserData({ ...userData, address: e.target.value })}
            />
          </motion.div>

          {/* รหัสผ่าน */}
          <motion.div className="col-12" {...motionItem(0.7)}>
            <label className="form-label text-warning">รหัสผ่าน (เว้นว่างถ้าไม่เปลี่ยน)</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-1 border-secondary rounded-3 shadow-sm"
              placeholder="กรอกรหัสผ่านใหม่ถ้าต้องการเปลี่ยน"
              value={userData.password}
              onChange={e => setUserData({ ...userData, password: e.target.value })}
            />
          </motion.div>
        </div>

        {/* ปุ่ม */}
        <motion.div className="mt-4" {...motionItem(0.8)}>
          <button
            type="submit"
            className="btn w-100 fw-bold shadow-sm"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFB800)', color: '#1f1f1f' }}
          >
            อัปเดตข้อมูล
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

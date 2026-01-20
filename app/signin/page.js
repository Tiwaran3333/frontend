'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);

        Swal.fire({
          title: '<strong>Login Successful!</strong>',
          html: '<p style="color:#ffc107">Welcome back!</p>',
          background: '#222',
          color: '#ffc107',
          icon: 'success',
          iconColor: '#ffc107',
          showConfirmButton: true,
          confirmButtonText: 'Go to Home',
          confirmButtonColor: '#ffc107',
          customClass: {
            popup: 'rounded-4 shadow-lg p-4',
          },
        }).then(() => router.push('/')); // redirect ไปหน้า Home
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: data.message || 'Username หรือ Password ไม่ถูกต้อง',
          background: '#222',
          color: '#ffc107',
          confirmButtonColor: '#ffc107',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
        background: '#222',
        color: '#ffc107',
        confirmButtonColor: '#ffc107',
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#1a1a1a' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card shadow-lg rounded-4 border-0"
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#222' }}
      >
        <div
          className="card-header text-center fs-4 fw-bold"
          style={{ backgroundColor: '#333', color: '#ffc107', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
        >
          Sign In
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Username</label>
              <input
                type="text"
                className="form-control rounded-3 bg-dark text-white border-0"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Password</label>
              <input
                type="password"
                className="form-control rounded-3 bg-dark text-white border-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn w-100 fw-bold py-2"
              style={{ backgroundColor: '#ffc107', color: '#1a1a1a', borderRadius: '0.75rem' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/register" className="me-2 text-decoration-none text-warning fw-medium">Create Account</Link> | 
            <Link href="/" className="ms-2 text-decoration-none text-warning fw-medium">Forget Password</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

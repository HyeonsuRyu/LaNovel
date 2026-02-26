import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !nickname.trim() || !password.trim()) {
      setError('이메일, 닉네임, 비밀번호를 모두 입력해주세요.');
      return;
    }

    login({
      id: crypto.randomUUID(),
      email: email.trim(),
      nickname: nickname.trim(),
    });

    navigate('/');
  };

  return (
    <section className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입</h1>
      <p className="text-sm text-gray-600 mb-6">백엔드 연결 전까지 로컬 회원가입 모드로 동작합니다.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="닉네임"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-md py-2.5 font-medium hover:bg-indigo-700 transition-colors"
        >
          회원가입
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          로그인
        </Link>
      </p>
    </section>
  );
};

export default SignupPage;

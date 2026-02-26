import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* 헤더 높이(h-16 = 64px)만큼 띄워줌 */}
      <main className="pt-16 max-w-4xl mx-auto px-4 py-8">
        <Outlet /> {/* 여기가 실제 페이지 내용이 들어갈 자리 */}
      </main>
    </div>
  );
};

export default Layout;
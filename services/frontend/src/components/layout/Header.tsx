import { Link } from 'react-router-dom';
import { FaPenNib } from 'react-icons/fa'; // 아이콘 사용
import { useAuthStore } from '../../store/useAuthStore';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 h-16">
      <div className="max-w-4xl mx-auto px-4 h-full flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <span>LaNovel</span>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">AI BGM</span>
        </Link>

        {/* 메뉴 */}
        <nav className="flex items-center gap-4">
          <Link 
            to="/write" 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <FaPenNib />
            <span>소설 쓰기</span>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-gray-700">{user?.nickname}님</span>
             <button 
               onClick={logout}
               className="text-gray-600 hover:text-gray-900 text-sm font-medium"
             >
               로그아웃
             </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};


export default Header;
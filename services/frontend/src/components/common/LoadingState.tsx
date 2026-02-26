interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = '불러오는 중입니다...' }: LoadingStateProps) => {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      <p className="mt-3 text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingState;

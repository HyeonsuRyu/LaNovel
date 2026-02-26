interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message = '문제가 발생했습니다.', onRetry }: ErrorStateProps) => {
  return (
    <div className="py-16 text-center border border-red-200 rounded-xl bg-red-50">
      <h2 className="text-lg font-semibold text-red-800">오류가 발생했습니다</h2>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorState;

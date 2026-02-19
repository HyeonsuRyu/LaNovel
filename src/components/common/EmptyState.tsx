interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="py-16 text-center border border-dashed border-gray-300 rounded-xl bg-white">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export default EmptyState;

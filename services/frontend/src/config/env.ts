const resolveMockFlag = () => {
  const value = import.meta.env.VITE_USE_MOCK_DATA;
  return value === undefined ? true : value !== 'false';
};

export const USE_MOCK_DATA = resolveMockFlag();

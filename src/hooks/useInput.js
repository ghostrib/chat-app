import { useState, useMemo } from 'react';

export const useInput = () => {
  const initialState = { email: '', password: '', text: '' };
  const [state, setState] = useState(initialState);

  const callback = useMemo(() => {
    const setValue = (e) => {
      const { type, value } = e.target;
      return setState({ ...state, [type]: value });
    };
    return setValue;
  }, [state]);

  return [state, callback];
};

import { useCallback, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (e) {
      console.warn('useLocalStorage read error', e);
      return initialValue;
    }
  });

  const setValue = useCallback((val) => {
    try {
      const valueToStore = typeof val === 'function' ? val(state) : val;
      setState(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.warn('useLocalStorage set error', e);
    }
  }, [key, state]);

  return [state, setValue];
}

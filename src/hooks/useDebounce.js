import { useEffect, useState } from "react";

const useDebounce = (changedValue, delaytime) => {
  const [debounceValue, setDebounceValue] = useState(changedValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(changedValue);
    }, delaytime);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [changedValue, delaytime])

  return debounceValue;
}

export default useDebounce;
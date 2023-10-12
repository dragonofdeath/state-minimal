import { Button } from '@/components/ui/button';
import { useState } from 'react';

const SliderInReact = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
      <input
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
      <div>
        Result: <output>{value}</output>
      </div>
      <div>
        <Button
          onClick={() => {
            setValue(50);
          }}
        >
          Set value to 50
        </Button>
      </div>
    </div>
  );
};

export default SliderInReact;

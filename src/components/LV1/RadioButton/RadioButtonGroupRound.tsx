import React from 'react';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

interface RadioButtonGroupRoundProps {
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.MuiRadio-root': {
    color: theme.palette.primary.main,
  },
  '&.Mui-checked': {
    color: theme.palette.primary.dark,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24, // Adjust the size as needed
  },
}));

const RadioButtonGroupRound: React.FC<RadioButtonGroupRoundProps> = ({
  options,
  selectedValue,
  onChange,
  name,
}) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      {options.map((option) => (
        <div
          key={option.value}
          style={{ display: 'flex', alignItems: 'center', marginRight: '16px', marginBottom: '8px' }}
        >
          <StyledRadio
            checked={selectedValue === option.value}
            onChange={onChange}
            value={option.value}
            name={name}
            color="default"
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroupRound;

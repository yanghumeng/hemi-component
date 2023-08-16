import React, { useState } from 'react';
import { Input, List } from 'antd';

interface LenovoSearchProps {
  options: string[];
  showOptions?: boolean;
}

const LenovoSearch: React.FC<LenovoSearchProps> = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 过滤选项
    const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
  };

  return (
    <div>
      <Input value={inputValue} onChange={handleInputChange} />
      <List
        bordered
        dataSource={filteredOptions}
        renderItem={(item) => <List.Item onClick={() => handleOptionClick(item)}>{item}</List.Item>}
      />
    </div>
  );
};

export default LenovoSearch;

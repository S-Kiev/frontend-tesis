import { ChangeEvent, FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './Search.module.css';
import { XCircle } from 'react-bootstrap-icons';

interface SearchProps {
  onChange: (param: string) => void;
  placeholder: string;
  width?: number;
}

const Search: FC<SearchProps> = ({ onChange, placeholder, width }) => {
  const [searchValue, setSearchValue] = useState('');

  const clearSearch = () => {
    setSearchValue('');
    onChange('');
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
    onChange(target.value);
  };

  return (
    <InputGroup style={{ maxWidth: width }} className={styles.inputgroup}>
      <Form.Control
        className={styles.input}
        name="searchValue"
        onChange={handleInputChange}
        value={searchValue}
        placeholder={placeholder || ''}
      />
      {searchValue !== '' && <XCircle className={styles.inputClearButton} onClick={clearSearch} size={20} />}
    </InputGroup>
  );
};

export default Search;

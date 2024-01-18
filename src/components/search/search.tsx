import { ChangeEvent, FC, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './search.module.scss';
import { XCircle, Search as SearchIcon } from 'react-bootstrap-icons';
import { DebounceInput } from 'react-debounce-input';

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
    <div className="d-flex align-items-center gap-2">
      <SearchIcon />
      <InputGroup
        style={{ width: width, minWidth: width }}
        className={`${styles.inputGroup} d-flex ${styles.borderRadius}`}
      >
        <DebounceInput
          placeholder={placeholder || ''}
          value={searchValue}
          name="searchValue"
          className={styles.input}
          onChange={handleInputChange}
          debounceTimeout={300}
        />
        {searchValue !== '' && <XCircle className={styles.inputClearButton} onClick={clearSearch} size={20} />}
      </InputGroup>
    </div>
  );
};

export default Search;

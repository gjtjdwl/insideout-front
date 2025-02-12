import { IoClose, IoSearch } from 'react-icons/io5';
interface SearchInputProps {
  searchValue: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  onChange,
  onClear,
  onKeyDown,
}) => {
  return (
    <div className="flex items-center relative w-[200px] md:w-[300px]">
      <IoSearch className="absolute left-4 text-[#757575]" />
      <input
        id="search"
        name="search"
        type="text"
        value={searchValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요."
        className="border border-[#D9D9D9] rounded-3xl block min-w-0 grow py-1.5 pr-6 pl-10 text-sm md:text-base text-gray-900 placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-base focus:outline focus:outline-0"
      />
      {searchValue && (
        <IoClose
          onClick={onClear}
          type="button"
          className="absolute right-3 cursor-pointer"
        />
      )}
    </div>
  );
};

export default SearchInput;

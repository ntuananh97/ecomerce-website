import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

interface IRoleSearchProps {
  onSearch?: (search: string) => void;
}

const RoleSearch = ({ onSearch }: IRoleSearchProps) => {
  const [search, setSearch] = useState("");

  useDebounce(search, () => {
    onSearch?.(search);
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
      <Input
        placeholder="Search roles..."
        value={search}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
    </div>
  );
};

export default RoleSearch;

import { Checkbox } from "@/components/ui/checkbox";

interface PermissionCheckboxProps {
  permission: string;
  checked: boolean;
  onChange: (permission: string, checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({
  permission,
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={permission}
        checked={checked}
        onCheckedChange={(checked) => onChange(permission, checked === true)}
        disabled={disabled}
      />
      <label
        htmlFor={permission}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default PermissionCheckbox;

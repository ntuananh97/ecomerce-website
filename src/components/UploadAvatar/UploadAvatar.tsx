import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DEFAULT_AVATAR } from "@/constants";
import { useState } from "react";

interface UploadAvatarProps {
  fallbackName: string;
  initialAvatar?: string;
  onAvatarChange?: (base64?: string ) => void;
}

const UploadAvatar = ({ fallbackName, initialAvatar, onAvatarChange }: UploadAvatarProps) => {
  const [avatar, setAvatar] = useState<string | undefined>(initialAvatar || undefined);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        if (onAvatarChange) {
          onAvatarChange(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatar || DEFAULT_AVATAR} />
        <AvatarFallback>{fallbackName.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1.5">
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => document.getElementById("avatar")?.click()}
        >
          Upload avatar
        </Button>
      </div>
    </div>
  );
};

export default UploadAvatar;

import React from "react";
import Avatar from "@mui/material/Avatar";
import { BASE_URL } from "../../networking/apiClient";

interface AvatarProps {
  name: string;
  size?: number;
  sx?: any;
  imageUrl?: string;
}

const getInitials = (name: string): string => {
  const words = name?.split(" ");
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const InitialsAvatar: React.FC<AvatarProps> = ({ name, size = 50, sx, imageUrl }) => {
  const initials = getInitials(name);
  const backgroundColor = '#f0f0f0'; // Default background color if no image is provided

  return (
    <Avatar
      src={BASE_URL + imageUrl} 
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: imageUrl ? "transparent" : backgroundColor,
        color: "black",
        ...sx,
      }}
    >
      {!imageUrl && initials}
    </Avatar>
  );
};

export default InitialsAvatar;

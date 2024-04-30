import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "lib/string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type props = {
  fullName: string;
  handleLogout: () => void;
  handleUserDashNav: () => void;
  handleProductsNav: () => void;
};
const HeaderUserAvatar = ({
  fullName,
  handleLogout,
  handleProductsNav,
  handleUserDashNav,
}: props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleUserDashNav}>
          Users Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleProductsNav}>
          Products Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderUserAvatar;

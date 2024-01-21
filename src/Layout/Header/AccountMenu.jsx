import { Avatar, IconButton } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";
import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Person2Outlined } from "@mui/icons-material";

const AccountMenu = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <>
      <IconButton onClick={() => toggleDarkMode()}>
        {isDarkMode ? (
          <BedtimeOutlinedIcon fontSize="small" />
        ) : (
          <BedtimeOffOutlinedIcon fontSize="small" />
        )}
      </IconButton>
      <ClerkLoading>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "transparent",
            color: "inherit",
          }}
        >
          <Person2Outlined fontSize="small" />
        </Avatar>
      </ClerkLoading>
      <SignedIn>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "transparent",
            color: "inherit",
          }}
        >
          <UserButton afterSignOutUrl="/" />
        </Avatar>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <IconButton>
            <Person2Outlined fontSize="small" />
          </IconButton>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AccountMenu;

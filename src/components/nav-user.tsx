"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/firebase";

import {
  SunMoon,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useTheme } from "@/components/theme-provider";

export function NavUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();
  const [themeValue, setThemeValue] = useState<"light" | "dark" | "system">("light");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload(); // force reload data
          const updatedUser = auth.currentUser;
          setUser(updatedUser);
          console.log("Updated user:", updatedUser);
        } catch (err) {
          console.error("Error during user reload:", err);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTheme(themeValue);
  }, [themeValue, setTheme]);

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "User"} />
                <AvatarFallback className="rounded-lg">U</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.displayName ?? "Unknown"}</span>
                <span className="truncate text-xs">{user.email ?? "No email"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "User"} />
                  <AvatarFallback className="rounded-lg">U</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.displayName ?? "Unknown"}</span>
                  <span className="truncate text-xs">{user.email ?? "No email"}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SunMoon />
                Change Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  data-side="right"
                  data-align="end"
                  sideOffset={4}
                >
                  <DropdownMenuRadioGroup
                    value={themeValue}
                    onValueChange={(value) =>
                      setThemeValue(value as "light" | "dark" | "system")
                    }
                  >
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate("/sign-in");
                  })
                  .catch((error) => {
                    console.error("Error saat logout:", error);
                  });
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

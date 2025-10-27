import { Bell, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1">
          {/* Left side - can add breadcrumbs or page title here if needed */}
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right">
              <p className="text-sm">Admin User</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Avatar>
              <AvatarFallback style={{ backgroundColor: '#FFF3E6', color: '#F5954A' }}>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

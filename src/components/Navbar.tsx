import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ReminderBell } from "@/components/ReminderBell";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const studentLinks = [
  { to: "/dashboard", label: "Matches" },
  { to: "/internships", label: "Browse" },
  { to: "/saved", label: "Saved" },
  { to: "/applications", label: "Tracker" },
  { to: "/prepare", label: "Practice" },
  { to: "/profile", label: "Profile" },
] as const;

const recruiterLinks = [
  { to: "/recruiter", label: "Postings" },
  { to: "/recruiter/new", label: "Post internship" },
] as const;

export function Navbar() {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = !user ? [] : role === "recruiter" ? recruiterLinks : studentLinks;

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: cn("bg-primary-soft text-accent-foreground") }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user && role !== "recruiter" && <ReminderBell />}
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="size-4" /> Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/internships">Browse internships</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth">Get started</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          {user && role !== "recruiter" && (
            <div className="md:hidden">
              <ReminderBell />
            </div>
          )}
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-6 flex flex-col gap-1">
              {(links.length ? links : ([{ to: "/internships", label: "Browse internships" }] as const)).map(
                (l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ),
              )}
              <div className="mt-4 border-t border-border pt-4">
                {user ? (
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    <LogOut className="size-4" /> Sign out
                  </Button>
                ) : (
                  <Button className="w-full" asChild onClick={() => setOpen(false)}>
                    <Link to="/auth">Get started</Link>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

import React from "react";
import { ModeToggle } from "./ui/toggle-mode";
import { Button } from "./ui/button";
import { FaBars } from "react-icons/fa6";
import { Toggle } from "./ui/toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex items-center justify-between p-4">
          <p>Logo</p>
          <div className="hidden lg:flex lg:justify-between lg:gap-2">
            <Link
              href={"/"}
              className={`transition-colors hover:text-foreground/80 ${router.pathname === "/" ? "text-foreground" : "text-foreground/60"}`}
            >
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <FaBars />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Link href={"/"}>Home</Link>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

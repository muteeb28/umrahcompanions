import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconPackage,
  IconMessageCircle,
  IconUser,
  IconCalendar,
  IconPhone,
} from "@tabler/icons-react";

export function UmrahFloatingDock() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Packages",
      icon: (
        <IconPackage className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "AI Assistant",
      icon: (
        <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      ),
      href: "#",
    },
    {
      title: "Chat",
      icon: (
        <IconMessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "My Journey",
      icon: (
        <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Support",
      icon: (
        <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        items={links}
        desktopClassName="bg-white/10 backdrop-blur-sm border border-white/20"
        mobileClassName="bg-white/10 backdrop-blur-sm border border-white/20"
      />
    </div>
  );
}
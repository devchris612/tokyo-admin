"use client";
import React, { ComponentProps } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

const sidebarContent = {
  description: "Quản lý sản phẩm",
  navs: [
    {
      id: "nav-products",
      name: "Sản phẩm",
      link: "/",
    },
    {
      id: "nav-users",
      name: "Users",
      link: "/users",
    },
  ],
};

function Sidebar({}: Props) {
  return (
    <div className={styles.sidebar}>
      <div className="p-4">
        <Link href="/">
          <Image
            src="/logo-hor.svg"
            alt="logo"
            width={150}
            height={28}
          />
        </Link>
      </div>
      <div className="px-4 py-2 text-sm text-muted-foreground">
        {sidebarContent.description}
      </div>
      <div className="flex flex-col px-4 py-2 gap-1">
        {sidebarContent.navs.map((nav) => (
          <NavLink
            href={nav.link}
            key={nav.id}>
            {nav.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-2 font-medium rounded-lg hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-secondary text-foreground"
      )}
    />
  );
}

export default Sidebar;

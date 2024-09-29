"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

const BottomBar = () => {
  const pathname = usePathname();
  const user = useAuth();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route !== "/") ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `/profile/${user.userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
        ;
      </div>
    </section>
  );
};
export default BottomBar;

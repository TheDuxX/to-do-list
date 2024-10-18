"use client"
import { links } from "@/utils/links";
import { Calendar, CheckSquare, HomeIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterMenu = () => {
  const pathname = usePathname(); // Hook para obter a URL atual
  const link = links

  return (
    <div className="min-h-14 bg-background w-full fixed bottom-0 border-t-[1px] flex flex-row justify-around items-center py-3 font-extralight text-sm">
      {link.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`flex flex-col items-center justify-center ${
            pathname === link.href ? "text-primary" : "hover:text-primary"
          }`}
        >
          {link.icon}
          {/* <p>{link.name}</p> */}
        </Link>
      ))}
    </div>
  );
};

export default FooterMenu;

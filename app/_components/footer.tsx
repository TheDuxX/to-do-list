"use client"
import { Calendar, CheckSquare, HomeIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Início", href: "/", icon: <HomeIcon /> },
  { name: "Agenda", href: "/schedule", icon: <Calendar /> },
  { name: "Listas", href: "/lists", icon: <CheckSquare /> },
  { name: "Perfil", href: "/account", icon: <User2Icon /> },
];

const FooterMenu = () => {
  const pathname = usePathname(); // Hook para obter a URL atual

  return (
    <div className="min-h-14 bg-background w-full fixed bottom-0 border-t-[1px] flex flex-row justify-around items-center py-3 font-extralight text-sm">
      {links.map((link) => (
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

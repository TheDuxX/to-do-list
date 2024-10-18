'use client'
import { links } from "@/utils/links";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const params = useParams(); // Hook para acessar parâmetros da URL
  const link = links;

  return (
    <>
      <div className="min-h-[70px] w-full shadow-md flex gap-2 p-2 items-center justify-center">
        <Link href="/">
          <ChevronLeft className="stroke-1 absolute left-2 top-[25px]" />
        </Link>
        {link.map((link) => {
          if (link.href === pathname) {
            return (
              <p key={link.href} className="font-medium">
                {link.name}
              </p>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default Navbar;

import { MenuIcon } from "lucide-react";
import Link from "next/link";

const HeaderNav = () => {
  return (
    <div className="h-[70px] w-full border-b-[0.1rem] border-gray-800 flex items-center p-4 justify-between">
      <Link href="/">
        <h2>Home</h2>
      </Link>
      <MenuIcon />
    </div>
  );
};

export default HeaderNav;

import Navbar from "../_components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
}

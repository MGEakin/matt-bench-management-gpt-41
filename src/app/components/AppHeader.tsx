import Link from "next/link";

const navLinks = [
  { href: "/", label: "Employee List" },
  { href: "/studio-list", label: "Studio List" },
  { href: "/practice-list", label: "Practice List" },
  { href: "/region-list", label: "Region List" },
  { href: "/location-list", label: "Location List" },
];

export default function AppHeader() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
        <div className="text-xl font-bold tracking-tight">Consultant Tracker</div>
        <ul className="flex flex-wrap gap-6 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline focus:underline focus:outline-none">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

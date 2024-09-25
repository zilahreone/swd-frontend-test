import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div>Navbar {pathname}</div>
  )
}

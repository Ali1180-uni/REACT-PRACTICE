import Link from "next/link";

function Navbar() {
  return (
    <div className="navbar">
        <h1 className="text-3xl font-bold bg-blue-500 text-white p-4">Navbar</h1>
        <ul className="flex space-x-4 p-4">
            <li className="hover:text-blue-500 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              <Link href="/contacts">Contact</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar
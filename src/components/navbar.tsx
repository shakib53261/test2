import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { BarChart3, Users, FileText, Menu } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="flex items-center">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold text-gray-900">TigFin</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="#features"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Solutions
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            About
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 text-sm font-medium">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hidden md:block"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                Sign Up
              </Link>
              <button className="md:hidden text-gray-700 hover:text-orange-600">
                <Menu className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  BarChart3,
  Users,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Manage{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                Everything
              </span>{" "}
              in One Place
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              TigFin's comprehensive business management platform helps you
              track finances, manage clients, and oversee employees all from a
              single dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors text-lg font-medium"
              >
                Access Dashboard
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                Explore Features
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <BarChart3 className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-gray-800 font-medium">
                  Financial Tracking
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-gray-800 font-medium">
                  Client Management
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <FileText className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-gray-800 font-medium">HR Portal</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <ShieldCheck className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-gray-800 font-medium">
                  Role-Based Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

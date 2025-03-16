import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Users,
  Building2,
  Clock,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Business Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TigFin provides all the tools you need to manage your business
              efficiently in one integrated platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Financial Tracking",
                description:
                  "Real-time expense vs. income charts, bank balance displays, and project cost analysis with approval workflows.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Client Management",
                description:
                  "Interactive client database with search/filter capabilities, payment history tracking, and document storage.",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Employee Portal",
                description:
                  "Complete HR management with salary history, attendance tracking, and leave request system.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Role-Based Access",
                description:
                  "Custom views and permissions for each user type: Super Admin, Admin, Project Manager, and Employee.",
              },
              {
                icon: <Building2 className="w-6 h-6" />,
                title: "Document Management",
                description:
                  "Secure storage for all your business documents with easy upload, download, and sharing capabilities.",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Project Tracking",
                description:
                  "Monitor project progress, allocate resources, and track costs all in one place.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-orange-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Role-Specific Dashboards
              </h2>
              <p className="text-gray-600 mb-6">
                Each user gets a personalized dashboard based on their role in
                the organization, showing only the information and controls
                relevant to their position.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    text: "Super Admin: Complete system oversight and user management",
                  },
                  {
                    icon: <Building2 className="w-5 h-5" />,
                    text: "Admin: Organization-wide metrics and approvals",
                  },
                  {
                    icon: <Briefcase className="w-5 h-5" />,
                    text: "Project Manager: Project-specific data and team management",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: "Employee: Personal metrics and task management",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-orange-500 mr-3 mt-1">{item.icon}</div>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-center px-4">
                  Dashboard Preview Image
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-orange-100">Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-orange-100">Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$100M+</div>
              <div className="text-orange-100">Managed Monthly</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-orange-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Streamline Your Business?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust TigFin to manage their
            operations efficiently.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Access Dashboard
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

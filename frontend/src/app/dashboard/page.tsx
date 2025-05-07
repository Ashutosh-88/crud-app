import { DashboardSection } from "@/components/custom/DashboardSection";
import { LogoutButton } from "@/components/custom/LogoutButton";

export default function DashboardRoute() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSection />
    </div>
  );
}

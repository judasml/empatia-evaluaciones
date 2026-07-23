import type { CSSProperties, ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { dashboardData } from "@/lib/admin-dashboard-data";
import { getAdminViewer } from "@/lib/admin-session";

type BrandStyle = CSSProperties & {
  "--brand": string;
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const viewer = await getAdminViewer();
  if (!viewer) {
    redirect("/login");
  }

  const brandStyle: BrandStyle = {
    "--brand": dashboardData.organization.primaryColor,
  };

  return (
    <div className="admin-page" style={brandStyle}>
      <AdminHeader
        organizationName={dashboardData.organization.name}
        campaignName={dashboardData.campaign.name}
        campaignPeriod={dashboardData.campaign.period}
        viewer={viewer}
      />
      {children}
    </div>
  );
}

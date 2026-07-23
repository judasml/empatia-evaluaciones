import "server-only";

import {
  isDemoMode,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminViewer = {
  name: string;
  email: string;
  role: string;
  demo: boolean;
};

export async function getAdminViewer(): Promise<AdminViewer | null> {
  if (!isSupabaseConfigured()) {
    return isDemoMode()
      ? {
          name: "Andrea Gil",
          email: "andrea@northwind.demo",
          role: "RR. HH.",
          demo: true,
        }
      : null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: membership } = await supabase
    .from("organization_memberships")
    .select("role")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    return null;
  }

  const roleLabels: Record<string, string> = {
    owner: "Owner",
    admin: "RR. HH.",
    analyst: "Analista",
    viewer: "Consulta",
  };
  const roleLabel = roleLabels[String(membership.role)] || "RR. HH.";

  return {
    name:
      typeof user.user_metadata.full_name === "string"
        ? user.user_metadata.full_name
        : user.email?.split("@")[0] || "Usuario",
    email: user.email || "",
    role: roleLabel,
    demo: true,
  };
}

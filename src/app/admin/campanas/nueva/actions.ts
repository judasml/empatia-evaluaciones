"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createCampaign(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const evaluationType = String(formData.get("evaluationType") || "360");
  const confidentialityMode = String(
    formData.get("confidentialityMode") || "anonymous",
  );
  const department = String(formData.get("department") || "").trim();
  const endsAt = String(formData.get("endsAt") || "");

  if (!name) {
    redirect("/admin/campanas/nueva?error=nombre");
  }

  if (!isSupabaseConfigured()) {
    redirect("/admin?created=demo");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membership } = await supabase
    .from("organization_memberships")
    .select("organization_id")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (!membership) {
    redirect("/admin/campanas/nueva?error=organizacion");
  }

  const { error } = await supabase.from("campaigns").insert({
    organization_id: membership.organization_id,
    name,
    evaluation_type: evaluationType,
    confidentiality_mode: confidentialityMode,
    department: department || null,
    ends_at: endsAt ? new Date(`${endsAt}T23:59:59`).toISOString() : null,
    created_by: user.id,
  });

  if (error) {
    redirect("/admin/campanas/nueva?error=guardar");
  }

  redirect("/admin");
}

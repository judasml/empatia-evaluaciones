"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function saveBranding(formData: FormData) {
  const wordmark =
    String(formData.get("wordmark") || "").trim() || "empat.IA Evaluaciones";
  const primaryColor = String(
    formData.get("primaryColor") || "#4A5DA8",
  ).toUpperCase();
  const logoUrl = String(formData.get("logoUrl") || "").trim();

  if (!/^#[0-9A-F]{6}$/.test(primaryColor)) {
    redirect("/admin/configuracion?error=color");
  }

  if (!isSupabaseConfigured()) {
    redirect("/admin/configuracion?saved=demo");
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
    redirect("/admin/configuracion?error=organizacion");
  }

  const { error } = await supabase.from("organization_branding").upsert({
    organization_id: membership.organization_id,
    wordmark,
    primary_color: primaryColor,
    logo_url: logoUrl || null,
    updated_at: new Date().toISOString(),
  });

  redirect(
    error
      ? "/admin/configuracion?error=guardar"
      : "/admin/configuracion?saved=true",
  );
}

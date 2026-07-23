begin;

create extension if not exists pgcrypto;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  default_locale text not null default 'es-HN',
  created_at timestamptz not null default now()
);

create table public.organization_branding (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  wordmark text not null default 'empat.IA Evaluaciones',
  logo_url text,
  primary_color text not null default '#4A5DA8'
    check (primary_color ~ '^#[0-9A-Fa-f]{6}$'),
  accent_color text,
  font_family text,
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'analyst', 'viewer')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  department text,
  description text,
  is_default boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.template_competencies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  template_id uuid not null references public.templates(id) on delete cascade,
  name text not null,
  description text,
  display_order integer not null check (display_order >= 0),
  unique (template_id, display_order)
);

create table public.template_questions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  template_id uuid not null references public.templates(id) on delete cascade,
  competency_id uuid references public.template_competencies(id) on delete set null,
  text text not null,
  question_type text not null default 'scale_1_5'
    check (question_type in ('scale_1_5', 'yes_no', 'multiple_choice', 'comment')),
  source_scope text[] not null default array['boss', 'peer', 'team', 'self', 'other'],
  display_order integer not null check (display_order >= 0),
  required boolean not null default true,
  unique (template_id, display_order)
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  evaluation_type text not null check (evaluation_type in ('90', '180', '270', '360')),
  confidentiality_mode text not null default 'anonymous'
    check (confidentiality_mode in ('anonymous', 'confidential')),
  department text,
  status text not null default 'draft'
    check (status in ('draft', 'inviting', 'collecting', 'closed', 'archived')),
  template_id uuid references public.templates(id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table public.campaign_competencies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  name text not null,
  description text,
  display_order integer not null check (display_order >= 0),
  unique (campaign_id, display_order)
);

create table public.campaign_questions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  competency_id uuid references public.campaign_competencies(id) on delete set null,
  text text not null,
  question_type text not null
    check (question_type in ('scale_1_5', 'yes_no', 'multiple_choice', 'comment')),
  source_scope text[] not null default array['boss', 'peer', 'team', 'self', 'other'],
  display_order integer not null check (display_order >= 0),
  required boolean not null default true,
  unique (campaign_id, display_order)
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  full_name text not null,
  role_title text,
  department text,
  external_ref text,
  created_at timestamptz not null default now()
);

create table public.respondents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  external_ref text,
  created_at timestamptz not null default now()
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  respondent_id uuid not null references public.respondents(id) on delete cascade,
  relationship text not null check (relationship in ('boss', 'peer', 'team', 'self', 'other')),
  token_hash text not null unique check (length(token_hash) = 64),
  status text not null default 'pending'
    check (status in ('pending', 'opened', 'completed', 'expired', 'revoked')),
  channel text not null default 'manual_link'
    check (channel in ('manual_link', 'email', 'whatsapp')),
  expires_at timestamptz,
  opened_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.response_batches (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  relationship text not null check (relationship in ('boss', 'peer', 'team', 'self', 'other')),
  submitted_at timestamptz not null default now(),
  mode_at_submission text not null check (mode_at_submission in ('anonymous', 'confidential'))
);

create table public.response_answers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  response_batch_id uuid not null references public.response_batches(id) on delete cascade,
  question_id uuid not null references public.campaign_questions(id) on delete restrict,
  numeric_value numeric,
  text_value text,
  created_at timestamptz not null default now(),
  unique (response_batch_id, question_id),
  check ((numeric_value is null) <> (text_value is null))
);

create table public.response_comments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  response_batch_id uuid not null unique references public.response_batches(id) on delete cascade,
  text_value text not null check (char_length(text_value) between 1 and 600),
  created_at timestamptz not null default now()
);

create table public.confidential_response_links (
  response_batch_id uuid primary key references public.response_batches(id) on delete cascade,
  invitation_id uuid not null unique references public.invitations(id) on delete restrict,
  respondent_id uuid not null references public.respondents(id) on delete restrict,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.anonymous_submission_receipts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  invitation_id uuid not null unique references public.invitations(id) on delete restrict,
  submitted_at timestamptz not null default now()
);

create table public.scoring_bands (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  label text not null,
  min_value numeric not null,
  max_value numeric,
  color text,
  display_order integer not null check (display_order >= 0),
  check (max_value is null or max_value >= min_value)
);

create table public.ai_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  report_type text not null check (report_type in ('campaign_summary', 'subject_report')),
  model text not null,
  prompt_version text not null,
  input_context_hash text not null,
  content jsonb not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.agent_query_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete restrict,
  campaign_id uuid references public.campaigns(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  confidentiality_mode text check (confidentiality_mode in ('anonymous', 'confidential')),
  question text not null,
  answer_summary text,
  model text not null,
  context_scope jsonb not null,
  used_attributed_data boolean not null default false,
  created_at timestamptz not null default now(),
  check (confidentiality_mode <> 'anonymous' or used_attributed_data = false)
);

create index invitations_token_hash_idx on public.invitations (token_hash);
create index invitations_campaign_status_idx on public.invitations (campaign_id, status);
create index response_batches_campaign_subject_idx
  on public.response_batches (campaign_id, subject_id, relationship);
create index response_answers_batch_idx on public.response_answers (response_batch_id);
create index subjects_campaign_idx on public.subjects (campaign_id);

create or replace function private.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = (select auth.uid())
  );
$$;

create or replace function private.has_org_role(
  target_organization_id uuid,
  allowed_roles text[]
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = (select auth.uid())
      and membership.role = any(allowed_roles)
  );
$$;


create or replace function private.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(coalesce(new.email, 'Usuario'), '@', 1)),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_auth_user();

revoke all on function private.is_org_member(uuid) from public;
revoke all on function private.has_org_role(uuid, text[]) from public;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.has_org_role(uuid, text[]) to authenticated;

alter table public.profiles enable row level security;
create policy profiles_select_self
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));
create policy profiles_update_self
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

alter table public.organizations enable row level security;
create policy organizations_select
  on public.organizations for select to authenticated
  using (private.is_org_member(id));
create policy organizations_update
  on public.organizations for update to authenticated
  using (private.has_org_role(id, array['owner', 'admin']))
  with check (private.has_org_role(id, array['owner', 'admin']));

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'organization_branding',
    'organization_memberships',
    'templates',
    'template_competencies',
    'template_questions',
    'campaigns',
    'campaign_competencies',
    'campaign_questions',
    'subjects',
    'respondents',
    'invitations',
    'response_batches',
    'response_answers',
    'response_comments',
    'confidential_response_links',
    'anonymous_submission_receipts',
    'scoring_bands',
    'ai_reports',
    'agent_query_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format(
      'create policy tenant_select on public.%I for select to authenticated using (private.is_org_member(organization_id))',
      table_name
    );
    execute format(
      'create policy tenant_insert on public.%I for insert to authenticated with check (private.has_org_role(organization_id, array[''owner'', ''admin'']))',
      table_name
    );
    execute format(
      'create policy tenant_update on public.%I for update to authenticated using (private.has_org_role(organization_id, array[''owner'', ''admin''])) with check (private.has_org_role(organization_id, array[''owner'', ''admin'']))',
      table_name
    );
    execute format(
      'create policy tenant_delete on public.%I for delete to authenticated using (private.has_org_role(organization_id, array[''owner'', ''admin'']))',
      table_name
    );
  end loop;
end
$$;

revoke all on all tables in schema public from anon;
grant select, insert, update, delete on
  public.organizations,
  public.organization_branding,
  public.profiles,
  public.organization_memberships,
  public.templates,
  public.template_competencies,
  public.template_questions,
  public.campaigns,
  public.campaign_competencies,
  public.campaign_questions,
  public.subjects,
  public.respondents,
  public.invitations,
  public.scoring_bands,
  public.ai_reports,
  public.agent_query_logs
to authenticated;

revoke all on
  public.response_batches,
  public.response_answers,
  public.response_comments,
  public.confidential_response_links,
  public.anonymous_submission_receipts
from anon, authenticated;

create or replace function private.prevent_campaign_mode_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.confidentiality_mode <> old.confidentiality_mode
     and exists (
       select 1
       from public.invitations invitation
       where invitation.campaign_id = old.id
     )
  then
    raise exception 'El modo de confidencialidad no puede cambiar después de crear invitaciones.';
  end if;

  return new;
end;
$$;

create trigger campaigns_lock_confidentiality_mode
before update of confidentiality_mode on public.campaigns
for each row execute function private.prevent_campaign_mode_change();

create or replace function public.resolve_public_invitation(p_token_hash text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  invitation_record record;
  payload jsonb;
begin
  select
    invitation.id,
    invitation.status,
    invitation.expires_at,
    invitation.relationship,
    campaign.id as campaign_id,
    campaign.name as campaign_name,
    campaign.confidentiality_mode,
    campaign.ends_at,
    organization.name as organization_name,
    branding.wordmark,
    branding.logo_url,
    branding.primary_color,
    subject.id as subject_id,
    subject.full_name as subject_name,
    subject.role_title
  into invitation_record
  from public.invitations invitation
  join public.campaigns campaign on campaign.id = invitation.campaign_id
  join public.organizations organization on organization.id = invitation.organization_id
  left join public.organization_branding branding
    on branding.organization_id = invitation.organization_id
  join public.subjects subject on subject.id = invitation.subject_id
  where invitation.token_hash = p_token_hash;

  if not found then
    return jsonb_build_object('status', 'invalid');
  end if;

  if invitation_record.status = 'completed' then
    return jsonb_build_object('status', 'completed');
  end if;

  if invitation_record.status = 'revoked' then
    return jsonb_build_object('status', 'revoked');
  end if;

  if invitation_record.status = 'expired'
     or coalesce(invitation_record.expires_at, invitation_record.ends_at) < now()
  then
    update public.invitations
    set status = 'expired'
    where id = invitation_record.id;
    return jsonb_build_object('status', 'expired');
  end if;

  update public.invitations
  set
    status = case when status = 'pending' then 'opened' else status end,
    opened_at = coalesce(opened_at, now())
  where id = invitation_record.id;

  select jsonb_build_object(
    'status', 'valid',
    'invitation', jsonb_build_object(
      'id', invitation_record.id,
      'confidentialityMode', invitation_record.confidentiality_mode,
      'organization', jsonb_build_object(
        'displayName', coalesce(invitation_record.wordmark, invitation_record.organization_name),
        'logoUrl', invitation_record.logo_url,
        'brandColor', coalesce(invitation_record.primary_color, '#4A5DA8'),
        'brandOnColor', '#ffffff'
      ),
      'expiresAt', coalesce(invitation_record.expires_at, invitation_record.ends_at),
      'questionnaire', jsonb_build_object(
        'version', 1,
        'questions', coalesce((
          select jsonb_agg(
            jsonb_build_object(
              'id', question.id,
              'competency', coalesce(competency.name, 'Evaluación'),
              'prompt', question.text,
              'scale', jsonb_build_object(
                'min', 1,
                'max', 5,
                'leftLabel', 'Nunca',
                'rightLabel', 'Siempre'
              )
            )
            order by question.display_order
          )
          from public.campaign_questions question
          left join public.campaign_competencies competency
            on competency.id = question.competency_id
          where question.campaign_id = invitation_record.campaign_id
            and question.question_type = 'scale_1_5'
            and invitation_record.relationship = any(question.source_scope)
        ), '[]'::jsonb)
      ),
      'assignments', jsonb_build_array(
        jsonb_build_object(
          'id', invitation_record.subject_id,
          'subject', jsonb_build_object(
            'displayName', invitation_record.subject_name,
            'roleTitle', coalesce(invitation_record.role_title, '')
          ),
          'relationshipLabel', case invitation_record.relationship
            when 'boss' then 'Tu jefatura'
            when 'peer' then 'Tu par'
            when 'team' then 'Parte de tu equipo'
            when 'self' then 'Autoevaluación'
            else 'Otra relación'
          end,
          'status', 'pending'
        )
      )
    )
  )
  into payload;

  return payload;
end;
$$;

create or replace function public.submit_public_evaluation(
  p_token_hash text,
  p_answers jsonb,
  p_comment text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  invitation_record record;
  answer_record jsonb;
  response_batch_id uuid;
  expected_required integer;
  received_required integer;
  question_record record;
begin
  if jsonb_typeof(p_answers) <> 'array' then
    raise exception 'Las respuestas deben enviarse como una lista.';
  end if;

  select
    invitation.*,
    campaign.confidentiality_mode,
    campaign.ends_at
  into invitation_record
  from public.invitations invitation
  join public.campaigns campaign on campaign.id = invitation.campaign_id
  where invitation.token_hash = p_token_hash
  for update of invitation;

  if not found then
    return jsonb_build_object('status', 'invalid');
  end if;

  if invitation_record.status = 'completed' then
    return jsonb_build_object('status', 'completed');
  end if;

  if invitation_record.status in ('expired', 'revoked')
     or coalesce(invitation_record.expires_at, invitation_record.ends_at) < now()
  then
    return jsonb_build_object('status', 'unavailable');
  end if;

  select count(*)
  into expected_required
  from public.campaign_questions question
  where question.campaign_id = invitation_record.campaign_id
    and question.question_type = 'scale_1_5'
    and question.required
    and invitation_record.relationship = any(question.source_scope);

  select count(distinct (answer ->> 'questionId'))
  into received_required
  from jsonb_array_elements(p_answers) answer;

  if received_required <> expected_required then
    raise exception 'Debes responder todas las preguntas requeridas.';
  end if;

  insert into public.response_batches (
    organization_id,
    campaign_id,
    subject_id,
    relationship,
    mode_at_submission
  )
  values (
    invitation_record.organization_id,
    invitation_record.campaign_id,
    invitation_record.subject_id,
    invitation_record.relationship,
    invitation_record.confidentiality_mode
  )
  returning id into response_batch_id;

  for answer_record in select value from jsonb_array_elements(p_answers)
  loop
    select question.id, question.question_type
    into question_record
    from public.campaign_questions question
    where question.id = (answer_record ->> 'questionId')::uuid
      and question.campaign_id = invitation_record.campaign_id
      and invitation_record.relationship = any(question.source_scope);

    if not found or question_record.question_type <> 'scale_1_5' then
      raise exception 'La respuesta contiene una pregunta inválida.';
    end if;

    if (answer_record ->> 'value')::numeric < 1
       or (answer_record ->> 'value')::numeric > 5
    then
      raise exception 'La escala permitida es de 1 a 5.';
    end if;

    insert into public.response_answers (
      organization_id,
      response_batch_id,
      question_id,
      numeric_value
    )
    values (
      invitation_record.organization_id,
      response_batch_id,
      question_record.id,
      (answer_record ->> 'value')::numeric
    );
  end loop;

  if nullif(trim(p_comment), '') is not null then
    insert into public.response_comments (
      organization_id,
      response_batch_id,
      text_value
    )
    values (
      invitation_record.organization_id,
      response_batch_id,
      left(trim(p_comment), 600)
    );
  end if;

  if invitation_record.confidentiality_mode = 'anonymous' then
    insert into public.anonymous_submission_receipts (
      organization_id,
      campaign_id,
      invitation_id
    )
    values (
      invitation_record.organization_id,
      invitation_record.campaign_id,
      invitation_record.id
    );
  else
    insert into public.confidential_response_links (
      response_batch_id,
      invitation_id,
      respondent_id,
      organization_id,
      campaign_id
    )
    values (
      response_batch_id,
      invitation_record.id,
      invitation_record.respondent_id,
      invitation_record.organization_id,
      invitation_record.campaign_id
    );
  end if;

  update public.invitations
  set status = 'completed', completed_at = now()
  where id = invitation_record.id;

  return jsonb_build_object('status', 'completed');
end;
$$;

revoke all on function public.resolve_public_invitation(text) from public;
revoke all on function public.submit_public_evaluation(text, jsonb, text) from public;
grant execute on function public.resolve_public_invitation(text) to anon, authenticated;
grant execute on function public.submit_public_evaluation(text, jsonb, text) to anon, authenticated;

commit;

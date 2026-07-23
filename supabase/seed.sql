insert into public.organizations (id, name, slug)
values (
  '10000000-0000-4000-8000-000000000001',
  'Northwind',
  'northwind'
)
on conflict (id) do nothing;

insert into public.organization_branding (
  organization_id,
  wordmark,
  primary_color
)
values (
  '10000000-0000-4000-8000-000000000001',
  'Northwind',
  '#4A5DA8'
)
on conflict (organization_id) do nothing;

insert into public.campaigns (
  id,
  organization_id,
  name,
  evaluation_type,
  confidentiality_mode,
  status,
  starts_at,
  ends_at
)
values (
  '20000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'Evaluación de liderazgo · Julio 2026',
  '360',
  'anonymous',
  'collecting',
  now() - interval '7 days',
  now() + interval '14 days'
)
on conflict (id) do nothing;

insert into public.campaign_competencies (
  id,
  organization_id,
  campaign_id,
  name,
  display_order
)
values
  (
    '30000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    'Comunicación',
    1
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    'Colaboración',
    2
  )
on conflict (id) do nothing;

insert into public.campaign_questions (
  id,
  organization_id,
  campaign_id,
  competency_id,
  text,
  question_type,
  source_scope,
  display_order,
  required
)
values
  (
    '40000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000001',
    'Comparte la información relevante de forma clara y a tiempo.',
    'scale_1_5',
    array['boss', 'peer', 'team', 'self'],
    1,
    true
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000002',
    'Gestiona los desacuerdos de forma constructiva.',
    'scale_1_5',
    array['boss', 'peer', 'team', 'self'],
    2,
    true
  )
on conflict (id) do nothing;

insert into public.subjects (
  id,
  organization_id,
  campaign_id,
  full_name,
  role_title,
  department
)
values (
  '50000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  '20000000-0000-4000-8000-000000000001',
  'Lucía Fernández',
  'Directora de Operaciones',
  'Operaciones'
)
on conflict (id) do nothing;

insert into public.respondents (
  id,
  organization_id,
  full_name,
  email
)
values (
  '60000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'Evaluador de demostración',
  'evaluador@example.com'
)
on conflict (id) do nothing;

insert into public.invitations (
  id,
  organization_id,
  campaign_id,
  subject_id,
  respondent_id,
  relationship,
  token_hash,
  channel,
  expires_at
)
values (
  '70000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  '20000000-0000-4000-8000-000000000001',
  '50000000-0000-4000-8000-000000000001',
  '60000000-0000-4000-8000-000000000001',
  'peer',
  encode(digest('demo-supabase', 'sha256'), 'hex'),
  'manual_link',
  now() + interval '14 days'
)
on conflict (id) do nothing;

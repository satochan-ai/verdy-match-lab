-- Verdy Match Lab: initial schema (MVP) — Neon PostgreSQL
-- teams / matches / team_profiles / match_notes / predictions / ai_analyses
-- users / players / votes / comments / user_match_notes は今回のMVPでは作成しない。
--
-- Neonではブラウザが直接DBへ接続しない（DBアクセスはNext.jsサーバー側のみ、
-- DATABASE_URLは非公開）ため、Supabase(PostgREST)前提のRLS/ポリシーは設定しない。
-- MVPでは書き込みAPIそのものを実装しないため、書き込み制御はアプリ層で担保する。

create extension if not exists "pgcrypto";

create type match_status as enum ('scheduled', 'live', 'half_time', 'finished');
create type prediction_result as enum ('pending', 'hit', 'partial', 'miss');
create type ai_analysis_mode as enum ('pre_match', 'live', 'half_time', 'post_match');

-- teams: クラブ情報の最小マスタ
create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  short_name text,
  is_verdy boolean not null default false,
  created_at timestamptz not null default now()
);

-- matches: 試合本体（FACT）
create table matches (
  id uuid primary key default gen_random_uuid(),
  home_team_id uuid not null references teams(id),
  away_team_id uuid not null references teams(id),
  kickoff_at timestamptz not null,
  venue text,
  status match_status not null default 'scheduled',
  home_score int,
  away_score int,
  elapsed_minutes int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index matches_status_idx on matches (status);
create index matches_kickoff_at_idx on matches (kickoff_at);

-- team_profiles: 試合ごとのチーム分析（EDITORIAL）
create table team_profiles (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  team_id uuid not null references teams(id),
  formation text,
  characteristics jsonb,
  key_players jsonb,
  recent_trend text,
  absences jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (match_id, team_id)
);

-- match_notes: 管理者による試合単位の補足情報（EDITORIAL）
create table match_notes (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index match_notes_match_id_idx on match_notes (match_id);

-- predictions: 軍師の三策
create table predictions (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  order_no int not null check (order_no between 1 and 3),
  title text not null,
  description text not null,
  result prediction_result not null default 'pending',
  result_comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (match_id, order_no)
);

-- ai_analyses: AI軍師の分析結果（将来のAI API接続用。今回はINSERT処理は作らない）
create table ai_analyses (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  mode ai_analysis_mode not null,
  input_snapshot jsonb not null,
  response jsonb not null,
  created_at timestamptz not null default now()
);

create index ai_analyses_match_id_idx on ai_analyses (match_id);

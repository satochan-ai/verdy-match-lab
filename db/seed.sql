-- Verdy Match Lab: initial sample data (dev/staging用) — Neon PostgreSQL
-- lib/mock/matches.ts の架空データと同内容。東京ヴェルディ以外は全て架空クラブ。
-- Neon Consoleの SQL Editor、または `psql "$DATABASE_URL" -f db/migrations/0001_init_schema.sql -f db/seed.sql` 等での実行を想定。

insert into teams (name, short_name, is_verdy) values
  ('東京ヴェルディ', 'ヴェルディ', true),
  ('FC EAST TOKYO', 'EAST TOKYO', false),
  ('YOKOHAMA BLUE FC', 'YOKOHAMA BLUE', false),
  ('CHIBA UNITED', 'CHIBA UNITED', false),
  ('SAITAMA FC', 'SAITAMA', false),
  ('KANAGAWA ATHLETIC', 'KANAGAWA', false),
  ('SHONAN UNITED', 'SHONAN', false);

-- match-1: 東京ヴェルディ(home) vs FC EAST TOKYO / scheduled
with m as (
  insert into matches (home_team_id, away_team_id, kickoff_at, venue, status)
  select
    (select id from teams where name = '東京ヴェルディ'),
    (select id from teams where name = 'FC EAST TOKYO'),
    '2026-08-15T18:00:00+09:00', '味の素スタジアム', 'scheduled'
  returning id
)
insert into team_profiles (match_id, team_id, formation, characteristics, key_players, recent_trend)
select
  m.id,
  (select id from teams where name = '東京ヴェルディ'),
  '4-3-3',
  '{"attack": "サイドを起点にテンポよくボールを動かす攻撃が持ち味。", "defense": "前線からの規律あるプレスで相手のビルドアップを制限する。"}'::jsonb,
  '[{"name": "10 山内 蓮", "note": "中盤でゲームを組み立てるキーマン。"}, {"name": "9 大道寺 陸", "note": "決定力の高いストライカー。"}]'::jsonb,
  '直近5試合で3勝1分1敗、後半の得点が多い傾向。'
from m
union all
select
  m.id,
  (select id from teams where name = 'FC EAST TOKYO'),
  '4-4-2',
  '{"attack": "縦への速さを活かしたカウンターが武器。", "defense": "組織的な4バックだが、サイド裏のスペース管理に課題。"}'::jsonb,
  '[{"name": "7 北条 蒼", "note": "スピードのあるウイング。"}]'::jsonb,
  'アウェイでは守備的に試合を運ぶ傾向がある。'
from m;

with m as (
  select id from matches
  where kickoff_at = '2026-08-15T18:00:00+09:00'
)
insert into match_notes (match_id, note)
select m.id, note from m, (values
  ('相手は右サイドバック裏のスペースを狙われる場面が多い。'),
  ('前節はハイプレスに苦戦し、後半失速した。')
) as n(note);

with m as (
  select id from matches
  where kickoff_at = '2026-08-15T18:00:00+09:00'
)
insert into predictions (match_id, order_no, title, description, result)
select m.id, v.order_no, v.title, v.description, 'pending'::prediction_result
from m, (values
  (1, '相手右サイド裏を狙う', '相手の右サイドバックは背後のスペース管理に課題があり、ヴェルディの左サイドの推進力が活きる。'),
  (2, '中盤で数的優位を作る', '相手の4-4-2に対し中盤で数的優位を作り、ボール保持の時間を伸ばしたい。'),
  (3, '終盤の運動量に注意', '相手はアウェイで守備的に試合を運ぶ傾向があり、終盤の押し込みへの耐性を見極めたい。')
) as v(order_no, title, description);

-- match-2: 東京ヴェルディ(home) vs YOKOHAMA BLUE FC / live
with m as (
  insert into matches (home_team_id, away_team_id, kickoff_at, venue, status, home_score, away_score)
  select
    (select id from teams where name = '東京ヴェルディ'),
    (select id from teams where name = 'YOKOHAMA BLUE FC'),
    '2026-08-08T14:00:00+09:00', '味の素スタジアム', 'live', 1, 1
  returning id
)
insert into predictions (match_id, order_no, title, description, result)
select m.id, v.order_no, v.title, v.description, 'pending'::prediction_result
from m, (values
  (1, '相手右サイド裏を狙う', '相手の右サイドバックは背後のスペース管理に課題がある。'),
  (2, '中盤で数的優位を作る', '3バックの相手に対し中盤で数的優位を作りたい。'),
  (3, '終盤の運動量に注意', '相手は終盤に失点する試合が多く、押し込みが効きやすい。')
) as v(order_no, title, description);

-- match-3: CHIBA UNITED(home) vs 東京ヴェルディ / half_time
insert into matches (home_team_id, away_team_id, kickoff_at, venue, status, home_score, away_score)
values (
  (select id from teams where name = 'CHIBA UNITED'),
  (select id from teams where name = '東京ヴェルディ'),
  '2026-08-01T15:00:00+09:00', 'フクダ電子アリーナ', 'half_time', 0, 0
);

-- match-4: 東京ヴェルディ(home) vs SAITAMA FC / finished
with m as (
  insert into matches (home_team_id, away_team_id, kickoff_at, venue, status, home_score, away_score)
  select
    (select id from teams where name = '東京ヴェルディ'),
    (select id from teams where name = 'SAITAMA FC'),
    '2026-07-25T18:00:00+09:00', '味の素スタジアム', 'finished', 2, 1
  returning id
)
insert into predictions (match_id, order_no, title, description, result, result_comment)
select m.id, v.order_no, v.title, v.description, v.result::prediction_result, v.comment
from m, (values
  (1, '相手右サイド裏を狙う', '相手の右サイドバックは背後のスペース管理に課題がある。', 'hit', '前半20分、左サイドからの崩しで先制点につながった。'),
  (2, 'セットプレーを警戒する', '相手はセットプレーからの得点力が高く、守備の集中が必要。', 'partial', '失点はセットプレーからだったが、それ以外はほぼ抑えられた。'),
  (3, '終盤の運動量で上回る', '終盤にかけて運動量で上回り、試合を優位に進めたい。', 'hit', '後半終盤に追加点を奪い、試合を決定づけた。')
) as v(order_no, title, description, result, comment);

-- match-5: KANAGAWA ATHLETIC(home) vs 東京ヴェルディ / finished
insert into matches (home_team_id, away_team_id, kickoff_at, venue, status, home_score, away_score)
values (
  (select id from teams where name = 'KANAGAWA ATHLETIC'),
  (select id from teams where name = '東京ヴェルディ'),
  '2026-07-18T19:00:00+09:00', '三ツ沢公園球技場', 'finished', 0, 0
);

-- match-6: 東京ヴェルディ(home) vs SHONAN UNITED / finished
insert into matches (home_team_id, away_team_id, kickoff_at, venue, status, home_score, away_score)
values (
  (select id from teams where name = '東京ヴェルディ'),
  (select id from teams where name = 'SHONAN UNITED'),
  '2026-07-11T18:00:00+09:00', '味の素スタジアム', 'finished', 1, 2
);

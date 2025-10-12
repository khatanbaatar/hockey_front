-- Hockey Federation Database Queries
-- Монголын хоккейн холбооны мэдээллийн сангийн асуултууд

-- 1. Get all teams with their statistics
SELECT 
    t.id,
    t.name_mn as team_name,
    t.logo,
    t.games_played,
    t.wins,
    t.draws,
    t.losses,
    t.goals_for,
    t.goals_against,
    t.goal_difference,
    t.points,
    ROUND((t.wins * 100.0 / t.games_played), 2) as win_percentage
FROM teams t
ORDER BY t.points DESC, t.goal_difference DESC;

-- 2. Get all players with their team information
SELECT 
    p.id,
    p.full_name,
    p.position,
    p.jersey_number,
    p.age,
    p.height,
    p.weight,
    p.games_played,
    p.goals,
    p.assists,
    p.points,
    p.plus_minus,
    t.name_mn as team_name,
    t.logo as team_logo,
    p.photo_url
FROM players p
LEFT JOIN teams t ON p.team_id = t.id
ORDER BY p.points DESC, p.goals DESC;

-- 3. Get top goal scorers
SELECT 
    p.full_name,
    p.position,
    t.name_mn as team_name,
    p.goals,
    p.assists,
    p.points,
    ROUND((p.goals * 100.0 / p.games_played), 2) as goals_per_game
FROM players p
LEFT JOIN teams t ON p.team_id = t.id
WHERE p.goals > 0
ORDER BY p.goals DESC, p.points DESC
LIMIT 10;

-- 4. Get top assist leaders
SELECT 
    p.full_name,
    p.position,
    t.name_mn as team_name,
    p.assists,
    p.goals,
    p.points,
    ROUND((p.assists * 100.0 / p.games_played), 2) as assists_per_game
FROM players p
LEFT JOIN teams t ON p.team_id = t.id
WHERE p.assists > 0
ORDER BY p.assists DESC, p.points DESC
LIMIT 10;

-- 5. Get players by position
SELECT 
    p.position,
    COUNT(*) as player_count,
    AVG(p.age) as avg_age,
    AVG(p.points) as avg_points,
    SUM(p.goals) as total_goals,
    SUM(p.assists) as total_assists
FROM players p
GROUP BY p.position
ORDER BY player_count DESC;

-- 6. Get team roster with statistics
SELECT 
    t.name_mn as team_name,
    p.position,
    p.full_name,
    p.jersey_number,
    p.age,
    p.goals,
    p.assists,
    p.points,
    p.plus_minus
FROM teams t
LEFT JOIN players p ON t.id = p.team_id
WHERE t.id = 1 -- Replace with specific team ID
ORDER BY p.position, p.points DESC;

-- 7. Get recent matches with results
SELECT 
    m.id,
    m.match_date,
    ht.name_mn as home_team,
    at.name_mn as away_team,
    m.home_score,
    m.away_score,
    c.name_mn as competition,
    m.venue,
    m.referee,
    CASE 
        WHEN m.home_score > m.away_score THEN ht.name_mn
        WHEN m.away_score > m.home_score THEN at.name_mn
        ELSE 'Draw'
    END as winner
FROM matches m
LEFT JOIN teams ht ON m.home_team_id = ht.id
LEFT JOIN teams at ON m.away_team_id = at.id
LEFT JOIN competitions c ON m.competition_id = c.id
WHERE m.status = 'completed'
ORDER BY m.match_date DESC
LIMIT 10;

-- 8. Get player performance in specific match
SELECT 
    p.full_name,
    p.position,
    t.name_mn as team_name,
    ms.goals,
    ms.assists,
    ms.penalty_minutes,
    ms.plus_minus,
    ms.shots,
    ms.saves
FROM match_statistics ms
LEFT JOIN players p ON ms.player_id = p.id
LEFT JOIN teams t ON ms.team_id = t.id
WHERE ms.match_id = 1 -- Replace with specific match ID
ORDER BY ms.goals DESC, ms.assists DESC;

-- 9. Get team standings with recent form
SELECT 
    t.name_mn as team_name,
    t.games_played,
    t.wins,
    t.draws,
    t.losses,
    t.goals_for,
    t.goals_against,
    t.goal_difference,
    t.points,
    ROUND((t.points * 100.0 / (t.games_played * 3)), 2) as points_percentage
FROM teams t
ORDER BY t.points DESC, t.goal_difference DESC, t.goals_for DESC;

-- 10. Get competition schedule
SELECT 
    m.id,
    m.match_date,
    ht.name_mn as home_team,
    at.name_mn as away_team,
    c.name_mn as competition,
    m.venue,
    m.status
FROM matches m
LEFT JOIN teams ht ON m.home_team_id = ht.id
LEFT JOIN teams at ON m.away_team_id = at.id
LEFT JOIN competitions c ON m.competition_id = c.id
WHERE m.match_date >= CURDATE()
ORDER BY m.match_date ASC;

-- 11. Get player statistics summary
SELECT 
    COUNT(*) as total_players,
    AVG(age) as avg_age,
    SUM(goals) as total_goals,
    SUM(assists) as total_assists,
    SUM(points) as total_points,
    MAX(goals) as max_goals,
    MAX(assists) as max_assists,
    MAX(points) as max_points
FROM players;

-- 12. Get team vs team head-to-head
SELECT 
    ht.name_mn as home_team,
    at.name_mn as away_team,
    COUNT(*) as matches_played,
    SUM(CASE WHEN m.home_score > m.away_score THEN 1 ELSE 0 END) as home_wins,
    SUM(CASE WHEN m.away_score > m.home_score THEN 1 ELSE 0 END) as away_wins,
    SUM(CASE WHEN m.home_score = m.away_score THEN 1 ELSE 0 END) as draws,
    AVG(m.home_score) as avg_home_score,
    AVG(m.away_score) as avg_away_score
FROM matches m
LEFT JOIN teams ht ON m.home_team_id = ht.id
LEFT JOIN teams at ON m.away_team_id = at.id
WHERE m.status = 'completed'
  AND ((ht.id = 1 AND at.id = 2) OR (ht.id = 2 AND at.id = 1)) -- Replace with specific team IDs
GROUP BY ht.name_mn, at.name_mn;

-- 13. Get goalkeeper statistics
SELECT 
    p.full_name,
    t.name_mn as team_name,
    p.games_played,
    SUM(ms.saves) as total_saves,
    ROUND(AVG(ms.saves), 2) as avg_saves_per_game,
    SUM(ms.goals) as goals_against,
    ROUND(AVG(ms.goals), 2) as avg_goals_against_per_game
FROM players p
LEFT JOIN teams t ON p.team_id = t.id
LEFT JOIN match_statistics ms ON p.id = ms.player_id
WHERE p.position = 'Goalkeeper'
GROUP BY p.id, p.full_name, t.name_mn, p.games_played
ORDER BY total_saves DESC;

-- 14. Get upcoming matches for specific team
SELECT 
    m.id,
    m.match_date,
    CASE 
        WHEN m.home_team_id = 1 THEN at.name_mn
        ELSE ht.name_mn
    END as opponent,
    CASE 
        WHEN m.home_team_id = 1 THEN 'Home'
        ELSE 'Away'
    END as home_away,
    c.name_mn as competition,
    m.venue
FROM matches m
LEFT JOIN teams ht ON m.home_team_id = ht.id
LEFT JOIN teams at ON m.away_team_id = at.id
LEFT JOIN competitions c ON m.competition_id = c.id
WHERE m.status = 'scheduled'
  AND (m.home_team_id = 1 OR m.away_team_id = 1) -- Replace with specific team ID
ORDER BY m.match_date ASC;

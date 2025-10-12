-- Complete Setup Script for Competition Results
-- Тэмцээний үр дүнгийн бүрэн тохиргооны скрипт

-- 1. Create the competition_results table
CREATE TABLE IF NOT EXISTS competition_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    competition_id INT NOT NULL,
    season VARCHAR(10) NOT NULL COMMENT '2025-26',
    team_id INT NOT NULL,
    position INT NOT NULL COMMENT 'Байрлал',
    games_played INT DEFAULT 0 COMMENT 'Тоглосон тоглолт',
    wins INT DEFAULT 0 COMMENT 'Хожсон',
    draws INT DEFAULT 0 COMMENT 'Тэнцсэн',
    losses INT DEFAULT 0 COMMENT 'Хожигдсон',
    goals_for INT DEFAULT 0 COMMENT 'Оруулсан гоол',
    goals_against INT DEFAULT 0 COMMENT 'Алдсан гоол',
    goal_difference INT DEFAULT 0 COMMENT 'Гоолын зөрүү',
    points INT DEFAULT 0 COMMENT 'Оноо',
    last_5_results JSON COMMENT 'Сүүлийн 5 тоглолтын үр дүн',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    UNIQUE KEY unique_competition_team_season (competition_id, team_id, season)
);

-- 2. Create the match_results table
CREATE TABLE IF NOT EXISTS match_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    competition_id INT NOT NULL,
    season VARCHAR(10) NOT NULL,
    match_date DATE NOT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    venue VARCHAR(100),
    referee VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_competition_results_season ON competition_results(season);
CREATE INDEX IF NOT EXISTS idx_competition_results_competition ON competition_results(competition_id);
CREATE INDEX IF NOT EXISTS idx_competition_results_position ON competition_results(position);
CREATE INDEX IF NOT EXISTS idx_match_results_season ON match_results(season);
CREATE INDEX IF NOT EXISTS idx_match_results_date ON match_results(match_date);
CREATE INDEX IF NOT EXISTS idx_match_results_teams ON match_results(home_team_id, away_team_id);

-- 3.5. Update competitions table to ensure proper Mongolian names
UPDATE competitions SET 
    name_mn = 'Монголын хоккейн аварга шалгаруулах тэмцээн',
    name_en = 'Mongolian Hockey Championship'
WHERE id = 1;

UPDATE competitions SET 
    name_mn = 'Үндэсний лиг',
    name_en = 'National League'
WHERE id = 2;

-- 4. Insert competition results for 2025-26 season
INSERT IGNORE INTO competition_results (competition_id, season, team_id, position, games_played, wins, draws, losses, goals_for, goals_against, goal_difference, points, last_5_results) VALUES
-- Main Championship 2025-26
(1, '2025-26', 1, 1, 15, 10, 3, 2, 45, 28, 17, 33, JSON_ARRAY('W', 'W', 'D', 'W', 'W')),
(1, '2025-26', 2, 2, 15, 9, 4, 2, 42, 25, 17, 31, JSON_ARRAY('W', 'W', 'D', 'D', 'W')),
(1, '2025-26', 3, 3, 15, 8, 5, 2, 38, 30, 8, 29, JSON_ARRAY('W', 'D', 'W', 'D', 'D')),
(1, '2025-26', 4, 4, 15, 7, 6, 2, 35, 32, 3, 27, JSON_ARRAY('D', 'W', 'L', 'W', 'D')),
(1, '2025-26', 5, 5, 15, 6, 4, 5, 32, 35, -3, 22, JSON_ARRAY('L', 'W', 'D', 'L', 'W')),

-- National League 2025-26 (different standings)
(2, '2025-26', 2, 1, 12, 8, 2, 2, 35, 20, 15, 26, JSON_ARRAY('W', 'W', 'D', 'W', 'W')),
(2, '2025-26', 1, 2, 12, 7, 3, 2, 38, 25, 13, 24, JSON_ARRAY('W', 'D', 'W', 'D', 'W')),
(2, '2025-26', 3, 3, 12, 6, 4, 2, 30, 24, 6, 22, JSON_ARRAY('D', 'W', 'D', 'W', 'D')),
(2, '2025-26', 4, 4, 12, 5, 3, 4, 28, 30, -2, 18, JSON_ARRAY('L', 'D', 'W', 'L', 'D')),
(2, '2025-26', 5, 5, 12, 3, 2, 7, 22, 35, -13, 11, JSON_ARRAY('L', 'L', 'D', 'L', 'W'));

-- 5. Insert match results for 2025-26 season
INSERT IGNORE INTO match_results (competition_id, season, match_date, home_team_id, away_team_id, home_score, away_score, status, venue, referee) VALUES
-- Championship 2025-26 completed matches
(1, '2025-26', '2025-10-15', 1, 2, 3, 2, 'completed', 'Хангарьд Арена', 'Б.Батбаяр'),
(1, '2025-26', '2025-10-15', 3, 4, 2, 1, 'completed', 'Алтан гадас Талбай', 'Э.Мөнхбат'),
(1, '2025-26', '2025-10-15', 5, 1, 1, 4, 'completed', 'Цагаан сар Талбай', 'Т.Төмөр'),
(1, '2025-26', '2025-10-22', 2, 3, 2, 2, 'completed', 'Бүргэд Цэнгэлдэх', 'Г.Ганзориг'),
(1, '2025-26', '2025-10-22', 4, 5, 3, 1, 'completed', 'Хүрэл мөнгөн Заал', 'М.Мөнхбат'),
(1, '2025-26', '2025-10-29', 1, 3, 2, 1, 'completed', 'Хангарьд Арена', 'Б.Батбаяр'),
(1, '2025-26', '2025-10-29', 2, 4, 1, 2, 'completed', 'Бүргэд Цэнгэлдэх', 'Э.Мөнхбат'),
(1, '2025-26', '2025-11-05', 5, 2, 2, 3, 'completed', 'Цагаан сар Талбай', 'Т.Төмөр'),
(1, '2025-26', '2025-11-05', 3, 1, 1, 2, 'completed', 'Алтан гадас Талбай', 'Г.Ганзориг'),
(1, '2025-26', '2025-11-12', 4, 1, 2, 2, 'completed', 'Хүрэл мөнгөн Заал', 'М.Мөнхбат'),
(1, '2025-26', '2025-11-12', 2, 5, 3, 1, 'completed', 'Бүргэд Цэнгэлдэх', 'Б.Батбаяр'),
(1, '2025-26', '2025-11-19', 1, 4, 4, 1, 'completed', 'Хангарьд Арена', 'Э.Мөнхбат'),
(1, '2025-26', '2025-11-19', 3, 2, 2, 1, 'completed', 'Алтан гадас Талбай', 'Т.Төмөр'),
(1, '2025-26', '2025-11-26', 5, 3, 1, 3, 'completed', 'Цагаан сар Талбай', 'Г.Ганзориг'),
(1, '2025-26', '2025-11-26', 2, 1, 2, 3, 'completed', 'Бүргэд Цэнгэлдэх', 'М.Мөнхбат'),

-- Upcoming matches
(1, '2025-26', '2025-12-03', 4, 2, 0, 0, 'scheduled', 'Хүрэл мөнгөн Заал', 'Б.Батбаяр'),
(1, '2025-26', '2025-12-03', 1, 5, 0, 0, 'scheduled', 'Хангарьд Арена', 'Э.Мөнхбат'),
(1, '2025-26', '2025-12-10', 3, 4, 0, 0, 'scheduled', 'Алтан гадас Талбай', 'Т.Төмөр'),
(1, '2025-26', '2025-12-10', 2, 3, 0, 0, 'scheduled', 'Бүргэд Цэнгэлдэх', 'Г.Ганзориг'),
(1, '2025-26', '2025-12-17', 5, 4, 0, 0, 'scheduled', 'Цагаан сар Талбай', 'М.Мөнхбат'),

-- National League matches
(2, '2025-26', '2025-09-15', 2, 1, 2, 1, 'completed', 'Бүргэд Цэнгэлдэх', 'Б.Батбаяр'),
(2, '2025-26', '2025-09-15', 3, 4, 3, 0, 'completed', 'Алтан гадас Талбай', 'Э.Мөнхбат'),
(2, '2025-26', '2025-09-22', 1, 3, 1, 1, 'completed', 'Хангарьд Арена', 'Т.Төмөр'),
(2, '2025-26', '2025-09-22', 5, 2, 0, 4, 'completed', 'Цагаан сар Талбай', 'Г.Ганзориг'),
(2, '2025-26', '2025-09-29', 4, 1, 2, 3, 'completed', 'Хүрэл мөнгөн Заал', 'М.Мөнхбат'),
(2, '2025-26', '2025-09-29', 2, 3, 2, 2, 'completed', 'Бүргэд Цэнгэлдэх', 'Б.Батбаяр'),
(2, '2025-26', '2025-10-06', 3, 5, 4, 1, 'completed', 'Алтан гадас Талбай', 'Э.Мөнхбат'),
(2, '2025-26', '2025-10-06', 1, 4, 2, 2, 'completed', 'Хангарьд Арена', 'Т.Төмөр'),
(2, '2025-26', '2025-10-13', 2, 4, 3, 1, 'completed', 'Бүргэд Цэнгэлдэх', 'Г.Ганзориг'),
(2, '2025-26', '2025-10-13', 5, 1, 1, 2, 'completed', 'Цагаан сар Талбай', 'М.Мөнхбат'),
(2, '2025-26', '2025-10-20', 3, 1, 1, 2, 'completed', 'Алтан гадас Талбай', 'Б.Батбаяр'),
(2, '2025-26', '2025-10-20', 4, 3, 2, 1, 'completed', 'Хүрэл мөнгөн Заал', 'Э.Мөнхбат'),
(2, '2025-26', '2025-10-27', 1, 2, 3, 2, 'completed', 'Хангарьд Арена', 'Т.Төмөр'),
(2, '2025-26', '2025-10-27', 5, 4, 2, 3, 'completed', 'Цагаан сар Талбай', 'Г.Ганзориг'),
(2, '2025-26', '2025-11-03', 2, 5, 4, 0, 'completed', 'Бүргэд Цэнгэлдэх', 'М.Мөнхбат'),
(2, '2025-26', '2025-11-03', 4, 1, 1, 2, 'completed', 'Хүрэл мөнгөн Заал', 'Б.Батбаяр'),
(2, '2025-26', '2025-11-10', 1, 3, 2, 2, 'completed', 'Хангарьд Арена', 'Э.Мөнхбат'),
(2, '2025-26', '2025-11-10', 3, 2, 1, 3, 'completed', 'Алтан гадас Талбай', 'Т.Төмөр'),
(2, '2025-26', '2025-11-17', 4, 5, 2, 1, 'completed', 'Хүрэл мөнгөн Заал', 'Г.Ганзориг'),
(2, '2025-26', '2025-11-17', 2, 4, 3, 1, 'completed', 'Бүргэд Цэнгэлдэх', 'М.Мөнхбат'),
(2, '2025-26', '2025-11-24', 1, 5, 4, 1, 'completed', 'Хангарьд Арена', 'Б.Батбаяр'),
(2, '2025-26', '2025-11-24', 3, 1, 2, 1, 'completed', 'Алтан гадас Талбай', 'Э.Мөнхбат');

-- 6. Verify the data
SELECT 'Competition Results' as table_name, COUNT(*) as record_count FROM competition_results
UNION ALL
SELECT 'Match Results' as table_name, COUNT(*) as record_count FROM match_results;

-- 7. Show sample data
SELECT 
    cr.position,
    t.name_mn as team_name,
    cr.games_played,
    cr.wins,
    cr.draws,
    cr.losses,
    cr.goals_for,
    cr.goals_against,
    cr.goal_difference,
    cr.points,
    cr.last_5_results
FROM competition_results cr
JOIN teams t ON cr.team_id = t.id
WHERE cr.season = '2025-26' AND cr.competition_id = 1
ORDER BY cr.position;

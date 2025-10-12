-- Competition Results Database Schema
-- Тэмцээний үр дүнгийн мэдээллийн сангийн бүтэц

-- Create competition_results table for league standings
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

-- Create index for better performance
CREATE INDEX idx_competition_results_season ON competition_results(season);
CREATE INDEX idx_competition_results_competition ON competition_results(competition_id);
CREATE INDEX idx_competition_results_position ON competition_results(position);

-- Create matches table for match results
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

-- Create index for match results
CREATE INDEX idx_match_results_season ON match_results(season);
CREATE INDEX idx_match_results_date ON match_results(match_date);
CREATE INDEX idx_match_results_teams ON match_results(home_team_id, away_team_id);

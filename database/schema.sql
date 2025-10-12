-- Hockey Federation Database Schema
-- Монголын хоккейн холбооны мэдээллийн сангийн бүтэц

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    name_mn VARCHAR(100) NOT NULL COMMENT 'Монгол нэр',
    name_en VARCHAR(100) NOT NULL COMMENT 'Англи нэр',
    logo VARCHAR(10) DEFAULT '🏒',
    founded_year INT,
    city VARCHAR(50),
    stadium VARCHAR(100),
    coach_name VARCHAR(100),
    games_played INT DEFAULT 0,
    wins INT DEFAULT 0,
    draws INT DEFAULT 0,
    losses INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    goal_difference INT DEFAULT 0,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL COMMENT 'Бүтэн нэр',
    position ENUM('Forward', 'Defender', 'Goalkeeper', 'Midfielder') NOT NULL,
    team_id INT,
    jersey_number INT,
    birth_date DATE,
    age INT,
    height VARCHAR(10) COMMENT 'Өндөр',
    weight VARCHAR(10) COMMENT 'Жин',
    nationality VARCHAR(50) DEFAULT 'Mongolian',
    photo_url VARCHAR(500),
    games_played INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    points INT DEFAULT 0,
    penalty_minutes INT DEFAULT 0,
    plus_minus INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Competitions table
CREATE TABLE IF NOT EXISTS competitions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    name_mn VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    season VARCHAR(10) NOT NULL COMMENT '2025-26',
    start_date DATE,
    end_date DATE,
    status ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    competition_id INT,
    home_team_id INT,
    away_team_id INT,
    match_date DATETIME,
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
    venue VARCHAR(100),
    referee VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Match statistics table
CREATE TABLE IF NOT EXISTS match_statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    match_id INT,
    team_id INT,
    player_id INT,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    penalty_minutes INT DEFAULT 0,
    plus_minus INT DEFAULT 0,
    shots INT DEFAULT 0,
    saves INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_players_team_id ON players(team_id);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_matches_competition_id ON matches(competition_id);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_match_stats_match_id ON match_statistics(match_id);
CREATE INDEX idx_match_stats_player_id ON match_statistics(player_id);

-- Hockey Federation Database Data Insertion
-- Монголын хоккейн холбооны мэдээллийн сангийн өгөгдөл оруулах

-- Insert Teams data
INSERT INTO teams (name, name_mn, name_en, logo, founded_year, city, stadium, coach_name, games_played, wins, draws, losses, goals_for, goals_against, goal_difference, points) VALUES
('Хангарьд', 'Хангарьд', 'Hangard', '🏒', 2010, 'Улаанбаатар', 'Хангарьд Арена', 'Батбаяр Батбат', 15, 10, 3, 2, 45, 28, 17, 33),
('Бүргэд', 'Бүргэд', 'Burged', '🏒', 2012, 'Улаанбаатар', 'Бүргэд Цэнгэлдэх', 'Энхбаяр Мөнхбат', 15, 9, 4, 2, 42, 25, 17, 31),
('Алтан гадас', 'Алтан гадас', 'Altan Gadas', '🏒', 2015, 'Дархан', 'Алтан гадас Талбай', 'Төмөрбаатар Төмөр', 15, 8, 5, 2, 38, 30, 8, 29),
('Хүрэл мөнгөн', 'Хүрэл мөнгөн', 'Khürel Möngön', '🏒', 2018, 'Эрдэнэт', 'Хүрэл мөнгөн Заал', 'Ганбаатар Ганзориг', 15, 7, 6, 2, 35, 32, 3, 27),
('Цагаан сар', 'Цагаан сар', 'Tsagaan Sar', '🏒', 2020, 'Ховд', 'Цагаан сар Талбай', 'Мөнхбаатар Мөнхбат', 15, 6, 4, 5, 32, 35, -3, 22);

-- Insert Players data
INSERT INTO players (first_name, last_name, full_name, position, team_id, jersey_number, birth_date, age, height, weight, nationality, photo_url, games_played, goals, assists, points, penalty_minutes, plus_minus) VALUES
-- Хангарьд team players
('Батбаяр', 'Батбат', 'Батбаяр Батбат', 'Forward', 1, 10, '1998-05-15', 25, '175cm', '75kg', 'Mongolian', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face', 15, 8, 5, 13, 12, 8),
('Батбаатар', 'Батбат', 'Батбаатар Батбат', 'Defender', 1, 5, '1994-03-22', 29, '182cm', '88kg', 'Mongolian', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face', 14, 2, 6, 8, 18, 5),
('Батбаатар', 'Батбат', 'Батбаатар Батбат', 'Forward', 1, 7, '1999-08-10', 24, '170cm', '68kg', 'Mongolian', 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face', 12, 7, 3, 10, 8, 6),
('Батбаатар', 'Батбат', 'Батбаатар Батбат', 'Defender', 1, 3, '1996-11-18', 27, '179cm', '82kg', 'Mongolian', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face', 15, 1, 9, 10, 14, 7),

-- Бүргэд team players
('Энхбаяр', 'Мөнхбат', 'Энхбаяр Мөнхбат', 'Goalkeeper', 2, 1, '1995-07-12', 28, '180cm', '85kg', 'Mongolian', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face', 15, 0, 1, 1, 0, 0),
('Энхбаатар', 'Энхбат', 'Энхбаатар Энхбат', 'Forward', 2, 9, '2000-02-28', 23, '170cm', '68kg', 'Mongolian', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face', 12, 7, 3, 10, 10, 5),
('Энхбаатар', 'Энхбат', 'Энхбаатар Энхбат', 'Defender', 2, 4, '1997-09-05', 26, '178cm', '80kg', 'Mongolian', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face', 14, 3, 7, 10, 16, 6),
('Энхбаатар', 'Энхбат', 'Энхбаатар Энхбат', 'Goalkeeper', 2, 30, '1992-12-15', 31, '185cm', '90kg', 'Mongolian', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face', 13, 0, 0, 0, 0, 0),

-- Алтан гадас team players
('Төмөрбаатар', 'Төмөр', 'Төмөрбаатар Төмөр', 'Defender', 3, 6, '1997-04-20', 26, '178cm', '80kg', 'Mongolian', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face', 14, 3, 7, 10, 20, 4),
('Төмөрбаатар', 'Төмөр', 'Төмөрбаатар Төмөр', 'Forward', 3, 11, '1999-01-08', 25, '172cm', '70kg', 'Mongolian', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face', 13, 6, 4, 10, 6, 5),
('Төмөрбаатар', 'Төмөр', 'Төмөрбаатар Төмөр', 'Goalkeeper', 3, 22, '1993-06-30', 30, '183cm', '87kg', 'Mongolian', 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face', 13, 0, 0, 0, 0, 0),
('Төмөрбаатар', 'Төмөр', 'Төмөрбаатар Төмөр', 'Defender', 3, 8, '1998-10-14', 25, '181cm', '84kg', 'Mongolian', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face', 15, 1, 9, 10, 22, 6),

-- Хүрэл мөнгөн team players
('Ганбаатар', 'Ганзориг', 'Ганбаатар Ганзориг', 'Forward', 4, 14, '1999-03-25', 24, '172cm', '70kg', 'Mongolian', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face', 13, 6, 4, 10, 8, 4),
('Ганбаатар', 'Ганзориг', 'Ганбаатар Ганзориг', 'Defender', 4, 2, '1996-08-17', 27, '179cm', '82kg', 'Mongolian', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face', 15, 1, 9, 10, 16, 5),
('Ганбаатар', 'Ганзориг', 'Ганбаатар Ганзориг', 'Forward', 4, 17, '1995-11-03', 28, '174cm', '72kg', 'Mongolian', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face', 14, 9, 2, 11, 4, 7),
('Ганбаатар', 'Ганзориг', 'Ганбаатар Ганзориг', 'Midfielder', 4, 19, '1997-05-12', 26, '177cm', '79kg', 'Mongolian', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face', 14, 4, 8, 12, 10, 6),

-- Цагаан сар team players
('Мөнхбаатар', 'Мөнхбат', 'Мөнхбаатар Мөнхбат', 'Midfielder', 5, 13, '1996-09-07', 27, '176cm', '78kg', 'Mongolian', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face', 15, 4, 8, 12, 12, 3),
('Мөнхбаатар', 'Мөнхбат', 'Мөнхбаатар Мөнхбат', 'Forward', 5, 16, '1998-12-21', 25, '174cm', '72kg', 'Mongolian', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face', 14, 9, 2, 11, 6, 4),
('Мөнхбаатар', 'Мөнхбат', 'Мөнхбаатар Мөнхбат', 'Goalkeeper', 5, 25, '1994-04-18', 29, '184cm', '89kg', 'Mongolian', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face', 12, 0, 1, 1, 0, 0),
('Мөнхбаатар', 'Мөнхбат', 'Мөнхбаатар Мөнхбат', 'Defender', 5, 12, '1999-07-09', 24, '180cm', '83kg', 'Mongolian', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face', 13, 2, 7, 9, 18, 2),
('Мөнхбаатар', 'Мөнхбат', 'Мөнхбаатар Мөнхбат', 'Midfielder', 5, 18, '1997-01-26', 27, '175cm', '76kg', 'Mongolian', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face', 14, 3, 6, 9, 14, 1);

-- Insert Competitions data
INSERT INTO competitions (name, name_mn, name_en, season, start_date, end_date, status) VALUES
('Монголын хоккейн аварга шалгаруулах тэмцээн', 'Монголын хоккейн аварга шалгаруулах тэмцээн', 'Mongolian Hockey Championship', '2025-26', '2025-09-01', '2026-05-31', 'ongoing'),
('Үндэсний лиг', 'Үндэсний лиг', 'National League', '2025-26', '2025-10-01', '2026-04-30', 'ongoing'),
('Хаваргийн кубок', 'Хаваргийн кубок', 'Spring Cup', '2025-26', '2026-03-01', '2026-05-15', 'upcoming');

-- Insert some sample matches
INSERT INTO matches (competition_id, home_team_id, away_team_id, match_date, home_score, away_score, status, venue, referee) VALUES
(1, 1, 2, '2025-10-15 18:00:00', 3, 2, 'completed', 'Хангарьд Арена', 'Б.Батбаяр'),
(1, 3, 4, '2025-10-15 20:00:00', 2, 1, 'completed', 'Алтан гадас Талбай', 'Э.Мөнхбат'),
(1, 5, 1, '2025-10-22 18:00:00', 1, 4, 'completed', 'Цагаан сар Талбай', 'Т.Төмөр'),
(1, 2, 3, '2025-10-22 20:00:00', 2, 2, 'completed', 'Бүргэд Цэнгэлдэх', 'Г.Ганзориг'),
(1, 4, 5, '2025-10-29 18:00:00', 3, 1, 'completed', 'Хүрэл мөнгөн Заал', 'М.Мөнхбат'),
(1, 1, 3, '2025-11-05 18:00:00', 2, 1, 'completed', 'Хангарьд Арена', 'Б.Батбаяр'),
(1, 2, 4, '2025-11-05 20:00:00', 1, 2, 'completed', 'Бүргэд Цэнгэлдэх', 'Э.Мөнхбат'),
(1, 5, 2, '2025-11-12 18:00:00', 2, 3, 'completed', 'Цагаан сар Талбай', 'Т.Төмөр');

-- Insert match statistics for some players
INSERT INTO match_statistics (match_id, team_id, player_id, goals, assists, penalty_minutes, plus_minus, shots, saves) VALUES
-- Match 1: Хангарьд vs Бүргэд
(1, 1, 1, 2, 1, 2, 2, 5, 0), -- Батбаяр Батбат
(1, 1, 2, 0, 2, 4, 1, 2, 0), -- Батбаатар Батбат (Defender)
(1, 2, 5, 0, 0, 0, 0, 0, 28), -- Энхбаяр Мөнхбат (Goalkeeper)
(1, 2, 6, 1, 1, 2, 1, 4, 0), -- Энхбаатар Энхбат

-- Match 2: Алтан гадас vs Хүрэл мөнгөн
(2, 3, 9, 1, 1, 6, 1, 3, 0), -- Төмөрбаатар Төмөр (Defender)
(2, 3, 10, 1, 0, 0, 1, 6, 0), -- Төмөрбаатар Төмөр (Forward)
(2, 4, 13, 1, 0, 4, 0, 4, 0), -- Ганбаатар Ганзориг (Forward)
(2, 4, 14, 0, 1, 2, 1, 1, 0), -- Ганбаатар Ганзориг (Defender)

-- Match 3: Цагаан сар vs Хангарьд
(3, 5, 17, 0, 1, 0, -1, 2, 0), -- Мөнхбаатар Мөнхбат (Midfielder)
(3, 5, 18, 1, 0, 2, 0, 5, 0), -- Мөнхбаатар Мөнхбат (Forward)
(3, 1, 1, 2, 1, 0, 3, 7, 0), -- Батбаяр Батбат
(3, 1, 3, 1, 1, 2, 2, 4, 0), -- Батбаатар Батбат (Forward)
(3, 1, 4, 1, 0, 4, 1, 3, 0); -- Батбаатар Батбат (Defender)

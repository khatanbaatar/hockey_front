-- Mega Menu Migration Script
-- Бүх одоогийн цэсийн бүтцийг mega menu болгон хувиргах query
-- Convert all existing menu structures to mega menu format

-- ================================================================================
-- 1. CLEAN UP EXISTING MEGA MENU DATA (if any)
-- ================================================================================

-- Delete existing mega menu data in correct order (foreign key constraints)
DELETE FROM mega_menu_items;
DELETE FROM mega_menu_sections;
DELETE FROM mega_menu_categories;

-- Reset auto increment
ALTER TABLE mega_menu_categories AUTO_INCREMENT = 1;
ALTER TABLE mega_menu_sections AUTO_INCREMENT = 1;
ALTER TABLE mega_menu_items AUTO_INCREMENT = 1;

-- ================================================================================
-- 2. INSERT MEGA MENU CATEGORIES
-- ================================================================================

INSERT INTO mega_menu_categories (name_mn, name_en, slug, icon, sort_order, is_active) VALUES
('Тухай', 'About', 'about', 'fas fa-info-circle', 1, TRUE),
('Тэмцээн', 'Competitions', 'competitions', 'fas fa-trophy', 2, TRUE),
('Бүтэц', 'Structure', 'structure', 'fas fa-sitemap', 3, TRUE),
('Хуудас', 'Media', 'media', 'fas fa-newspaper', 4, TRUE),
('Статистик', 'Statistics', 'statistics', 'fas fa-chart-bar', 5, TRUE),
('Бусад', 'Others', 'others', 'fas fa-ellipsis-h', 6, TRUE);

-- ================================================================================
-- 3. INSERT MEGA MENU SECTIONS
-- ================================================================================

-- About Category Sections (Category ID: 1)
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) VALUES
(1, 'Холбооны мэдээлэл', 'Federation Info', 'Монголын хоккейн холбооны тухай мэдээлэл', 'Information about Mongolian Hockey Federation', 'fas fa-building', 'bg-blue-50', 'text-blue-600', 1, TRUE, '/about'),
(1, 'Түүх', 'History', 'Хоккейн спортын түүх, хөгжил', 'History and development of hockey sport', 'fas fa-history', 'bg-indigo-50', 'text-indigo-600', 2, FALSE, '/history'),
(1, 'Зорилго, зорилт', 'Mission & Vision', 'Холбооны зорилго, зорилт', 'Mission and vision of the federation', 'fas fa-bullseye', 'bg-purple-50', 'text-purple-600', 3, FALSE, '/mission-vision');

-- Competitions Category Sections (Category ID: 2)
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) VALUES
(2, 'Тэмцээний хуанли', 'Competition Schedule', 'Орчуулагдах тэмцээнүүдийн хуанли', 'Schedule of upcoming competitions', 'fas fa-calendar', 'bg-green-50', 'text-green-600', 1, TRUE, '/competition-schedule'),
(2, 'Тэмцээний үр дүн', 'Competition Results', 'Тэмцээний үр дүн, байрлал', 'Competition results and standings', 'fas fa-medal', 'bg-yellow-50', 'text-yellow-600', 2, TRUE, '/competition-results'),
(2, 'Үндэсний шигшээ баг', 'National Team', 'Монголын үндэсний хоккейн шигшээ баг', 'Mongolian national hockey team', 'fas fa-flag', 'bg-red-50', 'text-red-600', 3, FALSE, '/national-team'),
(2, 'Баг, клубүүд', 'Teams & Clubs', 'Хоккейн баг, клубүүдийн мэдээлэл', 'Hockey teams and clubs information', 'fas fa-users', 'bg-orange-50', 'text-orange-600', 4, FALSE, '/teams');

-- Structure Category Sections (Category ID: 3)
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) VALUES
(3, 'Байгууллага', 'Organization', 'Холбооны бүтэц, байгууллага', 'Federation structure and organization', 'fas fa-sitemap', 'bg-purple-50', 'text-purple-600', 1, FALSE, '/structure-organization'),
(3, 'Дасгал семинар', 'Training Seminar', 'Дасгал, семинар, сургалт', 'Training, seminars and education', 'fas fa-graduation-cap', 'bg-teal-50', 'text-teal-600', 2, FALSE, '/training-seminar'),
(3, 'Шүүгчид', 'Referees', 'Шүүгчдийн мэдээлэл', 'Referee information', 'fas fa-whistle', 'bg-orange-50', 'text-orange-600', 3, FALSE, '/referees'),
(3, 'Дэд бүтэц', 'Infrastructure', 'Хоккейн дэд бүтэц, тоног төхөөрөмж', 'Hockey infrastructure and equipment', 'fas fa-building', 'bg-gray-50', 'text-gray-600', 4, FALSE, '/infrastructure'),
(3, 'Дүрэм, журам', 'Rules & Regulations', 'Хоккейн дүрэм, журам', 'Hockey rules and regulations', 'fas fa-file-alt', 'bg-blue-50', 'text-blue-600', 5, FALSE, '/rules-regulations'),
(3, 'Аюулгүй байдал', 'Safety', 'Ажлын аюулгүй байдал, эрүүл мэнд', 'Occupational safety and health', 'fas fa-shield-alt', 'bg-green-50', 'text-green-600', 6, FALSE, '/osh');

-- Media Category Sections (Category ID: 4)
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) VALUES
(4, 'Мэдээ', 'News', 'Сүүлийн үеийн мэдээ', 'Latest news and updates', 'fas fa-newspaper', 'bg-blue-50', 'text-blue-600', 1, TRUE, '/news'),
(4, 'Зургийн цуглуулга', 'Photo Gallery', 'Хоккейн тэмцээний зургууд', 'Hockey competition photos', 'fas fa-images', 'bg-pink-50', 'text-pink-600', 2, TRUE, '/gallery-photos'),
(4, 'Бичлэгийн цуглуулга', 'Video Gallery', 'Хоккейн тэмцээний бичлэгүүд', 'Hockey competition videos', 'fas fa-video', 'bg-indigo-50', 'text-indigo-600', 3, FALSE, '/gallery-videos');

-- Statistics Category Sections (Category ID: 5)
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) VALUES
(5, 'Тэмцээний үр дүн', 'Competition Results', 'Тэмцээний үр дүн, байрлал', 'Competition results and standings', 'fas fa-chart-line', 'bg-green-50', 'text-green-600', 1, TRUE, '/statistics-competition-results'),
(5, 'Баг, тоглогчдын статистик', 'Team & Player Statistics', 'Баг, тоглогчдын статистик мэдээлэл', 'Team and player statistics', 'fas fa-users', 'bg-blue-50', 'text-blue-600', 2, TRUE, '/statistics-team-player-stats');

-- ================================================================================
-- 4. INSERT MEGA MENU ITEMS
-- ================================================================================

-- About Category Items
-- Section 1: Холбооны мэдээлэл (Section ID: 1)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(1, 'Холбооны тухай', 'About Federation', 'about', 'Монголын хоккейн холбооны тухай', 'About Mongolian Hockey Federation', 'fas fa-info', '/about', 1, NULL, NULL),
(1, 'Холбооны удирдлага', 'Leadership Team', 'about-us-leadership-team', 'Холбооны удирдлагын баг', 'Federation leadership team', 'fas fa-users', '/about-us-leadership-team', 2, NULL, NULL),
(1, 'Холбооны ерөнхийлөгч', 'President', 'about-us-president', 'Холбооны ерөнхийлөгчийн мэдээлэл', 'Federation president information', 'fas fa-user-tie', '/about-us-president', 3, NULL, NULL),
(1, 'Холбооны мэдээлэл', 'Federation Info', 'about-us-federation-info', 'Холбооны дэлгэрэнгүй мэдээлэл', 'Detailed federation information', 'fas fa-building', '/about-us-federation-info', 4, NULL, NULL);

-- Section 2: Түүх (Section ID: 2)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(2, 'Хоккейн түүх', 'Hockey History', 'history', 'Хоккейн спортын түүх', 'History of hockey sport', 'fas fa-history', '/history', 1, NULL, NULL),
(2, 'Холбооны түүх', 'Federation History', 'history-federation-history', 'Монголын хоккейн холбооны түүх', 'History of Mongolian Hockey Federation', 'fas fa-building', '/history-federation-history', 2, NULL, NULL),
(2, 'Хронологи', 'Timeline', 'history-timeline', 'Хоккейн хөгжлийн хронологи', 'Hockey development timeline', 'fas fa-clock', '/history-timeline', 3, NULL, NULL);

-- Section 3: Зорилго, зорилт (Section ID: 3)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(3, 'Зорилго, зорилт', 'Mission & Vision', 'mission-vision', 'Холбооны зорилго, зорилт', 'Mission and vision of the federation', 'fas fa-bullseye', '/mission-vision', 1, NULL, NULL);

-- Competitions Category Items
-- Section 4: Тэмцээний хуанли (Section ID: 4)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(4, 'Жилийн хуанли', 'Annual Calendar', 'competition-schedule-annual-calendar', 'Оны турш тэмцээнүүдийн хуанли', 'Annual calendar of competitions', 'fas fa-calendar-alt', '/competition-schedule-annual-calendar', 1, 'NEW', 'bg-green-500'),
(4, 'Тэмцээний дэлгэрэнгүй', 'Competition Details', 'competition-schedule-details', 'Тэмцээний дэлгэрэнгүй мэдээлэл', 'Detailed competition information', 'fas fa-info-circle', '/competition-schedule-details', 2, NULL, NULL);

-- Section 5: Тэмцээний үр дүн (Section ID: 5)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(5, 'Одоогийн байрлал', 'Current Standings', 'competition-results', 'Одоогийн байрлалын хүснэгт', 'Current league standings', 'fas fa-trophy', '/competition-results', 1, NULL, NULL);

-- Section 6: Үндэсний шигшээ баг (Section ID: 6)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(6, 'Шигшээ багийн мэдээлэл', 'Team Information', 'national-team', 'Үндэсний шигшээ багийн мэдээлэл', 'National team information', 'fas fa-users', '/national-team', 1, NULL, NULL),
(6, 'Тоглогчдын профайл', 'Player Profiles', 'national-team-roster', 'Шигшээ багийн тоглогчдын профайл', 'National team player profiles', 'fas fa-user', '/national-team-roster', 2, NULL, NULL),
(6, 'Тэмцээн', 'Competitions', 'national-team-competitions', 'Шигшээ багийн оролцсон тэмцээнүүд', 'National team competitions', 'fas fa-trophy', '/national-team-competitions', 3, NULL, NULL),
(6, 'Шагнал', 'Awards', 'national-team-awards', 'Шигшээ багийн шагнал, амжилт', 'National team awards and achievements', 'fas fa-medal', '/national-team-awards', 4, NULL, NULL);

-- Section 7: Баг, клубүүд (Section ID: 7)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(7, 'Клубын багууд', 'Club Teams', 'teams-clubs-teams-list', 'Хоккейн клубын багууд', 'Hockey club teams', 'fas fa-users', '/teams-clubs-teams-list', 1, NULL, NULL),
(7, 'Холбоо барих', 'Contact Info', 'teams-contact-info', 'Баг, клубүүдтэй холбоо барих', 'Contact information for teams and clubs', 'fas fa-phone', '/teams-contact-info', 2, NULL, NULL);

-- Structure Category Items
-- Section 8: Байгууллага (Section ID: 8)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(8, 'Холбооны бүтэц', 'Federation Structure', 'structure-organization', 'Холбооны бүтэц, байгууллага', 'Federation structure and organization', 'fas fa-sitemap', '/structure-organization', 1, NULL, NULL);

-- Section 9: Дасгал семинар (Section ID: 9)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(9, 'Дасгал семинар', 'Training Seminars', 'training-seminar', 'Дасгал, семинар, сургалт', 'Training, seminars and education', 'fas fa-graduation-cap', '/training-seminar', 1, NULL, NULL);

-- Section 10: Шүүгчид (Section ID: 10)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(10, 'Шүүгчдийн профайл', 'Referee Profiles', 'referees-referee-profiles', 'Шүүгчдийн профайл, мэдээлэл', 'Referee profiles and information', 'fas fa-user-tie', '/referees-referee-profiles', 1, NULL, NULL),
(10, 'Мэргэжлийн чадвар', 'Professional Skills', 'referees-referee-qualifications', 'Шүүгчдийн мэргэжлийн чадвар', 'Referee professional qualifications', 'fas fa-award', '/referees-referee-qualifications', 2, NULL, NULL);

-- Section 11: Дэд бүтэц (Section ID: 11)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(11, 'Спортын заал', 'Sports Halls', 'infrastructure-halls', 'Хоккейн спортын залууд', 'Hockey sports halls', 'fas fa-building', '/infrastructure-halls', 1, NULL, NULL),
(11, 'Спортын талбай', 'Sports Fields', 'infrastructure-sports-fields', 'Хоккейн спортын талбайнууд', 'Hockey sports fields', 'fas fa-map', '/infrastructure-sports-fields', 2, NULL, NULL),
(11, 'Техникийн тоног төхөөрөмж', 'Technical Equipment', 'infrastructure-technical-equipment', 'Хоккейн техникийн тоног төхөөрөмж', 'Hockey technical equipment', 'fas fa-cogs', '/infrastructure-technical-equipment', 3, NULL, NULL),
(11, 'Аймгийн дэд бүтэц', 'Provincial Infrastructure', 'infrastructure-provincial-infrastructure', 'Аймгийн хоккейн дэд бүтэц', 'Provincial hockey infrastructure', 'fas fa-map-marker-alt', '/infrastructure-provincial-infrastructure', 4, NULL, NULL);

-- Section 12: Дүрэм, журам (Section ID: 12)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(12, 'Хоккейн дүрэм', 'Hockey Rules', 'rules-regulations-hockey-rules', 'Хоккейн спортын дүрэм', 'Hockey sport rules', 'fas fa-book', '/rules-regulations-hockey-rules', 1, NULL, NULL),
(12, 'Холбооны дүрэм', 'Federation Rules', 'rules-regulations-federation-rules', 'Холбооны дүрэм, журам', 'Federation rules and regulations', 'fas fa-file-alt', '/rules-regulations-federation-rules', 2, NULL, NULL);

-- Section 13: Аюулгүй байдал (Section ID: 13)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(13, 'Эрүүл мэндийн даатгал', 'Health Insurance', 'osh-health-insurance', 'Ажлын эрүүл мэндийн даатгал', 'Occupational health insurance', 'fas fa-heartbeat', '/osh-health-insurance', 1, NULL, NULL),
(13, 'Аюулгүй байдлын заавар', 'Safety Instructions', 'osh-safety-instructions', 'Ажлын аюулгүй байдлын заавар', 'Occupational safety instructions', 'fas fa-shield-alt', '/osh-safety-instructions', 2, NULL, NULL);

-- Media Category Items
-- Section 14: Мэдээ (Section ID: 14)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(14, 'Сүүлийн мэдээ', 'Latest News', 'news', 'Сүүлийн үеийн мэдээ', 'Latest news and updates', 'fas fa-newspaper', '/news', 1, 'HOT', 'bg-red-500');

-- Section 15: Зургийн цуглуулга (Section ID: 15)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(15, 'Тэмцээний зургууд', 'Competition Photos', 'gallery-photos', 'Тэмцээний зургууд', 'Competition photos', 'fas fa-camera', '/gallery-photos', 1, NULL, NULL);

-- Section 16: Бичлэгийн цуглуулга (Section ID: 16)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(16, 'Тэмцээний бичлэгүүд', 'Competition Videos', 'gallery-videos', 'Тэмцээний бичлэгүүд', 'Competition videos', 'fas fa-video', '/gallery-videos', 1, NULL, NULL);

-- Statistics Category Items
-- Section 17: Тэмцээний үр дүн (Section ID: 17)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(17, 'Байрлалын хүснэгт', 'League Table', 'statistics-competition-results', 'Тэмцээний байрлалын хүснэгт', 'Competition league table', 'fas fa-table', '/statistics-competition-results', 1, NULL, NULL);

-- Section 18: Баг, тоглогчдын статистик (Section ID: 18)
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
(18, 'Тоглогчдын статистик', 'Player Statistics', 'statistics-team-player-stats', 'Тоглогчдын статистик', 'Player statistics', 'fas fa-chart-bar', '/statistics-team-player-stats', 1, NULL, NULL);

-- ================================================================================
-- 5. VERIFICATION QUERIES
-- ================================================================================

-- Check inserted data
SELECT 'Categories' as table_name, COUNT(*) as count FROM mega_menu_categories
UNION ALL
SELECT 'Sections' as table_name, COUNT(*) as count FROM mega_menu_sections
UNION ALL
SELECT 'Items' as table_name, COUNT(*) as count FROM mega_menu_items;

-- Show category structure
SELECT 
    c.name_mn as category_name,
    s.title_mn as section_title,
    COUNT(i.id) as item_count
FROM mega_menu_categories c
LEFT JOIN mega_menu_sections s ON c.id = s.category_id
LEFT JOIN mega_menu_items i ON s.id = i.section_id
GROUP BY c.id, c.name_mn, s.id, s.title_mn
ORDER BY c.sort_order, s.sort_order;

-- Show featured sections
SELECT 
    c.name_mn as category_name,
    s.title_mn as section_title,
    s.is_featured
FROM mega_menu_categories c
JOIN mega_menu_sections s ON c.id = s.category_id
WHERE s.is_featured = TRUE
ORDER BY c.sort_order, s.sort_order;

-- ================================================================================
-- 6. UPDATE EXISTING MENU ITEMS (Optional - if you want to keep old menu structure)
-- ================================================================================

-- This section can be used to update existing menu items to reference mega menu
-- Uncomment if needed:

/*
-- Update existing menu items to have mega menu references
UPDATE menu_items 
SET mega_menu_category_id = 1 
WHERE slug IN ('about', 'history', 'mission-vision');

UPDATE menu_items 
SET mega_menu_category_id = 2 
WHERE slug IN ('competition-schedule', 'competition-results', 'national-team', 'teams');

UPDATE menu_items 
SET mega_menu_category_id = 3 
WHERE slug IN ('structure-organization', 'training-seminar', 'referees', 'infrastructure', 'rules-regulations', 'osh');

UPDATE menu_items 
SET mega_menu_category_id = 4 
WHERE slug IN ('news', 'gallery-photos', 'gallery-videos');

UPDATE menu_items 
SET mega_menu_category_id = 5 
WHERE slug IN ('statistics-competition-results', 'statistics-team-player-stats');
*/

-- ================================================================================
-- MIGRATION COMPLETE
-- ================================================================================

SELECT 'Mega Menu Migration Completed Successfully!' as status;

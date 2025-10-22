-- Mega Menu Database Schema
-- Мега цэсийн мэдээллийн сангийн бүтэц

-- Create mega_menu_categories table
CREATE TABLE IF NOT EXISTS mega_menu_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_mn VARCHAR(100) NOT NULL COMMENT 'Монгол нэр',
    name_en VARCHAR(100) NOT NULL COMMENT 'Англи нэр',
    slug VARCHAR(50) NOT NULL UNIQUE COMMENT 'URL slug',
    icon VARCHAR(50) COMMENT 'Icon class or name',
    sort_order INT DEFAULT 0 COMMENT 'Эрэмбэлэх дараалал',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Идэвхтэй эсэх',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create mega_menu_sections table
CREATE TABLE IF NOT EXISTS mega_menu_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    title_mn VARCHAR(100) NOT NULL COMMENT 'Монгол гарчиг',
    title_en VARCHAR(100) NOT NULL COMMENT 'Англи гарчиг',
    description_mn TEXT COMMENT 'Монгол тайлбар',
    description_en TEXT COMMENT 'Англи тайлбар',
    icon VARCHAR(50) COMMENT 'Icon class or name',
    background_color VARCHAR(20) DEFAULT 'bg-gray-50' COMMENT 'Background color class',
    text_color VARCHAR(20) DEFAULT 'text-gray-600' COMMENT 'Text color class',
    sort_order INT DEFAULT 0 COMMENT 'Эрэмбэлэх дараалал',
    is_featured BOOLEAN DEFAULT FALSE COMMENT 'Онцолсон эсэх',
    link_url VARCHAR(200) COMMENT 'Холбоос URL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES mega_menu_categories(id) ON DELETE CASCADE
);

-- Create mega_menu_items table
CREATE TABLE IF NOT EXISTS mega_menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    name_mn VARCHAR(100) NOT NULL COMMENT 'Монгол нэр',
    name_en VARCHAR(100) NOT NULL COMMENT 'Англи нэр',
    slug VARCHAR(100) NOT NULL COMMENT 'URL slug',
    description_mn TEXT COMMENT 'Монгол тайлбар',
    description_en TEXT COMMENT 'Англи тайлбар',
    icon VARCHAR(50) COMMENT 'Icon class or name',
    link_url VARCHAR(200) COMMENT 'Холбоос URL',
    is_external BOOLEAN DEFAULT FALSE COMMENT 'Гадаад холбоос эсэх',
    badge_text VARCHAR(20) COMMENT 'Badge текст',
    badge_color VARCHAR(20) DEFAULT 'bg-red-500' COMMENT 'Badge өнгө',
    sort_order INT DEFAULT 0 COMMENT 'Эрэмбэлэх дараалал',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Идэвхтэй эсэх',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES mega_menu_sections(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_mega_menu_categories_sort ON mega_menu_categories(sort_order);
CREATE INDEX idx_mega_menu_categories_active ON mega_menu_categories(is_active);
CREATE INDEX idx_mega_menu_sections_category ON mega_menu_sections(category_id);
CREATE INDEX idx_mega_menu_sections_sort ON mega_menu_sections(sort_order);
CREATE INDEX idx_mega_menu_items_section ON mega_menu_items(section_id);
CREATE INDEX idx_mega_menu_items_sort ON mega_menu_items(sort_order);
CREATE INDEX idx_mega_menu_items_active ON mega_menu_items(is_active);

-- Insert sample mega menu data
INSERT INTO mega_menu_categories (name_mn, name_en, slug, icon, sort_order) VALUES
('Тухай', 'About', 'about', 'fas fa-info-circle', 1),
('Тэмцээн', 'Competitions', 'competitions', 'fas fa-trophy', 2),
('Бүтэц', 'Structure', 'structure', 'fas fa-sitemap', 3),
('Хуудас', 'Media', 'media', 'fas fa-newspaper', 4),
('Статистик', 'Statistics', 'statistics', 'fas fa-chart-bar', 5),
('Бусад', 'Others', 'others', 'fas fa-ellipsis-h', 6);

-- Insert mega menu sections
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) VALUES
-- About sections
(1, 'Холбооны мэдээлэл', 'Federation Info', 'Монголын хоккейн холбооны тухай мэдээлэл', 'Information about Mongolian Hockey Federation', 'fas fa-building', 'bg-blue-50', 'text-blue-600', 1, TRUE, '/about'),
(1, 'Түүх', 'History', 'Хоккейн спортын түүх, хөгжил', 'History and development of hockey sport', 'fas fa-history', 'bg-indigo-50', 'text-indigo-600', 2, FALSE, '/history'),

-- Competition sections
(2, 'Тэмцээний хуанли', 'Competition Schedule', 'Орчуулагдах тэмцээнүүдийн хуанли', 'Schedule of upcoming competitions', 'fas fa-calendar', 'bg-green-50', 'text-green-600', 1, TRUE, '/competition-schedule'),
(2, 'Тэмцээний үр дүн', 'Competition Results', 'Тэмцээний үр дүн, байрлал', 'Competition results and standings', 'fas fa-medal', 'bg-yellow-50', 'text-yellow-600', 2, TRUE, '/competition-results'),
(2, 'Үндэсний шигшээ баг', 'National Team', 'Монголын үндэсний хоккейн шигшээ баг', 'Mongolian national hockey team', 'fas fa-flag', 'bg-red-50', 'text-red-600', 3, FALSE, '/national-team'),

-- Structure sections
(3, 'Байгууллага', 'Organization', 'Холбооны бүтэц, байгууллага', 'Federation structure and organization', 'fas fa-sitemap', 'bg-purple-50', 'text-purple-600', 1, FALSE, '/structure'),
(3, 'Дасгал семинар', 'Training Seminar', 'Дасгал, семинар, сургалт', 'Training, seminars and education', 'fas fa-graduation-cap', 'bg-teal-50', 'text-teal-600', 2, FALSE, '/training-seminar'),
(3, 'Шүүгчид', 'Referees', 'Шүүгчдийн мэдээлэл', 'Referee information', 'fas fa-whistle', 'bg-orange-50', 'text-orange-600', 3, FALSE, '/referees'),

-- Media sections
(4, 'Мэдээ', 'News', 'Сүүлийн үеийн мэдээ', 'Latest news and updates', 'fas fa-newspaper', 'bg-blue-50', 'text-blue-600', 1, TRUE, '/news'),
(4, 'Зургийн цуглуулга', 'Photo Gallery', 'Хоккейн тэмцээний зургууд', 'Hockey competition photos', 'fas fa-images', 'bg-pink-50', 'text-pink-600', 2, TRUE, '/gallery-photos'),
(4, 'Бичлэгийн цуглуулга', 'Video Gallery', 'Хоккейн тэмцээний бичлэгүүд', 'Hockey competition videos', 'fas fa-video', 'bg-indigo-50', 'text-indigo-600', 3, FALSE, '/gallery-videos'),

-- Statistics sections
(5, 'Тэмцээний үр дүн', 'Competition Results', 'Тэмцээний үр дүн, байрлал', 'Competition results and standings', 'fas fa-chart-line', 'bg-green-50', 'text-green-600', 1, TRUE, '/statistics-competition-results'),
(5, 'Баг, тоглогчдын статистик', 'Team & Player Statistics', 'Баг, тоглогчдын статистик мэдээлэл', 'Team and player statistics', 'fas fa-users', 'bg-blue-50', 'text-blue-600', 2, TRUE, '/statistics-team-player-stats');

-- Insert mega menu items
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, sort_order, badge_text, badge_color) VALUES
-- About federation items
(1, 'Холбооны тухай', 'About Federation', 'about', 'Монголын хоккейн холбооны тухай', 'About Mongolian Hockey Federation', 'fas fa-info', '/about', 1, NULL, NULL),
(1, 'Зорилго, зорилт', 'Mission & Vision', 'mission-vision', 'Холбооны зорилго, зорилт', 'Mission and vision of the federation', 'fas fa-bullseye', '/mission-vision', 2, NULL, NULL),
(1, 'Холбооны дүрэм', 'Federation Rules', 'federation-rules', 'Холбооны дүрэм, журам', 'Federation rules and regulations', 'fas fa-file-alt', '/federation-rules', 3, NULL, NULL),

-- History items
(2, 'Хоккейн түүх', 'Hockey History', 'history', 'Хоккейн спортын түүх', 'History of hockey sport', 'fas fa-history', '/history', 1, NULL, NULL),
(2, 'Монголын хоккей', 'Mongolian Hockey', 'mongolian-hockey', 'Монголын хоккейн хөгжил', 'Development of hockey in Mongolia', 'fas fa-flag', '/mongolian-hockey', 2, NULL, NULL),

-- Competition schedule items
(3, 'Жилийн хуанли', 'Annual Calendar', 'annual-calendar', 'Оны турш тэмцээнүүдийн хуанли', 'Annual calendar of competitions', 'fas fa-calendar-alt', '/annual-calendar', 1, 'NEW', 'bg-green-500'),
(3, 'Тэмцээний дэлгэрэнгүй', 'Competition Details', 'competition-details', 'Тэмцээний дэлгэрэнгүй мэдээлэл', 'Detailed competition information', 'fas fa-info-circle', '/competition-details', 2, NULL, NULL),

-- Competition results items
(4, 'Одоогийн байрлал', 'Current Standings', 'current-standings', 'Одоогийн байрлалын хүснэгт', 'Current league standings', 'fas fa-trophy', '/current-standings', 1, NULL, NULL),
(4, 'Тэмцээний үр дүн', 'Match Results', 'match-results', 'Тоглолтын үр дүн', 'Match results and scores', 'fas fa-futbol', '/match-results', 2, NULL, NULL),

-- National team items
(5, 'Шигшээ багийн мэдээлэл', 'Team Information', 'team-info', 'Үндэсний шигшээ багийн мэдээлэл', 'National team information', 'fas fa-users', '/team-info', 1, NULL, NULL),
(5, 'Тоглогчдын профайл', 'Player Profiles', 'player-profiles', 'Шигшээ багийн тоглогчдын профайл', 'National team player profiles', 'fas fa-user', '/player-profiles', 2, NULL, NULL),

-- Organization items
(6, 'Холбооны бүтэц', 'Federation Structure', 'structure', 'Холбооны бүтэц, байгууллага', 'Federation structure and organization', 'fas fa-sitemap', '/structure', 1, NULL, NULL),
(6, 'Холбооны гишүүд', 'Federation Members', 'members', 'Холбооны гишүүд, төлөөлөгчид', 'Federation members and representatives', 'fas fa-users', '/members', 2, NULL, NULL),

-- Training items
(7, 'Дасгал семинар', 'Training Seminars', 'training-seminar', 'Дасгал, семинар, сургалт', 'Training, seminars and education', 'fas fa-graduation-cap', '/training-seminar', 1, NULL, NULL),
(7, 'Мэргэжлийн сургалт', 'Professional Training', 'professional-training', 'Мэргэжлийн сургалт, төгсөлт', 'Professional training and certification', 'fas fa-certificate', '/professional-training', 2, NULL, NULL),

-- Referees items
(8, 'Шүүгчдийн профайл', 'Referee Profiles', 'referee-profiles', 'Шүүгчдийн профайл, мэдээлэл', 'Referee profiles and information', 'fas fa-user-tie', '/referee-profiles', 1, NULL, NULL),
(8, 'Мэргэжлийн чадвар', 'Professional Skills', 'referee-qualifications', 'Шүүгчдийн мэргэжлийн чадвар', 'Referee professional qualifications', 'fas fa-award', '/referee-qualifications', 2, NULL, NULL),

-- News items
(9, 'Сүүлийн мэдээ', 'Latest News', 'latest-news', 'Сүүлийн үеийн мэдээ', 'Latest news and updates', 'fas fa-newspaper', '/news', 1, 'HOT', 'bg-red-500'),
(9, 'Мэдээллийн хуудас', 'News Archive', 'news-archive', 'Бүх мэдээллийн архив', 'Complete news archive', 'fas fa-archive', '/news-archive', 2, NULL, NULL),

-- Photo gallery items
(10, 'Тэмцээний зургууд', 'Competition Photos', 'competition-photos', 'Тэмцээний зургууд', 'Competition photos', 'fas fa-camera', '/gallery-photos', 1, NULL, NULL),
(10, 'Баг, тоглогчдын зургууд', 'Team & Player Photos', 'team-player-photos', 'Баг, тоглогчдын зургууд', 'Team and player photos', 'fas fa-users', '/team-player-photos', 2, NULL, NULL),

-- Video gallery items
(11, 'Тэмцээний бичлэгүүд', 'Competition Videos', 'competition-videos', 'Тэмцээний бичлэгүүд', 'Competition videos', 'fas fa-video', '/gallery-videos', 1, NULL, NULL),
(11, 'Гайхамшигт агшингууд', 'Highlights', 'highlights', 'Тэмцээний гайхамшигт агшингууд', 'Competition highlights', 'fas fa-star', '/highlights', 2, NULL, NULL),

-- Statistics items
(12, 'Байрлалын хүснэгт', 'League Table', 'league-table', 'Тэмцээний байрлалын хүснэгт', 'Competition league table', 'fas fa-table', '/statistics-competition-results', 1, NULL, NULL),
(12, 'Тоглогчдын статистик', 'Player Statistics', 'player-stats', 'Тоглогчдын статистик', 'Player statistics', 'fas fa-chart-bar', '/statistics-team-player-stats', 2, NULL, NULL);

-- Create a view for easy querying
CREATE VIEW mega_menu_view AS
SELECT 
    c.id as category_id,
    c.name_mn as category_name_mn,
    c.name_en as category_name_en,
    c.slug as category_slug,
    c.icon as category_icon,
    c.sort_order as category_sort,
    s.id as section_id,
    s.title_mn as section_title_mn,
    s.title_en as section_title_en,
    s.description_mn as section_description_mn,
    s.description_en as section_description_en,
    s.icon as section_icon,
    s.background_color,
    s.text_color,
    s.sort_order as section_sort,
    s.is_featured,
    s.link_url as section_link,
    i.id as item_id,
    i.name_mn as item_name_mn,
    i.name_en as item_name_en,
    i.slug as item_slug,
    i.description_mn as item_description_mn,
    i.description_en as item_description_en,
    i.icon as item_icon,
    i.link_url as item_link,
    i.is_external,
    i.badge_text,
    i.badge_color,
    i.sort_order as item_sort,
    i.is_active as item_active
FROM mega_menu_categories c
LEFT JOIN mega_menu_sections s ON c.id = s.category_id
LEFT JOIN mega_menu_items i ON s.id = i.section_id
WHERE c.is_active = TRUE
ORDER BY c.sort_order, s.sort_order, i.sort_order;

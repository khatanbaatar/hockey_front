-- Add missing menu items from the image to mega menu
-- These items will be added to the "Тухай" (About) category, "Холбооны мэдээлэл" section

-- First, let's check the current section_id for "Холбооны мэдээлэл"
-- SELECT id FROM mega_menu_sections WHERE title_mn = 'Холбооны мэдээлэл';

-- Add the missing menu items
INSERT INTO mega_menu_items (
    section_id, 
    name_mn, 
    name_en, 
    slug, 
    description_mn, 
    description_en, 
    icon, 
    link_url, 
    sort_order
) VALUES
-- ДҮРЭМ ЖУРАМ (Rules & Regulations)
(1, 'Дүрэм журам', 'Rules & Regulations', 'rules-regulations', 'Холбооны дүрэм, журам', 'Federation rules and regulations', 'fas fa-gavel', '/about/rules-regulations', 10),

-- ТҮҮХЭН ЗАМНАЛ (History) - Note: This might already exist as "Түүх"
(1, 'Түүхэн замнал', 'History', 'history', 'Холбооны түүхэн замнал', 'Historical journey of the Federation', 'fas fa-history', '/about/history', 11),

-- ЕРӨНХИЙЛӨГЧ (President)
(1, 'Ерөнхийлөгч', 'President', 'president', 'Холбооны ерөнхийлөгчийн мэдээлэл', 'Information about the Federation President', 'fas fa-user-tie', '/about/president', 12),

-- УДИРДЛАГЫН БАГ (Management Team)
(1, 'Удирдлагын баг', 'Management Team', 'management-team', 'Холбооны удирдлагын багийн мэдээлэл', 'Information about the Federation Management Team', 'fas fa-users', '/about/management-team', 13),

-- ХОЛБООНЫ ТУХАЙ (About Federation) - Note: This might already exist
(1, 'Холбооны тухай', 'About the Federation', 'about-federation', 'Монголын хоккейн холбооны ерөнхий мэдээлэл', 'General information about the Mongolian Hockey Federation', 'fas fa-info-circle', '/about/federation', 14),

-- ХОЛБООНЫ БҮТЭЦ (Federation Structure)
(1, 'Холбооны бүтэц', 'Federation Structure', 'federation-structure', 'Холбооны зохион байгуулалтын бүтэц', 'Organizational structure of the Federation', 'fas fa-sitemap', '/about/federation-structure', 15),

-- АЛБАН ТУШААЛ, ҮҮРЭГ ХАРИУЦЛАГА (Positions, Roles & Responsibilities)
(1, 'Албан тушаал, үүрэг хариуцлага', 'Positions, Roles & Responsibilities', 'positions-roles-responsibilities', 'Холбооны албан тушаал, үүрэг хариуцлага', 'Positions, roles, and responsibilities within the Federation', 'fas fa-briefcase', '/about/positions-roles-responsibilities', 16);

-- Note: 
-- 1. section_id = 1 assumes "Холбооны мэдээлэл" section has id = 1
-- 2. Some items like "Түүхэн замнал" and "Холбооны тухай" might already exist
-- 3. Check for duplicates before running this query
-- 4. Adjust section_id if needed based on your actual database structure

-- To check for existing items before inserting:
-- SELECT * FROM mega_menu_items WHERE name_mn IN ('Түүхэн замнал', 'Холбооны тухай');

-- To check the correct section_id:
-- SELECT id, title_mn FROM mega_menu_sections WHERE title_mn = 'Холбооны мэдээлэл';

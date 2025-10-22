-- Mega Menu Database Queries for Backend Integration
-- Backend server-д ашиглах database query-ууд

-- ================================================================================
-- 1. GET ALL MEGA MENU DATA (for /api/mega-menu endpoint)
-- ================================================================================

-- Main query to get complete mega menu structure
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

-- ================================================================================
-- 2. GET FEATURED SECTIONS ONLY
-- ================================================================================

-- Query to get only featured sections for the bottom section
SELECT 
    s.id,
    s.title_mn,
    s.title_en,
    s.description_mn,
    s.description_en,
    s.icon,
    s.background_color,
    s.text_color,
    s.link_url,
    s.is_featured
FROM mega_menu_sections s
WHERE s.is_featured = TRUE
ORDER BY s.sort_order;

-- ================================================================================
-- 3. GET CATEGORIES WITH SECTION COUNTS
-- ================================================================================

-- Query to get categories with their section counts
SELECT 
    c.id,
    c.name_mn,
    c.name_en,
    c.slug,
    c.icon,
    c.sort_order,
    COUNT(s.id) as section_count
FROM mega_menu_categories c
LEFT JOIN mega_menu_sections s ON c.id = s.category_id
WHERE c.is_active = TRUE
GROUP BY c.id, c.name_mn, c.name_en, c.slug, c.icon, c.sort_order
ORDER BY c.sort_order;

-- ================================================================================
-- 4. GET SECTIONS WITH ITEM COUNTS
-- ================================================================================

-- Query to get sections with their item counts
SELECT 
    s.id,
    s.category_id,
    s.title_mn,
    s.title_en,
    s.description_mn,
    s.description_en,
    s.icon,
    s.background_color,
    s.text_color,
    s.sort_order,
    s.is_featured,
    s.link_url,
    COUNT(i.id) as item_count
FROM mega_menu_sections s
LEFT JOIN mega_menu_items i ON s.id = i.section_id AND i.is_active = TRUE
GROUP BY s.id, s.category_id, s.title_mn, s.title_en, s.description_mn, s.description_en, 
         s.icon, s.background_color, s.text_color, s.sort_order, s.is_featured, s.link_url
ORDER BY s.sort_order;

-- ================================================================================
-- 5. GET ACTIVE ITEMS ONLY
-- ================================================================================

-- Query to get only active menu items
SELECT 
    i.id,
    i.section_id,
    i.name_mn,
    i.name_en,
    i.slug,
    i.description_mn,
    i.description_en,
    i.icon,
    i.link_url,
    i.is_external,
    i.badge_text,
    i.badge_color,
    i.sort_order
FROM mega_menu_items i
WHERE i.is_active = TRUE
ORDER BY i.sort_order;

-- ================================================================================
-- 6. SEARCH MENU ITEMS
-- ================================================================================

-- Query to search menu items by name (for search functionality)
SELECT 
    i.id,
    i.name_mn,
    i.name_en,
    i.slug,
    i.link_url,
    s.title_mn as section_title_mn,
    s.title_en as section_title_en,
    c.name_mn as category_name_mn,
    c.name_en as category_name_en
FROM mega_menu_items i
JOIN mega_menu_sections s ON i.section_id = s.id
JOIN mega_menu_categories c ON s.category_id = c.id
WHERE i.is_active = TRUE 
  AND (i.name_mn LIKE '%SEARCH_TERM%' OR i.name_en LIKE '%SEARCH_TERM%')
ORDER BY i.name_mn;

-- ================================================================================
-- 7. GET MENU ITEMS BY CATEGORY
-- ================================================================================

-- Query to get all items for a specific category
SELECT 
    i.id,
    i.name_mn,
    i.name_en,
    i.slug,
    i.description_mn,
    i.description_en,
    i.icon,
    i.link_url,
    i.badge_text,
    i.badge_color,
    s.title_mn as section_title_mn,
    s.title_en as section_title_en
FROM mega_menu_items i
JOIN mega_menu_sections s ON i.section_id = s.id
JOIN mega_menu_categories c ON s.category_id = c.id
WHERE c.slug = 'CATEGORY_SLUG' AND i.is_active = TRUE
ORDER BY s.sort_order, i.sort_order;

-- ================================================================================
-- 8. GET MENU ITEMS BY SECTION
-- ================================================================================

-- Query to get all items for a specific section
SELECT 
    i.id,
    i.name_mn,
    i.name_en,
    i.slug,
    i.description_mn,
    i.description_en,
    i.icon,
    i.link_url,
    i.is_external,
    i.badge_text,
    i.badge_color,
    i.sort_order
FROM mega_menu_items i
JOIN mega_menu_sections s ON i.section_id = s.id
WHERE s.id = SECTION_ID AND i.is_active = TRUE
ORDER BY i.sort_order;

-- ================================================================================
-- 9. UPDATE QUERIES (for admin functionality)
-- ================================================================================

-- Update category
UPDATE mega_menu_categories 
SET name_mn = 'NEW_MONGOLIAN_NAME', 
    name_en = 'NEW_ENGLISH_NAME',
    icon = 'NEW_ICON',
    sort_order = NEW_SORT_ORDER
WHERE id = CATEGORY_ID;

-- Update section
UPDATE mega_menu_sections 
SET title_mn = 'NEW_MONGOLIAN_TITLE',
    title_en = 'NEW_ENGLISH_TITLE',
    description_mn = 'NEW_MONGOLIAN_DESCRIPTION',
    description_en = 'NEW_ENGLISH_DESCRIPTION',
    icon = 'NEW_ICON',
    background_color = 'NEW_BACKGROUND_COLOR',
    text_color = 'NEW_TEXT_COLOR',
    is_featured = NEW_FEATURED_STATUS,
    link_url = 'NEW_LINK_URL'
WHERE id = SECTION_ID;

-- Update menu item
UPDATE mega_menu_items 
SET name_mn = 'NEW_MONGOLIAN_NAME',
    name_en = 'NEW_ENGLISH_NAME',
    description_mn = 'NEW_MONGOLIAN_DESCRIPTION',
    description_en = 'NEW_ENGLISH_DESCRIPTION',
    icon = 'NEW_ICON',
    link_url = 'NEW_LINK_URL',
    badge_text = 'NEW_BADGE_TEXT',
    badge_color = 'NEW_BADGE_COLOR',
    sort_order = NEW_SORT_ORDER
WHERE id = ITEM_ID;

-- ================================================================================
-- 10. INSERT QUERIES (for admin functionality)
-- ================================================================================

-- Insert new category
INSERT INTO mega_menu_categories (name_mn, name_en, slug, icon, sort_order, is_active) 
VALUES ('MONGOLIAN_NAME', 'ENGLISH_NAME', 'SLUG', 'ICON', SORT_ORDER, TRUE);

-- Insert new section
INSERT INTO mega_menu_sections (category_id, title_mn, title_en, description_mn, description_en, icon, background_color, text_color, sort_order, is_featured, link_url) 
VALUES (CATEGORY_ID, 'MONGOLIAN_TITLE', 'ENGLISH_TITLE', 'MONGOLIAN_DESCRIPTION', 'ENGLISH_DESCRIPTION', 'ICON', 'BACKGROUND_COLOR', 'TEXT_COLOR', SORT_ORDER, FEATURED_STATUS, 'LINK_URL');

-- Insert new menu item
INSERT INTO mega_menu_items (section_id, name_mn, name_en, slug, description_mn, description_en, icon, link_url, is_external, badge_text, badge_color, sort_order, is_active) 
VALUES (SECTION_ID, 'MONGOLIAN_NAME', 'ENGLISH_NAME', 'SLUG', 'MONGOLIAN_DESCRIPTION', 'ENGLISH_DESCRIPTION', 'ICON', 'LINK_URL', FALSE, 'BADGE_TEXT', 'BADGE_COLOR', SORT_ORDER, TRUE);

-- ================================================================================
-- 11. DELETE QUERIES (for admin functionality)
-- ================================================================================

-- Delete menu item (soft delete by setting is_active = FALSE)
UPDATE mega_menu_items SET is_active = FALSE WHERE id = ITEM_ID;

-- Delete section (will also delete all items in that section due to CASCADE)
DELETE FROM mega_menu_sections WHERE id = SECTION_ID;

-- Delete category (will also delete all sections and items due to CASCADE)
DELETE FROM mega_menu_categories WHERE id = CATEGORY_ID;

-- ================================================================================
-- 12. STATISTICS QUERIES
-- ================================================================================

-- Get menu statistics
SELECT 
    (SELECT COUNT(*) FROM mega_menu_categories WHERE is_active = TRUE) as total_categories,
    (SELECT COUNT(*) FROM mega_menu_sections) as total_sections,
    (SELECT COUNT(*) FROM mega_menu_items WHERE is_active = TRUE) as total_items,
    (SELECT COUNT(*) FROM mega_menu_sections WHERE is_featured = TRUE) as featured_sections,
    (SELECT COUNT(*) FROM mega_menu_items WHERE badge_text IS NOT NULL) as items_with_badges;

-- Get category distribution
SELECT 
    c.name_mn as category_name,
    COUNT(s.id) as section_count,
    COUNT(i.id) as item_count
FROM mega_menu_categories c
LEFT JOIN mega_menu_sections s ON c.id = s.category_id
LEFT JOIN mega_menu_items i ON s.id = i.section_id AND i.is_active = TRUE
WHERE c.is_active = TRUE
GROUP BY c.id, c.name_mn
ORDER BY c.sort_order;

-- ================================================================================
-- BACKEND INTEGRATION NOTES
-- ================================================================================

/*
To integrate these queries into your backend server:

1. Replace the mock data in server.ts with database queries
2. Use the main query (#1) to get complete mega menu structure
3. Use query #2 to get featured sections
4. Implement caching for better performance
5. Add error handling for database connections
6. Consider adding admin endpoints for CRUD operations

Example backend function:
async function fetchMegaMenuFromDatabase(): Promise<MegaMenuResponse> {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute(`
            SELECT c.id as category_id, c.name_mn, c.name_en, ...
            FROM mega_menu_categories c
            LEFT JOIN mega_menu_sections s ON c.id = s.category_id
            LEFT JOIN mega_menu_items i ON s.id = i.section_id
            WHERE c.is_active = TRUE
            ORDER BY c.sort_order, s.sort_order, i.sort_order
        `);
        
        // Transform rows into the expected format
        return transformDatabaseRowsToMegaMenuFormat(rows);
    } finally {
        await connection.end();
    }
}
*/

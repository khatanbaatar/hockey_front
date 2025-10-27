-- Add news from https://mihf.mn/news/t-riin-t-men-orolcoo-mongol-ulsyn-dnb-ii-50-khuv-n-t-r-s-shuud-khamaaraltai
-- Title: "Төрийн түмэн оролцоо" - Монгол Улсын ДНБ-ий 50 хувь нь төрөөс шууд хамааралтай

-- First, check if this news already exists
-- SELECT * FROM news WHERE title_mn LIKE '%Төрийн түмэн оролцоо%';

-- Insert the news item
INSERT INTO news (
    slug, 
    title_mn, 
    title_en, 
    content_mn, 
    content_en, 
    date,
    image_url,
    category_mn,
    category_en,
    created_at
) VALUES (
    't-riin-t-men-orolcoo-mongol-ulsyn-dnb-ii-50-khuv-n-t-r-s-shuud-khamaaraltai',
    'Төрийн түмэн оролцоо" - Монгол Улсын ДНБ-ий 50 хувь нь төрөөс шууд хамааралтай',
    'Government Participation - 50% of Mongolia GDP is Directly Related to Government',
    '2023 оны эхний хагас жилийн байдлаар Төрийн өмчит болон Төрийн өмчийн оролцоотой компаниудын активын хэмжээ 59.2 их наяд төгрөг болж, 10 жилийн өмнөхтэй харьцуулбал 10 орчим хувиар өсжээ. "Эрдэнэс Тавантолгой" ХК-ийн хувьцаа эзэмшигчдийн ногдол ашгийг уламжлал ёсоор сонгуулийн жилд тараасан нь Төрийн өмчит компаниудад чиглэсэн анхаарлыг дахин нэмэгдүүлээд байна.

Эдийн засгийн томоохон салбаруудад өндөр оролцоотой байж, тэр чинээгээрээ дуулиантай асуудалд байнга орооцолддог Төрийн өмчит компаниудын ашигт ажиллагаа, хөрөнгийн удирдлагын үзүүлэлтийг ойроос харцгаая.

Данхар актив:
- 2023 оны эхний хагас жилийн байдлаар Төрийн өмчит болон Төрийн өмчийн оролцоотой компаниудын активын хэмжээ 59.2 их наяд төгрөг болж, 10 жилийн өмнөхтэй харьцуулбал 10 орчим хувиар өсжээ. Харин сүүлийн таван жилийн хугацаанд 29.6 тэрбум төгрөгөөс бараг хоёр дахин өссөн байна.
- Өөрөөр хэлбэл Төрийн өмчит компаниудын нийт актив Монгол Улсын дотоодын нийт бүтээгдэхүүнээс давсан буюу 112 хувь орчимд байгаа аж.
- Тэгвэл Төрийн өмчит компаниудын 59.2 их наяд төгрөгийн активын багадаа 50 хувь нь зах зээлд бараа бүтээгдэхүүн, хөрөнгө оруулалт хэлбэрээр нийлүүлэгддэг гэж тооцвол Монгол Улсын дотоодын нийт бүтээгдэхүүний 50 хувь нь шууд Төрөөс хамааралтай гэж үзэж болохыг "Ти Ди Би Секьюритис ҮЦК" ХХК онцолсон юм.',
    
    'As of the first half of 2023, the assets of state-owned and state-owned companies reached 59.2 trillion tugriks, representing an increase of approximately 10% compared to 10 years ago. The traditional distribution of dividends to "Erdenes Tavan Tolgoi" JSC shareholders in the election year has once again increased attention to state-owned companies.

Let us closely examine the performance and corporate governance indicators of state-owned companies, which have high participation in major economic sectors and are constantly involved in controversial issues.

High assets:
- As of the first half of 2023, the assets of state-owned and state-owned companies reached 59.2 trillion tugriks, representing an increase of approximately 10% compared to 10 years ago. Over the past five years, it has almost doubled from 29.6 billion tugriks.
- In other words, the total assets of state-owned companies exceed Mongolia domestic gross product, accounting for approximately 112%.
- If we assume that at least 50% of the 59.2 trillion tugriks in state-owned company assets are supplied to the market as goods and investments, then 50% of Mongolia domestic gross product is directly related to the government, as "TDB Securities" LLC emphasized.',
    
    '2024-03-14',
    'https://mihf.mn/sliders/001.jpeg',
    'Аналитик',
    'Analytics',
    NOW()
);

-- Note: 
-- 1. This news is from https://mihf.mn/news/t-riin-t-men-orolcoo-mongol-ulsyn-dnb-ii-50-khuv-n-t-r-s-shuud-khamaaraltai
-- 2. The slug matches the original URL slug
-- 3. The content has been translated from the webpage
-- 4. Published date is from the webpage (2024-03-14)
-- 5. Category is set as "Аналитик" (Analytics)

-- Add another news from https://mihf.mn/news/eelzhit-bus-chuulgan-zarlazh-gurvan-asuudal-khelelcene
-- Title: Ээлжит бус чуулган зарлаж, гурван асуудал хэлэлцэнэ

-- First, check if this news already exists
-- SELECT * FROM news WHERE title_mn LIKE '%Ээлжит бус чуулган%';

-- Insert the news item
INSERT INTO news (
    slug, 
    title_mn, 
    title_en, 
    content_mn, 
    content_en, 
    date,
    image_url,
    category_mn,
    category_en,
    created_at
) VALUES (
    'eelzhit-bus-chuulgan-zarlazh-gurvan-asuudal-khelelcene',
    'Ээлжит бус чуулган зарлаж, гурван асуудал хэлэлцэнэ',
    'Special Assembly Called, Three Issues to be Discussed',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque nulla a elit pulvinar, in rhoncus enim condimentum. Nulla vel posuere orci, id efficitur tortor. Nulla hendrerit auctor est, auctor ullamcorper sapien ullamcorper id. Donec pellentesque imperdiet arcu quis pellentesque. Fusce nibh diam, faucibus sed dignissim eu, pretium a risus. Vestibulum varius elementum libero vel dictum. Nunc lacinia volutpat est, non placerat diam lobortis nec. Praesent a mollis dolor. Proin nulla ex, facilisis sit amet magna eget, faucibus euismod tortor. Nullam in iaculis lectus. Cras pulvinar nisi porttitor elit pellentesque egestas. Mauris eros ante, mattis id ante id, venenatis tempor mauris. Sed mauris quam, pretium et blandit pellentesque, scelerisque ac justo. Ut quis dolor est. Quisque id neque nec ante mattis molestie et id enim. Nulla facilisi.

Suspendisse mattis ornare dui, et porttitor ex convallis eu. Duis quis sagittis eros, sed suscipit neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin iaculis ornare tellus quis facilisis. In consectetur, diam eu auctor fermentum, justo metus auctor ipsum, sit amet bibendum quam nunc nec elit. Mauris a ullamcorper purus. Mauris non metus sed nisi egestas imperdiet. Duis in mollis nunc, vel mollis eros. Morbi vulputate augue dui, interdum porttitor libero aliquet in. Quisque orci libero, bibendum vel aliquam in, tristique at magna.

Энэхүү чуулган дээр гурван чухал асуудал хэлэлцэнэ:
- Хоккейн спортын хөгжлийн стратегийн төлөвлөгөө
- Олон улсын тэмцээнд бэлтгэх хөтөлбөр
- Баг, тамирчдын шатлал дараалал',
    
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque nulla a elit pulvinar, in rhoncus enim condimentum. Nulla vel posuere orci, id efficitur tortor. Nulla hendrerit auctor est, auctor ullamcorper sapien ullamcorper id. Donec pellentesque imperdiet arcu quis pellentesque. Fusce nibh diam, faucibus sed dignissim eu, pretium a risus. Vestibulum varius elementum libero vel dictum. Nunc lacinia volutpat est, non placerat diam lobortis nec. Praesent a mollis dolor. Proin nulla ex, facilisis sit amet magna eget, faucibus euismod tortor. Nullam in iaculis lectus. Cras pulvinar nisi porttitor elit pellentesque egestas. Mauris eros ante, mattis id ante id, venenatis tempor mauris. Sed mauris quam, pretium et blandit pellentesque, scelerisque ac justo. Ut quis dolor est. Quisque id neque nec ante mattis molestie et id enim. Nulla facilisi.

Three important issues will be discussed at this assembly:
- Hockey development strategic plan
- Program for preparation in international competitions
- Team and player ranking system',
    
    '2024-03-14',
    'https://mihf.mn/sliders/001.jpeg',
    'Мэдээ',
    'News',
    NOW()
);

-- Note: 
-- 1. This news is from https://mihf.mn/news/eelzhit-bus-chuulgan-zarlazh-gurvan-asuudal-khelelcene
-- 2. The slug matches the original URL slug
-- 3. Published date is from the webpage (2024-03-14)
-- 4. Category is set as "Мэдээ" (News)

-- Add another news from https://mihf.mn/news/klubuudyn-comyn-avarga-shalgaruulakh-temceen
-- Title: КЛУБУУДЫН ЦОМЫН АВАРГА ШАЛГАРУУЛАХ ТЭМЦЭЭН

-- First, check if this news already exists
-- SELECT * FROM news WHERE title_mn LIKE '%КЛУБУУДЫН ЦОМЫН%';

-- Insert the news item
INSERT INTO news (
    slug, 
    title_mn, 
    title_en, 
    content_mn, 
    content_en, 
    date,
    image_url,
    category_mn,
    category_en,
    created_at
) VALUES (
    'klubuudyn-comyn-avarga-shalgaruulakh-temceen',
    'КЛУБУУДЫН ЦОМЫН АВАРГА ШАЛГАРУУЛАХ ТЭМЦЭЭН',
    'CLUB CUP CHAMPIONSHIP TOURNAMENT',
    'Монголын Хоккейн холбооны нэрэмжит "КЛУБУУДЫН ЦОМЫН АВАРГА ШАЛГАРУУЛАХ ТЭМЦЭЭН" өнөөдөр 09:00 цагт эхэлнэ.

"Лиг"-ийн ангилалд 5 баг, "Сонирхогч"-ийн ангилалд 8 баг өрсөлдөнө.

Тоглолтын хуваарь:
09:00 "АВ" vs "Нийслэл UB" (Сонирхогч)
10:00 "Хангаръд-2" vs "Шарын гол-2" (Сонирхогч)
11:00 "Отгон-Од" vs "Шарын гол" (Лиг)

Лигийн "Дархан" багийн хувьд 15:00 цагаас эхний тоглолтоо Багануур багтай хийнэ.',
    
    'The Mongolian Hockey Federation "CLUB CUP CHAMPIONSHIP TOURNAMENT" will begin today at 09:00.

5 teams will compete in the "League" category, 8 teams in the "Enthusiast" category.

Game Schedule:
09:00 "AV" vs "Capital UB" (Enthusiast)
10:00 "Khangaard-2" vs "Sharyn Gol-2" (Enthusiast)
11:00 "Otgon-Od" vs "Sharyn Gol" (League)

The League team "Darkhan" will play their first game against Baganuur team from 15:00.',
    
    '2024-03-15',
    'https://mihf.mn/sliders/001.jpeg',
    'Тэмцээн',
    'Competition',
    NOW()
);

-- Note: 
-- 1. This news is from https://mihf.mn/news/klubuudyn-comyn-avarga-shalgaruulakh-temceen
-- 2. The slug matches the original URL slug
-- 3. Published date is from the webpage (2024-03-15)
-- 4. Category is set as "Тэмцээн" (Competition)


-- Add another news from https://mihf.mn/news/shagnal-garduulakh-yoslol
-- Title: Шагнал гардуулах ёслол

-- First, check if this news already exists
-- SELECT * FROM news WHERE title_mn LIKE '%Шагнал гардуулах ёслол%';

-- Insert the news item
INSERT INTO news (
    slug, 
    title_mn, 
    title_en, 
    content_mn, 
    content_en, 
    date,
    image_url,
    category_mn,
    category_en,
    created_at
) VALUES (
    'shagnal-garduulakh-yoslol',
    'Шагнал гардуулах ёслол',
    'Award Ceremony',
    'Монголын Хоккейн холбооны шагнал гардуулах ёслол амжилттай зохион байгуулагдлаа. Тэмцээнүүдийн шилдэг баг, тамирчид, дасгалжуулагчид болон зохион байгуулагчдад шагнал гардуулж, улирлын онцлох үйл явдлуудыг дурдсан.',
    'The Mongolian Hockey Federation successfully held an award ceremony. Top teams, players, coaches and organizers were presented awards and season highlights were celebrated.',
    '2024-03-16',
    'https://mihf.mn/sliders/001.jpeg',
    'Мэдээ',
    'News',
    NOW()
);

-- To verify all insertions:
-- SELECT id, title_mn, slug, date FROM news WHERE slug IN (
--   't-riin-t-men-orolcoo-mongol-ulsyn-dnb-ii-50-khuv-n-t-r-s-shuud-khamaaraltai',
--   'eelzhit-bus-chuulgan-zarlazh-gurvan-asuudal-khelelcene',
--   'klubuudyn-comyn-avarga-shalgaruulakh-temceen',
--   'shagnal-garduulakh-yoslol'
-- );

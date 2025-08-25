-- Seed products data
INSERT INTO products (name, name_en, brand, brand_en, price, original_price, category_id, description, description_en, image, rating, review_count, in_stock, stock_quantity, tags, tags_en, specifications) VALUES

-- Bags
('حقيبة مدرسية فاخرة', 'Premium School Backpack', 'سكول باك', 'SchoolPack', 149.00, 199.00, 'bags', 'حقيبة مدرسية عالية الجودة مع جيوب متعددة ومقاومة للماء', 'High-quality school backpack with multiple pockets and water-resistant material', '/premium-school-backpack.png', 4.9, 125, true, 50, ARRAY['حقائب', 'مدرسية', 'فاخرة', 'مقاومة للماء'], ARRAY['bags', 'school', 'premium', 'waterproof'], '{"material": "نايلون مقاوم للماء", "dimensions": "45 × 30 × 15 سم", "weight": "800 جرام", "capacity": "25 لتر"}'),

('حقيبة ظهر رياضية', 'Sports Backpack', 'أكتيف جير', 'ActiveGear', 89.00, 120.00, 'bags', 'حقيبة ظهر مثالية للأنشطة الرياضية والمدرسية', 'Perfect backpack for sports and school activities', '/sports-backpack.png', 4.7, 89, true, 75, ARRAY['حقائب', 'رياضية', 'ظهر'], ARRAY['bags', 'sports', 'backpack'], '{"material": "بوليستر مقاوم", "dimensions": "40 × 28 × 12 سم", "weight": "600 جرام", "capacity": "20 لتر"}'),

-- Tools
('طقم أدوات هندسية كامل', 'Complete Geometry Tools Set', 'ماث تولز', 'MathTools', 45.00, 65.00, 'tools', 'طقم كامل من الأدوات الهندسية عالية الدقة للطلاب', 'Complete set of high-precision geometry tools for students', '/geometry-tools-set-compass-ruler.png', 4.8, 89, true, 75, ARRAY['أدوات', 'هندسة', 'رياضيات', 'برجل'], ARRAY['tools', 'geometry', 'math', 'compass'], '{"includes": "برجل، مسطرة، منقلة، مثلثات", "material": "معدن وبلاستيك عالي الجودة", "case": "علبة بلاستيكية محمولة"}'),

('آلة حاسبة علمية', 'Scientific Calculator', 'كالك برو', 'CalcPro', 125.00, 150.00, 'electronics', 'آلة حاسبة علمية متقدمة للطلاب', 'Advanced scientific calculator for students', '/scientific-calculator.png', 4.6, 156, true, 40, ARRAY['آلة حاسبة', 'علمية', 'رياضيات'], ARRAY['calculator', 'scientific', 'math'], '{"functions": "240+ وظيفة", "display": "شاشة LCD كبيرة", "power": "بطارية + طاقة شمسية"}'),

-- Notebooks
('دفاتر ملاحظات مجموعة 5 قطع', 'Notebooks Set 5 Pieces', 'نوت بوك برو', 'NotebookPro', 25.00, 35.00, 'notebooks', 'مجموعة من 5 دفاتر ملاحظات بألوان مختلفة وجودة عالية', 'Set of 5 high-quality notebooks in different colors', '/colorful-school-notebooks-set.png', 4.9, 210, true, 100, ARRAY['دفاتر', 'ملاحظات', 'ملونة', 'جودة عالية'], ARRAY['notebooks', 'notes', 'colorful', 'high-quality'], '{"pages": "100 صفحة لكل دفتر", "paper": "ورق عالي الجودة 80 جرام", "size": "A4", "colors": "5 ألوان مختلفة"}'),

('دفتر رسم فني A3', 'Art Drawing Notebook A3', 'آرت بوك', 'ArtBook', 35.00, 45.00, 'notebooks', 'دفتر رسم فني بورق عالي الجودة مقاس A3', 'High-quality art drawing notebook A3 size', '/art-drawing-notebook-a3.png', 4.8, 67, true, 60, ARRAY['دفتر', 'رسم', 'فني', 'A3'], ARRAY['notebook', 'drawing', 'art', 'A3'], '{"pages": "50 صفحة", "paper": "ورق رسم 120 جرام", "size": "A3", "binding": "حلزوني"}'),

-- Pens
('أقلام رصاص مجموعة 12 قلم', 'Pencils Set 12 Pieces', 'رايت رايت', 'WriteRight', 18.00, 25.00, 'pens', 'مجموعة من 12 قلم رصاص عالي الجودة بدرجات مختلفة', 'Set of 12 high-quality pencils with different grades', '/pencils-set-12-pieces-wooden.png', 4.7, 156, true, 200, ARRAY['أقلام', 'رصاص', 'كتابة', 'خشبي'], ARRAY['pencils', 'writing', 'wooden', 'grades'], '{"quantity": "12 قلم", "grades": "HB, 2B, 4B", "material": "خشب طبيعي", "eraser": "ممحاة في النهاية"}'),

('أقلام ملونة 24 لون', 'Colored Pencils 24 Colors', 'كلر ماستر', 'ColorMaster', 42.00, 55.00, 'pens', 'مجموعة أقلام ملونة عالية الجودة 24 لون', 'High-quality colored pencils set 24 colors', '/colored-pencils-24-set.png', 4.8, 134, true, 80, ARRAY['أقلام', 'ملونة', 'رسم', '24 لون'], ARRAY['pencils', 'colored', 'drawing', '24-colors'], '{"colors": "24 لون مختلف", "quality": "أصباغ عالية الجودة", "wood": "خشب أرز طبيعي", "case": "علبة معدنية"}'),

('أقلام حبر جاف 10 قطع', 'Ballpoint Pens 10 Pieces', 'بن ماستر', 'PenMaster', 15.00, 20.00, 'pens', 'مجموعة أقلام حبر جاف عالية الجودة', 'High-quality ballpoint pens set', '/ballpoint-pens-10-set.png', 4.5, 98, true, 150, ARRAY['أقلام', 'حبر جاف', 'كتابة'], ARRAY['pens', 'ballpoint', 'writing'], '{"quantity": "10 أقلام", "ink": "حبر أزرق وأسود", "tip": "رأس متوسط 1.0 مم", "grip": "مقبض مريح"}'),

-- Art Supplies
('طقم ألوان مائية 36 لون', 'Watercolor Set 36 Colors', 'آرت كولور', 'ArtColor', 85.00, 110.00, 'art', 'طقم ألوان مائية احترافي 36 لون مع فرش', 'Professional watercolor set 36 colors with brushes', '/watercolor-set-36-colors.png', 4.9, 78, true, 45, ARRAY['ألوان', 'مائية', 'رسم', 'فرش'], ARRAY['watercolor', 'painting', 'art', 'brushes'], '{"colors": "36 لون مائي", "brushes": "3 فرش مختلفة الأحجام", "palette": "لوحة خلط", "case": "علبة بلاستيكية"}'),

-- Organization
('ملف حفظ A4 مع أقسام', 'A4 File Organizer with Sections', 'أورجانايز', 'Organize', 28.00, 35.00, 'organization', 'ملف حفظ الأوراق مع أقسام متعددة', 'Document organizer file with multiple sections', '/a4-file-organizer-sections.png', 4.6, 89, true, 70, ARRAY['ملف', 'تنظيم', 'أوراق', 'A4'], ARRAY['file', 'organizer', 'documents', 'A4'], '{"size": "A4", "sections": "12 قسم", "material": "بلاستيك شفاف", "closure": "إغلاق بسحاب"}'),

-- Lunch Supplies
('علبة طعام مدرسية', 'School Lunch Box', 'لانش بوكس', 'LunchBox', 45.00, 60.00, 'lunch', 'علبة طعام مدرسية بأقسام متعددة', 'School lunch box with multiple compartments', '/school-lunch-box-compartments.png', 4.7, 112, true, 90, ARRAY['علبة طعام', 'مدرسية', 'أقسام'], ARRAY['lunch-box', 'school', 'compartments'], '{"compartments": "4 أقسام", "material": "بلاستيك آمن للطعام", "capacity": "1.2 لتر", "microwave": "آمن للميكروويف"}'),

('زجاجة مياه رياضية', 'Sports Water Bottle', 'هايدرو', 'Hydro', 32.00, 40.00, 'lunch', 'زجاجة مياه رياضية بتصميم عملي', 'Sports water bottle with practical design', '/sports-water-bottle.png', 4.8, 145, true, 120, ARRAY['زجاجة مياه', 'رياضية', 'عملية'], ARRAY['water-bottle', 'sports', 'practical'], '{"capacity": "750 مل", "material": "بلاستيك خالي من BPA", "features": "غطاء رياضي، حلقة حمل", "colors": "ألوان متعددة"});

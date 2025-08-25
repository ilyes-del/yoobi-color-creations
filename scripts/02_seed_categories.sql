-- Seed categories data
INSERT INTO categories (id, name, name_en, description, description_en, image, product_count, featured) VALUES
('bags', 'حقائب', 'Bags', 'حقائب مدرسية وحقائب الظهر', 'School bags and backpacks', '/category-bags.png', 25, true),
('notebooks', 'دفاتر', 'Notebooks', 'دفاتر وكراسات بأحجام مختلفة', 'Notebooks and exercise books in various sizes', '/category-notebooks.png', 45, true),
('pens', 'أقلام', 'Pens & Pencils', 'أقلام رصاص وحبر وألوان', 'Pencils, pens, and colored pencils', '/category-pens.png', 60, true),
('tools', 'أدوات', 'Tools', 'أدوات هندسية ومدرسية', 'Geometry and school tools', '/category-tools.png', 30, false),
('art', 'فنون', 'Art Supplies', 'أدوات الرسم والفنون', 'Drawing and art supplies', '/category-art.png', 35, false),
('electronics', 'إلكترونيات', 'Electronics', 'آلات حاسبة وأجهزة إلكترونية', 'Calculators and electronic devices', '/category-electronics.png', 15, false),
('organization', 'تنظيم', 'Organization', 'ملفات وأدوات التنظيم', 'Files and organization tools', '/category-organization.png', 20, false),
('lunch', 'وجبات', 'Lunch Supplies', 'علب طعام وزجاجات مياه', 'Lunch boxes and water bottles', '/category-lunch.png', 18, false);

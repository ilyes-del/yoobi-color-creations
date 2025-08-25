-- Useful views for the SchoolSpark application

-- View for product search with category information
CREATE VIEW product_search_view AS
SELECT 
    p.id,
    p.name,
    p.name_en,
    p.brand,
    p.brand_en,
    p.price,
    p.original_price,
    p.category_id,
    c.name as category_name,
    c.name_en as category_name_en,
    p.description,
    p.description_en,
    p.image,
    p.rating,
    p.review_count,
    p.in_stock,
    p.stock_quantity,
    p.tags,
    p.tags_en,
    p.specifications,
    p.created_at,
    p.updated_at,
    -- Calculate discount percentage
    CASE 
        WHEN p.original_price > p.price THEN 
            ROUND(((p.original_price - p.price) / p.original_price * 100)::numeric, 0)
        ELSE 0 
    END as discount_percentage,
    -- Popularity score (combination of rating and review count)
    (p.rating * 0.7 + (p.review_count::float / 100) * 0.3) as popularity_score
FROM products p
JOIN categories c ON p.category_id = c.id;

-- View for order summary with customer information
CREATE VIEW order_summary_view AS
SELECT 
    o.id,
    o.order_number,
    o.customer_id,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    o.subtotal,
    o.discount,
    o.shipping_cost,
    o.tax,
    o.total,
    o.status,
    o.payment_status,
    o.payment_method,
    o.created_at,
    o.updated_at,
    o.estimated_delivery,
    -- Count of items in order
    (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) as item_count,
    -- Total quantity of items
    (SELECT SUM(quantity) FROM order_items oi WHERE oi.order_id = o.id) as total_quantity,
    -- Shipping address as single string
    CONCAT(o.shipping_street, ', ', o.shipping_district, ', ', o.shipping_city, ', ', o.shipping_country) as full_address
FROM orders o;

-- View for cart summary with product details
CREATE VIEW cart_summary_view AS
SELECT 
    ci.id as cart_item_id,
    ci.session_id,
    ci.customer_id,
    ci.quantity,
    ci.created_at,
    p.id as product_id,
    p.name as product_name,
    p.name_en as product_name_en,
    p.brand,
    p.price,
    p.original_price,
    p.image,
    p.in_stock,
    p.stock_quantity,
    c.name as category_name,
    -- Calculate line total
    (ci.quantity * p.price) as line_total,
    -- Calculate savings per line
    CASE 
        WHEN p.original_price > p.price THEN 
            (ci.quantity * (p.original_price - p.price))
        ELSE 0 
    END as line_savings
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
JOIN categories c ON p.category_id = c.id;

-- View for product reviews with customer information
CREATE VIEW product_reviews_view AS
SELECT 
    pr.id,
    pr.product_id,
    pr.customer_id,
    pr.customer_name,
    pr.rating,
    pr.title,
    pr.comment,
    pr.verified_purchase,
    pr.created_at,
    pr.updated_at,
    p.name as product_name,
    p.name_en as product_name_en,
    p.image as product_image
FROM product_reviews pr
JOIN products p ON pr.product_id = p.id;

-- View for social impact summary
CREATE VIEW social_impact_summary AS
SELECT 
    DATE_TRUNC('month', si.created_at) as month,
    COUNT(*) as orders_with_impact,
    SUM(si.donation_value) as total_donations,
    COUNT(DISTINCT si.school_name) as schools_helped,
    AVG(si.donation_value) as avg_donation_per_order
FROM social_impact si
GROUP BY DATE_TRUNC('month', si.created_at)
ORDER BY month DESC;

-- View for popular products (best sellers)
CREATE VIEW popular_products_view AS
SELECT 
    p.id,
    p.name,
    p.name_en,
    p.brand,
    p.price,
    p.original_price,
    p.image,
    p.rating,
    p.review_count,
    p.category_id,
    c.name as category_name,
    -- Calculate total sold quantity
    COALESCE(SUM(oi.quantity), 0) as total_sold,
    -- Calculate total revenue
    COALESCE(SUM(oi.total), 0) as total_revenue,
    -- Popularity rank
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(oi.quantity), 0) DESC, p.rating DESC) as popularity_rank
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status NOT IN ('cancelled')
WHERE p.in_stock = true
GROUP BY p.id, p.name, p.name_en, p.brand, p.price, p.original_price, p.image, p.rating, p.review_count, p.category_id, c.name;

-- View for low stock alerts
CREATE VIEW low_stock_alerts AS
SELECT 
    p.id,
    p.name,
    p.name_en,
    p.brand,
    p.stock_quantity,
    p.category_id,
    c.name as category_name,
    p.price,
    p.in_stock,
    -- Calculate reorder level (could be customized per product)
    CASE 
        WHEN p.stock_quantity <= 5 THEN 'Critical'
        WHEN p.stock_quantity <= 10 THEN 'Low'
        WHEN p.stock_quantity <= 20 THEN 'Warning'
        ELSE 'OK'
    END as stock_status
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.in_stock = true AND p.stock_quantity <= 20
ORDER BY p.stock_quantity ASC;

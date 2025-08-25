-- Utility functions for the SchoolSpark database

-- Function to update product rating based on reviews
CREATE OR REPLACE FUNCTION update_product_rating(product_id_param INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE products 
    SET 
        rating = COALESCE((
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM product_reviews 
            WHERE product_id = product_id_param
        ), 0),
        review_count = (
            SELECT COUNT(*)
            FROM product_reviews 
            WHERE product_id = product_id_param
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = product_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to update category product count
CREATE OR REPLACE FUNCTION update_category_product_count(category_id_param VARCHAR(50))
RETURNS VOID AS $$
BEGIN
    UPDATE categories 
    SET 
        product_count = (
            SELECT COUNT(*)
            FROM products 
            WHERE category_id = category_id_param AND in_stock = true
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = category_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR(20) AS $$
DECLARE
    next_number INTEGER;
    order_number VARCHAR(20);
BEGIN
    -- Get the next sequence number
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 3) AS INTEGER)), 0) + 1
    INTO next_number
    FROM orders
    WHERE order_number LIKE 'SS%';
    
    -- Format as SS000001, SS000002, etc.
    order_number := 'SS' || LPAD(next_number::TEXT, 6, '0');
    
    RETURN order_number;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate order totals
CREATE OR REPLACE FUNCTION calculate_order_totals(
    subtotal_param DECIMAL(10,2),
    discount_param DECIMAL(10,2) DEFAULT 0,
    shipping_cost_param DECIMAL(10,2) DEFAULT 0
)
RETURNS TABLE(
    subtotal DECIMAL(10,2),
    discount DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    tax DECIMAL(10,2),
    total DECIMAL(10,2)
) AS $$
DECLARE
    tax_rate DECIMAL(4,4) := 0.15; -- 15% VAT
    calculated_tax DECIMAL(10,2);
    calculated_total DECIMAL(10,2);
BEGIN
    -- Calculate tax on subtotal minus discount
    calculated_tax := ROUND((subtotal_param - discount_param) * tax_rate, 2);
    
    -- Calculate total
    calculated_total := subtotal_param - discount_param + shipping_cost_param + calculated_tax;
    
    RETURN QUERY SELECT 
        subtotal_param,
        discount_param,
        shipping_cost_param,
        calculated_tax,
        calculated_total;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_addresses_updated_at BEFORE UPDATE ON customer_addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to automatically update product rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION trigger_update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM update_product_rating(OLD.product_id);
        RETURN OLD;
    ELSE
        PERFORM update_product_rating(NEW.product_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_rating_on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON product_reviews
    FOR EACH ROW EXECUTE FUNCTION trigger_update_product_rating();

-- Trigger to update category product count when product is added/updated/deleted
CREATE OR REPLACE FUNCTION trigger_update_category_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM update_category_product_count(OLD.category_id);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Update both old and new categories if category changed
        IF OLD.category_id != NEW.category_id THEN
            PERFORM update_category_product_count(OLD.category_id);
            PERFORM update_category_product_count(NEW.category_id);
        ELSE
            PERFORM update_category_product_count(NEW.category_id);
        END IF;
        RETURN NEW;
    ELSE -- INSERT
        PERFORM update_category_product_count(NEW.category_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_category_count_on_product_change
    AFTER INSERT OR UPDATE OR DELETE ON products
    FOR EACH ROW EXECUTE FUNCTION trigger_update_category_count();

-- Trigger to add order status history when order status changes
CREATE OR REPLACE FUNCTION trigger_add_order_status_history()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO order_status_history (order_id, status, notes)
        VALUES (NEW.id, NEW.status, 'Order created');
    ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        INSERT INTO order_status_history (order_id, status, notes)
        VALUES (NEW.id, NEW.status, 'Status updated');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_order_status_history
    AFTER INSERT OR UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION trigger_add_order_status_history();

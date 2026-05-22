ALTER TABLE products
ADD COLUMN IF NOT EXISTS inventory_status TEXT NOT NULL DEFAULT 'available';

ALTER TABLE products
DROP CONSTRAINT IF EXISTS products_inventory_status_check;

ALTER TABLE products
ADD CONSTRAINT products_inventory_status_check
CHECK (inventory_status IN ('available', 'coming_soon', 'out_of_stock'));

-- Enforce product availability on inquiries
CREATE OR REPLACE FUNCTION validate_inquiry_items_availability()
RETURNS TRIGGER AS $$
DECLARE
  item_record RECORD;
  product_status TEXT;
BEGIN
  FOR item_record IN SELECT * FROM jsonb_to_recordset(NEW.items) AS x(id UUID, title TEXT) LOOP
    SELECT inventory_status INTO product_status FROM products WHERE id = item_record.id;
    IF product_status IS NULL THEN
      RAISE EXCEPTION 'Product with ID % does not exist.', item_record.id;
    END IF;
    IF product_status = 'coming_soon' THEN
      RAISE EXCEPTION 'Product "%" is Coming Soon and cannot be inquired.', item_record.title;
    END IF;
    IF product_status = 'out_of_stock' THEN
      RAISE EXCEPTION 'Product "%" is Out of Stock and cannot be inquired.', item_record.title;
    END IF;
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_inquiry_items_availability ON inquiries;
CREATE TRIGGER enforce_inquiry_items_availability
BEFORE INSERT OR UPDATE ON inquiries
FOR EACH ROW
EXECUTE FUNCTION validate_inquiry_items_availability();

CREATE OR REPLACE FUNCTION show_shipped(
	s_order_id INTEGER,
	s_name VARCHAR DEFAULT NULL,
	s_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	s_status VARCHAR DEFAULT ('Shipped'),
	s_ordered_date DATE DEFAULT CURRENT_TIMESTAMP
)RETURNS VOID AS $$
BEGIN
	INSERT INTO shipped(order_id,name,date,status,ordered_date)
	VALUES(s_order_id, s_name, s_date, s_status, s_ordered_date);
END;
$$ LANGUAGE plpgsql;


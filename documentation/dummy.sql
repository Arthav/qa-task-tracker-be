-- Dummy Data for QA Task Tracker

-- Users
INSERT INTO users (name, role, avatar) VALUES
('Sarah Chen', 'QA', 'https://i.pravatar.cc/150?u=sarah'),
('Michael Rodriguez', 'QA', 'https://i.pravatar.cc/150?u=michael'),
('Aisha Patel', 'QA', 'https://i.pravatar.cc/150?u=aisha'),
('James Wilson', 'DEV', 'https://i.pravatar.cc/150?u=james'),
('Elena Kovač', 'DEV', 'https://i.pravatar.cc/150?u=elena'),
('Ahmad Hassan', 'DEV', 'https://i.pravatar.cc/150?u=ahmad');

-- Projects
INSERT INTO projects (name, description, created_at) VALUES
('E-Commerce Platform', 'Main shopping platform with cart and checkout', '2024-01-15 00:00:00'),
('Mobile Banking App', 'Secure mobile banking application', '2024-02-01 00:00:00'),
('CRM Dashboard', 'Customer relationship management system', '2024-03-10 00:00:00');

-- Project Members
-- Project 1: Sarah(1), Michael(2), James(4), Elena(5)
INSERT INTO project_members (project_id, user_id) VALUES
(1, 1), (1, 2), (1, 4), (1, 5),
-- Project 2: Michael(2), Aisha(3), Elena(5), Ahmad(6)
(2, 2), (2, 3), (2, 5), (2, 6),
-- Project 3: Sarah(1), Aisha(3), James(4), Ahmad(6)
(3, 1), (3, 3), (3, 4), (3, 6);

-- QA Tasks
-- Task 1: Project 1, Pass
INSERT INTO qa_tasks (
    project_id, scenario, category, test_case, test_steps, data,
    expected_result, actual_result, kategori, status,
    catatan_from_qa, respon_from_programmer,
    status_perbaikan_from_programmer, status_selesai_from_qa,
    assigned_qa_id, assigned_dev_id, created_at, updated_at
) VALUES (
    1, 'User Login', 'Authentication', 'TC-001: Valid user login with correct credentials',
    '1. Navigate to login page\n2. Enter valid email\n3. Enter valid password\n4. Click login button',
    'Email: test@example.com\nPassword: Test@123',
    'User should be redirected to dashboard with welcome message',
    'User redirected to dashboard successfully',
    'Functional', 'PASS',
    'Login flow works as expected. Response time is good.',
    'Implemented OAuth2 authentication with JWT tokens',
    'FIXED', 'COMPLETED',
    1, 4, '2024-11-15 10:00:00', '2024-11-20 14:30:00'
);

-- Task 2: Project 1, Fail
INSERT INTO qa_tasks (
    project_id, scenario, category, test_case, test_steps, data,
    expected_result, actual_result, kategori, status,
    catatan_from_qa, respon_from_programmer,
    status_perbaikan_from_programmer, status_selesai_from_qa,
    assigned_qa_id, assigned_dev_id, created_at, updated_at
) VALUES (
    1, 'Shopping Cart', 'E-Commerce', 'TC-002: Add product to cart and verify total price',
    '1. Browse products\n2. Click ''Add to Cart''\n3. Verify cart icon updates\n4. Open cart\n5. Verify product and price',
    'Product: Laptop XZ-500\nPrice: $999.99\nQuantity: 2',
    'Cart shows 2 items, total $1,999.98 with correct tax',
    'Cart shows incorrect tax calculation for multiple items',
    'Functional', 'FAIL',
    'Tax calculation is incorrect when quantity > 1. Shows $1,989.98 instead of $1,999.98',
    'Investigating tax calculation logic in cart service',
    'IN_PROGRESS', 'IN_REVIEW',
    1, 5, '2024-11-22 09:15:00', '2024-11-25 16:45:00'
);

-- Task 3: Project 2, Fail
INSERT INTO qa_tasks (
    project_id, scenario, category, test_case, test_steps, data,
    expected_result, actual_result, kategori, status,
    catatan_from_qa, respon_from_programmer,
    status_perbaikan_from_programmer, status_selesai_from_qa,
    assigned_qa_id, assigned_dev_id, created_at, updated_at
) VALUES (
    2, 'Fund Transfer', 'Banking', 'TC-003: Transfer funds between accounts',
    '1. Login to account\n2. Select Transfer option\n3. Enter recipient details\n4. Enter amount\n5. Confirm with OTP\n6. Submit transfer',
    'From Account: ****1234\nTo Account: ****5678\nAmount: $500.00',
    'Transfer completes successfully with confirmation number and SMS notification',
    'Transfer fails intermittently with timeout error',
    'Critical', 'FAIL',
    '5 out of 10 attempts resulted in timeout errors. Network logs show 504 Gateway Timeout',
    'Database connection pool exhausted during peak hours. Implementing connection pooling optimization',
    'FIXED', 'IN_REVIEW',
    2, 5, '2024-11-16 11:20:00', '2024-11-23 13:10:00'
);

-- Task 4: Project 3, Pass
INSERT INTO qa_tasks (
    project_id, scenario, category, test_case, test_steps, data,
    expected_result, actual_result, kategori, status,
    catatan_from_qa, respon_from_programmer,
    status_perbaikan_from_programmer, status_selesai_from_qa,
    assigned_qa_id, assigned_dev_id, created_at, updated_at
) VALUES (
    3, 'Customer Data Export', 'Reporting', 'TC-004: Export customer list to CSV',
    '1. Navigate to Customers page\n2. Apply filters if needed\n3. Click Export button\n4. Select CSV format\n5. Download file',
    'Filter: Last 30 days\nExpected Records: 1,250',
    'CSV file downloads with all customer records and correct headers',
    'CSV file downloads successfully with all data intact',
    'Functional', 'PASS',
    'Export works perfectly. File format is correct and all fields are present.',
    'Implemented streaming export for large datasets',
    'FIXED', 'COMPLETED',
    3, 6, '2024-11-10 14:00:00', '2024-11-12 10:30:00'
);

-- Repair Loops
-- For Task 1
INSERT INTO repair_loops (task_id, status, notes, date) VALUES
(1, 'FIXED', 'Fixed session timeout issue', '2024-11-20 14:30:00');

-- For Task 2
INSERT INTO repair_loops (task_id, status, notes, date) VALUES
(2, 'IN_PROGRESS', 'Working on tax calculation fix', '2024-11-25 16:45:00');

-- For Task 3
INSERT INTO repair_loops (task_id, status, notes, date) VALUES
(3, 'FAILED', 'First fix attempt unsuccessful', '2024-11-18 09:00:00'),
(3, 'FIXED', 'Increased connection pool and added retry logic', '2024-11-23 13:10:00');

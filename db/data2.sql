USE usof;

-- Insert 4 more posts (no likes) using existing user IDs

INSERT INTO posts (author_id, title, content, status) VALUES
-- Using existing users from initial insert
(3, 'The Rise of Quantum Computing', 'Quantum computing is no longer just theoretical. Major breakthroughs are happening that could revolutionize cryptography, drug discovery, and complex simulations. What applications excite you most?', 'ACTIVE'),

(4, 'Minimalist Living: Benefits and Challenges', 'After adopting minimalism for a year, I''ve experienced both incredible benefits and unexpected challenges. Here''s my honest take on simplifying your life.', 'ACTIVE'),

(5, 'Renewable Energy Storage Solutions', 'As we transition to renewable energy, storage becomes critical. Let''s discuss the latest advancements in battery technology, hydrogen storage, and grid-scale solutions.', 'ACTIVE'),

(2, 'Digital Art and NFT Revolution', 'The digital art world is transforming with NFTs and new creative tools. How is technology changing artistic expression and the business of art?', 'ACTIVE');

-- Insert Posts-Categories relationships for new posts
INSERT INTO posts_categories (post_id, category_id) VALUES
-- Post 13: Quantum Computing
(13, 1), (13, 2), (13, 5), -- Technology, Science, Business

-- Post 14: Minimalist Living
(14, 3), (14, 22), (14, 23), -- Lifestyle, Home & Garden, Philosophy

-- Post 15: Renewable Energy Storage
(15, 1), (15, 2), (15, 13), -- Technology, Science, Environment

-- Post 16: Digital Art and NFTs
(16, 1), (16, 7), (16, 16); -- Technology, Arts & Culture, Gaming

INSERT INTO users (login, firstname, lastname, password, email, role) VALUES
                                                                          ('michaelscott', 'Michael', 'Scott', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'michael.scott@email.com', 'USER'),
                                                                          ('pambeesly', 'Pam', 'Beesly', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'pam.beesly@email.com', 'USER');
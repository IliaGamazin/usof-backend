-- Sample data for USOF application
-- Passwords used (all bcrypt hashed with 12 salt rounds):
-- admin: adminadmin -> $2b$12$uvwmGWqlBzvylIHnxllkZuGcVQqouwVyb.O24QKvg.xl5e8hZYC/O
-- user1: password1 -> $2b$12$OVHKZVKzlNmNEjrsonR7X.QNYEpSWk1ddtSQbH80qpub7wTAsKyGm
-- user2: password2 -> $2b$12$EQhyUyDDnNVAS0XrmytZ0OWPnpDxhzAXQG2PIqkFP8IgfJeGkOihi
-- user3: password3 -> $2b$12$Vz3k6GotYEgXObpQ2aqncuRHG7eK.V9lLTlC9otSNWRlpfTNGGzta
-- user4: password4 -> $2b$12$XOhecBJ2K.N72GsO9Wg9BOEiLTkODSPbH5Vgn3mXPo7eKrGtIVJky
USE usof;
-- Insert Users (1 admin + 4 regular users)

INSERT INTO users (login, firstname, lastname, password, email, role) VALUES
  ('admin', 'Admin', 'User', '$2b$12$uvwmGWqlBzvylIHnxllkZuGcVQqouwVyb.O24QKvg.xl5e8hZYC/O', 'admin@usof.com', 'ADMIN'),
  ('johndoe', 'John', 'Doe', '$2b$12$OVHKZVKzlNmNEjrsonR7X.QNYEpSWk1ddtSQbH80qpub7wTAsKyGm', 'john.doe@email.com', 'USER'),
  ('jansmith', 'Jane', 'Smith', '$2b$12$EQhyUyDDnNVAS0XrmytZ0OWPnpDxhzAXQG2PIqkFP8IgfJeGkOihi', 'jane.smith@email.com', 'USER'),
  ('mikejohnson', 'Mike', 'Johnson', '$2b$12$Vz3k6GotYEgXObpQ2aqncuRHG7eK.V9lLTlC9otSNWRlpfTNGGzta', 'mike.johnson@email.com', 'USER'),
  ('sarahwilson', 'Sarah', 'Wilson', '$2b$12$XOhecBJ2K.N72GsO9Wg9BOEiLTkODSPbH5Vgn3mXPo7eKrGtIVJky', 'sarah.wilson@email.com', 'USER'),
  ('alexchen', 'Alex', 'Chen', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'alex.chen@email.com', 'USER'),
  ('emilybrown', 'Emily', 'Brown', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'emily.brown@email.com', 'USER'),
  ('davidlee', 'David', 'Lee', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'david.lee@email.com', 'USER'),
  ('lisamartinez', 'Lisa', 'Martinez', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'lisa.martinez@email.com', 'USER'),
  ('robertgarcia', 'Robert', 'Garcia', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'robert.garcia@email.com', 'USER'),
  ('mariaanderson', 'Maria', 'Anderson', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'maria.anderson@email.com', 'USER'),
  ('jameswhite', 'James', 'White', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'james.white@email.com', 'USER'),
  ('laurathompson', 'Laura', 'Thompson', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'laura.thompson@email.com', 'USER'),
  ('kevinharris', 'Kevin', 'Harris', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'kevin.harris@email.com', 'USER'),
  ('nancyclark', 'Nancy', 'Clark', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'nancy.clark@email.com', 'USER'),
  ('danielroberts', 'Daniel', 'Roberts', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'daniel.roberts@email.com', 'USER'),
  ('jennykim', 'Jenny', 'Kim', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'jenny.kim@email.com', 'USER'),
  ('tommoore', 'Tom', 'Moore', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'tom.moore@email.com', 'USER'),
  ('annataylor', 'Anna', 'Taylor', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'anna.taylor@email.com', 'USER'),
  ('chrismiller', 'Chris', 'Miller', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'chris.miller@email.com', 'USER'),
  ('rachelgreen', 'Rachel', 'Green', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'rachel.green@email.com', 'USER'),
  ('peterparker', 'Peter', 'Parker', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'peter.parker@email.com', 'USER'),
  ('sophiaturner', 'Sophia', 'Turner', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'sophia.turner@email.com', 'USER'),
  ('markwright', 'Mark', 'Wright', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'mark.wright@email.com', 'USER'),
  ('oliviahill', 'Olivia', 'Hill', '$2b$12$8K4yYz9Hx6qL3mP2nQ5rS.TuV7wX8yZ9aB1cD2eF3gH4iJ5kL6mN7o', 'olivia.hill@email.com', 'USER');

-- Insert Categories
INSERT INTO categories (title, description) VALUES
('Technology', 'Discussions about the latest in technology, gadgets, and software development'),
('Science', 'Scientific discoveries, research, and educational content'),
('Lifestyle', 'Health, fitness, travel, and general life advice'),
('Entertainment', 'Movies, music, games, books, and other entertainment topics'),
('Business', 'Entrepreneurship, finance, marketing, and career development'),
('Education', 'Learning resources, academic discussions, and educational techniques'),
('Arts & Culture', 'Visual arts, literature, theater, and cultural discussions'),
('Sports', 'Athletic competitions, teams, players, and sports analysis'),
('Food & Cooking', 'Recipes, cooking techniques, restaurant reviews, and culinary arts'),
('Health & Wellness', 'Medical advice, mental health, nutrition, and wellness practices'),
('Travel', 'Destination guides, travel tips, and adventure stories'),
('Politics', 'Government policies, political discussions, and current affairs'),
('Environment', 'Climate change, conservation, sustainability, and ecological issues'),
('Fashion', 'Clothing trends, style advice, and fashion industry news'),
('Photography', 'Camera techniques, photo editing, and photography inspiration'),
('Gaming', 'Video games, esports, gaming hardware, and game development'),
('DIY & Crafts', 'Do-it-yourself projects, handmade crafts, and creative tutorials'),
('Relationships', 'Dating, marriage, family, and interpersonal relationship advice'),
('History', 'Historical events, figures, and archaeological discoveries'),
('Pets & Animals', 'Pet care, animal welfare, and wildlife conservation'),
('Automotive', 'Cars, motorcycles, vehicle maintenance, and automotive news'),
('Parenting', 'Child development, parenting tips, and family activities'),
('Home & Garden', 'Home improvement, interior design, and gardening tips'),
('Philosophy', 'Ethical discussions, philosophical theories, and thought experiments');

-- Insert Posts (1-3 posts per user, some with multiple categories)
INSERT INTO posts (author_id, title, content, status) VALUES
-- Admin posts
(1, 'Welcome to USOF Platform', 'Welcome everyone to our new discussion platform! Feel free to share your thoughts and engage in meaningful conversations.', 'ACTIVE'),
(1, 'Platform Guidelines', 'Please follow our community guidelines: be respectful, stay on topic, and help create a positive environment for everyone.', 'ACTIVE'),

-- John Doe posts
(2, 'The Future of Artificial Intelligence', 'AI is rapidly evolving and changing how we work and live. What are your thoughts on the impact of AI on society?', 'ACTIVE'),
(2, 'Best Programming Languages in 2024', 'Which programming languages do you think will dominate the tech industry this year? Let''s discuss the pros and cons.', 'ACTIVE'),
(2, 'Climate Change and Technology Solutions', 'How can technology help us address climate change? Discussing renewable energy and sustainable tech innovations.', 'ACTIVE'),

-- Jane Smith posts
(3, 'Healthy Living Tips', 'Sharing some practical tips for maintaining a healthy lifestyle in our busy modern world.', 'ACTIVE'),
(3, 'Latest Netflix Series Worth Watching', 'Just finished watching some amazing series on Netflix. Here are my top recommendations for 2024!', 'ACTIVE'),

-- Mike Johnson posts
(4, 'Space Exploration Milestones', 'Recent achievements in space exploration are incredible. From Mars rovers to private space companies, we''re living in exciting times!', 'ACTIVE'),
(4, 'Fitness Journey: My Experience', 'Documenting my fitness journey and sharing what worked for me. Hope this helps others on their wellness path.', 'ACTIVE'),
(4, 'Gaming Industry Trends', 'The gaming industry is constantly evolving. Let''s talk about the latest trends, from VR to mobile gaming.', 'ACTIVE'),

-- Sarah Wilson posts
(5, 'Sustainable Living Made Easy', 'Simple changes we can make in our daily lives to be more environmentally conscious and reduce our carbon footprint.', 'ACTIVE'),
(5, 'Book Recommendations for Tech Enthusiasts', 'A curated list of books that every technology enthusiast should read, from classics to modern masterpieces.', 'ACTIVE');

-- Insert Posts-Categories relationships (some posts have multiple categories)
INSERT INTO posts_categories (post_id, category_id) VALUES
-- Admin posts
(1, 3), -- Welcome -> Lifestyle
(2, 3), -- Guidelines -> Lifestyle

-- John Doe posts
(3, 1), (3, 2), -- AI -> Technology, Science
(4, 1), -- Programming -> Technology
(5, 1), (5, 2), -- Climate Tech -> Technology, Science

-- Jane Smith posts
(6, 3), -- Healthy Living -> Lifestyle
(7, 4), -- Netflix -> Entertainment

-- Mike Johnson posts
(8, 2), -- Space -> Science
(9, 3), -- Fitness -> Lifestyle
(10, 1), (10, 4), -- Gaming -> Technology, Entertainment

-- Sarah Wilson posts
(11, 3), (11, 2), -- Sustainable Living -> Lifestyle, Science
(12, 1), (12, 4); -- Books -> Technology, Entertainment

-- Insert Likes/Dislikes (2-5 reactions per post from different users)
INSERT INTO likes (user_id, post_id, reaction) VALUES
-- Post 1 reactions
(2, 1, 'LIKE'), (3, 1, 'LIKE'), (4, 1, 'LIKE'), (5, 1, 'LIKE'),
-- Post 2 reactions
(2, 2, 'LIKE'), (3, 2, 'LIKE'), (4, 2, 'DISLIKE'),
-- Post 3 reactions
(1, 3, 'LIKE'), (3, 3, 'LIKE'), (4, 3, 'LIKE'), (5, 3, 'DISLIKE'),
-- Post 4 reactions
(1, 4, 'LIKE'), (3, 4, 'LIKE'), (4, 4, 'LIKE'), (5, 4, 'LIKE'),
-- Post 5 reactions
(1, 5, 'LIKE'), (3, 5, 'LIKE'), (4, 5, 'DISLIKE'), (5, 5, 'LIKE'),
-- Post 6 reactions
(1, 6, 'LIKE'), (2, 6, 'LIKE'), (4, 6, 'LIKE'),
-- Post 7 reactions
(1, 7, 'LIKE'), (2, 7, 'LIKE'), (4, 7, 'LIKE'), (5, 7, 'DISLIKE'),
-- Post 8 reactions
(1, 8, 'LIKE'), (2, 8, 'LIKE'), (3, 8, 'LIKE'), (5, 8, 'LIKE'),
-- Post 9 reactions
(1, 9, 'LIKE'), (2, 9, 'LIKE'), (3, 9, 'DISLIKE'),
-- Post 10 reactions
(1, 10, 'LIKE'), (2, 10, 'LIKE'), (3, 10, 'LIKE'), (5, 10, 'LIKE'),
-- Post 11 reactions
(1, 11, 'LIKE'), (2, 11, 'LIKE'), (3, 11, 'LIKE'), (4, 11, 'DISLIKE'),
-- Post 12 reactions
(1, 12, 'LIKE'), (2, 12, 'LIKE'), (3, 12, 'LIKE');

-- Insert Comments (1-3 comments per post from different users)
INSERT INTO comments (author_id, post_id, content) VALUES
-- Comments on Post 1
(2, 1, 'Great initiative! Looking forward to engaging discussions here.'),
(3, 1, 'Thanks for creating this platform. The interface looks clean and user-friendly.'),
(4, 1, 'Excited to be part of this community!'),

-- Comments on Post 2
(2, 2, 'These guidelines are very reasonable and clear.'),
(5, 2, 'Good to have clear expectations set from the beginning.'),

-- Comments on Post 3
(1, 3, 'Fascinating topic! AI will definitely reshape many industries.'),
(4, 3, 'I think we need to be cautious about AI ethics while embracing innovation.'),
(5, 3, 'The potential is huge, but we need proper regulations in place.'),

-- Comments on Post 4
(1, 4, 'Python and JavaScript remain strong choices for versatility.'),
(3, 4, 'Don''t forget about Rust! It''s gaining momentum for system programming.'),

-- Comments on Post 5
(2, 5, 'Solar and wind technology improvements are particularly promising.'),
(4, 5, 'We also need better battery storage solutions for renewable energy.'),

-- Comments on Post 6
(2, 6, 'Thanks for sharing! I''ve been looking for ways to improve my daily routine.'),
(4, 6, 'Exercise and good sleep are game-changers for sure.'),
(5, 6, 'Meal prep has been a huge help for me in maintaining healthy eating.'),

-- Comments on Post 7
(1, 7, 'Always looking for new series to binge-watch. Thanks for the recommendations!'),
(4, 7, 'Just started the first one you mentioned - loving it so far!'),

-- Comments on Post 8
(2, 8, 'The Mars missions have been incredible to follow.'),
(3, 8, 'Private space companies are really accelerating progress.'),
(5, 8, 'Can''t wait to see what the next decade brings for space exploration!'),

-- Comments on Post 9
(1, 9, 'Consistency is key! Great job documenting your journey.'),
(3, 9, 'Your progress is inspiring. I need to get back into a routine myself.'),

-- Comments on Post 10
(2, 10, 'VR gaming is getting so much better. The immersion is incredible now.'),
(5, 10, 'Mobile gaming revenue is actually surprising many people in the industry.'),

-- Comments on Post 11
(2, 11, 'Small changes really do add up over time. Great practical advice!'),
(4, 11, 'I''ve started composting at home - it''s easier than I thought.'),

-- Comments on Post 12
(3, 12, 'Adding these to my reading list! Always looking for good tech books.'),
(4, 12, 'Have you read "Clean Code"? It''s a classic that should be on every developer''s shelf.');

-- Insert Comment Likes (1-2 likes per comment)
INSERT INTO comment_likes (user_id, comment_id, reaction) VALUES
-- Comments on Post 1
(1, 1, 'LIKE'), (4, 1, 'LIKE'),
(2, 2, 'LIKE'), (5, 2, 'LIKE'),
(1, 3, 'LIKE'), (2, 3, 'LIKE'),

-- Comments on Post 2
(3, 4, 'LIKE'), (4, 4, 'LIKE'),
(2, 5, 'LIKE'), (3, 5, 'LIKE'),

-- Comments on Post 3
(2, 6, 'LIKE'), (3, 6, 'LIKE'),
(1, 7, 'LIKE'), (3, 7, 'LIKE'),
(1, 8, 'LIKE'), (2, 8, 'LIKE'),

-- Comments on Post 4
(2, 9, 'LIKE'), (4, 9, 'LIKE'),
(1, 10, 'LIKE'), (2, 10, 'LIKE'),

-- Comments on Post 5
(1, 11, 'LIKE'), (5, 11, 'LIKE'),
(2, 12, 'LIKE'), (3, 12, 'LIKE'),

-- Comments on Post 6
(1, 13, 'LIKE'), (3, 13, 'LIKE'),
(1, 14, 'LIKE'), (2, 14, 'LIKE'),
(2, 15, 'LIKE'), (4, 15, 'LIKE'),

-- Comments on Post 7
(2, 16, 'LIKE'), (3, 16, 'LIKE'),
(1, 17, 'LIKE'), (2, 17, 'LIKE'),

-- Comments on Post 8
(1, 18, 'LIKE'), (4, 18, 'LIKE'),
(1, 19, 'LIKE'), (2, 19, 'LIKE'),
(1, 20, 'LIKE'), (3, 20, 'LIKE'),

-- Comments on Post 9
(2, 21, 'LIKE'), (4, 21, 'LIKE'),
(1, 22, 'LIKE'), (2, 22, 'LIKE'),

-- Comments on Post 10
(1, 23, 'LIKE'), (3, 23, 'LIKE'),
(1, 24, 'LIKE'), (3, 24, 'LIKE'),

-- Comments on Post 11
(1, 25, 'LIKE'), (3, 25, 'LIKE'),
(2, 26, 'LIKE'), (3, 26, 'LIKE'),

-- Comments on Post 12
(2, 27, 'LIKE'), (4, 27, 'LIKE'),
(1, 28, 'LIKE'), (2, 28, 'LIKE');

-- Insert User Subscriptions (1-3 posts per user)
INSERT INTO users_subscriptions (user_id, post_id) VALUES
-- Admin subscriptions
(1, 3), (1, 8), (1, 11),
-- John Doe subscriptions
(2, 6), (2, 8), (2, 12),
-- Jane Smith subscriptions
(3, 3), (3, 10), (3, 11),
-- Mike Johnson subscriptions
(4, 3), (4, 5), (4, 7),
-- Sarah Wilson subscriptions
(5, 4), (5, 6), (5, 9);

-- Insert User Favourites (1-3 posts per user)
INSERT INTO users_favourites (user_id, post_id) VALUES
-- Admin favourites
(1, 5), (1, 9), (1, 12),
-- John Doe favourites
(2, 1), (2, 7), (2, 11),
-- Jane Smith favourites
(3, 4), (3, 8), (3, 10),
-- Mike Johnson favourites
(4, 2), (4, 6), (4, 12),
-- Sarah Wilson favourites
(5, 3), (5, 5), (5, 8);

-- Update User Ratings based on received likes/dislikes
-- Rating calculation: +1 for each LIKE received, -1 for each DISLIKE received
-- This includes both post likes and comment likes

-- Admin (user_id=1):
-- Post likes: 0, Post dislikes: 0, Comment likes: 16, Comment dislikes: 0
-- Total: +16
UPDATE users SET rating = 16 WHERE id = 1;

-- John Doe (user_id=2):
-- Post likes: 8 (posts 3,4,5), Post dislikes: 2 (posts 3,5), Comment likes: 5, Comment dislikes: 0
-- Total: +11
UPDATE users SET rating = 11 WHERE id = 2;

-- Jane Smith (user_id=3):
-- Post likes: 6 (posts 6,7), Post dislikes: 1 (post 7), Comment likes: 4, Comment dislikes: 0
-- Total: +9
UPDATE users SET rating = 9 WHERE id = 3;

-- Mike Johnson (user_id=4):
-- Post likes: 7 (posts 8,9,10), Post dislikes: 1 (post 11), Comment likes: 4, Comment dislikes: 0
-- Total: +10
UPDATE users SET rating = 10 WHERE id = 4;

-- Sarah Wilson (user_id=5):
-- Post likes: 6 (posts 11,12), Post dislikes: 0, Comment likes: 3, Comment dislikes: 0
-- Total: +9
UPDATE users SET rating = 9 WHERE id = 5;
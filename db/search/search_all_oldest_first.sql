SELECT posts.id, title, content, img, profile_pic, date_created, username FROM helo_posts AS posts
JOIN helo_users AS users ON users.id = posts.author_id
WHERE lower(title) LIKE $1
ORDER BY date_created ASC;


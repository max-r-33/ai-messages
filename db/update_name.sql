UPDATE users
SET name = $2
WHERE email = $1;

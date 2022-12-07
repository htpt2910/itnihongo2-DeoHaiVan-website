# Để kiểm tra xem kết nối db được chưa: 
- docker ps: xem các container đang chạy
- docker exec -it itnihongo2-deohaivan-website-db-1 /bin/bash (truy cập vào db)
- psql -U postgres (truy cập vào postgres)
- \l hoặc \list (xem tất cả databases)
- \c postgres_db (truy cập vào db của project)
- \dt (xem tất cả các table)
- drop table users,comments,likes,posts,places;
- default pass 12345678
## Lưu ý:
Đây t chỉ code mẫu cái api này để test connection giữa backend với db, ai làm api liên quan tới user thì nhớ làm rồi tạo lại cho đúng nghe

### Một số lệnh khác như select, create table, .... xem [docs](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/)
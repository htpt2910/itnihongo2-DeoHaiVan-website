from app.models.user import User
from app.models.post import Post
from app.models.comment import Comment
from app.models.place import Place
from app.models.like import Like

def Seed_db(SessionLocal):
    # Seed db
    s = SessionLocal()

    # User
    user1 = User()
    user1.username = 'John'
    user1.email = 'jc123@gmail.com'
    user1.name = 'John Connor'
    user1.age = 25
    user1.image = 'https://upload.wikimedia.org/wikipedia/en/e/e8/John_Connor_%28Edward_Furlong%29.jpg'
    user1.hashed_password = '12345678'

    user2 = User()
    user2.username = 'Sarah'
    user2.email = 'sarah184@gmail.com'
    user2.name = 'Sarah Connor'
    user2.age = 23
    user2.image = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sarah_Connor_%28Linda_Hamilton%29.jpg/220px-Sarah_Connor_%28Linda_Hamilton%29.jpg'
    user2.hashed_password = '87654321'

    # Place

    place1 = Place()
    place1.address = '39 Ngô Gia Tự'
    place1.name = 'Cầu Rồng'

    place2 = Place()
    place2.address = '63 Tôn Đức Thắng'
    place2.name = 'Cầu Trần Thị Lý'

    # Post

    post1 = Post()
    post1.user_id = 2
    post1.content = 'Đẹp'
    post1.post_time = '2022-05-15 18:00:00'
    post1.place_id = 1
    post1.image = 'https://static.vinwonders.com/2022/04/cau-rong-da-nang-1-1.jpg'
    post1.rating = 5

    post2 = Post()
    post2.user_id = 1
    post2.content = 'Đẹp'
    post2.post_time = '2022-05-13 15:32:00'
    post2.place_id = 1
    post2.image = 'https://statics.vinpearl.com/cau-rong-da-nang-0_1629438622.png'
    post2.rating = 4

    # Comment

    comment1 = Comment()
    comment1.comment_user_id = 1
    comment1.post_id = 1
    comment1.content = 'adu vjp'
    comment1.comment_time = '2022-05-13 18:32:00'

    comment2 = Comment()
    comment2.comment_user_id = 2
    comment2.post_id = 1
    comment2.content = 'cool'
    comment2.comment_time = '2022-05-13 18:33:00'

    comment3 = Comment()
    comment3.comment_user_id = 1
    comment3.post_id = 1
    comment3.content = 'uk'
    comment3.comment_time = '2022-05-13 18:38:00'

    # Like

    like1 = Like()
    like1.like_user_id = 1
    like1.post_id = 1

    like2 = Like()
    like2.like_user_id = 2
    like2.post_id = 1

    s.add(user1)
    s.add(user2)
    s.add(place1)
    s.add(place2)
    s.add(post1)
    s.add(post2)
    s.add(comment1)
    s.add(comment2)
    s.add(comment3)
    s.add(like1)
    s.add(like2)
    s.commit()
    s.close()



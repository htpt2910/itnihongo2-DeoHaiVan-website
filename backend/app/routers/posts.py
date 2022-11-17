from fastapi import APIRouter

router = APIRouter()


@router.get("/posts/", tags=["posts"])
async def read_posts():
    return [{"id": "Rick"}, {"username": "Morty"}]


@router.get("/posts/me", tags=["posts"])
async def read_posts_me():
    return {"username": "fakecurrentuser"}


@router.get("/posts/{username}", tags=["posts"])
async def read_posts(username: str):
    return {"username": username}

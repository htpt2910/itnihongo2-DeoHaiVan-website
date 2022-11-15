from fastapi import APIRouter

router = APIRouter()


@router.get("/posts/", tags=["posts"])
async def read_posts():
    return [{"username": "Rick"}, {"username": "Morty"}]




import "./stories.css";

export const Stories = () => {
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://tourismdanang.com/wp-content/uploads/2020/05/danangfantasticitycom07_1.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://tourismdanang.com/wp-content/uploads/2020/05/cau-vom-ca.jpg",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://tourismdanang.com/wp-content/uploads/2020/05/duongray.jpg",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://tourismdanang.com/wp-content/uploads/2020/05/121.jpg",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <span>{"Me"}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

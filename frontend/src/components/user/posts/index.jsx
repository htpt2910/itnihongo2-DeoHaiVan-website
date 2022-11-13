import React from "react";
import { Post } from "../post";
import "./posts.css";

const posts = [
  {
    id: 1,
    name: "John Doe",
    userId: 1,
    profilePic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    desc: "Mấy ai biết rằng ngay dưới chân đèo Hải Vân hùng vĩ có cả một chiếc “cổng trời” lên hình siêu đẹp, đó chính là cầu vòm Đồn Cả. Ở đây có suối đá rất mát các bạn có thể cầm theo đồ có thể tổ chức buổi ăn uống nhỏ tại đây.",
    img: "https://tourismdanang.com/wp-content/uploads/2020/05/danangfantasticitycom07_1.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    userId: 2,
    profilePic:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    desc: "Nhắc tới Cây thông cô đơn, người ta chỉ nghĩ ngay tới thành phố Đà Lạt, thế nhưng giữa con đèo được mệnh danh là “thiên hạ đệ nhất hùng quan” – đèo Hải Vân cũng có một cây thông sừng sững giữa trời biển bao la đó! ",
    img: "https://tourismdanang.com/wp-content/uploads/2020/05/vissithue_check-in-cay-thong-co-don-deo-Hai-van-1.jpg",
  },
  {
    id: 3,
    name: "Jane Doe",
    userId: 2,
    profilePic:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    desc: "Ghé Đà Nẵng, bạn đừng bỏ qua một trải nghiệm rất thú vị đó là “uống cafe giữa đèo Hải Vân” ở tiệm cafe Xóm Núi. Đặc biệt hòn Đá Cụ Rùa sau quán đang được các tín đồ “sống ảo” check-in ầm ầm đó.",
    img: "https://tourismdanang.com/wp-content/uploads/2020/05/da-nang-hon-da-cu-rua-da-nang-5.jpg",
  },
  {
    id: 4,
    name: "Jane Doe",
    userId: 2,
    profilePic:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    desc: "Có khoảng 4 khúc cua chữ U khá nguy hiểm, trong đó đoạn vừa qua Hải Vân Quan hướng ra Huế là điểm được check-in nhiều nhất. Bạn có thể dừng xe ở đường tránh ngay khúc cua và chụp ảnh. Tuy nhiên trước khi muốn sở hữu bức hình đẹp, bạn nên cẩn thận với xe cộ đi ngang qua đây.",
    img: "https://tourismdanang.com/wp-content/uploads/2020/05/A%CC%89nh-chu%CC%A3p-Ma%CC%80n-hi%CC%80nh-2020-05-25-lu%CC%81c-16.20.41.png",
  },
];

export const Posts = () => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

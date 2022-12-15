import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer_wrapper">
      <div className="container">
        <div className="footer">
          <a className="title" href="/">Hải Vân Quán</a>
          <p className="desc">
            Nơi chia sẻ những hành trình.
          </p>
          <div className="input-container">
            <input className="input" type="text" placeholder="Your email" />
            <button className="button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

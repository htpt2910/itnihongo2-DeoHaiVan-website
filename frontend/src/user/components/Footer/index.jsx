import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer_wrapper">
      <div className="container">
        <div className="footer">
          <h1 className="title">Hai Van Quan</h1>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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

// import './App.scss';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./app.scss";

function App() {
  return (
    <div>
      <div id="nav">
        <div id="top-bar" class="">
          <div class="container d-flex justify-content-between">
            <div>
              <a href="">Cart</a>
              <a href="">Orders</a>
              <a href="">Track Orders</a>
              <a href="">Wishlist</a>
            </div>
            <div class="d-flex">
              <a href="">Logout</a>
              <div id="social-media">
                <span>Follow Us</span>
                <a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div id="nav-search">
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-sm-2">
                <img src="https://via.placeholder.com/150x70" alt="gharagan logo"/>
              </div>
              <div class="col">
                <div id="search" class="d-flex align-items-center justify-content-center">
                  <div class="d-flex" id="container">
                    <div id="search-icon">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <div id="search-input">
                      <input type="text" placeholder="Search for Products"/>
                    </div>
                  </div>

                </div>
              </div>
              <div class="col-sm-4 d-flex justify-content-between">
                <a href="#" class="icon-btn">
                  <span id="badge">1</span>
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                  <span id="label">Cart</span>
                </a>
                <a href="#" class="icon-btn">
                  <span id="badge">1</span>
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                  <span id="label">Wishlist</span>
                </a>
                <div class="profile d-flex align-items-center">
                  <i class="fa fa-user-o" aria-hidden="true"></i>
                  <div>
                    <div class="user">Welcome user</div>
                    <a href="#">Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div id="nav-bar">
          <div class="container">
            <div class="d-flex flex-wrap">
              <a href="#">Nav component</a>
              <a href="#">Nav component</a>
              <a href="#">Nav component</a>
              <a href="#">Nav component</a>
              <a href="#">Nav component</a>
              <a href="#">Nav component</a>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="owl-carousel owl-theme">
        <div class="item">
          <img src="http://via.placeholder.com/1080x500" />
        </div>
        <div class="item">
          <h4>2</h4>
        </div>
        <div class="item">
          <img src="http://via.placeholder.com/1080x500" />
        </div>
        <div class="item">
          <h4>4</h4>
        </div>
        <div class="item">
          <img src="http://via.placeholder.com/1080x500" />
        </div>
        <div class="item">
          <h4>6</h4>
        </div>
        <div class="item">
          <h4>7</h4>
        </div>
        <div class="item">
          <h4>8</h4>
        </div>
        <div class="item">
          <h4>9</h4>
        </div>
        <div class="item">
          <h4>10</h4>
        </div>
        <div class="item">
          <h4>11</h4>
        </div>
        <div class="item">
          <h4>12</h4>
        </div>
      </div> */}


      <div class="container">



      </div>

      <div class="container-fluid">
        <div id="social" class="row">
          <div class="col-sm-4 red">
            <i class="fa fa-instagram" aria-hidden="true"></i>
            <span class="title">Follow on Instagram</span>
            <span class="hashtag">#dsafsdfsdf</span>
          </div>
          <div class="col-sm-4 blue">
            <i class="fa fa-facebook" aria-hidden="true"></i>
            <span class="title">Follow on Facebook</span>
            <span class="hashtag">#dsafsdfsdf</span>
          </div>

          <div class="col-sm-4 red">
            <i class="fa fa-youtube-play" aria-hidden="true"></i>
            <span class="title">Subscribe on youtube</span>
            <span class="hashtag">#dsafsdfsdf</span>
          </div>
        </div>
      </div>

      <footer>
        <div class="container">
          <div id="services" class="row">
            <div class="col-sm-3 d-flex service">
              <i class="fa fa-truck" aria-hidden="true"></i>
              <div>
                <div class="title">Fast and free delivery</div>
                <div class="summary">Free delivery inside ktm</div>
              </div>
            </div>
            <div class="col-sm-3 d-flex service">
              <i class="fa fa-money" aria-hidden="true"></i>
              <div>
                <div class="title">Money back guarentee</div>
                <div class="summary">Moneyback guarentee within 7 days</div>
              </div>
            </div>
            <div class="col-sm-3 d-flex service">
              <i class="fa fa-shield" aria-hidden="true"></i>
              <div>
                <div class="title">Secure online payment</div>
                <div class="summary">We posess secure payment certification</div>
              </div>
            </div>
            <div class="col-sm-3 d-flex service">
              <i class="fa fa-paperclip" aria-hidden="true"></i>
              <div>
                <div class="title">24/7 customer support</div>
                <div class="summary">Customer support on your inconveniences</div>
              </div>
            </div>
          </div>
          <hr class="my-5"/>

            <div class="row">
              <div class="col-sm-3" id="about">
                <div class="image-container">
                  <img src="http://via.placeholder.com/200x200"/>
                </div>
                <span>This is some info about e-commerce site</span>
              </div>
              <div class="col-sm-6 row" id="nav">
                <div class="col-sm-4 d-flex flex-column">
                  <h6>Title</h6>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                </div>
                <div class="col-sm-4 d-flex flex-column">
                  <h6>Title</h6>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                </div>
                <div class="col-sm-4 d-flex flex-column">
                  <h6>Title</h6>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                  <a href="#">Link</a>
                </div>
              </div>

              <div class="col-sm-3" id="more">

                <h6>Subscribe to our newsletter</h6>
                <div class="newsletter">
                  <input type="text" placeholder="Your email"/>
                    <button type="submit">Subscribe</button>
                </div>

                <div class="social-links">
                  <a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href=""> <i class="fa fa-at" aria-hidden="true"></i></a>
                  <a href=""><i class="fa fa-whatsapp" aria-hidden="true"></i></a>
                </div>

                <h6>Payment Partners</h6>
                <div class="payments">
                  <a href="">
                    <img src="https://www.nepalitimes.com/wp-content/uploads/2021/07/Esewa-Remittance-Payment.png"/>
                  </a>
                  <a href="">
                    <img src="https://upload.wikimedia.org/wikipedia/en/f/fd/Khalti_Digital_Wallet_Logo.png?20191113065617"/>
                  </a>
                  <a href="">
                    <img src="https://www.imepay.com.np/wp-content/uploads/2020/10/IME-Pay-Icon.png"/>
                  </a>
                </div>

              </div>

            </div>
        </div>

      </footer>

    </div>
  );
}

export default App;

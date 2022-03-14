export const Footer = () => {
    return (
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
                <hr class="my-5" />

                <div class="row">
                    <div class="col-sm-3" id="about">
                        <div class="image-container">
                            <img src="http://via.placeholder.com/200x200" />
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
                            <input type="text" placeholder="Your email" />
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
                                <img src="https://www.nepalitimes.com/wp-content/uploads/2021/07/Esewa-Remittance-Payment.png" />
                            </a>
                            <a href="">
                                <img src="https://upload.wikimedia.org/wikipedia/en/f/fd/Khalti_Digital_Wallet_Logo.png?20191113065617" />
                            </a>
                            <a href="">
                                <img src="https://www.imepay.com.np/wp-content/uploads/2020/10/IME-Pay-Icon.png" />
                            </a>
                        </div>

                    </div>

                </div>
            </div>

        </footer >
    );
}
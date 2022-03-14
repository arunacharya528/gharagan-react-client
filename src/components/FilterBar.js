export const FilterBar = () => {
    return (
        <div id="sidebar">
            <div class="accordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne">
                            Electronic appliances
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="product-list">
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo">
                            Shoes
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div class="product-list">
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree">
                            Gadgets
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div class="product-list">
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h6>Price</h6>
            <input type="range" class="form-range" id="customRange1" />

            <div class="d-flex">
                <div class="form-group w-50  px-1">
                    <label for="min">Min</label>
                    <input type="text" class="form-control" id="min" />
                </div>
                <div class="form-group w-50 px-1">
                    <label for="max">Max</label>
                    <input type="text" class="form-control" id="max" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 my-2">Apply</button>

            <hr />
            <h6>Brands</h6>
            <div class="product-list">
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>

            </div>
        </div>
    );
}
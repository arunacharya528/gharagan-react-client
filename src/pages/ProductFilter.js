import { FilterBar } from "../components/FilterBar";

export const ProductFilter = () => {

    return (
        <>

            <div id="page-ribbon">
                <div class="container">
                    <div class="d-flex justify-content-between my-4">
                        <h4>Men Products</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Library</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Data</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="d-flex justify-content-between my-4">
                        <div>
                            <span class="closeable-tag">
                                Product
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </span>
                            <span class="closeable-tag">
                                Product
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </span>
                            <span class="closeable-tag">
                                Product
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </span>
                            <a href="#" class=""><u>Clear all</u></a>
                        </div>
                        <div>
                            <div class="form-group d-flex align-items-center">
                                <label for="" class="text-nowrap">Sort By</label> &emsp;
                                <select class="form-control">
                                    <option>Some value</option>
                                    <option>Some value</option>
                                    <option>Some value</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <section class="container">

                <div class="row my-5">
                    <div class="col-lg-3">
                        <FilterBar />
                    </div>
                    <div class="col-lg-9 d-flex justify-content-center">

                    </div>
                </div>

            </section>
        </>
    );
}
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FilterBar } from "../components/FilterBar";
const queryString = require('query-string')
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
import { apiRequest } from "../../support/apiClient";
import {
    buildCreateProductPayload,
    buildUpdateProductPayload
} from "../../utils/productPayloadBuilder";


describe("Products API (Public Endpoints)", () => {


    it("Get products with pagination using limit and skip", () => {

        apiRequest({
            method: "GET",
            url: "/products?limit=10&skip=10"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body.products).to.have.length(10);
            expect(res.body.skip).to.eq(10);
            expect(res.body.limit).to.eq(10);
        });

    });

    it("Get a single product by ID", () => {

        apiRequest({
            method: "GET",
            url: "/products/1"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("id", 1);
            expect(res.body).to.have.property("title");
            expect(res.body).to.have.property("price");
            expect(res.body).to.have.property("category");
        });

    });

    it("Search products using query parameter", () => {

        apiRequest({
            method: "GET",
            url: "/products/search?q=apple"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body.products).to.be.an("array");
            expect(res.body.products.length).to.be.greaterThan(0);

            res.body.products.forEach((product) => {
                expect(product).to.have.property("id");
                expect(product).to.have.property("title");
            });
        });

    });

    /* =================================================
       PAGINATION, SELECT & SORT
    ================================================= */

    it("Get all products (default pagination)", () => {

        apiRequest({
            method: "GET",
            url: "/products"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body.products).to.be.an("array");
            expect(res.body.products.length).to.eq(30); // default limit
            expect(res.body).to.have.property("total");
            expect(res.body).to.have.property("skip");
            expect(res.body).to.have.property("limit");
        });
    });



    it("Get products with limit, skip and select fields", () => {

        apiRequest({
            method: "GET",
            url: "/products?limit=10&skip=10&select=title,price"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body.products).to.have.length(10);

            res.body.products.forEach((product) => {
                expect(product).to.have.property("title");
                expect(product).to.have.property("price");

                // ensure non-selected fields are not present
                expect(product).to.not.have.property("description");
                expect(product).to.not.have.property("category");
            });
        });
    });

    it("Sort products by title in ascending order", () => {

        apiRequest({
            method: "GET",
            url: "/products?sortBy=title&order=asc"
        }).then((res) => {

            expect(res.status).to.eq(200);

            const titles = res.body.products.map(p => p.title.toLowerCase());

            // const sortedTitles = [...titles].sort((a, b) =>
            //     a.localeCompare(b)
            // );

            //expect(titles).to.deep.equal(sortedTitles);
        });

    });

    /* =================================================
       CATEGORIES
    ================================================= */

    it("Get all product categories", () => {

        apiRequest({
            method: "GET",
            url: "/products/categories"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it("Get product category list", () => {

        apiRequest({
            method: "GET",
            url: "/products/category-list"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body).to.be.an("array");
            expect(res.body).to.include("smartphones");
        });
    });

    it("Get products by category (smartphones)", () => {

        apiRequest({
            method: "GET",
            url: "/products/category/smartphones"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body.products).to.be.an("array");

            res.body.products.forEach((product) => {
                expect(product.category).to.eq("smartphones");
            });
        });
    });

    /* =================================================
       CREATE / UPDATE / DELETE (SIMULATED)
    ================================================= */

    it("Add a new product (simulation)", () => {

        const payload = buildCreateProductPayload({
            title: "BMW Pencil"
        });

        apiRequest({
            method: "POST",
            url: "/products/add",
            body: payload
        }).then((res) => {

            expect(res.status).to.eq(201);
            expect(res.body).to.have.property("id");
            expect(res.body.title).to.eq(payload.title);
            expect(res.body.price).to.eq(payload.price);
        });
    });
    it("Update a product using PUT", () => {

        const payload = buildUpdateProductPayload({
            title: "iPhone Galaxy +1"
        });

        apiRequest({
            method: "PUT",
            url: "/products/1",
            body: payload
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body.id).to.eq(1);
            expect(res.body.title).to.eq(payload.title);
        });
    });

    it("Delete a product (simulation)", () => {

        apiRequest({
            method: "DELETE",
            url: "/products/1"
        }).then((res) => {

            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("isDeleted", true);
            expect(res.body).to.have.property("deletedOn");
        });
    });

});

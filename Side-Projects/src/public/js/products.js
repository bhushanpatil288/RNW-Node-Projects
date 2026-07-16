document.addEventListener("DOMContentLoaded", () => {
    listenForProductDelete();
    listenForCategoryFilter();
});


const listenForProductDelete = () => {
    document.addEventListener("click", async (e) => {
        const deleteBtn = e.target.closest(".delete-product-btn");
        if (!deleteBtn) return;
        const id = deleteBtn.dataset.deleteId;

        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/products/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete product");
            } else {
                window.location.reload();
            }

            console.log(`Product ${id} deleted`);
        } catch (e) {
            console.log(e);
        }
    })
};

const listenForCategoryFilter = () => {
    document.addEventListener("click", (e) => {
        const catBtn = e.target.closest(".category-btn");
        if (!catBtn) return;

        e.preventDefault();

        const catId = catBtn.dataset.categoryId;
        window.location.href = `/products/filter/${catId}`;
    });
};
document.addEventListener("DOMContentLoaded", () => {
    listenForProductDelete();
});


const listenForProductDelete = () => {
    document.addEventListener("click", async (e) => {
        const deleteBtn = e.target.closest(".delete-product-btn");
        if (!deleteBtn) return;
        const id = deleteBtn.dataset.deleteId;

        try {
            const res = await fetch(`http://localhost:8080/products/remove/${id}`, {
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
}
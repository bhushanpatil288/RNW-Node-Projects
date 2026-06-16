document.addEventListener("DOMContentLoaded", () => {
    ListenForBtnClick();
})

const ListenForBtnClick = () => {
    document.addEventListener("click", async (e) => {
        const button = e.target.closest(".deleteBtn, .editBtn");

        if (!button) return;

        if (button.classList.contains("deleteBtn")) {
            const confirmed = confirm(
                "Are you sure you want to delete this student?"
            );

            if (!confirmed) return;
            const id = button.dataset.id;
            console.log("Delete:", id);

            const deleted = await deleteStudent(id);

            if (deleted) {
                const row = button.closest("tr");
                row?.remove();
            }

        }

        if (button.classList.contains("editBtn")) {
            const id = button.dataset.id;
            console.log("Edit", id);
        }
    })
}

const deleteStudent = async (id) => {
    try {
        const res = await fetch(`/delete/${id}`, {
            method: "DELETE"
        })

        console.log("status:", res.status);
        const data = await res.json();
        console.log(data)
        alert("Student has been delete")

        return true;
    } catch (e) {
        console.log("error");
        alert("Failed to delete");
        return false;
    }
}

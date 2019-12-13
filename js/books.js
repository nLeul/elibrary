const tableBody = document.querySelector("tbody");
async function getBookList() {
    let bookJson = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list");
    let books = await bookJson.json();
    books.forEach(element => {
        const tr = document.createElement("tr");
        const aTag = document.createElement('a');
        const btn = document.createElement('a');
        aTag.setAttribute('href', `editbook.html?bookId=${element.bookId}`);
        aTag.setAttribute('class', "btn btn-primary");
        btn.setAttribute('href', `#exampleModal`);
        btn.setAttribute('class', "btn btn-primary");
        btn.setAttribute('id', "mybutton");
        btn.setAttribute('data-toggle', `modal`);
        btn.setAttribute('data-bookid', `${element.bookId}`);
        btn.setAttribute('data-isbn', `${element.isbn}`);
        btn.setAttribute('data-title', `${element.title}`);
        btn.setAttribute('data-overduefee', `${element.overdueFee}`);
        btn.setAttribute('data-publisher', `${element.publisher}`);
        btn.setAttribute('data-datepublished', `${element.datePublished}`);

        for (let val in element) {
            const td = document.createElement("td");
            aTag.innerText = `Edit`;
            btn.innerText = `                                Delete`;
            td.textContent = element[val];
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);

        tr.appendChild(aTag);
        tr.appendChild(btn);
    });
}
getBookList();

$(document).ready(function () {
    $("#exampleModal").on("show.bs.modal", function (event) {
        const link = $(event.relatedTarget);
        const bookId = link.data("bookid");
        const isbn = link.data("isbn");
        const title = link.data("title");
        const overdueFee = link.data("overduefee");
        const Publisher = link.data("publisher");
        const datePublished = link.data("datepublished");

        const modal = $(this);

        // using JQuery:
        $("#bookID").text("BOOK ID: " + `${bookId}`);
        $("#isbn ").text("ISBN: " + `${isbn}`);
        $("#title").text("TITLE: " + `${title}`);
        $("#overdueFee").text("OVERDUE FEE: " + `${overdueFee}`);
        $("#publisher").text("PUBLISHER: " + `${Publisher}`);
        $("#datePublished").text("DATE PUBLISHED: " + `${datePublished}`);

        document.getElementById("deleteModalId").addEventListener("click", function deleteValue() {
            fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`, {
                method: "DELETE"
            })
            $("#exampleModal").modal("hide")
        })
    });
});

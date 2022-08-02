const setEditModal = (resid) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${resid}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        restaurent, 
        item1, 
        item2, 
        item3,
        item4
    } = book;

    document.getElementById('resid').value = resid;
    document.getElementById('restaurent').value = restaurent;
    document.getElementById('item1').value = item1;
    document.getElementById('item2').value = item2;
    document.getElementById('item3').value = item3;
    document.getElementById('item4').value = item4;

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${resid}`;
}


const deleteBook = (resid) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${resid}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.restaurent}</h5>
                        <!-- <h6 class="card-subtitle mb-2 text-muted">${book.resid}</h6> -->
                        <h6>Menu</h6>

                        <div>Item1: ${book.item1}</div>
                        <div>Item2: ${book.item2}</div>
                        <div>Item3: ${book.item3}</div>
                        <div>Item4: ${book.item4}</div>
                       

                        <hr>

                        <button type="button" class="btn btn-danger"  onClick="deleteBook(${book.resid})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.resid})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();
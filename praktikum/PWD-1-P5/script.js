// Ketentuan 1: Minimal 6 produk dalam array of object (id, nama, harga, stok)
const products = [
    { id: 1, nama: "Mouse Wireless Logitech", harga: 175000, stok: 8 },
    { id: 2, nama: "Keyboard Mechanical RGB", harga: 450000, stok: 5 },
    { id: 3, nama: "Headset Gaming 7.1", harga: 320000, stok: 6 },
    { id: 4, nama: "Monitor IPS 24 Inch", harga: 1850000, stok: 3 },
    { id: 5, nama: "Webcam Full HD 1080p", harga: 260000, stok: 7 },
    { id: 6, nama: "Mousepad Gaming XL", harga: 95000, stok: 12 }
];

// Ketentuan 6: Gunakan $(document).ready() pada semua kode jQuery
$(document).ready(function () {

    // Fungsi menampilkan daftar produk menggunakan createElement(), createTextNode(), appendChild()
    function renderProducts() {
        const productGrid = document.getElementById("productGrid");
        productGrid.innerHTML = "";

        for (let i = 0; i < products.length; i++) {
            const item = products[i];

            const card = document.createElement("div");
            card.className = "product-card";
            card.setAttribute("data-name", item.nama.toLowerCase());

            const title = document.createElement("div");
            title.className = "product-title";
            title.appendChild(document.createTextNode(item.nama));

            const price = document.createElement("div");
            price.className = "product-price";
            price.appendChild(document.createTextNode("Rp " + item.harga.toLocaleString("id-ID")));

            const stock = document.createElement("div");
            stock.className = "product-stock";
            stock.id = "stock-product-" + item.id;
            stock.appendChild(document.createTextNode("Stok: " + item.stok));

            const btnAdd = document.createElement("button");
            btnAdd.className = "btn btn-add-cart";
            btnAdd.setAttribute("data-id", item.id);
            btnAdd.appendChild(document.createTextNode("Tambah ke Keranjang"));

            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(stock);
            card.appendChild(btnAdd);

            productGrid.appendChild(card);
        }
    }

    // Fungsi menghitung ulang jumlah item & total harga menggunakan .text()
    function updateCartSummary() {
        let totalItems = 0;
        let totalPrice = 0;

        $("#cartList .cart-item").each(function () {
            const qty = parseInt($(this).attr("data-qty"));
            const price = parseInt($(this).attr("data-price"));
            totalItems += qty;
            totalPrice += qty * price;
        });

        $("#totalItems").text(totalItems);
        $("#totalPrice").text("Rp " + totalPrice.toLocaleString("id-ID"));

        if (totalItems === 0 && $("#cartList .empty-msg").length === 0) {
            $("#cartList").append('<li class="empty-msg">Keranjang masih kosong</li>');
        }
    }

    // Render awal saat halaman dibuka
    renderProducts();

    // Event: Tambah ke Keranjang
    $(document).on("click", ".btn-add-cart", function () {
        const productId = parseInt($(this).attr("data-id"));
        const product = products.find(p => p.id === productId);

        // Ketentuan 4: alert() jika stok produk habis
        if (product.stok <= 0) {
            alert("Maaf, stok untuk produk '" + product.nama + "' sudah habis!");
            return;
        }

        // Kurangi stok produk dan perbarui tampilan stok
        product.stok--;
        $("#stock-product-" + product.id).text("Stok: " + product.stok);

        // Hapus tulisan "Keranjang masih kosong" jika ada
        $("#cartList .empty-msg").remove();

        const existingItem = $('#cartList .cart-item[data-id="' + product.id + '"]');

        if (existingItem.length > 0) {
            // Jika produk sudah ada di keranjang, tambahkan jumlahnya
            let currentQty = parseInt(existingItem.attr("data-qty")) + 1;
            existingItem.attr("data-qty", currentQty);
            existingItem.find(".item-qty").text(currentQty);
            existingItem.find(".item-subtotal").text("Rp " + (currentQty * product.harga).toLocaleString("id-ID"));
        } else {
            // Ketentuan 2 & 3: append() item baru ke keranjang dengan efek fadeIn()
            const $newItem = $(`
                <li class="cart-item" data-id="${product.id}" data-price="${product.harga}" data-qty="1" style="display: none;">
                    <div class="cart-item-info">
                        <strong>${product.nama}</strong>
                        <span><span class="item-qty">1</span> x Rp ${product.harga.toLocaleString("id-ID")} = <span class="item-subtotal">Rp ${product.harga.toLocaleString("id-ID")}</span></span>
                    </div>
                    <button class="btn-remove-item">Hapus</button>
                </li>
            `);

            $("#cartList").append($newItem);
            $newItem.fadeIn(300);
        }

        updateCartSummary();
    });

    // Event: Hapus satu item dari keranjang
    $(document).on("click", ".btn-remove-item", function () {
        const $itemRow = $(this).closest(".cart-item");
        const productId = parseInt($itemRow.attr("data-id"));
        const qtyInCart = parseInt($itemRow.attr("data-qty"));
        const product = products.find(p => p.id === productId);

        // Ketentuan 4: confirm() sebelum menghapus item
        if (confirm("Apakah Anda yakin ingin menghapus '" + product.nama + "' dari keranjang?")) {
            // Kembalikan stok produk
            product.stok += qtyInCart;
            $("#stock-product-" + product.id).text("Stok: " + product.stok);

            // Ketentuan 2 & 3: fadeOut() lalu remove()
            $itemRow.fadeOut(300, function () {
                $(this).remove();
                updateCartSummary();
            });
        }
    });

    // Event: Tombol "Kosongkan Keranjang"
    $("#clearCartBtn").click(function () {
        if ($("#cartList .cart-item").length === 0) {
            alert("Keranjang belanja sudah kosong.");
            return;
        }

        // Ketentuan 4: confirm() sebelum mengosongkan keranjang
        if (confirm("Apakah Anda yakin ingin mengosongkan seluruh isi keranjang?")) {
            // Kembalikan semua stok
            $("#cartList .cart-item").each(function () {
                const productId = parseInt($(this).attr("data-id"));
                const qty = parseInt($(this).attr("data-qty"));
                const product = products.find(p => p.id === productId);
                product.stok += qty;
                $("#stock-product-" + product.id).text("Stok: " + product.stok);
            });

            // Ketentuan 2: empty() untuk tombol Kosongkan Keranjang
            $("#cartList").empty();
            updateCartSummary();
        }
    });

    // Ketentuan 3: fadeToggle() pada panel keranjang agar bisa dibuka & ditutup
    $("#toggleCartBtn").click(function () {
        $("#cartBody").fadeToggle(300);
    });

    // Ketentuan 4: prompt() saat checkout dan tampilkan ringkasan pesanan di halaman
    $("#checkoutBtn").click(function () {
        if ($("#cartList .cart-item").length === 0) {
            alert("Keranjang masih kosong! Silakan pilih produk terlebih dahulu.");
            return;
        }

        const buyerName = prompt("Masukkan nama lengkap pembeli:");
        if (buyerName === null || buyerName.trim() === "") {
            alert("Checkout dibatalkan. Nama pembeli wajib diisi.");
            return;
        }

        let itemsListHtml = "<ul>";
        $("#cartList .cart-item").each(function () {
            const name = $(this).find("strong").text();
            const qty = $(this).attr("data-qty");
            const subtotal = $(this).find(".item-subtotal").text();
            itemsListHtml += `<li>${name} (${qty}x) - ${subtotal}</li>`;
        });
        itemsListHtml += "</ul>";

        const finalTotal = $("#totalPrice").text();

        $("#summaryContent").html(`
            <p><strong>Nama Pembeli:</strong> ${buyerName}</p>
            <p><strong>Daftar Item:</strong></p>
            ${itemsListHtml}
            <p><strong>Total Pembayaran:</strong> ${finalTotal}</p>
        `);

        $("#orderSummary").fadeIn(300);

        // Bersihkan keranjang setelah checkout berhasil (stok tidak dikembalikan karena sudah terjual)
        $("#cartList").empty();
        updateCartSummary();
    });

    // Ketentuan 5: Pencarian produk dengan val() dan toggle()
    $("#searchInput").on("keyup", function () {
        const keyword = $(this).val().toLowerCase();

        $(".product-card").each(function () {
            const productName = $(this).attr("data-name");
            const isMatch = productName.indexOf(keyword) > -1;
            $(this).toggle(isMatch);
        });
    });

});
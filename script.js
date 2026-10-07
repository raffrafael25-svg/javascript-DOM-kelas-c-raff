// =========================================================
// SCRIPT.JS - IT TO-DO LIST (MANIPULASI DOM JAVASCRIPT)
// Sesuai Modul Praktikum JavaScript DOM
// =========================================================

// 1. SELEKSI ELEMEN DOM (getElementById)
const inputTugas = document.getElementById("inputTugas");
const btnTambah = document.getElementById("btnTambah");
const daftarTugas = document.getElementById("daftarTugas");

const totalTugas = document.getElementById("totalTugas");
const tugasSelesai = document.getElementById("tugasSelesai");
const tugasBelumSelesai = document.getElementById("tugasBelumSelesai");

// 2. FUNGSI MEMPERBARUI STATISTIK REKAP TUGAS
function perbaruiStatistik() {
    const total = daftarTugas.children.length;
    const selesai = daftarTugas.querySelectorAll(".selesai").length;
    const belumSelesai = total - selesai;

    totalTugas.innerText = total;
    tugasSelesai.innerText = selesai;
    tugasBelumSelesai.innerText = belumSelesai;
}

// 3. FUNGSI MENAMBAHKAN TUGAS BARU
function tambahTugas() {
    const teksTugas = inputTugas.value.trim();

    // Validasi: Tampilkan alert jika input kosong (Sesuai Ketentuan Tugas)
    if (teksTugas === "") {
        alert("Catatan Anda tidak boleh kosong");
        return;
    }

    // A. Membuat Elemen Dinamis Baru (createElement)
    const li = document.createElement("li");

    // Container bagian kiri (Checkbox & Teks Catatan)
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    // Checkbox untuk menandai tugas yang sudah selesai
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    // Span Teks Catatan
    const spanTeks = document.createElement("span");
    spanTeks.classList.add("task-text");
    spanTeks.innerText = teksTugas;

    // Menempelkan Checkbox dan Teks ke Container Kiri
    taskContent.appendChild(checkbox);
    taskContent.appendChild(spanTeks);

    // Tombol Hapus
    const btnHapus = document.createElement("button");
    btnHapus.classList.add("btn-hapus");
    btnHapus.innerText = "Hapus";

    // B. EVENT LISTENER PADA CHECKBOX (Menandai Selesai)
    checkbox.addEventListener("change", function () {
        // Menggunakan classList.toggle untuk menambah/menghapus class 'selesai'
        li.classList.toggle("selesai");
        perbaruiStatistik();
    });

    // C. EVENT LISTENER PADA TOMBOL HAPUS (remove())
    btnHapus.addEventListener("click", function () {
        // Menghapus elemen li dari DOM
        li.remove();
        perbaruiStatistik();
    });

    // Menempelkan Konten & Tombol Hapus ke Elemen <li>
    li.appendChild(taskContent);
    li.appendChild(btnHapus);

    // D. Menempelkan Elemen <li> Baru ke Daftar <ul> (appendChild)
    daftarTugas.appendChild(li);

    // E. Mengosongkan Nilai Input Form (.value) & Update Statistik
    inputTugas.value = "";
    perbaruiStatistik();
}

// 4. EVENT LISTENER (Merespons Aksi Pengguna)

// Klik tombol "Tambah"
btnTambah.addEventListener("click", tambahTugas);

// Tekan tombol "Enter" pada Keyboard
inputTugas.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});
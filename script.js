let dataAbsensi = JSON.parse(localStorage.getItem("dataAbsensi")) || [];

// Mengisi tanggal hari ini
document.getElementById("tanggal").value =
new Date().toISOString().split("T")[0];

function tambahAbsensi() {
const nama = document.getElementById("nama").value.trim();
const tanggal = document.getElementById("tanggal").value;
const status = document.getElementById("status").value;

if (nama === "" || tanggal === "") {
    alert("Nama dan tanggal harus diisi!");
    return;
}

const data = {
    id: Date.now(),
    nama: nama,
    tanggal: tanggal,
    status: status
};

dataAbsensi.push(data);

simpanData();
tampilkanData();

document.getElementById("nama").value = "";


}

function tampilkanData() {
const daftar = document.getElementById("daftarAbsensi");

daftar.innerHTML = "";

dataAbsensi.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.nama}</td>
        <td>${data.tanggal}</td>
        <td>${data.status}</td>
        <td>
            <button 
                class="btn-hapus"
                onclick="hapusAbsensi(${data.id})">
                Hapus
            </button>
        </td>
    `;

    daftar.appendChild(row);
});

updateRekap();


}

function hapusAbsensi(id) {
if (confirm("Yakin ingin menghapus data ini?")) {
dataAbsensi = dataAbsensi.filter(data => data.id !== id);

    simpanData();
    tampilkanData();
}


}

function updateRekap() {
const hadir = dataAbsensi.filter(
data => data.status === "Hadir"
).length;

const izin = dataAbsensi.filter(
    data => data.status === "Izin"
).length;

const sakit = dataAbsensi.filter(
    data => data.status === "Sakit"
).length;

const alpa = dataAbsensi.filter(
    data => data.status === "Alpa"
).length;

document.getElementById("jumlahHadir").textContent = hadir;
document.getElementById("jumlahIzin").textContent = izin;
document.getElementById("jumlahSakit").textContent = sakit;
document.getElementById("jumlahAlpa").textContent = alpa;


}

function simpanData() {
localStorage.setItem(
"dataAbsensi",
JSON.stringify(dataAbsensi)
);
}

// Tampilkan data saat halaman dibuka
tampilkanData();
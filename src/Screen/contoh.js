var sampah = [
  {
    sampah_id: 1,
    berat: 20,
  },
];

let form = new FormData;

sampah.forEach((v, i) => {
    form.append(`sampah[${i}][sampah_id]`, v.sampah_id)
    form.append(`sampah[${i}][berat]`, v.berat)
})

console.log("ini", form)

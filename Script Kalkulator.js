
        //   Kodingan buat nunggu sampai semua elemen HTML selesai dimuat sebelum JS dijalankan
        document.addEventListener('DOMContentLoaded', function() {
            
            //  Kodingan ini buat ngambil elemen layar kalkulator, gambar status, dan semua tombol kalkulator
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  Kodingan ini buat menyimpan link gambar status: normal, sukses, dan error
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              Kodingan ini adalah function buat ganti gambar status kalkulator, berdasarkan keadaan: sukses, error, atau normal */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Kalau bukan success atau error, gambar balik ke kondisi normal
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
               Kodingan ini buat ngehapus semua isi layar kalkulator dan balikin gambar ke normal
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
               Kodingan ini buat hapus 1 karakter terakhir di layar (mirip tombol Backspace)
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Kodingan ini buat nambahin value ke layar kalkulator misalnya user klik angka atau operator
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Kodingan ini adalah function utama buat ngitung hasil kalkulator
             */
            function calculateResult() {
                //  Kodingan ini ngecek apakah layar kosong. Kalau kosong, munculin error sebentar
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //   Kodingan ini buat nge-reset layar setelah 1.5 detik
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Kodingan ini buat ngitung isi layar dengan eval()
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Di sini % diganti jadi /100 biar bisa diprose
                    ); 
                    
                    //  Kodingan ini ngecek apakah hasil perhitungan valid
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); // Mengubah gambar jadi sukses
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Gambar menjadi error
                    setTimeout(clearDisplay, 1500);
                }
            }


            //    Kodingan ini buat nge-handle klik di semua tombol kalkulator
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Switch case dipakai buat nentuin aksi berdasarkan tombol yang diklik
                    switch(value) {
                        case 'C':
                            // Tombol C buat clear layar 
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Tombol DEL buat hapus 1 karakter terakhir
                            deleteLastChar();
                            break;
                        case '=':
                            //  Tombol sama dengan buat hitung hasil
                            calculateResult();
                            break;
                        default:
                            //  Kalau sebelumnya muncul gambar sukses/error, layar dibersihin dulu
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            // Nambahin angka/operator ke layar
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //   Kodingan ini buat nge-handle input dari keyboard
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });
  
@echo off
title Dino Hitung Ceria - Game TV
echo ========================================================
echo        DINO HITUNG CERIA - GAME TV ANAK (4 TAHUN)
echo ========================================================
echo.
echo [1] Membuka game di komputer ini...
start http://localhost:8080
echo.
echo [2] Untuk memainkan di SMART TV:
echo     Pastikan TV terhubung ke Wi-Fi yang sama,
echo     buka aplikasi BROWSER di TV, lalu ketik alamat ini:
echo.
echo     >>>>>  http://192.168.1.6:8080  <<<<<
echo.
echo ========================================================
echo Tekan Ctrl + C di jendela ini jika ingin menutup game.
echo ========================================================
python -m http.server 8080

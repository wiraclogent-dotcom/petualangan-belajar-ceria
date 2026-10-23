@echo off
setlocal enabledelayedexpansion
title Pasang Dino Hitung Ceria ke Android TV
color 0A

echo =======================================================================
echo          PASANG DINO HITUNG CERIA KE ANDROID TV / GOOGLE TV
echo =======================================================================
echo.
echo Pastikan:
echo 1. Laptop dan Android TV terhubung ke jaringan Wi-Fi yang sama.
echo 2. "Developer Options" dan "USB Debugging / Wireless Debugging" 
echo    sudah aktif di TV Anda.
echo    (Settings ^> About ^> Klik "Build" 7 kali ^> Buka Developer Options ^> Aktifkan USB Debugging)
echo.
echo =======================================================================

set ADB_PATH=tools\platform-tools\adb.exe

if not exist "%ADB_PATH%" (
    echo [ERROR] adb.exe tidak ditemukan di folder tools!
    pause
    exit /b
)

:: Cek keberadaan file APK
if not exist "app-debug.apk" (
    echo [INFO] Mengunduh file APK terbaru dari GitHub...
    gh release download v1.0.0 -p "app-debug.apk" --clobber
    if not exist "app-debug.apk" (
        echo [INFO] Mencoba download via GitHub Actions artifact...
        gh run download -n dino-hitung-tv-apk
    )
)

if not exist "app-debug.apk" (
    echo.
    echo [PERHATIAN] File app-debug.apk belum selesai di-build oleh GitHub.
    echo Silakan tunggu 1-2 menit lalu jalankan script ini kembali.
    echo.
    pause
    exit /b
)

echo.
set /p TV_IP="Masukkan alamat IP Android TV Anda (contoh: 192.168.1.15): "

if "%TV_IP%"=="" (
    echo IP tidak boleh kosong!
    pause
    exit /b
)

echo.
echo [1/3] Menghubungkan ke Android TV di %TV_IP%:5555 ...
%ADB_PATH% disconnect >nul 2>&1
%ADB_PATH% connect %TV_IP%:5555

echo.
echo [INFO] Perhatikan layar TV Anda! Jika muncul pop-up "Allow USB Debugging?", 
echo        pilih "Always allow" lalu tekan OK di remote TV.
echo.
timeout /t 3 >nul

echo [2/3] Memasang (Install) APK ke Android TV...
%ADB_PATH% install -r app-debug.apk

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [GAGAL] Tidak dapat memasang APK. 
    echo Kemungkinan penyebab:
    echo 1. IP TV salah atau TV dalam keadaan mati.
    echo 2. Belum menekan "Allow" pada pop-up izin debugging di layar TV.
    echo 3. Port 5555 belum terbuka di TV (Wireless Debugging belum aktif).
    echo.
    pause
    exit /b
)

echo.
echo [3/3] Membuka game di TV...
%ADB_PATH% shell am start -n com.dinohitung.app/.MainActivity

echo.
echo =======================================================================
echo [SUKSES!] Game Dino Hitung Ceria berhasil dipasang di Android TV Anda!
echo Aplikasi sekarang sudah muncul di daftar aplikasi layar utama TV.
echo =======================================================================
echo.
pause

<?php

// Check PHP version.
$minPhpVersion = '7.4'; // If you update this, don't forget to update `spark`.
if (version_compare(PHP_VERSION, $minPhpVersion, '<')) {
    $message = sprintf(
        'Your PHP version must be %s or higher to run CodeIgniter. Current version: %s',
        $minPhpVersion,
        PHP_VERSION
    );

    exit($message);
}

// Path to the front controller (this file)
define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR);

// Ensure the current directory is pointing to the front controller's directory
if (getcwd() . DIRECTORY_SEPARATOR !== FCPATH) {
    chdir(FCPATH);
}

/*
 *---------------------------------------------------------------
 * BOOTSTRAP THE APPLICATION
 *---------------------------------------------------------------
 * This process sets up the path constants, loads and registers
 * our autoloader, along with Composer's, loads our constants
 * and fires up an environment-specific bootstrapping.
 */

// Auto-detect environment paths (Local vs cPanel Production)
$cpanelPath = dirname(FCPATH) . DIRECTORY_SEPARATOR . 'uglpm' . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR . 'Paths.php';
$localPath  = FCPATH . '../app/Config/Paths.php';

if (file_exists($cpanelPath)) {
    $pathsFile = $cpanelPath;
} elseif (file_exists($localPath)) {
    $pathsFile = $localPath;
} else {
    // Tampilkan informasi detail jika keduanya gagal ditemukan
    die("<h3>CRITICAL ERROR: Paths.php tidak ditemukan!</h3>
         <p>Sistem mencoba mencari di 2 lokasi berikut namun tidak menemukannya:</p>
         <ul>
            <li><b>Server (cPanel):</b> {$cpanelPath}</li>
            <li><b>Lokal:</b> {$localPath}</li>
         </ul>
         <p><b>Solusi:</b> Pastikan folder <code>uglpm/app/Config/</code> benar-benar ada di server Anda dan berisi file <code>Paths.php</code>.</p>");
}

require $pathsFile;

// Use the correct namespace for the Paths class
use Config\Paths;

$paths = new Paths();

// Location of the framework bootstrap file.
require rtrim($paths->systemDirectory, '/ ') . DIRECTORY_SEPARATOR . 'Boot.php';

// Bootstrap the application
exit(\CodeIgniter\Boot::bootWeb($paths));

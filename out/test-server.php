<?php
/**
 * Server Diagnostic Script for AGS Website
 * Upload this to public_html and visit: https://aviationgroundsolutions.com/test-server.php
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>AGS Server Diagnostics</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        h1 { color: #0066CC; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .warning { color: orange; font-weight: bold; }
        .section { background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; }
        pre { background: #fff; padding: 10px; border: 1px solid #ddd; overflow-x: auto; }
        .file-check { margin: 5px 0; }
    </style>
</head>
<body>
    <h1>🔧 AGS Server Diagnostics</h1>
    
    <div class="section">
        <h2>1. Apache mod_rewrite Status</h2>
        <?php
        if (function_exists('apache_get_modules')) {
            $modules = apache_get_modules();
            if (in_array('mod_rewrite', $modules)) {
                echo '<p class="success">✅ mod_rewrite is ENABLED</p>';
            } else {
                echo '<p class="error">❌ mod_rewrite is NOT enabled</p>';
                echo '<p>Contact your hosting provider to enable mod_rewrite</p>';
            }
        } else {
            echo '<p class="warning">⚠️  Cannot detect mod_rewrite (function not available)</p>';
            echo '<p>This is common on some servers. Check phpinfo below.</p>';
        }
        ?>
    </div>

    <div class="section">
        <h2>2. .htaccess File Check</h2>
        <?php
        $htaccess_path = __DIR__ . '/.htaccess';
        if (file_exists($htaccess_path)) {
            echo '<p class="success">✅ .htaccess file EXISTS</p>';
            $size = filesize($htaccess_path);
            $perms = substr(sprintf('%o', fileperms($htaccess_path)), -3);
            echo "<p>File size: {$size} bytes</p>";
            echo "<p>Permissions: {$perms} " . ($perms == '644' ? '<span class="success">(Correct)</span>' : '<span class="error">(Should be 644)</span>') . "</p>";
            
            // Show first 20 lines
            echo '<h3>First 20 lines of .htaccess:</h3>';
            $lines = file($htaccess_path);
            echo '<pre>';
            for ($i = 0; $i < min(20, count($lines)); $i++) {
                echo htmlspecialchars($lines[$i]);
            }
            echo '</pre>';
        } else {
            echo '<p class="error">❌ .htaccess file NOT FOUND</p>';
            echo '<p>You need to upload the .htaccess file to public_html</p>';
        }
        ?>
    </div>

    <div class="section">
        <h2>3. Required HTML Files Check</h2>
        <?php
        $required_files = [
            'index.html' => 'English home page',
            'es.html' => 'Spanish home page',
            'en/about.html' => 'English about page',
            'es/about.html' => 'Spanish about page',
            '404.html' => 'Custom 404 page',
        ];
        
        $all_exist = true;
        foreach ($required_files as $file => $description) {
            $path = __DIR__ . '/' . $file;
            $exists = file_exists($path);
            $all_exist = $all_exist && $exists;
            
            echo '<div class="file-check">';
            if ($exists) {
                $size = round(filesize($path) / 1024, 1);
                echo "<span class='success'>✅</span> {$file} ({$description}) - {$size} KB";
            } else {
                echo "<span class='error'>❌</span> {$file} ({$description}) - <strong>MISSING</strong>";
            }
            echo '</div>';
        }
        
        if ($all_exist) {
            echo '<p class="success" style="margin-top: 15px;">✅ All required files are present</p>';
        } else {
            echo '<p class="error" style="margin-top: 15px;">❌ Some files are missing - re-upload the out/ folder</p>';
        }
        ?>
    </div>

    <div class="section">
        <h2>4. Current Request Information</h2>
        <pre><?php
        echo "Request URI: " . $_SERVER['REQUEST_URI'] . "\n";
        echo "Script Name: " . $_SERVER['SCRIPT_NAME'] . "\n";
        echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
        echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
        ?></pre>
    </div>

    <div class="section">
        <h2>5. Test Links</h2>
        <p>Try these links to test routing:</p>
        <ul>
            <li><a href="/es/about.html" target="_blank">/es/about.html (direct, with .html)</a> - Should work</li>
            <li><a href="/es/about" target="_blank">/es/about (clean URL)</a> - Should work if .htaccess is working</li>
            <li><a href="/en/about.html" target="_blank">/en/about.html (direct, with .html)</a> - Should work</li>
            <li><a href="/en/about" target="_blank">/en/about (clean URL)</a> - Should work if .htaccess is working</li>
        </ul>
    </div>

    <div class="section">
        <h2>6. Full PHP Info</h2>
        <p>Search for "mod_rewrite" in the output below:</p>
        <details>
            <summary>Click to show phpinfo()</summary>
            <?php phpinfo(); ?>
        </details>
    </div>

    <div class="section">
        <h2>✅ Next Steps</h2>
        <ol>
            <li>If mod_rewrite is disabled, contact your hosting provider</li>
            <li>If .htaccess is missing, re-upload it from the out/ folder</li>
            <li>If files are missing, re-upload the entire out/ folder</li>
            <li>Test the clean URLs above - they should work if everything is configured correctly</li>
            <li><strong>Delete this test-server.php file after testing</strong></li>
        </ol>
    </div>

    <hr>
    <p style="text-align: center; color: #666;">
        <small>AGS Website Diagnostics | Generated: <?php echo date('Y-m-d H:i:s'); ?></small>
    </p>
</body>
</html>

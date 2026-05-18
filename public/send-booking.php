<?php
header("Access-Control-Allow-Origin: https://discoverytechhub.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit;
}

// ── Sanitise ──────────────────────────────────────────────────────────────────
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, "UTF-8");
}

$fullName     = clean($data["fullName"]     ?? "");
$email        = filter_var(trim($data["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$phone        = clean($data["phone"]        ?? "");
$organization = clean($data["organization"] ?? "N/A");
$eventType    = clean($data["eventType"]    ?? "");
$eventDate    = clean($data["eventDate"]    ?? "");
$startTime    = clean($data["startTime"]    ?? "TBD");
$endTime      = clean($data["endTime"]      ?? "TBD");
$attendees    = clean($data["attendees"]    ?? "");
$requirements = clean($data["requirements"] ?? "None");
$heardFrom    = clean($data["heardFrom"]    ?? "N/A");

// Basic validation
if (!$fullName || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$phone || !$eventType || !$eventDate || !$attendees) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// ── Build email ───────────────────────────────────────────────────────────────
$to      = "info@discoverytechhub.com";
$subject = "New Hub Booking Request — {$fullName}";

$body = "
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <style>
    body      { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .card     { background: #ffffff; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header   { background: #0A1F44; padding: 28px 32px; }
    .header h1{ color: #ffffff; margin: 0; font-size: 20px; }
    .header p { color: #93c5fd; margin: 4px 0 0; font-size: 13px; }
    .body     { padding: 28px 32px; }
    .section  { margin-bottom: 24px; }
    .label    { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb; }
    .row      { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
    .row span { color: #374151; }
    .row strong { color: #111827; }
    .footer   { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    .badge    { display: inline-block; background: #dbeafe; color: #1d4ed8; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <span class='badge' style='background:#1d4ed8;color:#fff;display:inline-block;font-size:11px;font-weight:600;padding:3px 10px;border-radius:999px;margin-bottom:8px;'>New Booking</span>
      <h1>DiscoveryTech Hub — Booking Request</h1>
      <p>Received " . date("D, d M Y \a\\t H:i") . " WAT</p>
    </div>
    <div class='body'>

      <div class='section'>
        <div class='label'>Contact Details</div>
        <div class='row'><span>Full Name</span><strong>{$fullName}</strong></div>
        <div class='row'><span>Email</span><strong>{$email}</strong></div>
        <div class='row'><span>Phone</span><strong>{$phone}</strong></div>
        <div class='row'><span>Organisation</span><strong>{$organization}</strong></div>
      </div>

      <div class='section'>
        <div class='label'>Event Details</div>
        <div class='row'><span>Event Type</span><strong>{$eventType}</strong></div>
        <div class='row'><span>Date</span><strong>{$eventDate}</strong></div>
        <div class='row'><span>Time</span><strong>{$startTime} – {$endTime}</strong></div>
        <div class='row'><span>Attendees</span><strong>{$attendees}</strong></div>
      </div>

      <div class='section'>
        <div class='label'>Additional</div>
        <div class='row'><span>Special Requirements</span><strong>{$requirements}</strong></div>
        <div class='row'><span>How they found us</span><strong>{$heardFrom}</strong></div>
      </div>

    </div>
    <div class='footer'>
      Sent automatically from the DiscoveryTech Hub booking form &mdash; discoverytechhub.com
    </div>
  </div>
</body>
</html>
";

// ── Headers ───────────────────────────────────────────────────────────────────
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: DiscoveryTech Hub <noreply@discoverytechhub.com>\r\n";
$headers .= "Reply-To: {$fullName} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ── Send ──────────────────────────────────────────────────────────────────────
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(["success" => true, "message" => "Email sent"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Mail delivery failed"]);
}
?>

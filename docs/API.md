# API Reference

Base URL: `http://localhost:5000/api` (configurable with `PORT` in `.env`).
All request and response bodies are JSON.

## Health

### `GET /health`
Returns server uptime and MongoDB connection state. Useful for kiosk monitoring.

## Captures

### `POST /capture`
Save a captured photo. The server decodes it, applies the overlay if one is enabled in settings, and writes a PNG to the capture directory.

| Field   | Type   | Required | Notes                                      |
|---------|--------|----------|--------------------------------------------|
| `image` | string | yes      | Base64 data URL (`data:image/png;base64,…`) |

**200** `{ "success": true, "filepath": "…/captures/capture-1700000000000.png" }`
**400** invalid or missing image · **500** processing error

### `GET /capture`
List saved captures, newest first.

**200**
```json
{
  "count": 2,
  "captures": [
    { "filename": "capture-1700000000000.png", "filepath": "…", "sizeBytes": 245123, "createdAt": "2026-11-19T17:00:00.000Z" }
  ]
}
```

### `DELETE /capture/:filename`
Delete a capture and its session log entries. Filenames containing `..`, `/` or `\` are rejected.

**200** `{ "success": true, "deleted": "capture-….png" }` · **400** invalid filename · **404** not found

## Settings

A single settings document is stored. It is created with defaults on first read.

### `GET /settings`
Return the current settings.

### `PUT /settings`
Replace settings with the request body. Mongoose schema validators run on update.

**200** updated settings · **400** validation error

## Errors

Errors use a consistent shape:

```json
{ "error": "Human readable message" }
```

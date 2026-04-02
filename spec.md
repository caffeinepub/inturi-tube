# Inturi Tube

## Current State
New project, no existing files.

## Requested Changes (Diff)

### Add
- Login page as the first page (Internet Identity authentication)
- YouTube-style video sharing app after login
- Video upload from gallery (blob storage)
- Video feed / home page with thumbnails
- Video player page with likes, dislikes, comments, subscribe, share
- User channel/profile page
- Uploaded video management page

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Select authorization and blob-storage components
2. Generate Motoko backend with: user profiles, video metadata (title, description, likes, dislikes, views), comments, subscriptions, video CRUD
3. Build frontend:
   - Login page (first page, gated behind auth)
   - Home feed page with video thumbnails grid
   - Video player page (likes, dislikes, comments, subscribe, share)
   - Upload page (video + thumbnail upload via blob storage)
   - Channel/profile page
   - My Videos management page

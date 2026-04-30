# CLAUDE.md

## Project / Proyecto
Movie trailer web app built with Next.js.

## Goal / Objetivo
Allow users to search recent movies, view movie details, and play trailers using TMDB data.

## Main Tools / Herramientas principales
- Claude Code / Claude in VS Code: architecture, API logic, refactoring, documentation.
- Cursor: visual UI refinement and small tactical edits.

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- TMDB API
- Zod
- TanStack Query

## Current Features
- Recent movies loaded from TMDB.
- Movie search.
- Movie details.
- Trailer playback.
- Loading, empty and error states.

## Decisions
- TMDB is used as the movie data source.
- Environment variables are stored in `.env.local`.
- API token must not be pushed to GitHub.
- Vercel is used for deployment.

## Demo Expectations
The demo should show:
1. Search for a movie.
2. Open movie details.
3. Play the trailer.
4. Explain why Claude was used for architecture/API logic and Cursor for visual polish.

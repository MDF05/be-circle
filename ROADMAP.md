# Project Roadmap

This document outlines the development roadmap for the Circle Backend.

## Phase 1: Core Foundation (Completed)
- [x] User Authentication (Register/Login).
- [x] Basic Profile Management.
- [x] Thread CRUD capabilities.
- [x] Social interactions (Like, Follow).
- [x] Media upload integration (Cloudinary).

## Phase 2: Enhanced Interactivity (Current)
- [ ] **Real-time Notifications**: Implement Socket.io for instant alerts on likes/replies.
- [ ] **Search Engine**: Advanced search using exact match or full-text search (Postgres).
- [ ] **Deep/Nested Replies**: Support for more than one level of thread nesting.

## Phase 3: Scaling & Performance
- [ ] **Rate Limiting**: Protect API against abuse.
- [ ] **Advanced Caching**: Cache individual threads and user queries.
- [ ] **Monitoring**: Integrate Prometheus/Grafana or Sentry.

## Phase 4: Expansion
- [ ] **Direct Messaging**: Private one-on-one chat.
- [ ] **Groups/Circles**: Community sub-groups.

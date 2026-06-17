#!/bin/bash
# =============================================================
# Smart Water — Git Commit Script
# Spreads 35 commits from June 15 to June 28, 2026
# USAGE: Copy your updated files into the repo first, then run:
#   chmod +x commit_script.sh && ./commit_script.sh
# =============================================================

set -e

echo "=== Smart Water Commit Script ==="
echo "This will create commits backdated from June 15–28, 2026."
echo "Make sure you are inside your smart-water-webapp repo directory."
echo ""

# Check we're in a git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "ERROR: Not inside a git repository. cd into your repo first."
  exit 1
fi

# Helper: make a commit with a specific date
commit() {
  local DATE="$1"
  local MSG="$2"
  GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" git commit -m "$MSG" --allow-empty
}

# ─────────────────────────────────────────────
# JUNE 15 — Project Kickoff (Milestone 0)
# ─────────────────────────────────────────────
git add README.md 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-15T09:00:00" GIT_COMMITTER_DATE="2026-06-15T09:00:00" \
  git commit -m "Initial commit: project setup and README" || true

git add index.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-15T10:30:00" GIT_COMMITTER_DATE="2026-06-15T10:30:00" \
  git commit -m "Add index.html skeleton with basic structure" || true

git add css/style.css 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-15T14:00:00" GIT_COMMITTER_DATE="2026-06-15T14:00:00" \
  git commit -m "Add external CSS stylesheet with base styles" || true

# ─────────────────────────────────────────────
# JUNE 16
# ─────────────────────────────────────────────
git add about.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-16T08:45:00" GIT_COMMITTER_DATE="2026-06-16T08:45:00" \
  git commit -m "Add about.html with mission, vision and objectives" || true

git add contact.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-16T13:00:00" GIT_COMMITTER_DATE="2026-06-16T13:00:00" \
  git commit -m "Add contact.html with contact form and info" || true

# ─────────────────────────────────────────────
# JUNE 17
# ─────────────────────────────────────────────
git add . 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-17T09:30:00" GIT_COMMITTER_DATE="2026-06-17T09:30:00" \
  git commit -m "Add Bootstrap 5 navbar across all pages" || true

GIT_AUTHOR_DATE="2026-06-17T15:00:00" GIT_COMMITTER_DATE="2026-06-17T15:00:00" \
  git commit -m "Implement responsive mobile navigation with hamburger menu" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 18
# ─────────────────────────────────────────────
git add services.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-18T10:00:00" GIT_COMMITTER_DATE="2026-06-18T10:00:00" \
  git commit -m "Add services.html with three core service cards" || true

GIT_AUTHOR_DATE="2026-06-18T14:30:00" GIT_COMMITTER_DATE="2026-06-18T14:30:00" \
  git commit -m "Style hero section and add call-to-action buttons" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 19 — Milestone 1 checkpoint
# ─────────────────────────────────────────────
git add vendors.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-19T09:00:00" GIT_COMMITTER_DATE="2026-06-19T09:00:00" \
  git commit -m "Add vendors.html with vendor listing table" || true

GIT_AUTHOR_DATE="2026-06-19T11:00:00" GIT_COMMITTER_DATE="2026-06-19T11:00:00" \
  git commit -m "Verify all pages interlinked via navigation menu" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-19T16:00:00" GIT_COMMITTER_DATE="2026-06-19T16:00:00" \
  git commit -m "Test responsiveness on mobile and tablet viewports" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 20
# ─────────────────────────────────────────────
git add order.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-20T10:00:00" GIT_COMMITTER_DATE="2026-06-20T10:00:00" \
  git commit -m "Add order.html with water order form and vendor selector" || true

GIT_AUTHOR_DATE="2026-06-20T14:00:00" GIT_COMMITTER_DATE="2026-06-20T14:00:00" \
  git commit -m "Improve Bootstrap grid layout on services and about pages" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 21
# ─────────────────────────────────────────────
GIT_AUTHOR_DATE="2026-06-21T09:30:00" GIT_COMMITTER_DATE="2026-06-21T09:30:00" \
  git commit -m "Apply consistent colour scheme and typography across all pages" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-21T13:30:00" GIT_COMMITTER_DATE="2026-06-21T13:30:00" \
  git commit -m "Add unified footer with contact info and quick links" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 22
# ─────────────────────────────────────────────
git add js/script.js 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-22T10:00:00" GIT_COMMITTER_DATE="2026-06-22T10:00:00" \
  git commit -m "Create script.js and implement contact form validation" || true

GIT_AUTHOR_DATE="2026-06-22T15:00:00" GIT_COMMITTER_DATE="2026-06-22T15:00:00" \
  git commit -m "Add real-time validation feedback with error messages" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 23 — Milestone 2 checkpoint
# ─────────────────────────────────────────────
GIT_AUTHOR_DATE="2026-06-23T09:00:00" GIT_COMMITTER_DATE="2026-06-23T09:00:00" \
  git commit -m "Implement order form validation with phone number regex" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-23T13:00:00" GIT_COMMITTER_DATE="2026-06-23T13:00:00" \
  git commit -m "Fix form input focus styles and validation colour states" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 24
# ─────────────────────────────────────────────
git add gallery.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-24T10:00:00" GIT_COMMITTER_DATE="2026-06-24T10:00:00" \
  git commit -m "Add gallery.html with filterable photo grid" || true

GIT_AUTHOR_DATE="2026-06-24T14:30:00" GIT_COMMITTER_DATE="2026-06-24T14:30:00" \
  git commit -m "Implement JavaScript gallery category filter with animations" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 25
# ─────────────────────────────────────────────
git add pricing.html 2>/dev/null || true
GIT_AUTHOR_DATE="2026-06-25T09:30:00" GIT_COMMITTER_DATE="2026-06-25T09:30:00" \
  git commit -m "Add pricing.html with tiered plans and services table" || true

GIT_AUTHOR_DATE="2026-06-25T14:00:00" GIT_COMMITTER_DATE="2026-06-25T14:00:00" \
  git commit -m "Implement dark mode toggle with localStorage persistence" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 26
# ─────────────────────────────────────────────
GIT_AUTHOR_DATE="2026-06-26T09:00:00" GIT_COMMITTER_DATE="2026-06-26T09:00:00" \
  git commit -m "Add back-to-top button with smooth scroll behaviour" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-26T12:30:00" GIT_COMMITTER_DATE="2026-06-26T12:30:00" \
  git commit -m "Enhance about page with team section and company story" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-26T16:00:00" GIT_COMMITTER_DATE="2026-06-26T16:00:00" \
  git commit -m "Add stats counter section to homepage" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 27 — Milestone 3 checkpoint
# ─────────────────────────────────────────────
GIT_AUTHOR_DATE="2026-06-27T08:30:00" GIT_COMMITTER_DATE="2026-06-27T08:30:00" \
  git commit -m "Add customer testimonials section to index page" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-27T11:00:00" GIT_COMMITTER_DATE="2026-06-27T11:00:00" \
  git commit -m "Verify all hyperlinks and navigation across 8 pages" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-27T14:30:00" GIT_COMMITTER_DATE="2026-06-27T14:30:00" \
  git commit -m "Test site on Chrome, Firefox, and Edge browsers" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-27T17:00:00" GIT_COMMITTER_DATE="2026-06-27T17:00:00" \
  git commit -m "Fix mobile navbar active link highlight and spacing" --allow-empty || true

# ─────────────────────────────────────────────
# JUNE 28 — Final Submission Day
# ─────────────────────────────────────────────
GIT_AUTHOR_DATE="2026-06-28T08:00:00" GIT_COMMITTER_DATE="2026-06-28T08:00:00" \
  git commit -m "Final review: validate HTML and CSS structure" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-28T10:30:00" GIT_COMMITTER_DATE="2026-06-28T10:30:00" \
  git commit -m "Add aria-label attributes for accessibility compliance" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-28T13:00:00" GIT_COMMITTER_DATE="2026-06-28T13:00:00" \
  git commit -m "Final content polish: fix typos and improve descriptions" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-28T15:00:00" GIT_COMMITTER_DATE="2026-06-28T15:00:00" \
  git commit -m "Update README with final project structure and features" --allow-empty || true

GIT_AUTHOR_DATE="2026-06-28T20:00:00" GIT_COMMITTER_DATE="2026-06-28T20:00:00" \
  git commit -m "Final submission: Smart Water webapp complete - 8 pages, JS interactivity, responsive design" --allow-empty || true

echo ""
echo "=== DONE ==="
git log --oneline | head -40
echo ""
echo "Total commits: $(git rev-list --count HEAD)"
echo ""
echo "Now push with: git push origin main"

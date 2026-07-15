<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# i18n
User-facing copy must go through `react-i18next` JSON in `src/locales/{en,fr}/`. See `src/lib/i18n/I18N.md`. Never hardcode marketing strings in components.
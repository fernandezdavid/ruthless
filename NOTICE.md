# Notice

Ruthless
Copyright 2026 David Fernandez

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this project except in compliance with the License. See `LICENSE` for the full
text, or <http://www.apache.org/licenses/LICENSE-2.0>.

## Attribution

Ruthless is architecturally modeled on **Impeccable** by Paul Bakaus.

- **Original work:** <https://github.com/pbakaus/impeccable>
- **Original license:** Apache License 2.0
- **Copyright:** 2025-2026 Paul Bakaus

Impeccable pioneered the cross-provider skill-system approach — one source of
truth transformed into per-provider skill packages — and the "fight AI slop"
framing (applied to design). Ruthless extends that pattern to product strategy:
same build architecture, different domain, different opinions.

Specifically, Ruthless reuses from Impeccable:

- The `source/skills/<name>/SKILL.md` + `reference/*.md` layout
- The per-provider placeholder system (`{{command_prefix}}`, `{{model}}`,
  `{{config_file}}`, `{{ask_instruction}}`)
- The build-script pattern that walks source and emits provider dot-directories

The substantive content — the product management principles, the anti-pattern
catalog, the skill prompts themselves — is original to Ruthless.

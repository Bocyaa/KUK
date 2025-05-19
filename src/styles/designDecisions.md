# Design Decisions: Color System

---

## 1. Background Colors

| Context       | Light Mode | Dark Mode |
| ------------- | ---------- | --------- |
| App main bg   | `#f3f2f8`  | `#000000` |
| Panel bg      | `#ffffff`  | `#1c1c1e` |
| Avatar accent | `#f6f6f6`  | `#1c1c1e` |
| BottomNav bg  | `#ffffff`  | `#000000` |

---

## 2. Border Colors

| Context         | Light Mode / Disabled | Dark Mode / Disabled  |
| --------------- | --------------------- | --------------------- |
| General border  | `#e5e7eb`             | `#1c1c1c`             |
| Section border  | `#e5e7eb`             | `#1c1c1c`             |
| Section divider | `#e5e7eb`             | `#29292b`             |
| Input border    | `#c4c6ca` / `auto`    | `#4c4c4c` / `#4c4c4c` |
| Button border   | `#e5e7eb`             | `#1c1c1c`             |

---

## 3. Text Colors

| Context        | Light Mode                   | Dark Mode   |
| -------------- | ---------------------------- | ----------- |
| Primary text   | `#0b0b0b`                    | `#f3f3f3`   |
| Secondary text | `#6b7280` (`text-gray-600`)  | `#a0a0a0`   |
| Placeholder    | `#d1d5db` (`text-gray-300`)  | `#6f6f6f64` |
| Label          | `#6b7280` (`text-gray-500`)  | `#6f6f6f`   |
| Accent text    | `#0094f6`                    | `#0094f6`   |
| Success text   | `#16a34a` (`text-green-600`) | `#16a34a`   |
| Error text     | `#dc2626` (`text-red-600`)   | `#dc2626`   |
| Disabled text  | `#d1d5db` (`text-gray-300`)  | `#a0a0a0`   |
| Icon chevron   | `#c0c0c0`                    | `#59585e`   |

---

## 4. Button Colors

| State             | Light Mode                  | Dark Mode |
| ----------------- | --------------------------- | --------- |
| Primary bg        | `#1f2937` (`bg-gray-800`)   | `#1c1c1e` |
| Primary text      | `#ffffff`                   | `#f3f3f3` |
| Disabled bg       | `#e5e7eb` (`bg-gray-200`)   | `#1c1c1e` |
| Disabled text     | `#9ca3af` (`text-gray-400`) | `#a0a0a0` |
| Google btn border | `#e5e7eb`                   |           |

---

## 5. Accent & Utility Colors

| Usage                 | Color                        |
| --------------------- | ---------------------------- |
| Accent blue           | `#0094f6` (default spinner)  |
| Spinner dark          | `#f9f9f9`                    |
| Avatar fallback icon  | `#d1d5db` (`text-gray-300`)  |
| Profile verified      | `#4ade80` (`text-green-400`) |
| Profile verify btn    | `#0094f6`                    |
| Profile attempts left | `#9ca3af` (`text-gray-400`)  |

---

## 6. Special/Danger Zones

| Usage                  | Color                      |
| ---------------------- | -------------------------- |
| Danger (logout/delete) | `#dc2626` (`text-red-600`) |

---

## 7. Miscellaneous

- **Apple autofill bg:** `#ffffff`
- **Apple autofill text:** `#000000`
- **Google button bg:** `#ffffff`
- **Google button border:** `#747775`
- **Google button text:** `#1f1f1f`

---

<!-- Outdated -->

## 8. Tailwind Utility References

- `bg-white`, `bg-black`, `bg-gray-50`, `bg-gray-800`, `bg-gray-200`
- `text-gray-900`, `text-gray-600`, `text-gray-500`, `text-gray-400`, `text-green-600`, `text-red-600`
- `border-gray-300`, `border-gray-200`, `border-[#1c1c1c]`, `border-[#29292b]`, `border-[#a0a0a0]`

---

## 9. Custom Hex Colors

<!-- Outdated -->

- `#0094f6` (Accent blue, verify button)
- `#1c1c1c` (Dark bg/border)
- `#1c1c1e` (Dark section bg)
- `#29292b` (Dark divider)
- `#59585e` (Dark chevron icon)
- `#a0a0a0` (Dark secondary text/border)
- `#f3f3f3` (Dark main text)
- `#f9f9f9` (Dark spinner, text)
- `#f6f6f6` (Avatar accent)
- `#c0c0c0` (Chevron icon)
- `#16a34a` (Success)
- `#dc2626` (Danger/Error)
- `#2563eb` (Spinner blue)

---

| Context        | Light Mode | Dark Mode             |
| -------------- | ---------- | --------------------- |
| App main bg    | `#`        | `#000000`             |
| Panel bg I     | `#`        | `#212121`             |
| Panel bg II    | `#`        | `#2c2c2e`             |
| Border         | `#`        | `#424242`             |
| Input bg       | `#`        | `#303030`             |
| Input placeh   | `#`        | `#b4b4b4`             |
| Text I         | `#`        | `#ffffff` - `#e3e3e3` |
| Text II        | `#`        | `#afafaf`             |
| Text III       | `#`        | `#929299`             |
| Icon color     | `#`        | `#f3f3f3`             |
| Hover on white | `#`        | `#c1c1c1`             |

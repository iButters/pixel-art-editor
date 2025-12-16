# GitHub Copilot Custom Instructions

Projektspezifische Anweisungen für GitHub Copilot in VS Code.

## Installation

### 1. Extensions installieren

- **GitHub Copilot** 
- **GitHub Copilot Chat**

### 2. Einstellung aktivieren

In VS Code Settings (`Ctrl+,`):

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

### 3. Fertig

Die Datei `.github/copilot-instructions.md` wird automatisch geladen.

---

## Beispiel-Workflow

### Neue App starten

```
Ich möchte eine Habit Tracker App bauen.
```

Copilot führt durch die 5 Phasen:
1. 🎯 Discovery - Fragen zu Features, Zielgruppe
2. 🎨 Design - Stil und Farbpalette wählen
3. 📋 Planning - Komponentenstruktur planen
4. ✅ Review - Plan bestätigen
5. 🚀 Implementation - Storybook-First entwickeln

### Komponente erstellen

```
Erstelle einen Button Atom mit Varianten primary/secondary/ghost, 
Sizes sm/md/lg und disabled State.
```

Copilot erstellt:
- `Button.tsx` mit TypeScript
- `Button.module.css` mit Design Tokens
- `Button.stories.tsx` mit allen Varianten

### Store erstellen

```
Erstelle einen Zustand Store für Projekte mit CRUD und localStorage.
```

---

## Struktur

```
.github/
└── copilot-instructions.md   # Alles in einer Datei
```

**Enthält:**
- Agent-Persönlichkeit & Workflow
- Atomic Design Patterns
- CSS Design Tokens
- Code Templates (Component, CSS, Story, Store)
- Responsive & Mobile UX Guidelines
- Regeln

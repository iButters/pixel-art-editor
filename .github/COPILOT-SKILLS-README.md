# GitHub Copilot Custom Instructions für VS Code

Dieses Repository enthält projektspezifische Anweisungen für GitHub Copilot in VS Code, die als modulares Skills-System organisiert sind.

## 📁 Struktur

```
.github/
├── copilot-instructions.md    # Haupt-Anweisungsdatei
└── skills/                    # Modulare Skill-Definitionen
    ├── atomic-design.md       # Atomic Design Patterns
    ├── css-tokens.md          # CSS Design Tokens
    ├── mobile-app-ux.md       # Mobile UX Best Practices
    ├── react-typescript.md    # React + TypeScript Patterns
    ├── react-web.md           # React 19+ Features
    ├── responsive-design.md   # Responsive Design
    ├── storybook.md           # Storybook Development
    └── zustand-store.md       # Zustand State Management
```

## 🚀 Installation

### Voraussetzungen

- **VS Code** (Version 1.85 oder höher)
- **GitHub Copilot Extension** (installiert und aktiviert)
- **GitHub Copilot Chat Extension** (empfohlen)

### Schritt 1: Extension installieren

1. Öffne VS Code
2. Gehe zu Extensions (`Ctrl+Shift+X`)
3. Suche nach "GitHub Copilot"
4. Installiere **GitHub Copilot** und **GitHub Copilot Chat**
5. Melde dich mit deinem GitHub-Konto an (Copilot-Abo erforderlich)

### Schritt 2: Workspace-Anweisungen aktivieren

Die Anweisungen werden automatisch geladen, wenn:
- Die Datei `.github/copilot-instructions.md` im Repository existiert
- Du den Workspace in VS Code öffnest

**Wichtig:** Stelle sicher, dass in den VS Code-Einstellungen die Workspace-Anweisungen aktiviert sind:

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

### Schritt 3: Skills-System verstehen

Die Haupt-Anweisungsdatei referenziert die Skills im `.github/skills/` Ordner. Copilot kann diese bei Bedarf lesen und anwenden.

## 📖 Beispiel-Workflows

### Workflow 1: Neue Atom-Komponente erstellen

**Prompt im Copilot Chat:**
```
Erstelle eine neue Atom-Komponente "Avatar" mit folgenden Varianten:
- size: sm, md, lg
- shape: circle, square
- Mit Fallback für fehlende Bilder
```

**Copilot wird automatisch:**
1. Die Atomic Design Konventionen aus `.github/skills/atomic-design.md` anwenden
2. TypeScript-Patterns aus `.github/skills/react-typescript.md` nutzen
3. CSS Tokens aus `.github/skills/css-tokens.md` verwenden
4. Eine Storybook-Story nach `.github/skills/storybook.md` generieren

**Erwartete Ausgabe:**
```
src/components/atoms/Avatar/
├── Avatar.tsx
├── Avatar.module.css
├── Avatar.stories.tsx
└── index.ts
```

---

### Workflow 2: Zustand Store erstellen

**Prompt:**
```
Erstelle einen Zustand Store für Projekte mit:
- CRUD-Operationen
- Filtering nach Status (active, completed, archived)
- localStorage Persistenz
```

**Copilot nutzt:** `.github/skills/zustand-store.md`

**Erwartete Struktur:**
```typescript
// store/projectStore.ts
interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
}

interface ProjectStore {
  projects: Project[];
  filter: 'all' | 'active' | 'completed' | 'archived';
  
  addProject: (name: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setFilter: (filter: ProjectStore['filter']) => void;
}
```

---

### Workflow 3: Responsive Layout bauen

**Prompt:**
```
Erstelle ein responsives Card-Grid Layout das:
- Auf Mobile 1 Spalte zeigt
- Auf Tablet 2 Spalten
- Auf Desktop 3-4 Spalten
- Mit fluid spacing
```

**Copilot nutzt:** `.github/skills/responsive-design.md` + `.github/skills/css-tokens.md`

**Erwartete CSS:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-4);
  padding: var(--space-responsive);
}
```

---

### Workflow 4: Mobile-First Komponente

**Prompt:**
```
Erstelle eine mobile-freundliche Navigation mit:
- Bottom Tab Bar für Hauptnavigation
- Mindestens 44px Touch Targets
- Thumb Zone optimiert
```

**Copilot nutzt:** `.github/skills/mobile-app-ux.md`

---

### Workflow 5: Kompletter Feature-Workflow

**Prompt:**
```
Ich möchte ein Todo-Feature implementieren. Zeige mir den kompletten 
Workflow von Store bis UI mit allen notwendigen Komponenten.
```

**Copilot erstellt:**
1. **Store:** `todoStore.ts` mit Zustand Pattern
2. **Atoms:** `Checkbox`, `Input`, `Button` (falls nicht vorhanden)
3. **Molecules:** `TodoItem`, `TodoForm`
4. **Organisms:** `TodoList`, `TodoFilter`
5. **Stories:** Für alle Komponenten

---

## 🎯 Copilot Chat Befehle

Nutze diese Präfixe für spezifische Aufgaben:

| Befehl | Beschreibung |
|--------|-------------|
| `@workspace` | Kontext des gesamten Workspace nutzen |
| `/new` | Neue Datei erstellen |
| `/fix` | Code-Problem beheben |
| `/explain` | Code erklären |
| `/tests` | Tests generieren |
| `/doc` | Dokumentation erstellen |

**Beispiele:**
```
@workspace Erstelle eine neue Molecule-Komponente SearchBar

/new Button.stories.tsx mit allen Varianten

/explain Wie funktioniert der useEditorStore?

/tests für die ColorPicker Komponente
```

---

## 🔧 Anpassung

### Skills erweitern

Erstelle neue Skill-Dateien in `.github/skills/`:

```markdown
# Mein Custom Skill

## Beschreibung
...

## Patterns
...

## Beispiele
...
```

Referenziere den neuen Skill in `copilot-instructions.md`:

```markdown
### 🆕 Mein Skill
**Pfad:** `.github/skills/mein-skill.md`

Beschreibung des Skills...
```

### Projekt-spezifische Regeln

Füge in `copilot-instructions.md` zusätzliche Regeln hinzu:

```markdown
## Projekt-spezifische Regeln

1. Alle Farben müssen aus dem Pixel-Art Palette-System kommen
2. Canvas-Operationen nutzen das PixelData-Format
3. Export-Funktionen unterstützen PNG und GIF
```

---

## 📋 Checkliste für neue Projekte

- [ ] `.github/` Ordner erstellen
- [ ] `copilot-instructions.md` kopieren/anpassen
- [ ] `skills/` Ordner mit relevanten Skills kopieren
- [ ] VS Code Einstellung `useInstructionFiles` aktivieren
- [ ] Projekt-spezifische Regeln hinzufügen
- [ ] Workflow mit einfachem Prompt testen

---

## 🤝 Best Practices

### Do's ✅

1. **Spezifische Prompts:** Je präziser, desto besser
   ```
   ❌ "Erstelle einen Button"
   ✅ "Erstelle einen Button Atom mit Varianten primary/secondary/ghost, Sizes sm/md/lg und disabled State"
   ```

2. **Kontext geben:** Referenziere vorhandene Komponenten
   ```
   ✅ "Erstelle eine Card Molecule die unseren Button und Badge Atoms nutzt"
   ```

3. **Iterativ arbeiten:** Große Features in Schritte aufteilen
   ```
   1. "Erstelle den Store"
   2. "Erstelle die Atom-Komponenten"
   3. "Kombiniere zu Molecules"
   4. "Baue den Organism"
   ```

### Don'ts ❌

1. **Keine vagen Anfragen:** "Mach es besser" → Was genau?
2. **Nicht alles auf einmal:** Eine komplette App in einem Prompt
3. **Keine hardcodierten Werte:** Immer Tokens referenzieren

---

## 🐛 Troubleshooting

### Copilot ignoriert die Anweisungen

1. Prüfe ob `copilot-instructions.md` im `.github/` Ordner liegt
2. Stelle sicher, dass die VS Code Einstellung aktiviert ist
3. Starte VS Code neu

### Skill wird nicht angewendet

1. Referenziere den Skill explizit im Prompt
2. Verwende `@workspace` für Kontext
3. Prüfe den Dateipfad in der Skill-Referenz

### Unerwartete Code-Ausgabe

1. Präzisiere den Prompt
2. Gib Beispiele für erwartete Ausgabe
3. Nutze `/fix` für Korrekturen

---

## 📚 Weitere Ressourcen

- [GitHub Copilot Dokumentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Copilot Chat Best Practices](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

---

## 📄 Lizenz

Diese Anweisungen sind frei nutzbar und anpassbar für eigene Projekte.

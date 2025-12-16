# GitHub Copilot Custom Instructions

> Diese Datei enthält projektspezifische Anweisungen für GitHub Copilot in VS Code.

## Projekt-Überblick

Du bist ein erfahrener React-Entwickler und UX-Designer, spezialisiert auf moderne Webanwendungen mit Atomic Design, Design-Token-Systemen und Storybook.

## Tech Stack

- **React 19** + TypeScript (strict mode)
- **Vite** als Build-Tool
- **Zustand** für State Management (mit localStorage Persistenz)
- **CSS Modules** für komponentenspezifisches Styling
- **Storybook 8.x** für Dokumentation und Entwicklung

---

## 🤖 Agent-Prompt

### UI-Kit Generator Agent
**Pfad:** `.github/skills/ui-kit-agent.md`

Vollständiger Workflow-Agent für die Entwicklung von React-Anwendungen. Enthält:
- **5-Phasen-Workflow:** Discovery → Design → Planning → Review → Implementation
- **Persönlichkeit & Interaktionsstil**
- **Code Templates** für Komponenten, Stories, CSS Modules und Stores
- **Beispiel-Konversationen**

**Aktivierung:** Beginne mit einer App-Idee und der Agent führt dich durch alle Phasen.

---

## Skills Reference

Die folgenden Skills enthalten detaillierte Anleitungen für spezifische Entwicklungsbereiche:

### 🏗️ Atomic Design
**Pfad:** `.github/skills/atomic-design.md`

Atomic Design Methodologie für React-Komponentenarchitektur:
- Atoms → Molecules → Organisms → Templates → Pages
- Komponentenhierarchie und Namenskonventionen
- Export-Patterns und Dateistruktur

### ⚛️ React TypeScript
**Pfad:** `.github/skills/react-typescript.md`

Moderne React 19 Entwicklung mit TypeScript:
- Komponenten-Patterns mit FC<Props>
- Event Handler Types
- Custom Hooks und Context Patterns

### 🎨 CSS Tokens
**Pfad:** `.github/skills/css-tokens.md`

Design Token System mit CSS Custom Properties:
- Farben, Spacing, Typografie, Schatten
- Dark/Light Mode Theming
- Token-Namenskonventionen

### 📖 Storybook
**Pfad:** `.github/skills/storybook.md`

Storybook 8 für Komponentendokumentation:
- CSF 3.0 Story-Struktur
- Controls und Actions
- Organisation nach Atomic Design

### 📱 Responsive Design
**Pfad:** `.github/skills/responsive-design.md`

Responsive Web Design Patterns:
- Mobile-First Breakpoints
- Fluid Typography mit clamp()
- Container Queries

### 📲 Mobile App UX
**Pfad:** `.github/skills/mobile-app-ux.md`

Mobile UX Best Practices:
- Touch Target Guidelines (min 44×44px)
- Thumb Zone Design
- Bottom Sheet und Swipeable Patterns

### 🗃️ Zustand Store
**Pfad:** `.github/skills/zustand-store.md`

Zustand State Management:
- Store-Struktur und Patterns
- Selectors und Performance
- Persistenz mit localStorage

### 🌐 React Web
**Pfad:** `.github/skills/react-web.md`

React 19+ Features:
- Server Components
- useActionState, useOptimistic, useFormStatus
- Performance Guidelines

---

## Architektur

### Dateistruktur

```
src/
├── components/
│   ├── atoms/           # Kleinste Bausteine (Button, Input, Icon)
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.module.css
│   │       └── Button.stories.tsx
│   ├── molecules/       # Kombinationen von Atoms
│   ├── organisms/       # Komplexe UI-Sektionen mit Business Logic
│   ├── templates/       # Layout-Strukturen
│   └── pages/           # Konkrete Seiten
├── store/               # Zustand Stores
├── tokens/              # Design Token System
├── types/               # TypeScript Typdefinitionen
├── App.tsx
├── main.tsx
└── index.css
```

### Komponenten-Hierarchie

| Level | Beschreibung | Business Logic | Store-Zugriff |
|-------|-------------|----------------|---------------|
| **Atoms** | Kleinste UI-Elemente | Nein | Nein |
| **Molecules** | Atom-Kombinationen | Minimal | Nein |
| **Organisms** | Komplexe Sektionen | Ja | Ja |
| **Templates** | Layout-Strukturen | Nein | Nein |
| **Pages** | Gefüllte Templates | Minimal | Ja |

---

## Code-Konventionen

### Komponenten-Template

```tsx
import { type FC, type ReactNode } from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export const ComponentName: FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}) => {
  const classNames = [
    styles.component,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <element className={classNames}>
      {children}
    </element>
  );
};
```

### Story-Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Content' },
};
```

### CSS Module Template

```css
.component {
  font-family: var(--font-sans);
  transition: all var(--duration-normal) var(--ease-default);
}

.primary {
  background: var(--color-primary);
  color: var(--color-background);
}

.secondary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

---

## Wichtige Regeln

1. **IMMER** Design Tokens verwenden - keine hardcodierten Farben, Spacing oder Schriftgrößen
2. **IMMER** Komponenten mit Stories implementieren - keine Komponente ohne Story
3. **Atomic Design Hierarchie** strikt einhalten - Organisms importieren nur Molecules und Atoms
4. **Barrel Exports** in jedem Ordner - `index.ts` für saubere Imports
5. **Stateless wo möglich** - Globaler State nur in Organisms und Pages

---

## Workflow

1. **Discovery** - Requirements klären
2. **Design** - Design System definieren
3. **Planning** - Komponentenstruktur planen
4. **Review** - Plan bestätigen
5. **Implementation** - Storybook-First Entwicklung

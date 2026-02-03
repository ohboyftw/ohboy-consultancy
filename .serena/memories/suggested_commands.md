# Suggested Commands - Ohboy Consultancy Website

## Development

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Adding Shadcn Components

```bash
# Add new Shadcn component
npx shadcn@latest add [component-name]

# Examples:
npx shadcn@latest add accordion
npx shadcn@latest add dialog
npx shadcn@latest add tabs
```

## Git Commands (Windows)

```bash
# Status and changes
git status
git diff

# Add and commit
git add .
git commit -m "message"

# Push
git push origin main
```

## Windows File Operations

```powershell
# List directory
Get-ChildItem
dir

# Find files by pattern
Get-ChildItem -Recurse -Filter "*.tsx"

# Read file
Get-Content filename.tsx

# Copy files
Copy-Item source dest

# Remove files/folders
Remove-Item path -Recurse -Force
```

## Deployment (Vercel recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

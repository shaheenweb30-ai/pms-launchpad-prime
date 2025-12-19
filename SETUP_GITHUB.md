# Setting up PropertyFlow on GitHub

Follow these steps to create a new GitHub repository and push your code:

## Step 1: Create a new GitHub repository

1. Go to https://github.com/new
2. Repository name: `propertyflow`
3. Description: "A modern property management system built with React, TypeScript, and Supabase"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Remove old remote and add new one

Run these commands in your terminal:

```bash
cd /Users/shaheeneiedalkadri/Documents/pms-launchpad-prime

# Remove old remotes
git remote remove origin
git remote remove upstream

# Add new remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/propertyflow.git

# Verify the remote was added
git remote -v
```

## Step 3: Commit the name changes

```bash
# Stage the changes
git add package.json README.md SETUP_GITHUB.md

# Commit the changes
git commit -m "Rename project to PropertyFlow and update documentation"

# Push to the new repository
git push -u origin build-optimize
```

## Step 4: Set default branch (optional)

If you want to set `build-optimize` as the default branch:

1. Go to your repository on GitHub
2. Settings → Branches
3. Change default branch to `build-optimize`

Or if you want to rename the branch to `main`:

```bash
# Rename current branch to main
git branch -M main

# Push to main branch
git push -u origin main
```

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create repository and push in one command
gh repo create propertyflow --public --source=. --remote=origin --push
```

